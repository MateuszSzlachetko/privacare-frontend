import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {
  patientId = '432b984b-3a3e-4078-af5d-c620bd3b9159';
  routeValue: string = 'reserve';

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.router.url
    switch (this.router.url.slice(13, 14)) {
      case 's': // /appointment/(s)lots
        this.routeValue = 'reserve';
        break;
      case 'p': // /appointment/(p)atient...
        this.routeValue = 'my-appointments';
        break;
      default:
        break;
    }
  }

  onNavigationChange(value: string) {
    switch (value) {
      case 'reserve':
        this.router.navigate(['appointment/slots']).then();
        break;
      case 'my-appointments': //todo auth service
        this.router.navigate(['appointment/patient/', this.patientId]).then();
        break;
      default:
        break;
    }
  }
}
