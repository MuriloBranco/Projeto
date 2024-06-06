import { IDeveloperRepository } from "../../repositories/IDeveloperRepository";
import { Developers } from "../../models/developers";
import { parseISO } from 'date-fns';

interface IRequest {
  level: number;
  nome: string;
  sexo: string;
  data_nascimento: Date | string;
  hobby: string;
}

class CreateDeveloper {
  constructor(private developerRepository: IDeveloperRepository) {}

  async execute({ level, nome, sexo, data_nascimento, hobby }: IRequest): Promise<Developers> {
    
    try {
      const nascimentoDate = typeof data_nascimento === 'string' ? parseISO(data_nascimento) : data_nascimento;

      const today = new Date();
      let idade = today.getFullYear() - nascimentoDate.getFullYear();
      const birthMonth = nascimentoDate.getMonth();
      const birthDay = nascimentoDate.getDate();

      if (today.getMonth() < birthMonth || (today.getMonth() === birthMonth && today.getDate() < birthDay)) {
          idade--;
      }

      const developer = await this.developerRepository.create({
        level,
        nome,
        sexo,
        data_nascimento: nascimentoDate, 
        idade,
        hobby
      });

      return developer;
    } catch (error) {
      console.error("Erro ao criar desenvolvedor:", error);
      throw new Error("Não foi possível criar o desenvolvedor. Por favor, tente novamente.");
    }
  }
}

export { CreateDeveloper };