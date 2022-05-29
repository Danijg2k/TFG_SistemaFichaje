import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgbdTableComplete } from './table-complete';

describe('NgbdTableComplete', () => {
  let component: NgbdTableComplete;
  let fixture: ComponentFixture<NgbdTableComplete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NgbdTableComplete],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgbdTableComplete);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
