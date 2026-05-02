import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegionsService } from './regions.service';
import { RegionsController } from './regions.controller';

// 🚨 1. Asegúrate de importar la entidad Region
import { Region } from './entities/region.entity'; 

@Module({
  // 🚨 2. Registra la entidad usando forFeature
  imports: [TypeOrmModule.forFeature([Region])], 
  controllers: [RegionsController],
  providers: [RegionsService],
})
export class RegionsModule {}