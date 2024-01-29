import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, JoinColumn } from "typeorm"
import { User } from "./User";

@Entity()
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

    @OneToOne(() => User)
    @JoinColumn()
    supplier!: User
}
