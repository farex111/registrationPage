import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatListModule } from "@angular/material/list";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatSnackBarModule } from "@angular/material/snack-bar";

import { LoadingComponent } from "./components/loading/loading.component";
import { PasswordStrengthComponent } from "./components/password-strength/password-strength.component";
import { AuthInterceptor } from "./services/auth.interceptor";
import { DialogComponent } from './components/dialog/dialog.component';
import { MatDialogModule } from "@angular/material/dialog";


@NgModule({
  declarations: [
    LoadingComponent,
    PasswordStrengthComponent,
    DialogComponent,
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatListModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    LoadingComponent,
    PasswordStrengthComponent,
    MatSnackBarModule,
    MatDatepickerModule,
    MatDialogModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class SharedModule {
}
