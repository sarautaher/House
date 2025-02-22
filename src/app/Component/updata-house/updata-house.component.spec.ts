import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdataHouseComponent } from './updata-house.component';

describe('UpdataHouseComponent', () => {
  let component: UpdataHouseComponent;
  let fixture: ComponentFixture<UpdataHouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdataHouseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdataHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
