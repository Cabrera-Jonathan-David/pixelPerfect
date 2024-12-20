import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioTarjetaComponent } from './formulario-tarjeta.component';

describe('FormularioTarjetaComponent', () => {
  let component: FormularioTarjetaComponent;
  let fixture: ComponentFixture<FormularioTarjetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormularioTarjetaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormularioTarjetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
