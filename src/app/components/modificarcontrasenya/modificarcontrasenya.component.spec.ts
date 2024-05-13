import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarcontrasenyaComponent } from './modificarcontrasenya.component';

describe('ModificarcontrasenyaComponent', () => {
  let component: ModificarcontrasenyaComponent;
  let fixture: ComponentFixture<ModificarcontrasenyaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModificarcontrasenyaComponent]
    });
    fixture = TestBed.createComponent(ModificarcontrasenyaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
