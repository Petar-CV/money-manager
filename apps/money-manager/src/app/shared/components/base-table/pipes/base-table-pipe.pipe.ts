import { Pipe, PipeTransform } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

import { CreditCardItem } from '@petar-cv/money-manager-models';

import {
  BaseTableDataPipeToUse,
  IBaseTableDataPipe,
} from '../models/data/base-table-data.model';
import { LocalizedDatePipe } from '../../../pipes/utils/localized-date.pipe';
import { NumberToBooleanPipe } from '../../../pipes/utils/number-to-boolean.pipe';
import { CustomCurrencyPipe } from '../../../pipes/utils/custom-currency.pipe';
import { AmountLeftPipe } from '../../../pipes/utils/credit-card-items/amount-left.pipe';
import { InstalmentsLeftPipe } from '../../../pipes/utils/credit-card-items/instalments-left.pipe';
import { InstalmentAmountPipe } from '../../../pipes/utils/credit-card-items/instalment-amount.pipe';

@Pipe({
  name: 'baseTablePipe',
})
export class BaseTablePipe implements PipeTransform {
  constructor(
    private readonly currencyPipe: CustomCurrencyPipe,
    private readonly localizedDatePipe: LocalizedDatePipe,
    private readonly translatePipe: TranslatePipe,
    private readonly titleCasePipe: TitleCasePipe,
    private readonly numberToBooleanPipe: NumberToBooleanPipe,
    private readonly amountLeftPipe: AmountLeftPipe,
    private readonly instalmentsLeftPipe: InstalmentsLeftPipe,
    private readonly instalmentAmountPipe: InstalmentAmountPipe
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
    data: unknown,
    pipe: BaseTableDataPipeToUse,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pipeParams?: any
  ): string {
    switch (pipe) {
      case 'translate': {
        return typeof data === 'string'
          ? this.translatePipe.transform(data)
          : '';
      }
      case 'localizedDate': {
        return typeof data === 'string'
          ? this.localizedDatePipe.transform(
              new Date(data).toISOString(),
              pipeParams
            ) ?? ''
          : '';
      }
      case 'customCurrency': {
        return typeof data === 'number' || typeof data === 'string'
          ? this.currencyPipe.transform(data, pipeParams) ?? ''
          : '';
      }
      case 'titlecase': {
        return typeof data === 'string'
          ? this.titleCasePipe.transform(data)
          : '';
      }
      case 'numberToBoolean': {
        return typeof data === 'string'
          ? this.numberToBooleanPipe.transform(parseInt(data)) ?? ''
          : '';
      }
      case 'amountLeft': {
        return (
          this.amountLeftPipe.transform(data as CreditCardItem).toString() ?? ''
        );
      }
      case 'instalmentsLeft': {
        return (
          this.instalmentsLeftPipe
            .transform(data as CreditCardItem)
            .toString() ?? ''
        );
      }
      case 'instalmentAmount': {
        return (
          this.instalmentAmountPipe
            .transform(data as CreditCardItem)
            .toString() ?? ''
        );
      }
      default:
        return '';
    }
  }
}
