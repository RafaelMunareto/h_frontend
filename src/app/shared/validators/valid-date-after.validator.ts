import dayjs from 'src/app/shared/utils/dayjs';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function IsValidDateAfterValidator(fieldName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const firstDate = control.parent?.get(fieldName)?.value;

    console.log(control);
    const error =
      !control.value ||
      (dayjs(control.value).isValid() &&
        dayjs(firstDate).isValid() &&
        dayjs(control.value).isAfter(dayjs(firstDate)));
    return error ? { isValidDateAfter: { value: control.value } } : null;
  };
}
