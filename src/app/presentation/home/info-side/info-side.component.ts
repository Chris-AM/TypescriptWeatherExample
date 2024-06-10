import { Component, Input } from '@angular/core';
import { WeatherModel } from '../../../domain/models/weather.model';

@Component({
  selector: 'app-info-side',
  standalone: true,
  imports: [],
  templateUrl: './info-side.component.html',
  styleUrl: './info-side.component.scss'
})
export class InfoSideComponent {
  @Input() public weather!: WeatherModel;
}
