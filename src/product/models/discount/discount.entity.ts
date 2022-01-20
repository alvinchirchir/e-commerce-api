import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import {Product} from '../product/product.entity';
import {ProductImageDiscountEntity} from './discount_image.entity'



@Entity('product_discount')
export class Discount {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    unique:true
  })
  name: string;

  @Column({
    type: 'varchar',
  })
  desc: string;

  @Column({ default: 0 })
  discount_percent: number;

  @Column({
    type: 'boolean',
  })
  active: boolean;

  @OneToMany(() => Product, (product: Product) => product.discount)
  products: Product[];

  @OneToMany(() => ProductImageDiscountEntity, (image: ProductImageDiscountEntity) => image.discount,{cascade:true})
  images: ProductImageDiscountEntity[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date_created: Date;

  @UpdateDateColumn({name: 'date_modified',type: 'timestamp',default: () => 'CURRENT_TIMESTAMP',})
  date_modified: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date_deleted: Date;
}
