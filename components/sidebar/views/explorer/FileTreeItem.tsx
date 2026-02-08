
import React from 'react';

interface FileTreeItemProps {
  name: string;
  type: 'file' | 'folder';
  depth: number;
  isOpen?: boolean;
  isActive?: boolean;
  icon?: { name: string; color: string };
  onClick: () => void;
  children?: React.ReactNode;
}

export const FileTreeItem: React.FC<FileTreeItemProps> = ({
  name,
  type,
  depth,
  isOpen,
  isActive,
  icon,
  onClick,
  children
}) => {
  return (
    <div>
      <div
        className={`flex items-center gap-1 py-1 transition-colors cursor-pointer rounded px-2 select-none ${
          isActive 
            ? 'bg-primary/20 text-white border-l-2 border-primary' 
            : 'hover:bg-slate-800 text-slate-400 hover:text-white border-l-2 border-transparent'
        }`}
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
        onClick={(e) => {
            e.stopPropagation();
            onClick();
        }}
      >
        <span 
          className={`material-symbols-outlined !text-[16px] transition-transform ${isOpen ? 'rotate-0' : '-rotate-90'}`}
          style={{ opacity: type === 'folder' ? 1 : 0 }}
        >
          keyboard_arrow_down
        </span>
        
        {type === 'folder' ? (
           <span className={`material-symbols-outlined !text-[18px] ${isOpen ? 'text-blue-400' : 'text-blue-300'}`}>
             {isOpen ? 'folder_open' : 'folder'}
           </span>
        ) : (
           <span className={`material-symbols-outlined !text-[18px] ${icon?.color || 'text-slate-400'}`}>
             {icon?.name || 'description'}
           </span>
        )}
        
        <span className="truncate text-sm ml-1">{name}</span>
      </div>
      {isOpen && children}
    </div>
  );
};
