import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Tab2CompComponent } from './tab2-comp.component';

describe('Tab2CompComponent', () => {
  let component: Tab2CompComponent;
  let fixture: ComponentFixture<Tab2CompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Tab2CompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Tab2CompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
