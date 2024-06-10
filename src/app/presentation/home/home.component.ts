import { Component, OnInit, inject, signal } from '@angular/core';
import { HomeService } from '../../use_cases/home.service';
import { IWeather } from '../../domain/interfaces/open-weather.interface';
import { WeatherModel } from '../../domain/models/weather.model';
import { WeatherSideComponent } from './weather-side/weather-side.component';
import { InfoSideComponent } from './info-side/info-side.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [WeatherSideComponent, InfoSideComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  public weather = signal<WeatherModel>({} as WeatherModel);
  private homeService = inject(HomeService);
  ngOnInit(): void {
    this.getWeatherByCity('Lautaro');
  }

  private getWeatherByCity(city: string): void {
    this.homeService.getWeatherByCity(city).subscribe({
      next: (weather) => {
        console.log('Weather icon ==> ', weather.icon);
        this.weather.set(weather);
      },
      error: (error) => {
        console.error('Error getting weather by city', error);
      },
    });
  }
}
