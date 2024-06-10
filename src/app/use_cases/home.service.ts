import { catchError, forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { Injectable } from '@angular/core';
import { WeatherDataSourceImpl } from '../infrastructure/weather.datasource.impl';
import { months } from '../domain/months.enum';
import { DayOfWeek } from '../domain/dayofweek.enum';
import {
  IOpenWeatherResponse,
  IWeather,
} from '../domain/interfaces/open-weather.interface';
import { WeatherModel } from '../domain/models/weather.model';
import { IIcon } from '../domain/interfaces/weather.interface';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private readonly weatherDS: WeatherDataSourceImpl) {}

  public getWeatherByCity(city: string): Observable<WeatherModel> {
    return this.weatherDS.getWeatherByCity(city).pipe(
      switchMap((weatherResponse) => {
        const weatherIconId = weatherResponse.weather[0].icon;
        return forkJoin({
          weather: of(weatherResponse),
          icon: this.weatherDS.getIcon(weatherIconId).pipe(
            map((iconArray: IIcon[]) => {
              if (iconArray.length > 0) {
                return iconArray;
              }
              throw new Error('Icon not found');
            }),
            catchError((error) => {
              throw error;
            })
          ),
        });
      }),
      map(({ weather, icon }) => {
        console.log('🚀 home service ~ getWeatherByCity ~ icon', icon);
        return this.homePetition(weather, icon);
      }),
      catchError((error) => {
        throw error;
      })
    );
  }

  private homePetition(json: IOpenWeatherResponse, icon: IIcon[]): WeatherModel {
    console.log('🚀 home service ~ homePetition ~ icon', icon);
    console.log('🚀 home service ~ homePetition ~ type of icon', typeof icon);
    const weather = WeatherModel.fromJson(json, icon);
    weather.date = this.getDate();
    weather.dayOfTheWeek = this.getDayOfTheWeek();
    console.log('🚀 home service ~ homePetition ~ weather', weather);
    return weather;
  }

  private getDate(): string {
    //? 'march 1, 2021'
    const date = new Date();
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  }

  private getDayOfTheWeek(): string {
    //? 'monday'
    const date = new Date();
    const day = DayOfWeek[date.getDay()];
    return day;
  }
}
