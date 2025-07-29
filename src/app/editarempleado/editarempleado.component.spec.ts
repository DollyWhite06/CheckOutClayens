import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarempleadoComponent } from './editarempleado.component';

describe('EditarempleadoComponent', () => {
  let component: EditarempleadoComponent;
  let fixture: ComponentFixture<EditarempleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarempleadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarempleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
