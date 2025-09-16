import { ToastrService } from 'ngx-toastr';
import {FormControl,FormGroup, ReactiveFormsModule,Validators} from '@angular/forms';
import { HouseService } from './../../Service/house.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-house-new',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './house-new.component.html',
  styleUrl: './house-new.component.css',
})
export class HouseNewComponent {
  constructor(private _HouseService: HouseService,private _ToastrService:ToastrService) {}

  House = new FormGroup({
    house_number: new FormControl('', [Validators.required]),
    block_number: new FormControl('', [Validators.required]),
    land_number: new FormControl('', [Validators.required]),
    price: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]+$/),
    ]),
    model: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    house_type: new FormControl('', [Validators.required]),
  });
  createHouse() {
    if (this.House.valid) {
      const houseData = this.House.value;
      this._HouseService.CreatHouse(houseData).subscribe({
        next: (res) => {
          this._ToastrService.success('House Created is success')
          console.log('House Created', res);
        },
        error: (err) => {
          this._ToastrService.error(err.error.errors[0].detail)
          console.error('Error creating house', err.error);
        },
      });
    } else {
      console.log('Form is invalid', this.House.errors);
    }
  }
}
