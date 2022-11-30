import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddUserComponent>, @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      confirmText: string;
      cancelText: string;
    }
  ) {
  }

  ngOnInit(): void {
  }

}
