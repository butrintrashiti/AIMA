import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, JoinColumn, OneToMany } from "typeorm"
import { User } from "./User";
import { Sale } from "./Sale";

@Entity('products')
export class Product {

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column()
    description!: string

    @Column({ nullable: false, type: "float", default: 0.0 })
    price!: number;

    @Column({ nullable: false, type: "int", default: 0 })
    stock_quantity!: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'supplierId', referencedColumnName: 'id' })
    supplier!: User

    @OneToMany(type => Sale, sale => sale.product)
    sales!: Sale[];
}
