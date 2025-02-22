
import { Routes } from '@angular/router';
import { HouseComponent } from './Component/house/house.component';
import { HouseNewComponent } from './Component/house-new/house-new.component';
import { authGuard } from './Gaurd/auth.guard';
import { UpdataHouseComponent } from './Component/updata-house/updata-house.component';

export const routes: Routes = [{path:"",pathMatch:'full',redirectTo:"House"},
    {path:"House",component:HouseComponent,title:'House'},
    {path:"HouseNew",component:HouseNewComponent,title:'HouseNew',canActivate:[authGuard]},
    {path:"UpdataHouse/:id",component:UpdataHouseComponent,title:'UpdataHouse',canActivate:[authGuard]},
];
