import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { blockDetails } from '../MyComponents/details/blockDetails';
import { sampleDetails } from '../MyComponents/details/sampleDetails';

@Injectable({
  providedIn: 'root'
})
export class VerificationService {
  

  serverUrl = 'http://localhost:8020/';
  options = {
    responseType: 'json',
  };
  constructor(private httpClient: HttpClient) { }
  getPatientByID(id){
    return this.httpClient.get(this.serverUrl + 'getOne/'+id);
  }
  getSampleByID(id): Observable<sampleDetails>{
    return this.httpClient.get<sampleDetails>(this.serverUrl+ 'getOneSample/'+id);
  }
  getPatient_sampleID(sample_id){
    return this.httpClient.get(this.serverUrl+'getPatient_sampleID/'+sample_id);
  }
  getBlockByID(block_id):Observable<blockDetails>{
    return this.httpClient.get<blockDetails>(this.serverUrl+'block/getOneBlock/'+block_id);
  }
  getOneSample(sample_id){
    return this.httpClient.get(this.serverUrl+'getOneSample/'+sample_id);
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
  insertReport(patient_details){
    return this.httpClient.put(this.serverUrl+'update/',patient_details);
  }
  insertRemarksSample(sample){
    return this.httpClient.put(this.serverUrl+'setLastUpdated/',sample);
  }
  getPendingPatients(stationNo){
    return this.httpClient.get(this.serverUrl+'getPendingPatients/'+stationNo);
  }
  getPendingSamples(stationNo){
    return this.httpClient.get(this.serverUrl+'getPendingSamples/'+stationNo);
  }
  getPendingBlocks(stationNo){
    return this.httpClient.get(this.serverUrl+'block/getPendingBlocks/'+stationNo);
  }
  updateSample(sample){
    return this.httpClient.put(this.serverUrl+'updateSample/',sample);
  }
  updateBlock(block){
    return this.httpClient.put(this.serverUrl+'block/updateBlock/',block);
  }
}

