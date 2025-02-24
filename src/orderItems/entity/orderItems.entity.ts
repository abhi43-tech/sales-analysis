import { Order } from "../../order/entity/order.entity";
import { Product } from "../../product/entity/product.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class OrderItem {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int'
  })
  quantity: number;

  @Column({
    type: 'int'
  })
  price: number;

  @ManyToOne(() => Order, (order) => order.orderItems)
  @JoinColumn({name: 'orderId', referencedColumnName: 'id'})
  order: Order;

  @ManyToOne(() => Product, (product) => product.id)
  @JoinColumn({name: 'productId', referencedColumnName: 'id'})
  product: Product;
}