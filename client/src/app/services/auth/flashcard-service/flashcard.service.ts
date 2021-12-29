import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

const apiUrl = 'http://localhost:3001/api/auth';

@Injectable({
  providedIn: 'root',
})
export class FlashcardService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  removeSet(setId: number) {
    return this.http.delete(
      'http://localhost:3001/api/sets/setFlashcardsDelete/' + setId
    );
  }

  stats(setId: number): Observable<any> {
    return this.http.get<any>(
      'http://localhost:3001/api/sets/setStatistics/' + setId
    );
  }

  reset(setId: number): Observable<any>{
    return this.http.put<any>('http://localhost:3001/api/sets/setReset/' + setId, {});
  }


  postMyFlashcardSet(flashCardSet: any): Observable<any> {
    const request = {
      email: this.authService.getEmail(),
      setTitle: flashCardSet.setTitle,
      setDescription: flashCardSet.setDescription,
      Flashcards: flashCardSet.Flashcards,
    };
    return this.http.post<any>(
      'http://localhost:3001/api/sets/setFlashcards',
      request
    );
  }

  //'http://localhost:3001/api/sets/setFlashcardsNoJWT',

  getMyFlashacrdSets(): Observable<any> {
    const email = this.authService.getEmail()!;
    return this.http.post<any>('http://localhost:3001/api/sets/allUserSets', {
      email: email,
    });
  }
  
  // 'http://localhost:3001/api/sets/allUserSetsNoJWT',

  test(setId: number): Promise<any[]> {
    const email = this.authService.getEmail()!;

    return this.http
      .post<any>('http://localhost:3001/api/flashcards/flashcardsToLearn', {
        email: email,
        set_id: setId,
      })
      .toPromise();
  }

  sprawdz(id: number, tak: boolean): Promise<any[]> {
    return this.http
      .post<any>('http://localhost:3001/api/flashcards/flashcardPlusOrZero', {
        flashcardId: id,
        ifCorrect: tak,
      })
      .toPromise();
  }
}

//        'http://localhost:3001/api/flashcards/flashcardsToLearnNoJWT',
