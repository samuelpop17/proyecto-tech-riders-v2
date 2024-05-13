import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursosCentroComponent } from './cursos-centro.component';

describe('CursosCentroComponent', () => {
  let component: CursosCentroComponent;
  let fixture: ComponentFixture<CursosCentroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CursosCentroComponent]
    });
    fixture = TestBed.createComponent(CursosCentroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
