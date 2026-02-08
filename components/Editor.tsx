
import React, { useMemo } from 'react';
import SimpleCodeEditor from 'https://esm.sh/react-simple-code-editor@0.13.1?deps=react@18.2.0';
import Prism from 'https://esm.sh/prismjs@1.29.0';
import 'https://esm.sh/prismjs@1.29.0/components/prism-clike';
import 'https://esm.sh/prismjs@1.29.0/components/prism-javascript';
import 'https://esm.sh/prismjs@1.29.0/components/prism-python';
import 'https://esm.sh/prismjs@1.29.0/components/prism-java';
import 'https://esm.sh/prismjs@1.29.0/components/prism-yaml';
import 'https://esm.sh/prismjs@1.29.0/components/prism-bash';
import 'https://esm.sh/prismjs@1.29.0/components/prism-docker';

interface EditorProps {
  activeFile: string;
  openFiles: string[];
  content: string;
  onCodeChange: (code: string) => void;
  onFileSelect: (fileName: string) => void;
  onCloseTab: (fileName: string) => void;
  onAction: (name: string) => void;
}

export const Editor: React.FC<EditorProps> = ({ 
  activeFile, 
  openFiles, 
  content, 
  onCodeChange, 
  onFileSelect, 
  onCloseTab, 
  onAction 
}) => {

  const highlight = (code: string) => {
    let grammar = Prism.languages.clike;
    const ext = activeFile.split('.').pop()?.toLowerCase();
    
    if (ext === 'py') grammar = Prism.languages.python;
    else if (ext === 'java') grammar = Prism.languages.java;
    else if (ext === 'yml' || ext === 'yaml') grammar = Prism.languages.yaml;
    else if (ext === 'sh' || ext === 'env') grammar = Prism.languages.bash;
    else if (activeFile === 'Dockerfile') grammar = Prism.languages.docker;
    
    // Fallback if grammar isn't loaded yet
    return Prism.highlight(code, grammar || Prism.languages.clike, ext || 'text');
  };

  return (
    <div className="flex flex-1 flex-col overflow-hidden min-h-0 bg-editor-bg">
      {/* Tab Strip */}
      <div className="flex border-b border-border-color bg-sidebar-bg/50 shrink-0 overflow-x-auto no-scrollbar h-10">
        {openFiles.map(file => {
          const ext = file.split('.').pop()?.toLowerCase();
          const isActive = activeFile === file;
          return (
            <div 
              key={file}
              className={`flex items-center gap-2 border-r border-border-color px-3 text-[12px] transition-all cursor-pointer shrink-0 relative group ${isActive ? 'bg-editor-bg text-white' : 'text-slate-500 hover:bg-white/5'}`}
              onClick={() => onFileSelect(file)}
            >
              {isActive && <div className="absolute top-0 left-0 right-0 h-[2px] bg-primary"></div>}
              <span className={`material-symbols-outlined !text-[16px] ${ext === 'py' ? 'text-yellow-400' : ext === 'java' ? 'text-red-500' : ext === 'yml' ? 'text-indigo-400' : 'text-slate-400'}`}>
                {ext === 'py' ? 'code' : ext === 'yml' ? 'settings' : 'description'}
              </span>
              <span className="truncate max-w-[120px]">{file}</span>
              <span 
                className={`material-symbols-outlined !text-[14px] hover:bg-white/10 rounded p-0.5 ml-1 transition-opacity ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                onClick={(e) => { e.stopPropagation(); onCloseTab(file); }}
              >
                close
              </span>
            </div>
          );
        })}
      </div>
      
      {/* Path Breadcrumbs */}
      <div className="flex h-8 items-center px-4 text-[11px] text-slate-500 gap-2 border-b border-border-color bg-editor-bg shrink-0 font-medium">
        <span className="material-symbols-outlined !text-[14px]">folder_open</span>
        <span className="hover:text-slate-300 cursor-pointer transition-colors">workspace</span>
        <span className="material-symbols-outlined !text-[12px]">chevron_right</span>
        <span className="text-slate-300 truncate">{activeFile || 'No file selected'}</span>
      </div>

      <div className="flex-1 overflow-auto relative bg-[#0d1117]">
        {!activeFile ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-600 gap-4 bg-background-dark/50">
            <span className="material-symbols-outlined !text-[80px] opacity-10">terminal</span>
            <p className="text-sm font-medium opacity-50">Select a file from the explorer to begin editing</p>
          </div>
        ) : (
          <SimpleCodeEditor
            value={content}
            onValueChange={onCodeChange}
            highlight={highlight}
            padding={16}
            className="font-mono text-[14px] leading-relaxed"
            style={{
              fontFamily: '"Fira Code", monospace',
              fontSize: 12,
              backgroundColor: "#0d1117",
              minHeight: "100%"
            }}
            textareaClassName="focus:outline-none"
          />
        )}
      </div>
    </div>
  );
};
