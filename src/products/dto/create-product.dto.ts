import { IsInt, IsNumber, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";
import { Product } from "../entities/product.entity";

export class CreateProductDto extends Product {
    @IsString()
    @IsUUID("4")
    @IsOptional()
    declare productId: string;

    @IsString()
    @MaxLength(40)
    declare productName: string;

    @IsNumber()
    declare price: number;

    @IsInt()
    declare countSeal: number;

    @IsString()
    @IsUUID()
    // Cambiamos el tipo a string porque desde el frontend/Postman 
    // enviarás el UUID del proveedor, no el objeto completo.
    declare provider: any; 
}