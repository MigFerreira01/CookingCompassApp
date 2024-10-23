import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserFormComponent } from 'src/components/user-form/user-form.component';
import { UserListComponent } from 'src/components/user-list/user-list.component';
import { UserLoginComponent } from 'src/components/user-login/user-login.component';
import { UserProfileComponent } from 'src/components/user-profile/user-profile.component';
import { AuthGuard } from 'src/services/auth-guard';

const routes: Routes = [
  {path: 'login', component: UserLoginComponent},
  {path: 'user', component: UserFormComponent, canActivate: [AuthGuard] },
  {path: 'userList', component: UserListComponent, canActivate: [AuthGuard] },
  {path: 'users/:id', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default redirect to login
  { path: '**', redirectTo: '/login' } // Redirect any unknown paths to login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
