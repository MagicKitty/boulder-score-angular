import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BsThemeSelectorComponent } from '@boulder-score/ui-theme-selector';
import { ConfigService } from './shared/data-access/config.service';

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
export class AppComponent {
  config = inject(ConfigService).getConfig();

  constructor() {
    console.log(this.config.apiUrl);
  }
}
