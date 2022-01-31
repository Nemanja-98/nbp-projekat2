import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  selectedFilters: string[] = [];


  constructor() { }

  ngOnInit(): void {
  }

  selectedFilter(filters: string[]) {
    this.selectedFilters = filters;
  }
}
