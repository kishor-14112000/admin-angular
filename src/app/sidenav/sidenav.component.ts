import { Component, ElementRef, Renderer2 } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  sidebarBtn!: HTMLElement;
  buttonText: string = '';
  router: any;

  constructor(private el: ElementRef, private renderer : Renderer2, router : Router) {}
}
