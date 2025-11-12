import { Component, AfterViewInit } from '@angular/core';
import { WalletService } from '../../services/wallet.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements AfterViewInit {
  chart: any;

  constructor(private walletService: WalletService) {}

  ngAfterViewInit(): void {
    // Kis késleltetés, hogy a canvas biztosan készen legyen
    setTimeout(() => {
      this.renderChart();
    }, 200);
  }

  renderChart(): void {
    const income = this.walletService.getTotalIncome();
    const expense = this.walletService.getTotalExpense();

    const ctx = document.getElementById('statsChart') as HTMLCanvasElement | null;
    if (!ctx) return;

    if (this.chart) this.chart.destroy();

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Bevétel', 'Kiadás'],
        datasets: [
          {
            label: 'Összeg (Ft)',
            data: [income, expense],
            backgroundColor: ['#28a745', '#dc3545']
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: { display: true, text: 'Összeg (Ft)' }
          }
        },
        plugins: {
          legend: { display: false },
          title: { display: true, text: 'Bevétel vs Kiadás' }
        }
      }
    });

    console.log('Statisztika kirajzolva:', { income, expense });
  }
}
