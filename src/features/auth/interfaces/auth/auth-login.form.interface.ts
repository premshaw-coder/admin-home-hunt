import { FormControl } from "@angular/forms";

export interface AuthFormControl {
    email?: FormControl<string | null | undefined>;
    password?: FormControl<string | null | undefined>;
    name?: FormControl<string | null | undefined>;
    phoneNumber?: FormControl<number | null | undefined>;
}

export interface AuthFormData {
    email?: string | null | undefined;
    password?: string | null | undefined;
    name?: string | null | undefined;
    phoneNumber?: number | null | undefined;
    user_type?: string | null | undefined;
}