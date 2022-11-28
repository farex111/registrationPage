import { AbstractControl, ValidationErrors } from "@angular/forms";

export class PasswordValidator {
  static passwordMatching(control: AbstractControl): ValidationErrors | null{
    const password = control.get("password")?.value;
    const repeatPassword = control.get("repeatPassword")?.value;

    return password === repeatPassword && password !== null && repeatPassword !== null ? null : { passwordsNotMatching: true };
  }
}
