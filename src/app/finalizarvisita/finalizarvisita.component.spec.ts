import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalizarvisitaComponent } from './finalizarvisita.component';

describe('FinalizarvisitaComponent', () => {
  let component: FinalizarvisitaComponent;
  let fixture: ComponentFixture<FinalizarvisitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinalizarvisitaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinalizarvisitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
