import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  color?: 'primary' | 'secondary' | 'danger';
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className = '', color = 'primary' }) => {
  const baseStyle = 'px-4 py-2 rounded font-medium text-white focus:outline-none focus:ring';
  const colorStyles = {
    primary: 'bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded mb-4',
    secondary: 'bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded mb-4',
    danger: 'bg-red-500 hover:bg-red-600 px-4 py-2 rounded mb-4',
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${colorStyles[color]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;