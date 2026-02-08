
import React from 'react';

interface StatusBarProps {
  onAction: (name: string) => void;
}

export const StatusBar: React.FC<StatusBarProps> = ({ onAction }) => {
  return (
    <footer className="flex h-6 items-center justify-between bg-primary px-3 text-[10px] font-medium text-white shrink-0 overflow-hidden z-10">
      <div className="flex items-center gap-4 h-full">
        <div 
          className="flex items-center gap-1 hover:bg-white/10 px-2 cursor-pointer h-full transition-colors"
          onClick={() => onAction('Checkout Branch')}
        >
          <span className="material-symbols-outlined !text-[14px]">sync</span>
          <span>Main*</span>
        </div>
        <div 
          className="flex items-center gap-1 hover:bg-white/10 px-2 cursor-pointer h-full transition-colors"
          onClick={() => onAction('Show Problems')}
        >
          <span className="material-symbols-outlined !text-[14px]">error</span>
          <span>0</span>
          <span className="material-symbols-outlined !text-[14px] ml-1">warning</span>
          <span>0</span>
        </div>
        <div 
          className="hidden sm:flex items-center gap-1.5 px-2 h-full hover:bg-white/10 cursor-pointer transition-colors"
          onClick={() => onAction('CPU Usage History')}
        >
          <span className="material-symbols-outlined !text-[14px]">memory</span>
          <span>CPU: 12%</span>
          <div className="h-1.5 w-12 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-white w-[12%]"></div>
          </div>
        </div>
        <div 
          className="hidden md:flex items-center gap-1.5 px-2 h-full hover:bg-white/10 cursor-pointer transition-colors"
          onClick={() => onAction('RAM Usage History')}
        >
          <span className="material-symbols-outlined !text-[14px]">storage</span>
          <span>RAM: 256MB / 1GB</span>
          <div className="h-1.5 w-12 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-white w-[25%]"></div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 h-full">
        <div 
          className="hidden sm:flex items-center gap-1 px-2 h-full hover:bg-white/10 transition-colors cursor-pointer"
          onClick={() => onAction('Port Forwarding Config')}
        >
          <span className="material-symbols-outlined !text-[14px]">lan</span>
          <span>8080:80 (TCP)</span>
        </div>
        <div 
          className="hidden lg:flex items-center gap-1 px-2 h-full hover:bg-white/10 transition-colors cursor-pointer"
          onClick={() => onAction('Change File Encoding')}
        >
          <span>UTF-8</span>
        </div>
        <div 
          className="flex items-center gap-1 px-2 h-full hover:bg-white/10 transition-colors cursor-pointer"
          onClick={() => onAction('Switch Interpreter')}
        >
          <span>Python 3.10.2</span>
        </div>
        <div 
          className="flex items-center gap-1 px-2 h-full hover:bg-white/10 transition-colors cursor-pointer"
          onClick={() => onAction('Show Notifications')}
        >
          <span className="material-symbols-outlined !text-[14px]">notifications</span>
        </div>
      </div>
    </footer>
  );
};
