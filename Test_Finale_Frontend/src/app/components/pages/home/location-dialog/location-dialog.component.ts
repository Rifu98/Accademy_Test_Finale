import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NominatimService } from '../../../../services/external/nominatim.service';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { NgFor, NgIf } from '@angular/common';


@Component({
  selector: 'app-location-dialog',
  templateUrl: './location-dialog.component.html',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    NgFor,
    NgIf
  ],
  styleUrls: ['./location-dialog.component.css']
})
export class LocationDialogComponent {
  locations: any[] = [];
  selectedLocation: any;
  locationQuery: string = '';

  constructor(
    public dialogRef: MatDialogRef<LocationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private nominatimService: NominatimService
  ) { }

  onLocationInput(event: any) {
    const query = event.target.value;
    this.locationQuery = query;
    if (query.length > 0) {
      this.nominatimService.search(query).subscribe((data: any[]) => {
        this.locations = data.map(location => ({
          lat: location.lat,
          lon: location.lon,
          display_name: location.display_name,
          address: location.address,
          shortenedDisplayName: this.shortenDisplayName(location.address),
          countryCode: location.address.country_code.toUpperCase()
        }));
      });
    } else {
      this.locations = [];
    }
  }

  onLocationSelect(location: any) {
    this.selectedLocation = location;
    this.dialogRef.close(this.selectedLocation);
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
