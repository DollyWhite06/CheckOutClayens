import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoscasetaComponent } from './empleadoscaseta.component';

describe('EmpleadoscasetaComponent', () => {
  let component: EmpleadoscasetaComponent;
  let fixture: ComponentFixture<EmpleadoscasetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpleadoscasetaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpleadoscasetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
