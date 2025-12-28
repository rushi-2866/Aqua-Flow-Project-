
import React, { useState } from 'react';
import { Search, Bell, Moon, Sun, ChevronDown, Zap, Settings } from 'lucide-react';
import { Role } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

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
    <header className="sticky top-0 z-40 flex items-center justify-between px-6 py-4 glass border-b border-zinc-200 dark:border-zinc-800 shadow-sm transition-all">
      <div className="flex items-center flex-1 max-w-xl">
        <div className="relative w-full group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-600 w-4 h-4 group-focus-within:text-aqua-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Search system nodes (Orders, SKU, Partners)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 focus:border-aqua-500/50 transition-all outline-none text-xs dark:text-white placeholder-zinc-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button 
          onClick={toggleDarkMode}
          className="p-2.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 transition-all active:scale-90"
        >
          {darkMode ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} />}
        </button>

        <button 
          onClick={onOpenAlerts}
          className="relative p-2.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 transition-all"
        >
          <Bell size={20} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-slate-950"></span>
        </button>

        <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-800 mx-2"></div>

        <div className="relative">
          <button 
            onClick={() => setRoleDropdown(!roleDropdown)}
            className="flex items-center gap-3 pl-3 pr-2 py-1.5 rounded-2xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all group border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700"
          >
            <div className="text-right hidden sm:block">
              <p className="text-xs font-black text-zinc-900 dark:text-white uppercase tracking-tight">S. Deshmukh</p>
              <p className="text-[10px] text-aqua-600 dark:text-aqua-400 font-black uppercase tracking-widest">{role}</p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-aqua-500 p-0.5 shadow-lg shadow-aqua-500/10 group-hover:scale-105 transition-transform overflow-hidden">
              <img src="https://picsum.photos/id/101/40/40" alt="Avatar" className="w-full h-full rounded-[10px] object-cover" />
            </div>
            <ChevronDown size={14} className={`text-zinc-400 transition-transform ${roleDropdown ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {roleDropdown && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-3 w-56 bg-white dark:bg-slate-950 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 py-3 z-50 overflow-hidden"
              >
                <div className="px-4 pb-2 mb-2 border-b border-zinc-100 dark:border-zinc-900">
                  <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Select Control Level</p>
                </div>
                {(['Manufacturer', 'Wholesaler', 'Retailer'] as Role[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      setRole(r);
                      setRoleDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-xs transition-colors relative ${
                      role === r 
                      ? 'text-aqua-600 dark:text-aqua-400 font-black bg-aqua-50 dark:bg-aqua-500/5' 
                      : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900'
                    }`}
                  >
                    {role === r && <div className="absolute left-0 top-0 bottom-0 w-1 bg-aqua-500" />}
                    {r}
                  </button>
                ))}
                <div className="h-px bg-zinc-100 dark:bg-zinc-900 my-2"></div>
                <button className="w-full text-left px-4 py-2.5 text-xs text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-900 flex items-center gap-2">
                  <Settings size={14} /> System Settings
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};
