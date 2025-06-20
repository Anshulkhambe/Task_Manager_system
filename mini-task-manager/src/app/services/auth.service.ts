import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8081/user'; 

  constructor(private http: HttpClient) { }

  login(credentials: { username: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/loginuser`, credentials);
  }


  logout(): void {
    // Clear user data from session storage
    sessionStorage.removeItem('user');
    // You might also clear any tokens if you were using local storage or cookies
    // localStorage.removeItem('authToken');
    console.log('User logged out. Session cleared.');
  }

  // Optional: A method to check if the user is logged in
  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('user'); // Returns true if 'user' exists in session storage
  }
}