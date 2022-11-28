import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";

import { LoadingService } from "../../shared/services/loading.service";
import { AuthModel, AuthService } from "../auth.service";
import { PasswordValidator } from "../../shared/validators/password.validator";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.scss"],
})
export class SignUpComponent implements OnInit, OnDestroy {
  hidePassword: boolean = true;
  hideRepeatPassword: boolean = true;
  passwordStrength: boolean = false;
  signUpForm!: FormGroup;
  signUpSub!: Subscription;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private loadingService: LoadingService,
              private snackBar: MatSnackBar
  ){
  }

  ngOnInit(): void{
    this.initializeForm();
  }

  initializeForm(): void{
    this.signUpForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(8)]],
      repeatPassword: ["", [Validators.required]],
      agree: [false, [Validators.requiredTrue]],
    }, { validators: PasswordValidator.passwordMatching });
  }

  onSubmit(){
    if(this.signUpForm.invalid) {
      return;
    }
    const email = this.signUpForm.controls["email"].value;
    const password = this.signUpForm.controls["password"].value;
    this.loadingService.start();
    this.signUpSub = this.authService.signUp(email, password).subscribe({
      next: (authResponse: AuthModel) => {
        this.loadingService.stop();
        console.log(authResponse);
      },
      error: (errorMessage: string) => {
        this.loadingService.stop();
        this.snackBar.open(errorMessage, 'Close', {
          horizontalPosition:'end',
          verticalPosition: 'top',
          duration: 5000
        })
      },
    });
  }

  onStrengthChanged(event: number){
    console.log(event);
  }

  ngOnDestroy(): void{
    if(this.signUpSub) {
      this.signUpSub.unsubscribe();
    }
  }
}
