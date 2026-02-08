
import React from 'react';
import { ViewType } from '../../../App.tsx';
import { ExplorerItem } from './items/ExplorerItem.tsx';
import { SearchItem } from './items/SearchItem.tsx';
import { SourceControlItem } from './items/SourceControlItem.tsx';
import { ExtensionsItem } from './items/ExtensionsItem.tsx';
import { TerminalItem } from './items/TerminalItem.tsx';

interface ActivityBarMenuItemsProps {
  activeView: ViewType;
  isTerminalOpen: boolean;
  onViewChange: (view: ViewType) => void;
}

export const ActivityBarMenuItems: React.FC<ActivityBarMenuItemsProps> = ({ activeView, isTerminalOpen, onViewChange }) => {
  return (
    <>
      <ExplorerItem
        isActive={activeView === 'explorer'}
        onClick={() => onViewChange('explorer')}
      />
      <SearchItem
        isActive={activeView === 'search'}
        onClick={() => onViewChange('search')}
      />
      <SourceControlItem
        isActive={activeView === 'git'}
        onClick={() => onViewChange('git')}
      />
      <ExtensionsItem
        isActive={activeView === 'extensions'}
        onClick={() => onViewChange('extensions')}
      />
      <TerminalItem
        isActive={isTerminalOpen}
        onClick={() => onViewChange('terminal')}
      />
    </>
  );
};
