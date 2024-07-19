import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Observable, throwError } from 'rxjs';
import { User } from '../dto/User';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient, private storageService: StorageService) { }

  url = "http://localhost:8080/api/";

  getProfilo(email: string): Observable<User> | null {
    try {
      const token = this.storageService.getLocalToken()
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', 'Bearer ' + token)
      return this.http.get<User>(this.url + "user/" + email, { headers });
    } catch (error) {
      return null;
    }
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
