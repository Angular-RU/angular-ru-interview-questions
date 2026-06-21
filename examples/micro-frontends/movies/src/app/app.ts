import { Component } from '@angular/core';

import { MoviesComponent } from './movies/movies.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MoviesComponent],
  template: ` <app-movies /> `,
})
export class App {}
