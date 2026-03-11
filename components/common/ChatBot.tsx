"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2, Info } from "lucide-react";
import { generateChatResponse } from "@/lib/actions/chat";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "bot"; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const predefinedPrompt = "What is the REACT Initiative?";
  const predefinedResponse = 
    "The REACT (Rural Empowerment and Climate Technology) Initiative is a youth-led organization focused on advancing climate resilience, humanitarian response, and sustainable development. We empower underserved and rural communities across Africa through innovative technology and community-driven action.";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handlePredefinedClick = () => {
    setMessages([
      { role: "user", text: predefinedPrompt },
      { role: "bot", text: predefinedResponse }
    ]);
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    
    // Add user message to UI
    const newMessages = [...messages, { role: "user" as const, text: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      // Format history for Gemini API
      const history = newMessages.slice(0, -1).map(msg => ({
        role: msg.role === "user" ? "user" as const : "model" as const,
        parts: [{ text: msg.text }]
      }));

      const result = await generateChatResponse(history, userMessage);

      if (result.success && result.text) {
        setMessages(prev => [...prev, { role: "bot", text: result.text }]);
      } else {
        setMessages(prev => [...prev, { role: "bot", text: "I'm sorry, I'm having trouble connecting right now." }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: "bot", text: "An error occurred. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 h-14 w-14 rounded-full bg-brand-forest text-white shadow-2xl flex items-center justify-center transition-all hover:bg-brand-dark hover:scale-110 active:scale-95 z-50 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        aria-label="Open AI Assistant"
      >
        <MessageCircle size={24} />
      </button>

      <div 
        className={`fixed bottom-6 right-6 w-[350px] sm:w-[400px] h-[550px] max-h-[85vh] bg-white rounded-[2rem] shadow-2xl border border-slate-100 flex flex-col z-50 transition-all duration-300 transform origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-50 opacity-0 pointer-events-none'}`}
      >
        {/* Header */}
        <div className="bg-brand-forest text-white p-5 rounded-t-[2rem] flex items-center justify-between shadow-sm relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-r from-brand-forest to-brand-teal opacity-50"></div>
          <div className="relative z-10 flex items-center gap-3">
             <div className="h-10 w-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md">
                <MessageCircle size={20} className="text-white" />
             </div>
             <div>
                <h3 className="font-black text-sm">REACT Assistant</h3>
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/70">Powered by Gemini AI</p>
             </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="relative z-10 h-8 w-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/50">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center space-y-6 text-center animate-in fade-in slide-in-from-bottom-4">
               <div className="h-16 w-16 bg-brand-cyan/10 rounded-full flex items-center justify-center text-brand-cyan">
                  <Info size={32} />
               </div>
               <div className="space-y-2 px-6">
                  <h4 className="font-black text-slate-900">Welcome to REACT!</h4>
                  <p className="text-sm font-medium text-slate-500">I'm an AI assistant. How can I help you today?</p>
               </div>
               <button 
                  onClick={handlePredefinedClick}
                  className="px-6 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:border-brand-forest hover:text-brand-forest shadow-sm transition-all"
               >
                 👋 {predefinedPrompt}
               </button>
            </div>
          ) : (
            <>
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div 
                    className={`max-w-[85%] rounded-2xl p-4 text-sm font-medium shadow-sm leading-relaxed ${
                      msg.role === "user" 
                        ? 'bg-brand-forest text-white rounded-tr-sm' 
                        : 'bg-white border border-slate-100 text-slate-700 rounded-tl-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[85%] rounded-2xl rounded-tl-sm p-4 bg-white border border-slate-100 shadow-sm flex items-center gap-2">
                     <Loader2 size={16} className="animate-spin text-brand-forest" />
                     <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Thinking</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-slate-100 rounded-b-[2rem]">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="flex items-center gap-2"
          >
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
              className="flex-1 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-cyan/20 transition-all"
            />
            <button 
              type="submit"
              disabled={!input.trim() || isLoading}
              className="h-11 w-11 rounded-xl bg-brand-forest text-white flex items-center justify-center hover:bg-brand-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0 shadow-sm"
            >
              <Send size={16} className="ml-0.5" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
