import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn,UpdateDateColumn } from "typeorm";
import { Tag } from "./tag.entity";

@Entity('product_tag_images')
export class ProductImageTagEntity{

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

    @ManyToOne(()=>Tag,tag=>tag.images,{onDelete:"CASCADE"})
    @JoinColumn({name: "category_id"})   
    category:Tag


    @Column({type:"timestamp",default:()=>'CURRENT_TIMESTAMP'})
    date_created:Date

    @UpdateDateColumn({ name: 'date_modified', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    date_modified: Date;

    @Column({type:"timestamp",default:()=>'CURRENT_TIMESTAMP'})
    date_deleted:Date
}