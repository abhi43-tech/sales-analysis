import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { retry } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('sales/revenue-by-month')
  async getTotalRevenueByMonth() {
    return await this.appService.getTotalRevenueByMonth();
  }

  @Get('customers/top-spenders')
  async getTop() {
    return await this.appService.getTopCustomersBySpending();
  }

  @Get('sales/category-summary')
  async getByCategory() {
    return await this.appService.getSalesCountAndRevenuePerCategory();
  }

  @Get('orders/daily-count')
  async getLast7Days() {
    return await this.appService.getDailyOrderCountLast7Days();
  }

  @Get('customers/average-order')
  async getAverageOrder() {
    return await this.appService.getAverageOrderValuePerCustomer();
  }

  @Get('sales/monthly-trend')
  async getMonthlyTrend() {
    return await this.appService.getMonthlySalesTrend();
  }
}
