import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { sampleDetails } from '../details/sampleDetails';
import { DialogData } from '../dispatch/dispatch.component';
import { SampleService } from 'src/app/services/sample.service';

@Component({
  selector: 'app-edit-sample',
  templateUrl: './edit-sample.component.html',
  styleUrls: ['./edit-sample.component.css']
})
export class EditSampleComponent implements OnInit {

  paramID;
  sample:sampleDetails=new sampleDetails();
  sampleDetail !: FormGroup;
  sampleObj : sampleDetails = new sampleDetails();
  
  constructor(
    private formBuilder: FormBuilder,
    private sampleService: SampleService,
    private route: ActivatedRoute,
    private router:Router,
    public dialog:MatDialog) { }
  

  ngOnInit(): void {

    this.route.params.subscribe(params=>{
      this.paramID= params['ID'];
      console.log(this.paramID);
     
    });

    this.sampleService.getSample(this.paramID).subscribe(res=>{
      this.sample = res;
    },err=>{
      console.log("error while fetching data.")
    });


    this.sampleDetail = this.formBuilder.group({
      sample_id:this.sample.sample_id,
      pd:this.sample.pd,
      remarks:this.sample.remarks,
      specimen:this.sample.specimen,
      test:this.sample.test,
      fixative:this.sample.fixative,
      quantity:this.sample.quantity,
      lastUpdatedStation:this.sample.lastUpdatedStation
    })
  
  }
  
  updateSample() {
  
    this.sampleObj.sample_id = this.sampleDetail.value.sample_id;
    this.sampleObj.pd = this.sample.pd;
    this.sampleObj.remarks = this.sampleDetail.value.remarks;
    this.sampleObj.specimen = this.sampleDetail.value.specimen;
    this.sampleObj.test=this.sampleDetail.value.test;
    this.sampleObj.fixative=this.sampleDetail.value.fixative;
    this.sampleObj.quantity=this.sampleDetail.value.quantity;
    this.sampleObj.lastUpdatedStation=this.sampleDetail.value.lastUpdatedStation;
  
    this.sampleService.updateSample(this.sampleObj).subscribe(res=>{
      console.log(res);
      this.openDialog(true)
    },err=>{
      console.log(err);
      this.openDialog(false);
    })
  
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
  

}



@Component({
  selector: 'dialog-success',
  templateUrl: '../dialog-success.html',
})
export class DialogElementsExampleDialog { 
  constructor(
    private router:Router,
    public dialogRef: MatDialogRef<DialogElementsExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ){}
  close(){
    this.dialogRef.close();
    this.router.navigateByUrl('/adminDashboard/adminSamples');
  }
  
}

@Component({
  selector: 'dialog-unsuccess',
  templateUrl: '../dialog-unsuccess.html',
})
export class DialogUnsuccess { 
  constructor(
    private router:Router,
    public dialogRef: MatDialogRef<DialogUnsuccess>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ){}
  close(){
    this.dialogRef.close();
    this.router.navigateByUrl('/adminDashboard/adminSamples');
  }


}