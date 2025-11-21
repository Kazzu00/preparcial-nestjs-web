import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class TravelPlan {
  @PrimaryGeneratedColumn()
  id: number; // [cite: 57]

  @Column()
  countryCode: string; // [cite: 58]

  @Column()
  title: string; // [cite: 59]

  @Column()
  startDate: Date; // [cite: 60]

  @Column()
  endDate: Date; // [cite: 60]

  @Column({ nullable: true })
  notes: string; // [cite: 61]

  @CreateDateColumn()
  createdAt: Date; // [cite: 62]
}