import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProponerTecnologiaComponent } from './proponer-tecnologia.component';

describe('ProponerTecnologiaComponent', () => {
  let component: ProponerTecnologiaComponent;
  let fixture: ComponentFixture<ProponerTecnologiaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProponerTecnologiaComponent]
    });
    fixture = TestBed.createComponent(ProponerTecnologiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
