import { CalendarDateFormatter, DateFormatterParams } from 'angular-calendar';
import { getISOWeek } from 'date-fns';
import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable()
export class CustomDateFormatter extends CalendarDateFormatter {
  public override weekViewTitle({ date, locale }: DateFormatterParams): string {
    if (locale != undefined) {
      const year: string | null = new DatePipe(locale).transform(
        date,
        'y',
        locale
      );
      const weekNumber: number = getISOWeek(date);
      const nom = (locale == "es" ? "Semana" : locale == "en" ? "Week" : "Semaine"); 
      const nom2 = (locale == "es" ? "de" : locale == "en" ? "of" : "sur"); 
      return `${nom} ${weekNumber} ${nom2} ${year}`;
    }
    // Necesario para cumplir return string
    return '';
  }
}
