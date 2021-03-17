import { Component } from '@angular/core';

export let multi = [
  {
    name: 'NR1',
    series: [
      {
        name: 'AMBEV',
        value: 7
      },
      {
        name: 'IFOOD',
        value: 1
      }
    ]
  },

  {
    name: 'NR2',
    series: [
      {
        name: 'AMBEV',
        value: 7
      },
      {
        name: 'IFOOD',
        value: 5
      }
    ]
  },

  {
    name: 'NR3',
    series: [
      {
        name: 'AMBEV',
        value: 3
      },
      {
        name: 'IFOOD',
        value: 10
      }
    ]
  },
  {
    name: 'NR4',
    series: [
      {
        name: 'STEFANINI',
        value: 1
      },
      {
        name: 'DEXTRA',
        value: 2
      }
    ]
  }
];



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  multi: any[];
  view: any[] = [800, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Normas Técnicas';
  showYAxisLabel = true;
  yAxisLabel = 'Nota de Conformidade';
  legendTitle = 'Consultorias e Acessorias';

  constructor() {
    Object.assign(this, { multi });
  }

 onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

}
