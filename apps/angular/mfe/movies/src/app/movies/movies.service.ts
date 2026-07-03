import {Injectable} from '@angular/core';

import {Movie} from './movie.model';

const remoteAssetBaseUrl = new URL('.', import.meta.url);

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
            preview: new URL('img/interstellar.png', remoteAssetBaseUrl).href,
        },
        {
            id: 2,
            title: 'The Matrix',
            year: 1999,
            genre: 'Action',
            rating: 8.7,
            preview: new URL('img/matrix.png', remoteAssetBaseUrl).href,
        },
        {
            id: 3,
            title: 'Inception',
            year: 2010,
            genre: 'Sci-Fi',
            rating: 8.8,
            preview: new URL('img/inception.png', remoteAssetBaseUrl).href,
        },
    ];

    public getMovies(): Movie[] {
        return this.movies;
    }
}
