import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NominatimService {

  constructor(private http: HttpClient) { }

  search(query: string): Observable<any> {
    const url = `https://nominatim.openstreetmap.org/search?q=${query}&format=json&addressdetails=1&limit=5`;
    return this.http.get<any>(url);
  }

  getPlaceName(latitude: number, longitude: number): Observable<any> {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
    return this.http.get<any>(url);
  }
}
