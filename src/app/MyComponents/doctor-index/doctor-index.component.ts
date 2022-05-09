import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-index',
  templateUrl: './doctor-index.component.html',
  styleUrls: ['./doctor-index.component.css']
})
export class DoctorIndexComponent implements OnInit {

  constructor(
    private router:Router,
  ) { }

  ngOnInit(): void {
  }
  receivingStation(){
    this.router.navigateByUrl('/receivingStation');
  }

  grossingStation(){
    this.router.navigateByUrl('/grossingStation')
  }

  verificationStation(){
    this.router.navigateByUrl('/verification')
  }

  dispatchStation(){
    this.router.navigateByUrl('/dispatch')
  }

  logout(){
    this.router.navigateByUrl('')
  }
}
