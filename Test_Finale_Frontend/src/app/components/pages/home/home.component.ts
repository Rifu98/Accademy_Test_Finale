import { Component, OnInit } from '@angular/core';
import { SearchComponent } from './search/search.component';
import { GeolocationService } from '../../../services/geolocation.service';
import { OpenMeteoService } from '../../../services/external/open-meteo.service';
import { MatCardModule } from '@angular/material/card';
import { NgIf } from '@angular/common';
import { UtilsService } from '../../../services/utils.service';
import { NominatimService } from '../../../services/external/nominatim.service';
import { AuthService } from '../../../services/auth.service';
import { ProfileService } from '../../../services/profile.service';
import { StorageService } from '../../../services/storage.service';
import { Meteo } from '../../../dto/Meteo';
import { MeteoService } from '../../../services/meteo.service';
import { MatIconModule } from '@angular/material/icon';
import { User } from '../../../dto/User';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SearchComponent,
    MatCardModule,
    NgIf,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  latitude: number = 0;
  longitude: number = 0;
  errorMessage: string | undefined;
  weather: any;
  placeName: string = '';
  isLogged: boolean = false;
  meteo: Meteo = new Meteo('', new Date(), 0, 0, 0, 0);
  constructor(
    private geolocationService: GeolocationService,
    private openMeteoService: OpenMeteoService,
    public utilsService: UtilsService,
    private nominatimService: NominatimService,
    private authService: AuthService,
    private profiloService: ProfileService,
    private storageService: StorageService,
    private meteoService: MeteoService,
  ) { }

  save() {
    this.profiloService.getProfilo(this.storageService.getProperty('user_email'))?.subscribe((res: User) => {
      this.meteo = new Meteo(this.placeName, new Date(), this.weather.temperature_2m_max[0], this.weather.temperature_2m_min[0], this.weather.weather_code[0], res.id);
      console.log(this.meteo)
      this.meteoService.save(this.meteo)!.subscribe();
    });
  }

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe(isAuth => {
      this.isLogged = isAuth;
    });
    this.getUserLocation();
    const date = new Date().toISOString().split('T')[0];
    this.openMeteoService.getWeather(this.latitude, this.longitude, date).subscribe(data => {
      this.weather = data.daily;
    });
  }

  getUserLocation() {
    this.geolocationService.getCurrentPosition()
      .then(position => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;

        this.getPlaceName();
      })
      .catch(error => {
        this.errorMessage = error;
      });
  }
  getPlaceName() {
    if (this.latitude && this.longitude) {
      this.nominatimService.getPlaceName(this.latitude, this.longitude)
        .subscribe(
          data => this.placeName = this.utilsService.shortenDisplayName(data.address),
          error => this.errorMessage = error.message
        );
    }
  }
}
