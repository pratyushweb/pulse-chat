import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";
import NoChatSelected from "../components/NoChatSelected";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut } from "lucide-react";
import toast from "react-hot-toast";

const HomePage = () => {
    const { selectedUser } = useChatStore();
    const { logout, authUser } = useAuthStore();

    return (
        <div className="h-screen bg-slate-950 flex flex-col items-center justify-center p-2 sm:p-4 pb-20 sm:pb-4 relative overflow-hidden">
             {/* Background glow */}
             <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="w-full max-w-7xl h-full md:h-[92vh] bg-slate-900 border border-slate-800 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] flex overflow-hidden ring-1 ring-white/5 relative z-10">
                <div className={`${selectedUser ? 'hidden md:flex' : 'flex'} w-full md:w-[350px] border-r border-slate-800 flex-col bg-slate-900/50 backdrop-blur-xl`}>
                    <div className="p-5 border-b border-slate-800 flex justify-between items-center bg-slate-900/80">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold shadow-lg shadow-indigo-500/20">
                                {authUser?.username?.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <h2 className="font-bold text-lg tracking-tight text-white leading-tight">Messages</h2>
                                <p className="text-xs text-slate-400">@{authUser?.username}</p>
                            </div>
                        </div>
                        <button onClick={() => logout(toast)} className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl transition-all shadow-sm ring-1 ring-white/5" title="Logout">
                            <LogOut size={18} />
                        </button>
                    </div>
                    <Sidebar />
                </div>
                <div className={`${!selectedUser ? 'hidden md:flex' : 'flex'} flex-1 flex-col bg-[#0f172a] relative`}>
                    {selectedUser ? <ChatContainer /> : <NoChatSelected />}
                </div>
            </div>
        </div>
    );
};
export default HomePage;
