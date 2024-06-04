
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { createDeveloper, updateDeveloper } from '../services/api';
import FormInput from './Form';
import swal from 'sweetalert';
import { Developer } from '../types/types';

type DeveloperFormData = {
  nome: string;
  sexo: string;
  data_nascimento: string;
  idade: number;
  hobby: string;
  nivel_id: string;
};

interface DeveloperFormProps {
  developer?: Developer | null;
  onClose: () => void;
  onSave: () => void;
}

const DeveloperForm: React.FC<DeveloperFormProps> = ({ developer, onClose, onSave }) => {
  const { register, handleSubmit, reset, setValue  } = useForm<DeveloperFormData>();

  useEffect(() => {
    if (developer) {
      setValue('nome', developer.nome);
      setValue('sexo', developer.sexo);
      setValue('data_nascimento', developer.data_nascimento);
      setValue('idade', developer.idade);
      setValue('hobby', developer.hobby);
      setValue('nivel_id', developer.nivel_id.toString());
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
      <FormInput name="nome" placeholder="Nome" register={register} required />
      <select
        {...register('sexo', { required: true })}
        className="px-4 py-2 border border-gray-300 rounded-md"
      >
        <option value="">Selecione o sexo</option>
        <option value="M">Masculino</option>
        <option value="F">Feminino</option>
        <option value="O">Outro</option>
      </select>
      <select
        {...register('nivel_id', { required: true })}
        className="px-4 py-2 border border-gray-300 rounded-md"
      >
        <option value="">Selecione o nível</option>
        <option value="1">Iniciante</option>
        <option value="2">Intermediário</option>
        <option value="3">Avançado</option>
      </select>
      <FormInput name="data_nascimento" type="date" register={register} required placeholder={''} />
      <FormInput name="hobby" placeholder="Hobby" register={register} required />
      
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
