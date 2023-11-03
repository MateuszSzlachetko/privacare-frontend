import {Component, OnInit} from '@angular/core';
import {BreakpointObserver, BreakpointState} from "@angular/cdk/layout";
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [
    trigger(
      'inAnimation',
      [
        transition(
          ':enter',
          [
            style({opacity: 0}),
            animate('0.3s ease-in',
              style({opacity: 1}))
          ]
        ),
      ]
    )
  ]
})
export class NavbarComponent implements OnInit {
  showDropdown: boolean = false;
  isDropdownAvailable: boolean = false;

  constructor(private breakpointObserver: BreakpointObserver) {
  }

  ngOnInit() {
    this.breakpointObserver.observe(["(max-width: 576px)"]).subscribe((result: BreakpointState) => {
      this.isDropdownAvailable = result.matches;

      if (!result.matches)
        this.showDropdown = false;
    });
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }
}
