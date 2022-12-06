import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-add-status',
  templateUrl: './add-status.component.html',
  styleUrls: ['./add-status.component.scss']
})
export class AddStatusComponent implements OnInit {
  status!: string;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddStatusComponent>, @Inject(MAT_DIALOG_DATA)
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
