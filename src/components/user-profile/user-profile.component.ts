
import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { UserDTO } from 'src/models/user';
import { UserService } from 'src/services/user-service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
  
})
export class UserProfileComponent implements OnInit {
  user!: UserDTO;
  loading: boolean = true;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    
    const userId = this.route.snapshot.paramMap.get('id');

    if (userId) {
        
        this.getUserById(Number(userId));
    } else {
        console.error('User ID in not on the route');
        this.loading=false;
    }
  }

  getUserById(userId: number) {
    this.loading = true;
    this.userService.getUserById(userId).subscribe({
        next: (data: UserDTO) => {
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
