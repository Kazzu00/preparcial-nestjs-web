import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from './entities/country.entity';
import { RestCountriesProvider } from './providers/rest-countries.provider';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(Country)
    private countriesRepository: Repository<Country>,
    private restCountriesProvider: RestCountriesProvider, // Inyectamos el provider [cite: 51]
  ) {}

  async findAll() {
    return this.countriesRepository.find();
  }

  async findOneByCode(code: string) {
    const alpha3 = code.toUpperCase();

    // 1. Buscar en Base de Datos Local (Caché) [cite: 39]
    const localCountry = await this.countriesRepository.findOne({ where: { code: alpha3 } });

    if (localCountry) {
      return { ...localCountry, source: 'local-cache' }; // [cite: 40]
    }

    // 2. Si no existe, consultar API externa [cite: 41, 42]
    const externalData = await this.restCountriesProvider.getCountryByCode(alpha3);

    // 3. Guardar en Base de Datos [cite: 44]
    const newCountry = this.countriesRepository.create(externalData);
    await this.countriesRepository.save(newCountry);

    // 4. Retornar resultado [cite: 45]
    return { ...newCountry, source: 'external-api' };
  }
  
  // Método auxiliar para validar existencia interna sin retornar source info
  async findEntityByCode(code: string): Promise<Country> {
      // Reutilizamos la lógica principal para asegurar que se cachee si no existe
      const result = await this.findOneByCode(code);
      // Eliminamos la propiedad 'source' para retornar la entidad pura
      const { source, ...country } = result;
      return country as Country;
  }
}