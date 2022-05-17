import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppRoutingModuleComponent } from './app-routing-module.component';

describe('AppRoutingModuleComponent', () => {
  let component: AppRoutingModuleComponent;
  let fixture: ComponentFixture<AppRoutingModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppRoutingModuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppRoutingModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
