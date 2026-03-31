import { MessageSquareDashed } from "lucide-react";

function NoChatSelected() {
    return (
        <div className="flex-1 flex flex-col items-center justify-center text-slate-100 p-8 h-full bg-slate-900 relative overflow-hidden">
            <div className="max-w-md text-center flex flex-col items-center animate-in fade-in duration-700 z-10">
                <div className="w-24 h-24 bg-gradient-to-tr from-yellow-400/10 to-amber-600/10 rounded-[2rem] flex items-center justify-center mb-8 shadow-2xl ring-1 ring-yellow-500/20 rotate-6 transition-transform">
                    <MessageSquareDashed size={48} className="text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.4)]" />
                </div>
                
                <h2 className="text-3xl font-black mb-3 tracking-tighter text-white uppercase italic">
                    Wink <span className="text-yellow-400">Hub</span>
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed">
                    Click on any contact in your sidebar to open the chat window and start sending securely encrypted messages.
                </p>
            </div>
        </div>
    );
}

export default NoChatSelected;
