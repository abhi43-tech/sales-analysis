import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order/entity/order.entity';
import { OrderItem } from './orderItems/entity/orderItems.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Order) private readonly orderRepo: Repository<Order>,
    @InjectRepository(OrderItem) private readonly orderItemRepo: Repository<OrderItem>,
  ) { }

  getHello(): string {
    return 'Hello World!';
  }

  async getTotalRevenueByMonth() {
    return await this.orderRepo.createQueryBuilder('order')
      .select('MONTH(order.createdAt)', 'month')
      .addSelect('SUM(order.totalAmount)', 'total revenue')
      .where('YEAR(order.createdAt) = YEAR(CURRENT_DATE())')
      .groupBy('month')
      .getRawMany();
  }

  async getTopCustomersBySpending() {
    return this.orderRepo
      .createQueryBuilder('order')
      .select('order.customerId')
      .addSelect('SUM(order.totalAmount)', 'totalSpent')
      .where('order.status = :status', { status: 'completed' })
      .groupBy('order.customerId')
      .orderBy('totalSpent', 'DESC')
      .limit(5)
      .getRawMany();
  }

  async getSalesCountAndRevenuePerCategory() {
    return await this.orderItemRepo.createQueryBuilder('orderItem')
      .select('category.id', 'categoryId')
      .addSelect('COUNT(orderItem.id)', 'salesCount')
      .addSelect('SUM(orderItem.quantity * orderItem.price)', 'totalRevenue')
      .innerJoin('orderItem.product', 'product')
      .innerJoin('product.category', 'category')
      .groupBy('category.id')
      .getRawMany();
  }

  async getDailyOrderCountLast7Days() {
    return await this.orderRepo.createQueryBuilder('order')
      .select('DATE(order.createdAt)', 'date')
      .addSelect('COUNT(order.id)', 'orderCount')
      .where('order.createdAt >= DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY)')
      .groupBy('DATE(order.createdAt)')
      .getRawMany();
  }

  async getAverageOrderValuePerCustomer() {
    return await this.orderRepo.createQueryBuilder('order')
      .select('customer.id', 'id')
      .addSelect('AVG(order.totalAmount)', 'averageOrder')
      .innerJoin('order.customer', 'customer')
      .where('order.status = :status', { status: 'completed' })
      .groupBy('customer.id')
      .having('COUNT(order.id) >= 2')
      .getRawMany();
  }

  async getMonthlySalesTrend() {
    return await this.orderRepo.createQueryBuilder('order')
      .select('MONTH(order.createdAt)', 'month')
      .addSelect('SUM(order.totalAmount)', 'totalRevenue')
      .where('order.createdAt >= DATE_SUB(CURRENT_DATE(), INTERVAL 6 MONTH)')
      .groupBy('MONTH(order.createdAt)')
      .getRawMany();
  }
}
