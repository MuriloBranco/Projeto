import { Entity,
    PrimaryGeneratedColumn,
    Column,
 } from 'typeorm';
  
  @Entity()
  export class Levels {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    nivel: string;
    
    
  
  }