import { Entity, PrimaryGeneratedColumn, Column, Generated } from "typeorm"

export enum UserRole {
    SUPLIER = "suplier"
}

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    @Generated("uuid")
    uuid!: string

    @Column({ type: "enum", enum: UserRole, default: UserRole.SUPLIER })
    role!: UserRole

    @Column({ nullable: false })
    firstName!: string;

    @Column({ nullable: false })
    lastName!: string;

    @Column()
    email!: string
}
