import React, { useState } from 'react';
import { Search, Bell, Moon, Sun, ChevronDown, Zap } from 'lucide-react';
import { Role } from '../types';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  role: Role;
  setRole: (role: Role) => void;
  onOpenAlerts: () => void;
}

export const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode, role, setRole, onOpenAlerts }) => {
  const [roleDropdown, setRoleDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between px-6 py-4 bg-black/80 backdrop-blur-xl border-b border-zinc-900 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
      <div className="flex items-center flex-1 max-w-xl">
        <div className="relative w-full group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-700 w-4 h-4 group-focus-within:text-sky-400 transition-colors" />
          <input 
            type="text" 
            placeholder="Search network nodes..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-zinc-950 border border-zinc-900 focus:border-sky-500/50 transition-all outline-none text-xs text-white placeholder-zinc-700"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button 
          className="p-2 rounded-lg hover:bg-zinc-900 text-zinc-600 dark:text-zinc-500 transition-all"
        >
          {/* Fix: Added missing Zap import to resolve reference error */}
          <Zap size={20} className="text-sky-400 opacity-50 hover:opacity-100 transition-opacity" />
        </button>

        <button 
          onClick={onOpenAlerts}
          className="relative p-2 rounded-lg hover:bg-zinc-900 text-zinc-500 transition-all"
        >
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-sky-400 rounded-full shadow-[0_0_10px_#00f2ff]"></span>
        </button>

        <div className="h-6 w-px bg-zinc-900 mx-1"></div>

        <div className="relative">
          <button 
            onClick={() => setRoleDropdown(!roleDropdown)}
            className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-xl hover:bg-zinc-900 transition-all group border border-transparent hover:border-zinc-800"
          >
            <div className="text-right hidden sm:block">
              <p className="text-xs font-black text-white uppercase tracking-tight">S. Kumar</p>
              <p className="text-[10px] text-sky-400 font-black uppercase tracking-widest">{role}</p>
            </div>
            <div className="w-8 h-8 rounded-lg bg-sky-500 p-0.5 shadow-[0_0_10px_rgba(0,242,255,0.2)] group-hover:scale-105 transition-transform">
              <img src="https://picsum.photos/id/64/40/40" alt="Avatar" className="w-full h-full rounded-[6px] object-cover grayscale brightness-125" />
            </div>
            <ChevronDown size={14} className={`text-zinc-700 transition-transform ${roleDropdown ? 'rotate-180' : ''}`} />
          </button>

          {roleDropdown && (
            <div className="absolute right-0 mt-3 w-48 bg-black rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] border border-zinc-900 py-2 animate-in fade-in slide-in-from-top-2">
              <p className="px-4 py-2 text-[9px] font-black text-zinc-600 uppercase tracking-widest">Network Authority</p>
              {(['Manufacturer', 'Wholesaler', 'Retailer'] as Role[]).map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    setRole(r);
                    setRoleDropdown(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-xs transition-colors ${role === r ? 'text-sky-400 bg-sky-500/5 font-black border-l-2 border-sky-400' : 'text-zinc-500 hover:bg-zinc-900 hover:text-white'}`}
                >
                  {r}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};