import { Controller, Get, Param } from '@nestjs/common';
import { CountriesService } from './countries.service';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get() // Listar todos [cite: 36]
  findAll() {
    return this.countriesService.findAll();
  }

  @Get(':code') // Consultar por código alpha-3 [cite: 37]
  findOne(@Param('code') code: string) {
    return this.countriesService.findOneByCode(code);
  }
}