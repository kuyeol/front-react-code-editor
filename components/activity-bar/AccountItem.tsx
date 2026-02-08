
import React from 'react';

interface AccountItemProps {
  isActive: boolean;
  onClick: () => void;
}

export const AccountItem: React.FC<AccountItemProps> = ({ isActive, onClick }) => {
  return (
    <button 
      className={`hover:text-white transition-colors mt-auto p-2 ${isActive ? 'text-white' : ''}`}
      onClick={onClick}
    >
      <span className="material-symbols-outlined !text-[24px]">account_circle</span>
    </button>
  );
};
