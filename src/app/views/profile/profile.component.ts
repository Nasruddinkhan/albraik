import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { Subscription } from 'rxjs';
import { DepartmentModel } from '../modal/department';
import { JobTitleModel } from '../modal/jobtitle';
import { RoleModel } from '../modal/role';
import { UserModel } from '../modal/user-model';
import { JobService } from '../service/job.service';
import { ToasterMsgService } from '../service/toaster-msg.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userProfile: FormGroup;
  userModel: UserModel;
  loading = false;
  isSubmitted = false;
  locale = 'ar';
  role: string;
  companyID: string;
  susscription: Subscription;
  jobtitle: JobTitleModel[];
  depts: DepartmentModel[];
  roles: RoleModel[];

  constructor(private activeRoute: ActivatedRoute,
    private router: Router,
    private localeService: BsLocaleService,
    private userService: UserService,
    private toastService: ToasterMsgService,
    private job: JobService,
    private datepipe: DatePipe,
    private fb: FormBuilder) {
    this.localeService.use(this.locale);

  }
  get f() { return this.userProfile.controls; }

  ngOnInit(): void {

    this.companyID = sessionStorage.getItem("companyId");
    this.role = sessionStorage.getItem("role");
    if (this.role === 'USER') {
      this.onload();
    }
    this.activeRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('userID')) {
        return;
      }
      const userID = paramMap.get('userID');
      this.getUserProfie(userID);
      this.userProfile = this.fb.group({
        id: [],
        firstName: ['', Validators.required],
        fatherName: ['', Validators.required],
        grandFatherName: ['', Validators.required],
        familyName: ['', Validators.required],
        phoneNumber: ['', Validators.required],
        dateOfBirth: ['', Validators.required],
        placeOfBirth: ['', Validators.required],
        education: [''],
        experience: [''],
        skills: [''],
        nationality: [''],
        email: [''],
        mobileNumber: ['', Validators.required],
        jobId: [''],
        roleId: [''],
        deptId: ['']
      });
      // alert(userID);
      this.userProfile.controls['roleId'].disable();
      this.userProfile.controls['deptId'].disable();
      this.userProfile.controls['jobId'].disable();
      this.userProfile.controls['email'].disable();

    });
  }
  onload() {
    this.susscription = this.job.findAllCompany(this.companyID).subscribe((res: any[]) => {
      this.jobtitle = res[0];
      this.depts = res[1];
      this.roles = res[2];
    });
  }
  onSubmit() {
    this.isSubmitted = true;
    if (this.userProfile.invalid) {
      return;
    }
    // alert(JSON.stringify(this.userProfile.value));
    this.userService.updateUser(JSON.stringify(this.userProfile.value)).subscribe((res: UserModel) => {
      this.toastService.susessMessage('Update user detials successfully');
      this.router.navigate([`/dashboard`]);

      console.log(res);
    }, err => {
      this.toastService.errorMessage(err.error.message);

    });
  }
  getUserProfie(userID: string) {
    this.loading = true;
    this.userService.getUserDetails(userID).subscribe((res: UserModel) => {
      this.userModel = res;
      console.log(this.userModel)
      this.loading = false;
      this.userProfile.setValue({
        email: this.userModel.email,
        id: this.userModel.id,
        firstName: this.userModel.firstName,
        fatherName: this.userModel.fatherName,
        grandFatherName: this.userModel.grandFatherName,
        familyName: this.userModel.familyName,
        phoneNumber: this.userModel.phoneNumber,
        mobileNumber: this.userModel.mobileNumber,
        dateOfBirth: this.datepipe.transform(this.userModel.dateOfBirth, 'yyyy-MM-dd'),
        placeOfBirth: this.userModel.placeOfBirth,
        education: this.userModel.education,
        experience: this.userModel.experience,
        skills: this.userModel.skills,
        nationality: this.userModel.nationality,
        jobId:  this.userModel.jobId,
        roleId: this.userModel.roleId,
        deptId: this.userModel.deptId

      })
    }, err => {
      this.loading = false;
    });
  }
}

