import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { StatisticsService } from '../../services/statistics.service';

Chart.register(...registerables);

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html'
})
export class StatisticsComponent implements OnInit, AfterViewInit {

  @ViewChild('transactionChart') chartRef!: ElementRef<HTMLCanvasElement>;
  chart!: Chart;
  transactions: any[] = [];

  viewReady = false;
  dataReady = false;

  constructor(private statisticsService: StatisticsService) {}

  ngOnInit() {
    this.statisticsService.getStatistics().subscribe(data => {
      console.log("DATA LOADED:", data);
      this.transactions = data;
      this.dataReady = true;
      this.tryRenderChart();
    });
  }

  ngAfterViewInit() {
    console.log("VIEW READY");
    this.viewReady = true;
    this.tryRenderChart();
  }

  tryRenderChart() {
    console.log("DEBUG:", this.viewReady, this.dataReady, this.chartRef);

    if (!this.viewReady || !this.dataReady || !this.chartRef) {
      return;
    }

    const labels = this.transactions.map(t =>
  new Date(t.date).toISOString().split('T')[0]
);
    const incomes = this.transactions.map(t => t.amount > 0 ? t.amount : 0);
    const expenses = this.transactions.map(t => t.amount < 0 ? Math.abs(t.amount) : 0);

    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          { label: 'Bevétel', data: incomes, backgroundColor: 'green' },
          { label: 'Kiadás', data: expenses, backgroundColor: 'red' }
        ]
      }
    });
  }
}
