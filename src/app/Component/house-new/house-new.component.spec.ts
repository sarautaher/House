import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseNewComponent } from './house-new.component';

describe('HouseNewComponent', () => {
  let component: HouseNewComponent;
  let fixture: ComponentFixture<HouseNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HouseNewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HouseNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
