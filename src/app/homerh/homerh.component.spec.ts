import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomerhComponent } from './homerh.component';

describe('HomerhComponent', () => {
  let component: HomerhComponent;
  let fixture: ComponentFixture<HomerhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomerhComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomerhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
