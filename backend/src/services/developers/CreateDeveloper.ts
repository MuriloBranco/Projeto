import { IDeveloperRepository } from "../../repositories/IDeveloperRepository";
import { Developers } from "../../models/developers";

interface IRequest {
  nivel_id: string;
  nome: string;
  sexo: string;
  data_nascimento: Date | string;
  hobby: string;
}

class CreateDeveloper {
  constructor(private developerRepository: IDeveloperRepository) {}

  async execute({ nivel_id, nome, sexo, data_nascimento, hobby }: IRequest): Promise<Developers> {
    try {
      const nascimentoDate = new Date(data_nascimento);

      const today = new Date();
      let idade = today.getFullYear() - nascimentoDate.getFullYear();
      const birthMonth = nascimentoDate.getMonth();
      const birthDay = nascimentoDate.getDate();

      if (today.getMonth() < birthMonth || (today.getMonth() === birthMonth && today.getDate() < birthDay)) {
          idade--;
      }

      const developer = await this.developerRepository.create({
        nivel_id,
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