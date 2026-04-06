import { ArrayNotEmpty, IsArray, IsString, MaxLength, IsNumber } from "class-validator";
import { Location } from "../entities/location.entity";

export class CreateLocationDto extends Location {
  
  @IsString()
  @MaxLength(35)
  declare locationName: string;

  @IsString()
  @MaxLength(160)
  declare locationAddress: string; // Corregido a "Address"

  @IsArray()
  @ArrayNotEmpty()
  // 💡 TIP: Es muy recomendable agregar esta línea para asegurar 
  // que dentro del arreglo solo vengan números y no textos u otras cosas.
  @IsNumber({}, { each: true }) 
  declare locationLatLng: number[];
}