import { Injectable } from '@angular/core';
import { Meteo } from '../dto/Meteo';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class MeteoService {

  constructor(private http: HttpClient, private storageService: StorageService) { }
  url = "http://localhost:8080/api/";

  save(meteo: Meteo) {
    try {
      const token = this.storageService.getLocalToken()
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', 'Bearer ' + token)
      return this.http.post(this.url + "meteo", meteo, { headers });
    } catch (error) {
      return null;
    }
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
