import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn,UpdateDateColumn } from "typeorm";
import { ProductAttributeType } from "./attribute_type.entity";

@Entity('product_attribute')
export class ProductAttribute{

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ 
        type: 'varchar', 
    }) 
    name: string;


    @ManyToOne(()=>ProductAttributeType,product_attribute_type=>product_attribute_type.attributes,{onDelete:"CASCADE"})
    @JoinColumn({name: "attribute_type_id"})   
    attribute_type:ProductAttributeType


    @Column({type:"timestamp",default:()=>'CURRENT_TIMESTAMP'})
    date_created:Date

    @UpdateDateColumn({ name: 'date_modified', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    date_modified: Date;

    @Column({type:"timestamp",default:()=>'CURRENT_TIMESTAMP'})
    date_deleted:Date
}