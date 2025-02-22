import { ToastrService } from 'ngx-toastr';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HouseService } from '../../Service/house.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-updata-house',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './updata-house.component.html',
  styleUrl: './updata-house.component.css',
})
export class UpdataHouseComponent {
  id: any;
  constructor(
    private _HouseService: HouseService,
    private _ActivatedRoute: ActivatedRoute,
    private _ToastrService:ToastrService
  ) {}
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (id) => {
        this.id = id.get('id');
      },
    });
  }
  House = new FormGroup({
    house_number: new FormControl('', [
      Validators.required,
    ]),
    block_number: new FormControl('', [
      Validators.required,

    ]),
    land_number: new FormControl('', [
      Validators.required,
    ]),
    price: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]+$/),
    ]),
    model: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    house_type: new FormControl('', [Validators.required]),
  });
  UpDate() {
    if (this.House.valid) {
      const houseData = this.House.value;
      this._HouseService.updataHouse(this.id,this.House).subscribe({
        next: (res) => {
          this._ToastrService.success("Updata is Success ")
        },
        error: (err) => {
          this._ToastrService.error(err.error.errors[0].detail)
        },
      });
    }
  }
}
