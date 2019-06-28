import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ListNetworkContextComponent} from './list-network-context.component';

describe('ListNetworkContextComponent', () => {
  let component: ListNetworkContextComponent;
  let fixture: ComponentFixture<ListNetworkContextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListNetworkContextComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListNetworkContextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
