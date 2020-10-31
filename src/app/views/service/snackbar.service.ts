import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private _snackbar: MatSnackBar) { }

  public success(message: string) {
    // this._snackbar.open(message, '', {
    //   duration: 4000,
    //   panelClass: ["success"]
    // });
    this._snackbar.openFromComponent(SnackbarComponent, {
      duration: 4000,
      data: { "success": message }
    });
  }

  public failure(message: string) {
    // this._snackbar.open(message, '', {
    //   duration: 4000,
    //   panelClass: ["failure"]
    // });
    this._snackbar.openFromComponent(SnackbarComponent, {
      duration: 4000,
      data: { "failure": message }
    });
  }
}

@Component({
  selector: 'snack-bar-component',
  template: `<div [class]="success ? 'success' : 'failure'">
                  {{ message }}
                </div>`,
  styles: [`
    .success {
      color: white;
    }
    .failure {
      color: hotpink;
    }
    div {
      text-align: center;
    }
  `]
})
export class SnackbarComponent {
  success: boolean;
  message: string;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string) {
    this.message = Object.values(data)[0];
    if (Object.keys(data)[0] === 'success') {
      this.success = true;
    } else {
      this.success = false;
    }
  }
}
