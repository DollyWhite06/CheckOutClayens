import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoempleadorhComponent } from './nuevoempleadorh.component';

describe('NuevoempleadorhComponent', () => {
  let component: NuevoempleadorhComponent;
  let fixture: ComponentFixture<NuevoempleadorhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevoempleadorhComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevoempleadorhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
