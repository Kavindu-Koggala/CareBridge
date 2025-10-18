import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, catchError, takeUntil } from 'rxjs/operators';
import { of, EMPTY, Subject } from 'rxjs';
import { 
  FoodService, 
  FoodSearchResult, 
  FoodSearchResponse, 
  FoodData 
} from './food-search.service';

@Component({
  selector: 'app-food-search',
  templateUrl: './food-search.component.html',
  styleUrls: ['./food-search.component.scss']
})


export class FoodSearchComponent implements OnInit, OnDestroy {
  searchControl = new FormControl<string>('');
  searchResults: FoodSearchResult[] = [];
  selectedFoodDetails: FoodData | null = null;
  loading = false;
  detailsLoading = false;
  error: string | null = null;
  totalResults = 0;
  
  private destroy$ = new Subject<void>();

  constructor(private FoodService: FoodService) {}

  ngOnInit(): void {
    this.setupSearch();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setupSearch(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.destroy$),
        switchMap(query => {
          if (!query || query.trim().length < 2) {
            this.searchResults = [];
            this.totalResults = 0;
            return EMPTY;
          }

          this.loading = true;
          this.error = null;
          
          return this.FoodService.searchFoods(query.trim()).pipe(
            catchError(err => {
              console.error('Search error:', err);
              this.error = 'Failed to search foods. Please try again.';
              this.loading = false;
              return of(null);
            })
          );
        })
      )
      .subscribe(response => {
        this.loading = false;
        if (response) {
          this.searchResults = response.foods || [];
          this.totalResults = response.totalHits || 0;
        }
      });
  }

  selectFood(food: FoodSearchResult): void {
    this.detailsLoading = true;
    this.error = null;
    this.selectedFoodDetails = null;

    this.FoodService.getFoodDetails(food)
      .pipe(
        takeUntil(this.destroy$),
        catchError(err => {
          console.error('Food details error:', err);
          this.error = 'Failed to load food details. Please try again.';
          this.detailsLoading = false;
          return of(null);
        })
      )
      .subscribe((details: FoodData | null) => {
        this.detailsLoading = false;
        if (details) {
          this.selectedFoodDetails = details;
          console.log('Food data:', details); // For debugging
        }
      });
  }

  clearSearch(): void {
    this.searchControl.setValue('');
    this.searchResults = [];
    this.selectedFoodDetails = null;
    this.totalResults = 0;
    this.error = null;
  }

  clearSelection(): void {
    this.selectedFoodDetails = null;
  }

  trackByFdcId(index: number, food: FoodSearchResult): number {
    return food.fdcId;
  }

  // Helper methods for template
  getConfidenceBadgeClass(confidence: 'high' | 'medium' | 'low'): string {
    return `confidence-${confidence}`;
  }

  getConfidenceText(confidence: 'high' | 'medium' | 'low'): string {
    switch (confidence) {
      case 'high': return 'High Confidence';
      case 'medium': return 'Medium Confidence';
      case 'low': return 'Low Confidence';
      default: return 'Unknown';
    }
  }

  getApiSourcesText(sources: string[]): string {
    return sources.join(', ');
  }

  hasNutritionalComparison(): boolean {
    return !!(this.selectedFoodDetails?.nutritionix || this.selectedFoodDetails?.spoonacular);
  }

  getCalorieComparison(): Array<{source: string, calories: number, confidence?: number}> {
    if (!this.selectedFoodDetails) return [];
    
    const comparison = [];
    
    if (this.selectedFoodDetails.usda.calories) {
      comparison.push({
        source: 'USDA',
        calories: this.selectedFoodDetails.usda.calories
      });
    }
    
    if (this.selectedFoodDetails.nutritionix?.calories) {
      comparison.push({
        source: 'Nutritionix',
        calories: this.selectedFoodDetails.nutritionix.calories,
        confidence: this.selectedFoodDetails.nutritionix.confidence
      });
    }
    
    if (this.selectedFoodDetails.spoonacular?.calories) {
      comparison.push({
        source: 'Spoonacular',
        calories: this.selectedFoodDetails.spoonacular.calories,
        confidence: this.selectedFoodDetails.spoonacular.confidence
      });
    }
    
    return comparison;
  }

  getMacroComparison(): Array<{nutrient: string, usda?: number, nutritionix?: number, spoonacular?: number, best?: number}> {
    if (!this.selectedFoodDetails) return [];

    const macros = ['protein', 'fat', 'carbs'];
    return macros.map(macro => {
      const result: any = { nutrient: macro.charAt(0).toUpperCase() + macro.slice(1) };
      
      // Get values from each source
      if (this.selectedFoodDetails?.nutritionix?.[macro as keyof typeof this.selectedFoodDetails.nutritionix]) {
        result.nutritionix = this.selectedFoodDetails.nutritionix[macro as keyof typeof this.selectedFoodDetails.nutritionix];
      }
      
      if (this.selectedFoodDetails?.spoonacular?.[macro as keyof typeof this.selectedFoodDetails.spoonacular]) {
        result.spoonacular = this.selectedFoodDetails.spoonacular[macro as keyof typeof this.selectedFoodDetails.spoonacular];
      }
      
      if (this.selectedFoodDetails?.best?.[macro as keyof typeof this.selectedFoodDetails.best]) {
        result.best = this.selectedFoodDetails.best[macro as keyof typeof this.selectedFoodDetails.best];
      }
      
      return result;
    }).filter(item => item.nutritionix || item.spoonacular || item.best);
  }
}