import { Category } from "../category/entity/category.entity";
import { Product } from "../product/entity/product.entity";
import { Customer } from "../customer/entity/customer.entity";
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { faker } from "@faker-js/faker";
import { OrderItem } from "../orderItems/entity/orderItems.entity";
import { Order } from "../order/entity/order.entity";

export class MainSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {

    console.log('seeding categories...');
    const categoryFactory = factoryManager.get(Category);
    const category = await categoryFactory.saveMany(100);

    console.log('seeding customers...');
    const customerFactory = factoryManager.get(Customer);
    const customer = await customerFactory.saveMany(5000);

    console.log('seeding Products...');
    const productFactory = factoryManager.get(Product)
    const products = await Promise.all(
      Array(1000).fill('').map(async () => {
        const product = await productFactory.make({
          category: faker.helpers.arrayElement(category)
        })
        return product;
      })
    )
    const productRepo = dataSource.getRepository(Product);
    await productRepo.save(products);

    console.log('seeding orders...');
    const orderRepo = dataSource.getRepository(Order);
    const size = 10000;
    const orders = [];
    for (let i = 0; i < 400000; i += size) {
      const batchOrders = await Promise.all(
        Array(size).fill('').map(async () => {
          const order = orderRepo.create({
            customer: faker.helpers.arrayElement(customer),
            totalAmount: 0,
            status: faker.helpers.arrayElement(['pending', 'completed', 'cancelled'])
          });
          return order;
        })
      );
      await orderRepo.save(batchOrders);
      orders.push(...batchOrders);
    }

    const orderItemRepo = dataSource.getRepository(OrderItem);

    console.log('seeding order items...');
    for (const order of orders) {
      const items = faker.number.int({ min: 2, max: 5 });
      let totalAmount = 0;
      for (let i = 0; i < items; i++) {
        const quantity = faker.number.int({ min: 1, max: 10 });
        const product = faker.helpers.arrayElement(products);
        const price = product.price;
        await orderItemRepo.save(orderItemRepo.create({
          order: order,
          product: product,
          quantity: quantity,
          price: price,
        }));
        totalAmount += price * quantity;
      }
      order.totalAmount = totalAmount;
      await orderRepo.save(order);
    }
  }
}