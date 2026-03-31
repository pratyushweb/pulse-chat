import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { Users } from "lucide-react";

function Sidebar() {
    const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
    const { onlineUsers } = useAuthStore();

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    if(isUsersLoading) return <div className="p-8 flex flex-col space-y-4">
        {[1,2,3,4].map(i => <div key={i} className="h-16 bg-slate-800/50 animate-pulse rounded-2xl"></div>)}
    </div>;

    if(users.length === 0) return (
        <div className="flex-1 flex flex-col items-center justify-center text-slate-500 p-8 text-center space-y-4">
             <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center shadow-lg border border-slate-700/50">
                <Users size={32} className="text-slate-600" />
             </div>
             <p className="text-sm">No connections yet. When users sign up, they will appear here!</p>
        </div>
    );

    return (
        <div className="flex-1 overflow-y-auto w-full p-3 space-y-1 nice-scrollbar">
            {users.map((user) => (
                <button
                    key={user._id}
                    onClick={() => setSelectedUser(user)}
                    className={`w-full flex items-center gap-4 p-3 rounded-2xl transition-all ${
                        selectedUser?._id === user._id ? "bg-indigo-600/10 shadow-sm" : "hover:bg-slate-800/50"
                    }`}
                >
                    <div className="relative shrink-0">
                        <img 
                            src={user.profilePic || `https://ui-avatars.com/api/?name=${user.username}&background=6366f1&color=fff&rounded=true&bold=true`} 
                            alt={user.username} 
                            className="w-12 h-12 rounded-full object-cover shadow-sm ring-2 ring-slate-800"
                        />
                        {onlineUsers.includes(user._id) && (
                            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-slate-900 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                        )}
                    </div>
                    
                    <div className="text-left min-w-0 flex-1">
                        <h3 className="font-semibold truncate text-slate-200 text-[15px]">{user.username}</h3>
                        <p className={`text-[13px] truncate transition-colors ${onlineUsers.includes(user._id) ? "text-emerald-400 font-medium" : "text-slate-500"}`}>
                            {onlineUsers.includes(user._id) ? "Online now" : "Offline"}
                        </p>
                    </div>
                </button>
            ))}
        </div>
    );
}

export default Sidebar;
