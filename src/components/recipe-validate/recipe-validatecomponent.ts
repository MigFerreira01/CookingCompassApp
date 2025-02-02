import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/models/recipe';
import { RecipeService } from 'src/services/recipe-service';

@Component({
  selector: 'app-feed',
  templateUrl: './recipe-validate.component.html',
  styleUrls: ['./recipe-validate.component.css']
})
export class RecipeValidateComponent implements OnInit {
  recipes: Recipe[] = [];
  expandedRecipes: { [key: number]: boolean } = {};

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.getRecipes();
  }

  getRecipes(): void {
    this.recipeService.getAll().subscribe((data: Recipe[]) => {
        this.recipes = data;
        this.recipes = data.filter(recipe => recipe.status == 'Pending');
    }, (error: any) => {
      console.error('Error fetching recipes:', error);
    });
  }

  toggleRecipe(recipeId: number): void {
    this.expandedRecipes[recipeId] = !this.expandedRecipes[recipeId];
  }

  isExpanded(recipeId: number): boolean {
    return this.expandedRecipes[recipeId] || false;
  }
}
