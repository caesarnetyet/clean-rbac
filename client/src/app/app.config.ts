import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {provideHttpClient, withFetch, withInterceptors} from "@angular/common/http";
import {rbacApiInterceptor} from "./interceptors/rbac-api.interceptor";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ToastService } from './common/services/toast/toast.service';
import { MaterialToastService } from './common/services/toast/material-toast.service';
export const appConfig: ApplicationConfig = {
  providers: [
      provideRouter(routes),
      provideHttpClient(
          withFetch(),
          withInterceptors([rbacApiInterceptor]),
      ), provideAnimationsAsync(),
      {provide: ToastService, useClass: MaterialToastService}
  ]
};
