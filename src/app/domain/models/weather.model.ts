import { IOpenWeatherResponse } from '../interfaces/open-weather.interface';
import { IIcon } from '../interfaces/weather.interface';

export class WeatherModel {
  constructor(
    public maxTemp: number,
    public minTemp: number,
    public temp: number,
    public humidity: number,
    public city: string,
    public windSpeed: number,
    public weather: string,
    public icon: string,
    public date: string,
    public dayOfTheWeek: string
  ) {}

  static fromJson(json: IOpenWeatherResponse, icon: IIcon): WeatherModel {
    return new WeatherModel(
      json.main.temp_max,
      json.main.temp_min,
      json.main.temp,
      json.main.humidity,
      json.name,
      json.wind.speed,
      json.weather.map((w) => w.id).join(', '),
      icon.name,
      '',
      ''
    );
  }
}
