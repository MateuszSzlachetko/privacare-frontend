import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {SlotService} from "../../../../core/services/slot.service";
import {SlotInterface} from "../../../../core/interfaces/slot.interface";
import {DatePipe} from "@angular/common";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {BreakpointObserver, BreakpointState} from "@angular/cdk/layout";
import {Router} from "@angular/router";

@Component({
  selector: 'app-slots',
  templateUrl: './slots.component.html',
  styleUrls: ['./slots.component.scss'],
  animations: [
    trigger('slideAnimations', [
      state('init', style({
        opacity: 1,
      })),
      state('toLeft', style({
        opacity: 1,
      })),
      state('toRight', style({
        opacity: 1,
      })),
      transition('init => toRight', animate('0.8s ease-in-out', style({
        opacity: 0, transform: 'translateX(100%)'
      }))),
      transition('init => toLeft', animate('0.8s ease-in-out', style({
        opacity: 0, transform: 'translateX(-100%)'
      }))),
    ])

  ]
})
export class SlotsComponent implements OnInit {
  slotsMap: Map<string, SlotInterface[]> = new Map();
  slots: SlotInterface[] = [];
  dateKeys: String[] = [];
  daysInRequest: number = 7;
  currentDateState: Date = new Date();
  animationState = 'init'
  protected readonly Date = Date;
  @ViewChild('gridContainer') gridContainer!: ElementRef;


  constructor(private slotService: SlotService,
              private breakpointObserver: BreakpointObserver,
              private renderer: Renderer2,
              private router: Router) {
  }

  ngOnInit() {
    this.breakpointObserver.observe(["(max-width: 425px)", "(max-width: 615px)", "(max-width: 850px)",]).subscribe((state: BreakpointState) => {
      if (state.breakpoints['(max-width: 850px)'])
        this.daysInRequest = 5;
      if (state.breakpoints['(max-width: 615px)'])
        this.daysInRequest = 3;
      if (state.breakpoints['(max-width: 425px)'])
        this.daysInRequest = 2;
      if (!state.matches)
        this.daysInRequest = 7;

      this.initSlots();
      this.initDateKeys();
    });
  }

  initDateKeys() {
    this.dateKeys = [];
    let newDate, dateKey;
    for (let i = 0; i < this.daysInRequest; i++) {
      newDate = new Date(this.currentDateState.getTime());
      newDate.setDate(newDate.getDate() + i);
      dateKey = this.transformDate(newDate);
      this.dateKeys.push(dateKey)
    }
  }

  initSlots() {
    const startDate = new Date(this.currentDateState.getTime());
    const endDate = new Date(this.currentDateState.getTime());
    endDate.setDate(endDate.getDate() + this.daysInRequest - 1);
    const start = this.transformDate(startDate);
    const end = this.transformDate(endDate);

    this.slotService.getSlots(start, end).subscribe(data => {
      this.slotsMap = new Map();
      data.forEach(slot => {
        const key = this.transformDate(slot.startsAt);
        if (!this.slotsMap.has(key)) {
          this.slotsMap.set(key, []);
        }
        this.slotsMap.get(key)?.push(slot);
      })
    })
  }

  getMapSlots(key: string) {
    return this.slotsMap.get(key);
  }

  transformDate(date: Date) {
    const datePipe: DatePipe = new DatePipe('en-US');
    return datePipe.transform(date, "yyyy-MM-dd") || '';
  }

  loadNextPage() {
    this.currentDateState.setDate(this.currentDateState.getDate() + this.daysInRequest);
    this.animationState = 'toLeft';
    this.initSlots();
    this.initDateKeys();
  }

  loadPreviousPage() {
    this.currentDateState.setDate(this.currentDateState.getDate() - this.daysInRequest);
    this.animationState = 'toRight';
    this.initSlots();
    this.initDateKeys();
  }

  onAnimationStart($event: any) {
    this.renderer.setStyle(this.gridContainer.nativeElement, 'overflow-x', 'hidden');

  }

  onAnimationDone($event: any) {
    this.animationState = 'init';
    this.renderer.setStyle(this.gridContainer.nativeElement, 'overflow-x', 'auto');
  }

  reserve(slot: SlotInterface) {
    this.router.navigate(['appointment/slots/reserve'], {
      queryParams: {
        id: slot.id,
        startsAt: slot.startsAt
      }
    }).then(r => {
    });
  }
}
