// import dbConfig from "../config/db.config";
import { DataSource, DataSourceOptions } from "typeorm";
import { runSeeders, SeederOptions } from "typeorm-extension";
import { CustomerFactory } from "./customer.factory";
import { CategoryFactory } from "./category.factory";
import { ProductFactory } from "./product.factory";
import { OrderItemFactory } from "./orderItem.factory";
import { MainSeeder } from "./main.seeder";
import * as dotenv from "dotenv";
import { Customer } from "../customer/entity/customer.entity";
import { Product } from "../product/entity/product.entity";
import { OrderItem } from "../orderItems/entity/orderItems.entity";
import { Category } from "../category/entity/category.entity";
import { Order } from "../order/entity/order.entity";

dotenv.config();

const options: DataSourceOptions & SeederOptions = {
  type: "mysql",
  host: "localhost",
  port: Number(3306),
  username: "root",
  password: "",
  database: "ohhh",
  entities: [Customer, Product, OrderItem, Category, Order],
  dropSchema: true,
  factories: [CustomerFactory, CategoryFactory, ProductFactory, OrderItemFactory],
  seeds: [MainSeeder],
};

const dataSource = new DataSource(options);

dataSource.initialize()
  .then(async () => {
    console.log("Database connected! Running seeds...");
    await dataSource.synchronize(true);
    await runSeeders(dataSource);
    console.log("Seeding completed!");
    process.exit();
  })
  .catch((error) => {
    console.error("Error during seeding:", error);
    process.exit(1);
  });
