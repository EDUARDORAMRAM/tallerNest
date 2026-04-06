import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesModule } from './employees/employees.module';
import { ProductsModule } from './products/products.module';
import { ConfigModule } from "@nestjs/config";
import { ProvidersModule } from './providers/providers.module';
import { ManagersModule } from './managers/managers.module';
import { LocationsModule } from './locations/locations.module';
import { RegionsModule } from './regions/regions.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
    type: 'postgres',           // El motor: 'mysql', 'postgres', 'sqlite', etc.
      host: process.env.host,          // Dirección del servidor de BD
      port: +process.env.DB_PORT!,                 // Puerto (5432 para Postgres, 3306 para MySQL)
      username: 'postgres',     // Usuario de la BD
      password: process.env.pass,    // Contraseña
      database: process.env.name,
      entities: [],
      autoLoadEntities: true,
      synchronize: true,
  }), 
  EmployeesModule, 
  ProductsModule, ProvidersModule, ManagersModule, LocationsModule, RegionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
