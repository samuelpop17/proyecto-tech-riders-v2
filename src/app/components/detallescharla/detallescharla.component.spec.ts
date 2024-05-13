import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallescharlaComponent } from './detallescharla.component';

describe('DetallescharlaComponent', () => {
  let component: DetallescharlaComponent;
  let fixture: ComponentFixture<DetallescharlaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetallescharlaComponent]
    });
    fixture = TestBed.createComponent(DetallescharlaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
