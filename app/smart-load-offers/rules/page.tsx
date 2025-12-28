import React from 'react';
import { ShieldCheck, Plus, Trash2, Save, Info } from 'lucide-react';
import { useSmartLoadStore } from '../../../store/smartLoadStore';

export const OfferRulesPage: React.FC = () => {
  const { rules, updateRule } = useSmartLoadStore();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter italic">Discount Rule Engine</h1>
          <p className="text-slate-500 font-bold text-sm mt-2">Configure automated incentives based on remaining vehicle capacity.</p>
        </div>
        <button className="px-6 py-3 bg-primary-600 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-lg hover:bg-primary-500 transition-all flex items-center gap-2">
          <Plus size={16} /> Add Logic Node
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-slate-950">
            <tr className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 border-b border-slate-100 dark:border-slate-800">
              <th className="px-10 py-6">Incentive Node</th>
              <th className="px-10 py-6">Min. Volume Requirement</th>
              <th className="px-10 py-6">Reward %</th>
              <th className="px-10 py-6">Operation Status</th>
              <th className="px-10 py-6 text-right">Settings</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {rules.map((rule) => (
              <tr key={rule.id} className="group hover:bg-slate-50 dark:hover:bg-slate-950 transition-all">
                <td className="px-10 py-8">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-primary-600 group-hover:text-white transition-all">
                      <ShieldCheck size={18} />
                    </div>
                    <span className="text-sm font-black text-slate-900 dark:text-white uppercase">{rule.id}</span>
                  </div>
                </td>
                <td className="px-10 py-8">
                   <div className="flex items-center gap-2">
                     <span className="text-xl font-black text-slate-900 dark:text-white italic">{rule.minQuantity}L</span>
                     <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Bottles</span>
                   </div>
                </td>
                <td className="px-10 py-8">
                   <span className="text-2xl font-black text-emerald-500 italic">{rule.discountPercentage}% OFF</span>
                </td>
                <td className="px-10 py-8">
                  <button 
                    onClick={() => updateRule(rule.id, { isActive: !rule.isActive })}
                    className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border-2 transition-all ${
                      rule.isActive 
                      ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                      : 'bg-slate-50 text-slate-400 border-slate-100'
                    }`}
                  >
                    {rule.isActive ? 'RUNNING' : 'DISABLED'}
                  </button>
                </td>
                <td className="px-10 py-8 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2.5 bg-slate-100 dark:bg-slate-800 text-slate-400 rounded-lg hover:text-primary-600 transition-colors">
                      <Save size={16} />
                    </button>
                    <button className="p-2.5 bg-slate-100 dark:bg-slate-800 text-slate-400 rounded-lg hover:text-rose-500 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-8 bg-blue-50 dark:bg-blue-900/10 rounded-[3rem] border border-blue-100 dark:border-blue-900/20 flex gap-6 items-start">
        <div className="p-3 bg-blue-100 dark:bg-blue-800 text-blue-600 rounded-2xl">
          <Info size={24} />
        </div>
        <div>
          <h4 className="text-sm font-black text-blue-900 dark:text-blue-100 uppercase tracking-widest">Business Intelligence Note</h4>
          <p className="text-xs font-bold text-blue-800/60 dark:text-blue-200/60 mt-2 leading-relaxed">
            These rules are applied instantly when the system scans a route. High discount percentages (30%+) are recommended for routes with &gt;40% wasted capacity to recover logistics overheads quickly.
          </p>
        </div>
      </div>

      <div className="p-8 bg-slate-900 dark:bg-slate-950 rounded-[3rem] border border-slate-800 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
         <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-primary-600/20 text-primary-400 rounded-3xl flex items-center justify-center border border-primary-500/20">
               <ShieldCheck size={32} />
            </div>
            <div>
               <h4 className="text-lg font-black uppercase tracking-tighter italic">Global Load Threshold</h4>
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">Offers are only triggered when wasted space &gt; 800L</p>
            </div>
         </div>
         <div className="flex items-center gap-4">
            <input type="range" className="w-48 accent-primary-500" defaultValue={800} min={500} max={2000} />
            <span className="text-2xl font-black italic tabular-nums">800L</span>
         </div>
      </div>
      
      <footer className="pt-10 border-t border-slate-100 dark:border-slate-900 text-center">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">NIKS-AQUA | Powered by QLOAX Infotech</p>
      </footer>
    </div>
  );
};