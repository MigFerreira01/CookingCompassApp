import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { UserDTO } from 'src/models/user';
import { UserService } from 'src/services/user-service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
  
})
export class UserListComponent implements OnInit {
  users: UserDTO[] = [];
  user!: UserDTO;
  loading: boolean = true;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.getUsers(); 
  }

  getUsers() {
    this.userService.getAll().subscribe({
      next: (response: any) => {

        this.users = response.$values;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching users:', error);
        this.loading = false;
      }
    });
  }

  deleteUser(user : UserDTO) {
    this.userService.delete(user.id).subscribe (response => {
        this.getUsers();
    })
  }

  goToUserProfile(userId: number) {
    this.router.navigate(['/users', userId]);
  }
}
