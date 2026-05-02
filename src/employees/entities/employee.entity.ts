import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { Product } from "../../products/entities/product.entity";
// 💡 Importamos la entidad Location con su ruta relativa
import { Location } from "../../locations/entities/location.entity";

@Entity()
export class Employee {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "text" })
    name!: string;

    @Column({ type: "text" })
    lastName!: string;

    @Column({ type: "text" })
    celphone!: string;
    
    @Column({
        type: "text",
        nullable: true
    })
    photoUrl!: string;

    // 🔗 RELACIÓN AÑADIDA: Muchos empleados pertenecen a UNA ubicación
    @ManyToOne(() => Location, (location) => location.employees)
    location!: Location;

    // (Nota: Dejé tu import de Product y OneToMany intactos para 
    // cuando decidas armar esa relación más adelante 😉)
}