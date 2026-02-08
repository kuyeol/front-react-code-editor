
import React, { useState, useCallback, useEffect } from 'react';
import { TopNavbar } from './components/layout/TopNavbar.tsx';
import { ActivityBar } from './components/layout/ActivityBar.tsx';
import { Sidebar } from './components/layout/Sidebar.tsx';
import { StatusBar } from './components/layout/StatusBar.tsx';
import { Editor } from './components/views/editor/Editor.tsx';
import { Terminal } from './components/views/terminal/Terminal.tsx';
import { Preview } from './components/views/preview/Preview.tsx';
import { Toast } from './components/ui/Toast.tsx';
import { fetchProjectFiles, saveFileContent } from './services/fileService.ts';
import { useLayoutResize } from './hooks/useLayoutResize.ts';

export type ViewType = 'explorer' | 'search' | 'git' | 'extensions' | 'terminal' | 'account';
export type TerminalTabType = 'terminal' | 'output' | 'debug' | 'problems';

const App: React.FC = () => {
  const [activeFile, setActiveFile] = useState('app.py');
  const [openFiles, setOpenFiles] = useState(['app.py', 'docker-compose.yml']);
  const [filesContent, setFilesContent] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [activeView, setActiveView] = useState<ViewType>('explorer');
  const [activeTerminalTab, setActiveTerminalTab] = useState<TerminalTabType>('terminal');
  const [notifications, setNotifications] = useState<{ id: number, message: string }[]>([]);

  // Layout States extracted to hook
  const { sidebarWidth, terminalHeight, previewWidth, isResizing, startResizing } = useLayoutResize();
  
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isTerminalVisible, setIsTerminalVisible] = useState(true);
  const [isPreviewVisible, setIsPreviewVisible] = useState(true);

  const notify = useCallback((message: string) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  }, []);

  // Fetch data on mount
  useEffect(() => {
    const loadFiles = async () => {
      try {
        const data = await fetchProjectFiles();
        setFilesContent(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Load failed:", error);
        notify("Failed to load project files.");
        setIsLoading(false);
      }
    };
    loadFiles();
  }, [notify]);

  const handleAction = (actionName: string) => {
    if (actionName === 'Toggle Terminal') {
      setIsTerminalVisible(!isTerminalVisible);
    } else if (actionName === 'Save') {
      handleSave();
    } else {
      notify(`${actionName} - Action executed`);
    }
  };

  const handleSave = async () => {
    if (!activeFile) return;
    notify(`Saving ${activeFile}...`);
    const result = await saveFileContent(activeFile, filesContent[activeFile]);
    if (result.success) {
      notify(`${activeFile} saved successfully.`);
    }
  };

  const handleFileSelect = (fileName: string) => {
    if (!openFiles.includes(fileName)) {
      setOpenFiles(prev => [...prev, fileName]);
    }
    setActiveFile(fileName);
  };

  const handleCloseTab = (fileName: string) => {
    const newOpenFiles = openFiles.filter(f => f !== fileName);
    setOpenFiles(newOpenFiles);
    if (activeFile === fileName && newOpenFiles.length > 0) {
      setActiveFile(newOpenFiles[newOpenFiles.length - 1]);
    } else if (newOpenFiles.length === 0) {
      setActiveFile('');
    }
  };

  const handleCodeChange = (newCode: string) => {
    setFilesContent(prev => ({
      ...prev,
      [activeFile]: newCode
    }));
  };

  const handleViewToggle = (view: ViewType) => {
    if (view === 'terminal') {
      setIsTerminalVisible(!isTerminalVisible);
      return;
    }
    
    if (activeView === view && isSidebarVisible) {
      setIsSidebarVisible(false);
    } else {
      setActiveView(view);
      setIsSidebarVisible(true);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center bg-background-dark text-slate-400 font-mono gap-4">
        <div className="flex items-center gap-2 text-primary animate-pulse">
          <span className="material-symbols-outlined !text-[48px]">cloud_sync</span>
          <h1 className="text-xl font-bold text-white">Docker Cloud Editor</h1>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-48 h-1 bg-border-color rounded-full overflow-hidden">
            <div className="h-full bg-primary animate-[loading_1.5s_infinite]"></div>
          </div>
          <p className="text-[10px] uppercase tracking-widest mt-2">Connecting to Workspace...</p>
        </div>
        <style>{`
          @keyframes loading {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className={`flex h-screen flex-col bg-background-dark select-none relative ${isResizing ? 'cursor-col-resize' : ''}`}>
      <TopNavbar onAction={handleAction} />
      
      <div className="flex flex-1 overflow-hidden relative">
        <ActivityBar 
          activeView={activeView} 
          isTerminalOpen={isTerminalVisible}
          onViewChange={handleViewToggle} 
          onAction={handleAction} 
        />

        {/* Sidebar */}
        {isSidebarVisible && (
          <div style={{ width: sidebarWidth }} className="flex shrink-0 relative">
            <Sidebar 
              activeView={activeView}
              activeFile={activeFile} 
              fileNames={Object.keys(filesContent)}
              onFileSelect={handleFileSelect} 
              onAction={handleAction} 
            />
            {/* Sidebar Resize Handle */}
            <div 
              onMouseDown={startResizing('sidebar')}
              className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-primary/50 z-20 transition-colors"
            />
          </div>
        )}
        
        <main className="flex flex-1 flex-col bg-editor-bg border-r border-border-color overflow-hidden min-w-0">
          <div className="flex-1 flex flex-col min-h-0">
            <Editor 
              activeFile={activeFile} 
              openFiles={openFiles}
              content={filesContent[activeFile] || ''}
              onCodeChange={handleCodeChange}
              onFileSelect={setActiveFile}
              onCloseTab={handleCloseTab}
              onAction={handleAction} 
            />
          </div>

          {/* Terminal */}
          {isTerminalVisible && (
            <div style={{ height: terminalHeight }} className="flex flex-col relative shrink-0">
              {/* Terminal Resize Handle */}
              <div 
                onMouseDown={startResizing('terminal')}
                className="absolute top-0 left-0 right-0 h-1 cursor-row-resize hover:bg-primary/50 z-20 transition-colors"
              />
              <Terminal 
                activeTab={activeTerminalTab}
                onTabChange={setActiveTerminalTab}
                onAction={(action) => {
                  if (action === 'Hide') setIsTerminalVisible(false);
                  else handleAction(action);
                }} 
              />
            </div>
          )}
        </main>

        {/* Preview */}
        {isPreviewVisible && (
          <div style={{ width: previewWidth }} className="flex shrink-0 relative">
            {/* Preview Resize Handle */}
            <div 
              onMouseDown={startResizing('preview')}
              className="absolute left-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-primary/50 z-20 transition-colors"
            />
            <Preview onAction={(action) => handleAction(action)} />
          </div>
        )}
      </div>

      <StatusBar 
        onAction={(action) => {
          if (action === 'Toggle Terminal') setIsTerminalVisible(!isTerminalVisible);
          else handleAction(action);
        }} 
      />

      <div className="fixed bottom-10 right-4 z-[60] flex flex-col gap-2 pointer-events-none">
        {notifications.map(n => (
          <Toast key={n.id} message={n.message} />
        ))}
      </div>

      {/* Resize Overlay to prevent iframe/select interference */}
      {isResizing && <div className="fixed inset-0 z-[100] cursor-grabbing" />}
    </div>
  );
};

export default App;
