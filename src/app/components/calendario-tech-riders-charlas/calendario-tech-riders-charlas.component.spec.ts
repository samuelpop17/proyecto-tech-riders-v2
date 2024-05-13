import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioTechRidersCharlasComponent } from './calendario-tech-riders-charlas.component';

describe('CalendarioTechRidersCharlasComponent', () => {
  let component: CalendarioTechRidersCharlasComponent;
  let fixture: ComponentFixture<CalendarioTechRidersCharlasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarioTechRidersCharlasComponent]
    });
    fixture = TestBed.createComponent(CalendarioTechRidersCharlasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
