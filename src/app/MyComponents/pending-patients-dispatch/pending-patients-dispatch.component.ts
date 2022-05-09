import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DispatchService } from 'src/app/services/dispatch.service';
import { blockDetails } from '../details/blockDetails';
import { sampleDetails } from '../details/sampleDetails';

@Component({
  selector: 'app-pending-patients-dispatch',
  templateUrl: './pending-patients-dispatch.component.html',
  styleUrls: ['./pending-patients-dispatch.component.css']
})
export class PendingPatientsDispatchComponent implements OnInit {

  pndng_blocks:blockDetails[]=[];
  
  constructor(
    private router:Router,
    private dispatchService: DispatchService,
  ) { 
    this.dispatchService.getPendingBlocks(4).subscribe(res=>{
      this.pndng_blocks = res;
      console.log(this.pndng_blocks);
  },err=>{
    console.log("error while fetching data.")
  });

  }

  ngOnInit(): void {
  }

  getAllPendingPatients(){
    
  }
  dispatchStation(){
    this.router.navigateByUrl('/dispatch');
  }

}
