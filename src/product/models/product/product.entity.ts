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

import { Category } from '../category/category.entity';
import { ImageEntity } from './image.entity';
import {Tag} from '../tag/tag.entity'

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
    nullable:true
  })
  active: boolean;

  @Column({
    type: 'varchar',
  })
  desc: string;


  @ManyToMany(() => Category,(category: Category) => category.products, { cascade: true })
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



  @ManyToMany(() => Tag,(tag: Tag) => tag.products, { cascade: true })
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



  @Column({ default: null })
  price: number;

  
  @Column({ default: 0 })
  quantity: number;




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

}
