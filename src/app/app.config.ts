import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { UserService } from './core/services/user.service';
import { AuthenticationService } from './core/services/authentication.service';
import { of } from 'rxjs';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { NotificationService } from './core/services/notification.service';

export function intializeUserData(userService:UserService, authService:AuthenticationService, notificationService:NotificationService) {
  if (authService.isLoggedIn()) {
    return () => userService.getBootstrapData().subscribe((res:any) => {
      const currentUser = res.current_user;
      notificationService.listen(currentUser.id);
    });
  } else {
    return () => of(null);
  }
}

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    {
      provide: APP_INITIALIZER,
      useFactory: intializeUserData,
      deps: [UserService, AuthenticationService, NotificationService],
      multi: true
    },
    provideHttpClient(withInterceptors([authInterceptor]))
  ]
};
