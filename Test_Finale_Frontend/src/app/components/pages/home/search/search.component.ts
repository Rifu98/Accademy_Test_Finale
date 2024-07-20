import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
import { AuthService } from '../../../../services/auth.service';
import { Meteo } from '../../../../dto/Meteo';
import { StorageService } from '../../../../services/storage.service';
import { ProfileService } from '../../../../services/profile.service';
import { User } from '../../../../dto/User';
import { MeteoService } from '../../../../services/meteo.service';
import { LocationDialogComponent } from '../location-dialog/location-dialog.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatIconModule,
    NgIf
  ],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  location: string = '';
  selectedLocation: any;
  selectedDate: Date = new Date();
  weather: any;
  isLogged: boolean = false;
  meteo: Meteo = new Meteo('', new Date(), 0, 0, 0);

  constructor(
    private nominatimService: NominatimService,
    private openMeteoService: OpenMeteoService,
    private authService: AuthService,
    private storageService: StorageService,
    private profiloService: ProfileService,
    private meteoService: MeteoService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe(isAuth => {
      this.isLogged = isAuth;
    });
  }

  openLocationDialog() {
    const dialogRef = this.dialog.open(LocationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedLocation = result;
        this.location = result.display_name;
      }
    });
  }

  onSearch() {
    const date = this.selectedDate.toISOString().split('T')[0];
    if (this.selectedLocation) {
      this.openMeteoService.getWeather(this.selectedLocation.lat, this.selectedLocation.lon, date)
        .subscribe(data => {
          this.weather = data.daily;
        });
    }
  }

  save() {
    this.profiloService.getProfilo(this.storageService.getProperty('user_email'))?.subscribe((res: User) => {
      this.meteo = new Meteo(this.selectedLocation.shortenedDisplayName, this.selectedDate, this.weather.temperature_2m_max[0], this.weather.temperature_2m_min[0], res.id);
      this.meteoService.save(this.meteo)!.subscribe();
    });
  }

  getFormattedDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',   
      day: '2-digit',    
      month: 'long',      
      year: 'numeric'     
    };
    return new Intl.DateTimeFormat('it-IT', options).format(date);
  }
}
