import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Provider } from "src/providers/entities/provider.entity";

@Entity()
export class Product {

    @PrimaryGeneratedColumn('uuid')
    productId: string;

    @Column('text')
    productName: string;

    @Column('float')
    price: number;

    @Column('int')
    countSeal: number;

    // Relación: Muchos productos pertenecen a un solo proveedor
    @ManyToOne(() => Provider, (provider) => provider.products,{
        eager:true,
    })
    provider: Provider;
}