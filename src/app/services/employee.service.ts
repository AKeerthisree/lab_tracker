import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../MyComponents/details/Employee';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {


  serverUrl = 'http://localhost:8020/';
  options = {
    responseType: 'json',
  };
  constructor(private httpClient: HttpClient) { }


   addEmployee(emp : Employee): Observable<Employee> {
     return this.httpClient.post<Employee>(this.serverUrl+'emp/addEmployee',emp);
   }

   getAllEmployee(): Observable<Employee[]>{
     return this.httpClient.get<Employee[]>(this.serverUrl+'emp/getAll');
   }

   updateEmployee(emp :Employee) : Observable<Employee>{
     return this.httpClient.put<Employee>(this.serverUrl+'emp/updateEmployee', emp);
   }

   deleteEmployee(emp : Employee) : Observable<Employee> {
     return this.httpClient.delete<Employee>(this.serverUrl+'emp/deleteEmployeeById/'+emp.id);
   }

   getEmployee(id):Observable<Employee>{
    return this.httpClient.get<Employee>(this.serverUrl+'emp/getEmployeeByID/'+id);
  }
 
}
