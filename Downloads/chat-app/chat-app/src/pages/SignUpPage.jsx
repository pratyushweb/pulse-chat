import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { User, Lock, Loader2, MessageSquareDashed } from "lucide-react";
import toast from "react-hot-toast";

function SignUpPage() {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const { signup, isSigningUp } = useAuthStore();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!formData.username || !formData.password) return toast.error("Please fill in all fields");
        if(formData.password.length < 6) return toast.error("Password must be at least 6 characters");
        signup(formData, toast);
    };

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col justify-center">
            <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
                <div className="flex justify-center mb-6">
                     <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20 -rotate-3">
                         <MessageSquareDashed className="text-white w-8 h-8" />
                     </div>
                </div>
                <h2 className="text-center text-3xl font-extrabold text-white tracking-tight">Create account</h2>
                <p className="mt-2 text-center text-sm text-slate-400">
                    Get started with our secure chat
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
                <div className="bg-slate-900 py-8 px-4 shadow-2xl sm:rounded-2xl sm:px-10 border border-slate-800">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-medium text-slate-300">Username</label>
                            <div className="mt-1 relative rounded-xl shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-slate-500" />
                                </div>
                                <input
                                    type="text"
                                    className="block w-full pl-10 pr-3 py-3 border border-slate-800 bg-slate-950 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-slate-600"
                                    placeholder="johndoe"
                                    value={formData.username}
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300">Password</label>
                            <div className="mt-1 relative rounded-xl shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-slate-500" />
                                </div>
                                <input
                                    type="password"
                                    className="block w-full pl-10 pr-3 py-3 border border-slate-800 bg-slate-950 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-slate-600"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isSigningUp}
                                className="w-full flex justify-center py-3 px-4 rounded-xl shadow-sm text-[15px] font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors disabled:opacity-50"
                            >
                                {isSigningUp ? <Loader2 className="animate-spin h-5 w-5" /> : "Sign up"}
                            </button>
                        </div>
                    </form>

                    <div className="mt-8 text-center text-sm text-slate-400">
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-indigo-400 hover:text-indigo-300">
                            Sign in instead
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUpPage;
