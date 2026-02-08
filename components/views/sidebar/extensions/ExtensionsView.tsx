
import React from 'react';

export const ExtensionsView: React.FC = () => {
  return (
    <div className="p-4 flex flex-col gap-4 overflow-hidden">
      <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Extensions</h3>
      <div className="space-y-4 overflow-y-auto">
        {[
          { name: 'Python', desc: 'Linting, Debugging...', icon: 'https://cdn.iconscout.com/icon/free/png-256/python-3521655-2945099.png', installed: true },
          { name: 'Docker', desc: 'Manage containers...', icon: 'https://cdn.iconscout.com/icon/free/png-256/docker-226091.png', installed: true },
          { name: 'Java', desc: 'Java support...', icon: 'https://cdn.iconscout.com/icon/free/png-256/java-60-1174953.png', installed: true },
        ].map(ext => (
          <div key={ext.name} className="flex gap-3 group cursor-pointer overflow-hidden">
            <div className="size-10 bg-white/10 rounded flex items-center justify-center shrink-0">
              <img src={ext.icon} className="size-6 object-contain grayscale group-hover:grayscale-0 transition-all" alt={ext.name} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-white truncate">{ext.name}</div>
              <div className="text-[10px] text-slate-500 truncate">{ext.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
