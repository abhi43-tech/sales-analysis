import { Order } from '../../order/entity/order.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
  })
  name: string;

  @Column({
    type: 'varchar',
  })
  email: string;

  @CreateDateColumn()
  createdAt: Date;

  // @OneToMany(() => Order, (order) => order.Customer)
  // Orders: Order[];

  @OneToMany(() => Order, (item) => item.customer)
  orders: Order[];
}
