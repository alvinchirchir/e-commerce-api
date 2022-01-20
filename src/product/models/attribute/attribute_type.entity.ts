import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn,UpdateDateColumn } from "typeorm";
import { Product } from "../product/product.entity";
import {ProductAttribute} from './attribute.entity';

@Entity('product_attribute_type')
export class ProductAttributeType{

    @PrimaryGeneratedColumn("uuid")
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

    @Column({
        type: 'boolean',
        nullable:true
      })
      active: boolean;

    @ManyToMany(() => Product,(products: Product) => products.attribute_types, { onDelete: 'CASCADE' })
    products: Product[];

    @OneToMany(() => ProductAttribute, (product_attribute: ProductAttribute) => product_attribute.attribute_type,{cascade:true})
    attributes: ProductAttribute[];


    @Column({type:"timestamp",default:()=>'CURRENT_TIMESTAMP'})
    date_created:Date

    @UpdateDateColumn({ name: 'date_modified', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    date_modified: Date;

    @Column({type:"timestamp",default:()=>'CURRENT_TIMESTAMP'})
    date_deleted:Date
}