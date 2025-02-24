import { faker } from "@faker-js/faker";
import { OrderItem } from "../orderItems/entity/orderItems.entity";
import { setSeederFactory } from "typeorm-extension";

export const OrderItemFactory = setSeederFactory(OrderItem, () => {
  const orderItem = new OrderItem();
  orderItem.quantity = faker.number.int({ min: 1, max: 10 });
  orderItem.price = faker.number.int({ min: 100, max: 10000 });
  return orderItem;
});
