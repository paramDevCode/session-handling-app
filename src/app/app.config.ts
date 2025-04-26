import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter,withHashLocation  } from '@angular/router';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withHashLocation()), 
    provideClientHydration(),
    provideHttpClient(),
    importProvidersFrom(BrowserAnimationsModule),
  ]
};
