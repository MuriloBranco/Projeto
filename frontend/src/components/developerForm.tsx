
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createDeveloper, getLevels, updateDeveloper } from '../services/api';
import FormInput from './Form';
import swal from 'sweetalert';
import { Developer } from '../types/types';
import { Level } from '../types/types';

type DeveloperFormData = {
  nome: string;
  sexo: string;
  data_nascimento: string;
  idade: number;
  hobby: string;
  level: Level;
};

interface DeveloperFormProps {
  developer?: Developer | null;
  onClose: () => void;
  onSave: () => void;
}

const DeveloperForm: React.FC<DeveloperFormProps> = ({ developer, onClose, onSave }) => {
  const [levels, setLevels] = useState([]);
  
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<DeveloperFormData>();

  useEffect(() => {
    const loadLevels = async () => {
      const levelsData = await getLevels(1, 100, '');
      setLevels(levelsData.data.items);
    };

    loadLevels();
  }
  , []);


  useEffect(() => {
    if (developer) {
      setValue('nome', developer.nome);
      setValue('sexo', developer.sexo);
      setValue('data_nascimento', developer.data_nascimento);
      setValue('idade', developer.idade);
      setValue('hobby', developer.hobby);
    }
  }, [developer, setValue]);

  const submitHandler = async (data: DeveloperFormData) => {
    try {
      if (developer) {
        await updateDeveloper(developer.id, data);
        swal("Sucesso", "Desenvolvedor atualizado com sucesso!", "success");
      } else {
        await createDeveloper(data);
        swal("Sucesso", "Desenvolvedor adicionado com sucesso!", "success");
      }
      reset();
      onSave();
      onClose();
    } catch (error) {
      console.error('Erro ao salvar desenvolvedor', error);
      swal("Erro", "Ocorreu um erro ao salvar o desenvolvedor.", "error");
    }
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col space-y-4">
      <FormInput
        name="nome"
        placeholder="Nome"
        register={register}
        error={errors.nome}
        required
      />
      
      <div>
        <select
          {...register('sexo', { required: "Sexo é um campo obrigatório" })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        >
          <option value="">Selecione o sexo</option>
          <option value="Masculino">Masculino</option>
          <option value="Feminino">Feminino</option>
          <option value="Outro">Outro</option>
        </select>
        {errors.sexo && <p className="text-red-500 text-sm">{errors.sexo.message}</p>}
      </div>

      <div>
        <select
          {...register('level', { required: "Nível é um campo obrigatório" })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        >
          <option value="">Selecione o nível</option>
          {levels.map((level: Level) => (
            <option key={level.id} value={level.id}>
              {level.nivel}
            </option>
          ))}
        </select>
        {errors.level && <p className="text-red-500 text-sm">{errors.level.message}</p>}
      </div>

      <FormInput
        name="data_nascimento"
        type="date"
        placeholder="Data de Nascimento"
        register={register}
        error={errors.data_nascimento}
        required
      />

      <FormInput
        name="hobby"
        placeholder="Hobby"
        register={register}
        error={errors.hobby}
        required
      />
      
      <button
        type="submit"
        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
      >
        Salvar
      </button>
    </form>
  );
};

export default DeveloperForm;
