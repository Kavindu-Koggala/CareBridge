import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, forkJoin, of, throwError } from 'rxjs';
import { catchError, map, switchMap, retry } from 'rxjs/operators';

// USDA Interfaces (existing)
export interface FoodSearchResult {
  fdcId: number;
  description: string;
  dataType: string;
  publicationDate: string;
  brandOwner?: string;
  ingredients?: string;
  ingredientStatement?: string;
}

export interface FoodSearchResponse {
  foods: FoodSearchResult[];
  totalHits: number;
  currentPage: number;
  totalPages: number;
}

export interface FoodNutrient {
  nutrientId: number;
  nutrientName: string;
  nutrientNumber: string;
  unitName: string;
  value: number;
}

export interface FoodDetails {
  fdcId: number;
  description: string;
  dataType: string;
  ingredients: string;
  foodNutrients: FoodNutrient[];
  servingSize?: number;
  servingSizeUnit?: string;
}

// Nutritionix Interfaces
export interface NutritionixSearchResponse {
  common: NutritionixFood[];
  branded: NutritionixFood[];
}

export interface NutritionixFood {
  food_name: string;
  serving_unit: string;
  tag_name: string;
  serving_qty: number;
  common_type?: any;
  tag_id: string;
  photo: {
    thumb: string;
    highres?: string;
  };
  locale: string;
}

export interface NutritionixNutrientResponse {
  foods: [{
    food_name: string;
    brand_name: string;
    serving_qty: number;
    serving_unit: string;
    serving_weight_grams: number;
    nf_calories: number;
    nf_total_fat: number;
    nf_saturated_fat: number;
    nf_cholesterol: number;
    nf_sodium: number;
    nf_total_carbohydrate: number;
    nf_dietary_fiber: number;
    nf_sugars: number;
    nf_protein: number;
    nf_potassium: number;
    nf_p: number;
    full_nutrients: Array<{
      attr_id: number;
      value: number;
    }>;
    tags: {
      item: string;
      measure: string;
      quantity: string;
      food_group: number;
      tag_id: number;
    };
  }];
}

// Spoonacular Interfaces
export interface SpoonacularSearchResponse {
  results: SpoonacularFood[];
  offset: number;
  number: number;
  totalResults: number;
}

export interface SpoonacularFood {
  id: number;
  title: string;
  image: string;
  imageType: string;
}

export interface SpoonacularNutrientResponse {
  id: number;
  title: string;
  nutrition: {
    nutrients: Array<{
      name: string;
      amount: number;
      unit: string;
      percentOfDailyNeeds: number;
    }>;
    properties: Array<{
      name: string;
      amount: number;
      unit: string;
    }>;
    flavonoids: Array<{
      name: string;
      amount: number;
      unit: string;
    }>;
    ingredients: Array<{
      id: number;
      name: string;
      amount: number;
      unit: string;
      nutrients: Array<{
        name: string;
        amount: number;
        unit: string;
        percentOfDailyNeeds: number;
      }>;
    }>;
    caloricBreakdown: {
      percentProtein: number;
      percentFat: number;
      percentCarbs: number;
    };
    weightPerServing: {
      amount: number;
      unit: string;
    };
  };
}

