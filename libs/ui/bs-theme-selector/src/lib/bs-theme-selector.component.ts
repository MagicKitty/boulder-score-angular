import { Component, inject, input, output } from '@angular/core';
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
import { Theme } from '@boulder-score/models';

@Component({
  selector: 'bs-theme-selector',
  standalone: true,
  providers: [
    provideIcons({ lucideSun, lucideMoon, lucideStar })
  ],
  imports: [CommonModule, HlmIconComponent, HlmMenuComponent, HlmMenuGroupComponent, HlmMenuItemDirective, HlmMenuItemIconDirective, HlmMenuLabelComponent, HlmMenuSeparatorComponent, BrnMenuTriggerDirective],
  template: `
      @if (theme() === 'light') {
        <hlm-icon name="lucideSun" size="lg" class="mr-0" [brnMenuTriggerFor]="menu" />
      } @else if (theme() === 'dark') {
        <hlm-icon name="lucideMoon" size="lg" class="mr-0" [brnMenuTriggerFor]="menu" />
      } @else {
        <hlm-icon name="lucideStar" size="lg" class="mr-0" [brnMenuTriggerFor]="menu" />
      }

    <ng-template #menu>
      <hlm-menu>
        <hlm-menu-label>Thèmes</hlm-menu-label>
        <hlm-menu-separator />
        <hlm-menu-group>
          <button hlmMenuItem (click)="change.emit('light')">
            <hlm-icon name="lucideSun" hlmMenuIcon />
            Clair
          </button>
          <button hlmMenuItem (click)="change.emit('dark')">
            <hlm-icon name="lucideMoon" hlmMenuIcon />
            Sombre
          </button>
          <button hlmMenuItem (click)="change.emit('climbing')">
            <hlm-icon name="lucideStar" hlmMenuIcon />
            Escalade
          </button>
        </hlm-menu-group>
      </hlm-menu>
    </ng-template>
  `
})
export class BsThemeSelectorComponent {
  theme = input.required<Theme>();
  change = output<Theme>();
}
