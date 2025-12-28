
import React, { useState, useEffect, useMemo } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip, ResponsiveContainer,
  BarChart, Bar, Cell, PieChart, Pie
} from 'recharts';
import { 
  TrendingUp, TrendingDown, Package, ShoppingCart, 
  RefreshCcw, Clock, Activity, Waves, Zap, ShieldCheck,
  UserCheck, CreditCard, Truck, Search,
  MapPin, Navigation, Award, Calendar, AlertTriangle,
  FileText, Download, Eye, CheckCircle, FileSpreadsheet,
  Users, Wallet, Map as MapIcon, ChevronRight, Star
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
  const [liveKpiData, setLiveKpiData] = useState<KPIData[]>([]);
  const [productionTick, setProductionTick] = useState(1204520);
  
  useEffect(() => {
    // Force dark mode as default for the neon aesthetic
    document.documentElement.classList.add('dark');
  }, []);

  useEffect(() => {
    setLiveKpiData(INITIAL_KPIS[role] || []);
  }, [role]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProductionTick(prev => prev + Math.floor(Math.random() * 30));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const StatusBadge = ({ status }: { status: string }) => {
    const styles: Record<string, string> = {
      'Delivered': 'bg-sky-500/10 text-sky-400 border border-sky-500/30',
      'High': 'bg-sky-500/10 text-sky-400 border border-sky-500/30',
      'Medium': 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30',
      'Low': 'bg-rose-500/10 text-rose-400 border border-rose-500/30',
      'Paid': 'bg-sky-500/10 text-sky-400 border border-sky-500/30',
      'Overdue': 'bg-rose-500/10 text-rose-400 border border-rose-500/30',
      'Pending': 'bg-amber-500/10 text-amber-400 border border-amber-500/30',
      'Approved': 'bg-blue-500/10 text-blue-400 border border-blue-500/30',
      'Dispatched': 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/30',
      'Active': 'bg-sky-400/10 text-sky-300 border border-sky-400/30',
      'Partially Paid': 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/30',
    };
    return (
      <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded shadow-sm whitespace-nowrap ${styles[status] || 'bg-zinc-800 text-zinc-400 border border-zinc-700'}`}>
        {status}
      </span>
    );
  };

  const OrdersView = () => (
    <div className="bg-zinc-950 rounded-[2.5rem] border border-zinc-900 p-6 md:p-8 shadow-2xl">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h3 className="text-2xl font-black text-white neon-glow">Order Lifecycle</h3>
          <p className="text-sm text-zinc-500 font-medium">Real-time B2B Fulfillment Tracking</p>
        </div>
        <div className="flex flex-wrap gap-4 w-full md:w-auto">
          <div className="relative group flex-1 md:flex-initial">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 w-4 h-4" />
            <input type="text" placeholder="Track ID..." className="w-full pl-10 pr-4 py-3 bg-black rounded-2xl text-sm border border-zinc-800 focus:border-sky-500 focus:bg-zinc-900 transition-all outline-none text-white" />
          </div>
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-sky-500 rounded-2xl text-sm font-black text-black shadow-lg shadow-sky-500/20 active:scale-95 transition-transform whitespace-nowrap">
            New Order
          </button>
        </div>
      </div>
      <div className="overflow-x-auto min-w-0">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="text-left border-b border-zinc-900">
              <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-zinc-500">Order ID</th>
              <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-zinc-500">Partner</th>
              <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-zinc-500">Items</th>
              <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-zinc-500">Region</th>
              <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-zinc-500">Value</th>
              <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-zinc-500">Flow</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-900">
            {MOCK_ORDERS.map((order) => (
              <tr key={order.id} className="group hover:bg-zinc-900/50 transition-colors">
                <td className="py-5 font-bold text-sm text-zinc-300">#{order.id}</td>
                <td className="py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-black text-xs border border-sky-500/30">
                      {order.partner[0]}
                    </div>
                    <span className="text-sm font-black text-zinc-200">{order.partner}</span>
                  </div>
                </td>
                <td className="py-5 text-xs font-bold text-zinc-500 truncate max-w-[150px]">{order.items}</td>
                <td className="py-5 text-sm font-black text-zinc-400">{order.region}</td>
                <td className="py-5 text-sm font-black text-white">${order.amount.toLocaleString()}</td>
                <td className="py-5"><StatusBadge status={order.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const InventoryView = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-sky-500 p-8 rounded-[2rem] text-black shadow-xl shadow-sky-500/20">
          <Activity className="mb-4 opacity-70" />
          <p className="text-xs font-black uppercase tracking-widest opacity-80">Global Reservoir</p>
          <h3 className="text-4xl font-black mt-1">842,400 L</h3>
          <p className="text-xs mt-4 font-bold flex items-center gap-1">OPTIMAL BUFFER REACHED</p>
        </div>
        <div className="bg-zinc-950 p-8 rounded-[2rem] border border-zinc-900 shadow-sm">
          <Package className="mb-4 text-sky-400" />
          <p className="text-xs font-black uppercase tracking-widest text-zinc-500">Days of Cover</p>
          <h3 className="text-4xl font-black mt-1 text-white">14.2</h3>
          <p className="text-xs mt-4 font-bold text-rose-500 flex items-center gap-1"><AlertTriangle size={14} /> Critical hubs detected</p>
        </div>
        <div className="bg-zinc-950 p-8 rounded-[2rem] border border-zinc-900 shadow-sm">
          <RefreshCcw className="mb-4 text-cyan-400" />
          <p className="text-xs font-black uppercase tracking-widest text-zinc-500">Returns Ratio</p>
          <h3 className="text-4xl font-black mt-1 text-white">0.42%</h3>
          <p className="text-xs mt-4 font-bold text-sky-400">EXCELLENCE RATING</p>
        </div>
      </div>
      <div className="bg-zinc-950 rounded-[2.5rem] border border-zinc-900 p-6 md:p-8 shadow-sm">
        <h3 className="text-xl font-black text-white mb-6 neon-glow">SKU Level Matrix</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_INVENTORY.map((item) => (
            <div key={item.id} className="p-6 rounded-3xl bg-black border border-zinc-900 transition-all hover:border-sky-500 group">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-black text-white text-lg">{item.name}</h4>
                  <p className="text-[10px] font-black text-sky-400 uppercase tracking-widest">{item.sku}</p>
                </div>
                <StatusBadge status={item.status} />
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-[10px] font-black uppercase text-zinc-500 mb-1">
                    <span>Stock Level</span>
                    <span className="text-zinc-300">{item.stock.toLocaleString()} L</span>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((item.stock/item.reorderPoint)*50, 100)}%` }}
                      className={`h-full ${item.status === 'Low' ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]' : 'bg-sky-500 shadow-[0_0_8px_rgba(14,165,233,0.5)]'}`} 
                    ></motion.div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-bold text-zinc-500 flex items-center gap-2">
                    <MapPin size={12} /> {item.location}
                  </p>
                  <button className="text-[10px] font-black text-sky-400 uppercase hover:underline">Restock</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const PaymentsView = () => (
    <div className="bg-zinc-950 rounded-[2.5rem] border border-zinc-900 p-8 shadow-2xl">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h3 className="text-2xl font-black text-white neon-glow">Financial Ledger</h3>
          <p className="text-sm text-zinc-500 font-medium">B2B Settlements & Credit Tracking</p>
        </div>
        <div className="flex gap-4">
          <div className="px-6 py-3 bg-black border border-zinc-900 rounded-2xl">
            <p className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">Total Receivables</p>
            <p className="text-xl font-black text-emerald-400">$142,800</p>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-zinc-900">
              <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-zinc-500">Invoice</th>
              <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-zinc-500">Partner</th>
              <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-zinc-500">Amount</th>
              <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-zinc-500">Due Date</th>
              <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-zinc-500">Status</th>
              <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-zinc-500">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-900">
            {MOCK_PAYMENTS.map((payment) => (
              <tr key={payment.id} className="group hover:bg-zinc-900/50 transition-colors">
                <td className="py-5 text-sm font-bold text-zinc-400">#{payment.id}</td>
                <td className="py-5 font-black text-zinc-200">{payment.partner}</td>
                <td className="py-5 font-black text-white">${payment.amount.toLocaleString()}</td>
                <td className="py-5 text-sm text-zinc-500 font-bold">{payment.due}</td>
                <td className="py-5"><StatusBadge status={payment.status} /></td>
                <td className="py-5">
                  <button className="p-2 bg-zinc-900 rounded-lg text-sky-400 hover:bg-sky-500 hover:text-black transition-all">
                    <Download size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const PartnersView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {MOCK_PARTNERS.map((partner) => (
        <motion.div 
          key={partner.id}
          whileHover={{ y: -5 }}
          className="bg-zinc-950 p-8 rounded-[2.5rem] border border-zinc-900 shadow-sm relative group overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 blur-3xl -mr-10 -mt-10 group-hover:bg-sky-500/10 transition-all"></div>
          <div className="flex justify-between items-start mb-6">
            <div className="w-14 h-14 bg-sky-500 rounded-2xl flex items-center justify-center text-black shadow-lg">
              <Users size={28} />
            </div>
            <div className="flex items-center gap-1 bg-black px-3 py-1 rounded-full border border-zinc-900">
              <Star size={12} className="text-amber-400 fill-amber-400" />
              <span className="text-xs font-black text-white">{partner.rating}</span>
            </div>
          </div>
          <h3 className="text-xl font-black text-white mb-1">{partner.name}</h3>
          <p className="text-[10px] font-black text-sky-400 uppercase tracking-widest mb-6">{partner.type} • {partner.region}</p>
          
          <div className="space-y-4 mb-8">
            <div>
              <div className="flex justify-between text-[10px] font-black uppercase text-zinc-500 mb-1">
                <span>Reliability</span>
                <span className="text-zinc-300">{partner.reliability}%</span>
              </div>
              <div className="w-full h-1.5 bg-zinc-900 rounded-full">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${partner.reliability}%` }}></div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-zinc-900">
             {partner.badge && (
               <span className="text-[9px] font-black uppercase bg-sky-500/10 text-sky-400 px-3 py-1 rounded-full border border-sky-500/20">{partner.badge}</span>
             )}
             <button className="text-[10px] font-black uppercase text-zinc-400 hover:text-white flex items-center gap-1 ml-auto">
               Profile <ChevronRight size={12} />
             </button>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const LogisticsView = () => (
    <div className="space-y-8">
      <div className="bg-zinc-950 rounded-[2.5rem] border border-zinc-900 p-8 shadow-sm">
        <div className="flex justify-between items-center mb-10">
          <h3 className="text-2xl font-black text-white neon-glow">Route Optimizer</h3>
          <div className="flex gap-2">
            <div className="flex items-center gap-2 px-4 py-2 bg-black rounded-xl border border-zinc-900">
              <Truck size={16} className="text-sky-400" />
              <span className="text-xs font-black text-white uppercase">14 Active Fleet</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-4">
            {['Mumbai - Pune Express', 'Thane - Nashik Hub', 'Nagpur South Node'].map((route, i) => (
              <div key={i} className="p-6 bg-black rounded-3xl border border-zinc-900 flex items-center gap-6 hover:border-sky-500/50 transition-all cursor-pointer group">
                <div className="w-12 h-12 rounded-2xl bg-zinc-900 flex items-center justify-center text-sky-400 group-hover:bg-sky-500 group-hover:text-black transition-all">
                  <Navigation size={24} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-black text-white">{route}</p>
                  <p className="text-[10px] text-zinc-500 font-bold uppercase">Estimated T-Arrival: 2h 15m</p>
                </div>
                <div className="text-right">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 ml-auto mb-1 animate-pulse"></div>
                  <p className="text-[10px] font-black text-emerald-500 uppercase">On Time</p>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-black rounded-[2rem] border border-zinc-900 p-6 flex flex-col justify-center items-center text-center">
             <MapIcon size={48} className="text-zinc-800 mb-4" />
             <p className="text-sm font-black text-white">Interactive Fleet Tracking</p>
             <p className="text-xs text-zinc-500 mt-2">Connecting to GPS Satellite Cluster...</p>
             <button className="mt-8 px-8 py-3 bg-sky-500 text-black font-black rounded-2xl text-xs uppercase tracking-widest shadow-lg shadow-sky-500/20">Open Live Map</button>
          </div>
        </div>
      </div>
    </div>
  );

  const ReportsView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        { title: 'Q1 Logistics Audit', type: 'PDF', date: '2024-03-01' },
        { title: 'Partner Reliability Index', type: 'XLSX', date: '2024-02-28' },
        { title: 'SKU Demand Forecast', type: 'CSV', date: '2024-03-02' },
        { title: 'Financial Settlement Sync', type: 'PDF', date: '2024-03-03' },
      ].map((report, i) => (
        <motion.div 
          key={i}
          whileHover={{ scale: 1.02 }}
          className="bg-zinc-950 p-6 rounded-3xl border border-zinc-900 group hover:border-sky-500/30 transition-all"
        >
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${
            report.type === 'PDF' ? 'bg-rose-500/10 text-rose-500' : 
            report.type === 'XLSX' ? 'bg-emerald-500/10 text-emerald-500' : 
            'bg-sky-500/10 text-sky-500'
          }`}>
            {report.type === 'PDF' ? <FileText size={24} /> : report.type === 'XLSX' ? <FileSpreadsheet size={24} /> : <FileText size={24} />}
          </div>
          <h4 className="text-sm font-black text-white mb-1">{report.title}</h4>
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-6">Generated: {report.date}</p>
          <div className="flex gap-2">
            <button className="flex-1 py-2 bg-black border border-zinc-900 rounded-xl text-[10px] font-black text-zinc-400 hover:text-white transition-all uppercase">View</button>
            <button className="px-3 py-2 bg-sky-500 text-black rounded-xl hover:bg-sky-400 transition-all"><Download size={14} /></button>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const dashboardContent = useMemo(() => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {liveKpiData.map((kpi, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-zinc-950 p-6 rounded-[2rem] shadow-sm border border-zinc-900 transition-all hover:border-sky-500/50 group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 rounded-2xl bg-sky-500/10 text-sky-400 group-hover:bg-sky-500 group-hover:text-black transition-all">
                {kpi.icon}
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold ${kpi.trend >= 0 ? 'text-sky-400' : 'text-rose-500'}`}>
                {kpi.trend >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {Math.abs(kpi.trend)}%
              </div>
            </div>
            <p className="text-sm font-medium text-zinc-500 mb-1">{kpi.label}</p>
            <h3 className="text-2xl font-black text-white tracking-tight tabular-nums">{kpi.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 bg-zinc-950 p-6 md:p-8 rounded-[2rem] shadow-sm border border-zinc-900 min-h-[450px] w-full min-w-0" style={{ minWidth: 0 }}>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black text-white neon-glow">Supply Velocity</h3>
            <div className="flex items-center gap-2 p-1 bg-black rounded-xl border border-zinc-900">
              <button className="px-4 py-2 text-[10px] font-black bg-sky-500 text-black shadow-lg rounded-lg">LIVE</button>
              <button className="px-4 py-2 text-[10px] font-bold text-zinc-500">PAST</button>
            </div>
          </div>
          <div className="h-[350px] w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ORDER_TRENDS}>
                <defs>
                  <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00f2ff" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00f2ff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1a1a1a" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#4a4a4a', fontSize: 10}} dy={10} />
                <YAxis hide />
                <ChartTooltip 
                  contentStyle={{ borderRadius: '16px', border: '1px solid #333', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.5)', backgroundColor: '#000', color: '#fff' }} 
                />
                <Area type="monotone" dataKey="orders" stroke="#00f2ff" strokeWidth={3} fillOpacity={1} fill="url(#colorOrders)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-zinc-950 p-8 rounded-[2rem] shadow-sm border border-zinc-900 relative overflow-hidden flex flex-col justify-between min-h-[450px]">
          <div className="relative z-10">
            <h3 className="text-xl font-black text-white mb-6">Operations Hub</h3>
            <div className="space-y-6">
              <div>
                <p className="text-[10px] font-black uppercase text-zinc-500 tracking-widest mb-1">Total Production Volume</p>
                <p className="text-4xl font-black text-sky-400 tabular-nums neon-glow">{productionTick.toLocaleString()} <span className="text-lg text-zinc-700">L</span></p>
              </div>
              <div className="flex items-center gap-4 p-4 bg-black rounded-2xl border border-zinc-900">
                <div className="w-10 h-10 bg-sky-500/10 text-sky-400 flex items-center justify-center rounded-xl border border-sky-500/20">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-zinc-400 uppercase">System Integrity</p>
                  <p className="text-sm font-bold text-sky-300">99.98% SEALED</p>
                </div>
              </div>
            </div>
          </div>
          <Waves className="absolute -bottom-10 -right-10 w-48 h-48 text-sky-500/5 pointer-events-none" />
          <div className="mt-8 pt-6 border-t border-zinc-900">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-white text-black rounded-2xl font-black text-xs transition-all shadow-xl shadow-white/5"
            >
              MAINTENANCE PROTOCOL
            </motion.button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-zinc-950 p-6 md:p-8 rounded-[2rem] shadow-sm border border-zinc-900 min-h-[400px] w-full min-w-0" style={{ minWidth: 0 }}>
          <h3 className="text-lg font-black text-white mb-6 neon-glow">Market Density Heatmap</h3>
          <MaharashtraMap />
        </div>
        <div className="bg-zinc-950 p-6 md:p-8 rounded-[2rem] shadow-sm border border-zinc-900 min-h-[400px] w-full min-w-0" style={{ minWidth: 0 }}>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-black text-white">Live Node Requests</h3>
            <span className="text-[10px] font-black text-sky-400 uppercase tracking-widest animate-pulse">Live Link Active</span>
          </div>
          <div className="space-y-3 overflow-y-auto max-h-[350px] pr-2 custom-scrollbar">
            {MOCK_ORDERS.map((order) => (
              <motion.div 
                key={order.id} 
                whileHover={{ x: 5 }}
                className="flex items-center justify-between p-4 bg-black rounded-2xl transition-colors border border-zinc-900 hover:border-sky-500/30"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-zinc-900 rounded-xl flex items-center justify-center border border-zinc-800">
                    <Truck size={20} className="text-sky-400" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-zinc-100 truncate w-32 md:w-48">{order.partner}</p>
                    <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">#{order.id}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-white">${order.amount.toLocaleString()}</p>
                  <StatusBadge status={order.status} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ), [liveKpiData, productionTick]);

  const AnalyticsView = () => (
    <div className="space-y-8">
      <div className="bg-zinc-950 rounded-[2.5rem] border border-zinc-900 p-8 shadow-sm">
        <h3 className="text-2xl font-black text-white mb-8 neon-glow">Predictive Growth</h3>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ORDER_TRENDS}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1a1a1a" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#4a4a4a', fontSize: 10}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#4a4a4a', fontSize: 10}} />
              <ChartTooltip cursor={{fill: '#1a1a1a'}} contentStyle={{ backgroundColor: '#000', border: '1px solid #333' }} />
              <Bar dataKey="revenue" fill="#00f2ff" radius={[4, 4, 0, 0]} barSize={32} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return dashboardContent;
      case 'orders': return <OrdersView />;
      case 'inventory': return <InventoryView />;
      case 'payments': return <PaymentsView />;
      case 'partners': return <PartnersView />;
      case 'logistics': return <LogisticsView />;
      case 'analytics': return <AnalyticsView />;
      case 'reports': return <ReportsView />;
      default: return (
        <div className="h-[60vh] flex flex-col items-center justify-center text-center">
          <Activity size={60} className="text-sky-500 mb-6 animate-pulse neon-glow" />
          <h2 className="text-3xl font-black text-white">Module Initializing</h2>
          <p className="text-zinc-500 mt-2 uppercase tracking-widest text-[10px] font-black">Connecting to regional node cluster...</p>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen transition-colors duration-500 bg-black text-white dark">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <motion.div 
        animate={{ marginLeft: collapsed ? 80 : 256 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="min-h-screen flex flex-col"
      >
        <Header 
          darkMode={darkMode} 
          toggleDarkMode={() => {}} 
          role={role} 
          setRole={setRole} 
          onOpenAlerts={() => setIsAlertOpen(true)} 
        />
        
        <main className="p-4 md:p-8 pb-32 max-w-[1700px] mx-auto w-full flex-1 min-w-0">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-6"
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-sky-500 animate-pulse shadow-[0_0_8px_#00f2ff]"></div>
                <span className="text-[10px] font-black uppercase tracking-widest text-sky-400">Node Cluster: Maharashtra North</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-none mb-3">
                Command <span className="text-sky-400 neon-glow">Terminal</span>
              </h1>
              <p className="text-zinc-500 font-bold flex items-center gap-2 text-sm">
                <Calendar size={16} className="text-zinc-700" /> Active Sync • Nodes: 42
              </p>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="text-right hidden sm:block">
                <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest leading-none mb-2">System State</p>
                <div className="flex items-center gap-3 justify-end">
                   <div className="px-3 py-1 bg-sky-500/10 text-sky-400 text-[10px] font-black rounded-lg border border-sky-500/20">Uptime: 99.9%</div>
                   <button className="p-3 bg-zinc-950 rounded-2xl shadow-sm border border-zinc-900 text-sky-400 hover:rotate-180 transition-all duration-500">
                    <RefreshCcw size={20} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
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
