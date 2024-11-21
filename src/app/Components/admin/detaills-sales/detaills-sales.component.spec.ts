import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetaillsSalesComponent } from './detaills-sales.component';

describe('DetaillsSalesComponent', () => {
  let component: DetaillsSalesComponent;
  let fixture: ComponentFixture<DetaillsSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetaillsSalesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetaillsSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
