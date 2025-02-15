import { FormGroup } from "@angular/forms";

export function getAllFormErrors(form: FormGroup): { [key: string]: any } {
    const errors: { [key: string]: any } = {};
    Object.keys(form.controls).forEach(key => {
        const controlErrors = form.get(key)?.errors;
        if (controlErrors) {
            errors[key] = controlErrors;
        }
    });
    return errors;
}

//tips call this function as getAllFormErrors(this.loginForm)