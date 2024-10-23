import {
  APP_INITIALIZER,
  ApplicationConfig,
  LOCALE_ID,
  provideZoneChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { ConfigService } from './shared/data-access/config.service';
import { tap } from 'rxjs';
import { ConfigDTO, parseDTO } from './shared/models/config';

const initializeAppFactory = (
  httpClient: HttpClient,
  configService: ConfigService
) => {
  const url = './config.json';
  return () =>
    httpClient.get(url).pipe(
      tap((config) => {
        const dto = parseDTO(config);
        if (dto.success) {
          configService.setConfig(dto.data);
        } else {
          console.error('Invalid config.json', dto.error);
        }
      })
    );
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHttpClient(),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAppFactory,
      multi: true,
      deps: [HttpClient, ConfigService],
    },
    {provide: LOCALE_ID, useValue: (APP_INITIALIZER: ConfigDTO) => APP_INITIALIZER.locale, deps: [APP_INITIALIZER] }
  ],
};
