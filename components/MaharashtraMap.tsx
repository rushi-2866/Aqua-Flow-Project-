
import React, { useState } from 'react';
import { MAHARASHTRA_DISTRICTS } from '../constants';

export const MaharashtraMap: React.FC = () => {
  const [hovered, setHovered] = useState<string | null>(null);

  const getDistrictColor = (val: number) => {
    if (val > 80) return '#00f2ff'; // full neon
    if (val > 60) return '#00bfff'; // deep sky
    if (val > 40) return '#0077ff'; // primary blue
    return '#1a1a1a'; // dormant
  };

  return (
    <div className="relative w-full h-[400px] bg-black rounded-2xl overflow-hidden flex items-center justify-center border border-zinc-900">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00f2ff" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="grid grid-cols-3 gap-6 p-8 relative z-10 w-full max-w-2xl">
        {MAHARASHTRA_DISTRICTS.map((district) => (
          <div 
            key={district.name}
            onMouseEnter={() => setHovered(district.name)}
            onMouseLeave={() => setHovered(null)}
            className="group cursor-pointer"
          >
            <div 
              className="relative h-24 rounded-2xl transition-all duration-300 flex flex-col items-center justify-center border border-zinc-800 shadow-sm hover:scale-105"
              style={{ backgroundColor: `${getDistrictColor(district.value)}10`, borderColor: hovered === district.name ? '#00f2ff' : '#1a1a1a' }}
            >
              <div 
                className="absolute bottom-0 left-0 h-1 rounded-b-xl transition-all duration-500 shadow-[0_-2px_8px_rgba(0,242,255,0.4)]"
                style={{ width: `${district.value}%`, backgroundColor: getDistrictColor(district.value) }}
              ></div>
              <span className="font-black text-[10px] uppercase tracking-widest text-zinc-500 mb-1">{district.name}</span>
              <span className="text-sm font-black text-white">{district.revenue}</span>
            </div>

            {hovered === district.name && (
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-black/90 backdrop-blur-md p-3 rounded-lg shadow-[0_0_20px_rgba(0,242,255,0.2)] border border-sky-500/30 z-20 w-48 pointer-events-none animate-in fade-in zoom-in duration-200">
                <p className="font-black text-xs text-white uppercase tracking-tighter">{district.name} NODE</p>
                <div className="mt-2 space-y-1">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-zinc-500 uppercase font-black">Supply:</span>
                    <span className="text-sky-400 font-black">{district.orders.toLocaleString()} U</span>
                  </div>
                  <div className="flex justify-between text-[10px]">
                    <span className="text-zinc-500 uppercase font-black">Sync Stat:</span>
                    <span className="text-emerald-500 font-black">STABLE</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-zinc-950/80 p-2 rounded-lg border border-zinc-900">
        <span className="text-[8px] font-black text-zinc-600 uppercase">Demand Intensity</span>
        <div className="flex gap-1">
          {[0.2, 0.4, 0.6, 0.8, 1].map(o => (
            <div key={o} className="w-2 h-2 rounded-full" style={{ backgroundColor: '#00f2ff', opacity: o }}></div>
          ))}
        </div>
      </div>
    </div>
  );
};
