import { RecipeModel } from './recipe.model';
import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Injectable } from '@angular/core';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<RecipeModel>();
  private recipes: RecipeModel[] = [
    new RecipeModel(
      'A tasty schnitzel',
      'Super tasty schnitzel- yum yum!',
      'https://natashaskitchen.com/wp-content/uploads/2016/02/Pork-Schnitzel-Recipe-7-600x900.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]),
    new RecipeModel(
      'Tonny\'s shrimp pasta',
      'Almost best recipe ever',
      'https://cdn.apartmenttherapy.info/image/upload/v1567541461/k/Photo/Recipes/2019-09-how-to-shrimp-alfredo/HT-Shrimp-Alfredo_103.jpg',
      [
        new Ingredient('Pasta', 20),
        new Ingredient('Shrimp', 8),
        new Ingredient('Tomato', 2),
        new Ingredient('Parmesan', 15)
      ])
  ];

  constructor(private shoppingListService: ShoppingListService) {
  }

  getRecipes(): RecipeModel[] {
    return this.recipes.slice();
  }

  getRecipe(index: number): RecipeModel {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
