import { faker } from "@faker-js/faker";
import { Customer } from "../customer/entity/customer.entity";
import { setSeederFactory } from "typeorm-extension";

export const CustomerFactory = setSeederFactory(Customer, () => {
  const customer = new Customer();
  customer.name = faker.person.firstName();
  customer.email = faker.internet.email();
  return customer;
});
