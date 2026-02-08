
import React from 'react';
import { ViewType } from '../App.tsx';
import { ActivityBarMenuItems } from './activity-bar/ActivityBarMenuItems.tsx';
import { AccountItem } from './activity-bar/AccountItem.tsx';

interface ActivityBarProps {
  activeView: ViewType;
  isTerminalOpen: boolean;
  onViewChange: (view: ViewType) => void;
  onAction: (name: string) => void;
}

export const ActivityBar: React.FC<ActivityBarProps> = ({ activeView, isTerminalOpen, onViewChange, onAction }) => {
  return (
    <nav className="flex w-12 flex-col items-center gap-2 border-r border-border-color bg-sidebar-bg py-4 text-slate-500 shrink-0">
      <ActivityBarMenuItems 
        activeView={activeView} 
        isTerminalOpen={isTerminalOpen} 
        onViewChange={onViewChange} 
      />
      <AccountItem 
        isActive={activeView === 'account'} 
        onClick={() => onViewChange('account')} 
      />
    </nav>
  );
};
