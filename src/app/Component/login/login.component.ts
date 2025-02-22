import { CommonModule } from '@angular/common';
import { AuthService } from './../../Service/auth.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule ,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private _AuthService:AuthService,private _ToastrService:ToastrService){
    _AuthService.user.subscribe({
      next:()=>{
    if(_AuthService.user.getValue() !==null){
    this.islood=true
    }else{
      this.islood=false;
    }
      }
    })
  }
  islood:boolean=true

user:FormGroup=new FormGroup({
  username:new FormControl(null,[Validators.required,Validators.pattern(/[a-z]/)]),
  password:new FormControl(null,[Validators.required])
   // Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)]),
})
login(){
  if(this.user.valid){
    console.log(this.user.value)
    const username = this.user.get('username')?.value;
    const password = this.user.get('password')?.value;
    this._AuthService.login(username,password).subscribe({
      next:(res)=> {
        localStorage.setItem('userToken', res.data.attributes.token  );
        if(
res.data.attributes.token ){
  this._ToastrService.success("Logged in successfully!")
        }
        this._AuthService.decodeUser()     
      },
      error: (err) => {
       this._ToastrService.error(err.error.errors[0].detail)
       console.log(err.error.errors[0].detail)
      }
    })
  }
}
logout(){
  this._AuthService.logOut()
  
}
}
