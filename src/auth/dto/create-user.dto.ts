import { IsEmail, IsString, MinLength } from "class-validator";
// 🚨 Borramos el import de { User } de aquí

export class CreateUserDto { // 🚨 Quitamos el "extends User"
  @IsEmail()
  userEmail!: string;

  @IsString()
  @MinLength(8)
  userPassword!: string;
}