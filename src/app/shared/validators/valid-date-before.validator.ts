import dayjs from 'src/app/shared/utils/dayjs';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function IsValidDateBeforeValidator(fieldName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const firstDate = control.get(fieldName)?.value;
    const error =
      !control.value ||
      (dayjs(control.value).isValid() &&
        dayjs(firstDate).isValid() &&
        dayjs(control.value).isBefore(dayjs(firstDate)));
    return error ? { isValidDateAfter: { value: control.value } } : null;
  };
}
