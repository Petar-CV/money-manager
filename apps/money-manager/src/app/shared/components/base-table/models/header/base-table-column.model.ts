export interface IBaseTableColumn {
  text: string;
  translate: boolean;
  width?: string;
  suffix?: string;
  prefix?: string;
}

export class BaseTableColumn implements IBaseTableColumn {
  constructor(
    public text: string,
    public translate: boolean,
    public width?: string,
    public suffix?: string,
    public prefix?: string,
  ) {}
}
