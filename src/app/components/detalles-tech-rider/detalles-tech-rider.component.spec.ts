import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesTechRiderComponent } from './detalles-tech-rider.component';

describe('DetallesTechRiderComponent', () => {
  let component: DetallesTechRiderComponent;
  let fixture: ComponentFixture<DetallesTechRiderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetallesTechRiderComponent]
    });
    fixture = TestBed.createComponent(DetallesTechRiderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
