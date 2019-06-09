import { Component, OnInit } from '@angular/core';


export interface callHistoryList {
  no: number;
  date: string;
  phone : number;
  category: string;
}

const ELEMENT_DATA: callHistoryList[] = [
  {no: 1, date: '1560099225205', phone: 123456789, category: 'Spam'},
  {no: 2, date: '1560099225205', phone: 123456789, category: 'Fraud & Legit'},
  {no: 3, date: '1560099225205', phone: 123456789, category: 'Spam'},
  {no: 4, date: '1560099225205', phone: 123456789, category: 'Fraud & Legit'},
  {no: 5, date: '1560099225205', phone: 123456789, category: 'Spam'},
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
