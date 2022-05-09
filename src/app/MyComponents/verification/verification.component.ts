import { Component, OnInit,Inject } from '@angular/core';
import { Router } from '@angular/router';
import { VerificationService } from 'src/app/services/verification.service';
import { patientDetails } from '../details/patientDetails';
import { blockDetails } from '../details/blockDetails';
import {MatDialog, MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatDialogActions } from '@angular/material/dialog';
import { sampleDetails } from '../details/sampleDetails';

export interface DialogData {
  title:string;
  content:string;
}

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {
  patientId;
  blkReport="";
  sampleReport="";
  uSampleId;
  uUHID;
 // pdd;
  newForm=true;
  isPddReadOnly="true";
  sampleForm=true;
  sample:sampleDetails=new sampleDetails();
  obsrvtns;
  blk;
  blkDetails;
  sampleDetails;
  message;
  messageReport;
  blockID;
  bD:blockDetails=new blockDetails();

  
  dialogMsg={
    "title":"",
    "content":"",

  }
  constructor(
    private router:Router,
    private verificationService: VerificationService,
    public dialog: MatDialog
  ) {      
  }

  ngOnInit(): void {
  }
  autofill(){
    this.sampleForm=true;
    this.newForm=false;


    this.verificationService.getBlockByID(this.blockID).subscribe(
      (data)=>{
        console.log(data);
        this.bD=data;
        this.sample=this.bD.sd;
      console.log(this.sample);
      },
      ()=>{

      }
    )

    

    //this.generateBlkReport();
    //this.generateSampleReport();
    // this.verificationService.getOneSample(this.uSampleId).subscribe(
    //   (data)=>{
    //     console.log(data);
    //     this.sample=data;
    //   }
    // )
  }

  saveObs(){
    this.bD.last_updated_station=4;
    let resp=this.verificationService.updateBlock(this.bD).subscribe(
      (data)=>{
        console.log(data)
      },
      (err)=>{
        console.log("Error");
      }

    )
    if(resp)
      this.openDialog(true);
    else
      this.openDialog(false);

  }

  // saveObs(){
  //   console.log(this.obsrvtns);
  //   this.sD.remarks=this.obsrvtns;
  //   this.sD.lastUpdatedStation=4;
  //   let resp=this.verificationService.insertRemarksSample(this.sD);
  //     resp.subscribe((data)=>{
  //       console.log(data);
  //       this.messageReport=data});

  //   for(let i=0;i<this.blkDetails.length;i++){
  //     this.blkDetails[i].last_updated_station=4;
  //     let resp=this.verificationService.updateBlock(this.blkDetails[i]);
  //     resp.subscribe((data)=>{
  //       console.log(data);
  //       this.message=data});

  //   }
  //   if(resp)
  //     this.openDialog(true);
  //   else
  //     this.openDialog(false);

      
  // }

  // generateBlkReport(){
  //   //blkReport 
  //   this.verificationService.getBlkDetailsOfSample(this.sampleID).subscribe(
  //     (data)=>{
  //       console.log(data);
  //       this.blkDetails=data;
  //       console.log(this.blkDetails.length);
  //       for(let i=0;i<this.blkDetails.length;i++){
  //         this.blkReport+=this.blkDetails[i].remarks+" ";
  //         console.log(this.blkReport);
  //       }
  //     }
  //   )
    
  // }

  generateSampleReport(){
    
    this.verificationService.getSampleDetailsOfPatient(this.patientId).subscribe(
      (data)=>{
        console.log(data);
        this.sampleDetails=data;
        console.log(this.sampleDetails.lenght);
        for(let i=0;i<this.sampleDetails.length;i++){
          this.sampleReport+=this.sampleDetails[i].remarks+" ";
          console.log(this.sampleDetails);
        }
      }
    )
    
  }

  pendingPatients(){
    this.router.navigateByUrl('/pendingPatients')
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