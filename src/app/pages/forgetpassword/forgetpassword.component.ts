import { Component, inject, PLATFORM_ID } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NavtabsComponent } from '../../shared/components/ui/navtabs/navtabs.component';
import { AuthService } from '../../core/services/auth/auth.service';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgetpassword',
  imports: [ReactiveFormsModule, NavtabsComponent],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss',
})
export class ForgetpasswordComponent {
  private readonly authService = inject(AuthService);
  private readonly id = inject(PLATFORM_ID);
  private readonly router = inject(Router);
  private readonly toastrService = inject(ToastrService);

  step: number = 1;

  verifyEmail: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  verifyCode: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[0-9]{6}$/),
    ]),
  });

  resetPassword: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),

    newPassword: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z]\w{8,}$/),
    ]),
  });

  verifyEmailSubmit(): void {
    this.authService.verifyEmail(this.verifyEmail.value).subscribe({
      next: (res) => {
        console.log(res);
        if (res.statusMsg === 'success') {
          this.toastrService.success(res.message, 'Trendy!');

          this.step = 2;
        }
      },
    });
  }

  verifyCodeSubmit(): void {
    this.authService.verifyResetCode(this.verifyCode.value).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === 'Success') {
          this.step = 3;
          this.toastrService.success(res.status, 'Trendy!');
        }
      },
    });
  }

  resetPasswordSubmit(): void {
    this.authService.resetPassword(this.resetPassword.value).subscribe({
      next: (res) => {
        console.log(res);
        this.toastrService.success(
          'Your Password Reset Successfully',
          'Trendy!'
        );

        if (isPlatformBrowser(this.id)) {
          localStorage.setItem('userToken', res.token);
        }
        // decode token
        this.authService.saveUserData();

        // redirect to home page
        this.router.navigate(['/home']);
      },
    });
  }
}
