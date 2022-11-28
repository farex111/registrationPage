import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse,
} from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { GeneralRequestService } from "./general-request.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private generalRequestService: GeneralRequestService,
              private router: Router,
              private snackBar: MatSnackBar,
  ){
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>>{
    const token = this.generalRequestService.getToken();
    if(token) {
      request = request.clone({
        setHeaders: {
          Authorization: token,
        },
      });
    }
    return next.handle(request).pipe(tap({
      next: () => {},
      error: (errorResponse: HttpErrorResponse) => {
        if(errorResponse.status === 401) {
          this.snackBar.open("User Unauthorized", "Close", {
            horizontalPosition: "end",
            verticalPosition: "top",
            duration: 5000,
          });
          this.generalRequestService.clearToken();
          this.router.navigate([""]);
        }
      },
    }));
  }
}
