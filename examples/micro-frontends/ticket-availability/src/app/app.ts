import {Component, OnDestroy, OnInit, signal} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.html',
})
export class App implements OnInit, OnDestroy {
    availability: number[] = [43, 212, 9, 119, 20, 98];
    movieId = signal<number | null>(null);
    availableTickets = signal(0);

    ngOnInit() {
        window.addEventListener('movieSelected', (event) => {
            const customEvent = event as CustomEvent;

            console.log(customEvent);

            this.movieId.set(customEvent?.detail?.id ?? null);

            this.checkAvailability();
        });
    }

    ngOnDestroy() {
        window.removeEventListener('movieSelected', () => {});
    }

    checkAvailability() {
        this.availableTickets.set(this.availability[this.movieId()!]);
    }
}
