import { Entity,
    PrimaryGeneratedColumn,
    Column,
 } from 'typeorm';
  
  @Entity('developers')
  export class Developers {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    nivel_id: string;

    @Column()
    nome: string;

    @Column()
    sexo: string;

    @Column()
    data_nascimento: Date;

    @Column()
    idade: number;

    @Column()
    hobby: string;
  }