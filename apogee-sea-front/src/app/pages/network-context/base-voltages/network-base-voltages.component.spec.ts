import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NetworkBaseVoltagesComponent} from './network-base-voltages.component';


describe('NetworkBaseVoltagesComponent', () => {
  let component: NetworkBaseVoltagesComponent;
  let fixture: ComponentFixture<NetworkBaseVoltagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NetworkBaseVoltagesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkBaseVoltagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});



