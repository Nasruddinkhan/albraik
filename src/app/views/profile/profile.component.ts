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
import { SnackbarService } from '../service/snackbar.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: UserModel;
  userProfileForm: FormGroup;
  loading = false;
  isSubmitted = false;
  locale = 'ar';
  role: string;
  companyId: string;
  subscription: Subscription;
  jobTitles: JobTitleModel[];
  depts: DepartmentModel[];
  roles: RoleModel[];

  constructor(private activeRoute: ActivatedRoute,
              private router: Router,
              private localeService: BsLocaleService,
              private userService: UserService,
              private snackService: SnackbarService,
              private jobService: JobService,
              private datePipe: DatePipe,
              private fb: FormBuilder) { 
                this.localeService.use(this.locale);
              }

  ngOnInit(): void {
    this.companyId = sessionStorage.getItem("companyId");
    this.role = sessionStorage.getItem("role");
    if (this.role === 'USER') {
      this.onLoad();
    }
    this.activeRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('userID')) {
        return;
      }
      const userId = paramMap.get('userID');
      this.getUserProfile(userId);
      this.userProfileForm = this.fb.group({
        id: [],
        firstName: ['', Validators.required],
        fatherName: ['', Validators.required],
        grandFatherName: ['', Validators.required],
        familyName: ['', Validators.required], 
        phoneNumber: ['', [Validators.required, Validators.minLength(10)]], 
        dateOfBirth: ['', Validators.required], 
        placeOfBirth: ['', Validators.required], 
        education: [''],
        experience: [''],
        skills: [''],
        nationality: [''],
        email: [''],
        mobileNumber: ['', [Validators.required, Validators.minLength(10)]],
        jobId: [''],
        roleId: [''],
        deptId: ['']
      });
      this.userProfileForm.controls['roleId'].disable();
      this.userProfileForm.controls['deptId'].disable();
      this.userProfileForm.controls['jobId'].disable();
      this.userProfileForm.controls['email'].disable();
    });
  }

  onLoad() {
    this.subscription = this.jobService.findAllCompany(this.companyId).subscribe((res: any[]) => {
      this.jobTitles = res[0];
      this.depts = res[1];
      this.roles = res[2];
    });
  }

  getUserProfile(userId: string) {
    this.loading = true;
    this.userService.getUserDetails(userId).subscribe((res: UserModel) => {
      this.user = res;
      this.loading = false;
      this.userProfileForm.setValue({
        email: this.user.email,
        id: this.user.id,
        firstName: this.user.firstName,
        fatherName: this.user.fatherName,
        grandFatherName: this.user.grandFatherName,
        familyName: this.user.familyName,
        phoneNumber: this.user.phoneNumber,
        mobileNumber: this.user.mobileNumber,
        dateOfBirth: this.datePipe.transform(this.user.dateOfBirth, 'yyyy-MM-dd'),
        placeOfBirth: this.user.placeOfBirth,
        education: this.user.education,
        experience: this.user.experience,
        skills: this.user.skills,
        nationality: this.user.nationality,
        jobId: this.user.jobId,
        roleId: this.user.roleId,
        deptId: this.user.deptId
      });
    }, err => {
      this.loading =false;
    });
  }

  get firstName() {
    return this.userProfileForm.get('firstName');
  }

  get fatherName() {
    return this.userProfileForm.get('fatherName');
  }
  get grandFatherName() {
    return this.userProfileForm.get('grandFatherName');
  }

  get familyName() {
    return this.userProfileForm.get('familyName');
  }

  get dateOfBirth() {
    return this.userProfileForm.get('dateOfBirth');
  }

  get placeOfBirth() {
    return this.userProfileForm.get('placeOfBirth');
  }

  get phoneNumber() {
    return this.userProfileForm.get('phoneNumber');
  }

  get mobileNumber() {
    return this.userProfileForm.get('mobileNumber');
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.userProfileForm.invalid) {
      return;
    }
    this.userService.updateUser(JSON.stringify(this.userProfileForm.value)).subscribe((res: UserModel) => {
      this.snackService.success("User details updated successfully.");
      this.router.navigate(['/dashboard']);
    }, err => {
      this.snackService.failure("Error: "+err.error.message);
    });
  }

}
