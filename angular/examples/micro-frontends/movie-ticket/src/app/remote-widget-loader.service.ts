import {
    type ComponentRef,
    Injectable,
    inject,
    OnDestroy,
    signal,
    type WritableSignal,
} from '@angular/core';
import {MicroFrontendService} from './micro-frontend.service';
import {
    type MountRemoteWidgetOptions,
    type RemoteWidgetState,
} from './remote-widget.types';

@Injectable()
export class RemoteWidgetLoaderService implements OnDestroy {
    private readonly microFrontendService = inject(MicroFrontendService);
    private readonly componentRefs = new Set<ComponentRef<unknown>>();

    public createState(): WritableSignal<RemoteWidgetState> {
        return signal({
            status: 'idle',
            error: null,
        });
    }

    public async mount<T = unknown>({
        config,
        getContainer,
        state,
    }: MountRemoteWidgetOptions): Promise<ComponentRef<T> | null> {
        state.set({
            status: 'loading',
            error: null,
        });

        try {
            const component = await this.microFrontendService.loadRemoteComponent<T>({
                remoteName: config.remoteName,
                exposedModule: config.exposedModule,
                exportName: config.exportName,
            });

            if (!component) {
                throw new Error(`Remote widget "${config.id}" was not loaded`);
            }

            const container = getContainer();

            container.clear();

            const componentRef = container.createComponent(component);

            componentRef.changeDetectorRef.detectChanges();

            this.componentRefs.add(componentRef as ComponentRef<unknown>);

            componentRef.onDestroy(() => {
                this.componentRefs.delete(componentRef as ComponentRef<unknown>);
            });

            state.set({
                status: 'ready',
                error: null,
            });

            return componentRef;
        } catch (error) {
            console.error(`Cannot mount remote widget "${config.id}"`, error);

            state.set({
                status: 'error',
                error,
            });

            return null;
        }
    }

    public ngOnDestroy(): void {
        for (const componentRef of this.componentRefs) {
            componentRef.destroy();
        }

        this.componentRefs.clear();
    }
}
