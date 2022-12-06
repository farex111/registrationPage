import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { forkJoin, Subscription } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";

import { LoadingService } from "../../shared/services/loading.service";
import { CategoryModel, StatusModel, UserModel, UsersService } from "./users.service";
import { AddUserComponent } from "./add-user/add-user.component";
import { DialogComponent } from "../../shared/components/dialog/dialog.component";
import { AddStatusComponent } from "./add-status/add-status.component";
import { AddCategoryComponent } from "./add-category/add-category.component";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
})
export class UsersComponent implements OnInit, OnDestroy {
  searchForm!: FormGroup;
  displayedColumns: string[] = ["email", "name", "personalId", "status", "category", "date", "actions"];
  dataSource: Array<UserModel> = [];
  statusList: Array<StatusModel> = [];
  categoryList: Array<CategoryModel> = [];

  addNewUserSub!: Subscription;
  addNewStatusSub!: Subscription;
  addNewCategorySub!: Subscription;
  deleteUserSub!: Subscription;
  getDataSub!: Subscription;
  getFilteredDataSub!: Subscription;

  constructor(private fb: FormBuilder,
              private dialog: MatDialog,
              private loadingService: LoadingService,
              private usersService: UsersService,
              private snackBar: MatSnackBar){
  }

  ngOnInit(): void{
    this.initializeSearchForm();
    this.getData();
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
    this.getData();
  }

  getData(){
    this.loadingService.start();
    this.getDataSub = forkJoin({
      userList: this.usersService.getUsers(),
      statusList: this.usersService.getStatuses(),
      categoryList: this.usersService.getCategoryList(),
    }).subscribe({
      next: response => {
        this.loadingService.stop();
        this.dataSource = response.userList;
        this.statusList = response.statusList;
        this.categoryList = response.categoryList;
      },
    });
  }

  onFilter(){
    let params = {}
    if(this.searchForm.controls['email'].value) {
      params = {
        ...params,
        email: this.searchForm.controls['email'].value
      }
    }
    if(this.searchForm.controls['name'].value) {
      params = {
        ...params,
        name: this.searchForm.controls['name'].value
      }
    }
    if(this.searchForm.controls['personalId'].value) {
      params = {
        ...params,
        personalId: this.searchForm.controls['personalId'].value
      }
    }
    if(this.searchForm.controls['status'].value) {
      params = {
        ...params,
        status: this.searchForm.controls['status'].value
      }
    }
    if(this.searchForm.controls['category'].value) {
      params = {
        ...params,
        category: this.searchForm.controls['category'].value
      }
    }
    if(this.searchForm.controls['date'].value) {
      params = {
        ...params,
        date: this.searchForm.controls['date'].value
      }
    }
    this.loadingService.start()
    this.getFilteredDataSub = this.usersService.filterUsers(params).subscribe({
      next: (filterResponse: Array<UserModel>) => {
        this.loadingService.stop()
        this.dataSource = filterResponse;
      },
    });
  }

  onAddUser(): void{
    this.dialog.open(AddUserComponent, {
      width: "30%",
      data: {
        title: "Add new user",
        cancelText: "cancel",
        confirmText: "save",
        statusList: this.statusList,
        categoryList: this.categoryList,
      },
    }).afterClosed().subscribe(res => {
      if( !res) {
        this.getData();
      } else {
        this.loadingService.start();
        this.addNewUserSub = this.usersService.addUser(res).subscribe({
          next: (res: UserModel) => {
            this.loadingService.stop();
            this.snackBar.open(`${ res.name } Added Successfully`, "close", {
              verticalPosition: "top",
              horizontalPosition: "end",
              duration: 5000,
            });
            this.getData();
          },
        });
      }
    });
  }

  addStatus(): void{
    this.dialog.open(AddStatusComponent, {
      width: "30%",
      restoreFocus: false,
      data: {
        title: "Add new Status",
        cancelText: "cancel",
        confirmText: "save",
      },
    }).afterClosed().subscribe(res => {
      if( !res) {
        this.getData();
      } else {
        this.loadingService.start();
        this.addNewStatusSub = this.usersService.addStatus(res).subscribe({
          next: (statusResponse: StatusModel) => {
            this.loadingService.stop();
            this.snackBar.open(`${ statusResponse.status } Added Successfully`, "close", {
              verticalPosition: "top",
              horizontalPosition: "end",
              duration: 5000,
            });
            this.getData();
          },
        });
      }
    });
  }

  addCategory(): void{
    this.dialog.open(AddCategoryComponent, {
      width: "30%",
      restoreFocus: false,
      data: {
        title: "Add new Category",
        cancelText: "cancel",
        confirmText: "save",
      },
    }).afterClosed().subscribe(res => {
      if( !res) {
        this.getData();
      } else {
        this.loadingService.start();
        this.addNewCategorySub = this.usersService.addCategory(res).subscribe({
          next: (categoryResponse: CategoryModel) => {
            this.loadingService.stop();
            this.snackBar.open(`${ categoryResponse.category } Added Successfully`, "close", {
              verticalPosition: "top",
              horizontalPosition: "end",
              duration: 5000,
            });
            this.getData();
          },
        });
      }
    });
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
        this.getData();
      } else {
        this.loadingService.start();
        this.deleteUserSub = this.usersService.deleteUser(id).subscribe({
          next: () => {
            this.loadingService.stop();
            this.snackBar.open("User Deleted Successfully", "Close", {
              verticalPosition: "top",
              horizontalPosition: "end",
              duration: 5000,
            });
            this.getData();
          },
        });
      }
    });
  }

  ngOnDestroy(): void{
    if(this.addNewUserSub) {
      this.addNewUserSub.unsubscribe();
    }
    if(this.deleteUserSub) {
      this.deleteUserSub.unsubscribe();
    }
    if(this.addNewStatusSub) {
      this.addNewStatusSub.unsubscribe();
    }
    if(this.addNewCategorySub) {
      this.addNewCategorySub.unsubscribe();
    }
    if(this.getDataSub) {
      this.getDataSub.unsubscribe();
    }
    if(this.getFilteredDataSub) {
      this.getFilteredDataSub.unsubscribe();
    }
  }
}
