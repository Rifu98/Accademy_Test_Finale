import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenMeteoService {

  constructor(private http: HttpClient) { }

  getWeather(lat: number, lon: number, date: string): Observable<any> {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,weather_code&start_date=${date}&end_date=${date}`;
    return this.http.get<any>(url);
  }
}
