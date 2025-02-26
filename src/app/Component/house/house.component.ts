import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { HouseService } from './../../Service/house.service';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../Service/auth.service';
import { House } from '../../Module/house';
@Component({
  selector: 'app-house',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './house.component.html',
  styleUrl: './house.component.css'
})
export class HouseComponent implements OnInit {
  Houses: House[] = []
  Models: any[] = []
  filteredModels: any[] = [];
  filteredHouse: House[] = []
  userToken: boolean = true
  isHouseVisible: boolean[] = [];

  constructor(private HouseService: HouseService, private _Auth: AuthService, private _ToastrService: ToastrService) {
    _Auth.user.subscribe({
      next: () => {
        if (_Auth.user.getValue() !== null) {
          this.userToken = true
        } else {
          this.userToken = false;
        }
      }
    })
  }
  ngOnInit(): void {
    this.AllHouse()
    this.HouseModels();

    if (localStorage.getItem('userToken') == null) {
      this.userToken = false
    }
  }
  AllHouse() {
    this.HouseService.AllHouse().subscribe({
      next: (response) => {
        this.Houses = response.data.map(house => new House(house));
        this.filteredHouse = [...this.Houses];
        console.log('Houses:', this.Houses);
      },
      error: (err) => {
        console.error('Error getting houses:', err);
      },
    });
  }

  HouseModels() {
    this.HouseService.house_models().subscribe({
      next: (res) => {
        this.Models = res.data;
        this.filteredModels = res.data;
        console.log(this.Models)
      }
      , error: (err) => {
        this._ToastrService.error(err.error.errors[0].detail)
      }
    })
  }

  fliterModel(filterValue: string, index: number) {
    this.isHouseVisible[index] = !this.isHouseVisible[index];
    const lowerCaseValue = filterValue.toLowerCase();
    console.log(lowerCaseValue);
    this.filteredModels = this.Models.filter(model =>
      model.attributes.model.toLowerCase().includes(lowerCaseValue)
    );

    this.filteredHouse = this.Houses.filter(house =>
      house.attributes.model.toLowerCase().includes(lowerCaseValue)
    );

    console.log(this.filteredModels, this.filteredHouse);
  }
}
