import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn,UpdateDateColumn } from "typeorm";
import { Product } from "../product/product.entity";
import {ProductImageCategoryEntity} from './category_image.entity';
@Entity('product_category')
export class Category{

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

    @ManyToMany(() => Product,(products: Product) => products.categories, { onDelete: 'CASCADE' })
    products: Product[];

    
    @OneToMany(() => ProductImageCategoryEntity, (image: ProductImageCategoryEntity) => image.category,{cascade:true})
    images: ProductImageCategoryEntity[];


    @Column({type:"timestamp",default:()=>'CURRENT_TIMESTAMP'})
    date_created:Date

    @UpdateDateColumn({ name: 'date_modified', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    date_modified: Date;

    @Column({type:"timestamp",default:()=>'CURRENT_TIMESTAMP'})
    date_deleted:Date
}