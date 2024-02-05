import {Component, ElementRef, inject, OnInit, Renderer2, ViewChild} from '@angular/core';
import {BreakpointObserver, BreakpointState} from "@angular/cdk/layout";
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Auth, signOut, user} from "@angular/fire/auth";
import {Router} from "@angular/router";
import {isAdmin} from "../../core/guards/admin.guard";
import {isLoggedIn} from "../../core/guards/auth.guard";

const InOutAnimation = trigger('InOutAnimation', [
  state(
    'in',
    style({
      opacity: 1,
      height: '*',
    })
  ),
  transition('void => *', [style({opacity: 0, height: 0}), animate('0.5s ease-out')]),
  transition('* => void', [animate('0.5s ease-in'), style({opacity: 0, height: 0})]),
]);

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [InOutAnimation]
})
export class NavbarComponent implements OnInit {
  showDropdown: boolean = false;
  isDropdownAvailable: boolean = false;
  isAnimating: boolean = false;
  auth = inject(Auth);
  user$ = user(this.auth);
  showLogin: boolean = false;
  showAdminLinks: boolean = false;
  isAdmin$ = isAdmin();
  isLoggedIn$ = isLoggedIn();

  @ViewChild('news') newsLink!: ElementRef;
  @ViewChild('task') tasksLink!: ElementRef;
  @ViewChild('note') notesLink!: ElementRef;
  @ViewChild('appointment') appointmentsLink!: ElementRef;
  @ViewChild('user') userLink!: ElementRef;
  @ViewChild('login') loginLink!: ElementRef;

  constructor(private breakpointObserver: BreakpointObserver, private renderer: Renderer2, private router: Router) {
  }

  ngOnInit() {
    this.breakpointObserver.observe(["(max-width: 576px)"]).subscribe((result: BreakpointState) => {
      this.isDropdownAvailable = result.matches;

      if (!result.matches)
        this.showDropdown = false;
    });

    this.isLoggedIn$.subscribe(value => {
      this.showLogin = !value;
    })

    this.isAdmin$.subscribe(value => {
      this.showAdminLinks = value;
    })
  }

  toggleDropdown() {
    if (this.isAnimating)
      return;
    if (this.showDropdown) {
      this.preventRoutingOnOutAnimation();
    }

    this.showDropdown = !this.showDropdown;
  }

  onAnimationStart($event: any) {
    this.isAnimating = true;
  }

  onAnimationDone($event: any) {
    this.isAnimating = false;
  }


  // During the 'out' animation the <a> elements are acting
  // as normal links which reloads the whole website and redirects,
  // even though "[routerLink]="isAnimating ? null : '...'"" should
  // disable them. It might occur because of some 'detaching' of
  // the dropdown div after *ngIf=false, so it might be out of the angular
  // control. A workaround is to disallow pointer events on hiding
  // the dropdown menu
  private preventRoutingOnOutAnimation() {
    this.renderer.setStyle(this.newsLink.nativeElement, 'pointer-events', 'none');
    if (this.tasksLink)
      this.renderer.setStyle(this.tasksLink.nativeElement, 'pointer-events', 'none');
    if (this.notesLink)
      this.renderer.setStyle(this.notesLink.nativeElement, 'pointer-events', 'none');
    this.renderer.setStyle(this.appointmentsLink.nativeElement, 'pointer-events', 'none');
    if (!this.showLogin)
      this.renderer.setStyle(this.userLink.nativeElement, 'pointer-events', 'none');
    this.renderer.setStyle(this.loginLink.nativeElement, 'pointer-events', 'none');
  }

  onLogout() {
    signOut(this.auth).then(
      () => this.router.navigateByUrl('/'));
  }

  onLogoutMobile() {
    this.toggleDropdown();
    this.onLogout();
  }
}
