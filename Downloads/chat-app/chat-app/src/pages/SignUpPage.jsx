import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { User, Lock, Loader2, MessageSquareDashed, Phone } from "lucide-react";
import toast from "react-hot-toast";

function SignUpPage() {
    const [formData, setFormData] = useState({ username: "", password: "", phoneNumber: "" });
    const { signup, isSigningUp } = useAuthStore();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!formData.username || !formData.password || !formData.phoneNumber) return toast.error("Please fill in all fields");
        if(formData.password.length < 6) return toast.error("Password must be at least 6 characters");
        signup(formData, toast);
    };

    return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
            {/* Background Gradients (Option 2) */}
            <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none animate-pulse"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none animate-pulse" style={{ animationDelay: '1.5s' }}></div>

            <div className="max-w-md w-full relative z-10 space-y-8 p-10 glass-card rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.6)] animate-in fade-in zoom-in duration-700">
                <div>
                     <div className="flex justify-center mb-8">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-tr from-yellow-400 to-amber-600 rounded-[2rem] blur opacity-40 group-hover:opacity-75 transition duration-500"></div>
                            <div className="relative w-20 h-20 bg-slate-900 rounded-[2rem] flex items-center justify-center shadow-2xl border border-white/10 -rotate-3 group-hover:-rotate-6 transition-transform">
                                <MessageSquareDashed size={40} className="text-yellow-400 font-bold" />
                            </div>
                        </div>
                    </div>
                    <h2 className="text-center text-4xl font-black text-white tracking-tighter uppercase italic">Wink <span className="text-yellow-400">Hub</span></h2>
                    <p className="mt-3 text-center text-xs font-bold text-slate-500 uppercase tracking-[0.3em]">
                        Establish New Identity
                    </p>
                </div>

                <form className="mt-10 space-y-7" onSubmit={handleSubmit}>
                    <div className="space-y-5">
                        <div className="group">
                            <label className="block text-xs font-black text-slate-500 uppercase tracking-widest ml-1 mb-2">Network ID</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none group-focus-within:text-indigo-400 transition-colors">
                                    <User className="h-5 w-5" />
                                </div>
                                <input
                                    type="text"
                                    className="input-premium !pl-14"
                                    placeholder="Enter username"
                                    value={formData.username}
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="group">
                            <label className="block text-xs font-black text-slate-500 uppercase tracking-widest ml-1 mb-2">Signal Vector</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none group-focus-within:text-indigo-400 transition-colors">
                                    <Phone className="h-5 w-5" />
                                </div>
                                <input
                                    type="text"
                                    className="input-premium !pl-14"
                                    placeholder="+91 1234567890"
                                    value={formData.phoneNumber}
                                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="group">
                            <label className="block text-xs font-black text-slate-500 uppercase tracking-widest ml-1 mb-2">Access Key</label>
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

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={isSigningUp}
                            className="btn-premium !py-5 uppercase tracking-[0.2em] !from-yellow-400 !to-amber-500 !text-slate-950 font-black shadow-xl shadow-yellow-500/20"
                        >
                            {isSigningUp ? (
                                <div className="flex items-center justify-center gap-2">
                                    <Loader2 className="animate-spin h-6 w-6" />
                                    <span>Syncing...</span>
                                </div>
                            ) : "Create Account Now"}
                        </button>
                    </div>
                </form>

                <div className="text-center pt-4">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                        Already part of the network?{' '}
                        <Link to="/login" className="text-indigo-500 hover:text-indigo-400 font-black transition-colors underline decoration-indigo-500/30 underline-offset-8">
                            Initialize Login
                        </Link>
                    </p>
                </div>
            </div>

            <div className="absolute bottom-8 text-center opacity-30 pointer-events-none">
                 <p className="text-[9px] font-black uppercase tracking-[0.5em] text-slate-500">Secure Protocol v2.0</p>
            </div>
        </div>
    );
}

export default SignUpPage;
