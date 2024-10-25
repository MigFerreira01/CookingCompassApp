import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/models/recipe';
import { RecipeCategory, RecipeCategoryLabels } from 'src/models/recipeCategory.enum';
import { RecipeService } from 'src/services/recipe-service';

@Component({
  selector: 'app-feed',
  templateUrl: './recipe-feed.component.html',
  styleUrls: ['./recipe-feed.component.css']
})
export class RecipeFeedComponent implements OnInit {
  recipes: Recipe[] = [];
  recipeCategories = Object.values(RecipeCategory).filter(value => typeof value === 'number') as RecipeCategory[];
  filteredRecipes: Recipe[] = [];
  dropdownOpen: boolean = false

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    
    this.getRecipes();

  }

  getRecipes(): void {
    this.recipeService.getAll().subscribe((data: Recipe[]) => {
        this.recipes = data;
        this.recipes = data.filter(recipe => recipe.status !== 'Pending' && recipe.status !== 'Rejected');
        this.filteredRecipes = this.recipes;
    }, (error: any) => {
      console.error('Error fetching recipes:', error);
    });
  }


  filterRecipes(category: RecipeCategory | 'All'): void {
    if (category === 'All') {
      this.filteredRecipes = this.recipes;
      this.dropdownOpen = false;
    } else {
      this.filteredRecipes = this.recipes.filter(recipe => {
        // Assuming recipe.category is a string, you can convert it to RecipeCategory here
        return recipe.category === RecipeCategory[category];
    });
    this.dropdownOpen = false;
  }
}

  getCategoryLabel(category: RecipeCategory): string {
    return RecipeCategoryLabels[category]; // Make sure RecipeCategoryLabels is defined and imported correctly
  }
}
