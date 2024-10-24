import {
  Component,
  ElementRef,
  inject,
  viewChild,
  viewChildren,
} from '@angular/core';
import { CommonModule, JsonPipe, TitleCasePipe } from '@angular/common';
import {
  HlmCardContentDirective,
  HlmCardDescriptionDirective,
  HlmCardDirective,
  HlmCardFooterDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import {
  HlmMenuComponent,
  HlmMenuGroupComponent,
  HlmMenuItemDirective,
  HlmMenuItemIconDirective,
  HlmMenuLabelComponent,
  HlmMenuSeparatorComponent,
} from '@spartan-ng/ui-menu-helm';
import { provideIcons } from '@ng-icons/core';
import {
  lucideArrowLeft,
  lucideGripVertical,
  lucideMinus,
  lucideMoreVertical,
  lucidePlus,
  lucideTrash,
} from '@ng-icons/lucide';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { RouterLink } from '@angular/router';
import { SetupService } from './data-access/setup.service';
import { ReactiveFormsModule } from '@angular/forms';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDragPlaceholder,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { HlmInputDirective, HlmInputModule } from '@spartan-ng/ui-input-helm';
import {
  BrnMenuModule,
  BrnMenuTriggerDirective,
} from '@spartan-ng/ui-menu-brain';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import {
  BrnRadioComponent,
  BrnRadioGroupModule,
} from '@spartan-ng/ui-radiogroup-brain';
import {
  HlmRadioDirective,
  HlmRadioGroupDirective,
  HlmRadioIndicatorComponent,
} from '@spartan-ng/ui-radiogroup-helm';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import {
  HlmFormFieldComponent,
  HlmFormFieldModule,
} from '@spartan-ng/ui-formfield-helm';
import { HlmToasterComponent } from '@spartan-ng/ui-sonner-helm';
import { toast } from 'ngx-sonner';
import {
  HlmPopoverCloseDirective,
  HlmPopoverContentDirective,
  HlmPopoverModule,
} from '@spartan-ng/ui-popover-helm';
import {
  BrnPopoverCloseDirective,
  BrnPopoverComponent,
  BrnPopoverContentDirective,
  BrnPopoverTriggerDirective,
} from '@spartan-ng/ui-popover-brain';
import { skip } from 'rxjs';
import { StepperComponent } from './ui/stepper.component';
import { CdkStep, CdkStepLabel, CdkStepperModule, CdkStepperNext, CdkStepperPrevious } from '@angular/cdk/stepper';

@Component({
  selector: 'bs-setup',
  standalone: true,
  imports: [
    CommonModule,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmCardDescriptionDirective,
    HlmCardContentDirective,
    HlmCardFooterDirective,
    HlmIconComponent,
    HlmMenuItemIconDirective,
    HlmButtonDirective,
    RouterLink,
    ReactiveFormsModule,
    CdkDrag,
    CdkDropList,
    HlmInputDirective,
    HlmMenuComponent,
    HlmMenuGroupComponent,
    HlmMenuItemDirective,
    HlmMenuLabelComponent,
    HlmMenuSeparatorComponent,
    BrnMenuTriggerDirective,
    CdkDragPlaceholder,
    HlmLabelDirective,
    HlmRadioGroupDirective,
    HlmRadioDirective,
    HlmRadioIndicatorComponent,
    BrnRadioComponent,
    HlmFormFieldComponent,
    HlmFormFieldModule,
    BrnRadioGroupModule,
    HlmInputModule,
    HlmToasterComponent,
    BrnMenuModule,
    BrnPopoverComponent,
    BrnPopoverTriggerDirective,
    BrnPopoverContentDirective,
    BrnPopoverCloseDirective,
    HlmPopoverContentDirective,
    HlmPopoverCloseDirective,
    JsonPipe,
    TitleCasePipe,
    StepperComponent,
    CdkStepperModule,
    CdkStepLabel,
    CdkStepperNext,
    CdkStepperPrevious,
  ],
  providers: [
    provideIcons({
      lucideArrowLeft,
      lucideGripVertical,
      lucideMoreVertical,
      lucideTrash,
      lucideMinus,
      lucidePlus,
    }),
  ],
  template: `
    <bs-stepper #cdkStepper>
      <cdk-step><ng-template cdkStepLabel>hi</ng-template><p>sdf</p></cdk-step>
      <cdk-step><p>red</p></cdk-step>

      <!-- Previous Button -->
      <button hlmBtn type="button" cdkStepperPrevious>Back</button>

      <!-- Next Button -->
      <button hlmBtn type="button" cdkStepperNext>Next</button>
    </bs-stepper>

    <button hlmBtn>sdlfkjsdlmfkj</button>

    <!-- <div class="flex flex-col gap-4 md:gap-8 h-full w-full md:w-2/3">
      <button
        hlmBtn
        type="button"
        variant="link"
        routerLink="/home"
        class="w-min"
      >
        <hlm-icon
          size="lg"
          aria-describedby="return to previous screen"
          name="lucideArrowLeft"
          class="mr-0"
        />
      </button>

      <section hlmCard class="">
        <div hlmCardHeader>
          <h1 hlmCardTitle class="md:text-headline mt-4 text-lg">
            Configurez la finale
          </h1>
          <p hlmCardDescription>
            Configurez le déroulement de la finale et ses compétiteurs
          </p>
        </div>
        <div hlmCardContent>
          <form
            [formGroup]="setupService.formGroup"
            class="flex flex-col gap-4"
          >
            <hlm-form-field>
              <label hlmLabel>
                Nom de l'évènement
                <input
                  hlmInput
                  formControlName="nameOfEvent"
                  placeholder="Nom *"
                  autofocus
                  class="w-full"
                />
              </label>
            </hlm-form-field>

            <label hlmLabel>
              Genre
              <brn-radio-group hlm class="flex pt-1" formControlName="gender">
                <brn-radio
                  hlm
                  value="female"
                  class="border rounded-tl-xl rounded-bl-xl p-2 mr-[-1px] h-10 w-full"
                >
                  Femme
                  <hlm-radio-indicator indicator />
                </brn-radio>
                <brn-radio
                  hlm
                  value="male"
                  class="border rounded-tr-xl rounded-br-xl p-2 h-10 w-full"
                >
                  Homme
                  <hlm-radio-indicator indicator />
                </brn-radio>
              </brn-radio-group>
            </label>

            <hlm-form-field class="w-fit">
              <label hlmLabel>
                Durée par bloc
                <div class="flex gap-1 items-center">
                  <button
                    hlmBtn
                    type="button"
                    variant="outline"
                    (click)="setupService.decreaseTimePerBloc$.next()"
                  >
                    <hlm-icon
                      size="xs"
                      aria-describedby="substract time per bloc"
                      name="lucideMinus"
                      class="mr-0"
                    />
                  </button>
                  <input
                    hlmInput
                    type="number"
                    formControlName="timePerBloc"
                    class="w-20 text-center"
                  />
                  <button
                    hlmBtn
                    type="button"
                    variant="outline"
                    (click)="setupService.increaseTimePerBloc$.next()"
                  >
                    <hlm-icon
                      size="xs"
                      aria-describedby="add time per bloc"
                      name="lucidePlus"
                      class="mr-0"
                    />
                  </button>
                </div>
              </label>
            </hlm-form-field>

            <hlm-form-field class="w-fit">
              <label hlmLabel>
                Nombre de blocs
                <div class="flex gap-1 items-center pt-1">
                  <button
                    hlmBtn
                    type="button"
                    variant="outline"
                    (click)="setupService.decreaseTotalBlocs$.next()"
                  >
                    <hlm-icon
                      size="xs"
                      aria-describedby="decrease time per bloc"
                      name="lucideMinus"
                      class="mr-0"
                    />
                  </button>
                  <input
                    hlmInput
                    type="number"
                    formControlName="totalBlocs"
                    class="w-20 text-center"
                  />
                  <button
                    hlmBtn
                    type="button"
                    variant="outline"
                    (click)="setupService.increaseTotalBlocs$.next()"
                  >
                    <hlm-icon
                      size="xs"
                      aria-describedby="increase time per bloc"
                      name="lucidePlus"
                      class="mr-0"
                    />
                  </button>
                </div>
              </label>
            </hlm-form-field>

            <label hlmLabel>
              Qui sont les finalistes et l'ordre de passage @if
              (!!setupService.formGroup.controls.gender.value) { chez les
              {{
                setupService.formGroup.controls.gender.value === 'female'
                  ? 'Femme'
                  : ('Homme' | titlecase)
              }}s } ?
            </label>

            <ng-container formArrayName="finalists">
              <div
                cdkDropList
                class="flex flex-col gap-4"
                (cdkDropListDropped)="
                  setupService.reorderFinalists$.next($event)
                "
              >
                @for (finalist of
                this.setupService.formGroup.controls.finalists.controls; track
                $index) {
                <div cdkDrag>
                  <div class="flex items-center gap-4">
                    <span class="font-bold text-xl">{{ $index + 1 }}</span>
                    <hlm-icon
                      aria-describedby="ordrer elements"
                      name="lucideGripVertical"
                      size="lg"
                      class="mr-0 hover:cursor-move"
                    />
                    <ng-container [formGroupName]="$index">
                      <input
                        hlmInput
                        placeholder="Prénom *"
                        formControlName="firstName"
                        #firstNameInput
                        class="w-full"
                      />
                      <input
                        hlmInput
                        placeholder="Nom *"
                        formControlName="lastName"
                        class="w-full"
                      />
                    </ng-container>
                    <brn-popover sideOffset="5" closeDelay="100">
                      <button
                        hlmBtn
                        type="button"
                        variant="ghost"
                        brnPopoverTrigger
                      >
                        <hlm-icon
                          aria-describedby="more actions on line"
                          name="lucideMoreVertical"
                          class="mr-0 hover:cursor-pointer"
                        />
                      </button>
                      <div
                        hlmPopoverContent
                        *brnPopoverContent="let ctx"
                        class="flex flex-col gap-2 p-2"
                      >
                        <h4 class="font-medium pl-2">Actions</h4>
                        <button
                          hlmBtn
                          type="button"
                          variant="ghost"
                          brnPopoverClose
                          class="flex items-center gap-4"
                          [disabled]="
                            setupService.formGroup.controls.finalists.length <=
                            1
                          "
                          (click)="setupService.deleteFinalist$.next($index)"
                        >
                          <span class="text-red-400">Supprimer</span>
                          <hlm-icon
                            name="lucideTrash"
                            hlmMenuIcon
                            class="text-red-400"
                          />
                        </button>
                      </div>
                    </brn-popover>
                  </div>
                  <div
                    class="bg-stone-50 min-h-10 rounded-xl"
                    *cdkDragPlaceholder
                  ></div>
                </div>
                }
              </div>
            </ng-container>

            <button
              hlmBtn
              type="button"
              variant="outline"
              [disabled]="setupService.formGroup.controls.finalists.invalid"
              (click)="setupService.addFinalist$.next()"
            >
              <hlm-icon
                aria-describedby="add one finalist"
                name="lucidePlus"
                class="mr-0"
              />
            </button>
          </form>
        </div>
      </section>

      <hlm-toaster />
      <button
        hlmBtn
        type="submit"
        (click)="setupService.formGroup.invalid && showToast()"
        routerLink="../during"
        class="mt-auto"
      >
        Valider pour une durée totale de 60'
      </button>
    </div> -->
  `,
  styles: `
    :host {
      @apply h-full flex flex-col items-center content-between gap-4 md:gap-8;
    }
    
      /* Chrome, Safari, Edge, Opera */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    /* Firefox */
    input[type=number] {
      -moz-appearance: textfield;
    }
  `,
})
export default class SetupComponent {
  readonly setupService = inject(SetupService);
  private readonly firstNameInputs =
    viewChildren<ElementRef<HTMLInputElement>>('firstNameInput');

  private readonly cdkStepper =
    viewChild<ElementRef<StepperComponent>>('cdkStepper');

  constructor() {
    toObservable(this.firstNameInputs)
      .pipe(takeUntilDestroyed(), skip(1))
      .subscribe({
        next: (firstNameInputs) =>
          !!firstNameInputs.length &&
          firstNameInputs[firstNameInputs.length - 1].nativeElement.focus(),
      });
  }

  showToast() {
    toast('Formulaire incomplet', {
      description: 'Certains champs ont mal été renseignés',
      cancel: {
        label: 'Ok',
      },
      position: 'top-right',
    });
  }
}
