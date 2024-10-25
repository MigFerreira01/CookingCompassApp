import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserFormComponent } from 'src/components/user-form/user-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UserListComponent } from 'src/components/user-list/user-list.component';
import { UserProfileComponent } from 'src/components/user-profile/user-profile.component';
import { UserLoginComponent } from 'src/components/user-login/user-login.component';
import { AuthInterceptor } from 'src/services/auth-interceptor';
import { RecipeCreateComponent } from 'src/components/recipe-form/recipe-form.component';
import { RecipeListComponent } from 'src/components/recipe-list/recipe-list.component';
import { RecipeFeedComponent } from 'src/components/recipe-feed/recipe-feed.component';
import { CloudinaryModule } from '@cloudinary/ng';
import { RecipeDetailComponent } from 'src/components/recipe-detail/recipe-detail.component';
import { TrimQuotesPipe } from 'src/pipes/trim-quotes';

@NgModule({
  declarations: [
    AppComponent,
    UserFormComponent,
    UserListComponent,
    UserProfileComponent,
    UserLoginComponent,
    RecipeCreateComponent,
    RecipeListComponent,
    RecipeFeedComponent,
    RecipeDetailComponent,
    TrimQuotesPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CloudinaryModule,
    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
