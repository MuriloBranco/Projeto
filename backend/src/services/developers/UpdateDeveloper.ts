import { IDeveloperRepository } from "../../repositories/IDeveloperRepository";
import { Developers } from "../../models/developers";

interface IRequest {
    id: number;
    nivel_id?: string;
    nome?: string;
    sexo?: string;
    data_nascimento?: Date | string;
    hobby?: string;
}

class UpdateDeveloper {
  constructor(private developerRepository: IDeveloperRepository) {}

  async execute({ id, nivel_id, nome, sexo, data_nascimento, hobby }: IRequest): Promise<Developers> {
    const developer = await this.developerRepository.findById(id);
    const nascimentoDate = new Date(data_nascimento);

    const today = new Date();
    let idade = today.getFullYear() - nascimentoDate.getFullYear();
    const birthMonth = nascimentoDate.getMonth();
    const birthDay = nascimentoDate.getDate();

    if (today.getMonth() < birthMonth || (today.getMonth() === birthMonth && today.getDate() < birthDay)) {
        idade--;
      }


    const updatedDeveloper = await this.developerRepository.update(id, {
      nivel_id: nivel_id ?? developer.nivel_id,
      nome: nome ?? developer.nome,
      sexo: sexo ?? developer.sexo,
      data_nascimento: nascimentoDate ?? developer.data_nascimento,
      idade,
      hobby: hobby ?? developer.hobby,
    });

    return updatedDeveloper;
  }
}

export { UpdateDeveloper };