import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarusuarioComponent } from './editarusuario.component';

describe('EditarusuarioComponent', () => {
  let component: EditarusuarioComponent;
  let fixture: ComponentFixture<EditarusuarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarusuarioComponent]
    });
    fixture = TestBed.createComponent(EditarusuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
