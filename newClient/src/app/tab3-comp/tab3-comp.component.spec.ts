import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Tab3CompComponent } from './tab3-comp.component';

describe('Tab3CompComponent', () => {
  let component: Tab3CompComponent;
  let fixture: ComponentFixture<Tab3CompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Tab3CompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Tab3CompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
