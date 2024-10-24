import { Component } from '@angular/core';
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
    status: '',
    comments: [],
    duration: 0,
    ingredients: [{
      ingredientID: 0,
      ingredientName: '',
      quantity: 0,
      unit: ''
    }],
    imageUrl: ''
  };

  constructor(private recipeService: RecipeService, private cloudinaryService: CloudinaryService) {}

  addIngredient() {
    this.recipe.ingredients.push({
      ingredientID: 0,
      ingredientName: '',
      quantity: 0,
      unit: ''
    });
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
        this.recipe.imageUrl = data.secure_url; // Store the uploaded image URL
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
    }, (error: any) => {
      // Handle error response
      console.error('Error creating recipe:', error);
    });
  }
}