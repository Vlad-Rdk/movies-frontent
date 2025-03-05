export class Endpoints{
    static MOVIES:string='discover/movie';
    static TVSHOWS='discover/tv';
    static MOVIE_ID = (movieId:string)=>`movie/${movieId}`;
    static TV_SHOW_ID = (seriesId:string)=>`tv/${seriesId}`;
    static TRENDS:string = 'trending/all/day?language=en-US';
    static IMAGE_BASE:string = 'https://image.tmdb.org/t/p/';
}