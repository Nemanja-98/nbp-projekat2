import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  
  selectedFilters: string[] = [];
  categories :string[] = ["apple", "pear", "strawberry"];
  @Output() selectedFilter: EventEmitter<string[]> = new EventEmitter<string[]>();
  

  constructor() { }

  ngOnInit(): void {
   
  }

  toggleFilterCategory(chBox: MatCheckbox) {

    const filterText :string = chBox.name ? chBox.name : ""
    this.selectedFilters = this.selectedFilters
                                .includes(filterText) ?
                                                        this.selectedFilters.filter( (filter : string) => filter != filterText) 
                                                      : [...this.selectedFilters, filterText];
    console.log(this.selectedFilters)
    this.selectedFilter.emit(this.selectedFilters)
  }
}
