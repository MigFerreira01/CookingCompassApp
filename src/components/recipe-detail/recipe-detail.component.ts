import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/models/recipe';
import { RecipeService } from 'src/services/recipe-service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe!: Recipe;
  editedRecipe!: Recipe;
  isEditMode: boolean = false;
  expandedRecipes: { [key: number]: boolean } = {};

  constructor(private recipeService: RecipeService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const recipeId = this.route.snapshot.paramMap.get('id');
    if (recipeId) {
        
      this.getRecipeById(Number(recipeId));
  } else {
      console.error('Recipe ID in not on the route');
  }
  }

  getRecipeById(id: number): void {
    this.recipeService.getRecipeById(id).subscribe((data: Recipe) => {
      this.recipe = data;
    }, (error: any) => {
      console.error('Error fetching recipe:', error);
    });
  }

  editRecipe(): void {
    this.isEditMode = true;
    this.editedRecipe = { ...this.recipe }; // Create a copy for editing
  }

  updateRecipe(): void {
    if (this.recipe && this.recipe.id) {
      this.recipeService.update(this.recipe.id).subscribe(
        (data: Recipe) => {
          this.recipe = data;
          console.log('Recipe updated successfully');
        },
        (error: any) => {
          console.error('Error updating recipe:', error);
        }
      );
    } else {
      console.error('Recipe data is missing or invalid');
    }
  }

  cancelEdit(): void {
    this.isEditMode = false;  // Exit edit mode
    this.editedRecipe = { ...this.recipe };  // Revert any unsaved changes
  }

}
