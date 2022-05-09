import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search-sample',
  templateUrl: './search-sample.component.html',
  styleUrls: ['./search-sample.component.css']
})
export class SearchSampleComponent implements OnInit {

  startDate:any;
  endDate:any;
  results:any;
  constructor(private searchService:SearchService) { }

  ngOnInit(): void {
  }
  search()
  {
    console.log("adsas");
    console.log(this.startDate);
    console.log(this.endDate);
    this.searchService.search(this.startDate,this.endDate).subscribe(
      data=>
      {
        //console.log(data);
        this.results=data;
        console.log(this.results);
      }
    );
  }

}