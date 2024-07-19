import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserSignup } from '../../../dto/UserSignup';
import { UserLogin } from '../../../dto/UserLogin';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  alreadyRegistered: boolean = false;
  alreadyLogged: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {

    this.signupForm = this.fb.group({
      name: ['', [Validators.required]],
      cognome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$")]]
    });
  }
  ngOnInit(): void {

    this.authService.isAuthenticated().subscribe({
      error: (error: HttpErrorResponse) => { this.alreadyLogged = false; },
      next: (loggedIn: boolean) => { this.alreadyLogged = loggedIn; },
    });
  }
  onSignup() {
    if (this.signupForm.valid) {
      this.authService.signup(new UserSignup(this.signupForm.value.name, this.signupForm.value.cognome, this.signupForm.value.email, this.signupForm.value.password)).subscribe(() => {
        this.authService.login(new UserLogin(this.signupForm.value.email, this.signupForm.value.password)).subscribe((res) => {
          this.router.navigate(["/profile"]);
        });
      }, (err: HttpErrorResponse) => {
        this.alreadyRegistered = true;
      })
    }
  }

}
