import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { patientDetails } from '../details/patientDetails';
import { HISService } from 'src/app/services/his.service';
import {MatDialog, MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  title:string;
  content:string;
}

@Component({
  selector: 'app-add-patients-his',
  templateUrl: './add-patients-his.component.html',
  styleUrls: ['./add-patients-his.component.css']
})
export class AddPatientsHISComponent implements OnInit {

  pdd:patientDetails=new patientDetails();
  message;
  constructor(
    private router:Router,
    private hisService:HISService,
    public dialog: MatDialog
  ) {
    //this.pdd=new patientDetails("","","",0,"","",false);
   }

  ngOnInit(): void {
    //this.pdd=new patientDetails("","","",0,"","",false);
  }
  savePDetails(){
    let resp=this.hisService.addPatientDetails(this.pdd);
    resp.subscribe((data)=>{
      console.log(data);
      this.message=data});
    console.log(this.message);

    if(resp)
      this.openDialog(true);
    else
      this.openDialog(false);

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
    //this.pdd=new patientDetails("","","",0,"","",false);
    
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