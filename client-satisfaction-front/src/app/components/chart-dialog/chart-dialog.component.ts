import { Chart } from 'chart.js/auto';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-chart-dialog',
  templateUrl: './chart-dialog.component.html',
  styleUrls: ['./chart-dialog.component.css'],
})
export class ChartDialogComponent implements OnInit {
  public arr: any = [];
  public max: number = 0;
  public values: any = [];
  public labels: any = [];
  public chart: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.arr = this.data.list.sort((a: any, b: any) =>
      a.count > b.count ? -1 : 1
    );
    this.arr.slice(0, 7).forEach((element: any) => {
      this.values.push(element.count);
      this.labels.push(element.libelle);
      if (element.count > this.max) this.max = element.count;
    });
  }

  ngOnInit() {
    this.generateChart();
  }

  generateChart(type: any = 'bar', opt: boolean = false) {
    if (opt) this.chart.destroy();
    this.chart = new Chart('chart', {
      type: type,
      data: {
        labels: this.labels,
        datasets: [
          {
            label: '# ' + this.data.title,
            data: [...this.values],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }
}
