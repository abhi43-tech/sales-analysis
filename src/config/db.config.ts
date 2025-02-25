import { registerAs } from "@nestjs/config";
import * as dotenv from "dotenv";
import { Category } from "../category/entity/category.entity";
import { Customer } from "../customer/entity/customer.entity";
import { OrderItem } from "../orderItems/entity/orderItems.entity";
import { Product } from "../product/entity/product.entity";

dotenv.config();

export default registerAs("database", () => ({
  type: "mysql",
  host: process.env.DB_MAIN_HOST || "localhost",
  port: parseInt(process.env.DB_MAIN_PORT) || 3306,
  username: process.env.DB_MAIN_USER || "user",
  password: process.env.DB_MAIN_PASSWORD || "mypassword",
  database: process.env.DB_MAIN_DATABASE || "ohhh",
  entities: [Customer, OrderItem, Product, Category],
  synchronize: true,
}));
