import React from 'react';
import { UseFormRegister, FieldError } from 'react-hook-form';

interface FormInputProps {
  name: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  required: boolean;
}

const FormInput: React.FC<FormInputProps> = ({ name, type = 'text', placeholder, register, error, required }) => {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        {...register(name, { required: required ? `${placeholder} é um campo obrigatório` : false })}
        className="w-full px-4 py-2 border border-gray-300 rounded-md"
      />
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
};

export default FormInput;