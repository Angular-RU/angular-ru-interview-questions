import {type RemoteWidgetConfig} from './remote-widget.types';

export const REMOTE_WIDGETS = {
    movies: {
        id: 'movies',
        remoteName: 'movies',
        exposedModule: './Widget',
        exportName: 'MoviesWidgetComponent',
    },
    ticketAvailability: {
        id: 'ticketAvailability',
        remoteName: 'ticket-availability',
        exposedModule: './Widget',
        exportName: 'TicketAvailabilityWidgetComponent',
    },
} satisfies Record<string, RemoteWidgetConfig>;
