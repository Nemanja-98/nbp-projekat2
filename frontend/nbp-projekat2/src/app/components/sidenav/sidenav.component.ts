import { Component, OnInit, Output, EventEmitter } from '@angular/core';


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

  toggleFilterCategory(event :any) {
    const target: HTMLElement= event.target;
    const checkbox :HTMLInputElement | null = target.querySelector('input');
    if(!checkbox)
      return;
    const filterText :string = checkbox.name;
    this.selectedFilters = this.selectedFilters.includes(filterText) ?
                                                                      this.selectedFilters.filter( (filter : string) => filter != filterText) 
                                                                      : [...this.selectedFilters, filterText];
    console.log(this.selectedFilters)
    this.selectedFilter.emit(this.selectedFilters)
  }
}
