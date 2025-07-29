import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosbiometricosComponent } from './datosbiometricos.component';

describe('DatosbiometricosComponent', () => {
  let component: DatosbiometricosComponent;
  let fixture: ComponentFixture<DatosbiometricosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosbiometricosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatosbiometricosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
