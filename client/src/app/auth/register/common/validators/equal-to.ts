import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

export const equalTo = (controlName: string): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
        if (!control.parent) {
            return null;
        }
        const controlToCompare = control.parent.get(controlName);
        if (controlToCompare && controlToCompare.value !== control.value) {
            return { equalTo: true}
        }
        return null;
    };
};