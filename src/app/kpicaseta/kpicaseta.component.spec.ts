import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KpicasetaComponent } from './kpicaseta.component';

describe('KpicasetaComponent', () => {
  let component: KpicasetaComponent;
  let fixture: ComponentFixture<KpicasetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KpicasetaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KpicasetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
