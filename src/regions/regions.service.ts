import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { Region } from './entities/region.entity';

@Injectable()
export class RegionsService {
  constructor(
    @InjectRepository(Region)
    private regionRepository: Repository<Region>
  ) {}

  create(createRegionDto: CreateRegionDto) {
    // Guarda la nueva región en la base de datos
    return this.regionRepository.save(createRegionDto);
  }

  findAll() {
    // Retorna todas las regiones registradas
    return this.regionRepository.find();
  }

  async findOne(id: number) {
    // Busca por el ID numérico
    const region = await this.regionRepository.findOneBy({ regionId: id });
    
    if (!region) {
      throw new NotFoundException(`Región con ID ${id} no encontrada`);
    }
    
    return region;
  }

  async update(id: number, updateRegionDto: UpdateRegionDto) {
    // preload mezcla los datos existentes con los nuevos usando el ID
    const region = await this.regionRepository.preload({
      regionId: id,
      ...updateRegionDto,
    });

    if (!region) {
      throw new NotFoundException(`No se pudo actualizar: Región con ID ${id} no encontrada`);
    }

    return this.regionRepository.save(region);
  }

  async remove(id: number) {
    // Reutilizamos findOne para asegurar que exista antes de eliminarla
    const region = await this.findOne(id);
    return this.regionRepository.remove(region);
  }
}