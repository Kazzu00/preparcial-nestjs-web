import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TravelPlan } from './entities/travel-plan.entity';
import { CreateTravelPlanDto } from './dto/create-travel-plan.dto';
import { CountriesService } from '../countries/countries.service';

@Injectable()
export class TravelPlansService {
  constructor(
    @InjectRepository(TravelPlan)
    private travelPlansRepository: Repository<TravelPlan>,
    private countriesService: CountriesService, // [cite: 89]
  ) {}

  async create(createTravelPlanDto: CreateTravelPlanDto) {
    // 1. Verificar si el país existe o traerlo de la API 
    // Al llamar a findEntityByCode, si no está en DB, el CountriesService lo busca fuera y lo guarda.
    try {
       await this.countriesService.findEntityByCode(createTravelPlanDto.countryCode);
    } catch (error) {
       throw new BadRequestException(`Country with code ${createTravelPlanDto.countryCode} not found or API invalid.`);
    }

    // 2. Guardar el plan de viaje [cite: 67]
    const newPlan = this.travelPlansRepository.create(createTravelPlanDto);
    return this.travelPlansRepository.save(newPlan);
  }

  async findAll() {
    return this.travelPlansRepository.find();
  }

  async findOne(id: number) {
    return this.travelPlansRepository.findOneBy({ id });
  }
}