import { Injectable, InjectionToken, PLATFORM_ID, inject } from '@angular/core';
import { Theme } from '@boulder-score/models';
import { of } from 'rxjs';

export const LOCAL_STORAGE = new InjectionToken<Storage>('window local storage object', {
  providedIn: 'root',
  factory: () => {
    return inject(PLATFORM_ID) === 'browser' ? window.localStorage : ({} as Storage);
  },
});

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  storage = inject(LOCAL_STORAGE);

  loadTheme() {
    const theme = this.storage.getItem('theme');
    return of(theme ? (JSON.parse(theme) as Theme) : 'light');
  }

  saveTheme(theme: Theme) {
    this.storage.setItem('theme', JSON.stringify(theme));
  }
}
