
import React from 'react';

export const GitView: React.FC = () => {
  return (
    <div className="p-4 flex flex-col gap-4">
      <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Source Control</h3>
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between text-xs text-slate-300 bg-white/5 p-2 rounded">
          <span>Changes</span>
          <span className="bg-primary/40 text-[10px] px-1.5 rounded">3</span>
        </div>
        <div className="pl-4 space-y-1 mt-2">
          <div className="text-[11px] text-slate-400 flex items-center justify-between group cursor-pointer hover:text-white">
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="material-symbols-outlined !text-[14px] text-yellow-400 shrink-0">description</span>
              <span className="truncate">app.py</span>
            </div>
            <span className="text-yellow-500 font-bold pr-2 shrink-0">M</span>
          </div>
        </div>
      </div>
      <button className="w-full bg-primary text-white py-1.5 rounded text-xs font-bold hover:bg-blue-600 transition-colors">
        Commit
      </button>
    </div>
  );
};
