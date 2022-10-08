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

export interface IItemsLimitChartOptions {
  plugins: {
    legend: {
      title?: {
        display?: boolean;
        text?: string;
        fontSize?: number;
      };
      position?: string;
      align?: string;
    };
  };
}
