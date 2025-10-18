import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { FoodSearchComponent } from './food-search.component';
import { 
  FoodService, 
  FoodSearchResponse, 
  FoodSearchResult,
  FoodData 
} from './food-search.service';

describe('FoodSearchComponent', () => {
  let component: FoodSearchComponent;
  let fixture: ComponentFixture<FoodSearchComponent>;
  let FoodService: jasmine.SpyObj<FoodService>;

  const mockSearchResponse: FoodSearchResponse = {
    foods: [
      {
        fdcId: 123456,
        description: 'Apple, raw',
        dataType: 'Foundation',
        publicationDate: '2023-01-01',
        ingredients: 'Apple'
      },
      {
        fdcId: 789012,
        description: 'Banana, raw',
        dataType: 'Foundation',
        publicationDate: '2023-01-01'
      },
      {
        fdcId: 555666,
        description: 'Coca-Cola Classic',
        dataType: 'Branded',
        publicationDate: '2023-01-01',
        brandOwner: 'The Coca-Cola Company'
      }
    ],
    totalHits: 3,
    currentPage: 1,
    totalPages: 1
  };

  const mockFoodData: FoodData = {
    usda: {
      fdcId: 123456,
      description: 'Apple, raw',
      dataType: 'Foundation',
      ingredients: 'Apple',
      calories: 52,
      servingSize: 'Per 100g',
      nutrients: [
        {
          nutrientId: 208,
          nutrientName: 'Energy',
          nutrientNumber: '208',
          unitName: 'kcal',
          value: 52
        }
      ]
    },
    nutritionix: {
      calories: 54,
      protein: 0.3,
      fat: 0.2,
      carbs: 14,
      fiber: 2.4,
      sugar: 10.4,
      sodium: 1,
      servingSize: '1 medium (182g)',
      confidence: 95
    },
    spoonacular: {
      calories: 53,
      protein: 0.26,
      fat: 0.17,
      carbs: 13.81,
      nutrients: [
        { name: 'Calories', amount: 53, unit: 'kcal' },
        { name: 'Protein', amount: 0.26, unit: 'g' }
      ],
      confidence: 92
    },
    best: {
      calories: 53,
      caloriesSources: ['USDA', 'Nutritionix', 'Spoonacular'],
      protein: 0.28,
      fat: 0.19,
      carbs: 13.9,
      confidence: 'high',
      discrepancies: []
    }
  };

  const mockFoodDataWithDiscrepancies: FoodData = {
    ...mockFoodData,
    nutritionix: {
      ...mockFoodData.nutritionix!,
      calories: 80 // High discrepancy
    },
    best: {
      calories: 62,
      caloriesSources: ['USDA', 'Nutritionix', 'Spoonacular'],
      protein: 0.28,
      fat: 0.19,
      carbs: 13.9,
      confidence: 'medium',
      discrepancies: ['Calorie discrepancy: 28 cal difference between sources']
    }
  };

  beforeEach(async () => {
    const FoodServiceSpy = jasmine.createSpyObj('FoodService', [
      'searchFoods',
      'getFoodDetails'
    ]);

    await TestBed.configureTestingModule({
      declarations: [FoodSearchComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        { provide: FoodService, useValue: FoodServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FoodSearchComponent);
    component = fixture.componentInstance;
    FoodService = TestBed.inject(FoodService as any) as jasmine.SpyObj<FoodService>;
  });

  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize with empty form and default state', () => {
      expect(component.searchControl.value).toBe('');
      expect(component.searchResults).toEqual([]);
      expect(component.selectedFoodDetails).toBeNull();
      expect(component.loading).toBeFalsy();
      expect(component.detailsLoading).toBeFalsy();
      expect(component.error).toBeNull();
      expect(component.totalResults).toBe(0);
    });

    it('should call setupSearch on init', () => {
      spyOn(component as any, 'setupSearch');
      component.ngOnInit();
      expect((component as any).setupSearch).toHaveBeenCalled();
    });

    it('should clean up subscriptions on destroy', () => {
      const destroySpy = spyOn((component as any).destroy$, 'next');
      const completeSpy = spyOn((component as any).destroy$, 'complete');
      
      component.ngOnDestroy();
      
      expect(destroySpy).toHaveBeenCalled();
      expect(completeSpy).toHaveBeenCalled();
    });
  });

  describe('Food Search Functionality', () => {
    it('should search for foods when input changes', fakeAsync(() => {
      FoodService.searchFoods.and.returnValue(of(mockSearchResponse));

      component.ngOnInit();
      component.searchControl.setValue('apple');
      tick(300); // Wait for debounce

      expect(FoodService.searchFoods).toHaveBeenCalledWith('apple');
      expect(component.searchResults).toEqual(mockSearchResponse.foods);
      expect(component.totalResults).toBe(mockSearchResponse.totalHits);
      expect(component.loading).toBeFalsy();
    }));

    it('should not search for queries less than 2 characters', fakeAsync(() => {
      component.ngOnInit();
      component.searchControl.setValue('a');
      tick(300);

      expect(FoodService.searchFoods).not.toHaveBeenCalled();
      expect(component.searchResults).toEqual([]);
      expect(component.totalResults).toBe(0);
    }));

    it('should handle search errors gracefully', fakeAsync(() => {
      const errorResponse = new Error('Network error');
      FoodService.searchFoods.and.returnValue(throwError(errorResponse));

      component.ngOnInit();
      component.searchControl.setValue('apple');
      tick(300);

      expect(component.error).toBe('Failed to search foods. Please try again.');
      expect(component.loading).toBeFalsy();
    }));

    it('should clear search results when query is empty', fakeAsync(() => {
      component.searchResults = mockSearchResponse.foods;
      component.totalResults = 10;

      component.ngOnInit();
      component.searchControl.setValue('');
      tick(300);

      expect(component.searchResults).toEqual([]);
      expect(component.totalResults).toBe(0);
    }));
  });

  describe('Food Selection and Details', () => {
    it('should get  food details when selecting a food', () => {
      const mockFood = mockSearchResponse.foods[0];
      FoodService.getFoodDetails.and.returnValue(of(mockFoodData));

      component.selectFood(mockFood);

      expect(FoodService.getFoodDetails).toHaveBeenCalledWith(mockFood);
      expect(component.selectedFoodDetails).toEqual(mockFoodData);
      expect(component.detailsLoading).toBeFalsy();
    });

    it('should handle food details errors', () => {
      const mockFood = mockSearchResponse.foods[0];
      const errorResponse = new Error('API error');
      FoodService.getFoodDetails.and.returnValue(throwError(errorResponse));

      component.selectFood(mockFood);

      expect(component.error).toBe('Failed to load food details. Please try again.');
      expect(component.selectedFoodDetails).toBeNull();
      expect(component.detailsLoading).toBeFalsy();
    });

    it('should set loading states correctly during food selection', () => {
      const mockFood = mockSearchResponse.foods[0];
      FoodService.getFoodDetails.and.returnValue(of(mockFoodData));

      expect(component.detailsLoading).toBeFalsy();
      
      component.selectFood(mockFood);
      
      // Loading should be set initially (though it completes immediately in test)
      expect(FoodService.getFoodDetails).toHaveBeenCalled();
      expect(component.detailsLoading).toBeFalsy(); // Completed
    });
  });

  describe('Helper Methods', () => {
    beforeEach(() => {
      component.selectedFoodDetails = mockFoodData;
    });

    it('should return correct confidence badge class', () => {
      expect(component.getConfidenceBadgeClass('high')).toBe('confidence-high');
      expect(component.getConfidenceBadgeClass('medium')).toBe('confidence-medium');
      expect(component.getConfidenceBadgeClass('low')).toBe('confidence-low');
    });

    it('should return correct confidence text', () => {
      expect(component.getConfidenceText('high')).toBe('High Confidence');
      expect(component.getConfidenceText('medium')).toBe('Medium Confidence');
      expect(component.getConfidenceText('low')).toBe('Low Confidence');
    });

    it('should format API sources text correctly', () => {
      const sources = ['USDA', 'Nutritionix', 'Spoonacular'];
      expect(component.getApiSourcesText(sources)).toBe('USDA, Nutritionix, Spoonacular');
    });

    it('should detect nutritional comparison availability', () => {
      expect(component.hasNutritionalComparison()).toBeTruthy();
      
      component.selectedFoodDetails = {
        ...mockFoodData,
        nutritionix: undefined,
        spoonacular: undefined
      };
      
      expect(component.hasNutritionalComparison()).toBeFalsy();
    });

    it('should return calorie comparison data', () => {
      const comparison = component.getCalorieComparison();
      
      expect(comparison).toEqual([
        { source: 'USDA', calories: 52 },
        { source: 'Nutritionix', calories: 54, confidence: 95 },
        { source: 'Spoonacular', calories: 53, confidence: 92 }
      ]);
    });

    it('should return macro comparison data', () => {
      const macroComparison = component.getMacroComparison();
      
      expect(macroComparison.length).toBeGreaterThan(0);
      expect(macroComparison[0].nutrient).toBe('Protein');
      expect(macroComparison[0].nutritionix).toBe(0.3);
      expect(macroComparison[0].spoonacular).toBe(0.26);
      expect(macroComparison[0].best).toBe(0.28);
    });

    it('should handle empty macro comparison when no nutritional data', () => {
      component.selectedFoodDetails = {
        ...mockFoodData,
        nutritionix: undefined,
        spoonacular: undefined,
        best: {
          ...mockFoodData.best,
          protein: undefined,
          fat: undefined,
          carbs: undefined
        }
      };
      
      const macroComparison = component.getMacroComparison();
      expect(macroComparison).toEqual([]);
    });
  });

  describe('Clear Functions', () => {
    it('should clear search completely', () => {
      component.searchResults = mockSearchResponse.foods;
      component.selectedFoodDetails = mockFoodData;
      component.totalResults = 10;
      component.error = 'Some error';
      component.searchControl.setValue('test');

      component.clearSearch();

      expect(component.searchControl.value).toBe('');
      expect(component.searchResults).toEqual([]);
      expect(component.selectedFoodDetails).toBeNull();
      expect(component.totalResults).toBe(0);
      expect(component.error).toBeNull();
    });

    it('should clear only selection', () => {
      component.selectedFoodDetails = mockFoodData;
      component.searchResults = mockSearchResponse.foods;

      component.clearSelection();

      expect(component.selectedFoodDetails).toBeNull();
      expect(component.searchResults).toEqual(mockSearchResponse.foods); // Should remain
    });
  });

  describe('TrackBy Function', () => {
    it('should track food items by fdcId', () => {
      const food = mockSearchResponse.foods[0];
      const trackResult = component.trackByFdcId(0, food);
      expect(trackResult).toBe(food.fdcId);
    });
  });

  describe('Template Integration', () => {
    it('should display search input', () => {
      fixture.detectChanges();
      const searchInput = fixture.debugElement.query(By.css('.search-input'));
      expect(searchInput).toBeTruthy();
      expect(searchInput.nativeElement.placeholder).toContain('Search for foods');
    });

    it('should display loading indicator when searching', () => {
      component.loading = true;
      fixture.detectChanges();

      const loadingIndicator = fixture.debugElement.query(By.css('.loading-indicator'));
      expect(loadingIndicator).toBeTruthy();
      expect(loadingIndicator.nativeElement.textContent).toContain('Searching across multiple APIs');
    });

    it('should display details loading when loading details', () => {
      component.selectedFoodDetails = null;
      component.detailsLoading = true;
      fixture.detectChanges();

      const detailsLoading = fixture.debugElement.query(By.css('.details-loading'));
      expect(detailsLoading).toBeTruthy();
      expect(detailsLoading.nativeElement.textContent).toContain('Loading nutrition data from multiple APIs');
    });

    it('should display error message when error exists', () => {
      component.error = 'Test error message';
      fixture.detectChanges();

      const errorMessage = fixture.debugElement.query(By.css('.error-message'));
      expect(errorMessage).toBeTruthy();
      expect(errorMessage.nativeElement.textContent).toContain('Test error message');
    });

    it('should display search results', () => {
      component.searchResults = mockSearchResponse.foods;
      component.totalResults = mockSearchResponse.totalHits;
      fixture.detectChanges();

      const resultItems = fixture.debugElement.queryAll(By.css('.result-item'));
      expect(resultItems.length).toBe(3);

      const firstResult = resultItems[0];
      expect(firstResult.nativeElement.textContent).toContain('Apple, raw');
      expect(firstResult.nativeElement.textContent).toContain('Foundation');
    });

    it('should display food details', () => {
      component.selectedFoodDetails = mockFoodData;
      fixture.detectChanges();

      const foodDetails = fixture.debugElement.query(By.css('.food-details'));
      expect(foodDetails).toBeTruthy();

      const foodTitle = fixture.debugElement.query(By.css('.food-title'));
      expect(foodTitle.nativeElement.textContent).toContain('Apple, raw');

      const calorieNumber = fixture.debugElement.query(By.css('.calorie-number'));
      expect(calorieNumber.nativeElement.textContent).toContain('53');

      const confidenceBadge = fixture.debugElement.query(By.css('.confidence-badge'));
      expect(confidenceBadge.nativeElement.textContent).toContain('High Confidence');
    });

    it('should display API comparison when multiple sources available', () => {
      component.selectedFoodDetails = mockFoodData;
      fixture.detectChanges();

      const apiComparison = fixture.debugElement.query(By.css('.api-comparison'));
      expect(apiComparison).toBeTruthy();

      const comparisonItems = fixture.debugElement.queryAll(By.css('.comparison-item'));
      expect(comparisonItems.length).toBe(3); // USDA, Nutritionix, Spoonacular
    });

    it('should display discrepancies when they exist', () => {
      component.selectedFoodDetails = mockFoodDataWithDiscrepancies;
      fixture.detectChanges();

      const discrepancies = fixture.debugElement.query(By.css('.discrepancies'));
      expect(discrepancies).toBeTruthy();
      expect(discrepancies.nativeElement.textContent).toContain('Calorie discrepancy');
    });

    it('should display macro comparison when available', () => {
      component.selectedFoodDetails = mockFoodData;
      fixture.detectChanges();

      const macroComparison = fixture.debugElement.query(By.css('.macro-comparison'));
      expect(macroComparison).toBeTruthy();

      const macroItems = fixture.debugElement.queryAll(By.css('.macro-item'));
      expect(macroItems.length).toBeGreaterThan(0);
    });

    it('should display API badges in header', () => {
      fixture.detectChanges();

      const apiBadges = fixture.debugElement.queryAll(By.css('.api-badge'));
      expect(apiBadges.length).toBe(3);
      
      const badgeTexts = apiBadges.map(badge => badge.nativeElement.textContent.trim());
      expect(badgeTexts).toContain('USDA');
      expect(badgeTexts).toContain('Nutritionix');
      expect(badgeTexts).toContain('Spoonacular');
    });

    it('should display empty state when no search query', () => {
      component.searchResults = [];
      component.loading = false;
      component.searchControl.setValue('');
      fixture.detectChanges();

      const emptyState = fixture.debugElement.query(By.css('.empty-state'));
      expect(emptyState).toBeTruthy();
      expect(emptyState.nativeElement.textContent).toContain('Start searching for nutrition data');

      const features = fixture.debugElement.queryAll(By.css('.feature'));
      expect(features.length).toBe(4); // Four feature items listed
    });

    it('should display no results state', () => {
      component.searchResults = [];
      component.loading = false;
      component.error = null;
      component.searchControl.setValue('nonexistent food');
      fixture.detectChanges();

      const noResults = fixture.debugElement.query(By.css('.no-results'));
      expect(noResults).toBeTruthy();
      expect(noResults.nativeElement.textContent).toContain('No foods found');
    });
  });

  describe('Click Events', () => {
    it('should clear search when clear button is clicked', () => {
      spyOn(component, 'clearSearch');
      component.searchControl.setValue('test');
      fixture.detectChanges();

      const clearButton = fixture.debugElement.query(By.css('.clear-search-btn'));
      clearButton.nativeElement.click();

      expect(component.clearSearch).toHaveBeenCalled();
    });

    it('should clear selection when close details button is clicked', () => {
      spyOn(component, 'clearSelection');
      component.selectedFoodDetails = mockFoodData;
      fixture.detectChanges();

      const closeButton = fixture.debugElement.query(By.css('.close-details-btn'));
      closeButton.nativeElement.click();

      expect(component.clearSelection).toHaveBeenCalled();
    });

    it('should select food when result item is clicked', () => {
      spyOn(component, 'selectFood');
      component.searchResults = mockSearchResponse.foods;
      fixture.detectChanges();

      const firstResultItem = fixture.debugElement.query(By.css('.result-item'));
      firstResultItem.nativeElement.click();

      expect(component.selectFood).toHaveBeenCalledWith(mockSearchResponse.foods[0]);
    });
  });

  describe('Edge Cases', () => {
    it('should handle null selected food details gracefully', () => {
      component.selectedFoodDetails = null;
      
      expect(component.hasNutritionalComparison()).toBeFalsy();
      expect(component.getCalorieComparison()).toEqual([]);
      expect(component.getMacroComparison()).toEqual([]);
    });

    it('should handle confidence levels not in enum', () => {
      const result = component.getConfidenceText('unknown' as any);
      expect(result).toBe('Unknown');
    });

    it('should handle empty API sources array', () => {
      const result = component.getApiSourcesText([]);
      expect(result).toBe('');
    });
  });
});