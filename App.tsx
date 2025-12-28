
import React, { useState, useEffect, useMemo } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';
import { 
  TrendingUp, TrendingDown, Package, ShoppingCart, 
  RefreshCcw, Activity, Waves, ShieldCheck,
  CreditCard, Truck, Search, MapPin, Navigation,
  Calendar, FileText, Download, CheckCircle, FileSpreadsheet,
  Users, ChevronRight, Star, ArrowUpRight, Zap, AlertTriangle,
  LayoutGrid, PlusSquare, History, UserCheck, HardDrive, Shield
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Chatbot } from './components/Chatbot';
import { AlertPanel } from './components/AlertPanel';
import { MaharashtraMap } from './components/MaharashtraMap';
import { Role, KPIData } from './types';
import { 
  INITIAL_KPIS, 
  ORDER_TRENDS, 
  MOCK_INVENTORY,
  MOCK_ORDERS,
  MOCK_PAYMENTS,
  MOCK_PARTNERS
} from './constants';

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [role, setRole] = useState<Role>('Manufacturer');
  const [darkMode, setDarkMode] = useState(true);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [productionTick, setProductionTick] = useState(1204520);
  const [revenueTick, setRevenueTick] = useState(450000);

  // Initialize Theme
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Live Simulation Tickers
  useEffect(() => {
    const interval = setInterval(() => {
      setProductionTick(prev => prev + Math.floor(Math.random() * 5));
      setRevenueTick(prev => prev + (Math.random() > 0.7 ? Math.random() * 50 : 0));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const StatusBadge = ({ status }: { status: string }) => {
    const styles: Record<string, string> = {
      'Delivered': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30',
      'High': 'bg-aqua-100 text-aqua-700 dark:bg-aqua-500/10 dark:text-aqua-400 border border-aqua-200 dark:border-aqua-500/30',
      'Medium': 'bg-cyan-100 text-cyan-700 dark:bg-cyan-500/10 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-500/30',
      'Low': 'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400 border border-rose-200 dark:border-rose-500/30',
      'Paid': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30',
      'Overdue': 'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400 border border-rose-200 dark:border-rose-500/30',
      'Pending': 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30',
      'Approved': 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30',
      'Dispatched': 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/30',
    };
    return (
      <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-lg shadow-sm whitespace-nowrap transition-all ${styles[status] || 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700'}`}>
        {status}
      </span>
    );
  };

  const OrdersView = () => (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-slate-950 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-900 p-8 shadow-2xl transition-all">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h3 className="text-2xl font-black text-zinc-900 dark:text-white dark:neon-glow uppercase">Order Fulfillment Hub</h3>
          <p className="text-sm text-zinc-500 font-medium italic">Active B2B Node Lifecycle Tracking</p>
        </div>
        <div className="flex flex-wrap gap-4 w-full md:w-auto">
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-aqua-500 hover:bg-aqua-400 rounded-2xl text-sm font-black text-white shadow-xl shadow-aqua-500/20 active:scale-95 transition-all">
            + Initiate Sales Order
          </button>
        </div>
      </div>
      <div className="overflow-x-auto rounded-3xl border border-zinc-100 dark:border-zinc-900">
        <table className="w-full min-w-[900px]">
          <thead className="bg-zinc-50 dark:bg-zinc-900/50">
            <tr className="text-left">
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-500">System UID</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-500">Partner Entity</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-500">Territory</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-500">Capacity</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-500">Lifecycle</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-500">Gross Val</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-900">
            {MOCK_ORDERS.map((order) => (
              <tr key={order.id} className="group hover:bg-zinc-50 dark:hover:bg-zinc-900/30 transition-all">
                <td className="px-6 py-6 font-bold text-sm text-zinc-400 dark:text-zinc-500">#{order.id}</td>
                <td className="px-6 py-6">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-aqua-100 dark:bg-aqua-500/10 text-aqua-600 dark:text-aqua-400 flex items-center justify-center font-black text-xs border border-aqua-200 dark:border-aqua-500/20 shadow-sm">
                      {order.partner[0]}
                    </div>
                    <span className="text-sm font-black text-zinc-800 dark:text-zinc-200">{order.partner}</span>
                  </div>
                </td>
                <td className="px-6 py-6 text-sm font-black text-zinc-500 dark:text-zinc-400">{order.region}</td>
                <td className="px-6 py-6 text-xs font-bold text-zinc-500 dark:text-zinc-500 italic">{order.items}</td>
                <td className="px-6 py-6"><StatusBadge status={order.status} /></td>
                <td className="px-6 py-6 text-sm font-black text-zinc-900 dark:text-white tabular-nums">${order.amount.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );

  const InventoryView = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-br from-blue-500 to-blue-800 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-blue-500/20 border border-blue-400/20">
          <Activity className="mb-4 opacity-70" />
          <p className="text-xs font-black uppercase tracking-widest opacity-80">NIKS Global Supply</p>
          <h3 className="text-4xl font-black mt-2 tabular-nums">842,400 L</h3>
          <p className="text-xs mt-4 font-bold bg-white/20 py-1.5 px-3 rounded-xl inline-block backdrop-blur-md">SYSTEM OPTIMIZED</p>
        </motion.div>
        <div className="bg-white dark:bg-slate-950 p-8 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-900 shadow-sm flex flex-col justify-between">
          <div>
            <Package className="mb-4 text-aqua-500" />
            <p className="text-xs font-black uppercase tracking-widest text-zinc-500">Days of Cover (Avg)</p>
            <h3 className="text-4xl font-black mt-2 text-zinc-900 dark:text-white">14.2</h3>
          </div>
          <p className="text-xs mt-4 font-bold text-rose-500 flex items-center gap-1.5"><AlertTriangle size={14} /> 2 critical stock points</p>
        </div>
        <div className="bg-white dark:bg-slate-950 p-8 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-900 shadow-sm flex flex-col justify-between">
          <div>
            <RefreshCcw className="mb-4 text-emerald-500" />
            <p className="text-xs font-black uppercase tracking-widest text-zinc-500">Cycle Return Rate</p>
            <h3 className="text-4xl font-black mt-2 text-zinc-900 dark:text-white">0.42%</h3>
          </div>
          <p className="text-xs mt-4 font-bold text-emerald-500 uppercase tracking-widest">Efficiency Goal: Met</p>
        </div>
      </div>
      
      <div className="bg-white dark:bg-slate-950 rounded-[3rem] border border-zinc-200 dark:border-zinc-900 p-8">
        <h3 className="text-xl font-black text-zinc-900 dark:text-white mb-8">SKU Stock Matrix (Real-Time)</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_INVENTORY.map((item) => (
            <div key={item.id} className="p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800 hover:border-aqua-500/50 transition-all group cursor-pointer">
              <div className="flex justify-between items-start mb-5">
                <div>
                  <h4 className="font-black text-zinc-900 dark:text-white text-lg leading-tight uppercase tracking-tight">{item.name}</h4>
                  <p className="text-[10px] font-black text-aqua-600 dark:text-aqua-400 uppercase tracking-widest mt-1">{item.sku}</p>
                </div>
                <StatusBadge status={item.status} />
              </div>
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between text-[10px] font-black uppercase text-zinc-400 mb-2">
                    <span>Active Reservoir</span>
                    <span className="text-zinc-800 dark:text-zinc-200">{item.stock.toLocaleString()} L</span>
                  </div>
                  <div className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((item.stock/15000)*100, 100)}%` }}
                      className={`h-full rounded-full transition-all ${item.status === 'Low' ? 'bg-rose-500' : 'bg-aqua-500 shadow-[0_0_10px_rgba(6,182,212,0.3)]'}`} 
                    ></motion.div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <p className="text-[10px] font-bold text-zinc-500 flex items-center gap-1.5 uppercase">
                    <MapPin size={12} className="text-aqua-500" /> {item.location}
                  </p>
                  <button className="text-[10px] font-black text-aqua-600 dark:text-aqua-400 uppercase hover:underline">Node Logs</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const dashboardContent = useMemo(() => {
    const kpis = INITIAL_KPIS[role] || [];
    return (
      <div className="space-y-8">
        {/* Owner Quick Action Command Center */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
           {[
             { label: 'Issue Invoice', icon: <PlusSquare size={18}/>, color: 'bg-emerald-500' },
             { label: 'Fleet Status', icon: <Navigation size={18}/>, color: 'bg-blue-500' },
             { label: 'Partner Ledger', icon: <History size={18}/>, color: 'bg-amber-500' },
             { label: 'System Backup', icon: <HardDrive size={18}/>, color: 'bg-zinc-600' }
           ].map((action, i) => (
             <motion.button 
               key={i}
               whileHover={{ y: -4, scale: 1.02 }}
               className="flex items-center gap-4 p-5 bg-white dark:bg-slate-900 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 shadow-sm transition-all text-left"
             >
               <div className={`w-12 h-12 ${action.color} text-white rounded-2xl flex items-center justify-center shadow-lg shadow-${action.color}/20 flex-shrink-0`}>
                 {action.icon}
               </div>
               <div>
                  <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest leading-none mb-1">Owner Action</p>
                  <p className="text-xs font-black text-zinc-900 dark:text-white uppercase tracking-tighter">{action.label}</p>
               </div>
             </motion.button>
           ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpis.map((kpi, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-slate-950 p-7 rounded-[2.5rem] shadow-sm border border-zinc-200 dark:border-zinc-900 transition-all hover:shadow-xl hover:scale-[1.02] group"
            >
              <div className="flex justify-between items-start mb-5">
                <div className="p-3.5 rounded-2xl bg-aqua-100 dark:bg-aqua-500/10 text-aqua-600 dark:text-aqua-400 group-hover:scale-110 transition-transform">
                  {kpi.icon}
                </div>
                <div className={`flex items-center gap-1.5 text-xs font-black px-2 py-1 rounded-lg ${kpi.trend >= 0 ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10' : 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10'}`}>
                  {kpi.trend >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                  {Math.abs(kpi.trend)}%
                </div>
              </div>
              <p className="text-[11px] font-black text-zinc-500 uppercase tracking-widest mb-1.5">{kpi.label}</p>
              <h3 className="text-3xl font-black text-zinc-900 dark:text-white tracking-tight tabular-nums">
                {kpi.label.includes('Revenue') || kpi.label.includes('Payments') ? (
                  `$${(idx === 1 ? revenueTick : parseFloat(kpi.value.replace('$', '').replace('K', '')) * 1000).toLocaleString()}`
                ) : kpi.value}
              </h3>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 bg-white dark:bg-slate-950 p-8 rounded-[3rem] shadow-sm border border-zinc-200 dark:border-zinc-900 min-h-[500px] w-full min-w-0">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h3 className="text-xl font-black text-zinc-900 dark:text-white dark:neon-glow uppercase tracking-tighter italic">NIKS Supply Dynamics</h3>
                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mt-1">Global Node Feed • QLOAX Analytics v1.2</p>
              </div>
              <div className="flex items-center gap-2 p-1.5 bg-zinc-100 dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                <button className="px-5 py-2 text-[10px] font-black bg-white dark:bg-slate-800 text-zinc-900 dark:text-white shadow-md rounded-xl">ACTIVE CYCLE</button>
                <button className="px-5 py-2 text-[10px] font-bold text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">MONTHLY AUDIT</button>
              </div>
            </div>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={ORDER_TRENDS}>
                  <defs>
                    <linearGradient id="colorAqua" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={darkMode ? "#1e293b" : "#f1f5f9"} />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} dy={15} />
                  <YAxis hide />
                  <ChartTooltip 
                    cursor={{ stroke: '#06b6d4', strokeWidth: 2 }}
                    contentStyle={{ borderRadius: '24px', border: '1px solid #e2e8f0', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.1)', backgroundColor: darkMode ? '#020617' : '#fff', color: darkMode ? '#fff' : '#000', padding: '16px' }} 
                  />
                  <Area type="monotone" dataKey="orders" stroke="#06b6d4" strokeWidth={4} fillOpacity={1} fill="url(#colorAqua)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-gradient-to-b from-slate-900 to-black p-8 rounded-[3rem] shadow-2xl border border-zinc-800 relative overflow-hidden flex flex-col justify-between group">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-8">
                 <Zap className="text-blue-400 fill-blue-400 group-hover:scale-110 transition-transform" size={20} />
                 <h3 className="text-lg font-black text-white uppercase tracking-tighter">NIKS Manufacturing Core</h3>
              </div>
              <div className="space-y-8">
                <div>
                  <p className="text-[10px] font-black uppercase text-zinc-500 tracking-widest mb-2">Cycle Reservoir (L)</p>
                  <p className="text-5xl font-black text-blue-400 tabular-nums neon-glow tracking-tighter italic">{productionTick.toLocaleString()}</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-5 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="w-12 h-12 bg-blue-500/10 text-blue-400 flex items-center justify-center rounded-2xl border border-blue-500/20">
                      <ShieldCheck size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Sterility Compliance</p>
                      <p className="text-sm font-black text-white uppercase italic">99.99% SECURE</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-5 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 flex items-center justify-center rounded-2xl border border-emerald-500/20">
                      <Truck size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Operational Fleet</p>
                      <p className="text-sm font-black text-white uppercase italic">88% ENGAGED</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-8 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-[2rem] font-black text-xs uppercase tracking-widest transition-all shadow-2xl shadow-blue-500/30 italic"
            >
              RUN OWNER DIAGNOSTIC
            </motion.button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-slate-950 p-8 rounded-[3rem] shadow-sm border border-zinc-200 dark:border-zinc-900 min-h-[450px]">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter italic">Territory Demand Pulse</h3>
                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Regional Heatmap • FMCG Velocity</p>
              </div>
            </div>
            <MaharashtraMap />
          </div>
          <div className="bg-white dark:bg-slate-950 p-8 rounded-[3rem] shadow-sm border border-zinc-200 dark:border-zinc-900 min-h-[450px]">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter">Live Fulfillment Stream</h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></div>
                <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest italic">Live Sink Active</span>
              </div>
            </div>
            <div className="space-y-4 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
              {MOCK_ORDERS.map((order) => (
                <motion.div 
                  key={order.id} 
                  whileHover={{ x: 8 }}
                  className="flex items-center justify-between p-5 bg-zinc-50 dark:bg-zinc-900/40 rounded-[2rem] transition-all border border-zinc-100 dark:border-zinc-800 hover:border-aqua-500/30 group"
                >
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-white dark:bg-slate-950 rounded-2xl flex items-center justify-center border border-zinc-100 dark:border-zinc-800 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <Truck size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-black text-zinc-900 dark:text-zinc-100 truncate w-32 md:w-56 uppercase">{order.partner}</p>
                      <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-0.5">#{order.id} • {order.region}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-zinc-900 dark:text-white mb-2 tabular-nums">${order.amount.toLocaleString()}</p>
                    <StatusBadge status={order.status} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Developer Footer Attribution */}
        <footer className="pt-12 pb-6 border-t border-zinc-200 dark:border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-6">
           <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-white/5 flex items-center justify-center border border-zinc-200 dark:border-white/5">
                <Shield size={20} className="text-zinc-400" />
              </div>
              <div>
                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em]">System Authentication</p>
                <p className="text-xs font-black text-zinc-900 dark:text-white uppercase italic">NIKS-AQUA SCM v1.2.0 • OWNER ACCESS</p>
              </div>
           </div>
           <div className="text-center md:text-right">
              <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Architecture & Engineering by</p>
              <div className="flex items-center justify-center md:justify-end gap-2 group cursor-help">
                 <span className="text-xs font-black text-zinc-900 dark:text-white uppercase tracking-tighter group-hover:text-aqua-500 transition-colors">QLOAX Infotech</span>
                 <div className="w-1.5 h-1.5 rounded-full bg-aqua-500 shadow-[0_0_8px_#06b6d4]"></div>
              </div>
           </div>
        </footer>
      </div>
    );
  }, [role, productionTick, revenueTick, darkMode]);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return dashboardContent;
      case 'orders': return <OrdersView />;
      case 'inventory': return <InventoryView />;
      case 'payments': return <div className="p-20 text-center text-zinc-500 font-black uppercase tracking-widest italic animate-pulse">Financial Settlements Hub Syncing...</div>;
      case 'partners': return <div className="p-20 text-center text-zinc-500 font-black uppercase tracking-widest italic animate-pulse">Network Entity Cluster Loading...</div>;
      case 'logistics': return <div className="p-20 text-center text-zinc-500 font-black uppercase tracking-widest italic animate-pulse">Fleet Synchronization Active...</div>;
      case 'analytics': return <div className="p-20 text-center text-zinc-500 font-black uppercase tracking-widest italic animate-pulse">Predictive Engine Calculating...</div>;
      case 'reports': return <div className="p-20 text-center text-zinc-500 font-black uppercase tracking-widest italic animate-pulse">Ledger Archives Syncing...</div>;
      default: return dashboardContent;
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${darkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-zinc-900'}`}>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <motion.div 
        animate={{ marginLeft: collapsed ? 88 : 280 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="min-h-screen flex flex-col"
      >
        <Header 
          darkMode={darkMode} 
          toggleDarkMode={() => setDarkMode(!darkMode)} 
          role={role} 
          setRole={setRole} 
          onOpenAlerts={() => setIsAlertOpen(true)} 
        />
        
        <main className="p-6 md:p-10 pb-32 max-w-[1800px] mx-auto w-full flex-1 min-w-0">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 md:mb-14 gap-8"
          >
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_12px_#3b82f6]"></div>
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">Owner Cluster: NIKS-AQUA HQ</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-zinc-900 dark:text-white tracking-tighter leading-none mb-4 uppercase italic">
                {activeTab === 'dashboard' ? 'Command' : activeTab.toUpperCase()} <span className="text-blue-500 dark:neon-glow">{activeTab === 'dashboard' ? 'CENTER' : 'HUB'}</span>
              </h1>
              <p className="text-zinc-500 dark:text-zinc-500 font-bold flex items-center gap-2 text-sm uppercase italic">
                <Calendar size={18} className="text-blue-500" /> System Active • {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </p>
            </div>
            
            <div className="flex items-center gap-8">
              <div className="text-right hidden sm:block">
                <p className="text-[10px] text-zinc-400 font-black uppercase tracking-widest mb-3 italic">NIKS Encryption Level: 4</p>
                <div className="flex items-center gap-3 justify-end">
                   <div className="px-4 py-1.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-black rounded-xl border border-emerald-500/20 uppercase">Core Uptime: 99.9%</div>
                   <button className="p-3.5 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 text-blue-500 hover:rotate-180 transition-all duration-700">
                    <RefreshCcw size={22} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeTab}-${role}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full min-w-0"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </motion.div>

      <Chatbot role={role} />
      <AlertPanel isOpen={isAlertOpen} onClose={() => setIsAlertOpen(false)} />
    </div>
  );
};

export default App;
