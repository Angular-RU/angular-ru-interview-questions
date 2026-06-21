import {initFederation} from '@angular-architects/native-federation';

initFederation({'movies-ticket': './remoteEntry.json'})
    .catch((err) => console.error(err))
    .then((_) => import('./bootstrap'))
    .catch((err) => console.error(err));
