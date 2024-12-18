import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { MealService, MealCreateDTO, MealGetDTO } from './meal.service';
import { environment } from '../../../environments/env.prod';
import { provideHttpClient } from '@angular/common/http';

describe('MealService', () => {
  let service: MealService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MealService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(MealService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call createMeal with correct URL and return the created meal', () => {
    const mealData: MealCreateDTO = {
      name: 'Test Meal',
      price: 1000,
      description: 'A delicious test meal',
      photo: 'base64string',
      ingredients: ['ingredient1', 'ingredient2'],
      cateringFirmId: 1,
    };

    const mockResponse: MealGetDTO = {
      mealId: 1,
      name: 'Test Meal',
      price: 1000,
      description: 'A delicious test meal',
      photo: 'base64string',
      ingredients: [
        {
          ingredientId: 1,
          name: 'ingredient1',
          allergens: [],
        },
        {
          ingredientId: 2,
          name: 'ingredient2',
          allergens: [],
        },
      ],
    };

    service.createMeal(mealData).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/api/v1/meal`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mealData);
    req.flush(mockResponse);
  });
});
