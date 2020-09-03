import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToasterMsgService {
  constructor(private toastr: ToastrService) { }
  public susessMessage(message : any){
    this.toastr.success(message, 'نجاح', {
      positionClass: 'toast-bottom-left'
    });
  }
  public errorMessage(message : any){
    this.toastr.error(message, 'نجاح</b>', {
      positionClass: 'toast-bottom-left'
    });
  }
}
