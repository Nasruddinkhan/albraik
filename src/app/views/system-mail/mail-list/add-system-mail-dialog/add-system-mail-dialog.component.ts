import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserMaster } from '../../../modal/user-master';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-add-system-mail-dialog',
  templateUrl: './add-system-mail-dialog.component.html',
  styleUrls: ['./add-system-mail-dialog.component.css']
})
export class AddSystemMailDialogComponent implements OnInit {
  loading = false;
  systemMailForm: FormGroup;
  users: UserMaster[];

  constructor(private fb: FormBuilder,
              private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
    this.systemMailForm = this.fb.group({
      to: this.fb.array([]),
      cc: this.fb.array([]),
      subject: ['', Validators.required],
      body: ['', Validators.required],
      attachment: []
    });
  }

  get to() {
    return (this.systemMailForm.get('to') as FormArray);
  }

  get cc() {
    return (this.systemMailForm.get('cc') as FormArray);
  }

  get subject() {
    return this.systemMailForm.get('subject');
  }

  get body() {
    return this.systemMailForm.get('body');
  }

  getUsers() {
    this.loading = true;
    this.userService.findAllUsers().subscribe((res: UserMaster[]) => {
      this.users = res;
      this.users = this.users.filter(user => !user.isFtl);
      this.loading = false;
    });
  }

  changeUserSelectionForTo(event, user: UserMaster) {
    if (event.checked) {
      this.to.controls.push(new FormControl(user.id));
    } else {
      let index = this.to.controls.indexOf(new FormControl(user.id));
      this.to.removeAt(index);
    }
  }

  changeUserSelectionForCC(event, user: UserMaster) {
    if (event.checked) {
      this.cc.controls.push(new FormControl(user.id));
    } else {
      let index = this.to.controls.indexOf(new FormControl(user.id));
      this.cc.removeAt(index);
    }
  }

}
