import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserFormComponent } from 'src/components/user-form/user-form.component';
import { UserListComponent } from 'src/components/user-list/user-list.component';
import { UserLoginComponent } from 'src/components/user-login/user-login.component';
import { UserProfileComponent } from 'src/components/user-profile/user-profile.component';
import { authGuard } from 'src/services/auth-guard';

const routes: Routes = [
  {path: 'login', component: UserLoginComponent},
  {path: 'user', component: UserFormComponent, canActivate: [authGuard]},
  {path: 'userList', component: UserListComponent, canActivate: [authGuard]},
  {path: 'users/:id', component: UserProfileComponent, canActivate: [authGuard]},
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default redirect to login
  { path: '**', redirectTo: '/login' } // Redirect any unknown paths to login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
