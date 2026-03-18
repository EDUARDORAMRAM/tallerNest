import { IsString, IsNotEmpty, IsPhoneNumber } from "class-validator";

export class CreateEmployeeDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsString()
    @IsNotEmpty()
    celphone: string;
}