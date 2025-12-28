
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, User, ShieldCheck } from 'lucide-react';
import { getAIResponse } from '../services/geminiService';
import { Role } from '../types';

interface ChatbotProps {
  role: Role;
}

interface Message {
  role: 'user' | 'bot';
  text: string;
}

export const Chatbot: React.FC<ChatbotProps> = ({ role }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: `NIKS-AI System Initialized. Standing by for owner operational queries.` }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    const botReply = await getAIResponse(userMsg, role);
    setMessages(prev => [...prev, { role: 'bot', text: botReply }]);
    setIsTyping(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {isOpen ? (
        <div className="w-[350px] h-[500px] bg-black rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col border border-zinc-900 overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
          <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-900 text-black flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-black/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white border border-white/10">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h3 className="font-black text-xs uppercase tracking-widest text-white italic">NIKS-AI Core</h3>
                <p className="text-[8px] text-blue-200 uppercase tracking-widest font-black">Powered by QLOAX</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white">
              <X size={20} />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-950">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center border ${msg.role === 'user' ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' : 'bg-black border-zinc-800 text-zinc-500'}`}>
                    {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                  </div>
                  <div className={`p-3 rounded-2xl text-xs leading-relaxed ${msg.role === 'user' ? 'bg-blue-500 text-black font-black rounded-tr-none shadow-[0_0_15px_rgba(59,130,246,0.2)]' : 'bg-black border border-zinc-900 text-zinc-300 rounded-tl-none'}`}>
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-black border border-zinc-900 p-3 rounded-2xl rounded-tl-none flex gap-1 items-center">
                  <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce"></div>
                  <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce delay-75"></div>
                  <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-zinc-900 flex gap-2 items-center bg-black">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Query NIKS-AI intelligence..."
              className="flex-1 bg-zinc-950 px-4 py-2 rounded-xl text-xs outline-none border border-zinc-900 focus:border-blue-500/50 transition-colors text-white placeholder-zinc-700"
            />
            <button 
              onClick={handleSend}
              className="p-2.5 bg-blue-500 hover:bg-blue-400 text-black rounded-xl transition-all shadow-[0_0_15px_rgba(59,130,246,0.2)] active:scale-95"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-blue-600 text-white rounded-2xl shadow-[0_0_30px_rgba(59,130,246,0.3)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all group"
        >
          <div className="absolute inset-0 rounded-2xl bg-blue-400 animate-pulse opacity-20 pointer-events-none"></div>
          <MessageSquare size={26} />
        </button>
      )}
    </div>
  );
};
