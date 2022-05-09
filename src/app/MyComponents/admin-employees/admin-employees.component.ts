import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from '../details/Employee';

@Component({
  selector: 'app-admin-employees',
  templateUrl: './admin-employees.component.html',
  styleUrls: ['./admin-employees.component.css']
})
export class AdminEmployeesComponent implements OnInit {

  empDetail !: FormGroup;
  empObj : Employee = new Employee();
  empList : Employee[] = []
  searchText : string;
  
  constructor(
    private formBuilder: FormBuilder,
    private empService: EmployeeService,
    private router:Router) { }

  ngOnInit(): void {
    this.empDetail = this.formBuilder.group({
      id:[''],
      name: [''],
      password: [''],
      email: [''],
      phone: [''],
      role:['']
    })
    this.getAllEmployee();
  }
  addEmployee(){
    this.router.navigateByUrl('/adminDashboard/addEmployee');
  }

  getAllEmployee() {
    this.empService.getAllEmployee().subscribe(res=>{
      this.empList = res;
    },err=>{
      console.log("error while fetching data.")
    });
  }

  editEmployee(emp : Employee) {
    console.log(emp);
    let ID=emp.id;
    this.router.navigate(["/adminDashboard/editEmployee",ID]);

  }

deleteEmployee(emp : Employee) {

  this.empService.deleteEmployee(emp).subscribe(res=>{
    console.log(res);
    alert('Employee deleted successfully');
    this.getAllEmployee();
  },err => {
    console.log(err);
  });


}

logout(){
  this.router.navigateByUrl('')
}
}
