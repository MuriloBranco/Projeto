import React from 'react';

interface FormInputProps {
  name: string;
  placeholder: string;
  type?: string;
  register: any;
  required?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({ name, placeholder, type = 'text', register, required = false }) => (
  <input
    {...register(name, { required })}
    type={type}
    placeholder={placeholder}
    className="px-4 py-2 border border-gray-300 rounded-md"
  />
);

export default FormInput;