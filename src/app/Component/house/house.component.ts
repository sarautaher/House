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
  imports: [RouterLink,CommonModule],
  templateUrl: './house.component.html',
  styleUrl: './house.component.css'
})
export class HouseComponent implements OnInit {
  Houses:any[]=[]
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
    if(localStorage.getItem('userToken')==null){
      this.userToken=false
    }
}
  AllHouse(){
    this.HouseService.AllHouse().subscribe({
      next:(res)=>{
        this._ToastrService.success("welcome! We are thrilled to have you here.")
        this.Houses= res.data
      }
      ,error:(err)=>{
        this._ToastrService.error(err.error.errors[0].detail)
      }
    }) }
   

}
