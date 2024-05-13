import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcreditarcharlaComponent } from './acreditarcharla.component';

describe('AcreditarcharlaComponent', () => {
  let component: AcreditarcharlaComponent;
  let fixture: ComponentFixture<AcreditarcharlaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcreditarcharlaComponent]
    });
    fixture = TestBed.createComponent(AcreditarcharlaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
