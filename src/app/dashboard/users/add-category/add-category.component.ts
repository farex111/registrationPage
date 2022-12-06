import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  category!: string;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddCategoryComponent>, @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      confirmText: string;
      cancelText: string;
    },
  ){
  }
  ngOnInit(): void {
  }

}
