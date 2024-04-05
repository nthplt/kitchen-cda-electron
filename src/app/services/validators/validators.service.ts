import { Injectable } from '@angular/core';
import {
  AbstractControl,
  UntypedFormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidatorsService {
  constructor() {}

  emailValidator(control: AbstractControl): ValidationErrors | null {
    const email = control.value;
    const regexEmail: RegExp = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

    if (!email) {
      return null;
    }
    if (email && !regexEmail.test(email)) {
      return { invalid_email: true };
    }
    return null;
  }

  controlLengthTrim(length: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const controlValueLength: number = control.value.toString().trim().length;
      return controlValueLength < length
        ? {
            controlLengthTrim: {
              minLength: length,
              actualLengthTrim: controlValueLength,
            },
          }
        : null;
    };
  }
}
