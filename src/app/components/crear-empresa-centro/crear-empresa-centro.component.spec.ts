import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEmpresaCentroComponent } from './crear-empresa-centro.component';

describe('CrearEmpresaCentroComponent', () => {
  let component: CrearEmpresaCentroComponent;
  let fixture: ComponentFixture<CrearEmpresaCentroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearEmpresaCentroComponent]
    });
    fixture = TestBed.createComponent(CrearEmpresaCentroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
