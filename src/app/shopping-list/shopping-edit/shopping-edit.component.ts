import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: false}) ingredientForm: NgForm;
  subscription: Subscription;
  editedItemIndex: number;
  editMode = false;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.ingredientForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient: Ingredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.ingredientForm.reset();
    this.editMode = false;
  }

  onClear() {
    this.ingredientForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.onClear();
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
