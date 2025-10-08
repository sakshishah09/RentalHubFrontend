import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);
@Component({
  selector: 'app-overview.component',
  imports: [],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})

export class OverviewComponent implements OnInit {
  summaryCards = [
    { title: 'Total Products', value: 128, icon: '📦' },
    { title: 'Total Sales', value: '₹84,500', icon: '💰' },
    { title: 'Total Bookings', value: 56, icon: '🗓️' },
    { title: 'Active Listings', value: 45, icon: '🛒' }
  ];

  recentActivities = [
    { date: '06 Oct 2025', product: 'Canon DSLR', type: 'Sale', amount: 35000, status: 'Sold' },
    { date: '04 Oct 2025', product: 'Camping Tent', type: 'Rent', amount: 800, status: 'Rented' },
    { date: '03 Oct 2025', product: 'Bluetooth Speaker', type: 'Sale', amount: 1500, status: 'Cancelled' },
    { date: '01 Oct 2025', product: 'Laptop Bag', type: 'Rent', amount: 300, status: 'Rented' }
  ];

  chart: any;

  ngOnInit(): void {
    this.renderChart();
  }

  renderChart() {
    const ctx = document.getElementById('overviewChart') as HTMLCanvasElement;

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        datasets: [
          {
            label: 'Sales (₹)',
            data: [8000, 12000, 9000, 15000, 20000, 22000, 25000, 18000, 21000],
            backgroundColor: 'rgba(13, 110, 253, 0.7)',
            borderRadius: 8
          },
          {
            label: 'Rentals (₹)',
            data: [2000, 4000, 3500, 5000, 7000, 8000, 9500, 6000, 7500],
            backgroundColor: 'rgba(25, 135, 84, 0.6)',
            borderRadius: 8
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          },
          title: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value) => '₹' + value
            }
          }
        }
      }
    });
  }

  refreshData() {
    // Future: API call to refresh data
    console.log('Refreshing dashboard data...');
  }
}
