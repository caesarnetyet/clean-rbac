import { HttpInterceptorFn } from '@angular/common/http';
import {environment} from "../../environments/environment";

export const rbacApiInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  const { apiUrl } = environment;

  // If the URL is absolute, use it as is. Otherwise, prepend the API URL.
  const url = absoluteURL(req.url) ? req.url : `${apiUrl}${req.url}`;

  const finalRequest = req.clone({
    url: url,
    headers: req.headers.set('Authorization', `Bearer ${token}`),
  });

  return next(finalRequest);
};

const absoluteURL = (url: string) => url.startsWith('http') || url.startsWith('https');