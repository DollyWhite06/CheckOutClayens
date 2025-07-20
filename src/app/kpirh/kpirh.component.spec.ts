import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KpirhComponent } from './kpirh.component';

describe('KpirhComponent', () => {
  let component: KpirhComponent;
  let fixture: ComponentFixture<KpirhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KpirhComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KpirhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
