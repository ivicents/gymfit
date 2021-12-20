import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit {
  accesosGimnasioDatos: any;
  genteSemanaDatos: any;
  tiempoEntreneSemanaDatos: any;
  rutinasCompletadasDatos: any;
  constructor() {}

  ngOnInit(): void {
    this.accesosGimnasioDatos = {
      color: ['#3398DB'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          data: [
            'Ene',
            'Feb',
            'Mar',
            'Abr',
            'May',
            'Jun',
            'Jul',
            'Ago',
            'Set',
            'Oct',
            'Nov',
            'Dic',
          ],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          name: 'Accesos',
          type: 'bar',
          barWidth: '60%',
          data: [10, 12, 20, 13, 10, 30, 22, 17, 25, 6, 14, 3],
        },
      ],
    };

    this.genteSemanaDatos = {
      xAxis: {
        type: 'category',
        data: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [45, 56, 50, 64, 35, 59, 78],
          type: 'line',
        },
      ],
    };

    this.tiempoEntreneSemanaDatos = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      xAxis: {
        type: 'category',
        data: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Minutos',
          data: [45, 56, 50, 64, 35, 59, 78],
          type: 'bar',
        },
      ],
    };

    this.rutinasCompletadasDatos = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      legend: {
        x: 'center',
        y: 'bottom',
        data: ['completadas', 'sin completar', 'pendientes'],
      },
      series: [
        {
          name: 'area',
          type: 'pie',
          radius: [30, 110],
          roseType: 'area',
          data: [
            { value: 10, name: 'completadas' },
            { value: 5, name: 'sin completar' },
            { value: 15, name: 'pendientes' },
          ],
        },
      ],
    };
  }
}
