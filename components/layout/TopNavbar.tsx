
import React, { useState, useRef, useEffect } from 'react';

interface SubMenuItem {
  label: string;
  shortcut?: string;
  action: string;
  divider?: boolean;
}

interface MenuData {
  [key: string]: SubMenuItem[];
}

interface TopNavbarProps {
  onAction: (name: string) => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({ onAction }) => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const menuData: MenuData = {
    'File': [
      { label: 'New Text File', shortcut: 'Ctrl+N', action: 'New File' },
      { label: 'New File...', shortcut: 'Ctrl+Alt+Windows+N', action: 'New File Prompt' },
      { label: 'New Window', shortcut: 'Ctrl+Shift+N', action: 'New Window' },
      { divider: true, label: '', action: '' },
      { label: 'Open File...', shortcut: 'Ctrl+O', action: 'Open File' },
      { label: 'Open Folder...', shortcut: 'Ctrl+K Ctrl+O', action: 'Open Folder' },
      { divider: true, label: '', action: '' },
      { label: 'Save', shortcut: 'Ctrl+S', action: 'Save' },
      { label: 'Save As...', shortcut: 'Ctrl+Shift+S', action: 'Save As' },
      { label: 'Save All', action: 'Save All' },
      { divider: true, label: '', action: '' },
      { label: 'Close Editor', shortcut: 'Ctrl+F4', action: 'Close Editor' },
      { label: 'Close Window', shortcut: 'Alt+F4', action: 'Close Window' },
    ],
    'Edit': [
      { label: 'Undo', shortcut: 'Ctrl+Z', action: 'Undo' },
      { label: 'Redo', shortcut: 'Ctrl+Y', action: 'Redo' },
      { divider: true, label: '', action: '' },
      { label: 'Cut', shortcut: 'Ctrl+X', action: 'Cut' },
      { label: 'Copy', shortcut: 'Ctrl+C', action: 'Copy' },
      { label: 'Paste', shortcut: 'Ctrl+V', action: 'Paste' },
      { divider: true, label: '', action: '' },
      { label: 'Find', shortcut: 'Ctrl+F', action: 'Find' },
      { label: 'Replace', shortcut: 'Ctrl+H', action: 'Replace' },
    ],
    'Selection': [
      { label: 'Select All', shortcut: 'Ctrl+A', action: 'Select All' },
      { label: 'Expand Selection', shortcut: 'Shift+Alt+Right', action: 'Expand Selection' },
      { label: 'Shrink Selection', shortcut: 'Shift+Alt+Left', action: 'Shrink Selection' },
      { divider: true, label: '', action: '' },
      { label: 'Copy Line Up', shortcut: 'Shift+Alt+Up', action: 'Copy Line Up' },
      { label: 'Copy Line Down', shortcut: 'Shift+Alt+Down', action: 'Copy Line Down' },
    ],
    'View': [
      { label: 'Explorer', shortcut: 'Ctrl+Shift+E', action: 'View: Explorer' },
      { label: 'Search', shortcut: 'Ctrl+Shift+F', action: 'View: Search' },
      { label: 'Source Control', shortcut: 'Ctrl+Shift+G', action: 'View: Git' },
      { label: 'Extensions', shortcut: 'Ctrl+Shift+X', action: 'View: Extensions' },
      { divider: true, label: '', action: '' },
      { label: 'Terminal', shortcut: 'Ctrl+`', action: 'Toggle Terminal' },
      { label: 'Output', shortcut: 'Ctrl+Shift+U', action: 'View: Output' },
      { divider: true, label: '', action: '' },
      { label: 'Full Screen', shortcut: 'F11', action: 'Full Screen' },
    ],
    'Go': [
      { label: 'Back', shortcut: 'Alt+Left', action: 'Go Back' },
      { label: 'Forward', shortcut: 'Alt+Right', action: 'Go Forward' },
      { divider: true, label: '', action: '' },
      { label: 'Go to File...', shortcut: 'Ctrl+P', action: 'Go to File' },
      { label: 'Go to Symbol...', shortcut: 'Ctrl+Shift+O', action: 'Go to Symbol' },
      { label: 'Go to Line/Column...', shortcut: 'Ctrl+G', action: 'Go to Line' },
    ],
    'Run': [
      { label: 'Start Debugging', shortcut: 'F5', action: 'Start Debugging' },
      { label: 'Run Without Debugging', shortcut: 'Ctrl+F5', action: 'Run' },
      { label: 'Stop Debugging', shortcut: 'Shift+F5', action: 'Stop Debugging' },
      { divider: true, label: '', action: '' },
      { label: 'Install Dependencies', action: 'Pip Install' },
    ],
    'Terminal': [
      { label: 'New Terminal', shortcut: 'Ctrl+Shift+`', action: 'New Terminal' },
      { label: 'Split Terminal', shortcut: 'Ctrl+Shift+5', action: 'Split Terminal' },
      { divider: true, label: '', action: '' },
      { label: 'Run Active File', action: 'Run File' },
      { label: 'Run Selected Text', action: 'Run Selected' },
    ]
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMenuClick = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const handleSubMenuClick = (action: string) => {
    onAction(action);
    setOpenMenu(null);
  };

  return (
    <header className="flex items-center justify-between border-b border-border-color bg-sidebar-bg px-4 py-2 shrink-0 h-12 z-50">
      <div className="flex items-center gap-6" ref={menuRef}>
        <div className="flex items-center gap-2 text-primary cursor-pointer" onClick={() => onAction('Dashboard')}>
          <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>cloud_done</span>
          <h2 className="text-sm font-bold tracking-tight text-white whitespace-nowrap">Docker Cloud Editor</h2>
        </div>
        <div className="hidden lg:flex items-center gap-1 text-[11px] font-medium text-slate-400 uppercase tracking-wide">
          {Object.keys(menuData).map(menu => (
            <div key={menu} className="relative">
              <button 
                className={`px-3 py-1.5 rounded transition-colors ${openMenu === menu ? 'bg-white/10 text-white' : 'hover:text-white hover:bg-white/5'}`}
                onClick={() => handleMenuClick(menu)}
                onMouseEnter={() => openMenu && setOpenMenu(menu)}
              >
                {menu}
              </button>
              
              {openMenu === menu && (
                <div className="absolute top-full left-0 mt-0.5 w-64 bg-sidebar-bg border border-border-color rounded shadow-2xl py-1 z-[100] animate-in fade-in zoom-in-95 duration-100">
                  {menuData[menu].map((item, index) => (
                    item.divider ? (
                      <div key={index} className="h-px bg-border-color my-1 mx-2" />
                    ) : (
                      <button
                        key={index}
                        className="w-full flex items-center justify-between px-3 py-1.5 text-[12px] normal-case text-slate-300 hover:bg-primary hover:text-white transition-colors"
                        onClick={() => handleSubMenuClick(item.action)}
                      >
                        <span>{item.label}</span>
                        {item.shortcut && <span className="text-[10px] text-slate-500 group-hover:text-white/70 ml-4">{item.shortcut}</span>}
                      </button>
                    )
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <div 
          className="hidden md:flex items-center gap-1.5 rounded bg-background-dark border border-border-color px-3 py-1 text-[11px] cursor-pointer hover:border-slate-500 transition-colors"
          onClick={() => onAction('Container Config')}
        >
          <span className="size-2 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-slate-400">Container:</span>
          <span className="text-white font-mono">web-api-prod_1</span>
        </div>
        <div className="h-6 w-px bg-border-color mx-2 hidden sm:block"></div>
        <button 
          className="flex items-center gap-1.5 rounded bg-primary px-3 py-1.5 text-xs font-bold text-white hover:bg-blue-600 transition-colors shadow-sm"
          onClick={() => onAction('Run & Syncing Build')}
        >
          <span className="material-symbols-outlined !text-[14px]">play_arrow</span>
          Run & Sync
        </button>
        <button 
          className="flex items-center justify-center rounded bg-sidebar-bg border border-border-color p-1.5 text-slate-300 hover:text-white transition-colors"
          onClick={() => onAction('Settings')}
        >
          <span className="material-symbols-outlined">settings</span>
        </button>
        <div 
          className="size-8 rounded-full bg-slate-700 overflow-hidden border border-border-color cursor-pointer hover:ring-2 hover:ring-primary transition-all"
          onClick={() => onAction('User Profile')}
        >
          <img className="w-full h-full object-cover" src="https://picsum.photos/seed/user123/64/64" alt="User Profile" />
        </div>
      </div>
    </header>
  );
};
