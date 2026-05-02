import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Region } from "../../regions/entities/region.entity";
// 💡 Asegúrate de usar la ruta relativa correcta hacia tu entidad Employee
import { Employee } from "../../employees/entities/employee.entity"; 

@Entity()
export class Location {
  
  @PrimaryGeneratedColumn('increment')
  locationId!: number;

  @Column('text')
  locationName!: string;

  @Column('text')
  locationAddress!: string;

  @Column({
    type: 'float',
    array: true
  })
  locationLatLng!: number[];

  // 🔗 RELACIÓN ANTERIOR: Muchas ubicaciones pertenecen a UNA región
  @ManyToOne(() => Region, (region) => region.locations)
  region!: Region;

  // 🔗 NUEVA RELACIÓN: Una ubicación tiene MUCHOS empleados
  @OneToMany(() => Employee, (employee) => employee.location)
  employees!: Employee[];
}