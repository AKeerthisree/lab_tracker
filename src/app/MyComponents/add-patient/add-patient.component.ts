import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PatientService } from 'src/app/services/patient.service';
import { patientDetails } from '../details/patientDetails';
import { DialogData } from '../dispatch/dispatch.component';


@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent implements OnInit {

  patientDetail !: FormGroup;
  patientObj : patientDetails = new patientDetails();
  patientList : patientDetails[] = []
  searchText : string;
  
  constructor(
    private formBuilder: FormBuilder,
    private patientService: PatientService,
    private router:Router,
    public dialog:MatDialog) { }

    ngOnInit(): void {
      this.patientDetail = this.formBuilder.group({
        patient_id:[''],
        name: [''],
        email: [''],
        age:[''],
        sex:[''],
        report:[''],
        accept:[''],
      })
    }
    
  addEmployee(){
    console.log(this.patientDetail);
    this.patientObj.patient_id=this.patientDetail.value.patient_id;
    this.patientObj.name=this.patientDetail.value.name;
    this.patientObj.email=this.patientDetail.value.email;
    this.patientObj.age=this.patientDetail.value.age;
    this.patientObj.sex=this.patientDetail.value.sex;
    this.patientObj.report=this.patientDetail.value.report;
    this.patientObj.accept=this.patientDetail.value.accept;

    this.patientService.addPatient(this.patientObj).subscribe(res=>{
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
    this.router.navigateByUrl('/adminDashboard/adminPatients')
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
    this.router.navigateByUrl('/adminDashboard/adminPatients')
  }
}
