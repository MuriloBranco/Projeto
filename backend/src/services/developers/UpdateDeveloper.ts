import { IDeveloperRepository } from "../../repositories/IDeveloperRepository";
import { Developers } from "../../models/developers";
import { ILevelRepository } from "../../repositories/ILevelRepository";
import { Levels } from "../../models/levels";

interface IRequest {
    id: number;
    level?: number;
    nome?: string;
    sexo?: string;
    data_nascimento?: Date | string;
    hobby?: string;
}

class UpdateDeveloper {
  constructor(
    private developerRepository: IDeveloperRepository,
    private levelRepository: ILevelRepository
  ) {}

  async execute({ id, level, nome, sexo, data_nascimento, hobby }: IRequest): Promise<Developers> {
    try {
      const developer = await this.developerRepository.findById(id);

      if (!developer) {
        throw new Error('Developer not found');
      }

      let levelEntity: Levels | undefined = developer.level;
      if (level !== undefined) {
        levelEntity = await this.levelRepository.findById(level);

        if (!levelEntity) {
          throw new Error('Level not found');
        }
      }

      const nascimentoDate = new Date(data_nascimento);
      const today = new Date();
      let idade = today.getFullYear() - nascimentoDate.getFullYear();
      const birthMonth = nascimentoDate.getMonth();
      const birthDay = nascimentoDate.getDate();

      if (today.getMonth() < birthMonth || (today.getMonth() === birthMonth && today.getDate() < birthDay)) {
        idade--;
      }

      const updatedDeveloper = await this.developerRepository.update(id, {
        level: levelEntity?.id,
        nome: nome ?? developer.nome,
        sexo: sexo ?? developer.sexo,
        data_nascimento: nascimentoDate ?? developer.data_nascimento,
        idade,
        hobby: hobby ?? developer.hobby,
      });

      return updatedDeveloper;
    } catch (error) {
      console.error("Erro ao atualizar desenvolvedor:", error);
      throw new Error("Não foi possível atualizar o desenvolvedor. Por favor, tente novamente.");
    }
  }
}

export { UpdateDeveloper };