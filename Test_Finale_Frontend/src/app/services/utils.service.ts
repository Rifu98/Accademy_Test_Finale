import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }
  public getWeatherText(weatherCode: number): string {
    const weatherIcons: { [key: number]: string } = {
      0: 'Sereno',
      1: 'Nuvoloso',
      2: 'Nuvoloso',
      3: 'Nuvoloso',
      45: 'Nebbia',
      48: 'Nebbia',
      51: 'Pioviggine',
      53: 'Pioviggine',
      55: 'Pioviggine',
      56: 'Grandine Leggera',
      57: 'Grandine Leggera',
      61: 'Pioggia',
      63: 'Pioggia',
      65: 'Pioggia',
      66: 'Grandine',
      67: 'Grandine',
      71: 'Neve',
      73: 'Neve',
      75: 'Neve',
      77: 'Neve',
      80: 'Pioggia',
      81: 'Pioggia',
      82: 'Pioggia',
      85: 'Neve',
      86: 'Neve',
      95: 'Temporale',
      96: 'Tempesta di neve',
      99: 'Tempesta di neve'
    };
    return weatherIcons[weatherCode] || 'Dati mancanti';
  }
  public getWeatherIcon(weatherCode: number): string {
    const weatherIcons: { [key: number]: string } = {
      0: 'assets/img/weatherIcons/clear_sky.png',
      1: 'assets/img/weatherIcons/partly_cloudy.png',
      2: 'assets/img/weatherIcons/partly_cloudy.png',
      3: 'assets/img/weatherIcons/partly_cloudy.png',
      45: 'assets/img/weatherIcons/fog.png',
      48: 'assets/img/weatherIcons/fog.png',
      51: 'assets/img/weatherIcons/drizzle.png',
      53: 'assets/img/weatherIcons/drizzle.png',
      55: 'assets/img/weatherIcons/drizzle.png',
      56: 'assets/img/weatherIcons/drizzle.png',
      57: 'assets/img/weatherIcons/drizzle.png',
      61: 'assets/img/weatherIcons/rain.png',
      63: 'assets/img/weatherIcons/rain.png',
      65: 'assets/img/weatherIcons/rain.png',
      66: 'assets/img/weatherIcons/snow.png',
      67: 'assets/img/weatherIcons/snow.png',
      71: 'assets/img/weatherIcons//snow.png',
      73: 'assets/img/weatherIcons/snow.png',
      75: 'assets/img/weatherIcons/snow.png',
      77: 'assets/img/weatherIcons/snow.png',
      80: 'assets/img/weatherIcons/rain.png',
      81: 'assets/img/weatherIcons/rain.png',
      82: 'assets/img/weatherIcons/rain.png',
      85: 'assets/img/weatherIcons/snow.png',
      86: 'assets/img/weatherIcons/snow.png',
      95: 'assets/img/weatherIcons/thunderstorm.png',
      96: 'assets/img/weatherIcons/thunderstorm_hail.png',
      99: 'assets/img/weatherIcons/thunderstorm_hail.png'
    };
    return weatherIcons[weatherCode] || 'assets/icons/default.png';
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
