import { ChevronLeft, Info, Video, PhoneCall } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

function ChatHeader() {
    const { selectedUser, setSelectedUser } = useChatStore();
    const { onlineUsers } = useAuthStore();
    
    const isOnline = onlineUsers.includes(selectedUser._id);

    return (
        <div className="px-5 py-4 bg-white/[0.03] backdrop-blur-3xl border-b border-white/5 flex justify-between items-center z-50 sticky top-0 w-full shadow-lg h-[72px]">
            <div className="flex items-center gap-4">
                <button 
                  onClick={() => setSelectedUser(null)} 
                  className="md:hidden p-2.5 -ml-2 text-slate-400 hover:text-white hover:bg-white/5 active:scale-90 transition-all rounded-2xl"
                >
                     <ChevronLeft size={24} />
                </button>
                <div className="relative group cursor-pointer">
                    <div className={`absolute -inset-0.5 rounded-full blur-sm opacity-20 group-hover:opacity-60 transition-opacity ${isOnline ? "bg-emerald-500" : "bg-indigo-500"}`}></div>
                    <img 
                        src={selectedUser.profilePic || `https://ui-avatars.com/api/?name=${selectedUser.username}&background=334155&color=fff&rounded=true&bold=true`} 
                        alt={selectedUser.username} 
                        className="relative w-11 h-11 rounded-full bg-slate-800 object-cover border-2 border-white/10 group-hover:scale-105 transition-transform"
                    />
                    {isOnline && (
                        <div className="online-pulse absolute bottom-0 right-0">
                            <div className="online-pulse-ring"></div>
                            <div className="online-pulse-dot scale-75"></div>
                        </div>
                    )}
                </div>
                <div>
                    <h3 className="font-extrabold text-[17px] text-white tracking-tight leading-none mb-1 group-hover:text-indigo-400 transition-colors uppercase italic">{selectedUser.username}</h3>
                    <div className="flex items-center gap-1.5">
                        <span className={`text-[11px] font-bold tracking-widest uppercase transition-colors ${isOnline ? "text-emerald-400" : "text-slate-500"}`}>
                            {isOnline ? "Active Signal" : "Signal Lost"}
                        </span>
                    </div>
                </div>
            </div>

            {/* Premium Header Actions */}
            <div className="flex items-center gap-2">
                <button className="p-2.5 text-slate-400 hover:text-indigo-400 hover:bg-white/5 rounded-2xl transition-all active:scale-90">
                    <PhoneCall size={19} />
                </button>
                <button className="p-2.5 text-slate-400 hover:text-indigo-400 hover:bg-white/5 rounded-2xl transition-all active:scale-90">
                    <Video size={19} />
                </button>
                <button className="p-2.5 text-slate-400 hover:text-indigo-400 hover:bg-white/5 rounded-2xl transition-all active:scale-90">
                    <Info size={19} />
                </button>
            </div>
        </div>
    );
}

export default ChatHeader;
