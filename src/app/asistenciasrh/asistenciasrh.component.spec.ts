import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsistenciasrhComponent } from './asistenciasrh.component';

describe('AsistenciasrhComponent', () => {
  let component: AsistenciasrhComponent;
  let fixture: ComponentFixture<AsistenciasrhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsistenciasrhComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsistenciasrhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
