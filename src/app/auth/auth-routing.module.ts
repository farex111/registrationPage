import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthComponent } from "./auth.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { SignInComponent } from "./sign-in/sign-in.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "sign-up",
    pathMatch: "full",
  },
  {
    path: "",
    component: AuthComponent,
    children: [
      {
        path: "sign-up",
        component: SignUpComponent,
      },
      {
        path: "sign-in",
        component: SignInComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {
}
