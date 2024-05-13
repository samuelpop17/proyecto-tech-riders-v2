import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MischarrlasTechridersComponent } from './mischarrlas-techriders.component';

describe('MischarrlasTechridersComponent', () => {
  let component: MischarrlasTechridersComponent;
  let fixture: ComponentFixture<MischarrlasTechridersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MischarrlasTechridersComponent]
    });
    fixture = TestBed.createComponent(MischarrlasTechridersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
