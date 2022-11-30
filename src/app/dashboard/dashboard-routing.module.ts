import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import { UsersComponent } from "./users/users.component";

const routes: Routes = [
  {
    path: "dashboard",
    redirectTo: "dashboard/user-list",
    pathMatch: "full",
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    children: [
      {
        path: "user-list",
        component: UsersComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {
}
