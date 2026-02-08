
import React from 'react';
import { ViewType } from '../../App.tsx';
import { ExplorerView } from '../views/sidebar/explorer/ExplorerView.tsx';
import { SearchView } from '../views/sidebar/search/SearchView.tsx';
import { GitView } from '../views/sidebar/git/GitView.tsx';
import { ExtensionsView } from '../views/sidebar/extensions/ExtensionsView.tsx';

interface SidebarProps {
  activeView: ViewType;
  activeFile: string;
  fileNames: string[];
  onFileSelect: (fileName: string) => void;
  onAction: (name: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeView, activeFile, fileNames, onFileSelect, onAction }) => {
  return (
    <aside className="w-full flex flex-col border-r border-border-color bg-sidebar-bg shrink-0 overflow-hidden">
      {activeView === 'explorer' && (
        <ExplorerView 
          activeFile={activeFile} 
          fileNames={fileNames} 
          onFileSelect={onFileSelect} 
          onAction={onAction} 
        />
      )}
      {activeView === 'search' && <SearchView />}
      {activeView === 'git' && <GitView />}
      {activeView === 'extensions' && <ExtensionsView />}
      {activeView === 'account' && <div className="p-6 text-center text-slate-400 text-xs">User settings & accounts</div>}
    </aside>
  );
};
