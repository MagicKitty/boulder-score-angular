import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { provideIcons } from '@ng-icons/core';
import { lucideHelpCircle } from '@ng-icons/lucide';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { HlmMenuItemIconDirective } from '@spartan-ng/ui-menu-helm';
import { HlmTooltipComponent, HlmTooltipTriggerDirective } from '@spartan-ng/ui-tooltip-helm';
import { BrnTooltipContentDirective } from '@spartan-ng/ui-tooltip-brain';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'bs-home',
  standalone: true,
  imports: [CommonModule, HlmButtonDirective, HlmIconComponent, HlmMenuItemIconDirective, HlmTooltipComponent, HlmTooltipTriggerDirective, BrnTooltipContentDirective, RouterLink],
  providers: [
    provideIcons({ lucideHelpCircle })
  ],
  template: `
    <div class="flex items-center gap-4">
      <button hlmBtn routerLink="/finals/setup">Configurer une finale amicale</button>
      <hlm-tooltip>
        <hlm-icon hlmTooltipTrigger aria-describedby="explanation on what button is" name="lucideHelpCircle" class="mr-0" />
        <span *brnTooltipContent>
          Une finale amicale permet entre autre d'allouer un temps total par bloc ou encore d'autoriser le passage des finalistes dans l'ordre de votre choix.
        </span>
      </hlm-tooltip>
    </div>
  `,
  styles: `
    :host {
      @apply w-full h-full flex justify-center items-center;
    }
  `
})
export default class HomeComponent {}
