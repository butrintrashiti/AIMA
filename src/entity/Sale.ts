import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from "typeorm"
import { Product } from "./Product"

@Entity('sales')
export class Sale {

    @PrimaryGeneratedColumn()
    id!: number

    @OneToOne(() => Product)
    @JoinColumn({ name: 'productId', referencedColumnName: 'id' })
    product!: Product;

    @Column()
    quantity!: number

    @Column({ type: "float" })
    total_amount!: number

    @Column({ type: 'timestamptz', default: new Date })
    sale_date!: Date

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}
