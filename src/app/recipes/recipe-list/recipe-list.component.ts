import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RecipeModel } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  recipes: RecipeModel[] = [
    new RecipeModel('A test recipe', 'best recipe ever', 'https://cdn.apartmenttherapy.info/image/upload/v1567541461/k/Photo/Recipes/2019-09-how-to-shrimp-alfredo/HT-Shrimp-Alfredo_103.jpg'),
    new RecipeModel('Another test recipe', 'Almost best recipe ever', 'https://cdn.apartmenttherapy.info/image/upload/v1567541461/k/Photo/Recipes/2019-09-how-to-shrimp-alfredo/HT-Shrimp-Alfredo_103.jpg')
  ];
  @Output() recipeWasSelected = new EventEmitter<RecipeModel>();

  constructor() {
  }

  ngOnInit() {
  }

  onRecipeSelected(recipe: RecipeModel) {
    console.log(recipe)
    this.recipeWasSelected.emit(recipe);
  }
}
