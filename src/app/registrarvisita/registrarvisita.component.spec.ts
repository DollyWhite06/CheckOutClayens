import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarvisitaComponent } from './registrarvisita.component';

describe('RegistrarvisitaComponent', () => {
  let component: RegistrarvisitaComponent;
  let fixture: ComponentFixture<RegistrarvisitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarvisitaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarvisitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
