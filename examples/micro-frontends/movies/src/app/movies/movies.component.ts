import {ChangeDetectionStrategy, Component, inject, output} from '@angular/core';
import {type Movie} from './movie.model';
import {MoviesService} from './movies.service';

@Component({
    selector: 'app-movies',
    standalone: true,
    templateUrl: './movies.component.html',
    styleUrl: './movies.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoviesComponent {
    private readonly moviesService = inject(MoviesService);

    public readonly movieSelected = output<Movie>();

    protected readonly movies = this.moviesService.getMovies();

    protected selectMovie(movie: Movie): void {
        this.movieSelected.emit(movie);
    }
}

export {MoviesComponent as MoviesWidgetComponent};
