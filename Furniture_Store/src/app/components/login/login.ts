import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
      this.loginForm = this.fb.group({
        email: ['', [Validators.required]],
        password: ['', [Validators.required]]
      });
  }

  onSubmit() {
    if ( this.loginForm.invalid){
      return;
    }

    this.loading = true;
    this.errorMessage = null;

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: ( response: any) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/front-page']);
      },
      error: () => {
        this.errorMessage = 'Identifiants incorrects';
        this.loading = false;
      }
    });
  }
}
