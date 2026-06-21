import {withNativeFederation, shareAll} from '@angular-architects/native-federation/config';

export default withNativeFederation({
    name: 'movies',

    exposes: {
        './Component': './src/app/app.ts',
    },

    shared: {
        ...shareAll(
            {singleton: true, strictVersion: true, requiredVersion: 'auto', build: 'package'},
            {
                overrides: {
                    // includeSecondaries is an opt-out of ignoreUnusedDeps, so all of
                    // @angular/core is shared to prevent mismatches.
                    '@angular/core': {
                        singleton: true,
                        strictVersion: true,
                        requiredVersion: 'auto',
                        build: 'package',
                        includeSecondaries: {keepAll: true},
                    },
                },
            },
        ),
    },

    skip: [
        'rxjs/ajax',
        'rxjs/fetch',
        'rxjs/testing',
        'rxjs/webSocket',
        // Add further packages you don't need at runtime
    ],

    // Please read our FAQ about sharing libs:
    // https://shorturl.at/jmzH0

    features: {
        // ignoreUnusedDeps is enabled by default now
        // ignoreUnusedDeps: true,

        // Opt-in: groups chunks in remoteEntry.json for smaller metadata file
        denseChunking: true,
    },
});
