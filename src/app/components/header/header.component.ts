import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IFilter } from '../../models/filter.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input()
  public filters: IFilter[];

  @Output()
  public filterChanged: EventEmitter<IFilter[]> = new EventEmitter<IFilter[]>();

  public ngOnInit(): void {}

  public filterClicked(filter: IFilter): void {
    this.filters = this.filters.map((mapFilter: IFilter) => {
      if (filter.name === mapFilter.name) {
        mapFilter.isEnabled = !filter.isEnabled;
      }
      return mapFilter;
    });
    this.filterChanged.emit(this.filters);
  }
}
