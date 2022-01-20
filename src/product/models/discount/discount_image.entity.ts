import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn,UpdateDateColumn } from "typeorm";
import { Discount } from "./discount.entity";

@Entity('product_discount_images')
export class ProductImageDiscountEntity{

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ 
        type: 'varchar', 
    }) 
    image_url: string;

    @Column({ 
        type: 'varchar', 
    }) 
    thumbnail_url: string;

    @Column({ 
        type: 'varchar', 
    }) 
    alt: string;

    @ManyToOne(()=>Discount,discount=>discount.images,{onDelete:"CASCADE"})
    @JoinColumn({name: "discount_id"})   
    discount:Discount


    @Column({type:"timestamp",default:()=>'CURRENT_TIMESTAMP'})
    date_created:Date

    @UpdateDateColumn({ name: 'date_modified', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    date_modified: Date;

    @Column({type:"timestamp",default:()=>'CURRENT_TIMESTAMP'})
    date_deleted:Date
}