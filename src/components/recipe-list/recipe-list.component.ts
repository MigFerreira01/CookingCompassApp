import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/models/recipe';
import { RecipeService } from 'src/services/recipe-service';

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];
  approvedRecipes: Recipe[] = [];
  pendingRecipes: Recipe[] = [];
  rejectedRecipes: Recipe[] = [];
  expandedRecipes: { [key: number]: boolean } = {};

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.getRecipes();


  }

  getRecipes(): void {
    this.recipeService.getAll().subscribe((data: Recipe[]) => {
      this.recipes = data;

      this.approvedRecipes = this.recipes.filter(recipe => recipe.status === 'Approved');
      this.pendingRecipes = this.recipes.filter(recipe => recipe.status === 'Pending');
      this.rejectedRecipes = this.recipes.filter(recipe => recipe.status === 'Rejected');

    }, (error: any) => {
      console.error('Error fetching recipes:', error);
    });
  }

  toggleRecipe(recipeId: number): void {
    this.expandedRecipes[recipeId] = !this.expandedRecipes[recipeId]; // Toggle the expansion
  }

  isExpanded(recipeId: number): boolean {
    return this.expandedRecipes[recipeId] || false;
  }
}