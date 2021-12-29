import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AuthService } from '../auth.service';

// const apiUrl = 'http://localhost:3001/api/auth';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient, private authService: AuthService) {}


  
  setName(myName: string): Observable<any> {
    return this.http.post<any>('http://localhost:3001/api/profiles/name', {
      name: myName,
    });
  }

  setDesc(desc: string): Observable<any> {
    return this.http.post<any>(
      'http://localhost:3001/api/profiles/description',
      {
        description: desc,
      }
    );
  }

  getProfileInfo(): Observable<any> {
    return this.http.get<any>('http://localhost:3001/api/profiles');
  }

  getProfileStats(): Observable<any> {
    return this.http.get<any>('http://localhost:3001/api/profiles/statistics');
  }

  changePassword(oldPass: string, newPass: string): Observable<any> {
    return this.http.post<any>('http://localhost:3001/api/auth/password',
      {
        oldPassword: oldPass,
        newPassword: newPass
      }
    );
  }
}
