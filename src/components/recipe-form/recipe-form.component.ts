import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from 'src/models/recipe';
import { CloudinaryService, UploadApiResponse } from 'src/services/image-service';
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
    status: 'Pending',
    comments: [],
    duration: 0,
    ingredients: [{
      ingredientID: 0,
      ingredientName: '',
      quantity: 0,
      unit: ''
    }],
    imageURL: ''
  };

  constructor(private recipeService: RecipeService, private cloudinaryService: CloudinaryService, private router: Router) {}

  addIngredient() {
    this.recipe.ingredients.push({
      ingredientID: 0,
      ingredientName: '',
      quantity: 0,
      unit: ''
    });
    
  }

  deleteIngredient(index: number) {

    this.recipe.ingredients.splice(index, 1);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.uploadImage(file);
    }
  }

  // Handle drag over event
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  // Handle drag leave event
  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  // Handle drop event
  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      const file = files[0];
      this.uploadImage(file);
    }
  }

  // Upload image to Cloudinary
  private uploadImage(file: File) {
    this.cloudinaryService.uploadImage(file).subscribe({
      next: (data: UploadApiResponse) => {
        this.recipe.imageURL = data.secure_url; // Store the uploaded image URL
        console.log('Image uploaded successfully:', data);
      },
      error: (error) => {
        console.error('Image upload failed:', error);
      }
    });
  }

  onSubmit() {
    this.recipeService.save(this.recipe).subscribe((response: any) => {
      // Handle successful response
      console.log('Recipe created successfully:', response);
      this.router.navigate([`/recipeFeed`]);
    }, (error: any) => {
      // Handle error response
      console.error('Error creating recipe:', error);
    });



  }
}