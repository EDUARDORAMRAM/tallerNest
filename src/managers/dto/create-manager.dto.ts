import { IsEmail, IsNumber, IsString, MaxLength } from "class-validator";
import { Manager } from "../entities/manager.entity";

export class CreateManagerDto extends Manager {
  
  @IsString()
  @MaxLength(80)
  declare managerFullName: string;

  @IsString()
  @IsEmail()
  declare managerEmail: string;

  // ⚠️ CORRECCIÓN: Faltaba definir explícitamente que es de tipo 'number'
  @IsNumber()
  declare managerSalary: number;

  @IsString()
  @MaxLength(16)
  declare managerPhoneNumber: string;
}