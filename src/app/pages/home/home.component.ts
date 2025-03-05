import { Component, OnInit, ViewChild } from '@angular/core';
import { InputComponent } from '../../components/input/input.component';
import { GenericHttpService } from '../../services/generic-http.service';
import { Endpoints } from '../../endpoints/endpoints';
import {
  TrendData,
  TrendsResult,
} from '../../interfaces/models/trends.interface';
import { MovieCardConfig } from '../../interfaces/ui-config/movie-card-confg.interface';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { SegmentedControlConfig } from '../../interfaces/ui-config/segmented-control-config.interface';
import { SegmentedControlComponent } from '../../components/segmented-control/segmented-control.component';
import { Router } from '@angular/router';
import { MovieResult, MoviesData } from '../../interfaces/models/movies.interface';
import { TVData, TVResult } from '../../interfaces/models/tv.interface';
import { TVDetailData } from '../../interfaces/models/tv-details.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [InputComponent, MovieCardComponent, SegmentedControlComponent],
  providers: [GenericHttpService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  title: string = 'All';
  movies: MovieCardConfig[] = [];
  filteredMovies: MovieCardConfig[] = [];


  segments: SegmentedControlConfig[] = [
    {
      name: 'All',
      active: true,
    },
    {
      name: 'Movies',
      active: false,
    },
    {
      name: 'TV-Shows',
      active: false,
    },
  ];

  constructor(
    private genericHttpService: GenericHttpService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllTrending();
    // this.filteredMovies = [...this.movies]
  }

  onSegmentSelected(segment: string): void {
    this.title = segment;
    if (segment === 'All') {
      //  this.filteredMovies = [...this.movies];
      this.getAllTrending();
    } else if (segment === 'Movies') {
      //  this.filteredMovies = this.movies.filter((movie) => movie.mediaType === 'movie');
      this.getMovies();
    } else if (segment === 'TV-Shows') {
      // this.filteredMovies = this.movies.filter((movie) => movie.mediaType === 'tv');
      this.getTVShows();
    }
  }

  getAllTrending() {
    this.genericHttpService.httpGet(Endpoints.TRENDS).subscribe({
      next: (res: TrendData) => {

        this.movies = res.results.map((item: TrendsResult) => {
          let trendingItem = {
            image: Endpoints.IMAGE_BASE + `/w500${item.backdrop_path}`,
            name: item.original_title ? item.original_title : item.name,
            mediaType: item.media_type,
            rating: item.vote_average,
            onClick: () => {
              if (item.media_type === 'tv') {
                this.router.navigateByUrl(`tvshow/${item.id}`);
              } else {
                this.router.navigateByUrl(`movie/${item.id}`);
              }
            },
          } as MovieCardConfig;

          return trendingItem;
        });
        this.filteredMovies = [...this.movies];
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }

  getTVShows() {
    this.genericHttpService.httpGet(Endpoints.TVSHOWS).subscribe({
      next: (res: TVData) => {

        this.movies = res.results.map((item: TVResult) => {
          let trendingItem = {
            image: Endpoints.IMAGE_BASE + `/w500${item.backdrop_path}`,
            name: item.name ? item.name : '-Title Unavaliabe-',
            mediaType: 'tv',
            rating: item.vote_average,
            onClick: () => {
                this.router.navigateByUrl(`tvshow/${item.id}`);
            },
          } as MovieCardConfig;

          return trendingItem;
        });
        this.filteredMovies = [...this.movies];
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }

  getMovies() {
    this.genericHttpService.httpGet(Endpoints.MOVIES).subscribe({
      next: (res: MoviesData) => {

        this.movies = res.results.map((item: MovieResult) => {
          let trendingItem = {
            image: Endpoints.IMAGE_BASE + `/w500${item.backdrop_path}`,
            name: item.original_title ? item.original_title : '-Title Unavaliable-',
            mediaType: 'movie',
            rating: item.vote_average,
            onClick: () => {
                this.router.navigateByUrl(`movie/${item.id}`);
            },
          } as MovieCardConfig;

          return trendingItem;
        });
        this.filteredMovies = [...this.movies];
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }

}
