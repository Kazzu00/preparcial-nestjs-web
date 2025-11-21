import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountriesModule } from './countries/countries.module';
import { TravelPlansModule } from './travel-plans/travel-plans.module';
import { Country } from './countries/entities/country.entity';
import { TravelPlan } from './travel-plans/entities/travel-plan.entity';
import { LoggerMiddleware } from './common/middleware/logger.middleware'; // Importamos el middleware

@Module({
  imports: [
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
export class AppModule implements NestModule {
  // Middleware
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('countries', 'travel-plans'); 
  }
}
