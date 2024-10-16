import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import {
  HlmMenuComponent,
  HlmMenuGroupComponent,
  HlmMenuItemDirective,
  HlmMenuItemIconDirective, HlmMenuLabelComponent, HlmMenuSeparatorComponent
} from '@spartan-ng/ui-menu-helm';
import { provideIcons } from '@ng-icons/core';
import { lucideMoon, lucideSun, lucideStar } from '@ng-icons/lucide';
import { BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';
import { ThemeService } from '../../../../../apps/boulder-score/src/app/shared/data-access/theme.service';

@Component({
  selector: 'bs-theme-selector',
  standalone: true,
  providers: [
    provideIcons({ lucideSun, lucideMoon, lucideStar })
  ],
  imports: [CommonModule, HlmIconComponent, HlmMenuComponent, HlmMenuGroupComponent, HlmMenuItemDirective, HlmMenuItemIconDirective, HlmMenuLabelComponent, HlmMenuSeparatorComponent, BrnMenuTriggerDirective],
  template: `
      @if (themeService.theme() === 'light') {
        <hlm-icon name="lucideSun" size="lg" class="mr-0" [brnMenuTriggerFor]="menu" />
      } @else if (themeService.theme() === 'dark') {
        <hlm-icon name="lucideMoon" size="lg" class="mr-0" [brnMenuTriggerFor]="menu" />
      } @else {
        <hlm-icon name="lucideStar" size="lg" class="mr-0" [brnMenuTriggerFor]="menu" />
      }

    <ng-template #menu>
      <hlm-menu>
        <hlm-menu-label>Thèmes</hlm-menu-label>
        <hlm-menu-separator />
        <hlm-menu-group>
          <button hlmMenuItem (click)="themeService.themeSelected$.next('light')">
            <hlm-icon name="lucideSun" hlmMenuIcon />
            Clair
          </button>
          <button hlmMenuItem (click)="themeService.themeSelected$.next('dark')">
            <hlm-icon name="lucideMoon" hlmMenuIcon />
            Sombre
          </button>
          <button hlmMenuItem (click)="themeService.themeSelected$.next('climbing')">
            <hlm-icon name="lucideStar" hlmMenuIcon />
            Escalade
          </button>
        </hlm-menu-group>
      </hlm-menu>
    </ng-template>
  `
})
export class BsThemeSelectorComponent {
  readonly themeService = inject(ThemeService);
}
