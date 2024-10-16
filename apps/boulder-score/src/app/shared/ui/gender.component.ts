import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Gender } from '../models/gender';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';

@Component({
  selector: 'bs-gender',
  standalone: true,
  imports: [CommonModule, HlmButtonDirective],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: GenderComponent,
      multi: true,
    },
  ],
  template: `
    <div class="flex gap-4">
      <button hlmBtn variant="ghost" (click)="setGender('female')" [ngClass]="gender === 'female' ? ['ring-2 ring-offset-2 ring-yellow-500'] : ''">
        Femme
      </button>
      <button hlmBtn (click)="setGender('male')" [ngClass]="gender === 'male' ? ['ring-2 ring-offset-2 ring-yellow-500'] : ''">
        Homme
      </button>
    </div>
  `,
  styles: ``,
})
export class GenderComponent implements ControlValueAccessor {
  gender: Gender = undefined;

  onChange = (value: Gender) => {};
  onTouch = () => {};

  setGender(gender: Gender) {
    this.gender = gender;
    this.onChange(gender);
    this.onTouch();
  }

  writeValue(value: Gender) {
    this.gender = value;
  }

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }
}
