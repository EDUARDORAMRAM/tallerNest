import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  userId!: string;

  // 💡 TIP: Agregamos unique: true para evitar correos duplicados
  @Column({
    type: 'text',
    unique: true
  })
  userEmail!: string;

  @Column('text')
  userPassword!: string;
}