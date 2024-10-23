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
  loading: boolean = true; // Set loading state

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getAll().subscribe(
      (data) => {
        this.users = data;
        this.loading = false; // Data fetched, loading complete
      },
      (error) => {
        console.error('Error fetching users:', error);
        this.loading = false; // Loading complete even if there's an error
      }
    );
  }

  deleteUser(user: User) {
    this.userService.delete(user.id).subscribe(
      (response) => {
        this.getUsers(); // Refresh the user list after deletion
      },
      (error) => {
        console.error('Error deleting user:', error); // Log any errors during deletion
      }
    );
  }

  goToUserProfile(userId: number) {
    this.router.navigate(['/users', userId]);
  }
}