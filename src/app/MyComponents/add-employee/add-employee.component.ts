import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from '../details/Employee';
import { DialogData } from '../dispatch/dispatch.component';


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  empDetail !: FormGroup;
  empObj : Employee = new Employee();
  empList : Employee[] = []
  searchText : string;
  
  constructor(
    private formBuilder: FormBuilder,
    private empService: EmployeeService,
    private router:Router,
    public dialog:MatDialog) { }

  ngOnInit(): void {
    this.empDetail = this.formBuilder.group({
      id:[''],
      name: [''],
      password: [''],
      email: [''],
      phone: [''],
      role:['']
    })
  }
    
  addEmployee(){
    console.log(this.empDetail);
    this.empObj.id=this.empDetail.value.id;
    this.empObj.name=this.empDetail.value.name;
    this.empObj.email=this.empDetail.value.email;
    this.empObj.phone=this.empDetail.value.phone;
    this.empObj.role=this.empDetail.value.role;
    this.empObj.password=this.empDetail.value.name;

    this.empService.addEmployee(this.empObj).subscribe(res=>{
      console.log(res);
      this.openDialog(true);
  },err=>{
      console.log(err);
      this.openDialog(false);
  });
  }

  openDialog(response) {
   
    if(response)
    {
      this.dialog.open(DialogElementsExampleDialog);
    }
    else{
      const dialogRef = this.dialog.open(DialogUnsuccess, {
        width: '300px',
        data: {}
      });
    }
    
  }

  logout(){
    this.router.navigateByUrl('')
  }

}

@Component({
  selector: 'dialog-success',
  templateUrl: '../dialog-success.html',
})
export class DialogElementsExampleDialog { 
  constructor(
    private router:Router,
    public dialogRef: MatDialogRef<DialogElementsExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ){}
  close(){
    this.dialogRef.close();
    this.router.navigateByUrl('/adminDashboard/adminEmployees')
  }
  
}

@Component({
  selector: 'dialog-unsuccess',
  templateUrl: '../dialog-unsuccess.html',
})
export class DialogUnsuccess { 
  constructor(
    private router:Router,
    public dialogRef: MatDialogRef<DialogUnsuccess>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ){}
  close(){
    this.dialogRef.close();
    this.router.navigateByUrl('/adminDashboard/adminEmployees')
  }
}
