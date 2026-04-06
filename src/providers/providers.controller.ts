import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';

@Controller('providers') // Ruta base: localhost:3000/providers
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @Post()
  create(@Body() createProviderDto: CreateProviderDto) {
    return this.providersService.create(createProviderDto);
  }

  @Get()
  findAll() {
    return this.providersService.findAll();
  }
  @Get('/name/:name')
  findByName(@Param('name') name: string) {
    // Ahora sí le pasamos el "name" al servicio
    return this.providersService.findOneByName(name);
  }

  // GET localhost:3000/providers/88ef729b-c6e2-4bbc-bad3-2e72125dd9cc
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.providersService.findOne(id);
  }

  // PATCH localhost:3000/providers/88ef729b-c6e2-4bbc-bad3-2e72125dd9cc
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateProviderDto: UpdateProviderDto
  ) {
    return this.providersService.update(id, updateProviderDto);
  }

  // DELETE localhost:3000/providers/88ef729b-c6e2-4bbc-bad3-2e72125dd9cc
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.providersService.remove(id);
  }
}