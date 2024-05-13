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

import { DetallesEstadoCharlaTech } from 'src/app/models/DetallesEstadoCharlaTechRiders';
import { Router } from '@angular/router';
import { ServiceQueryTools } from 'src/app/services/service.querytools';

const colors: Record<string, EventColor> = {
  blue: {
    primary: '#327FB9',
    secondary: 'FAE3E3',
  },
};

@Component({
  selector: 'app-calendario-tech-riders-charlas',
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
  templateUrl: './calendario-tech-riders-charlas.component.html',
  styleUrls: ['./calendario-tech-riders-charlas.component.css'],
})
export class CalendarioTechRidersCharlasComponent implements OnInit {
  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;

  constructor(
    private _serviceQueryTools: ServiceQueryTools,
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
  role!: number | null;

  ngOnInit(): void {
    if (!localStorage.getItem('token')) this._router.navigate(['/login']);

    this.role = parseInt(localStorage.getItem('role') ?? '0');
    if (this.role == 3 || this.role == 4) {
      this._serviceQueryTools
        .estadoCharlasTechRiders()
        .subscribe((response) => {
          let charlas: DetallesEstadoCharlaTech[] = response;
          charlas.forEach((charla: DetallesEstadoCharlaTech) => {
            this.events.push({
              id: charla.idCharla,
              start: new Date(charla.fechaCharla),
              end: new Date(charla.fechaCharla),
              title: charla.descripcionCharla,
              allDay: true,
              actions: [],
              color: { ...colors['blue'] },
            });
          });
          this.refresh.next();
        });
    } else this._router.navigate(['/usuario/perfil']);
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
