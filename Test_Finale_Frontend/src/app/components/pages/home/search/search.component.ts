import { Component, OnInit } from '@angular/core';
import { NominatimService } from '../../../../services/external/nominatim.service';
import { OpenMeteoService } from '../../../../services/external/open-meteo.service';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

import { NgFor, NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../services/auth.service';
import { Meteo } from '../../../../dto/Meteo';
import { StorageService } from '../../../../services/storage.service';
import { ProfileService } from '../../../../services/profile.service';
import { User } from '../../../../dto/User';
import { MeteoService } from '../../../../services/meteo.service';

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
    MatChipsModule,
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
  meteo: Meteo = new Meteo('',new Date(),0,0,0);
  private seenShortNames: Set<string> = new Set<string>();

  constructor(
    private nominatimService: NominatimService,
    private openMeteoService: OpenMeteoService,
    private authService: AuthService,
    private storageService: StorageService,
    private profiloService: ProfileService,
    private meteoService: MeteoService, 
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
      this.nominatimService.search(query).subscribe((data: any[]) => {
        this.locations = [];
        this.seenShortNames.clear(); // Clear the set before adding new locations
        for (let location of data) {
          const shortName = this.shortenDisplayName(location.address);
          if (!this.seenShortNames.has(shortName)) {
            this.seenShortNames.add(shortName);
            this.locations.push({
              lat: location.lat,
              lon: location.lon,
              display_name: location.display_name,
              address: location.address,
              shortenedDisplayName: shortName,
              countryCode: location.address.country_code.toUpperCase()
            });
          }
        }
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
        this.weather = data.daily;
      });
  }

  save() {

    this.profiloService.getProfilo(this.storageService.getProperty('user_email'))?.subscribe((res: User) => {
      this.meteo = new Meteo(this.selectedLocation.shortenedDisplayName, this.weather.time[0], this.weather.temperature_2m_max[0], this.weather.temperature_2m_min[0], res.id);
      this.meteoService.save(this.meteo)!.subscribe(res => {
        console.log(res)
      })
    })
  }

  shortenDisplayName(address: any): string {
    const city = address.city || address.town || address.village || address.hamlet || '';
    const county = address.county || address.state_district || '';
    const state = address.state || '';
    const country = address.country || '';
    const mainPart = city || county;
    const parts = [mainPart, state, country].filter(part => part !== '');
    return parts.join(', ');
  }
}
