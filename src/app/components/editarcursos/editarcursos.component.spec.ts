import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarcursosComponent } from './editarcursos.component';

describe('EditarcursosComponent', () => {
  let component: EditarcursosComponent;
  let fixture: ComponentFixture<EditarcursosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarcursosComponent]
    });
    fixture = TestBed.createComponent(EditarcursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
