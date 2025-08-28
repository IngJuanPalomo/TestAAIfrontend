import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class HttpErrorService {
  handle(error: unknown): never {
    // Aquí puedes enrutar a notificaciones, logger, etc.
    console.error('HTTP error:', error);
    throw error;
  }
}
