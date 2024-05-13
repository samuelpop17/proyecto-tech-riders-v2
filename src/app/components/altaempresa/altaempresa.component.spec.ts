import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaempresaComponent } from './altaempresa.component';

describe('AltaempresaComponent', () => {
  let component: AltaempresaComponent;
  let fixture: ComponentFixture<AltaempresaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AltaempresaComponent]
    });
    fixture = TestBed.createComponent(AltaempresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
