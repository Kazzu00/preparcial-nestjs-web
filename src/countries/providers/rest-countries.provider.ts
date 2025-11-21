import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class RestCountriesProvider {
  constructor(private readonly httpService: HttpService) {}

  async getCountryByCode(code: string): Promise<any> {
    try {
      // Consultamos la API externa
      const url = `https://restcountries.com/v3.1/alpha/${code}?fields=cca3,name,region,subregion,capital,population,flags`;
      const response = await lastValueFrom(this.httpService.get(url));
      
      // La API retorna un dato simple
      const data = response.data;
      
      return {
        code: data.cca3,
        name: data.name.common,
        region: data.region,
        subregion: data.subregion || 'N/A',
        capital: data.capital ? data.capital[0] : 'N/A',
        population: data.population,
        flagUrl: data.flags.png,
      };
    } catch (error) {
      throw new HttpException('Country not found in external API', HttpStatus.NOT_FOUND);
    }
  }
}