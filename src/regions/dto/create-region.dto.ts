import { IsArray, IsString, MaxLength } from "class-validator";
import { Region } from "../entities/region.entity";

export class CreateRegionDto extends Region {
  
  @IsString()
  @MaxLength(100)
  declare regionName: string;

  @IsArray()
  // 💡 TIP: Agregamos esto para asegurar que cada elemento dentro del arreglo sea un texto.
  // Sin esto, alguien podría enviar números o booleanos dentro del arreglo y pasaría la validación.
  @IsString({ each: true }) 
  declare regionStates: string[];
}