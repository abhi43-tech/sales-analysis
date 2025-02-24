import { Category } from "../../category/entity/category.entity";
import { OrderItem } from "../../orderItems/entity/orderItems.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar'
  })
  name: string;

  @Column({
    type: 'int'
  })
  price: number;

  @ManyToOne(() => Category, (category) => category.id)
  @JoinColumn({name: 'categoryId', referencedColumnName: 'id'})
  category: Category;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  orderItems: OrderItem[];
}