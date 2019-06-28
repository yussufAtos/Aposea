import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ContingenciesComponent} from './contingencies.component';

describe('ContingenciesComponent', () => {
  let component: ContingenciesComponent;
  let fixture: ComponentFixture<ContingenciesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContingenciesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContingenciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
