import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadosrhComponent } from './empleadosrh.component';

describe('EmpleadosrhComponent', () => {
  let component: EmpleadosrhComponent;
  let fixture: ComponentFixture<EmpleadosrhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpleadosrhComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpleadosrhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
