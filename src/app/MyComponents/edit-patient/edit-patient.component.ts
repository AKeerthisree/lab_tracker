import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from 'src/app/services/patient.service';
import { patientDetails } from '../details/patientDetails';
import { DialogData } from '../dispatch/dispatch.component';


@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.css']
})
export class EditPatientComponent implements OnInit {

  paramID;
  patient:patientDetails=new patientDetails();
  patientDetail !: FormGroup;
  patinetObj : patientDetails = new patientDetails();
  
  constructor(
    private formBuilder: FormBuilder,
    private patientService: PatientService,
    private route: ActivatedRoute,
    private router:Router,
    public dialog:MatDialog) { }
  

  ngOnInit(): void {

    this.route.params.subscribe(params=>{
      this.paramID= params['ID'];
      console.log(this.paramID);
     
    });

    this.patientService.getPatient(this.paramID).subscribe(res=>{
      this.patient = res;
    },err=>{
      console.log("error while fetching data.")
    });


    this.patientDetail = this.formBuilder.group({
      patient_id:this.patient.patient_id,
      name: this.patient.name,
      email: this.patient.email,
      age: this.patient.age,
      sex: this.patient.sex,
      report: this.patient.report,
      accept: this.patient.accept
    })
  
  }
  
  updatePatient() {
  
    this.patinetObj.patient_id = this.patientDetail.value.patient_id;
    this.patinetObj.name = this.patientDetail.value.name;
    this.patinetObj.email = this.patientDetail.value.email;
    this.patinetObj.age = this.patientDetail.value.age;
    this.patinetObj.sex=this.patientDetail.value.sex;
    this.patinetObj.report=this.patientDetail.value.report;
    this.patinetObj.accept=this.patientDetail.value.accept;
  
    this.patientService.updatePatient(this.patinetObj).subscribe(res=>{
      console.log(res);
      this.openDialog(true)
    },err=>{
      console.log(err);
      this.openDialog(false);
    })
  
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
    this.router.navigateByUrl('/adminDashboard/adminPatients');
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
    this.router.navigateByUrl('/adminDashboard/adminPatients');
  }


}