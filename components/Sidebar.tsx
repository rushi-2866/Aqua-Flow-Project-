
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
  Waves
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
  { id: 'orders', label: 'Orders', icon: <ShoppingCart size={20} /> },
  { id: 'inventory', label: 'Inventory', icon: <Package size={20} /> },
  { id: 'payments', label: 'Payments', icon: <CreditCard size={20} /> },
  { id: 'partners', label: 'Partners', icon: <Users size={20} /> },
  { id: 'logistics', label: 'Logistics', icon: <Truck size={20} /> },
  { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={20} /> },
  { id: 'reports', label: 'Reports', icon: <FileText size={20} /> },
];

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed, activeTab, setActiveTab }) => {
  return (
    <motion.div 
      initial={false}
      animate={{ width: collapsed ? 80 : 256 }}
      className="fixed left-0 top-0 h-full bg-black border-r border-zinc-900 z-50 flex flex-col overflow-hidden shadow-[10px_0_30px_rgba(0,0,0,0.5)]"
    >
      <div className="p-6 flex items-center justify-between h-24 flex-shrink-0">
        <div className="flex items-center gap-3 overflow-hidden whitespace-nowrap min-w-0">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-10 h-10 rounded-2xl bg-sky-500 flex-shrink-0 flex items-center justify-center text-black shadow-[0_0_20px_rgba(0,242,255,0.4)]"
          >
            <Waves size={24} />
          </motion.div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex flex-col min-w-0"
              >
                <span className="font-black text-xl tracking-tighter text-white leading-none truncate">AquaFlow</span>
                <span className="text-[10px] font-black text-sky-400 tracking-widest uppercase mt-0.5">CORE OS</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-4 space-y-1.5 custom-scrollbar">
        {navItems.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            whileTap={{ scale: 0.97 }}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all group relative overflow-hidden ${
              activeTab === item.id 
              ? 'bg-sky-500 text-black shadow-[0_0_25px_rgba(0,242,255,0.2)]' 
              : 'text-zinc-600 hover:bg-zinc-900/50 hover:text-white'
            }`}
          >
            <div className={`flex-shrink-0 transition-all duration-300 ${activeTab === item.id ? 'text-black' : 'group-hover:text-sky-400'}`}>
              {item.icon}
            </div>
            
            {!collapsed && (
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`text-xs font-black tracking-widest uppercase whitespace-nowrap transition-colors ${activeTab === item.id ? 'text-black' : 'group-hover:text-white'}`}
              >
                {item.label}
              </motion.span>
            )}
            
            {activeTab === item.id && !collapsed && (
               <motion.div 
                layoutId="activeIndicator"
                className="absolute right-4 w-1 h-4 rounded-full bg-black shadow-[0_0_8px_black]"
               />
            )}
          </motion.button>
        ))}
      </nav>

      <div className="p-4 flex-shrink-0 border-t border-zinc-900">
        <motion.button
          whileHover={{ x: collapsed ? 2 : -2 }}
          onClick={() => setCollapsed(!collapsed)}
          className="w-full p-3 rounded-2xl bg-zinc-900/50 text-zinc-600 hover:text-sky-400 transition-all flex items-center justify-center border border-zinc-900"
        >
          {collapsed ? <ChevronRight size={20} /> : <div className="flex items-center gap-2 overflow-hidden"><ChevronLeft size={20} /> <span className="text-[10px] font-black uppercase tracking-widest">Dock System</span></div>}
        </motion.button>
      </div>
    </motion.div>
  );
};
