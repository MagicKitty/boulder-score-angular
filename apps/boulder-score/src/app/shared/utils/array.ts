import { AbstractControl, FormArray } from "@angular/forms";

/**
 * Moves an item one index in an array to another.
 * @param array Array in which to move the item.
 * @param fromIndex Starting index of the item.
 * @param toIndex Index to which the item should be moved.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function moveItemInArray<T extends AbstractControl<any, any>>(array: FormArray<T>, fromIndex: number, toIndex: number): void {
    const from = clamp(fromIndex, array.length - 1);
    const to = clamp(toIndex, array.length - 1);
  
    if (from === to) {
      return;
    }
  
    const target = array.at(from).value;
    const delta = to < from ? -1 : 1;
  
    for (let i = from; i !== to; i += delta) {
      array.at(i).setValue(array.at(i + delta).value);
    }

    array.at(to).setValue(target);
  }

  /** Clamps a number between zero and a maximum. */
function clamp(value: number, max: number): number {
    return Math.max(0, Math.min(max, value));
  }