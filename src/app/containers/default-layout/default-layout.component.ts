import {Component, ElementRef, Renderer2, OnInit} from '@angular/core';
import { navItems } from '../../_nav';
import { ColorEvent } from 'ngx-color';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.css']
})
export class DefaultLayoutComponent implements OnInit {
  public sidebarMinimized = false;
  public navItems = navItems;
  isCollapsed = true;
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
    if (this.sidebarMinimized) {
      mainContent['style']['margin-right'] = "15.57%";
      sidebar['style'].width = "16%";
      this.sidebarMinimized = false;
    } else {
      sidebar['style'].width = "3.5%";
      this.sidebarMinimized = true;
      mainContent['style']['margin-right'] = "3.5%";

    }
  }

}
