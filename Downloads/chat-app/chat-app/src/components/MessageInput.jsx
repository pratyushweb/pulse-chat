import { Send, Smile, Paperclip, MoreHorizontal, Loader2 } from "lucide-react";
import { useState } from "react";
import { useChatStore } from "../store/useChatStore";

function MessageInput() {
    const [text, setText] = useState("");
    const { sendMessage } = useChatStore();
    const [isSending, setIsSending] = useState(false);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!text.trim()) return;
        
        let messageOutput = text.trim();
        setText("");
        setIsSending(true);
        await sendMessage({ text: messageOutput });
        setIsSending(false);
    };

    return (
        <div className="px-6 py-8 md:px-10 md:py-10 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent w-full z-10 sticky bottom-0">
            <div className="max-w-4xl mx-auto flex items-center gap-3 p-3 bg-white/[0.03] backdrop-blur-3xl border border-white/5 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] group-focus-within:ring-2 ring-indigo-500/20 transition-all duration-500 hover:bg-white/[0.05]">
                
                <button className="p-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-2xl transition-all active:scale-90">
                    <Smile size={22} className={text ? "text-indigo-400" : ""} />
                </button>
                
                <button className="hidden sm:block p-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-2xl transition-all active:scale-90">
                    <Paperclip size={20} />
                </button>

                <form onSubmit={handleSendMessage} className="flex-1 flex items-center gap-x-3 w-full">
                    <input
                        type="text"
                        className="flex-1 w-full bg-transparent border-none py-3 px-1 text-[16px] text-white placeholder-slate-500 focus:outline-none focus:ring-0 transition-all font-medium"
                        placeholder="Message your encrypted signal..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    
                    <button
                        type="submit"
                        disabled={!text.trim() || isSending}
                        className={`p-3.5 rounded-2xl text-white transition-all duration-500 shadow-2xl active:scale-90 relative overflow-hidden group/btn
                            ${text.trim() 
                                ? "bg-gradient-to-r from-indigo-600 to-violet-600 hover:shadow-indigo-500/40" 
                                : "bg-white/5 text-slate-600 cursor-not-allowed"}`}
                    >
                        {isSending ? (
                            <Loader2 size={22} className="animate-spin" />
                        ) : (
                            <Send size={22} className={`${text.trim() ? "group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" : ""}`} />
                        )}
                        <span className="absolute inset-x-0 bottom-0 h-1 bg-white/20 opacity-0 group-hover/btn:opacity-100 transition-opacity"></span>
                    </button>
                </form>
            </div>
        </div>
    );
}

export default MessageInput;
