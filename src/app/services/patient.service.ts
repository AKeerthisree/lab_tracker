import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../MyComponents/details/Employee';
import { patientDetails } from '../MyComponents/details/patientDetails';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  serverUrl = 'http://localhost:8020/';
  options = {
    responseType: 'json',
  };
  constructor(private httpClient: HttpClient) { }

  getAllPatients(): Observable<patientDetails[]>{
    return this.httpClient.get<patientDetails[]>(this.serverUrl+'getAll');
  }

  deletePatient(patient : patientDetails) : Observable<patientDetails> {
    return this.httpClient.delete<patientDetails>(this.serverUrl+'delete/'+patient.patient_id);
  }

  addPatient(patient : patientDetails): Observable<patientDetails> {
    return this.httpClient.post<patientDetails>(this.serverUrl+'addPatient',patient);
  }

  updatePatient(patient :patientDetails) : Observable<patientDetails>{
    return this.httpClient.put<patientDetails>(this.serverUrl+'update', patient);
  }

  getPatient(id):Observable<patientDetails>{
    return this.httpClient.get<patientDetails>(this.serverUrl+'getOne/'+id);
  }



}
