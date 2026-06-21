import {Injectable, type Type} from '@angular/core';
import {loadRemoteModule} from '@angular-architects/native-federation';

interface LoadRemoteComponentOptions {
    remoteName: string;
    exposedModule: string;
    exportName: string;
}

@Injectable({
    providedIn: 'root',
})
export class MicroFrontendService {
    public async loadRemoteComponent<T = unknown>({
        remoteName,
        exposedModule,
        exportName,
    }: LoadRemoteComponentOptions): Promise<Type<T> | null> {
        try {
            const remoteModule = (await loadRemoteModule(
                remoteName,
                exposedModule,
            )) as Record<string, Type<T> | undefined>;

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
            console.error(`Cannot load remote component "${remoteName}"`, error);

            return null;
        }
    }
}
