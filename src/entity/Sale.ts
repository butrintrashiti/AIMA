import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, ManyToOne } from "typeorm"
import { Product } from "./Product"

@Entity('sales')
export class Sale {

    @PrimaryGeneratedColumn()
    id!: number

    @ManyToOne(() => Product)
    @JoinColumn({ name: 'productId', referencedColumnName: 'id' })
    product!: Product;

    @Column({ type: 'int', nullable: false })
    productId!: number;

    @Column()
    quantity!: number

    @Column({ type: "float" })
    total_amount!: number

    @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    sale_date!: Date

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}
