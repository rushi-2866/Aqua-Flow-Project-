
import React from 'react';
import { X, AlertCircle, Info, AlertTriangle, Clock } from 'lucide-react';
import { MOCK_ALERTS } from '../constants';

interface AlertPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AlertPanel: React.FC<AlertPanelProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-[70] animate-in fade-in duration-300"
          onClick={onClose}
        ></div>
      )}
      
      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-sm bg-black z-[80] shadow-[0_0_100px_rgba(0,0,0,1)] transition-transform duration-500 ease-in-out border-l border-zinc-900 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-black text-white uppercase tracking-tighter neon-glow">Network Events</h2>
              <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">Active System Monitoring</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-zinc-900 rounded-xl transition-colors text-zinc-600"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-4 pr-1 custom-scrollbar">
            {MOCK_ALERTS.map((alert) => (
              <div 
                key={alert.id}
                className="p-4 rounded-2xl border border-zinc-900 bg-zinc-950 hover:bg-black transition-all group"
              >
                <div className="flex gap-3">
                  <div className={`mt-0.5 ${
                    alert.type === 'error' ? 'text-rose-500' :
                    alert.type === 'warning' ? 'text-amber-500' :
                    'text-sky-500'
                  }`}>
                    {alert.type === 'error' ? <AlertCircle size={18} /> :
                     alert.type === 'warning' ? <AlertTriangle size={18} /> :
                     <Info size={18} />}
                  </div>
                  <div>
                    <h4 className="text-[11px] font-black text-white uppercase tracking-wider">{alert.title}</h4>
                    <p className="text-[10px] text-zinc-500 mt-1 leading-relaxed font-bold">{alert.message}</p>
                    <div className="flex items-center gap-1.5 mt-3">
                      <Clock size={12} className="text-zinc-700" />
                      <span className="text-[9px] font-black text-zinc-700 uppercase tracking-widest">{alert.timestamp}</span>
                      <span className={`ml-auto text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${
                        alert.priority === 'High' ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20 shadow-[0_0_10px_rgba(244,63,94,0.1)]' : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                      }`}>{alert.priority}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-auto pt-6 border-t border-zinc-900">
            <button className="w-full py-4 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
              Acknowledge All
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
