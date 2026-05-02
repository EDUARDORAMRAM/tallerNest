import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
// 💡 Cambiamos la importación ligeramente para evitar problemas con TypeScript
import * as jwt from 'jsonwebtoken'; 

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  registerUser(createUserDto: CreateUserDto) {
    createUserDto.userPassword = bcrypt.hashSync(createUserDto.userPassword, 5);
    return this.userRepository.save(createUserDto);
  }

  async loginUser(createUserDto: CreateUserDto) {
    const user = await this.userRepository.findOne({
      where: {
        userEmail: createUserDto.userEmail
      }
    });

    // 🚨 REGRESAMOS ESTA VALIDACIÓN: Previene que la app colapse si el correo no existe
    if (!user) {
      throw new UnauthorizedException("No estas autorizado");
    }

    const match = await bcrypt.compare(createUserDto.userPassword, user.userPassword);
    
    if (!match) {
      throw new UnauthorizedException("No estas autorizado");
    }

    // 💡 MEJORA DE SEGURIDAD: Extraemos solo lo que queremos guardar en el token (Payload)
    const payload = {
      userEmail: user.userEmail,
      userId: user.userId
    };

    // Firmamos el token usando el payload en lugar de toda la entidad "user"
    const token = jwt.sign(payload, "SECRET KEY");
    
    return token;
  }
}