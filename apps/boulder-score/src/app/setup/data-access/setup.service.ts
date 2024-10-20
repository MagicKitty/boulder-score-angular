import { inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { Finalist } from '../../shared/models/finalist';
import { moveItemInArray } from '../../shared/utils/array';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

type FinalistFormGroup<T> = {
  [P in keyof T]: (
    | T[P]
    | ((control: AbstractControl) => ValidationErrors | null)
  )[];
};

@Injectable({
  providedIn: 'root',
})
export class SetupService {
  private readonly _fb = inject(FormBuilder);
  formGroup = this._fb.nonNullable.group({
    finalists: this._fb.nonNullable.array([
      this._fb.nonNullable.group<FinalistFormGroup<Finalist>>({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
      }),
    ]),
    nameOfEvent: [
      `Bloc Session - ${format(new Date(), 'dd MMMM yyyy', { locale: fr })}`,
      Validators.required,
    ],
    gender: [undefined, Validators.required],
    timePerBloc: [15, Validators.required],
    totalBlocs: [3, Validators.required],
  });

  decreaseTimePerBloc$ = new Subject<void>();
  increaseTimePerBloc$ = new Subject<void>();
  decreaseTotalBlocs$ = new Subject<void>();
  increaseTotalBlocs$ = new Subject<void>();
  addFinalist$ = new Subject<void>();
  reorderFinalists$ = new Subject<{
    previousIndex: number;
    currentIndex: number;
  }>();
  deleteFinalist$ = new Subject<number>();

  constructor() {
    this.increaseTimePerBloc$.pipe(takeUntilDestroyed()).subscribe({
      next: () =>
        this.formGroup.controls.timePerBloc.setValue(
          this.formGroup.controls.timePerBloc.value + 1
        ),
    });

    this.decreaseTimePerBloc$.pipe(takeUntilDestroyed()).subscribe({
      next: () =>
        this.formGroup.controls.timePerBloc.setValue(
          this.formGroup.controls.timePerBloc.value - 1
        ),
    });

    this.increaseTotalBlocs$.pipe(takeUntilDestroyed()).subscribe({
      next: () =>
        this.formGroup.controls.totalBlocs.setValue(
          this.formGroup.controls.totalBlocs.value + 1
        ),
    });

    this.decreaseTotalBlocs$.pipe(takeUntilDestroyed()).subscribe({
      next: () =>
        this.formGroup.controls.totalBlocs.setValue(
          this.formGroup.controls.totalBlocs.value - 1
        ),
    });

    this.addFinalist$.pipe(takeUntilDestroyed()).subscribe({
      next: () => {
        const nextFinalist = this._fb.nonNullable.group<
          FinalistFormGroup<Finalist>
        >({
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
        });

        this.formGroup.controls.finalists.push(nextFinalist);
      },
    });

    this.deleteFinalist$.pipe(takeUntilDestroyed()).subscribe({
      next: (i) => this.formGroup.controls.finalists.removeAt(i),
    });

    this.reorderFinalists$.pipe(takeUntilDestroyed()).subscribe({
      next: ({ previousIndex, currentIndex }) =>
        moveItemInArray(
          this.formGroup.controls.finalists,
          previousIndex,
          currentIndex
        ),
    });
  }
}
