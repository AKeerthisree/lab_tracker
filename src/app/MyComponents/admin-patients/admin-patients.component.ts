import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PatientService } from 'src/app/services/patient.service';
import { patientDetails } from '../details/patientDetails';


@Component({
  selector: 'app-admin-patients',
  templateUrl: './admin-patients.component.html',
  styleUrls: ['./admin-patients.component.css']
})
export class AdminPatientsComponent implements OnInit {

  patientDetail !: FormGroup;
  patientObj : patientDetails = new patientDetails();
  patientList : patientDetails[] = []
  searchText : string;
  
  constructor(
    private formBuilder: FormBuilder,
    private patientService: PatientService,
    private router:Router) { }

  ngOnInit(): void {
    this.patientDetail = this.formBuilder.group({
      patient_id:[''],
      name: [''],
      email: [''],
      age:[''],
      sex:[''],
      report:[''],
      accept:[''],
      currDate:[''],
    })
    this.getAllPatients();
  }
  addPatient(){
    this.router.navigateByUrl('/adminDashboard/addPatient');
  }

  getAllPatients() {
    this.patientService.getAllPatients().subscribe(res=>{
      this.patientList = res;
      console.log(this.patientList)
    },err=>{
      console.log("error while fetching data.")
    });
  }

  editPatient(patient : patientDetails) {
    console.log(patient);
    let ID=patient.patient_id;
    this.router.navigate(["/adminDashboard/editPatient",ID]);

  }

deletePatient(patient : patientDetails) {

  this.patientService.deletePatient(patient).subscribe(res=>{
    console.log(res);
    alert('Patient deleted successfully');
    this.getAllPatients();
  },err => {
    console.log(err);
  });


}

logout(){
  this.router.navigateByUrl('')
}
}
