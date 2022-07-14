import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'localizedDate',
})
export class LocalizedDatePipe implements PipeTransform {
  constructor(private translateService: TranslateService) {}

  transform(value: any, pattern = 'mediumDate'): string | null {
    let locale: string;

    if (this.translateService.currentLang === 'hr') {
      locale = 'hr';
    } else {
      locale = 'en-GB';
    }

    const datePipe = new DatePipe(locale);
    return datePipe.transform(value, pattern);
  }
}
