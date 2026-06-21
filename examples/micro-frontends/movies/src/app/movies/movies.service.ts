import { Injectable } from '@angular/core';

import { Movie } from './movie.model';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private readonly movies: Movie[] = [
    {
      id: 1,
      title: 'Interstellar',
      year: 2014,
      genre: 'Sci-Fi',
      rating: 8.7,
    },
    {
      id: 2,
      title: 'The Matrix',
      year: 1999,
      genre: 'Action',
      rating: 8.7,
    },
    {
      id: 3,
      title: 'Inception',
      year: 2010,
      genre: 'Sci-Fi',
      rating: 8.8,
    },
  ];

  public getMovies(): Movie[] {
    return this.movies;
  }
}

