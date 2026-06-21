import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.html',
})
export class App {
    movieId: number | null = null;
    availability: number[] = [43, 212, 9, 119, 20, 98];
    availableTickets = 0;

    getAvailability() {
        this.availableTickets = this.availability[this.movieId!];
    }
}
