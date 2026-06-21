import {
    Component,
    ComponentRef,
    inject,
    OnDestroy,
    OnInit,
    viewChild,
    ViewContainerRef,
} from '@angular/core';

import {MicroFrontendService} from './micro-frontend.service';

interface LoadRemoteOptions {
    port: number;
    remoteName: string;
    getContainer: () => ViewContainerRef;
    exposedModule?: string;
    exportName?: string;
}

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.html',
    styleUrl: './app.css',
})
export class App implements OnInit, OnDestroy {
    private readonly service = inject(MicroFrontendService);

    private readonly moviesContainer = viewChild.required('movies', {
        read: ViewContainerRef,
    });

    private readonly ticketAvailabilityContainer = viewChild.required(
        'ticketAvailability',
        {
            read: ViewContainerRef,
        },
    );

    private readonly componentRefs: ComponentRef<unknown>[] = [];

    public async ngOnInit(): Promise<void> {
        await this.load({
            port: 4201,
            remoteName: 'movies',
            getContainer: () => this.moviesContainer(),
        });

        await this.load({
            port: 4202,
            remoteName: 'ticket-availability',
            getContainer: () => this.ticketAvailabilityContainer(),
        });
    }

    public ngOnDestroy(): void {
        for (const componentRef of this.componentRefs) {
            componentRef.destroy();
        }
    }

    private async load({
        port,
        remoteName,
        getContainer,
        exposedModule = './Component',
        exportName = 'App',
    }: LoadRemoteOptions): Promise<void> {
        const component = await this.service.loadRemoteComponent({
            port,
            remoteName,
            exposedModule,
            exportName,
        });

        if (!component) {
            return;
        }

        const container = getContainer();

        container.clear();

        const componentRef = container.createComponent(component);

        componentRef.changeDetectorRef.detectChanges();

        this.componentRefs.push(componentRef);
    }
}
