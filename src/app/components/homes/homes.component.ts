import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../../services/data.service';
import { DialogService } from '../../services/dialog.service';
import { BookComponent } from '../book/book.component';
import { Observable } from 'rxjs';
import { IHome } from '../../models/home.interface';

@Component({
  selector: 'app-homes',
  templateUrl: './homes.component.html',
})
export class HomesComponent {
  @Input()
  public homes$: Observable<IHome[]>;

  constructor(private dialogService: DialogService) {}

  public openDialog(home): void {
    this.dialogService.open(BookComponent, {
      width: '500px',
      data: { home },
    });
  }
}
