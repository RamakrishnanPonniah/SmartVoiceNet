import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import {coerceNumberProperty} from '@angular/cdk/coercion';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit {

  selected = new FormControl(0);

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

  
  get tickInterval(): number | 'auto' {
    return this.showTicks ? (this.autoTicks ? 'auto' : this._tickInterval) : 0;
  }
  set tickInterval(value) {
    this._tickInterval = coerceNumberProperty(value);
  }
  private _tickInterval = 1;

  constructor() { }

  updateScore($event) {
    this.score = $event
  }

  ngOnInit() {
  }

}
