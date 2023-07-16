import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-pie-chart-primeng',
  templateUrl: './pie-chart-primeng.component.html'
})
export class PieChartPrimengComponent implements OnInit {
  data: any;
  options: any;
  plugins:any[]=[];

  @Input() varH: string = ''; //opcional, para controlar tamanho do grafico
  @Input() varW: string = '';

  @Input() chartLabels: any[] = [];
  @Input() chartData: any = [];
  @Input() title: string = '';
  @Input() legend: boolean = false;
  @Input() backgroundColor: any[] = [
    'rgb(27, 118, 195)',
    'rgb(216, 94, 94)',
    'rgba(221, 165, 76, 0.4)',
    'rgba(57, 199, 127, 0.4)',
    'rgba(65, 12, 185, 0.4)',
    'rgba(238, 131, 20, 0.6)',
    'rgba(202, 234, 134, 0.4)',
    'rgba(20, 137, 237, 0.4)',
    'rgba(216, 166, 71, 0.4)',
    'rgba(111, 85, 96, 0.4)',

    'rgba(50, 150, 243, 0.4)',
    'rgba(255, 0, 90, 0.4)',
    'rgba(221, 165, 120, 0.4)',
    'rgba(57, 40, 127, 0.4)',
    'rgba(65, 12, 185, 0.4)',
    'rgba(238, 131, 50, 0.4)',
    'rgba(270, 234, 134, 0.4)',
    'rgba(20, 150, 237, 0.4)',
    'rgba(216, 166, 90, 0.4)',
    'rgba(200, 100, 96, 0.4)',
  ];
  @Input() hoverBackgroundColor: any[] = [
    'rgb(39, 137, 220)',
    'rgb(234, 108, 108)',
    'rgba(221, 165, 76, 0.6)',
    'rgba(57, 199, 127, 0.6)',
    'rgba(65, 12, 185, 0.6)',
    'rgba(238, 131, 20, 0.6)',
    'rgba(202, 234, 134, 0.6)',
    'rgba(20, 137, 237, 0.6)',
    'rgba(216, 166, 71, 0.6)',
    'rgba(111, 85, 96, 0.6)',

    'rgba(50, 150, 243, 0.6)',
    'rgba(255, 0, 90, 0.6)',
    'rgba(221, 165, 120, 0.6)',
    'rgba(57, 40, 127, 0.6)',
    'rgba(65, 12, 185, 0.6)',
    'rgba(238, 131, 50, 0.6)',
    'rgba(270, 234, 134, 0.6)',
    'rgba(20, 150, 237, 0.6)',
    'rgba(216, 166, 90, 0.6)',
    'rgba(200, 100, 96, 0.6)',
  ];

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['chartData']) {
      this.action();
    }
  }

  ngOnInit(): void {
    this.action();
  }

  private action() {
    
    this.chartData;

    this.data = {
      labels: this.chartLabels,

      datasets: [
        {
          data: this.chartData,
          backgroundColor: this.backgroundColor,
          hoverBackgroundColor: this.hoverBackgroundColor,
        },
      ],
      datalabels: {
        align: 'end',
        anchor: 'start',
      },
    };

    this.options = {
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: this.title,
          fontSize: 14,
        },
        tooltips: {
          callbacks: {
            label: function (tooltipItem: any, data: any) {
              return (
                data.labels[tooltipItem.index] +
                ': ' +
                new Intl.NumberFormat('pt-BR').format(
                  parseFloat(
                    data.datasets[tooltipItem.datasetIndex].data[
                    tooltipItem.index
                    ]
                  )
                )
              );
            },
          },
        },
        datalabels: {
          color: '#fff',
          textStrokeWidth: 2,
          textStrokeColor: '#4c4c4c',
          formatter: (value:any) => {
            return (parseInt(value)).toLocaleString('pt-BR') + ' GB'
          }
        }
      }
    };

    this.plugins = [ChartDataLabels];
  }
}
