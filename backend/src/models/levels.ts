import { Entity,    PrimaryGeneratedColumn,
    Column,
    OneToMany,
 } from 'typeorm';
import { Developers } from './developers';
  
  @Entity('levels')
  export class Levels {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    nivel: string;

    
    @OneToMany(() => Developers, developer => developer.level)
    developers: Developers[];

  }