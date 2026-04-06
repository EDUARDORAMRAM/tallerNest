import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Location } from './entities/location.entity';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {}

  create(createLocationDto: CreateLocationDto) {
    return this.locationRepository.save(createLocationDto);
  }

  findAll() {
 
    return this.locationRepository.find();
  }

  async findOne(id: number) {
    // Busca por el ID numérico
    const location = await this.locationRepository.findOneBy({ locationId: id });
    
    if (!location) {
      throw new NotFoundException(`Ubicación con ID ${id} no encontrada`);
    }
    
    return location;
  }

  async update(id: number, updateLocationDto: UpdateLocationDto) {
    // preload mezcla los datos existentes con los nuevos usando el ID
    const location = await this.locationRepository.preload({
      locationId: id,
      ...updateLocationDto,
    });

    if (!location) {
      throw new NotFoundException(`No se pudo actualizar: Ubicación con ID ${id} no encontrada`);
    }

    return this.locationRepository.save(location);
  }

  async remove(id: number) {
    // Reutilizamos findOne para asegurar que exista antes de eliminarla
    const location = await this.findOne(id);
    return this.locationRepository.remove(location);
  }
}