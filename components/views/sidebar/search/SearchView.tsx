
import React from 'react';

export const SearchView: React.FC = () => {
  return (
    <div className="p-4 flex flex-col gap-4">
      <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Search</h3>
      <div className="relative">
        <input 
          type="text" 
          placeholder="Search..." 
          className="w-full bg-background-dark border border-border-color rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-primary"
        />
      </div>
      <div className="text-[11px] text-slate-500 italic">Type to search across files...</div>
    </div>
  );
};
