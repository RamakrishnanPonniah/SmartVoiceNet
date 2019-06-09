import { Component, OnInit, Inject } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

export interface DialogData {
  message: string;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(
     private dialogRef: MatDialogRef<DialogComponent>,
     @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  close($event) {
    this.dialogRef.close('close');
  }

  ngOnInit() {
  }

}
