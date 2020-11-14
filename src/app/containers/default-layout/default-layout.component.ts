import {Component, ElementRef, Renderer2, OnInit, OnDestroy} from '@angular/core';
import { navItems } from '../../_nav';
import { ColorEvent } from 'ngx-color';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { ViewChild } from '@angular/core';
import { PrivilegeList } from './../../privilegeList';

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

  constructor(private elementRef: ElementRef, private renderer: Renderer2, private router: Router) {}

  ngOnInit() {
    let role  = sessionStorage.getItem("role");
    if(role === 'USER'){
    //  delete navItems[1]
    }
    if (sessionStorage.getItem('privilegeList') !== null) {
      let allLinks = ['dashboard', 'company', 'department', 'jobTitle', 'role', 'court', 'user', 'project', 'contact'];
      let authorizedLinks: string[] = [];
      let userPrivileges: string[] = JSON.parse(sessionStorage.getItem('privilegeList'));
      if (userPrivileges.includes(PrivilegeList.ASSIGN_A_TASK_TO_A_USER) || userPrivileges.includes(PrivilegeList.VIEWING_THEIR_OWN_TASKS)) {
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
  }
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  handleChange($event: ColorEvent) {
     //document.documentElement.style.setProperty('--primary-color', $event.color.hex);
     this.renderer.setStyle(this.elementRef.nativeElement, 'background-color',  $event.color.hex);
  }

  toggleSidebar() {
    if (window.matchMedia("(max-width: 992px)").matches) {
      // console.log("matches.");
      let sidebar = document.getElementsByClassName("side-bar")[0];
      let mainContent = document.getElementsByClassName("main")[0];
      let sidebarUL = document.querySelector(".side-bar ul").children;
      if (this.sidebarLink.length === 0) {
        for (let i = 0; i < sidebarUL.length; i += 2) {
          this.sidebarLink.push(sidebarUL[i].querySelector("span"));
          sidebarUL[i].querySelector("span").remove();
          sidebarUL[i].querySelector("i").style.marginRight = "-5px";
          sidebarUL[i].querySelector("i").style.marginBottom = "15px";
        }
      }
      if (this.mobileSidebarMinimized) {
        sidebar['style']['display'] = "block";
        mainContent['style']['margin-right'] = "40px";
        sidebar['style']['width'] = "40px";
        this.mobileSidebarMinimized = false;
        // console.log(this.sidebarLink);
      } else {
        mainContent['style']['margin-right'] = "0px";
        sidebar['style']['width'] = "0px";
        this.mobileSidebarMinimized = true;
      }
      return;
    }
    let sidebar = document.getElementsByClassName("side-bar")[0];
    let mainContent = document.getElementsByClassName("main")[0];
    // To add or delete sider-bar text(beside each sidebar logo) on toggle button
    let sidebarUL = document.querySelector(".side-bar ul").children;
    if (this.sidebarMinimized) {
      mainContent['style']['margin-right'] = "15.57%";
      sidebar['style'].width = "16%";
      for (let i = 0; i < sidebarUL.length; i += 2) {
        sidebarUL[i].querySelector("a").appendChild(this.sidebarLink[i/2]);
        sidebarUL[i].querySelector("i").style.marginRight = "0px";
      }
      this.sidebarMinimized = false;
      this.sidebarLink = [];
    } else {
      sidebar['style'].width = "3.5%";
      mainContent['style']['margin-right'] = "3.5%";
      setTimeout(() => {
        for (let i = 0; i < sidebarUL.length; i += 2) {
          this.sidebarLink.push(sidebarUL[i].querySelector("span"));
          sidebarUL[i].querySelector("span").remove();
          sidebarUL[i].querySelector("i").style.marginRight = "-5px";
        }
      }, 300);
      this.sidebarMinimized = true;
    }
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
