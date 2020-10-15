import {Component, ElementRef, Renderer2, OnInit} from '@angular/core';
import { navItems } from '../../_nav';
import { ColorEvent } from 'ngx-color';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.css']
})
export class DefaultLayoutComponent implements OnInit {
  public sidebarMinimized = false;
  public navItems = navItems;
  isCollapsed = true;
  sidebarLink: Element[] = [];
  ngOnInit(){
    let role  = sessionStorage.getItem("role");
    console.log(navItems);
    if(role === 'USER'){
    //  delete navItems[1]
    }
    //  delete navItems[2];

  }
 constructor(private elementRef: ElementRef, private renderer: Renderer2){

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

}
