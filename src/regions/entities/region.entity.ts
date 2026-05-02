import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
// 💡 TIP: Usamos ruta relativa para evitar problemas en el build
import { Location } from "../../locations/entities/location.entity"; 

@Entity()
export class Region {
  
  @PrimaryGeneratedColumn('increment')
  regionId!: number;

  @Column({
    type: "text",
    unique: true
  })
  regionName!: string;

  @Column('simple-array')
  regionStates!: string[];

  // 🔗 RELACIÓN: Una región tiene MUCHAS ubicaciones
  @OneToMany(() => Location, (location) => location.region)
  locations!: Location[];
}