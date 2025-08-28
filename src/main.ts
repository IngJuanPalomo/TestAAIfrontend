import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { App } from './app/app';
import { appConfig } from './app/app.config';
import { API_URL } from './app/core/tokens/api-url.token';
import { apiBaseUrlInterceptor } from './app/core/interceptors/api-base-url.interceptor';
import { environment } from './environments/environment';

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    provideHttpClient(withFetch(), withInterceptors([apiBaseUrlInterceptor])), // registra el interceptor
    { provide: API_URL, useValue: environment.apiUrl }, // provee la URL base del API
  ],
}).catch((err) => console.error(err));