import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { IFilter } from '../models/filter.interface';
import { map, shareReplay } from 'rxjs/operators';
import { IHome } from '../models/home.interface';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private httpClient: HttpClient) {}

  public getHomes$(): Observable<IHome[]> {
    return this.httpClient.get<IHome[]>('assets/homes.json');
  }

  public filteredHomesMap(homes: IHome[], filters: IFilter[]): IHome[] {
    return filters.reduce((accumulator: IHome[], filter: IFilter) => {
      if (filter.isEnabled) {
        const filteredHomes = homes.filter(
          (home: IHome) =>
            home[filter.name] &&
            !accumulator.find((accumHome) => home.id === accumHome.id)
        );
        accumulator.push(...filteredHomes);
      }
      return accumulator;
    }, []);
  }

  public bookHome$(): Observable<any> {
    return this.httpClient.post(
      'http://www.mocky.io/v2/5d674012330000f9ae44a00e',
      {}
    );
  }
}
