import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { isPlatformBrowser } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signin',
  imports: [ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly toastrService = inject(ToastrService);

  signInForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z]\w{8,}$/),
    ]),
  });
  submitForm(): void {
    if (this.signInForm.valid) {
      this.authService.signIn(this.signInForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.message === 'success') {
            this.toastrService.success(res.message, 'Trendy!');
            setTimeout(() => {
              // save token in local storage
              if (isPlatformBrowser(this.platformId)) {
                localStorage.setItem('userToken', res.token);
              }

              // decode token
              this.authService.saveUserData();

              // redirect to home page
              this.router.navigate(['/home']);
            }, 500);
          }
        },
      });
    } else {
      this.signInForm.markAllAsTouched();
    }
  }
}
