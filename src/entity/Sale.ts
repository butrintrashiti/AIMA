import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from "typeorm"
import { Product } from "./Product"

@Entity()
export class Sale {

    @PrimaryGeneratedColumn()
    id!: number

    @OneToOne(() => Product)
    @JoinColumn()
    product!: Product

    @Column()
    quantity!: number

    @Column({ type: "float" })
    total_amount!: number

    @Column({ type: 'timestamptz' })
    sale_date!: Date

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}
