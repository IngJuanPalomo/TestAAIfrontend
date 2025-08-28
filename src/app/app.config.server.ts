import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import { API_URL } from './core/tokens/api-url.token';
import { apiBaseUrlInterceptor } from './core/interceptors/api-base-url.interceptor';
import { environment } from '../environments/environment';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(serverRoutes)),
    provideHttpClient(
      withFetch(),
      withInterceptors([apiBaseUrlInterceptor])
    ),
    { provide: API_URL, useValue: environment.apiUrl }
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
