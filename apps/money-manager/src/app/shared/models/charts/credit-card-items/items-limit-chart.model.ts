export interface IItemsLimitChartData {
  labels: string[];
  datasets: [
    {
      data: number[];
      backgroundColor: string[];
      hoverBackgroundColor: string[];
    }
  ];
}
