import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharlasprofesorComponent } from './charlasprofesor.component';

describe('CharlasprofesorComponent', () => {
  let component: CharlasprofesorComponent;
  let fixture: ComponentFixture<CharlasprofesorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CharlasprofesorComponent]
    });
    fixture = TestBed.createComponent(CharlasprofesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
