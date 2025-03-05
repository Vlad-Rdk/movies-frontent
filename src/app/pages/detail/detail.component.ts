import { Component, OnInit } from '@angular/core';
import { DetailBannerComponent } from '../../components/detail-banner/detail-banner.component';
import { ActivatedRoute } from '@angular/router';
import { GenericHttpService } from '../../services/generic-http.service';
import { Endpoints } from '../../endpoints/endpoints';
import {
  MovieDetailData,
} from '../../interfaces/models/movie-details.interface';
import { DetailBannerConfig } from '../../interfaces/ui-config/detail-banner-config.interface';
import { RateChipComponent } from '../../components/rate-chip/rate-chip.component';
import { DetailConfig } from '../../interfaces/ui-config/detail-config.interface';
import { TVDetailData } from '../../interfaces/models/tv-details.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [DetailBannerComponent, RateChipComponent, CommonModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
})
export class DetailComponent implements OnInit {
  bannerConfig!: DetailBannerConfig;
  config!: DetailConfig;

  constructor(
    private activatedRoute: ActivatedRoute,
    private genericService: GenericHttpService
  ) {}
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (paramMap: any) => {

        if (paramMap.params.movieId) {
          this.getMovieById(paramMap.params.movieId);
        } else if (paramMap.params.seriesId) {
          this.getTVShowById(paramMap.params.seriesId);
        }
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  getMovieById(movieId: string) {
    this.genericService.httpGet(Endpoints.MOVIE_ID(movieId)).subscribe({
      next: (res: MovieDetailData) => {
        this.bannerConfig = {
          image: Endpoints.IMAGE_BASE + `/w1280${res.backdrop_path}`,
          pageName: 'Movies',
          path: 'movies',
          title: res.original_title || 'Unknown Title',
        };

        let genreNames =
          res.genres?.map((genre) => genre.name).join(', ') || 'Unknown';

        this.config = {
          image: Endpoints.IMAGE_BASE + `w500${res.poster_path}`,
          subtitle: res.tagline || 'No subtitle available',
          description: res.overview || 'No description available',
          rate: res.vote_average ?? 0, // Default to 0 if undefined
          isVertical: true,
          detailCard: [
            { title: 'Type ', description: 'Movie' },
            {
              title: 'Release Date ',
              description: res.release_date || 'Unknown',
            },
            {
              title: 'Run Time ',
              description: res.runtime ? res.runtime.toString() : 'N/A',
            },
            { title: 'Genres ', description: genreNames },
          ],
        };
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }

  getTVShowById(tvshowId: string) {
    this.genericService.httpGet(Endpoints.TV_SHOW_ID(tvshowId)).subscribe({
      next: (res: TVDetailData) => {
        this.bannerConfig = {
          image: Endpoints.IMAGE_BASE + `/w1280${res.backdrop_path}`,
          pageName: 'TV-Show',
          path: 'tvshows',
          title: res.name || 'Unknown Title',
        };

        let genreNames =
          res.genres?.map((genre) => genre.name).join(', ') || 'Unknown';

        this.config = {
          image: Endpoints.IMAGE_BASE + `w500${res.poster_path}`,
          subtitle: res.tagline || 'No subtitle available',
          description: res.overview || 'No description available',
          rate: res.vote_average ?? 0,
          isVertical: false,
          detailCard: [
            { title: 'Type ', description: 'TV-Show' },
            { title: 'Status ', description: res.status || 'Unknown' },
            {
              title: 'First Air Date ',
              description: res.first_air_date || 'Unknown',
            },
            {
              title: 'Last Air Date',
              description: res.last_air_date || 'Unknown',
            },
            {
              title: 'Number of Seasons',
              description: res.number_of_seasons?.toString() || 'N/A',
            },
            {
              title: 'Number of Episodes',
              description: res.number_of_episodes?.toString() || 'N/A',
            },
            {
              title: 'Episode Runtime',
              description: res.episode_run_time?.length
                ? res.episode_run_time.join(', ')
                : 'N/D',
            },
            { title: 'Genres ', description: genreNames },
          ],
        };
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }
}
