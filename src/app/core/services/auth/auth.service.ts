import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/env';
import { jwtDecode } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}
  private readonly platformId = inject(PLATFORM_ID);
  private readonly router = inject(Router);

  userDate: any = null;

  signUp(data: object): Observable<any> {
    return this.httpClient.post(
      `${environment.baseUrl}/api/v1/auth/signup`,
      data
    );
  }

  signIn(data: object): Observable<any> {
    return this.httpClient.post(
      `${environment.baseUrl}/api/v1/auth/signin`,
      data
    );
  }

  forgetPassword(data: object): Observable<any> {
    return this.httpClient.post(
      `${environment.baseUrl}/api/v1/auth/forgotPasswords`,
      data
    );
  }

  verifyResetCode(data: object): Observable<any> {
    return this.httpClient.post(
      `${environment.baseUrl}/api/v1/auth/verifyResetCode`,
      data
    );
  }

  updateLoggedUserPassword(data: object): Observable<any> {
    return this.httpClient.put(
      `${environment.baseUrl}/api/v1/users/changeMyPassword`,
      data
    );
  }

  resetPassword(data: object): Observable<any> {
    return this.httpClient.put(
      `${environment.baseUrl}/api/v1/auth/resetPassword`,
      data
    );
  }

  updateLoggedUserData(data: object): Observable<any> {
    return this.httpClient.put(
      `${environment.baseUrl}/api/v1/users/updateMe/`,
      data
    );
  }

  getAllUsers(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/users`);
  }

  verifyToken(): Observable<any> {
    return this.httpClient.get(
      `${environment.baseUrl}/api/v1/auth/verifyToken`
    );
  }

  // decode token using jwt-decode
  saveUserData(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('userToken')) {
        const token: any = localStorage.getItem('userToken');
        this.userDate = jwtDecode(token);
        console.log('UserDate', this.userDate);
      }
    }
  }

  // signOut
  signOut(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('userToken');
      this.userDate = null;

      // redirect to signIn page
      this.router.navigate(['/login']);
    }
  }
}
