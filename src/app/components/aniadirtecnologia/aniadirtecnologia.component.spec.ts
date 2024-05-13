import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AniadirtecnologiaComponent } from './aniadirtecnologia.component';

describe('AniadirtecnologiaComponent', () => {
  let component: AniadirtecnologiaComponent;
  let fixture: ComponentFixture<AniadirtecnologiaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AniadirtecnologiaComponent]
    });
    fixture = TestBed.createComponent(AniadirtecnologiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
