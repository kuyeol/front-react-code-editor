
import React, { useState, useRef, useEffect } from 'react';
import { TerminalTabType } from '../../App.tsx';

interface TerminalProps {
  activeTab: TerminalTabType;
  onTabChange: (tab: TerminalTabType) => void;
  onAction: (name: string) => void;
}

interface TerminalLine {
  id: string;
  type: 'input' | 'output';
  content: string;
  cwd?: string;
}

export const Terminal: React.FC<TerminalProps> = ({ activeTab, onTabChange, onAction }) => {
  const [history, setHistory] = useState<TerminalLine[]>([
    { id: '1', type: 'output', content: 'Docker Cloud Editor Terminal v1.0.0' },
    { id: '2', type: 'output', content: 'Type "help" to see available commands.' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when history updates
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  // Focus input when tab changes or history updates
  useEffect(() => {
    if (activeTab === 'terminal' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [activeTab, history]);

  const executeCommand = async (command: string): Promise<string> => {
    // Mock Response for demonstration
    return new Promise((resolve) => {
      setTimeout(() => {
        const cmd = command.trim();
        if (cmd === 'help') return resolve('Available commands: help, clear, ls, whoami, python3, docker');
        if (cmd === 'ls') return resolve('app.py  docker-compose.yml  Dockerfile  src/  config/');
        if (cmd === 'whoami') return resolve('root');
        if (cmd === 'python3 --version' || cmd === 'python3') return resolve('Python 3.10.2');
        if (cmd === '') return resolve('');
        resolve(`bash: ${cmd}: command not found`);
      }, 300); // Simulate network latency
    });
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isProcessing) {
      const command = inputValue;
      
      const userLine: TerminalLine = {
        id: Date.now().toString(),
        type: 'input',
        content: command,
        cwd: '/app'
      };
      
      setHistory(prev => [...prev, userLine]);
      setInputValue('');
      setIsProcessing(true);

      if (command.trim() === 'clear') {
        setHistory([]);
        setIsProcessing(false);
        return;
      }

      try {
        const output = await executeCommand(command);
        if (output) {
          setHistory(prev => [...prev, {
            id: (Date.now() + 1).toString(),
            type: 'output',
            content: output
          }]);
        }
      } catch (error) {
         setHistory(prev => [...prev, {
            id: (Date.now() + 1).toString(),
            type: 'output',
            content: "Error executing command."
          }]);
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const handleContainerClick = () => {
    if (activeTab === 'terminal') {
      inputRef.current?.focus();
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'terminal':
        return (
          <div 
            className="flex-1 overflow-y-auto bg-[#0a0c10] p-4 font-mono text-[13px] leading-relaxed text-slate-300 select-text cursor-text"
            ref={scrollRef}
            onClick={handleContainerClick}
          >
            {history.map((line) => (
              <div key={line.id} className="mb-1 break-words whitespace-pre-wrap">
                {line.type === 'input' ? (
                  <div className="flex flex-wrap gap-x-2">
                    <span className="text-green-500 font-bold select-none whitespace-nowrap">root@docker-cloud-ide:</span>
                    <span className="text-blue-400 select-none whitespace-nowrap">{line.cwd}#</span>
                    <span className="text-slate-100">{line.content}</span>
                  </div>
                ) : (
                  <div className="text-slate-400">{line.content}</div>
                )}
              </div>
            ))}
            <div className="flex gap-2 items-center">
              <span className="text-green-500 font-bold select-none whitespace-nowrap">root@docker-cloud-ide:</span>
              <span className="text-blue-400 select-none whitespace-nowrap">/app#</span>
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isProcessing}
                className="flex-1 bg-transparent border-none outline-none text-slate-100 p-0 m-0 w-full min-w-[50px]"
                autoComplete="off"
                spellCheck="false"
              />
            </div>
            {isProcessing && <div className="text-slate-500 animate-pulse mt-1">Processing...</div>}
          </div>
        );
      case 'output':
        return <div className="p-4 text-slate-500 italic text-xs font-mono">No build output available. Waiting for triggers...</div>;
      case 'debug':
        return <div className="p-4 text-slate-500 italic text-xs font-mono">Debug console ready. Use 'inspect' or 'log' variables.</div>;
      case 'problems':
        return (
          <div className="p-4 flex flex-col items-center justify-center text-slate-500 gap-3 h-full opacity-60">
            <span className="material-symbols-outlined !text-[48px]">check_circle</span>
            <span className="text-sm font-medium tracking-tight">Zero problems detected in current workspace.</span>
          </div>
        );
    }
  };

  return (
    <div className="h-full flex flex-col border-t border-border-color bg-background-dark overflow-hidden">
      <div className="flex items-center gap-6 px-4 border-b border-border-color h-9 text-[11px] uppercase tracking-wider font-bold text-slate-500 shrink-0 select-none">
        {[
          { id: 'terminal', label: 'Terminal' },
          { id: 'output', label: 'Output' },
          { id: 'debug', label: 'Debug' },
          { id: 'problems', label: 'Problems', count: 0 },
        ].map(tab => (
          <button 
            key={tab.id}
            className={`h-full flex items-center gap-1.5 cursor-pointer transition-all border-b-2 whitespace-nowrap px-1 ${activeTab === tab.id ? 'text-white border-primary' : 'border-transparent hover:text-white'}`} 
            onClick={() => onTabChange(tab.id as TerminalTabType)}
          >
            {tab.label} {tab.count !== undefined && tab.count > 0 && <span className="bg-red-500/20 text-red-500 px-1.5 rounded ml-1 text-[10px]">{tab.count}</span>}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-3 shrink-0">
          <span className="material-symbols-outlined !text-[18px] cursor-pointer hover:text-white transition-colors" title="New Terminal" onClick={() => onAction('New Terminal')}>add</span>
          <span className="material-symbols-outlined !text-[18px] cursor-pointer hover:text-white transition-colors" title="Clear Terminal" onClick={() => { setHistory([]); onAction('Clear'); }}>delete_sweep</span>
          <span className="material-symbols-outlined !text-[18px] cursor-pointer hover:text-white transition-colors" title="Close Panel" onClick={() => onAction('Hide')}>close</span>
        </div>
      </div>
      {renderContent()}
    </div>
  );
};
