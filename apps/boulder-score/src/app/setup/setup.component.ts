import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  HlmCardContentDirective,
  HlmCardDescriptionDirective,
  HlmCardDirective, HlmCardFooterDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective
} from '@spartan-ng/ui-card-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import {
  HlmMenuComponent,
  HlmMenuGroupComponent,
  HlmMenuItemDirective,
  HlmMenuItemIconDirective, HlmMenuLabelComponent, HlmMenuSeparatorComponent
} from '@spartan-ng/ui-menu-helm';
import { provideIcons } from '@ng-icons/core';
import { lucideArrowLeft, lucideGripVertical, lucideMoreVertical, lucideTrash } from '@ng-icons/lucide';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { RouterLink } from '@angular/router';
import { Finalist } from '../shared/models/finalist';
import { SetupService } from './data-access/setup.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CdkDrag, CdkDragDrop, CdkDragPlaceholder, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { BrnRadioComponent, BrnRadioGroupComponent } from '@spartan-ng/ui-radiogroup-brain';
import {
  HlmRadioDirective,
  HlmRadioGroupDirective,
  HlmRadioIndicatorComponent,
} from '@spartan-ng/ui-radiogroup-helm';
import { GenderComponent } from '../shared/ui/gender.component';

@Component({
  selector: 'bs-setup',
  standalone: true,
  imports: [CommonModule, HlmCardDirective, HlmCardHeaderDirective, HlmCardTitleDirective, HlmCardDescriptionDirective, HlmCardContentDirective, HlmCardFooterDirective, HlmIconComponent, HlmMenuItemIconDirective, HlmButtonDirective, RouterLink, ReactiveFormsModule, CdkDrag, CdkDropList, HlmInputDirective, HlmMenuComponent, HlmMenuGroupComponent, HlmMenuItemDirective, HlmMenuLabelComponent, HlmMenuSeparatorComponent, BrnMenuTriggerDirective, CdkDragPlaceholder, HlmLabelDirective, HlmRadioGroupDirective, HlmRadioDirective, HlmRadioIndicatorComponent, BrnRadioComponent, GenderComponent],
  providers: [
    provideIcons({ lucideArrowLeft, lucideGripVertical, lucideMoreVertical, lucideTrash })
  ],
  template: `
    <div class="flex flex-col gap-4 md:gap-8 h-full">
      <button hlmBtn variant="link" routerLink="/home" class="w-min">
        <hlm-icon size="lg" aria-describedby="return to previous screen" name="lucideArrowLeft"
                  class="mr-0" />
      </button>

      <section hlmCard>
        <div hlmCardHeader>
          <h1 hlmCardTitle>Configurez la finale</h1>
          <p hlmCardDescription>Configurez le déroulement de la finale et ses compétiteurs</p>
        </div>
        <div hlmCardContent>
          <form [formGroup]="setupService.formGroup" class="flex flex-col gap-4">
            <section>
              <label hlmLabel>
                Nom de l'évènement
                <input hlmInput formControlName="nameOfEvent" placeholder="Nom *" />
              </label>
            </section>

            <section>
              <label hlmLabel>
                Genre
                <bs-gender formControlName="gender"/>
              </label>
            </section>

            <section>
                <ng-container formArrayName="finalists">
                  <div cdkDropList class="flex flex-col gap-4" (cdkDropListDropped)="drop($event)">
                    @for (finalist of finalists.controls; track $index) {
                      <div cdkDrag>
                        <div class="flex items-center gap-4">
                          <span class="font-bold text-xl">{{ $index + 1 }}</span>
                          <hlm-icon aria-describedby="ordrer elements" name="lucideGripVertical" class="mr-0 hover:cursor-move" />
                          <ng-container [formGroupName]="$index">
                            <input hlmInput placeholder="Prénom *" formControlName="firstName" class="w-full" />
                          </ng-container>
                          <hlm-icon aria-describedby="more actions on line" name="lucideMoreVertical"
                                    class="mr-0 hover:cursor-pointer" [brnMenuTriggerFor]="menu" />
                        </div>
                        <div class="bg-stone-50 min-h-10 rounded-xl" *cdkDragPlaceholder></div>
                      </div>
                    }
                  </div>

                  <ng-template #menu>
                    <hlm-menu>
                      <hlm-menu-label>Actions</hlm-menu-label>
                      <hlm-menu-separator />
                      <hlm-menu-group>
                        <button hlmMenuItem class="flex items-center gap-4">
                          <span class="text-red-400">Supprimer</span>
                          <hlm-icon name="lucideTrash" hlmMenuIcon class="text-red-400" />
                        </button>
                      </hlm-menu-group>
                    </hlm-menu>
                  </ng-template>
                </ng-container>
            </section>
          </form>
        </div>
      </section>
    </div>

    <button hlmBtn>Valider pour une durée totale de 60'</button>
  `,
  styles: `
  :host {
    @apply h-full flex flex-col content-between gap-4 md:gap-8;
  }`,
})
export default class SetupComponent {
  readonly setupService = inject(SetupService);
  protected finalists = this.setupService.formGroup.controls.finalists;

  drop(event: CdkDragDrop<Finalist[]>) {
    moveItemInArray(this.finalists.value, event.previousIndex, event.currentIndex);
  }
}
