import { Send } from "lucide-react";
import { useState } from "react";
import { useChatStore } from "../store/useChatStore";

function MessageInput() {
    const [text, setText] = useState("");
    const { sendMessage } = useChatStore();

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!text.trim()) return;
        
        let messageOutput = text.trim();
        setText("");
        await sendMessage({ text: messageOutput });
    };

    return (
        <div className="p-4 bg-slate-900 border-t border-slate-800 w-full z-10">
            <form onSubmit={handleSendMessage} className="flex items-center gap-3 w-full">
                <input
                    type="text"
                    className="flex-1 w-full bg-slate-800 border border-slate-700 rounded-xl px-5 py-3.5 text-[15px] text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 placeholder-slate-500 transition-colors"
                    placeholder="Message..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <button
                    type="submit"
                    disabled={!text.trim()}
                    className="p-3.5 bg-indigo-600 rounded-xl text-white hover:bg-indigo-500 focus:outline-none disabled:opacity-50 disabled:bg-slate-700 disabled:text-slate-400 transition-colors shrink-0 shadow-sm"
                >
                    <Send size={20} />
                </button>
            </form>
        </div>
    );
}
export default MessageInput;
