import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditartecnologiastechriderComponent } from './editartecnologiastechrider.component';

describe('EditartecnologiastechriderComponent', () => {
  let component: EditartecnologiastechriderComponent;
  let fixture: ComponentFixture<EditartecnologiastechriderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditartecnologiastechriderComponent]
    });
    fixture = TestBed.createComponent(EditartecnologiastechriderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
