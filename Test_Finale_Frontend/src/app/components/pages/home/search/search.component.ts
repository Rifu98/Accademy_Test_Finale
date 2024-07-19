import { Component, OnInit } from '@angular/core';
import { NominatimService } from '../../../../services/external/nominatim.service';
import { OpenMeteoService } from '../../../../services/external/open-meteo.service';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { NgFor, NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../services/auth.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    NgFor,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatIconModule
  ],

  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  location: string = '';
  locations: any[] = [];
  selectedLocation: any;
  selectedDate: Date = new Date();
  weather: any;
  isLogged: boolean = false;

  constructor(
    private nominatimService: NominatimService,
    private openMeteoService: OpenMeteoService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe(isAuth => {
      if (isAuth) {
        this.isLogged=true;
      } else {
        this.isLogged = false;
      }
    });
   }

  onLocationInput(event: any) {
    const query = event.target.value;
    if (query.length > 0) {
      this.nominatimService.search(query).subscribe(data => {
        this.locations = [];
        this.locations = data;
      });
    } else {
      this.locations = [];
    }
  }

  onLocationSelect(location: any) {
    this.selectedLocation = location;
    this.location = location.display_name;
    this.locations = [];
  }

  onSearch() {
    const date = this.selectedDate.toISOString().split('T')[0];
    this.openMeteoService.getWeather(this.selectedLocation.lat, this.selectedLocation.lon, date)
      .subscribe(data => {
        console.log(data)
        this.weather = data.daily;
      });
  }
}
