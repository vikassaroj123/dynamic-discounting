import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit';
}

export function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button',
}: ButtonProps) {
  const baseClasses = 'font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 transform hover:scale-105 active:scale-95';

  const variants = {
    primary: 'bg-gradient-to-r from-[#006C35] to-[#004d26] text-white hover:from-[#004d26] hover:to-[#003d1f] focus:ring-[#006C35] shadow-lg hover:shadow-xl hover:shadow-[#006C35]/30',
    secondary: 'bg-gradient-to-r from-[#CFAE70] to-[#B8995F] text-white hover:from-[#B8995F] hover:to-[#A6894F] focus:ring-[#CFAE70] shadow-lg hover:shadow-xl hover:shadow-[#CFAE70]/30',
    outline: 'border-2 border-[#006C35] text-[#006C35] hover:bg-gradient-to-r hover:from-[#006C35] hover:to-[#004d26] hover:text-white hover:border-transparent focus:ring-[#006C35] hover:shadow-lg',
    ghost: 'text-gray-700 hover:bg-gray-100/80 focus:ring-gray-300 hover:shadow-sm',
    danger: 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 focus:ring-red-500 shadow-lg hover:shadow-xl',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}
    >
      {children}
    </button>
  );
}
