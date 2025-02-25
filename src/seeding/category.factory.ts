import { faker } from "@faker-js/faker";
import { Category } from "../category/entity/category.entity";
import { setSeederFactory } from "typeorm-extension";

export const CategoryFactory = setSeederFactory(Category, () => {
  const category = new Category();
  category.name = faker.commerce.department();
  return category;
});
