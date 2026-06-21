import {type RemoteWidgetConfig} from './remote-widget.types';

export const REMOTE_WIDGETS = {
    movies: {
        id: 'movies',
        remoteName: 'movies',
        exposedModule: './MoviesWidget',
        exportName: 'MoviesComponent',
    },
    ticketAvailability: {
        id: 'ticketAvailability',
        remoteName: 'ticket-availability',
        exposedModule: './Component',
        exportName: 'App',
    },
} satisfies Record<string, RemoteWidgetConfig>;
