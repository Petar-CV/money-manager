export interface IBaseTableData {
  field?: string;
  width?: string;
  suffix?: string;
  prefix?: string;
  pipes?: IBaseTableDataPipe[];
  nestedIn?: string;
  action?: IBaseTableAction;
}

export class BaseTableData implements IBaseTableData {
  constructor(
    public field?: string,
    public width?: string,
    public suffix?: string,
    public prefix?: string,
    public pipes?: IBaseTableDataPipe[],
    public nestedIn?: string,
    public action?: IBaseTableAction
  ) {}
}

export interface IBaseTableDataPipe {
  pipe: BaseTableDataPipeToUse;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pipeParams?: any;
}

export interface IBaseTableAction {
  icon: string;
  route: string;
  type: BaseTableActionType;
  tooltip?: string;
}

export type BaseTableDataPipeToUse =
  | 'translate'
  | 'localizedDate'
  | 'currency'
  | 'titlecase'
  | 'numberToBoolean';

export type BaseTableActionType = 'navigate';
