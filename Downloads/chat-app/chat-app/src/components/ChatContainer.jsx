import { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { format } from "date-fns";
import { Check, CheckCheck } from "lucide-react";

function ChatContainer() {
    const { messages, getMessages, isMessagesLoading, selectedUser, subscribeToMessages, unsubscribeFromMessages } = useChatStore();
    const { authUser } = useAuthStore();
    const messageEndRef = useRef(null);

    useEffect(() => {
        getMessages(selectedUser._id);
        subscribeToMessages();
        return () => unsubscribeFromMessages();
    }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

    useEffect(() => {
        if (messageEndRef.current && messages) {
            messageEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    if (isMessagesLoading) return (
        <div className="flex-1 flex flex-col w-full h-full">
            <ChatHeader />
            <div className="flex-1 p-6 space-y-8 overflow-hidden">
                {[1,2,3,4].map(i => (
                    <div key={i} className={`flex ${i % 2 === 0 ? "justify-end" : "justify-start"}`}>
                        <div className="w-1/3 h-16 bg-white/5 rounded-3xl shimmer"></div>
                    </div>
                ))}
            </div>
            <div className="p-6">
                <div className="w-full h-14 bg-white/5 rounded-2xl shimmer"></div>
            </div>
        </div>
    );

    const formatTime = (dateString) => {
        return format(new Date(dateString), "h:mm a");
    }

    return (
        <div className="flex-1 flex flex-col w-full h-full relative bg-slate-900/10">
            <ChatHeader />
            
            <div className="flex-1 overflow-y-auto p-5 md:p-8 space-y-6 custom-scrollbar scroll-smooth">
                {messages.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500">
                         <div className="w-20 h-20 bg-indigo-500/10 rounded-full flex items-center justify-center mb-4 ring-1 ring-indigo-500/20">
                            <span className="text-4xl">🚀</span>
                         </div>
                         <h3 className="text-lg font-bold text-white mb-1">Start a conversation</h3>
                         <p className="text-sm text-slate-500 max-w-[200px]">Send a message to break the silence.</p>
                    </div>
                ) : (
                    messages.map((message) => {
                        const isMe = message.senderId === authUser._id;
                        return (
                            <div key={message._id} className={`flex flex-col ${isMe ? "items-end" : "items-start"} group animate-in slide-in-from-bottom-2 duration-300`}>
                                <div className={`flex items-end gap-2 max-w-[80%] md:max-w-[70%]`}>
                                    {!isMe && (
                                        <img 
                                            src={selectedUser.profilePic || `https://ui-avatars.com/api/?name=${selectedUser.username}&background=334155&color=fff&rounded=true&bold=true`} 
                                            className="w-8 h-8 rounded-full mb-1 shrink-0 shadow-lg border border-white/10"
                                            alt=""
                                        />
                                    )}
                                    <div className={`relative px-4 py-3 shadow-2xl transition-all duration-300 hover:scale-[1.01]
                                        ${isMe 
                                            ? "bubble-sent" 
                                            : "bubble-received"
                                        }
                                    `}>
                                        <p className="text-[15px] leading-relaxed whitespace-pre-wrap break-words">{message.text}</p>
                                        
                                        <div className={`flex items-center gap-1 mt-1 justify-end opacity-60`}>
                                            <span className="text-[10px] font-bold uppercase tracking-tighter">
                                                {formatTime(message.createdAt)}
                                            </span>
                                            {isMe && (
                                                <CheckCheck size={12} className="text-indigo-200" />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                )}
                <div ref={messageEndRef} />
            </div>

            <MessageInput />
        </div>
    );
}

export default ChatContainer;
