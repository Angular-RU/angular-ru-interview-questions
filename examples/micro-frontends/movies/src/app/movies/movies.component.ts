import {ChangeDetectionStrategy, Component, inject} from '@angular/core';

import {MoviesService} from './movies.service';
import {Movie} from './movie.model';

@Component({
    selector: 'app-movies',
    standalone: true,
    templateUrl: './movies.component.html',
    styleUrl: './movies.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoviesComponent {
    private readonly moviesService = inject(MoviesService);

    protected readonly movies = this.moviesService.getMovies();

    checkAvailability(movie: Movie) {
        window.dispatchEvent(
            new CustomEvent('movieSelected', {
                detail: movie,
            }),
        );
    }
}
