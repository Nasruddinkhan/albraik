import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogSubmissionService {
  private dialogSubmitted: BehaviorSubject<boolean> = new BehaviorSubject(true);
  private data: BehaviorSubject<Object> = new BehaviorSubject(undefined);

  constructor() { }

  setDialogSubmitted(value: boolean): void {
    this.dialogSubmitted.next(value);
  }

  setData(value: Object): void {
    this.data.next(value);
  }

  getData(): Observable<Object> {
    return this.data.asObservable();
  }

  getDialogSubmitted(): Observable<boolean> {
    return this.dialogSubmitted.asObservable();
  }
}
