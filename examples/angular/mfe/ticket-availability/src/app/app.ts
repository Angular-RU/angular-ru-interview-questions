import {ChangeDetectionStrategy, Component, computed, input, output} from '@angular/core';

interface Movie {
    id: number;
    title: string;
}

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.html',
    styleUrl: './app.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
    private readonly availabilityByMovieId: Record<number, number> = {
        1: 43,
        2: 212,
        3: 9,
    };

    public readonly movie = input<Movie | null>(null);

    public readonly bookingContinued = output<Movie>();

    protected readonly availableTickets = computed(() => {
        const movie = this.movie();

        return movie ? (this.availabilityByMovieId[movie.id] ?? 0) : 0;
    });

    protected continueBooking(): void {
        const movie = this.movie();

        if (!movie) {
            return;
        }

        this.bookingContinued.emit(movie);
    }
}

export {App as TicketAvailabilityWidgetComponent};
