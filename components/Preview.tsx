
import React from 'react';

interface PreviewProps {
  onAction: (name: string) => void;
}

export const Preview: React.FC<PreviewProps> = ({ onAction }) => {
  return (
    <aside className="w-full border-l border-border-color bg-sidebar-bg flex-col shrink-0 overflow-hidden flex">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border-color shrink-0">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 truncate">Live Preview</span>
        <div className="flex gap-2 shrink-0">
          <span className="material-symbols-outlined !text-[16px] cursor-pointer text-slate-500 hover:text-white transition-colors" onClick={() => onAction('Refreshing Preview')}>refresh</span>
          <span className="material-symbols-outlined !text-[16px] cursor-pointer text-slate-500 hover:text-white transition-colors" onClick={() => onAction('Open in New Browser Window')}>open_in_new</span>
        </div>
      </div>
      <div className="flex-1 bg-white p-4 overflow-hidden">
        <div className="rounded border border-slate-200 overflow-hidden shadow-sm h-full flex flex-col">
          <div className="bg-slate-100 px-3 py-1.5 flex items-center gap-2 border-b border-slate-200 shrink-0">
            <div className="flex gap-1 shrink-0">
              <div className="size-2 rounded-full bg-red-400"></div>
              <div className="size-2 rounded-full bg-yellow-400"></div>
              <div className="size-2 rounded-full bg-green-400"></div>
            </div>
            <div className="flex-1 bg-white rounded border border-slate-200 text-[9px] py-0.5 px-2 text-slate-400 truncate font-mono cursor-pointer hover:bg-slate-50 transition-colors">
              localhost:8080/api/v1/status
            </div>
          </div>
          <div className="flex-1 bg-slate-50 flex flex-col items-center justify-center text-center p-6 min-h-0 overflow-y-auto">
            <div className="bg-primary/10 p-4 rounded-full mb-4 shrink-0">
              <span className="material-symbols-outlined !text-[40px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>analytics</span>
            </div>
            <h4 className="text-slate-800 font-bold text-sm">Container Running</h4>
            <p className="text-slate-500 text-[11px] mt-2 max-w-[180px]">API is responding correctly on port 8080.</p>
            <button className="mt-6 px-5 py-2 bg-primary hover:bg-blue-600 transition-colors text-white rounded shadow-md text-[11px] font-bold active:scale-95 transform duration-100 shrink-0" onClick={() => onAction('Refreshing Stats & Metrics')}>
              Refresh Stats
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
