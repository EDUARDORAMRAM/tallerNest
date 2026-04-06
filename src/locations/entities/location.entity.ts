import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Location {
  
  @PrimaryGeneratedColumn('increment')
  locationId: number;

  @Column('text')
  locationName: string;

  
  @Column('text')
  locationAddress: string;

  // ⚠️ ATENCIÓN AQUÍ: En TypeORM para PostgreSQL, los arreglos se definen así:
  @Column('float', { array: true })
  locationLatLng: number[];
  
  
}