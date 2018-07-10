import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Tab1CompComponent } from './tab1-comp.component';

describe('Tab1CompComponent', () => {
  let component: Tab1CompComponent;
  let fixture: ComponentFixture<Tab1CompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Tab1CompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Tab1CompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
