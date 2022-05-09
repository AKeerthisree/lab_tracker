import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http:HttpClient) { }

  search(startDate:any,endDate:any)
  {
    //console.log(startDate,endDate,"in service");
    return this.http.get(`http://localhost:8020/date/${startDate}/${endDate}`);
  }
}