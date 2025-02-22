import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HouseService {
  Token: any = localStorage.getItem('userToken');
  constructor(private _HttpClient: HttpClient) {}
  AllHouse(): Observable<any> {
    return this._HttpClient.get('https://vn-fe-test-api.iwalabs.info/houses');
  }
  house_models(id:any):Observable<any>{
    return this._HttpClient.get(`https://vn-fe-test-api.iwalabs.info/house_models/${id}`)
  }
  CreatHouse(House: any): Observable<any> {
    const headers = new HttpHeaders({
      'authentication': this.Token,
      'Content-Type': 'application/vnd.api+json',
    });
    const payload = {
      data: {
        type: 'houses',
        attributes: {
          house_number: House.house_number,
          block_number: House.block_number,
          land_number: House.land_number,
          price: House.price,
          model: House.model,
          status: House.status,
          house_type: House.house_type,
        },
      },
    };
    return this._HttpClient.post(
      'https://vn-fe-test-api.iwalabs.info/houses',
      payload,
      { headers }
    );
  }
  updataHouse(id: any, House: any): Observable<any> {
    const headers = new HttpHeaders({
      'authentication': this.Token,
      'Content-Type': 'application/vnd.api+json',
    });
    return this._HttpClient.patch(
      `https://vn-fe-test-api.iwalabs.info/houses/${id}`,
      {
        data: {
          type: 'houses',
          id: id,
          attributes: {
            house_number: House.house_number,
            block_number: House.block_number,
            land_number: House.land_number,
            price: House.price,
            model: House.model,
            status: House.status,
            house_type: House.house_type,
          },
        },
      },
      { headers }
    );
  }
}
