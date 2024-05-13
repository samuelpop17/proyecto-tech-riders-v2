import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValoracioncharlaComponent } from './valoracioncharla.component';

describe('ValoracioncharlaComponent', () => {
  let component: ValoracioncharlaComponent;
  let fixture: ComponentFixture<ValoracioncharlaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValoracioncharlaComponent]
    });
    fixture = TestBed.createComponent(ValoracioncharlaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
