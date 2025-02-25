import { faker } from "@faker-js/faker";
import { Product } from "../product/entity/product.entity";
import { setSeederFactory } from "typeorm-extension";

export const ProductFactory = setSeederFactory(Product, () => {
  const product = new Product();
  product.name = faker.commerce.productName();
  product.price = faker.number.int({ min: 1000, max: 10000 });
  return product;
});
