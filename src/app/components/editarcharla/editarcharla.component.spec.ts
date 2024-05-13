import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarcharlaComponent } from './editarcharla.component';

describe('EditarcharlaComponent', () => {
  let component: EditarcharlaComponent;
  let fixture: ComponentFixture<EditarcharlaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarcharlaComponent]
    });
    fixture = TestBed.createComponent(EditarcharlaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
