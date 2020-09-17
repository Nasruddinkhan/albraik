import {Component, ElementRef, Renderer2, OnInit} from '@angular/core';
import { navItems } from '../../_nav';
import { ColorEvent } from 'ngx-color';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {
  public sidebarMinimized = false;
  public navItems = navItems;

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
  }

  handleChange($event: ColorEvent) {
    console.log($event.color.hex);
     //document.documentElement.style.setProperty('--primary-color', $event.color.hex);
     this.renderer.setStyle(this.elementRef.nativeElement, 'background-color',  $event.color.hex);
  }
}
