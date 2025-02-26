import { LoginComponent } from './Component/login/login.component';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as AOS from 'aos';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LoginComponent,RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit , AfterViewInit {
  ngOnInit(){
    AOS.init({
      duration: 800, 
      easing: 'ease-in-out',
      once: false 
    });
  }
  ngAfterViewInit() {
    this.observeDOMChanges();
  }

  observeDOMChanges() {
    const observer = new MutationObserver(() => {
      AOS.refresh();
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });}
  title = 'app11';
}
