import { Component, OnInit } from '@angular/core';
import { MovieCardConfig } from '../../interfaces/ui-config/movie-card-confg.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericHttpService } from '../../services/generic-http.service';
import { Endpoints } from '../../endpoints/endpoints';
import { MoviesData,MovieResult } from '../../interfaces/models/movies.interface';
import { TVData, TVResult } from '../../interfaces/models/tv.interface';
import { InputComponent } from "../../components/input/input.component";
import { MovieCardComponent } from "../../components/movie-card/movie-card.component";

@Component({
  selector: 'app-view-category',
  standalone: true,
  imports: [InputComponent, MovieCardComponent],
  templateUrl: './view-category.component.html',
  styleUrl: './view-category.component.scss',
})
export class ViewCategoryComponent implements OnInit {
  title: string = '';
  movieCards: MovieCardConfig[] = [];
  filteredMovieCards: MovieCardConfig[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private genericService: GenericHttpService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.url.subscribe({
      next: (res) => {
        this.title = res[0]?.path.includes('movie') ? 'Movies' : 'TV Shows';

        if (this.title === 'Movies') {
          this.getAllMovies();
        } else if (this.title === 'TV Shows') {
          this.getAllTVShows();
        } else {
          this.router.navigateByUrl('');
        }
      },
    });
  }

  getAllMovies() {
    this.genericService.httpGet(Endpoints.MOVIES).subscribe({
      next: (res: MoviesData) => {
        this.movieCards = res.results.map((item:MovieResult) => {
          return {
            image: Endpoints.IMAGE_BASE + `/w500${item.backdrop_path}`,
            name: item.original_title,
            rating: item.vote_average,
            onClick: () => {
                this.router.navigateByUrl(`movie/${item.id}`);        
            },
          } as MovieCardConfig;
        })
        this.filteredMovieCards = [...this.movieCards];
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }

  getAllTVShows() {
    this.genericService.httpGet(Endpoints.TVSHOWS).subscribe({
      next: (res: TVData) => {
        this.movieCards = res.results.map((item:TVResult) => {
          return {
            image: Endpoints.IMAGE_BASE + `/w500${item.backdrop_path}`,
            name: item.name,
            rating: item.vote_average,
            onClick: () => {
                this.router.navigateByUrl(`tvshow/${item.id}`);        
            },
          } as MovieCardConfig;
        })
        this.filteredMovieCards = [...this.movieCards];
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }
}
