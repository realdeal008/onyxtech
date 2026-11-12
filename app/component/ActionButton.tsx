import React from 'react';
interface ActionButtonProps {
  label: string;
  onClick?: () => void;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}
export const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  onClick,
  fullWidth = false,
  type = 'button',
  disabled = false
}) => {
  return <button type={type} onClick={onClick} disabled={disabled} className={`
        ${fullWidth ? 'w-full' : 'w-fit px-8'}
        py-4 rounded-full bg-[#0099FF] text-white font-semibold text-base
        hover:bg-[#0088EE] active:scale-[0.98] transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        shadow-[0_0_20px_rgba(0,153,255,0.2)]
      `}>
      {label}
    </button>;
};