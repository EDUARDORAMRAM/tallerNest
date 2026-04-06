import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { Provider } from './entities/provider.entity';

@Injectable()
export class ProvidersService {
  
  constructor(
    @InjectRepository(Provider)
    private readonly providerRepository: Repository<Provider>,
  ) {}

  create(createProviderDto: CreateProviderDto) {
    // Guarda el nuevo proveedor en la base de datos
    return this.providerRepository.save(createProviderDto);
  }

  findAll() {
    // Retorna un arreglo con todos los proveedores
    return this.providerRepository.find();
  }

  async findOneByName(name: string) {
    // Buscamos en la columna 'providerName' que definiste en tu Entidad
    const provider = await this.providerRepository.findOneBy({ 
      providerName: Like(`%${name}%`)
    });

    if (!provider) {
      throw new NotFoundException(`Proveedor con el nombre '${name}' no encontrado`);
    }

    return provider;
  }

  async findOne(id: string) {
    // Busca un proveedor por su UUID
    const provider = await this.providerRepository.findOneBy({ providerId: id });
    
    // Si no lo encuentra, lanza un error 404
    if (!provider) {
      throw new NotFoundException(`Proveedor con ID ${id} no encontrado`);
    }
    
    return provider;
  }

  async update(id: string, updateProviderDto: UpdateProviderDto) {
    // preload busca por ID y combina los datos existentes con los nuevos
    const provider = await this.providerRepository.preload({
      providerId: id,
      ...updateProviderDto,
    });

    if (!provider) {
      throw new NotFoundException(`No se puede actualizar: Proveedor con ID ${id} no encontrado`);
    }

    // Guarda los cambios
    return this.providerRepository.save(provider);
  }

  async remove(id: string) {
    // Reutilizamos findOne para verificar que exista antes de borrar
    const provider = await this.findOne(id);
    return this.providerRepository.remove(provider);
  }
}