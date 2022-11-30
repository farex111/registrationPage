import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from "./dashboard.component";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { UsersComponent } from './users/users.component';
import { SharedModule } from "../shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";
import { MatTooltipModule } from "@angular/material/tooltip";
import { AddUserComponent } from './users/add-user/add-user.component';



@NgModule({
  declarations: [
    DashboardComponent,
    UsersComponent,
    AddUserComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatTableModule,
    MatTooltipModule,
  ],
})
export class DashboardModule { }
