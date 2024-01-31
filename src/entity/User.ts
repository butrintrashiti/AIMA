import { Entity, PrimaryGeneratedColumn, Column, Generated } from "typeorm"

export enum UserRole {
    SUPPLIER = "supplier"
}

@Entity('users')
export class User {

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    @Generated("uuid")
    uuid!: string

    @Column({ type: "enum", enum: UserRole, default: UserRole.SUPPLIER, nullable: false })
    role!: UserRole

    @Column({ nullable: false })
    firstName!: string;

    @Column({ nullable: false })
    lastName!: string;

    @Column()
    email!: string
}
