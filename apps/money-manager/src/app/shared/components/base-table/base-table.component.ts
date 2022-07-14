import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { Observable } from 'rxjs';

import { RequiredInput } from '../../decorators/required-input.decorator';
import { IBaseTableData } from './models/data/base-table-data.model';
import { IBaseTableColumn } from './models/header/base-table-column.model';

@Component({
  selector:
    'petar-cv-base-table[value][rows][totalRecords][onLazyLoad][tableHeaders][tableRows]',
  templateUrl: './base-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseTableComponent {
  @ViewChild('dt')
  table?: Table;

  // Required parameters
  @Input()
  @RequiredInput
  value?: Observable<unknown[]>;

  @Input()
  @RequiredInput
  rows!: number;

  @Input()
  @RequiredInput
  totalRecords!: number;

  @Output()
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  onLazyLoad = new EventEmitter<LazyLoadEvent>();

  @Input()
  @RequiredInput
  tableHeaders!: IBaseTableColumn[];

  @Input()
  @RequiredInput
  tableRows!: IBaseTableData[];

  // Optional parameters
  @Input()
  selectionMode = 'single';

  @Input()
  dataKey = 'id';

  @Input()
  rowHover = true;

  @Input()
  showCurrentPageReport = true;

  @Input()
  emptymessage = 'global.noResults';

  @Input()
  rowsPerPageOptions: number[] = [10, 25, 50];

  @Input()
  loading = false;

  @Input()
  responsiveLayout = 'scroll';

  @Input()
  paginator = true;

  @Input()
  lazyLoadOnInit = false;

  @Input()
  lazy = true;

  @Input()
  currentPageReportTemplate = '{first} - {last} | {totalRecords}';

  @Input()
  filterDelay = 0;

  @Input()
  globalSearch = false;

  onLazyLoadEvent($event: LazyLoadEvent) {
    this.onLazyLoad.emit($event);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  applyFilterGlobal(event: any, searchType: string) {
    if (this.table) {
      const searchValue = (event.target as HTMLInputElement).value;
      this.table.filterGlobal(searchValue, searchType);
    }
  }
}
