import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { BrewtoothModule } from './app/brewtooth.module';


platformBrowserDynamic().bootstrapModule(BrewtoothModule)
  .catch(err => console.error(err));
