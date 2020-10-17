import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogSubmissionService {
  private dialogSubmitted: BehaviorSubject<boolean> = new BehaviorSubject(true);
  private data: BehaviorSubject<string> = new BehaviorSubject('');

  constructor() { }

  setDialogSubmitted(value: boolean): void {
    this.dialogSubmitted.next(value);
  }

  setData(value: string): void {
    this.data.next(value);
  }

  getData(): Observable<string> {
    return this.data.asObservable();
  }

  getDialogSubmitted(): Observable<boolean> {
    return this.dialogSubmitted.asObservable();
  }
}
