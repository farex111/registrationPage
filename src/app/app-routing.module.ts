import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthGuard } from "./shared/services/auth.guard";
import { NonAuthGuard } from "./shared/services/non-auth.guard";

const routes: Routes = [
  {
    path: "",
    canActivate: [NonAuthGuard],
    loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule),
  },
  {
    path: "",
    canActivate: [AuthGuard],
    loadChildren: () => import("./dashboard/dashboard.module").then(m => m.DashboardModule),
  },
  {
    path: "**",
    redirectTo: "",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
