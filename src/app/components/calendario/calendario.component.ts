import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit,
} from '@angular/core';
import { isSameDay, isSameMonth } from 'date-fns';
import { Subject } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarView,
  DAYS_OF_WEEK,
} from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import { Charla } from 'src/app/models/Charla';
import { Router } from '@angular/router';
import { ServiceCharlas } from 'src/app/services/service.charlas';

const colors: Record<string, EventColor> = {
  blue: {
    primary: '#327FB9',
    secondary: 'FAE3E3',
  },
};

@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      h3 {
        margin: 0 0 10px;
      }

      pre {
        background-color: #f5f5f5;
        padding: 15px;
      }
    `,
  ],
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css'],
})
export class CalendarioComponent implements OnInit {
  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;

  constructor(
    private _serviceCharlas: ServiceCharlas,
    private _router: Router
  ) {}

  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  modalData!: {
    action: string;
    event: CalendarEvent;
  };
  refresh = new Subject<void>();
  events: CalendarEvent[] = [];
  activeDayIsOpen: boolean = true;
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

  ngOnInit(): void {
    this._serviceCharlas.getCharlas().subscribe((response) => {
      let charlas: Charla[] = response;
      charlas.forEach((charla: Charla) => {
        if (charla.idEstadoCharla != 1) {
          this.events.push({
            id: charla.idCharla,
            start: new Date(charla.fechaCharla),
            end: new Date(charla.fechaCharla),
            title: charla.descripcion,
            allDay: true,
            actions: [],
            color: { ...colors['red'] },
          });
        }
      });
      this.refresh.next();
    });
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      )
        this.activeDayIsOpen = false;
      else this.activeDayIsOpen = true;
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this._router.navigate(['/charlas', event.id]);
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
