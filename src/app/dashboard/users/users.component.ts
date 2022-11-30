import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "../../shared/components/dialog/dialog.component";
import { LoadingService } from "../../shared/services/loading.service";
import { AddUserComponent } from "./add-user/add-user.component";

export interface PeriodicElement {
  name: string;
  email: string;
  personalId: string;
  date: Date;
  category: string;
  status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    email: "test@gmail.com",
    name: "Hydrogen",
    personalId: "01002033021",
    status: "active",
    category: "admin",
    date: new Date(),
  },
  {
    email: "test@gmail.com",
    name: "Hydrogen",
    personalId: "01002033021",
    status: "active",
    category: "admin",
    date: new Date(),
  },
  {
    email: "test@gmail.com",
    name: "Hydrogen",
    personalId: "01002033021",
    status: "active",
    category: "admin",
    date: new Date(),
  },
  {
    email: "test@gmail.com",
    name: "Hydrogen",
    personalId: "01002033021",
    status: "active",
    category: "admin",
    date: new Date(),
  },
  {
    email: "test@gmail.com",
    name: "Hydrogen",
    personalId: "01002033021",
    status: "active",
    category: "admin",
    date: new Date(),
  },
  {
    email: "test@gmail.com",
    name: "Hydrogen",
    personalId: "01002033021",
    status: "active",
    category: "admin",
    date: new Date(),
  },
  {
    email: "test@gmail.com",
    name: "Hydrogen",
    personalId: "01002033021",
    status: "active",
    category: "admin",
    date: new Date(),
  },

];

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
})
export class UsersComponent implements OnInit {
  searchForm!: FormGroup;
  displayedColumns: string[] = ["email", "name", "personalId", "status", "category", "date", "actions"];
  dataSource = ELEMENT_DATA;

  constructor(private fb: FormBuilder,
              private dialog: MatDialog,
              private loadingService: LoadingService){
  }

  ngOnInit(): void{
    this.initializeSearchForm();
  }

  initializeSearchForm(){
    this.searchForm = this.fb.group({
      email: [""],
      name: [""],
      personalId: [""],
      date: [""],
      category: [""],
      status: [""],
    });
  }

  onReset(): void{
    this.searchForm.reset();
  }

  onAddUser():void {
    this.dialog.open(AddUserComponent, {
      width: '30%',
      data: {
        title: "Add new user",
        cancelText: "cancel",
        confirmText: "save"
      }
    })
  }

  onDelete(id: number): void{
    this.dialog.open(DialogComponent, {
      data: {
        title: "Delete User",
        content: "Are you sure you want to delete user?",
        confirmText: "Yes",
        cancelText: "No",
      },
    }).afterClosed().subscribe((response: boolean) => {
      if( !response) {
        //refresh here
      } else {
        //delete user here
      }
    });
  }
}
