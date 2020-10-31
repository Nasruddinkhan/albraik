import {Component, ElementRef, Renderer2, OnInit} from '@angular/core';
import { navItems } from '../../_nav';
import { ColorEvent } from 'ngx-color';
import { Router } from '@angular/router';

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

  ngOnInit(){
    let role  = sessionStorage.getItem("role");
    console.log(navItems);
    if(role === 'USER'){
    //  delete navItems[1]
    }
    //  delete navItems[2];
    window.addEventListener("resize", () => {
      if (window.matchMedia("(max-width: 992px)").matches) {
        if (!this.mobileResized) {
          let sidebar = document.getElementsByClassName("side-bar")[0];
          let mainContent = document.getElementsByClassName("main")[0];
          let sidebarUL = document.querySelector(".side-bar ul").children;
          try {
            let temp = sidebarUL[0].querySelector("span");
            console.log(temp);
            if (temp) {
              this.sidebarLink = [];
              for (let i = 0; i < sidebarUL.length; i += 2) {
                this.sidebarLink.push(sidebarUL[i].querySelector("span"));
                sidebarUL[i].querySelector("span").remove();
                sidebarUL[i].querySelector("i").style.marginRight = "-5px";
                sidebarUL[i].querySelector("i").style.marginBottom = "15px";
              }
            }
          } catch (e) { console.log("error"); }
          sidebar['style']['width'] = "0px";
          mainContent['style']['margin-right'] = "0px";
          this.mobileResized = true;
          this.sidebarMinimized = true;
          this.desktopResized = false;
          this.mobileSidebarMinimized = true;
        }
      } else {
        this.mobileResized = false;
        if (!this.desktopResized) {
          let sidebar = document.getElementsByClassName("side-bar")[0];
          let mainContent = document.getElementsByClassName("main")[0];
          let sidebarUL = document.querySelector(".side-bar ul").children;
          sidebar['style']['width'] = "15.57%";
          mainContent['style']['margin-right'] = "15.2%";
          if (this.sidebarLink.length !== 0) {
            for (let i = 0; i < sidebarUL.length; i += 2) {
              sidebarUL[i].querySelector("a").appendChild(this.sidebarLink[i/2]);
              sidebarUL[i].querySelector("i").style.marginRight = "0px";
            }
          }
          this.desktopResized = true;
          this.sidebarMinimized = false;
        }
      }
    });
  }
 constructor(private elementRef: ElementRef, private renderer: Renderer2, private router: Router){

 }
  toggleMinimize(e) {
    this.sidebarMinimized = e;
    console.log(e);
  }

  handleChange($event: ColorEvent) {
    console.log($event.color.hex);
     //document.documentElement.style.setProperty('--primary-color', $event.color.hex);
     this.renderer.setStyle(this.elementRef.nativeElement, 'background-color',  $event.color.hex);
  }

  toggleSidebar() {
    if (window.matchMedia("(max-width: 992px)").matches) {
      console.log("matches.");
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
        console.log(this.sidebarLink);
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
    console.log(this.sidebarMinimized);
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
