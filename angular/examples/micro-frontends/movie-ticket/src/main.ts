import {initFederation} from '@angular-architects/native-federation';

import {environment} from './environments/environment';

initFederation(environment.federationManifest)
    .catch((error) => console.error(error))
    .then(() => import('./bootstrap'))
    .catch((error) => console.error(error));
