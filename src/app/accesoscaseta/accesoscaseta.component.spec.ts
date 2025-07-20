import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccesoscasetaComponent } from './accesoscaseta.component';

describe('AccesoscasetaComponent', () => {
  let component: AccesoscasetaComponent;
  let fixture: ComponentFixture<AccesoscasetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccesoscasetaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccesoscasetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
