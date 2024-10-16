import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BsThemeSelectorComponent } from '@boulder-score/ui-theme-selector';

@Component({
  standalone: true,
  imports: [RouterModule, BsThemeSelectorComponent],
  selector: 'bs-root',
  template: `
    <bs-theme-selector class="absolute right-8 top-6" />
    <router-outlet />
  `,
  styles: ``
})
export class AppComponent {}
