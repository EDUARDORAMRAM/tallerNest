import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
// 💡 TIP: Es mejor usar rutas relativas (../) en lugar de absolutas (src/...) 
// para evitar problemas cuando NestJS compile el código a la carpeta 'dist'.
import { Location } from "../../locations/entities/location.entity"; 

@Entity()
export class Manager {
  
  @PrimaryGeneratedColumn('uuid')
  managerId!: string;

  @Column('text')
  managerFullName!: string;

  @Column('float')
  managerSalary!: number;

  @Column('text')
  managerEmail!: string;

  @Column('text')
  managerPhoneNumber!: string;

  // ⚠️ RELACIÓN AÑADIDA Y CORREGIDA
  @OneToOne(() => Location)
  @JoinColumn() // ¡ESTO ES CRUCIAL PARA RELACIONES 1 A 1!
  location!: Location;
}