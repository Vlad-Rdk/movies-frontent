import { Component, Input } from '@angular/core';
import { MovieCardConfig } from '../../interfaces/ui-config/movie-card-confg.interface';
import { RateChipComponent } from "../rate-chip/rate-chip.component";

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [RateChipComponent],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent {
  @Input() config!: MovieCardConfig;


}
