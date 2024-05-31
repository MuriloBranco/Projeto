import { Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
 } from 'typeorm';
  
  @Entity()
  export class User {
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