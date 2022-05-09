import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { sampleDetails } from '../MyComponents/details/sampleDetails';


@Injectable({
  providedIn: 'root'
})
export class SampleService {

  serverUrl = 'http://localhost:8020/';
  options = {
    responseType: 'json',
  };
  constructor(private httpClient: HttpClient) { }

  getAllSamples(): Observable<sampleDetails[]>{
    return this.httpClient.get<sampleDetails[]>(this.serverUrl+'getAllSamples');
  }

  deleteSample(sample : sampleDetails) : Observable<sampleDetails> {
    return this.httpClient.delete<sampleDetails>(this.serverUrl+'deleteSample/'+sample.sample_id);
  }

  // addSample(sample : sampleDetails): Observable<sampleDetails> {
  //   return this.httpClient.post<sampleDetails>(this.serverUrl+'addPatient',patient);
  // }

  updateSample(sample :sampleDetails) : Observable<sampleDetails>{
    return this.httpClient.put<sampleDetails>(this.serverUrl+'updateSample', sample);
  }

  getSample(id):Observable<sampleDetails>{
    return this.httpClient.get<sampleDetails>(this.serverUrl+'getOneSample/'+id);
  }

}