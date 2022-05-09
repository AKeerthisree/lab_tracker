import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { patientDetails } from '../details/patientDetails';


import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { ReceivingService } from 'src/app/services/receiving.service';
import { sampleDetails } from '../details/sampleDetails';
import {MatDialog, MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatDialogActions } from '@angular/material/dialog';

export interface DialogData {
  title:string;
  content:string;
}

@Component({
  selector: 'app-receiving-station',
  templateUrl: './receiving-station.component.html',
  styleUrls: ['./receiving-station.component.css']
})
export class ReceivingStationComponent implements OnInit {
  regType='INTERNAL';
  uSampleId;
  uUHID;
  pdd:patientDetails=new patientDetails();
  pdd2:patientDetails=new patientDetails();
  name;
  newForm=true;
  sampleForm=true;
  incorrectRegType:boolean=false;
  isPddReadOnly="true";
  message;
  str;
  tmpSample;
  sA: Array<sampleDetails> = [];
  sd: sampleDetails=new sampleDetails();
  
  patientVals:patientDetails[]=[];
  patientFC = new FormControl();

  constructor(private router: Router,
    private receivingService: ReceivingService,
    public dialog: MatDialog) {
       // this.pdd=new patientDetails("","","",0,"","",false);
        //this.pdd2=new patientDetails("","","",0,"","",false);
        this.receivingService.getAcceptedRequests().subscribe(data=>{
          this.patientVals=data;
          console.log(data);
        },err=>{
            console.log(err);
        })
      
      // //  this.sd= sampleDetails;
      
       
  }
  
 

  
  autofill(){
    this.sampleForm=true;
    this.newForm=false;
    this.sA=[];
   // this.fillForm();
    console.log(this.pdd);

    this.receivingService.getPDDDetailByUHID(this.uSampleId).subscribe(
      (data) => {
        this.sd=new sampleDetails();
        this.pdd = data;
        this.sd.sample_id=this.pdd.patient_id;
      },
      () => {
        
      }
    )
    
  }
  savePDetails(){
    let resp=this.receivingService.insertPD_manual(this.pdd2);
    resp.subscribe((data)=>{
      console.log(data);
      this.message=data});
    console.log(this.message);
    if(resp)
      this.openDialog(true);
    else
      this.openDialog(false);

  }
  generate(){
    this.sd.pd=this.pdd;

    for(let i=0;i<this.sd.quantity;i++){
      this.str=this.sd.sample_id+":"+(i+1).toString();
      console.log(this.str);
      this.tmpSample=new sampleDetails();
      this.tmpSample.sample_id=this.sd.sample_id+":"+(i+1).toString();
      this.tmpSample.remarks=this.sd.remarks;
      this.tmpSample.specimen=this.sd.specimen;
      this.tmpSample.fixative=this.sd.fixative;
      this.tmpSample.quantity=this.sd.quantity;
      this.tmpSample.test=this.sd.test;
      this.tmpSample.pd=this.pdd;
      this.tmpSample.lastUpdatedStation=2;
      this.sA.push(this.tmpSample);
      
    }
    
    console.log(this.sA);
    this.sampleForm=false;
  }

  saveSampleDetails(){
    
    
    // if(this.receivingService.getSampleExist(this.sA[0].sample_id)){

    // }
    // else{
      let resp=this.receivingService.insertSampleDetails(this.sA);
      resp.subscribe((data)=>{
        console.log(data);
        this.message=data});
      console.log(this.message);
      if(resp)
        this.openDialog(true);
      else
        this.openDialog(false);
      


  }




  // private fieldArray: Array<any> = [];
  //   private newAttribute: any = {};

  //   addFieldValue() {
  //       this.fieldArray.push(this.newAttribute)
  //       this.newAttribute = {};
  //   }

  //   deleteFieldValue(index) {
  //       this.fieldArray.splice(index, 1);
  //   }
  initializeNewForm(){}
  

  ngOnInit(): void {
  }
  requests(){
    this.router.navigateByUrl('/requests');
  }
  sample(){

  }
  manualEntry(){
    this.router.navigateByUrl('/external')
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
// function getSampleExist(sample_id: string) {
//   throw new Error('Function not implemented.');
// }

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'dialog-elements-example-dialog.html',
})
export class DialogElementsExampleDialog { 
  constructor(
    public dialogRef: MatDialogRef<DialogElementsExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ){}
  close(){
    this.dialogRef.close();
    window.location.reload();
  }
  
}

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'dialog-unsuccess.html',
})
export class DialogUnsuccess { 
  constructor(
    public dialogRef: MatDialogRef<DialogUnsuccess>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ){}
  close(){
    this.dialogRef.close();
    window.location.reload();
  }
}