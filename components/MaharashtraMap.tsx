
import React, { useState } from 'react';
import { MAHARASHTRA_DISTRICTS } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';

export const MaharashtraMap: React.FC = () => {
  const [hovered, setHovered] = useState<string | null>(null);

  const getDistrictColor = (val: number) => {
    if (val > 80) return '#06b6d4'; // aqua-500
    if (val > 60) return '#0891b2'; // aqua-600
    if (val > 40) return '#0e7490'; // aqua-700
    return '#334155'; // slate-700 (low demand)
  };

  return (
    <div className="relative w-full h-[400px] bg-zinc-50 dark:bg-slate-900 rounded-[2.5rem] overflow-hidden flex items-center justify-center border border-zinc-100 dark:border-zinc-800 transition-all">
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 p-8 relative z-10 w-full max-w-2xl">
        {MAHARASHTRA_DISTRICTS.map((district) => (
          <motion.div 
            key={district.name}
            onMouseEnter={() => setHovered(district.name)}
            onMouseLeave={() => setHovered(null)}
            whileHover={{ scale: 1.05, y: -5 }}
            className="relative group cursor-pointer"
          >
            <div 
              className="h-24 rounded-3xl transition-all duration-300 flex flex-col items-center justify-center border shadow-sm"
              style={{ 
                backgroundColor: hovered === district.name ? `${getDistrictColor(district.value)}20` : 'transparent',
                borderColor: hovered === district.name ? getDistrictColor(district.value) : 'rgba(148, 163, 184, 0.2)' 
              }}
            >
              <div 
                className="absolute bottom-0 left-0 h-1.5 rounded-b-3xl transition-all duration-700"
                style={{ 
                  width: `${district.value}%`, 
                  backgroundColor: getDistrictColor(district.value),
                  boxShadow: `0 -4px 12px ${getDistrictColor(district.value)}40`
                }}
              ></div>
              <span className="font-black text-[10px] uppercase tracking-widest text-zinc-400 group-hover:text-aqua-600 dark:group-hover:text-aqua-400 transition-colors mb-1">{district.name}</span>
              <span className="text-lg font-black text-zinc-800 dark:text-white">${district.revenue}</span>
            </div>

            <AnimatePresence>
              {hovered === district.name && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 10 }}
                  className="absolute -top-24 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-950 p-4 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 z-50 w-56 pointer-events-none"
                >
                  <p className="font-black text-xs text-zinc-900 dark:text-white uppercase tracking-tighter mb-2">{district.name} NODE HUB</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold">
                      <span className="text-zinc-400 uppercase">Demand Vol:</span>
                      <span className="text-aqua-600 dark:text-aqua-400">{district.orders.toLocaleString()} units</span>
                    </div>
                    <div className="flex justify-between text-[10px] font-bold">
                      <span className="text-zinc-400 uppercase">Status:</span>
                      <span className="text-emerald-500">STABLE FLOW</span>
                    </div>
                  </div>
                  <div className="mt-3 h-1 w-full bg-zinc-100 dark:bg-zinc-900 rounded-full overflow-hidden">
                    <div className="h-full bg-aqua-500 rounded-full" style={{ width: `${district.value}%` }}></div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <div className="absolute bottom-6 right-6 flex items-center gap-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Market Saturation</span>
        <div className="flex gap-1.5">
          {[0.2, 0.4, 0.6, 0.8, 1].map(o => (
            <div key={o} className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#06b6d4', opacity: o }}></div>
          ))}
        </div>
      </div>
    </div>
  );
};
