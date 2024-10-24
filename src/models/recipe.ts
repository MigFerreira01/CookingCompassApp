import { Comment } from "./comment";
import { RecipeIngredient } from "./recipeIngredient";

export interface Recipe {
        id: number;
        name: string;
        description: string;
        user: string;
        category: string;
        difficulty: string;
        status: string;
        comments: Comment[];
        duration: number;
        ingredients: RecipeIngredient[];

        
        
}