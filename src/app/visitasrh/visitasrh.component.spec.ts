import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitasrhComponent } from './visitasrh.component';

describe('VisitasrhComponent', () => {
  let component: VisitasrhComponent;
  let fixture: ComponentFixture<VisitasrhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisitasrhComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitasrhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
