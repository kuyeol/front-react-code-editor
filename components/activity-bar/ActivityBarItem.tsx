
import React from 'react';

interface ActivityBarItemProps {
  icon: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export const ActivityBarItem: React.FC<ActivityBarItemProps> = ({ icon, label, isActive, onClick }) => {
  return (
    <button
      title={label}
      className={`w-full flex justify-center py-2 transition-all relative ${
        isActive 
        ? 'text-white bg-white/5 border-l-2 border-primary' 
        : 'hover:text-white border-l-2 border-transparent'
      }`}
      onClick={onClick}
    >
      <span className="material-symbols-outlined !text-[24px]">{icon}</span>
    </button>
  );
};
