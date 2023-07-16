import dayjs from 'src/app/shared/utils/dayjs';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function IsValidDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = dayjs(control.value).isValid() || !control.value;
    return forbidden ? { isValidDate: { value: control.value } } : null;
  };
}
