import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeListComponent } from 'src/components/recipe-list/recipe-list.component';
import { RecipeCreateComponent } from 'src/components/recipe-form/recipe-form.component';
import { UserFormComponent } from 'src/components/user-form/user-form.component';
import { UserListComponent } from 'src/components/user-list/user-list.component';
import { UserLoginComponent } from 'src/components/user-login/user-login.component';
import { UserProfileComponent } from 'src/components/user-profile/user-profile.component';
import { AuthGuard } from 'src/services/auth-guard';
import { RecipeFeedComponent } from 'src/components/recipe-feed/recipe-feed.component';
import { RecipeDetailComponent } from 'src/components/recipe-detail/recipe-detail.component';

const routes: Routes = [
  {path: 'login', component: UserLoginComponent},
  {path: 'user', component: UserFormComponent},
  {path: 'userList', component: UserListComponent, canActivate: [AuthGuard] },
  {path: 'users/:id', component: UserProfileComponent, canActivate: [AuthGuard] },
  {path: 'recipe', component: RecipeCreateComponent, canActivate: [AuthGuard]},
  {path: 'recipeList', component: RecipeListComponent, canActivate: [AuthGuard]},
  {path: 'recipeFeed', component: RecipeFeedComponent},
  {path: 'recipeDetail/:id', component: RecipeDetailComponent},
  { path: '', redirectTo: '/recipeFeed', pathMatch: 'full' }, // Default redirect
  { path: '**', redirectTo: '/recipeFeed' } // Redirect any unknown paths
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
