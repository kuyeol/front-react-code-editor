
import React, { useState, useMemo } from 'react';
import { FileTreeItem } from './FileTreeItem.tsx';

interface ExplorerViewProps {
  activeFile: string;
  fileNames: string[];
  onFileSelect: (fileName: string) => void;
  onAction: (name: string) => void;
}

export const ExplorerView: React.FC<ExplorerViewProps> = ({ activeFile, fileNames, onFileSelect, onAction }) => {
  const [collapsedFolders, setCollapsedFolders] = useState<Set<string>>(new Set());

  const toggleFolder = (folderId: string) => {
    const next = new Set(collapsedFolders);
    if (next.has(folderId)) next.delete(folderId);
    else next.add(folderId);
    setCollapsedFolders(next);
  };

  const isFolderOpen = (id: string) => !collapsedFolders.has(id);

  const getFileIcon = (name: string) => {
    const ext = name.split('.').pop();
    if (ext === 'py') return { icon: 'description', color: 'text-yellow-400' };
    if (ext === 'java') return { icon: 'code', color: 'text-red-500' };
    if (name === 'docker-compose.yml') return { icon: 'settings', color: 'text-indigo-400' };
    if (name === 'Dockerfile') return { icon: 'terminal', color: 'text-sky-400' };
    if (ext === 'env') return { icon: 'tune', color: 'text-green-400' };
    return { icon: 'description', color: 'text-slate-400' };
  };

  const organizedFiles = useMemo(() => {
    const srcFiles = fileNames.filter(f => f.endsWith('.py') || f.endsWith('.java'));
    const configFiles = fileNames.filter(f => !f.endsWith('.py') && !f.endsWith('.java'));
    return { srcFiles, configFiles };
  }, [fileNames]);

  return (
    <>
      <div className="flex items-center justify-between px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-500">
        <span className="truncate">Explorer: PROJECT-SRC</span>
        <span 
          className="material-symbols-outlined !text-[16px] cursor-pointer hover:text-slate-300 transition-colors shrink-0"
          onClick={() => onAction('Explorer Options')}
        >
          more_horiz
        </span>
      </div>
      <div className="flex-1 overflow-y-auto px-1">
        <div className="space-y-0.5">
            <FileTreeItem
                name="workspace"
                type="folder"
                depth={0}
                isOpen={isFolderOpen('workspace')}
                onClick={() => toggleFolder('workspace')}
            >
                {/* Src Folder */}
                <FileTreeItem
                    name="src"
                    type="folder"
                    depth={1}
                    isOpen={isFolderOpen('src')}
                    onClick={() => toggleFolder('src')}
                >
                    {organizedFiles.srcFiles.map(file => {
                        const icon = getFileIcon(file);
                        return (
                            <FileTreeItem
                                key={file}
                                name={file}
                                type="file"
                                depth={2}
                                isActive={activeFile === file}
                                icon={{ name: icon.icon, color: icon.color }}
                                onClick={() => onFileSelect(file)}
                            />
                        );
                    })}
                </FileTreeItem>

                {/* Config Folder */}
                <FileTreeItem
                    name="config"
                    type="folder"
                    depth={1}
                    isOpen={isFolderOpen('config')}
                    onClick={() => toggleFolder('config')}
                >
                    {organizedFiles.configFiles.map(file => {
                        const icon = getFileIcon(file);
                        return (
                            <FileTreeItem
                                key={file}
                                name={file}
                                type="file"
                                depth={2}
                                isActive={activeFile === file}
                                icon={{ name: icon.icon, color: icon.color }}
                                onClick={() => onFileSelect(file)}
                            />
                        );
                    })}
                </FileTreeItem>
            </FileTreeItem>
        </div>
      </div>
    </>
  );
};
