import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrocasetaComponent } from './registrocaseta.component';

describe('RegistrocasetaComponent', () => {
  let component: RegistrocasetaComponent;
  let fixture: ComponentFixture<RegistrocasetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrocasetaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrocasetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
