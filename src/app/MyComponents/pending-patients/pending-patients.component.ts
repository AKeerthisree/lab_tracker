import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VerificationService } from 'src/app/services/verification.service';
import { sampleDetails } from '../details/sampleDetails';

@Component({
  selector: 'app-pending-patients',
  templateUrl: './pending-patients.component.html',
  styleUrls: ['./pending-patients.component.css']
})
export class PendingPatientsComponent implements OnInit {

  pndng_samples;
  pndng_blocks;
  constructor(
    private router:Router,
    private verificationService: VerificationService,
  ) { 
    this.verificationService.getPendingSamples(3).subscribe(res=>{
      this.pndng_samples = res;
  },err=>{
    console.log("error while fetching data.")
  });

  this.verificationService.getPendingBlocks(3).subscribe(res=>{
    this.pndng_blocks = res;
  },err=>{
    console.log("error while fetching data.")
  });


    
  }

  ngOnInit(): void {
  }


  verificationStation(){
    this.router.navigateByUrl('/verification');
  }
}
