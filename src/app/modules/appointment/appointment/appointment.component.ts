import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs";
import {BreakpointObserver} from "@angular/cdk/layout";
import {isAdmin} from "../../../core/guards/admin.guard";
import {UserService} from "../../../core/services/user.service";

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {
  patientId = '';
  doctorId = '9dbae116-3954-4a2c-9308-31fb971dc6fc';
  routeValue: string = 'reserve';
  verticalNavigation: boolean = false;
  isAdmin$ = isAdmin();

  constructor(private router: Router, private breakpointObserver: BreakpointObserver, private userService: UserService) {
  }

  ngOnInit() {
    this.updateSelectedNavigation();

    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe(e => {
      this.updateSelectedNavigation()
    });

    this.breakpointObserver.observe(["(max-width: 520px)"]).subscribe(state => {
      this.verticalNavigation = state.matches;
    })

    this.userService.getCurrentUserId().subscribe(id => {
      this.patientId = id;
    })
  }

  onNavigationChange(value: string) {
    switch (value) {
      case 'reserve':
        this.router.navigate(['appointment/slots']).then();
        break;
      case 'my-appointments':
        if (this.patientId === '') {
          this.router.navigate(['']).then(); //redirect to profile page to create user data
          break;
        }
        this.router.navigate(['appointment/patient/', this.patientId]).then();
        break;
      case 'add-slots':
        this.router.navigate(['appointment/slots/add']).then();
        break;
      case 'doctor-appointments': //todo auth service
        this.router.navigate(['appointment/doctor/', this.doctorId]).then();
        break;
      default:
        break;
    }
  }

  updateSelectedNavigation() {
    if (this.router.url === '/appointment/slots')
      this.routeValue = 'reserve';
    if (this.router.url.slice(0, 20) === '/appointment/patient')
      this.routeValue = 'my-appointments';
    if (this.router.url === '/appointment/slots/add')
      this.routeValue = 'add-slots';
    if (this.router.url.slice(0, 19) === '/appointment/doctor')
      this.routeValue = 'doctor-appointments';
  }
}
