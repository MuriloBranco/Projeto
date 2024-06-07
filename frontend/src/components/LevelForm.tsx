import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';
import { createLevel, updateLevel } from '../services/api';
import FormInput from './Form';
import { Level } from '../types/types';

type LevelFormData = {
  nivel: string;
};

interface LevelFormProps {
  level?: Level | null;
  onClose: () => void;
  onSave: () => void;
}

const LevelForm: React.FC<LevelFormProps> = ({ level, onClose, onSave }) => {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<LevelFormData>();

  useEffect(() => {
    if (level) {
      setValue('nivel', level.nivel);
    }
  }, [level, setValue]);

  const submitHandler = async (data: LevelFormData) => {
    try {
      if (level) {
        await updateLevel(level.id, data);
        swal("Sucesso", "Nível atualizado com sucesso!", "success");
      } else {
        await createLevel(data);
        swal("Sucesso", "Nível adicionado com sucesso!", "success");
      }
      reset();
      onSave();
      onClose();
    } catch (error) {
      console.error('Erro ao salvar nível', error);
      swal("Erro", "Ocorreu um erro ao salvar o nível.", "error");
    }
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col space-y-4">
      <div>
        <FormInput 
          name="nivel" 
          placeholder="Nível" 
          register={register} 
          error={errors.nivel} 
          required 
        />
      </div>
      <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
        Salvar
      </button>
    </form>
  );
};

export default LevelForm;