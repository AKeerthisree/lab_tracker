import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './MyComponents/login/login.component';
import { ReceivingStationComponent } from './MyComponents/receiving-station/receiving-station.component';
import { RequestsHISComponent } from './MyComponents/requests-his/requests-his.component';
import { SampleComponent } from './MyComponents/sample/sample.component';
import {AdminComponent} from './MyComponents/admin/admin.component'
import {ConfirmDialogComponent} from './MyComponents/confirm-dialog/confirm-dialog.component';
import { PendingSamplesComponent } from './MyComponents/pending-samples/pending-samples.component';
import { GrossingStationComponent } from './MyComponents/grossing-station/grossing-station.component';
import { ExternalPatientComponent } from './MyComponents/external-patient/external-patient.component';
import { VerificationComponent } from './MyComponents/verification/verification.component';
import { DispatchComponent } from './MyComponents/dispatch/dispatch.component';
import { PendingPatientsComponent } from './MyComponents/pending-patients/pending-patients.component';
import { PendingPatientsDispatchComponent } from './MyComponents/pending-patients-dispatch/pending-patients-dispatch.component';
import { DoctorIndexComponent } from './MyComponents/doctor-index/doctor-index.component';
import { AddPatientsHISComponent } from './MyComponents/add-patients-his/add-patients-his.component';
import { NavComponent } from './MyComponents/nav/nav.component';
import { AdminPatientsComponent } from './MyComponents/admin-patients/admin-patients.component';
import { AdminEmployeesComponent } from './MyComponents/admin-employees/admin-employees.component';
import { AdminSamplesComponent } from './MyComponents/admin-samples/admin-samples.component';

import { AddEmployeeComponent } from './MyComponents/add-employee/add-employee.component';
import { EditEmployeeComponent } from './MyComponents/edit-employee/edit-employee.component';

import { AddPatientComponent } from './MyComponents/add-patient/add-patient.component';
import { EditPatientComponent } from './MyComponents/edit-patient/edit-patient.component';

import { EditSampleComponent } from './MyComponents/edit-sample/edit-sample.component';

import { SearchSampleComponent } from './MyComponents/search-sample/search-sample.component';

import { HomeComponent } from './MyComponents/home/home.component';

const routes: Routes = [
  //{path:'',component:LoginComponent},
  {path:'',component:HomeComponent},
  {path:'receivingStation',component:ReceivingStationComponent},
  {path:'requests',component:RequestsHISComponent},
  {path:'sample',component:SampleComponent},
  {path:'admin',component:AdminComponent},
  {path:'confirm',component:ConfirmDialogComponent},
  {path:'pendingSamples',component:PendingSamplesComponent},
  {path:'grossingStation',component:GrossingStationComponent},
  {path:'external',component:ExternalPatientComponent},
  {path:'login',component:LoginComponent},
  {path:'verification',component:VerificationComponent},
  {path:"dispatch",component:DispatchComponent},
  {path:"pendingPatients",component:PendingPatientsComponent},
  {path:"pendingDispatchPatients",component:PendingPatientsDispatchComponent},
  {path:"doctorIndex",component:DoctorIndexComponent},
  {path:"addPatientHIS",component:AddPatientsHISComponent},
  {path:"adminDashboard",component:NavComponent,
  children:[
    {path:"adminPatients",component:AdminPatientsComponent},
    {path:"adminEmployees",component:AdminEmployeesComponent},
    {path:"adminSamples",component:AdminSamplesComponent},
    {path:"addEmployee",component:AddEmployeeComponent},
    {path:'editEmployee/:ID',component:EditEmployeeComponent},
    {path:"addPatient",component:AddPatientComponent},
    {path:'editPatient/:ID',component:EditPatientComponent},
    {path:'editSample/:ID',component:EditSampleComponent},
    {path:'search',component:SearchSampleComponent},

  ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
