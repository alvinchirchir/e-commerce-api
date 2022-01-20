import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn,UpdateDateColumn } from "typeorm";
import { Category } from "./category.entity";

@Entity('product_category_images')
export class ProductImageCategoryEntity{

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

    @ManyToOne(()=>Category,category=>category.images,{onDelete:"CASCADE"})
    @JoinColumn({name: "category_id"})   
    category:Category


    @Column({type:"timestamp",default:()=>'CURRENT_TIMESTAMP'})
    date_created:Date

    @UpdateDateColumn({ name: 'date_modified', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    date_modified: Date;

    
}