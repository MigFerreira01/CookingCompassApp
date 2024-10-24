import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 
  isLoggedIn = false;

  constructor(private authService: AuthService, private router: Router) {}

  title = 'CookingCompassApp';
  loginForm: any;

ngOnInit(): void {
  
  this.authService.getLoginStatus().subscribe( status => { 
    this.isLoggedIn = status;
  });
  this.isLoggedIn = !!this.authService.getToken();
}

logOut() {
  this.authService.logout();
  this.router.navigate(['/login'])
}

}


