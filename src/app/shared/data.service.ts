import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private scoreSource  = new BehaviorSubject(0)
  currentScore = this.scoreSource.asObservable();
  constructor() { }
  
  onScoreChange(score: number) {
    this.scoreSource.next(score);
  }

}
