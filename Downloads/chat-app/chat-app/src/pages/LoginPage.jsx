import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { Mail, Lock, Loader2, MessageSquareDashed } from "lucide-react";
import toast from "react-hot-toast";

function LoginPage() {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const { login, isLoggingIn } = useAuthStore();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.username || !formData.password) return toast.error("Please fill in all fields");
        login(formData, toast);
    };

    return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
            {/* NEW: Floating Signup Navigation Button */}
            <div className="absolute top-8 right-8 z-50">
                <Link to="/signup" className="flex items-center gap-3 px-6 py-3 bg-yellow-400 text-slate-900 font-black uppercase tracking-widest rounded-2xl hover:bg-yellow-300 hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(250,204,21,0.4)] group">
                    <span>Create Account</span>
                    <MessageSquareDashed size={18} className="group-hover:rotate-12 transition-transform" />
                </Link>
            </div>

            {/* Background Gradients (Option 2) */}
            <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none animate-pulse"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none animate-pulse" style={{ animationDelay: '2s' }}></div>

            <div className="max-w-md w-full relative z-10 space-y-8 p-10 glass-card rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.6)] animate-in fade-in zoom-in duration-700">
                <div>
                    <div className="flex justify-center mb-8">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-tr from-yellow-400 to-amber-600 rounded-[2rem] blur opacity-40 group-hover:opacity-75 transition duration-500"></div>
                            <div className="relative w-20 h-20 bg-slate-900 rounded-[2rem] flex items-center justify-center shadow-2xl border border-white/10 rotate-3 group-hover:rotate-6 transition-transform">
                                <MessageSquareDashed size={40} className="text-yellow-400 font-bold" />
                            </div>
                        </div>
                    </div>
                    <h2 className="text-center text-4xl font-black text-white tracking-tighter uppercase italic">Wink <span className="text-yellow-400">Hub</span></h2>
                    <p className="mt-3 text-center text-xs font-bold text-slate-500 uppercase tracking-[0.3em]">
                        Establish Secure Signal
                    </p>
                </div>

                <form className="mt-10 space-y-7" onSubmit={handleSubmit}>
                    <div className="space-y-5">
                        <div className="group">
                            <label className="block text-xs font-black text-slate-500 uppercase tracking-widest ml-1 mb-2">Network ID</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none group-focus-within:text-indigo-400 transition-colors">
                                    <Mail className="h-5 w-5" />
                                </div>
                                <input
                                    type="text"
                                    className="input-premium !pl-14"
                                    placeholder="your-username"
                                    value={formData.username}
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="group">
                            <div className="flex justify-between items-center ml-1 mb-2">
                                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest">Access Key</label>
                                <Link to="/forgot-password" size="sm" className="text-[10px] uppercase font-black tracking-widest text-indigo-400 hover:text-indigo-300 transition-colors">
                                    Lost Key?
                                </Link>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none group-focus-within:text-indigo-400 transition-colors">
                                    <Lock className="h-5 w-5" />
                                </div>
                                <input
                                    type="password"
                                    className="input-premium !pl-14"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={isLoggingIn}
                            className="btn-premium !py-4 uppercase tracking-[0.2em]"
                        >
                            {isLoggingIn ? (
                                <div className="flex items-center justify-center gap-2">
                                    <Loader2 className="animate-spin h-5 w-5" />
                                    <span>Syncing...</span>
                                </div>
                            ) : "Initialize Link"}
                        </button>
                    </div>
                </form>

                <div className="text-center pt-8 space-y-6">
                    <div className="flex items-center gap-4 opacity-30">
                         <div className="h-[1px] flex-1 bg-slate-700"></div>
                         <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Authentication Options</span>
                         <div className="h-[1px] flex-1 bg-slate-700"></div>
                    </div>

                    <Link 
                        to="/signup" 
                        className="w-full flex items-center justify-center py-4 bg-white/[0.03] border border-white/10 hover:bg-yellow-400/10 hover:border-yellow-400/30 text-yellow-500 font-black uppercase tracking-[0.2em] rounded-2xl transition-all duration-300 active:scale-95 shadow-xl text-xs"
                    >
                        Create New Account
                    </Link>
                </div>
            </div>

            <div className="absolute bottom-8 text-center opacity-30 pointer-events-none">
                 <p className="text-[9px] font-black uppercase tracking-[0.5em] text-slate-500">Encrypted via Wink Protocol v2.0</p>
            </div>
        </div>
    );
}

export default LoginPage;
