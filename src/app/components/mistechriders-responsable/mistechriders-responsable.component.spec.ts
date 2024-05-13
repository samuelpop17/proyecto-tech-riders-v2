import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MistechridersResponsableComponent } from './mistechriders-responsable.component';

describe('MistechridersResponsableComponent', () => {
  let component: MistechridersResponsableComponent;
  let fixture: ComponentFixture<MistechridersResponsableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MistechridersResponsableComponent]
    });
    fixture = TestBed.createComponent(MistechridersResponsableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
