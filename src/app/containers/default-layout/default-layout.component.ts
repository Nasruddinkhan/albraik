import {Component, ElementRef, Renderer2, OnInit, OnDestroy} from '@angular/core';
import { navItems } from '../../_nav';
import { ColorEvent } from 'ngx-color';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { ViewChild } from '@angular/core';
import { PrivilegeList } from './../../enum/privilegeList';
import { MatDialog } from '@angular/material/dialog';
import { ProfilePictureDialogComponent } from './profile-picture-dialog/profile-picture-dialog.component';
import { ProfilePictureService } from '../../views/service/attachment/profile-picture.service';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from '../../views/service/user.service';
import { SnackbarService } from '../../views/service/snackbar.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.css']
})
export class DefaultLayoutComponent implements OnInit {
  public sidebarMinimized = false;
  public mobileSidebarMinimized = true;
  public navItems = navItems;
  public mobileResized = false;
  public desktopResized = false;
  profilePictureUrl;
  isCollapsed = true;
  sidebarLink: Element[] = [];
  profileMinimized = true;

  // mobileQuery: MediaQueryList;
  // fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);

  // private _mobileQueryListener: () => void;

  // constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
  //   private elementRef: ElementRef, private renderer: Renderer2, private router: Router) {
  //   this.mobileQuery = media.matchMedia('(max-width: 600px)');
  //   this._mobileQueryListener = () => changeDetectorRef.detectChanges();
  //   // this.mobileQuery.addListener(this._mobileQueryListener);
  //   this.mobileQuery.addEventListener("change", this._mobileQueryListener);
  // }

  // ngOnDestroy(): void {
  //   // this.mobileQuery.removeListener(this._mobileQueryListener);
  //   this.mobileQuery.removeEventListener("change", this._mobileQueryListener);
  // }

  constructor(private elementRef: ElementRef, 
              private renderer: Renderer2, 
              private router: Router,
              private dialog: MatDialog,
              private snackbarService: SnackbarService,
              private profilePictureService: ProfilePictureService,
              private userService: UserService) {}

  ngOnInit() {
    let role  = sessionStorage.getItem("role");
    if(role === 'USER'){
    //  delete navItems[1]
    }
    if (sessionStorage.getItem('privilegeList') !== null) {
      let allLinks = ['dashboard', 'company', 'department', 'jobTitle', 'role', 'court', 'user', 'project', 'contact'];
      let authorizedLinks: string[] = [];
      let userPrivileges: string[] = JSON.parse(sessionStorage.getItem('privilegeList'));
      if (userPrivileges.includes(PrivilegeList.ASSIGN_A_TASK_TO_A_USER) || userPrivileges.includes(PrivilegeList.VIEWING_THEIR_OWN_TASKS) || userPrivileges.includes(PrivilegeList.RESPOND_TO_GIVEN_TASKS)) {
        authorizedLinks.push("dashboard");
      }
      if (userPrivileges.includes(PrivilegeList.ADD_EDIT_COMPANY_INFORMATION)) {
        authorizedLinks.push("company");
      }
      if (userPrivileges.includes(PrivilegeList.ADD_EDIT_REMOVE_DEPARTMENT)) {
        authorizedLinks.push("department");
      }
      if (userPrivileges.includes(PrivilegeList.ADD_EDIT_REMOVE_JOB_TITLE)) {
        authorizedLinks.push("jobTitle");
      }
      if (userPrivileges.includes(PrivilegeList.ADD_EDIT_REMOVE_ROLES)) {
        authorizedLinks.push("role");
      }
      if (userPrivileges.includes(PrivilegeList.ADD_EDIT_REMOVE_COURT)) {
        authorizedLinks.push("court");
      }
      if (userPrivileges.includes(PrivilegeList.ADD_EDIT_DISABLE_USERS)) {
        authorizedLinks.push("user");
      }
      if (userPrivileges.includes(PrivilegeList.ADD_EDIT_CLOSE_PROJECTS) || userPrivileges.includes(PrivilegeList.VIEWING_ALL_PROJECTS)) {
        authorizedLinks.push("project");
      }
      if (userPrivileges.includes(PrivilegeList.ADD_NEW_CONTACTS) || userPrivileges.includes(PrivilegeList.EDIT_OR_DISABLE_CONTACTS)) {
        authorizedLinks.push("contact");
      }
      allLinks.forEach(link => {
        if (!authorizedLinks.includes(link)) {
          document.getElementById(link).style.display = 'none';
        }
      });
    }
    this.setProfilePicture();
    if (this.profilePictureUrl === 'null')
      this.profilePictureUrl = '..\\..\\..\\assets\\img\\brand\\Logo.png';
  }

  setProfilePicture() {
    this.profilePictureUrl = sessionStorage.getItem('profilePicture');
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  handleChange($event: ColorEvent) {
     //document.documentElement.style.setProperty('--primary-color', $event.color.hex);
     this.renderer.setStyle(this.elementRef.nativeElement, 'background-color',  $event.color.hex);
  }

  uploadProfilePic() {
    let dialogRef = this.dialog.open(ProfilePictureDialogComponent);
    dialogRef.afterClosed().subscribe(imageFile => {
      if (imageFile) {
        this.profilePictureService.getPresignedUrlForProfilePhoto().subscribe(res => {
          let url = res['attachment_url'];
          let s3key = res['s3key'];
          this.uploadProfileToAWSS3(url, s3key, imageFile);
        });
      }
    })
  }

  uploadProfileToAWSS3(url, s3key, imageFile) {
    this.profilePictureService.uploadProfilePhoto(url, imageFile).subscribe(res => {
      if (res.status === 200)
        this.updateS3keyToDB(s3key);
    }, err => {
      this.snackbarService.failure(".Profile photo upload on s3 failed");
    });
  }

  updateS3keyToDB(s3key) {
    this.userService.updateS3ProfilePhotoKey(s3key).subscribe(res => {
      sessionStorage.setItem('profilePicture', res['url']);
      this.snackbarService.success('.Profile picture uploaded successfully');
      this.setProfilePicture();
    }, err => {
      this.snackbarService.failure('.Updating s3 key failed');
    });
  }

  profile() {
    let profileDiv = document.getElementsByClassName("profile")[0];
    if (this.profileMinimized) {
      profileDiv['style']['display'] = "block";
      this.profileMinimized = false;
    } else {
      profileDiv['style']['display'] = "none";
      this.profileMinimized = true;
    }
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['logout']);
  }

}
