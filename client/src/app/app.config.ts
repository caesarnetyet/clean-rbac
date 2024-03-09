import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {provideHttpClient, withFetch, withInterceptors} from "@angular/common/http";
import {rbacApiInterceptor} from "./interceptors/rbac-api.interceptor";
export const appConfig: ApplicationConfig = {
  providers: [
      provideRouter(routes),
      provideHttpClient(
          withInterceptors([rbacApiInterceptor]),
      withFetch()
      ),
  ]
};
