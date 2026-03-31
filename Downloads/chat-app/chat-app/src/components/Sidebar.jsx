import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { Users, Search, Loader2 } from "lucide-react";

function Sidebar() {
    const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
    const { onlineUsers } = useAuthStore();
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    const filteredUsers = users.filter(user => 
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if(isUsersLoading) return (
        <div className="flex-1 p-5 space-y-5 overflow-hidden">
            <div className="h-10 bg-white/5 rounded-xl animate-pulse"></div>
            {[1,2,3,4,5,6].map(i => (
                <div key={i} className="flex gap-4 items-center">
                    <div className="w-14 h-14 bg-white/5 rounded-full shimmer"></div>
                    <div className="flex-1 space-y-2">
                        <div className="h-4 w-1/2 bg-white/5 rounded shimmer"></div>
                        <div className="h-3 w-1/4 bg-white/5 rounded shimmer"></div>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden">
            {/* Search Bar - Premium Glass Look */}
            <div className="p-4 border-b border-white/5">
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none group-focus-within:text-indigo-400 transition-colors">
                        <Search size={18} />
                    </div>
                    <input
                        type="text"
                        className="w-full bg-white/5 border border-white/5 rounded-2xl pl-11 pr-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/30 transition-all duration-300"
                        placeholder="Search contacts..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* User List */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2">
                {filteredUsers.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-8 text-center text-slate-500 animate-in fade-in duration-500">
                        <Users size={32} className="mb-3 opacity-20" />
                        <p className="text-xs font-semibold uppercase tracking-widest">{searchQuery ? "No matches found" : "No contacts yet"}</p>
                    </div>
                ) : (
                    filteredUsers.map((user) => {
                        const isOnline = onlineUsers.includes(user._id);
                        const isSelected = selectedUser?._id === user._id;

                        return (
                            <button
                                key={user._id}
                                onClick={() => setSelectedUser(user)}
                                className={`w-full flex items-center gap-4 p-3.5 rounded-2xl transition-all duration-300 group
                                    ${isSelected 
                                        ? "bg-indigo-600 shadow-[0_0_20px_rgba(79,70,229,0.2)]" 
                                        : "hover:bg-white/[0.05] border border-transparent"
                                    }`}
                            >
                                <div className="relative shrink-0">
                                    <div className={`absolute -inset-0.5 rounded-full blur-sm opacity-0 group-hover:opacity-40 transition-opacity ${isOnline ? "bg-emerald-500" : "bg-indigo-500"}`}></div>
                                    <img 
                                        src={user.profilePic || `https://ui-avatars.com/api/?name=${user.username}&background=334155&color=fff&rounded=true&bold=true`} 
                                        alt={user.username} 
                                        className={`relative w-14 h-14 rounded-full object-cover shadow-xl transition-transform group-hover:scale-105 border-2 ${isSelected ? "border-white/20" : "border-white/5"}`}
                                    />
                                    {isOnline && (
                                        <span className="online-pulse absolute bottom-0.5 right-0.5">
                                            <span className="online-pulse-ring"></span>
                                            <span className="online-pulse-dot"></span>
                                        </span>
                                    )}
                                </div>
                                
                                <div className="text-left min-w-0 flex-1">
                                    <div className="flex justify-between items-center mb-0.5">
                                         <h3 className={`font-bold truncate text-[16px] transition-colors ${isSelected ? "text-white" : "text-slate-200 group-hover:text-white"}`}>
                                            {user.username}
                                        </h3>
                                    </div>
                                    <p className={`text-[12px] truncate transition-colors font-medium ${isSelected ? "text-indigo-100/70" : isOnline ? "text-emerald-400" : "text-slate-500 group-hover:text-slate-400"}`}>
                                        {isOnline ? "Active Signal" : "No Signal"}
                                    </p>
                                </div>
                            </button>
                        );
                    })
                )}
            </div>
        </div>
    );
}

export default Sidebar;
