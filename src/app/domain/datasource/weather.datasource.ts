import { Observable } from "rxjs";
import { OpenWeatherResponse } from "../models/open-weather.response.model";

export abstract class WeatherDataSource {
  abstract getWeatherByCity(city: string): Observable<OpenWeatherResponse>;
  abstract getIcon(weatherIconId: string): Observable<string>;
}