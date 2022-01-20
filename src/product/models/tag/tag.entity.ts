import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn,UpdateDateColumn } from "typeorm";
import { Product } from "../product/product.entity";
import {ProductImageTagEntity} from './tag_image.entity';
@Entity('product_tag')
export class Tag{

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

    @ManyToMany(() => Product,(products: Product) => products.tags, { onDelete: 'CASCADE' })
    products: Product[];

    
    @OneToMany(() => ProductImageTagEntity, (image: ProductImageTagEntity) => image.category,{cascade:true})
    images: ProductImageTagEntity[];

    @Column({type:"timestamp",default:()=>'CURRENT_TIMESTAMP'})
    date_created:Date

    @UpdateDateColumn({ name: 'date_modified', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    date_modified: Date;

    @Column({type:"timestamp",default:()=>'CURRENT_TIMESTAMP'})
    date_deleted:Date
}