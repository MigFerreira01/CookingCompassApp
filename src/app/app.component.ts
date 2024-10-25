import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from 'src/services/auth-service';
import { UserService } from 'src/services/user-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  currentUserId: string | null = null; // Initialize as null
  isLoggedIn = false;
  isAdmin: boolean = true;
  userLogged!: User;
  dropdownOpen: boolean = false

  constructor(private authService: AuthService, private router: Router, private userService: UserService) {}

  title = 'CookingCompassApp';
  loginForm: any;

  ngOnInit(): void {
    // Subscribe to the login status
    this.authService.getLoginStatus().subscribe(status => {
      this.isLoggedIn = status; // Update login status

      // Update currentUserId whenever login status changes
      if (this.isLoggedIn) {
        this.updateCurrentUserId();
       
        var idStr = this.updateCurrentUserId();
        
        var id = Number(idStr); 

        var userLogged = this.userService.getUserById(id)

        if (this.userLogged.isAdmin == true)
              {
                this.isAdmin = true;
              }
              else
              {
                this.isAdmin = false;
              }
      } else {
        this.currentUserId = null; // Clear user ID on logout
      }
    });

    // Check initial login status and update user ID
    this.isLoggedIn = !!this.authService.getToken();
    if (this.isLoggedIn) {
      this.updateCurrentUserId();
    }
  }

  // Method to update currentUserId
  private updateCurrentUserId(): void {
    this.currentUserId = this.authService.getCurrentUserId();
  }


  logOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}