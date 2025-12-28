
import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  CreditCard, 
  Users, 
  Truck, 
  BarChart3, 
  FileText,
  ChevronLeft,
  ChevronRight,
  Droplets,
  Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Command Center', icon: <LayoutDashboard size={22} /> },
  { id: 'orders', label: 'Order Hub', icon: <ShoppingCart size={22} /> },
  { id: 'inventory', label: 'Stock Matrix', icon: <Package size={22} /> },
  { id: 'payments', label: 'Settlements', icon: <CreditCard size={22} /> },
  { id: 'partners', label: 'Partner Hub', icon: <Users size={22} /> },
  { id: 'logistics', label: 'Fleet Sync', icon: <Truck size={22} /> },
  { id: 'analytics', label: 'Intelligence', icon: <BarChart3 size={22} /> },
  { id: 'reports', label: 'Ledger Audit', icon: <FileText size={22} /> },
];

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed, activeTab, setActiveTab }) => {
  return (
    <motion.div 
      initial={false}
      animate={{ width: collapsed ? 88 : 280 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed left-0 top-0 h-full glass dark:bg-slate-950 border-r border-zinc-200 dark:border-zinc-900 z-50 flex flex-col overflow-hidden shadow-2xl transition-all"
    >
      <div className="p-8 flex items-center justify-between h-28 flex-shrink-0">
        <div className="flex items-center gap-4 overflow-hidden whitespace-nowrap min-w-0">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 10 }}
            className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 flex-shrink-0 flex items-center justify-center text-white shadow-xl shadow-blue-500/40"
          >
            <Droplets size={28} />
          </motion.div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div 
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                className="flex flex-col min-w-0"
              >
                <span className="font-black text-2xl tracking-tighter text-zinc-900 dark:text-white leading-none truncate uppercase italic">NIKS-AQUA</span>
                <span className="text-[10px] font-black text-aqua-600 dark:text-aqua-400 tracking-widest uppercase mt-1">Enterprise SCM</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2 custom-scrollbar">
        {navItems.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            whileTap={{ scale: 0.96 }}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all relative group overflow-hidden ${
              activeTab === item.id 
              ? 'bg-aqua-500 text-white shadow-xl shadow-aqua-500/20' 
              : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-aqua-600 dark:hover:text-white'
            }`}
          >
            <div className={`flex-shrink-0 transition-all duration-300 ${activeTab === item.id ? 'scale-110' : 'group-hover:scale-110'}`}>
              {item.icon}
            </div>
            
            {!collapsed && (
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`text-[11px] font-black tracking-widest uppercase whitespace-nowrap ${activeTab === item.id ? 'text-white' : ''}`}
              >
                {item.label}
              </motion.span>
            )}
            
            {activeTab === item.id && !collapsed && (
               <motion.div 
                layoutId="activeIndicator"
                className="absolute right-4 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_white]"
               />
            )}
          </motion.button>
        ))}
      </nav>

      <div className="p-6 flex-shrink-0 border-t border-zinc-100 dark:border-zinc-900 space-y-4">
        {!collapsed && (
          <div className="px-2 py-3 bg-zinc-50 dark:bg-white/5 rounded-xl border border-zinc-200 dark:border-white/5">
             <p className="text-[8px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-1">Developer Attribution</p>
             <p className="text-[10px] font-black text-zinc-900 dark:text-white flex items-center gap-2">
               <Award size={12} className="text-amber-500" /> QLOAX Infotech
             </p>
          </div>
        )}
        <motion.button
          whileHover={{ x: collapsed ? 3 : -3 }}
          onClick={() => setCollapsed(!collapsed)}
          className="w-full p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-900/50 text-zinc-500 hover:text-aqua-500 dark:hover:text-aqua-400 transition-all flex items-center justify-center border border-zinc-200 dark:border-zinc-800 shadow-sm"
        >
          {collapsed ? <ChevronRight size={22} /> : <div className="flex items-center gap-3 overflow-hidden font-black text-[10px] uppercase tracking-widest"><ChevronLeft size={20} /> System Dock</div>}
        </motion.button>
      </div>
    </motion.div>
  );
};
