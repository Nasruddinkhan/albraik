import {Component, ElementRef, Renderer2} from '@angular/core';
import { navItems } from '../../_nav';
import { ColorEvent } from 'ngx-color';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;
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
