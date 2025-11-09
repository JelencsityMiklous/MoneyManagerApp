import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { WalletsService } from '../../services/wallets.service';

@Component({
  selector: 'app-wallet-chart',
  templateUrl: './wallet-chart.component.html'
})
export class WalletChartComponent implements OnInit, AfterViewInit {

  @ViewChild('walletPieChart') chartRef!: ElementRef<HTMLCanvasElement>;
  chart!: Chart;

  wallets: any[] = [];

  constructor(private walletService: WalletsService) {}

  ngOnInit() {
    this.walletService.getWallets().subscribe(data => {
      this.wallets = data;
      this.createChart();
    });
  }

  ngAfterViewInit() {}

  createChart() {
    if (!this.chartRef) return;

    const labels = this.wallets.map(w => w.name);
    const balances = this.wallets.map(w => w.balance);

    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'pie',
      data: {
        labels,
        datasets: [
          {
            data: balances
          }
        ]
      }
    });
  }
}
