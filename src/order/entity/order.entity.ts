import { Customer } from "../../customer/entity/customer.entity";
import { OrderItem } from "../../orderItems/entity/orderItems.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int'
  })
  totalAmount: number;

  @Column({
    type: 'varchar'
  })
  status: string;

  @CreateDateColumn()
  createdAt: Date

  @ManyToOne(() => Customer, (customer) => customer.orders)
  @JoinColumn({ name: 'customerId', referencedColumnName: 'id'})
  customer: Customer;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];
}