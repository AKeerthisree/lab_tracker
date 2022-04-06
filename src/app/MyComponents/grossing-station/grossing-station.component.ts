import { Component, OnInit } from '@angular/core';
import { patientDetails } from '../details/patientDetails';
import { ReceivingService } from 'src/app/services/receiving.service';
import { GrossingService } from 'src/app/services/grossing.service';
import { Router } from '@angular/router';
import { blockDetails } from '../details/blockDetails';
import { sampleDetails } from '../details/sampleDetails';

@Component({
  selector: 'app-grossing-station',
  templateUrl: './grossing-station.component.html',
  styleUrls: ['./grossing-station.component.css']
})
export class GrossingStationComponent implements OnInit {
  uSampleId;
  regType='INTERNAL';
  uUHID;
  newForm=true;
  pdd;
  incorrectRegType:boolean=false;
  isPddReadOnly="true";
  sampleForm=true;
  obsrvtns;
  blkDetails:Array<blockDetails>=[];
  blk:blockDetails=new blockDetails();
  sample;
  quantity;
  str;
  message;
  alpha=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  constructor(
    private router:Router,
    private grossingService: GrossingService,
  ) { 
    this.pdd=patientDetails;
  }

  ngOnInit(): void {
  }

  autofill(){
    this.sampleForm=true;
    this.newForm=false;
   // this.sA=[];
   // this.fillForm();
    console.log(this.pdd);

    this.grossingService.getPatient_sampleID(this.uSampleId).subscribe(
      (data) => {
        console.log(data);
        this.pdd = data;
        
      },
      () => {
        //here we check if the sample id belongs to the correct reg type or not
        // console.log(this.pdd.uhid.charCodeAt(0));
        // console.log("is digit"+ (this.pdd.uhid.charCodeAt(0)>=48 && this.pdd.uhid.charCodeAt(0)<=57));
        
        
      }
    )

    this.grossingService.getOneSample(this.uSampleId).subscribe(
      (data)=>{
        console.log(data);
        this.sample=data;
      }
    )

    
    
    

  }


  saveObs(){
    console.log(this.obsrvtns);
    
  }

  saveBlockDetails(){
    console.log(this.quantity)

    for(let i=0;i<this.quantity;i++){
      this.blk=new blockDetails();
      this.str=this.sample.sample_id+":"+this.alpha[i];
      console.log(this.str);
      this.blk.block_id=this.str;
      this.blk.remarks=this.obsrvtns;
      this.blk.sd=this.sample;
      this.blkDetails.push(this.blk);
      
    }
    
    
    // if(this.receivingService.getSampleExist(this.sA[0].sample_id)){

    // }
    // else{
      let resp=this.grossingService.insertBlockDetails(this.blkDetails);
      resp.subscribe((data)=>{
        console.log(data);
        this.message=data});
      console.log(this.message);
      this.sampleForm=false;
    //}


  }
  pendingSamples(){
    this.router.navigateByUrl('/pendingSamples');
  }
}