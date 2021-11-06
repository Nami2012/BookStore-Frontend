import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DropdownService } from './dropdown/services/dropdown.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchTerm: String = "";
  categoryValue: string = "";
  constructor(private route: ActivatedRoute, private router: Router, private dropdown: DropdownService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      if (params.searchTerm)
      this.searchTerm = params.searchTerm;
    })
  }
  
  search():void{
    this.categoryValue = this.dropdown.getValue();
    if (this.searchTerm)
    this.router.navigateByUrl('/search/' + this.searchTerm + '/' + this.categoryValue);
  }

}
