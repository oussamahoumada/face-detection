import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  constructor(private elementRef: ElementRef) {}
  ngOnInit() {}

  ngAfterViewInit() {
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = 'assets/dist/js/main.min.js';
    this.elementRef.nativeElement.appendChild(s);
  }
}
