import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { sampleDetails } from '../MyComponents/details/sampleDetails';
import { patientDetails } from '../MyComponents/details/patientDetails';
import { blockDetails } from '../MyComponents/details/blockDetails';
@Injectable({
  providedIn: 'root'
})
export class DispatchService {
  serverUrl = 'http://localhost:8020/';
  options = {
    responseType: 'json',
  };

  constructor(private httpClient: HttpClient) { }
  getPatientByID(id){
    return this.httpClient.get(this.serverUrl + 'getOne/'+id);
  }
  getBlockByID(block_id):Observable<blockDetails>{
    return this.httpClient.get<blockDetails>(this.serverUrl+'block/getOneBlock/'+block_id);
  }
    getPatient_sampleID(sample_id):Observable<patientDetails>{
      return this.httpClient.get<patientDetails>(this.serverUrl+'getPatient_sampleID/'+sample_id);
    }
    getOneSample(sample_id): Observable<sampleDetails>{
      return this.httpClient.get<sampleDetails>(this.serverUrl+'getOneSample/'+sample_id);
    }
    updateReport(patient_details){
      return this.httpClient.put(this.serverUrl+'update/',patient_details);
    }
    getPendingPatients(station){
      return this.httpClient.get(this.serverUrl+'getPendingPatients/'+station);
    }
    getPendingSamples(station):Observable<sampleDetails[]>{
      return this.httpClient.get<sampleDetails[]>(this.serverUrl+'getPendingSamples/'+station);
    }
    getPendingBlocks(stationNo):Observable<blockDetails[]>{
      return this.httpClient.get<blockDetails[]>(this.serverUrl+'block/getPendingBlocks/'+stationNo);
    }
    getBlkDetailsOfPatient(patient_id){
      return this.httpClient.get(this.serverUrl+'block/getBlkDetailsOfPatient/'+patient_id);
    }
    getBlkDetailsOfSample(sample_id){
      return this.httpClient.get(this.serverUrl+'block/getBlkDetailsOfSample/'+sample_id);
    }
    getSampleDetailsOfPatient(patient_id){
      return this.httpClient.get(this.serverUrl+'getSampleDetailsOfPatient/'+patient_id);
    }
    updateSample(sample){
      return this.httpClient.put(this.serverUrl+'updateSample/',sample);
    }
    updateBlock(block){
      return this.httpClient.put(this.serverUrl+'block/updateBlock/',block);
    }
    //sending report to patient email
    sendEmail(email_details){
      return this.httpClient.post(this.serverUrl+'sendEmail/',email_details);
    }
  }
