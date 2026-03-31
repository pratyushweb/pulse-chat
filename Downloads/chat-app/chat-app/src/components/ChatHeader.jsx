import { ChevronLeft } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

function ChatHeader() {
    const { selectedUser, setSelectedUser } = useChatStore();
    const { onlineUsers } = useAuthStore();
    
    // Check if the current user is active using the socket state
    const isOnline = onlineUsers.includes(selectedUser._id);

    return (
        <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex justify-between items-center z-20 shadow-sm w-full">
            <div className="flex items-center gap-3">
                <button 
                  onClick={() => setSelectedUser(null)} 
                  className="md:hidden p-2 -ml-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl"
                >
                     <ChevronLeft size={24} />
                </button>
                <div className="relative">
                    <img 
                        src={selectedUser.profilePic || `https://ui-avatars.com/api/?name=${selectedUser.username}&background=6366f1&color=fff&rounded=true`} 
                        alt={selectedUser.username} 
                        className="w-10 h-10 rounded-full bg-slate-800 object-cover"
                    />
                    {isOnline && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-slate-900 rounded-full"></span>
                    )}
                </div>
                <div>
                    <h3 className="font-semibold text-[15px] text-slate-100 leading-tight">{selectedUser.username}</h3>
                    <p className={`text-[12px] ${isOnline ? "text-emerald-400 font-medium" : "text-slate-500"}`}>
                        {isOnline ? "Online" : "Offline"}
                    </p>
                </div>
            </div>
        </div>
    );
}
export default ChatHeader;
