import { Component, input } from '@angular/core';
import { CdkStep, CdkStepper, CdkStepperModule } from '@angular/cdk/stepper';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bs-stepper',
  standalone: true,
  imports: [CommonModule, CdkStep, CdkStepperModule],
  providers: [
    {
      provide: CdkStepper,
      useExisting: StepperComponent,
    },
  ],
  template: `
    <div>
    <header class="header">
      <ol>
        @for (step of steps; track $index; let i = $index) {
        <li [ngClass]="selectedIndex === i ? activeClass() : ''">
          <a (click)="selectedIndex = i">
            @if (step.stepLabel) {
            <ng-container
              [ngTemplateOutlet]="step.stepLabel.template"
            ></ng-container>
            } @else {
            <ng-template #showLabelText>
              {{ step.label }}
            </ng-template>
            }
          </a>
        </li>
        }
      </ol>
    </header>

    <div>
      <ng-container
        [ngTemplateOutlet]="selected ? selected.content : defaultTemplate"
      >
      </ng-container>
      <ng-template #defaultTemplate>No content</ng-template>
    </div>
    </div>
  `,
  styles: ``,
})
export class StepperComponent extends CdkStepper {
  activeClass = input<string>('active');
}
