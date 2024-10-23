import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BsThemeSelectorComponent } from '@boulder-score/bs-theme-selector';
import { ThemeService } from './shared/data-access/theme.service';

@Component({
  standalone: true,
  imports: [RouterModule, BsThemeSelectorComponent],
  selector: 'bs-root',
  template: `
    <bs-theme-selector [theme]="themeService.theme()" (change)="themeService.themeSelected$.next($event)" class="absolute right-8 top-6" />
    <router-outlet />
  `,
  styles: ``
})
export class AppComponent {
  themeService = inject(ThemeService);
}
