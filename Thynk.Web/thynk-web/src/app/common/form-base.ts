import { FormGroup } from "@angular/forms";

export interface FormBase<T> {
    form: FormGroup;
}

export class FormBase<T> implements FormBase<T> {
    constructor(
        public form: FormGroup,
        public files?: FormData,
    ) { }

    public get value(): T {
        return this.form.value as T;
    }
}
