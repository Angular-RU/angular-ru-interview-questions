import {Injectable, Type} from '@angular/core';
import {loadRemoteModule} from '@angular-architects/native-federation';

interface LoadRemoteComponentOptions {
    port: number;
    remoteName: string;
    exposedModule?: string;
    exportName?: string;
}

@Injectable({
    providedIn: 'root',
})
export class MicroFrontendService {
    public async loadRemoteComponent<TComponent>({
        port,
        remoteName,
        exposedModule = './Component',
        exportName = 'App',
    }: LoadRemoteComponentOptions): Promise<Type<TComponent> | null> {
        try {
            const remoteModule = (await loadRemoteModule({
                remoteName,
                exposedModule,
                remoteEntry: `http://localhost:${port}/remoteEntry.json`,
            })) as Record<string, Type<TComponent> | undefined>;

            const component = remoteModule[exportName];

            if (!component) {
                console.error(
                    `Remote export "${exportName}" was not found`,
                    remoteModule,
                );

                return null;
            }

            return component;
        } catch (error) {
            console.error('Cannot load remote component', error);

            return null;
        }
    }
}
