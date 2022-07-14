import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'numberToBoolean',
})
export class NumberToBooleanPipe implements PipeTransform {
  constructor(private readonly translateService: TranslateService) {}

  transform(data: number | undefined): string {
    if (data === 1) {
      return this.translateService.instant('global.confirmDialog.acceptLabel');
    }

    return this.translateService.instant('global.confirmDialog.rejectLabel');
  }
}
