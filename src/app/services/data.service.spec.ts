import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { IHome } from '../models/home.interface';
import { IFilter } from '../models/filter.interface';

describe('DataService', () => {
  let dataService: DataService;
  let httpClient: HttpClient;

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    })
  );

  beforeEach(() => {
    dataService = TestBed.get(DataService);
    httpClient = TestBed.get(HttpClient);
  });

  it('should call API endpoind and return result', fakeAsync(() => {
    const spy = jasmine.createSpy('spy');

    const homes = require('../../assets/homes.json');

    // TODO:

    tick();

    expect(httpClient.get).toHaveBeenCalledWith('assets/homes.json');
    expect(spy).toHaveBeenCalledWith(homes);
  }));

  it('should filter the homes', () => {
    // TODO:
    expect(false).toBe(true);
  });
});
