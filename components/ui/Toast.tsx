
import React from 'react';

interface ToastProps {
  message: string;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  return (
    <div className="bg-primary/90 text-white px-4 py-2 rounded shadow-lg border border-white/20 backdrop-blur-sm text-xs font-medium animate-in fade-in slide-in-from-right-4 duration-300 pointer-events-auto flex items-center gap-2">
      <span className="material-symbols-outlined !text-[16px]">info</span>
      {message}
    </div>
  );
};
