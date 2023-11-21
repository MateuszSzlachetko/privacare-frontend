import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotsFormComponent } from './slots-form.component';

describe('SlotsFormComponent', () => {
  let component: SlotsFormComponent;
  let fixture: ComponentFixture<SlotsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SlotsFormComponent]
    });
    fixture = TestBed.createComponent(SlotsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
