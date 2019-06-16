import { Component, OnInit } from '@angular/core';


export interface callHistoryList {
  no: number;
  date: number;
  phone : number;
  category: string;
}

const ELEMENT_DATA: callHistoryList[] = [
  {no: 1, date:  new Date().getTime(), phone: 123456789, category: 'AUTHENTIC'},
  {no: 2, date: new Date().getTime(), phone: 643456701, category: 'FRAUD CALL ALERT'},
  {no: 3, date: new Date().getTime(), phone: 723456789, category: 'MARKETING SPAM ALERT'},
  {no: 4, date:  new Date().getTime(), phone: 363456789, category: 'AUTHENTIC'},
  {no: 5, date: new Date().getTime(), phone: 223456789, category: 'MARKETING SPAM ALERT'},
];


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})

export class HistoryComponent implements OnInit {

  
  tabIdx : number = 0;

  constructor() { }

  setStep(index: number) {
    this.tabIdx = index;
  }

  displayedColumns: string[] = ['no', 'date', 'phone', 'category'];
  dataSource = ELEMENT_DATA;

  ngOnInit() {
  }

}
