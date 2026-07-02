import {
    type ComponentRef,
    type OutputEmitterRef,
    type ViewContainerRef,
    type WritableSignal,
} from '@angular/core';

export type RemoteWidgetStatus = 'idle' | 'loading' | 'ready' | 'error';

export interface RemoteWidgetState {
    status: RemoteWidgetStatus;
    error: unknown | null;
}

export interface RemoteWidgetConfig {
    id: string;
    remoteName: string;
    exposedModule: string;
    exportName: string;
}

export interface MountRemoteWidgetOptions {
    config: RemoteWidgetConfig;
    getContainer: () => ViewContainerRef;
    state: WritableSignal<RemoteWidgetState>;
}

export interface Movie {
    id: number;
    title: string;
}

export interface MoviesRemoteComponent {
    movieSelected: OutputEmitterRef<Movie>;
}

export interface TicketAvailabilityRemoteComponent {
    bookingContinued: OutputEmitterRef<Movie>;
}

export interface RemoteWidgetRefs {
    moviesRef: ComponentRef<MoviesRemoteComponent>;
    ticketAvailabilityRef: ComponentRef<TicketAvailabilityRemoteComponent>;
}
