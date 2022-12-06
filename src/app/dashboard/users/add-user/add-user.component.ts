import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormGroup } from "@angular/forms";
import { CategoryModel, StatusModel } from "../users.service";

@Component({
  selector: "app-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.scss"],
})
export class AddUserComponent implements OnInit {
  newUserForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddUserComponent>, @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      confirmText: string;
      cancelText: string;
      statusList: Array<StatusModel>;
      categoryList: Array<CategoryModel>
    },
  ){
  }

  ngOnInit(): void{
    this.initializeUserForm()
  }

  initializeUserForm(){
    this.newUserForm = this.fb.group({
      email: [""],
      name: [""],
      personalId: [""],
      date: [""],
      category: [""],
      status: [""],
    });
  }

  onSave(){
    return {
      email: this.newUserForm.controls['email'].value,
      name: this.newUserForm.controls['name'].value,
      personalId: this.newUserForm.controls['personalId'].value,
      date: this.newUserForm.controls['date'].value,
      category: this.newUserForm.controls['category'].value,
      status: this.newUserForm.controls['status'].value,
    }
  }
}
