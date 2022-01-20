import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn,UpdateDateColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity('product_image')
export class ImageEntity{

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

    @ManyToOne(()=>Product,product=>product.images,{onDelete:"CASCADE"})
    @JoinColumn({name: "product_id"})   
    product:Product

    @Column({type:"timestamp",default:()=>'CURRENT_TIMESTAMP'})
    date_created:Date

    @UpdateDateColumn({ name: 'date_modified', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    date_modified: Date;

    @Column({type:"timestamp",default:()=>'CURRENT_TIMESTAMP'})
    date_deleted:Date
}