import { Component, OnInit } from '@angular/core';
import { IFilter } from './models/filter.interface';
import { Observable } from 'rxjs';
import { DataService } from './services/data.service';
import { IHome } from './models/home.interface';
import { shareReplay, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  public title = 'unit-testing';

  public filters: IFilter[] = [
    { name: 'balcony', isEnabled: true },
    { name: 'parking', isEnabled: false },
  ];

  public homes$: Observable<IHome[]>;
  public filteredHomes$: Observable<IHome[]>;

  constructor(private dataService: DataService) {}

  public ngOnInit(): void {
    this.homes$ = this.dataService.getHomes$().pipe(shareReplay());
    this.setFilteredHomes(this.filters);
  }

  public onFilterChanged(filters: IFilter[]): void {
    this.setFilteredHomes(filters);
  }

  private setFilteredHomes(filters: IFilter[]): void {
    this.filteredHomes$ = this.homes$.pipe(
      map((homes: IHome[]) => this.dataService.filteredHomesMap(homes, filters))
    );
  }
}
