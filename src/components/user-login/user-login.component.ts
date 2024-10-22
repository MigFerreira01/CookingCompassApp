import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user-service';

@Component({
  selector: 'app-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})

export class UserLoginComponent {

    errorMessage: string | null = null;

    constructor(private http: HttpClient, private router: Router) {}

    onSubmit(form: any) {
         const loginRequest = {
            email: form.value.email,
            password: form.value.password,
         };


   this.http.post<any>('https://localhost:5022/login', loginRequest)
    .subscribe(
        (response: any) => {
            console.log('Login successful', response);

            localStorage.setItem('token', response.token);

            this.router.navigate(['/userList']);
        },
        (error: any) => {
            this.errorMessage = error.error;
            
            console.error('Login error', error);
        }
    );
  }
}   


