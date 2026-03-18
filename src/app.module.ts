import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesModule } from './employees/employees.module';
import { ProductsModule } from './products/products.module';
import { ConfigModule } from "@nestjs/config";

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
  ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
