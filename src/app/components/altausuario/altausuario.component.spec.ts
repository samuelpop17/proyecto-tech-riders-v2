import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltausuarioComponent } from './altausuario.component';

describe('AltausuarioComponent', () => {
  let component: AltausuarioComponent;
  let fixture: ComponentFixture<AltausuarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AltausuarioComponent]
    });
    fixture = TestBed.createComponent(AltausuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
