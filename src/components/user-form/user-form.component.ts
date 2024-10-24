import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/models/user';
import { UserService } from 'src/services/user-service';

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
    
    form: FormGroup = new FormGroup({
        id: new FormControl(0, Validators.required),
        name: new FormControl('', Validators.required),
        username: new FormControl('',Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', Validators.required),
        isAdmin: new FormControl(false),
        isBlocked: new FormControl(false)

    })

    constructor(
        private userService: UserService,
        private Router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
    }
    saveUser() {
        if (this.form.valid) {
            
            const user: User = {
                id: 0, 
                name: this.form.value.name, 
                username: this.form.value.username,
                email: this.form.value.email, 
                password: this.form.value.password,
                isAdmin: this.form.value.isAdmin === 'false', 
                isBlocked: this.form.value.isBlocked === 'false', 
                registrationDate: new Date()
            };
    
            // Call the user service to save the user
            this.userService.save(user).subscribe(
                () => {
                    // Navigate or show success message
                    this.Router.navigate(['/users']); // Redirect after save
                },
                error => {
                    // Handle error
                    console.error('Error saving user:', error);
                }
            );
        }
    }
}
