import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rate-chip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rate-chip.component.html',
  styleUrl: './rate-chip.component.scss'
})
export class RateChipComponent {
  @Input() rating:number = 0;
  @Input() placeDecimals:number = 0;
}
