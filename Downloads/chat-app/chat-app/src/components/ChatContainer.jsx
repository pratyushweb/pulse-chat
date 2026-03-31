import { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { format } from "date-fns";

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

    if (isMessagesLoading) return <div className="flex-1 flex flex-col max-w-4xl w-full mx-auto">
         <ChatHeader />
         <div className="flex-1 p-6 flex flex-col space-y-6">
             <div className="h-16 w-1/3 bg-slate-800 animate-pulse rounded-2xl rounded-bl-sm ml-8 self-start"></div>
             <div className="h-20 w-1/2 bg-slate-800 animate-pulse rounded-2xl rounded-br-sm mr-2 self-end"></div>
             <div className="h-12 w-1/4 bg-slate-800 animate-pulse rounded-2xl rounded-bl-sm ml-8 self-start"></div>
         </div>
         <MessageInput />
    </div>;

    const formatTime = (dateString) => {
        return format(new Date(dateString), "h:mm a");
    }

    return (
        <div className="flex-1 flex flex-col w-full h-full relative z-0">
            <ChatHeader />
            
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scroll-smooth bg-slate-900/30">
                {messages.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-slate-500/70 text-center space-y-3">
                         <span className="text-sm">Start a conversation</span>
                    </div>
                ) : (
                    messages.map((message) => {
                        const isMe = message.senderId === authUser._id;
                        return (
                            <div key={message._id} className={`flex flex-col w-full ${isMe ? "items-end" : "items-start"} group`}>
                                <div className="flex items-end gap-2 mb-1 max-w-[85%] sm:max-w-md">
                                    {!isMe && (
                                        <img 
                                            src={selectedUser.profilePic || `https://ui-avatars.com/api/?name=${selectedUser.username}&background=6366f1&color=fff&rounded=true`} 
                                            className="w-7 h-7 rounded-full shrink-0 shadow-sm self-end"
                                            alt=""
                                        />
                                    )}
                                    <div className={`
                                        px-4 py-2.5 rounded-2xl shadow-sm text-[15px]
                                        ${isMe 
                                            ? "bg-indigo-600 text-white rounded-br-sm" 
                                            : "bg-slate-800 text-slate-200 border border-slate-700/50 rounded-bl-sm"
                                        }
                                    `}>
                                        <p className="leading-relaxed whitespace-pre-wrap break-words">{message.text}</p>
                                    </div>
                                </div>
                                <span className={`text-[11px] text-slate-500 font-medium px-10`}>
                                    {formatTime(message.createdAt)}
                                </span>
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
