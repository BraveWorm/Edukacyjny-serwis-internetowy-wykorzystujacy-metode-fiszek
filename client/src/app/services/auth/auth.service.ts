import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ILoginUserInfo, ILoginUserResponse, IRegistrationUserInfo} from './auth.types';


const apiUrl = 'http://localhost:3001/api/auth';

@Injectable({ providedIn: 'root' })
export class AuthService  {
  token:string='';
  isUserLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}
  login(userLoginInfo: ILoginUserInfo): Observable<ILoginUserResponse> {

       return this.http.post<ILoginUserResponse>(`${apiUrl}/login`, userLoginInfo)
  }

  //  register(userRegistrationInfo: IRegistrationUserInfo): void{
  //   try {
  //      this.http
  //       .post<ILoginUserResponse>(`${apiUrl}/registration`, userRegistrationInfo)
  //       .subscribe();
  //   } catch (error) {
  //     throw error;
  //   }
  // }
  register(name1: string, name2: string): Observable<any> {
    return this.http.post<ILoginUserResponse>(`${apiUrl}/registration`, {
      email: name1,
      password: name2,
    });
  }

  logout(): void {
    localStorage.removeItem('tokenId');
    this.isUserLoggedIn.next(false)
  }

  setSession(token: string): void {
    localStorage.setItem('tokenId', token);
    
  }

  getToken(): string | boolean {
    const token = localStorage.getItem('tokenId');
    return token ?? false;
  }

  parseJwt(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  isTokenExpired(token: string): boolean {
    const payload = this.parseJwt(token);

    if (payload) {
      const expiration = new Date(payload.exp);
      const now = new Date();

      if (expiration.getTime() * 1000 < now.getTime()) {
        return true;
      }
      return false;
    }
    return true;
  }

  getUserId(token: string): number {
    const payload = this.parseJwt(token);
    return payload.sub;
  }

  getEmail(): string | null {
    const token = this.getToken();
    if (typeof token === 'string') {
      const payload = this.parseJwt(token); 
      return payload.payload.email;
    }
    return null;
  }
 
}
