import React from 'react';
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';
import { createLevel } from '../services/api';
import FormInput from './Form';

type LevelFormData = {
  nivel: string;
};

interface LevelFormProps {
  onClose: () => void;
}

const LevelForm: React.FC<LevelFormProps> = ({ onClose }) => {
  const { register, handleSubmit, reset } = useForm<LevelFormData>();

  const submitHandler = async (data: LevelFormData) => {
    try {
      await createLevel(data);
      reset();
      swal("Sucesso", "Nível adicionado com sucesso!", "success");
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (error) {
      console.error("Erro ao adicionar nível", error);
      swal("Erro", "Ocorreu um erro ao adicionar o nível.", "error");
    }
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col space-y-4">
      <FormInput name="nivel" placeholder="Nível" register={register} required />
      <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
        Salvar
      </button>
    </form>
  );
};

export default LevelForm;