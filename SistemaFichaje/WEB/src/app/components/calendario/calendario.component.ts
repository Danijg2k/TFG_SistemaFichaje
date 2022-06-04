import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  ViewEncapsulation,
  OnInit,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
  DAYS_OF_WEEK,
  CalendarDateFormatter,
} from 'angular-calendar';
import { SesionService } from 'src/app/services/sesion.service';
import { Sesion } from 'src/app/models/sesion.model';
import { Empleado } from 'src/app/models/empleado.model';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { TokenHandlerService } from 'src/app/services/token-handler.service';
import { SesionEmp } from 'src/app/models/sesionEmp.model';
import { DatePipe } from '@angular/common';
import { EventColor } from 'calendar-utils';
import { CustomDateFormatter } from './custom-date-formatter.provider';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
  green: {
    primary: '#34eb49',
    secondary: '#c4edbe',
  },
  purple: {
    primary: '#8e67bf',
    secondary: '#e9d2f7',
  },
};

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-calendario',
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

      /* Ocultar eventos (para Admin) */
      .cal-events .event {
        display: none;
      }
    `,
  ],
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter,
    },
  ],
})
export class CalendarioComponent implements OnInit {
  @ViewChild('modalContent', { static: true }) modalContent:
    | TemplateRef<any>
    | undefined;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent | null;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh = new Subject<void>();

  // Variables utilizadas para cargar datos
  fichajes: SesionEmp[];
  events: CalendarEvent[];
  idEmpActual: number;
  empleado: Empleado | null;
  // Variables para Internationalisation (cambio idioma)
  locale: string = 'es'; // <- Con cambiar esta variable (es/en/fr) cambia el idioma de todo el calendario
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  weekendDays: number[] = [DAYS_OF_WEEK.SATURDAY, DAYS_OF_WEEK.SUNDAY];
  //
  activeDayIsOpen: boolean = true;

  constructor(
    private modal: NgbModal,
    private _sesion: SesionService,
    private _empleado: EmpleadoService,
    private _token: TokenHandlerService,
    public datepipe: DatePipe
  ) {
    this.modalData = {
      action: '',
      event: null,
    };
    this.events = [];
    this.idEmpActual = 0;
    this.fichajes = [];
    this.empleado = null;
  }

  ngOnInit(): void {
    this._token
      .getEmpleado()
      .subscribe((x) => (this.empleado = x) && this.checkAdminUser());
  }

  checkAdminUser() {
    this.empleado?.rol ? this.loadAdminData() : this.loadUserData();
  }

  loadAdminData() {
    if (this.empleado != null) {
      this._sesion
        .getSesionsEmp()
        .subscribe((y) => (this.fichajes = y) && this.loadData());
    }
  }

  loadUserData() {
    if (this.empleado != null) {
      this._sesion
        .getSesionsOfEmp(this.empleado.id)
        .subscribe((y) => (this.fichajes = y) && this.loadData());
    }
  }

  loadData() {
    this.fichajes.forEach((x) => {
      // Procedemos a crear todos los eventos
      const d = new Date(x.fecha);
      const t = `${d.toLocaleTimeString('es-Es')} - ${x.nombre}`;
      const c = this.empleado?.rol ? 'event' : '';
      this.events.push({
        start: d,
        title: t,
        color: this.giveColor(x.idEmpleado),
        actions: this.actions,
        // Con la siguiente línea y los estilos de este archivo ocultamos eventos
        cssClass: c,
      });
      //
    });
    // Para que carguen los eventos correctamente en nuestra página
    this.refresh.next();
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
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

  giveColor(id: number): EventColor {
    const aux = id % 5;
    switch (aux) {
      case 0:
        return colors.red;
        break;
      case 1:
        return colors.blue;
        break;
      case 2:
        return colors.yellow;
        break;
      case 3:
        return colors.green;
        break;
      default:
        return colors.purple;
        break;
    }
  }

  // Popover when clicked
  handleEvent(action: string, event: CalendarEvent): void {
    // this.modalData = { event, action };
    // this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
