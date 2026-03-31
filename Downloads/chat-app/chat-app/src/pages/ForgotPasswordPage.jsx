import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { Phone, Lock, Loader2, MessageSquareDashed, ArrowLeft, KeyRound } from "lucide-react";
import toast from "react-hot-toast";

function ForgotPasswordPage() {
    const [step, setStep] = useState(1); // 1: Phone, 2: OTP, 3: New Password
    const [formData, setFormData] = useState({
        phoneNumber: "",
        otp: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [loading, setLoading] = useState(false);
    
    const { forgotPassword, verifyOTP, resetPassword } = useAuthStore();
    const navigate = useNavigate();

    const handleSendOTP = async (e) => {
        e.preventDefault();
        if (!formData.phoneNumber) return toast.error("Please enter your phone number");
        
        setLoading(true);
        const success = await forgotPassword({ phoneNumber: formData.phoneNumber }, toast);
        setLoading(false);
        
        if (success) setStep(2);
    };

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        if (!formData.otp) return toast.error("Please enter the OTP");
        
        setLoading(true);
        const success = await verifyOTP({ phoneNumber: formData.phoneNumber, otp: formData.otp }, toast);
        setLoading(false);
        
        if (success) setStep(3);
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (!formData.newPassword) return toast.error("Please enter new password");
        if (formData.newPassword.length < 6) return toast.error("Password must be at least 6 characters");
        if (formData.newPassword !== formData.confirmPassword) return toast.error("Passwords do not match");

        setLoading(true);
        const success = await resetPassword({ 
            phoneNumber: formData.phoneNumber, 
            otp: formData.otp, 
            newPassword: formData.newPassword 
        }, toast);
        setLoading(false);
        
        if (success) navigate("/login");
    };

    return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
            {/* Background Gradients (Option 2) */}
            <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none animate-pulse"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none animate-pulse" style={{ animationDelay: '2s' }}></div>

            <div className="max-w-md w-full relative z-10 space-y-8 p-10 glass-card rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.6)] animate-in fade-in zoom-in duration-700">
                <div className="text-center">
                    <div className="flex justify-center mb-8">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-tr from-indigo-500 to-violet-600 rounded-[2rem] blur opacity-40 group-hover:opacity-75 transition duration-500"></div>
                            <div className="relative w-20 h-20 bg-slate-900 rounded-[2rem] flex items-center justify-center shadow-2xl border border-white/10 rotate-3 group-hover:rotate-6 transition-transform">
                                <KeyRound size={40} className="text-white" />
                            </div>
                        </div>
                    </div>
                    <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic">
                        {step === 1 && "Reset Protocol"}
                        {step === 2 && "Verification"}
                        {step === 3 && "Access Update"}
                    </h2>
                    <p className="mt-3 text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">
                        {step === 1 && "Initialize override via Identity Vector"}
                        {step === 2 && `Signal dispatched to ${formData.phoneNumber}`}
                        {step === 3 && "Establish new private access key"}
                    </p>
                </div>

                {step === 1 && (
                    <form className="mt-10 space-y-7" onSubmit={handleSendOTP}>
                        <div className="group">
                            <label className="block text-xs font-black text-slate-500 uppercase tracking-widest ml-1 mb-2">Identity Vector</label>
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
                        <button disabled={loading} type="submit" className="btn-premium !py-4 uppercase tracking-[0.2em]">
                            {loading ? <Loader2 className="animate-spin h-5 w-5 mx-auto" /> : "Request OTP Signal"}
                        </button>
                    </form>
                )}

                {step === 2 && (
                    <form className="mt-10 space-y-7" onSubmit={handleVerifyOTP}>
                        <div className="group">
                            <label className="block text-xs font-black text-slate-500 uppercase tracking-widest ml-1 mb-2">Signal Code</label>
                            <div className="relative">
                                 <input
                                    type="text"
                                    className="input-premium text-center text-3xl font-black tracking-[0.8em] !py-5"
                                    placeholder="000000"
                                    maxLength={6}
                                    value={formData.otp}
                                    onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                                />
                            </div>
                        </div>
                        <button disabled={loading} type="submit" className="btn-premium !py-4 uppercase tracking-[0.2em]">
                            {loading ? <Loader2 className="animate-spin h-5 w-5 mx-auto" /> : "Authorize Link"}
                        </button>
                        <button type="button" onClick={() => setStep(1)} className="w-full text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-slate-300 transition-colors">
                            Modify Identity Vector
                        </button>
                    </form>
                )}

                {step === 3 && (
                    <form className="mt-10 space-y-7" onSubmit={handleResetPassword}>
                        <div className="space-y-5">
                            <div className="group">
                                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest ml-1 mb-2">New Access Key</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none group-focus-within:text-indigo-400 transition-colors">
                                        <Lock className="h-5 w-5" />
                                    </div>
                                    <input
                                        type="password"
                                        className="input-premium !pl-14"
                                        placeholder="••••••••"
                                        value={formData.newPassword}
                                        onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="group">
                                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest ml-1 mb-2">Verify Access Key</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none group-focus-within:text-indigo-400 transition-colors">
                                        <Lock className="h-5 w-5" />
                                    </div>
                                    <input
                                        type="password"
                                        className="input-premium !pl-14"
                                        placeholder="••••••••"
                                        value={formData.confirmPassword}
                                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                        <button disabled={loading} type="submit" className="btn-premium !py-4 uppercase tracking-[0.2em] !from-emerald-600 !to-emerald-500 shadow-emerald-500/20">
                            {loading ? <Loader2 className="animate-spin h-5 w-5 mx-auto" /> : "Establish Override"}
                        </button>
                    </form>
                )}

                <div className="text-center pt-4">
                    <Link to="/login" className="text-[10px] uppercase font-black tracking-[0.3em] text-slate-500 hover:text-indigo-400 flex items-center justify-center gap-2 transition-colors">
                        <ArrowLeft size={14} /> Revert to Login
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ForgotPasswordPage;
