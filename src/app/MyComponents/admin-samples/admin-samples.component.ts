import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { sampleDetails } from '../details/sampleDetails';
import { SampleService } from 'src/app/services/sample.service';
import { patientDetails } from '../details/patientDetails';

@Component({
  selector: 'app-admin-samples',
  templateUrl: './admin-samples.component.html',
  styleUrls: ['./admin-samples.component.css']
})
export class AdminSamplesComponent implements OnInit {

  sampleDetail !: FormGroup;
  sampleObj : sampleDetails = new sampleDetails();
  sampleList : sampleDetails[] = []
  searchText : string;
  
  constructor(
    private formBuilder: FormBuilder,
    private sampleService: SampleService,
    private router:Router) { }

  ngOnInit(): void {
    this.sampleDetail = this.formBuilder.group({
      sample_id:[''],
      pd: new patientDetails(),
      remarks: [''],
      specimen:[''],
      test:[''],
      fixative:[''],
      quantity:[''],
      lastUpdatedStation:['']
    })
    this.getAllSamples();
  }
  // addSample(){
  //   this.router.navigateByUrl('/adminDashboard/addSample');
  // }

  getAllSamples() {
    this.sampleService.getAllSamples().subscribe(res=>{
      this.sampleList = res;
    },err=>{
      console.log("error while fetching data.")
    });
  }

  editSample(sample : sampleDetails) {
    console.log(sample);
    let ID=sample.sample_id;
    this.router.navigate(["/adminDashboard/editSample",ID]);

  }

deleteSample(sample : sampleDetails) {

  this.sampleService.deleteSample(sample).subscribe(res=>{
    console.log(res);
    alert('Sample deleted successfully');
    this.getAllSamples();
  },err => {
    console.log(err);
  });


}

logout(){
  this.router.navigateByUrl('')
}
}
