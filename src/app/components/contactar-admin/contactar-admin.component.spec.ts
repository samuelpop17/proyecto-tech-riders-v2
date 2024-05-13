import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactarAdminComponent } from './contactar-admin.component';

describe('ContactarAdminComponent', () => {
  let component: ContactarAdminComponent;
  let fixture: ComponentFixture<ContactarAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactarAdminComponent]
    });
    fixture = TestBed.createComponent(ContactarAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
