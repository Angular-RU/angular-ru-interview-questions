import {
    afterNextRender,
    ChangeDetectionStrategy,
    Component,
    inject,
    viewChild,
    ViewContainerRef,
} from '@angular/core';
import {REMOTE_WIDGETS} from './remote-widgets.config';
import {RemoteWidgetLoaderService} from './remote-widget-loader.service';
import {
    type MoviesRemoteComponent,
    type RemoteWidgetRefs,
    type TicketAvailabilityRemoteComponent,
} from './remote-widget.types';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.html',
    styleUrl: './app.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [RemoteWidgetLoaderService],
})
export class App {
    private readonly remoteWidgetLoader = inject(RemoteWidgetLoaderService);

    private readonly moviesContainer = viewChild.required('movies', {
        read: ViewContainerRef,
    });

    private readonly ticketAvailabilityContainer = viewChild.required(
        'ticketAvailability',
        {
            read: ViewContainerRef,
        },
    );

    protected readonly moviesState = this.remoteWidgetLoader.createState();
    protected readonly ticketAvailabilityState = this.remoteWidgetLoader.createState();

    constructor() {
        afterNextRender(() => {
            void this.initRemoteWidgets();
        });
    }

    public async initRemoteWidgets(): Promise<void> {
        const refs = await this.mountRemoteWidgets();

        if (!refs) {
            return;
        }

        this.connectMovieSelection(refs);
        this.connectBookingFlow(refs);
    }

    private async mountRemoteWidgets(): Promise<RemoteWidgetRefs | null> {
        const [moviesRef, ticketAvailabilityRef] = await Promise.all([
            this.remoteWidgetLoader.mount<MoviesRemoteComponent>({
                config: REMOTE_WIDGETS.movies,
                getContainer: () => this.moviesContainer(),
                state: this.moviesState,
            }),
            this.remoteWidgetLoader.mount<TicketAvailabilityRemoteComponent>({
                config: REMOTE_WIDGETS.ticketAvailability,
                getContainer: () => this.ticketAvailabilityContainer(),
                state: this.ticketAvailabilityState,
            }),
        ]);

        if (!moviesRef || !ticketAvailabilityRef) {
            return null;
        }

        return {
            moviesRef,
            ticketAvailabilityRef,
        };
    }

    private connectMovieSelection({
        moviesRef,
        ticketAvailabilityRef,
    }: RemoteWidgetRefs): void {
        const subscription = moviesRef.instance.movieSelected.subscribe((movie) => {
            ticketAvailabilityRef.setInput('movie', movie);
        });

        moviesRef.onDestroy(() => {
            subscription.unsubscribe();
        });
    }

    private connectBookingFlow({ticketAvailabilityRef}: RemoteWidgetRefs): void {
        const subscription = ticketAvailabilityRef.instance.bookingContinued.subscribe(
            (movie) => {
                console.log('Continue booking:', movie);

                alert('Демо, можно открыть checkout widget...');
            },
        );

        ticketAvailabilityRef.onDestroy(() => {
            subscription.unsubscribe();
        });
    }
}
