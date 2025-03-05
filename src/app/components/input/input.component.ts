import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MovieCardConfig } from '../../interfaces/ui-config/movie-card-confg.interface';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {
  @Input() items: MovieCardConfig[] = []; // Ensure a default empty array
  @Output() filteredItems = new EventEmitter<MovieCardConfig[]>(); // Emit filtered results

  filterMovies(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (!target) return; // Prevent errors if target is null
  
    const searchTerm = target.value.trim().toLowerCase();
  
    if (!this.items || this.items.length === 0) {
      console.warn('No items available for filtering');
      return;
    }
  
    const filtered = this.items.filter(movie =>
      movie.name?.toLowerCase().includes(searchTerm)
    );
  
    this.filteredItems.emit(filtered);
  }
}


