import { Pipe, PipeTransform } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

import {
  BaseTableDataPipeToUse,
  IBaseTableDataPipe,
} from '../models/data/base-table-data.model';
import { LocalizedDatePipe } from '../../../pipes/utils/localized-date.pipe';
import { NumberToBooleanPipe } from '../../../pipes/utils/number-to-boolean.pipe';
import { CustomCurrencyPipe } from '../../../pipes/utils/custom-currency.pipe';

@Pipe({
  name: 'baseTablePipe',
})
export class BaseTablePipe implements PipeTransform {
  constructor(
    private readonly currencyPipe: CustomCurrencyPipe,
    private readonly localizedDatePipe: LocalizedDatePipe,
    private readonly translatePipe: TranslatePipe,
    private readonly titleCasePipe: TitleCasePipe,
    private readonly numberToBooleanPipe: NumberToBooleanPipe
  ) {}

  transform(data: string, pipes: IBaseTableDataPipe[]): string {
    return this.mergeAllPipes(data, pipes);
  }

  private mergeAllPipes(data: string, pipes: IBaseTableDataPipe[]): string {
    if (!pipes || pipes.length === 0) {
      return data;
    }

    let modifiedData = data;

    pipes.forEach(({ pipe, pipeParams }) => {
      modifiedData = this.applyPipe(modifiedData, pipe, pipeParams);
    });
    return modifiedData;
  }

  private applyPipe(
    data: string,
    pipe: BaseTableDataPipeToUse,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pipeParams?: any
  ): string {
    switch (pipe) {
      case 'translate':
        return this.translatePipe.transform(data);
      case 'localizedDate': {
        const date = new Date(data).toISOString();
        const dateData = this.localizedDatePipe.transform(date, pipeParams);
        return dateData ? dateData : '';
      }
      case 'customCurrency': {
        const currencyData = this.currencyPipe.transform(data, pipeParams);
        return currencyData ? currencyData : '';
      }
      case 'titlecase':
        return this.titleCasePipe.transform(data);
      case 'numberToBoolean': {
        const parsedData = parseInt(data);
        return this.numberToBooleanPipe.transform(parsedData);
      }
      default:
        return '';
    }
  }
}
