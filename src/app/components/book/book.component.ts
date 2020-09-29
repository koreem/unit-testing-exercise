import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { DataService } from '../../services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
})
export class BookComponent {
  public checkIn: string;
  public checkOut: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dataService: DataService,
    public dialogRef: MatDialogRef<BookComponent>,
    private snackBar: MatSnackBar
  ) {}

  public calculateTotal(checkIn: string, checkOut: string): string {
    const checkInDate = moment(checkIn, 'MM-DD-YY');
    const checkOutDate = moment(checkOut, 'MM-DD-YY');
    const nights = checkOutDate.diff(checkInDate, 'days');

    const total = nights * this.data.home.price;

    if (total > 0 && total < 900000) {
      return '€' + total;
    } else {
      return '--';
    }
  }

  public bookHome(): void {
    this.dataService
      .bookHome$()
      .pipe(take(1))
      .subscribe(() => {
        this.dialogRef.close();
        this.snackBar.open('Home booked!', null, {
          duration: 2000,
        });
      });
  }
}
