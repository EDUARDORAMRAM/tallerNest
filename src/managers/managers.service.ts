import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { Manager } from './entities/manager.entity';

@Injectable()
export class ManagersService {
  constructor(
    @InjectRepository(Manager)
    private readonly managerRepository: Repository<Manager>,
  ) {}

  create(createManagerDto: CreateManagerDto) {
    // Guarda el nuevo gerente en la base de datos
    return this.managerRepository.save(createManagerDto);
  }

  findAll() {
    // Retorna todos los gerentes registrados
    return this.managerRepository.find();
  }

  async findOne(id: string) {
    // Busca por el ID (UUID en este caso)
    const manager = await this.managerRepository.findOneBy({ managerId: id });
    
    if (!manager) {
      throw new NotFoundException(`Gerente con ID ${id} no encontrado`);
    }
    
    return manager;
  }

  async update(id: string, updateManagerDto: UpdateManagerDto) {
    // preload mezcla los datos existentes con los nuevos usando el ID
    const manager = await this.managerRepository.preload({
      managerId: id,
      ...updateManagerDto,
    });

    if (!manager) {
      throw new NotFoundException(`No se pudo actualizar: Gerente con ID ${id} no encontrado`);
    }

    return this.managerRepository.save(manager);
  }

  async remove(id: string) {
    // Reutilizamos findOne para asegurar que exista antes de eliminarlo
    const manager = await this.findOne(id);
    return this.managerRepository.remove(manager);
  }
}