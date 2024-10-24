import { Component } from '@angular/core';
import { Recipe } from 'src/models/recipe';
import { RecipeService } from 'src/services/recipe-service';

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css']
})
export class RecipeCreateComponent {
  recipe: Recipe = {
    id: 0,
    name: '',
    description: '',
    user: '',
    category: '',
    difficulty: '',
    status: '',
    comments: [],
    duration: 0,
    ingredients: [{
      ingredientID: 0,
      ingredientName: '',
      quantity: 0,
      unit: ''
    }]
  };

  constructor(private recipeService: RecipeService) {}

  addIngredient() {
    this.recipe.ingredients.push({
      ingredientID: 0,
      ingredientName: '',
      quantity: 0,
      unit: ''
    });
  }

  onSubmit() {
    this.recipeService.save(this.recipe).subscribe((response: any) => {
      // Handle successful response
      console.log('Recipe created successfully:', response);
    }, (error: any) => {
      // Handle error response
      console.error('Error creating recipe:', error);
    });
  }
}