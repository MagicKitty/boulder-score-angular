import { inject, Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SetupService {
  private readonly _fb = inject(FormBuilder);
  formGroup = this._fb.nonNullable.group({
    finalists: this._fb.nonNullable.array([
      this._fb.nonNullable.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
      }),
    ]),
    nameOfEvent: ['', Validators.required],
    gender: [undefined, Validators.required]
    }
  );
}
