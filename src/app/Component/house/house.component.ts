import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { HouseService } from './../../Service/house.service';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../Service/auth.service';

@Component({
  selector: 'app-house',
  standalone: true,
  imports: [RouterLink,CommonModule ,ReactiveFormsModule],
  templateUrl: './house.component.html',
  styleUrl: './house.component.css'
})
export class HouseComponent implements OnInit {
  Houses:any[]=[]
  Models:any[]=[]
  filteredModels:any[]=[]
  name:string="apartment-3"
  userToken:boolean=true
  constructor(private HouseService:HouseService,private _Auth:AuthService,private _ToastrService:ToastrService){
    _Auth.user.subscribe({
      next:()=>{
    if(_Auth.user.getValue() !==null){
    this.userToken=true
    }else{
      this.userToken=false;
    }
      }
    })
  }
ngOnInit(): void {
    this.AllHouse()
  this.HouseModels();
  this.fliterModel('apartment-2')
    if(localStorage.getItem('userToken')==null){
      this.userToken=false
    }
}
  AllHouse(){
    this.HouseService.AllHouse().subscribe({
      next:(res)=>{
        this._ToastrService.success("welcome! We are thrilled to have you here.")
        this.Houses= res.data
        console.log(this.Houses)
      }
      ,error:(err)=>{
        this._ToastrService.error(err.error.errors[0].detail)
      }
    }) }
   
HouseModels(){
  this.HouseService.house_models().subscribe({
    next:(res)=>{
      this.Models= res.data
      console.log(this.Models )
    }
    ,error:(err)=>{
      this._ToastrService.error(err.error.errors[0].detail)
    } 
  })
}
fliterModel(event:any){
  const filterValue = event.target.value.toLowerCase();
  console.log(filterValue)
  this.filteredModels = this.Models.filter(model =>
    model.attributes.model.toLowerCase().includes(filterValue)
  );
console.log(this.filteredModels)
}
}
