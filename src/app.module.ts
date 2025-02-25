import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import dbConfig from './config/db.config';
import { Customer } from './customer/entity/customer.entity';
import { Product } from './product/entity/product.entity';
import { OrderItem } from './orderItems/entity/orderItems.entity';
import { Category } from './category/entity/category.entity';
import { Order } from './order/entity/order.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      // useFactory: async (configService: ConfigService) => ({...configService.get('database')}),
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: 'localhost',
        port: Number(3306),
        username: 'root',
        password: '',
        database: 'sales',
        entities: [Customer, Product, OrderItem, Category, Order],
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Customer, Category, Product, Order, OrderItem]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
