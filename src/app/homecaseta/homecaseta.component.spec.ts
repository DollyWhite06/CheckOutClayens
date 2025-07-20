import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomecasetaComponent } from './homecaseta.component';

describe('HomecasetaComponent', () => {
  let component: HomecasetaComponent;
  let fixture: ComponentFixture<HomecasetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomecasetaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomecasetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
