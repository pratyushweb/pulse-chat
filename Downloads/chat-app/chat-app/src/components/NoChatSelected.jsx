import { MessageSquareDashed } from "lucide-react";

function NoChatSelected() {
    return (
        <div className="flex-1 flex flex-col items-center justify-center text-slate-100 p-8 h-full bg-slate-900 relative overflow-hidden">
            <div className="max-w-md text-center flex flex-col items-center animate-in fade-in duration-700 z-10">
                <div className="w-20 h-20 bg-slate-800/80 rounded-2xl flex items-center justify-center mb-6 shadow-xl ring-1 ring-white/5 rotate-3 transition-transform">
                    <MessageSquareDashed size={40} className="text-indigo-400" />
                </div>
                
                <h2 className="text-2xl font-bold mb-2 tracking-tight text-white">
                    Select a conversation
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed">
                    Click on any contact in your sidebar to open the chat window and start sending securely encrypted messages.
                </p>
            </div>
        </div>
    );
}

export default NoChatSelected;
