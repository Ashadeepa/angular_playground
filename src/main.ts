import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));


if ('serviceWorker' in navigator) {
   navigator.serviceWorker.register('./ngsw-worker.js')
    .then(function(registration) {
      console.log('Service Worker registered with scope:', registration.scope);
    }).catch(function(error) {
    console.log('Service Worker registration failed:', error);
  });
}
