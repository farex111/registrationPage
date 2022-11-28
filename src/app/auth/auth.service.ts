import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

import { environment } from "../../environments/environment";

export interface AuthModel {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {

  constructor(private http: HttpClient){
  }

  private static handleError(errorResponse: HttpErrorResponse): Observable<never>{
    let errorMessage: string = "An Unknown Error Occurred";
    if( !errorResponse.error || !errorResponse.error.error) {
      return throwError(() => new Error(errorMessage).message);
    }
    switch(errorResponse.error.error.message) {
      case "EMAIL_EXISTS":
        errorMessage = "The email address is already in use by another account";
        break;
      case "OPERATION_NOT_ALLOWED":
        errorMessage = "Password sign-in is disabled for this project";
        break;
      case "TOO_MANY_ATTEMPTS_TRY_LATER":
        errorMessage = "We have blocked all requests from this device due to unusual activity. Try again later";
        break;
      case "EMAIL_NOT_FOUND":
        errorMessage = " There is no user record corresponding to this identifier. The user may have been deleted";
        break;
      case "INVALID_PASSWORD":
        errorMessage = "The password is invalid or the user does not have a password";
        break;
      case "USER_DISABLED":
        errorMessage = "The user account has been disabled by an administrator";
        break;
    }
    return throwError(() => new Error(errorMessage).message);
  }

  signUp(email: string, password: string): Observable<AuthModel>{
    return this.http.post<AuthModel>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${ environment.FIREBASE_API_KEY }`, {
      email,
      password,
      returnSecureToken: true,
    }).pipe(catchError((AuthService.handleError)));
  }

  signIn(email: string, password: string): Observable<AuthModel>{
    return this.http.post<AuthModel>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${ environment.FIREBASE_API_KEY }`, {
      email,
      password,
      returnSecureToken: true
    }).pipe(catchError((AuthService.handleError)));
  }
}
