import { catchError, map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeatherDataSource } from '../domain/datasource/weather.datasource';
import { environment } from '../config/app.environment';
import { IOpenWeatherResponse } from '../domain/interfaces/open-weather.interface';
import { IIcon } from '../domain/interfaces/weather.interface';
import { months } from '../domain/months.enum';
import { DayOfWeek } from '../domain/dayofweek.enum';
import { OpenWeatherResponse } from '../domain/models/open-weather.response.model';

@Injectable({
  providedIn: 'root',
})
export class WeatherDataSourceImpl extends WeatherDataSource {
  private readonly baseUrl = environment.base_url;
  private readonly openApiBaseUrl = environment.weatherAPI;
  constructor(private readonly httpClient: HttpClient) {
    super();
  }
  getWeatherByCity(city: string): Observable<OpenWeatherResponse> {
    const fullUrl = this.openApiBaseUrl + city + environment.appId;
    const weatherPetition$ = this.httpClient
      .get<IOpenWeatherResponse>(fullUrl)
      .pipe(
        map((response) => {
          return OpenWeatherResponse.fromJson(response);
        }),
        catchError((error) => {
          throw error;
        })
      );
    return weatherPetition$;
  }

  getIcon(weatherIconId: string): Observable<string> {
    const fullUrl = `${this.baseUrl + environment.icons}?id=${weatherIconId}`;
    const petition = this.httpClient.get<IIcon>(fullUrl);
    const result = petition.pipe(
      map((icon) => {
        return icon.name;
      }),
      catchError((error) => {
        throw error;
      })
    );
    return result;
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
