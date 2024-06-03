import { Entity,
    PrimaryGeneratedColumn,
    Column,
 } from 'typeorm';
  
  @Entity('levels')
  export class Levels {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    nivel: string;

  }