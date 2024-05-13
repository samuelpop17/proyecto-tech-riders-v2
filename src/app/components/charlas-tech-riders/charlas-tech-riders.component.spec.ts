import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharlasTechRidersComponent } from './charlas-tech-riders.component';

describe('CharlasTechRidersComponent', () => {
  let component: CharlasTechRidersComponent;
  let fixture: ComponentFixture<CharlasTechRidersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CharlasTechRidersComponent]
    });
    fixture = TestBed.createComponent(CharlasTechRidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
