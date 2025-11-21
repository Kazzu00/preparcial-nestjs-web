import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Country {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string; // Alpha-3 code (ej: COL)

  @Column()
  name: string;

  @Column()
  region: string;

  @Column()
  subregion: string;

  @Column()
  capital: string;

  @Column()
  population: number;

  @Column()
  flagUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}