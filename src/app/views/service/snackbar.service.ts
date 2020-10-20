import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private _snackbar: MatSnackBar) { }

  public success(message: string) {
    this._snackbar.open(message, '', {
      duration: 4000,
      panelClass: "success"
    });
  }

  public failure(message: string) {
    this._snackbar.open(message, '', {
      duration: 4000,
      panelClass: "failure"
    });
  }
}
