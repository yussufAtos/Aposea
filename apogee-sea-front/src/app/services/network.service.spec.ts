import { TestBed, inject } from '@angular/core/testing';

import { NetworkService } from './network.service';
import {HttpClientModule} from '@angular/common/http';


describe('NetworkService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],

      providers: [NetworkService]
    });
  });





});
