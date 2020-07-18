import { AbstractControl, ValidatorFn } from '@angular/forms';

export function forbidenNameValidator(forbiddenName: RegExp): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const forbidden = forbiddenName.test(control.value);
    return forbidden ? { ' forbidden': { value: control.value } } : null;
  };
}
