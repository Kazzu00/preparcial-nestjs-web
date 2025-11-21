import { IsString, IsNotEmpty, IsDateString, Length, IsOptional } from 'class-validator';

export class CreateTravelPlanDto {
  @IsString()
  @Length(3, 3) // El código debe ser de 3 letras
  @IsNotEmpty()
  countryCode: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsDateString() // Valida formato fecha ISO 8601
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsString()
  @IsOptional()
  notes?: string;
}
