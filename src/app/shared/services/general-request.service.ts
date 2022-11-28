import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class GeneralRequestService {
  setToken(token: string): void{
    localStorage.setItem("TOKEN", token);
  }

  getToken(): string | null{
    return localStorage.getItem("TOKEN");
  }

  clearToken(): void{
    localStorage.removeItem("TOKEN");
  }
}
