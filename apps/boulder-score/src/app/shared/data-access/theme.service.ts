import { computed, effect, inject, Injectable, RendererFactory2, signal } from '@angular/core';
import { StorageService } from './storage.service';
import { DOCUMENT } from '@angular/common';
import { catchError, EMPTY, map, merge, Subject } from 'rxjs';
import { Theme } from '../models/theme';
import { connect } from 'ngxtension/connect';

type AppState = {
  theme: Theme;
  loaded: boolean;
  error: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  readonly storage = inject(StorageService);
  private readonly _renderer = inject(RendererFactory2).createRenderer(null, null);
  private readonly _document = inject(DOCUMENT);

  private readonly appState = signal<AppState>({
    theme: 'light',
    loaded: false,
    error: null
  });

  private error$ = new Subject<string>();

  private themeLoaded$ = this.storage.loadTheme().pipe(
    catchError(() => {
      this.error$.next('Could not load theme');
      return EMPTY;
    }),
  );

  readonly theme = computed(() => this.appState().theme);
  readonly error = computed(() => this.appState().error);
  readonly loaded = computed(() => this.appState().loaded);

  readonly themeSelected$ = new Subject<Theme>();

  constructor() {
    const nextState$ = merge(
      this.themeLoaded$.pipe(map((theme) => ({ theme, loaded: true }))),
      this.error$.pipe(map((error) => ({ error })))
    );

    connect(this.appState)
      .with(nextState$)
      .with(this.themeSelected$, (state, theme) => {
        this.handleThemeClass(state.theme, theme);
        return { theme };
      });

    effect(() => {
      const theme = this.theme();

      if (this.loaded()) {
        this.storage.saveTheme(theme);
        this.handleThemeClass(theme, theme);
      }
    }, {allowSignalWrites: false});
  }

  private handleThemeClass(oldTheme: Theme, newTheme: Theme) {
    if (this._document.documentElement.className.includes(oldTheme)) {
      this._renderer.removeClass(this._document.documentElement, oldTheme);
    }
    this._renderer.addClass(this._document.documentElement, newTheme);
  }
}
