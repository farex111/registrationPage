import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";

import { AuthModel, AuthService } from "../auth.service";
import { LoadingService } from "../../shared/services/loading.service";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.scss"],
})
export class SignInComponent implements OnInit {
  hidePassword: boolean = true;
  signInForm!: FormGroup;
  signInSub!: Subscription;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private loadingService: LoadingService,
              private snackBar: MatSnackBar,
  ){
  }

  ngOnInit(): void{
    this.initializeSignInForm();
  }

  initializeSignInForm(){
    this.signInForm = this.fb.group({
      email: ["", [Validators.required]],
      password: ["", [Validators.required]],
      remember: [false]
    });
  }

  onSubmit(){
    if(this.signInForm.invalid) {
      return;
    }
    const email = this.signInForm.controls["email"].value;
    const password = this.signInForm.controls["password"].value;
    this.loadingService.start();
    this.signInSub = this.authService.signIn(email, password).subscribe({
      next: (res: AuthModel) => {
        this.loadingService.stop();
        console.log(res);
      },
      error: (errorMessage: string) => {
        this.loadingService.stop();
        this.snackBar.open(errorMessage, "Close", {
          verticalPosition: "top",
          horizontalPosition: "end",
          duration: 5000,
        });
      },
    });
  }
}
