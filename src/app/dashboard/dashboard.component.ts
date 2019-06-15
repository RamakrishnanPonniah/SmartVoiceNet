import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import {coerceNumberProperty} from '@angular/cdk/coercion';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit {

  constructor( public dialog: MatDialog) { }

  selected = new FormControl(0);

  transcript: string;

  updateBtnEnabled : boolean = false;
  autoTicks = false;
  disabled = false;
  max = 50;
  min = 0;
  showTicks = true;
  step = 10;
  thumbLabel = true;
  thresholdVal = 10;

  color = 'warn';
  mode = 'determinate';
  score = 50;
  dndSelected = 'spam';
  date = new Date();

  
  get tickInterval(): number | 'auto' {
    return this.showTicks ? (this.autoTicks ? 'auto' : this._tickInterval) : 0;
  }
  set tickInterval(value) {
    this._tickInterval = coerceNumberProperty(value);
  }
  private _tickInterval = 1; 

  onDndChange($event) {
    this.updateBtnEnabled = $event.value ? true : false;
  }

  onUpdate() {

    const dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
      data: {message : 'Thank you.Call catrgory reported.'}
    });
    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          this.updateBtnEnabled = false;
        }
      }
    );
  }

  updateScore($event) {
    this.score = $event;
  }

  updateTranscript($event) {
    
    this.transcript = $event;
  }

 

  
  ngOnInit() {
  }

}
