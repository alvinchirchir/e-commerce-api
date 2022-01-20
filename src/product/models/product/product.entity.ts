import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Discount } from '../discount/discount.entity';
import { Category } from '../category/category.entity';
import { Inventory } from '../inventory/inventory.entity';
import { ImageEntity } from './image.entity';
import {Tag} from '../tag/tag.entity'
import { ProductAttributeType } from '../attribute/attribute_type.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
  })
  name: string;

  @Column({
    type: 'varchar',
    unique: true,
  })
  code: string;

  @Column({
    type: 'varchar',
    nullable:true
  })
  active: boolean;

  @Column({
    type: 'varchar',
  })
  desc: string;

  @Column({
    type: 'varchar',
  })
  SKU: string;

  @ManyToMany(() => Category,(category: Category) => category.products, { onDelete: 'CASCADE' })
  @JoinTable({
    name: 'product_categories',
    joinColumn: {
      name: 'product_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'category_id',
      referencedColumnName: 'id',
    },
  })
  categories: Category[];

  @ManyToMany(() => ProductAttributeType,(product_attribute_type: ProductAttributeType) => product_attribute_type.products, { onDelete: 'CASCADE' })
  @JoinTable({
    name: 'product_attribute_types',
    joinColumn: {
      name: 'product_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'product_attribute_type_id',
      referencedColumnName: 'id',
    },
  })
  attribute_types: ProductAttributeType[];

  @ManyToMany(() => Tag,(tag: Tag) => tag.products, { onDelete: 'CASCADE' })
  @JoinTable({
    name: 'product_tags',
    joinColumn: {
      name: 'product_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'tag_id',
      referencedColumnName: 'id',
    },
  })
  tags: Tag[];

  @OneToOne(() => Inventory, (inventory) => inventory.product, {
    cascade: true,
  })
  inventory: Inventory;

  @Column({ default: 0 })
  price: number;

  @Column({ default: 0 })
  discount_price: number;

  @ManyToOne(() => Discount, (discount: Discount) => discount.products, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'discount_id' })
  discount: Discount;

  @OneToMany(() => ImageEntity, (image: ImageEntity) => image.product,{cascade:true})
  images: ImageEntity[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date_created: Date;

  @UpdateDateColumn({
    name: 'date_modified',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  date_modified: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date_deleted: Date;
}
