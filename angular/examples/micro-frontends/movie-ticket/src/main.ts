import {initFederation} from '@angular-architects/native-federation';

const manifestUrl = new URL('federation.manifest.json', document.baseURI).toString();

initFederation(manifestUrl)
    .catch((error) => console.error(error))
    .then(() => import('./bootstrap'))
    .catch((error) => console.error(error));
