import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  isSubmit = false;
  username: string;

  constructor() { }

  ngOnInit(): void {
  }

  async onSubmit(forgotPasswordForm) {
    console.log(forgotPasswordForm.value);
  }

}
