import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountriesModule } from './countries/countries.module';
import { TravelPlansModule } from './travel-plans/travel-plans.module';
import { Country } from './countries/entities/country.entity';
import { TravelPlan } from './travel-plans/entities/travel-plan.entity';

@Module({
  imports: [
    // Configuración de la base de datos SQLite 
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'travel_db.sqlite', 
      entities: [Country, TravelPlan],
      synchronize: true, 
    }),
    CountriesModule,
    TravelPlansModule,
  ],
})
export class AppModule {}
