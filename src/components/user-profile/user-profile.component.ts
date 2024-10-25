
import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/models/user';
import { UserService } from 'src/services/user-service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
  
})
export class UserProfileComponent implements OnInit {
  user!: User;
  loading: boolean = true;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    
    const userId = this.route.snapshot.paramMap.get('id');

    if (userId) {
        this.getUserById(Number(userId));
    } else {
        console.error('User ID is not on the route');
        this.loading = false;
    }
  }

  getUserById(userId: number) {
    this.loading = true;
    this.userService.getUserById(userId).subscribe({
        next: (data: User) => {
            this.user = data;
            this.getUserWithRecipes(this.user.name); 
        },
        error: (error) => {
            console.error('Error fetching user data', error);
            this.loading = false; 
        }
    });
  }
  
 getUserWithRecipes(name: string) {
      this.userService.getUserWithRecipes(name).subscribe ({
        next: (data: User) => {
            this.user = data;
            this.loading = false;
        },
        error: (error) => {
            console.error('Error fetching user data', error);
            this.loading = false; 
        }
    });
  };


}
