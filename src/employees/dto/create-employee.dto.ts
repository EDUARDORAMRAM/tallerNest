import { IsString, IsNotEmpty, IsPhoneNumber, IsEmail } from "class-validator";

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

    @IsString()
    @IsEmail()
    email:string;
}