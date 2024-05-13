import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitarcharlaComponent } from './solicitarcharla.component';

describe('SolicitarcharlaComponent', () => {
  let component: SolicitarcharlaComponent;
  let fixture: ComponentFixture<SolicitarcharlaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SolicitarcharlaComponent]
    });
    fixture = TestBed.createComponent(SolicitarcharlaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
