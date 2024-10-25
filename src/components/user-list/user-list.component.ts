import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/models/user';
import { UserService } from 'src/services/user-service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getAll().subscribe(
      (data) => {
        this.users = data;
               },
      (error) => {
        console.error('Error fetching users:', error);
               }
    );
  }

  deleteUser(user: User) {
    this.userService.delete(user.id).subscribe(
      (response) => {
        this.getUsers();       },
      (error) => {
        console.error('Error deleting user:', error);       }
    );
  }

  goToUserProfile(userId: number) {
    this.router.navigate(['/users', userId]);
  }
}