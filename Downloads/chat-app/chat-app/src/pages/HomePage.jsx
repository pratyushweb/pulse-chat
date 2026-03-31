import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";
import NoChatSelected from "../components/NoChatSelected";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, Power } from "lucide-react";
import toast from "react-hot-toast";

const HomePage = () => {
    const { selectedUser } = useChatStore();
    const { logout, authUser } = useAuthStore();

    return (
        <div className="h-screen bg-[#020617] flex flex-col items-center justify-center p-2 sm:p-5 pb-20 sm:pb-5 relative overflow-hidden font-sans">
             {/* Option 2: Dark Glass Theme Background */}
             <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none animate-pulse"></div>
             <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none animate-pulse" style={{ animationDelay: '1s' }}></div>

            <div className="w-full max-w-[1600px] h-full md:h-[95vh] glass-card rounded-[2.5rem] flex overflow-hidden relative z-10 transition-all duration-700 animate-in fade-in zoom-in duration-700">
                
                {/* Sidebar Column - Clean iOS-like blur */}
                <div className={`${selectedUser ? 'hidden md:flex' : 'flex'} w-full md:w-[380px] border-r border-white/5 flex-col bg-white/[0.02] backdrop-blur-3xl`}>
                    
                    {/* Sidebar Sticky Header */}
                    <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.01] sticky top-0 z-30">
                        <div className="flex items-center gap-3.5 group cursor-pointer">
                            <div className="relative">
                                <div className="absolute -inset-0.5 bg-gradient-to-tr from-indigo-500 to-amber-400 rounded-2xl blur-sm opacity-30 group-hover:opacity-70 transition-opacity"></div>
                                <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-tr from-yellow-400 to-amber-600 text-slate-950 flex items-center justify-center font-black shadow-xl">
                                    {authUser?.username?.charAt(0).toUpperCase()}
                                </div>
                            </div>
                            <div>
                                <h1 className="font-black text-2xl tracking-tighter text-yellow-400 leading-none uppercase italic group-hover:scale-105 transition-transform origin-left decoration-2 underline-offset-4 mb-0.5">Wink</h1>
                                <div className="flex items-center gap-1.5 opacity-60">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></div>
                                    <p className="text-[11px] font-bold tracking-widest text-slate-300">ACTIVE</p>
                                </div>
                            </div>
                        </div>
                        <button 
                            onClick={() => logout(toast)} 
                            className="p-3 bg-white/5 hover:bg-red-500/10 text-slate-400 hover:text-red-400 rounded-2xl transition-all shadow-xl ring-1 ring-white/10 group active:scale-90" 
                            title="Deactivate Grid Session"
                        >
                            <Power size={18} className="group-hover:rotate-12 transition-transform" />
                        </button>
                    </div>

                    <Sidebar />
                </div>
                
                {/* Chat Column */}
                <div className={`${!selectedUser ? 'hidden md:flex' : 'flex'} flex-1 flex-col bg-white/[0.01] relative transition-all duration-500`}>
                    {selectedUser ? <ChatContainer /> : <NoChatSelected />}
                </div>
            </div>

            {/* Footer Branded Bar */}
            <div className="fixed bottom-4 left-1/2 -translate-x-1/2 opacity-20 pointer-events-none">
                 <p className="text-[10px] font-black tracking-[0.6em] text-slate-500 uppercase">Wink Signal Protocol © 2026</p>
            </div>
        </div>
    );
};

export default HomePage;
