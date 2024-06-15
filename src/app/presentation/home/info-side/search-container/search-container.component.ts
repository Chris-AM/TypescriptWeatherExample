import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IWeather } from '../../../../domain/interfaces/open-weather.interface';
import { HomeService } from '../../../../use_cases/home.service';
import { WeatherModel } from '../../../../domain/models/weather.model';

@Component({
  selector: 'app-search-container',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
  templateUrl: './search-container.component.html',
  styleUrl: './search-container.component.scss',
})
export class SearchContainerComponent {
  @Input() public foundCity!: WeatherModel;
  @Output() public searchCity = new EventEmitter<WeatherModel>();

  public searchForm = new FormGroup({
    searchTerm: new FormControl('') as FormControl<string>,
  });

  private readonly service: HomeService = inject(HomeService);

  public filterCity(filer: string | undefined): void {
    if (filer) {
      this.service.getWeatherByCity(filer).subscribe({
        next: (city) => {
          this.foundCity = city;
          this.searchCity.emit(city);
        },
        error: (error) => {
          console.error(error);
        },
      });
    }
  }
}
