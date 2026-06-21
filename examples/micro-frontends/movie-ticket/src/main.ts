import {initFederation} from '@angular-architects/native-federation';

initFederation('/federation.manifest.json')
    .catch((error) => console.error(error))
    .then(() => import('./bootstrap'))
    .catch((error) => console.error(error));
