import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { API_URL } from '../tokens/api-url.token';

export const apiBaseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const apiUrl = inject(API_URL);

  // Solo prefija si la URL es relativa (empieza con /api), si la URL ya es absoluta, no la modificamos.
  if (/^https?:\/\//i.test(req.url)) {
    return next(req);
  }

  const apiReq = req.clone({
  url: `${apiUrl}${req.url.startsWith('/') ? req.url : '/' + req.url}`
});

  return next(apiReq);
};
