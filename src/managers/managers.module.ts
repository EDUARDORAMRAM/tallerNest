import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManagersService } from './managers.service';
import { ManagersController } from './managers.controller';

// 🚨 1. Asegúrate de importar tu entidad
import { Manager } from './entities/manager.entity'; 

@Module({
  // 🚨 2. Agrega el TypeOrmModule.forFeature en los imports
  imports: [TypeOrmModule.forFeature([Manager])], 
  controllers: [ManagersController],
  providers: [ManagersService],
})
export class ManagersModule {}