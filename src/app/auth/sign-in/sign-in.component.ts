import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";

import { AuthModel, AuthService } from "../auth.service";
import { LoadingService } from "../../shared/services/loading.service";
import { GeneralRequestService } from "../../shared/services/general-request.service";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.scss"],
})
export class SignInComponent implements OnInit, OnDestroy {
  hidePassword: boolean = true;
  signInForm!: FormGroup;
  signInSub!: Subscription;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private loadingService: LoadingService,
              private snackBar: MatSnackBar,
              private generalRequestService: GeneralRequestService,
              private router: Router,
  ){
  }

  ngOnInit(): void{
    this.initializeSignInForm();
  }

  initializeSignInForm(): void{
    this.signInForm = this.fb.group({
      email: ["", [Validators.required]],
      password: ["", [Validators.required]],
      remember: [false],
    });
  }

  onSubmit(): void{
    if(this.signInForm.invalid) {
      return;
    }
    const email = this.signInForm.controls["email"].value;
    const password = this.signInForm.controls["password"].value;
    this.loadingService.start();
    this.signInSub = this.authService.signIn(email, password).subscribe({
      next: (res: AuthModel) => {
        this.loadingService.stop();
        this.generalRequestService.setToken(res.idToken);
        this.router.navigate(["dashboard"]);
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

  ngOnDestroy(): void{
    if(this.signInSub) {
      this.signInSub.unsubscribe();
    }
  }
}
