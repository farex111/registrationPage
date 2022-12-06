import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from "./dashboard.component";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { UsersComponent } from './users/users.component';
import { SharedModule } from "../shared/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";
import { MatTooltipModule } from "@angular/material/tooltip";
import { AddUserComponent } from './users/add-user/add-user.component';
import { AddStatusComponent } from './users/add-status/add-status.component';
import { AddCategoryComponent } from './users/add-category/add-category.component';
import { MatPaginatorModule } from "@angular/material/paginator";



@NgModule({
  declarations: [
    DashboardComponent,
    UsersComponent,
    AddUserComponent,
    AddStatusComponent,
    AddCategoryComponent
  ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatTableModule,
        MatTooltipModule,
        FormsModule,
        MatPaginatorModule,
    ],
})
export class DashboardModule { }
