import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterMsgService } from '../../../service/toaster-msg.service';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-user-form-button',
  templateUrl: './user-form-button.component.html',
  styleUrls: ['./user-form-button.component.css']
})
export class UserFormButtonComponent implements OnInit {
  @Input()
  userList=[];
  @Output() onLoadEvent = new EventEmitter<void>();
  constructor(private router: Router,
    private toasterService: ToasterMsgService,
    private userService: UserService) { }

  ngOnInit(): void {
  }
  addUser() {
    console.log('add Form');
    this.router.navigate([`/master/adduser`]);
  }
  editUser(){
    this.router.navigate([`/master/edituser/${this.userList[0]}`]);
  }
  deleteUser(){
  this.userService.deleteUser(this.userList[0]).subscribe((res:any)=>{
    this.toasterService.susessMessage('delete user successfully');
   this.onLoadEvent.emit();
  },err=>{
    this.toasterService.errorMessage(err.error.message);
  });
  }
}
