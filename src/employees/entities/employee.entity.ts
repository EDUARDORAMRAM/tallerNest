
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Product } from "../../products/entities/product.entity";

@Entity()
export class Employee {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "text" })
    name: string;

    @Column({ type: "text" })
    lastName: string;

    @Column({ type: "text" })
    celphone: string;

}