//  Food Data Interface
export interface FoodData {
  // USDA Data
  usda: {
    fdcId: number;
    description: string;
    dataType: string;
    ingredients: string;
    calories: number;
    servingSize: string;
    nutrients: FoodNutrient[];
  };
  // Nutritionix Data
  nutritionix?: {
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
    fiber: number;
    sugar: number;
    sodium: number;
    servingSize: string;
    confidence: number; // How well it matches USDA data
  };
  // Spoonacular Data
  spoonacular?: {
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
    nutrients: Array<{name: string; amount: number; unit: string}>;
    confidence: number;
  };
  // Aggregated/Best Data
  best: {
    calories: number;
    caloriesSources: string[]; // Which APIs provided this data
    protein?: number;
    fat?: number;
    carbs?: number;
    confidence: 'high' | 'medium' | 'low';
    discrepancies: string[]; // Any major differences between APIs
  };
}

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  // API Keys
  private readonly USDA_API_KEY = '7pgyHE2Sb3xisGHXK5Vq9t9skLkcW1ViRZr0K7rJ';
  private readonly NUTRITIONIX_APP_ID = 'd61c7096';
  private readonly NUTRITIONIX_API_KEY = 'a646937de23c416ed4b5521ccc7e77c2';
  private readonly SPOONACULAR_API_KEY = '5f0ec6feb33f3d54ca2dcc812951d59f449eea5e';

  // API URLs
  private readonly USDA_BASE_URL = 'https://api.nal.usda.gov/fdc/v1';
  private readonly NUTRITIONIX_BASE_URL = 'https://trackapi.nutritionix.com/v2';
  private readonly SPOONACULAR_BASE_URL = 'https://api.spoonacular.com/food';

  constructor(private http: HttpClient) { }

  searchFoods(query: string, pageSize: number = 25): Observable<FoodSearchResponse> {
    return this.searchUSDAFoods(query, pageSize);
  }
  getFoodDetails(usdaFood: FoodSearchResult): Observable<FoodData> {
    const usdaDetails$ = this.getUSDAFoodDetails(usdaFood.fdcId);
    const nutritionixDetails$ = this.getNutritionixData(usdaFood.description);
    const spoonacularDetails$ = this.getSpoonacularData(usdaFood.description);

    return forkJoin({
      usda: usdaDetails$,
      nutritionix: nutritionixDetails$,
      spoonacular: spoonacularDetails$
    }).pipe(
      map(results => this.aggregateNutritionData(results)),
      catchError(error => {
        console.error('Error getting  food details:', error);
        // Fall back to USDA only if other APIs fail
        return usdaDetails$.pipe(
          map(usdaData => this.createFallbackData(usdaData))
        );
      })
    );
  }

  // USDA Methods 
  private searchUSDAFoods(query: string, pageSize: number = 25): Observable<FoodSearchResponse> {
    const params = new HttpParams()
      .set('api_key', this.USDA_API_KEY)
      .set('query', query.trim())
      .set('pageSize', pageSize.toString())
      .set('dataType', 'Foundation,Survey (FNDDS),Branded')
      .set('sortBy', 'dataType.keyword')
      .set('sortOrder', 'asc');

    return this.http.get<FoodSearchResponse>(`${this.USDA_BASE_URL}/foods/search`, { params })
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  private getUSDAFoodDetails(fdcId: number): Observable<FoodDetails> {
    const params = new HttpParams()
      .set('api_key', this.USDA_API_KEY);

    return this.http.get<FoodDetails>(`${this.USDA_BASE_URL}/food/${fdcId}`, { params })
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  // Nutritionix Methods
  private getNutritionixData(foodName: string): Observable<any> {
    const headers = new HttpHeaders({
      'x-app-id': this.NUTRITIONIX_APP_ID,
      'x-app-key': this.NUTRITIONIX_API_KEY,
      'Content-Type': 'application/json'
    });

    const body = {
      query: foodName,
      timezone: 'US/Eastern'
    };

    return this.http.post<NutritionixNutrientResponse>(
      `${this.NUTRITIONIX_BASE_URL}/natural/nutrients`, 
      body, 
      { headers }
    ).pipe(
      map(response => response.foods?.[0] || null),
      catchError(error => {
        console.warn('Nutritionix API error:', error);
        return of(null);
      })
    );
  }

  private getSpoonacularData(foodName: string): Observable<any> {
    const searchParams = new HttpParams()
      .set('apiKey', this.SPOONACULAR_API_KEY)
      .set('query', foodName)
      .set('number', '1');

    return this.http.get<SpoonacularSearchResponse>(
      `${this.SPOONACULAR_BASE_URL}/ingredients/search`,
      { params: searchParams }
    ).pipe(
      switchMap(searchResponse => {
        if (searchResponse.results && searchResponse.results.length > 0) {
          const ingredientId = searchResponse.results[0].id;
          
          // Get nutrition information for the ingredient
          const nutritionParams = new HttpParams()
            .set('apiKey', this.SPOONACULAR_API_KEY)
            .set('amount', '100')
            .set('unit', 'grams');

          return this.http.get<SpoonacularNutrientResponse>(
            `${this.SPOONACULAR_BASE_URL}/ingredients/${ingredientId}/information`,
            { params: nutritionParams }
          );
        }
        return of(null);
      }),
      catchError(error => {
        console.warn('Spoonacular API error:', error);
        return of(null);
      })
    );
  }
 //mapping 3 apis........................................
  private aggregateNutritionData(results: {usda: FoodDetails, nutritionix: any, spoonacular: any}): FoodData {
    const usdaCalories = this.extractUSDACalories(results.usda);
    const nutritionixCalories = results.nutritionix?.nf_calories || null;
    const spoonacularCalories = this.extractSpoonacularCalories(results.spoonacular);

    const calorieValues = [usdaCalories, nutritionixCalories, spoonacularCalories].filter(val => val !== null);
    const avgCalories = calorieValues.length > 0 ? calorieValues.reduce((a, b) => a + b, 0) / calorieValues.length : 0;
    
    const discrepancies: string[] = [];
    const sources: string[] = [];
    
    if (usdaCalories !== null) sources.push('USDA');
    if (nutritionixCalories !== null) sources.push('Nutritionix');
    if (spoonacularCalories !== null) sources.push('Spoonacular');

    if (calorieValues.length > 1) {
      const maxDiff = Math.max(...calorieValues) - Math.min(...calorieValues);
      if (maxDiff > avgCalories * 0.2) {
        discrepancies.push(`Calorie discrepancy: ${Math.round(maxDiff)} cal difference between sources`);
      }
    }

const nonZeroCalories = [usdaCalories, nutritionixCalories, spoonacularCalories].filter(val => val && val > 0);

let bestCalories = 0;
let confidence: 'high' | 'medium' | 'low' = 'low';

if (nonZeroCalories.length > 0) {
  bestCalories = Math.round(
    nonZeroCalories.length === 1
      ? nonZeroCalories[0]
      : nonZeroCalories.reduce((a, b) => a + b, 0) / nonZeroCalories.length
  );

  if (nonZeroCalories.length === 3 && discrepancies.length === 0) confidence = 'high';
  else if (nonZeroCalories.length === 2) confidence = 'medium';
  else confidence = 'low';
} else {
  // fallback to USDA even if it's zero
  bestCalories = usdaCalories || 0;
  confidence = 'low';
}

    return {
      usda: {
        fdcId: results.usda.fdcId,
        description: results.usda.description,
        dataType: results.usda.dataType,
        ingredients: results.usda.ingredients || 'Not available',
        calories: usdaCalories || 0,
        servingSize: this.formatUSDAServingSize(results.usda),
        nutrients: results.usda.foodNutrients || []
      },
      nutritionix: results.nutritionix ? {
        calories: results.nutritionix.nf_calories,
        protein: results.nutritionix.nf_protein,
        fat: results.nutritionix.nf_total_fat,
        carbs: results.nutritionix.nf_total_carbohydrate,
        fiber: results.nutritionix.nf_dietary_fiber,
        sugar: results.nutritionix.nf_sugars,
        sodium: results.nutritionix.nf_sodium,
        servingSize: `${results.nutritionix.serving_qty} ${results.nutritionix.serving_unit}`,
        confidence: this.calculateNutritionixConfidence(results.nutritionix, avgCalories)
      } : undefined,
      spoonacular: results.spoonacular ? {
        calories: spoonacularCalories || 0,
        protein: this.extractSpoonacularNutrient(results.spoonacular, 'Protein') ?? 0,
        fat: this.extractSpoonacularNutrient(results.spoonacular, 'Fat') ?? 0,
        carbs: this.extractSpoonacularNutrient(results.spoonacular, 'Carbohydrates') ?? 0,
        nutrients: results.spoonacular.nutrition?.nutrients || [],
        confidence: this.calculateSpoonacularConfidence(results.spoonacular, avgCalories)
      } : undefined,
      best: {
        calories: Math.round(bestCalories),
        caloriesSources: sources,
        protein: this.getBestMacroValue('protein', results),
        fat: this.getBestMacroValue('fat', results),
        carbs: this.getBestMacroValue('carbs', results),
        confidence,
        discrepancies
      }
    };
  }

  // Helper methods for data extraction
  private extractUSDACalories(usdaData: FoodDetails): number | null {
    const calorieNutrient = usdaData.foodNutrients?.find(
      nutrient => nutrient.nutrientId === 208 || 
      nutrient.nutrientName?.toLowerCase().includes('energy') ||
      nutrient.nutrientNumber === '208'
    );
    return calorieNutrient?.value || null;
  }

  private extractSpoonacularCalories(spoonacularData: any): number | null {
    return spoonacularData?.nutrition?.nutrients?.find((n: any) => n.name === 'Calories')?.amount || null;
  }

  private extractSpoonacularNutrient(spoonacularData: any, nutrientName: string): number | null {
    return spoonacularData?.nutrition?.nutrients?.find((n: any) => n.name === nutrientName)?.amount || null;
  }

  private formatUSDAServingSize(usdaData: FoodDetails): string {
    if (usdaData.servingSize && usdaData.servingSizeUnit) {
      return `${usdaData.servingSize}${usdaData.servingSizeUnit}`;
    }
    return 'Per 100g';
  }

  private calculateNutritionixConfidence(nutritionixData: any, avgCalories: number): number {
    if (!nutritionixData.nf_calories) return 0;
    const diff = Math.abs(nutritionixData.nf_calories - avgCalories);
    return Math.max(0, Math.min(100, 100 - (diff / avgCalories) * 100));
  }

  private calculateSpoonacularConfidence(spoonacularData: any, avgCalories: number): number {
    const calories = this.extractSpoonacularCalories(spoonacularData);
    if (!calories) return 0;
    const diff = Math.abs(calories - avgCalories);
    return Math.max(0, Math.min(100, 100 - (diff / avgCalories) * 100));
  }

  private getBestMacroValue(macro: 'protein' | 'fat' | 'carbs', results: any): number | undefined {
    const values: number[] = [];
    
    if (results.nutritionix) {
      const key = macro === 'carbs' ? 'nf_total_carbohydrate' : `nf_${macro === 'fat' ? 'total_fat' : macro}`;
      if (results.nutritionix[key]) values.push(results.nutritionix[key]);
    }
    
    if (results.spoonacular) {
      const nutrientName = macro === 'carbs' ? 'Carbohydrates' : macro === 'fat' ? 'Fat' : 'Protein';
      const value = this.extractSpoonacularNutrient(results.spoonacular, nutrientName);
      if (value) values.push(value);
    }

    return values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : undefined;
  }

  private createFallbackData(usdaData: FoodDetails): FoodData {
    const calories = this.extractUSDACalories(usdaData) || 0;
    
    return {
      usda: {
        fdcId: usdaData.fdcId,
        description: usdaData.description,
        dataType: usdaData.dataType,
        ingredients: usdaData.ingredients || 'Not available',
        calories,
        servingSize: this.formatUSDAServingSize(usdaData),
        nutrients: usdaData.foodNutrients || []
      },
      best: {
        calories,
        caloriesSources: ['USDA'],
        confidence: 'low',
        discrepancies: ['Limited to USDA data only - other APIs unavailable']
      }
    };
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred';
    
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      switch (error.status) {
        case 400:
          errorMessage = 'Bad Request: Please check your search terms';
          break;
        case 401:
          errorMessage = 'Unauthorized: Invalid API key';
          break;
        case 403:
          errorMessage = 'Forbidden: Access denied';
          break;
        case 404:
          errorMessage = 'Not Found: The requested food was not found';
          break;
        case 429:
          errorMessage = 'Too Many Requests: Please wait and try again';
          break;
        case 500:
          errorMessage = 'Server Error: Please try again later';
          break;
        default:
          errorMessage = `Server Error ${error.status}: ${error.message}`;
      }
    }
    
    console.error(' Food Service Error:', errorMessage, error);
    return throwError(() => new Error(errorMessage));
  }
}