import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Login({ onNavigateRegister }) {
  const { login } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.password) e.password = 'Password is required'
    else if (form.password.length < 6) e.password = 'Password must be at least 6 characters'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setLoading(true)
    setTimeout(() => {
      login(form.email)
      setLoading(false)
    }, 800)
  }

  const handleChange = (field) => (e) => {
    setForm(f => ({ ...f, [field]: e.target.value }))
    if (errors[field]) setErrors(er => ({ ...er, [field]: '' }))
  }

  return (
    <div className="min-h-screen flex bg-surface-950">
      {/* Left panel — decorative */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden bg-gradient-to-br from-slate-900 via-surface-950 to-brand-900">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(14,165,233,0.15) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(99,102,241,0.1) 0%, transparent 50%)'
        }} />

        {/* Floating cards */}
        <div className="absolute top-1/4 left-12 bg-surface-800/40 backdrop-blur border border-slate-700/50 rounded-2xl p-4 shadow-xl w-56">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white">AN</div>
            <div>
              <p className="text-xs font-semibold text-white">Aria Nakamura</p>
              <p className="text-[10px] text-emerald-400">● Online</p>
            </div>
          </div>
          <div className="bg-surface-700/50 rounded-xl rounded-tl-sm px-3 py-2">
            <p className="text-xs text-slate-200">Are you joining the standup?</p>
          </div>
          <p className="text-[10px] text-slate-500 text-right mt-1 font-mono">10:42 AM</p>
        </div>

        <div className="absolute bottom-1/3 right-12 bg-surface-800/40 backdrop-blur border border-slate-700/50 rounded-2xl p-4 shadow-xl w-52">
          <div className="flex justify-end mb-2">
            <div className="bg-brand-600 rounded-xl rounded-tr-sm px-3 py-2 max-w-[80%]">
              <p className="text-xs text-white">Absolutely! Give me 10 mins ✌️</p>
            </div>
          </div>
          <p className="text-[10px] text-slate-500 text-right font-mono">10:44 AM ✓✓</p>
        </div>

        <div className="flex flex-col justify-center items-center w-full gap-6 relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-xl shadow-brand-900/50">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-2">Pulse Chat</h2>
            <p className="text-slate-400 text-sm max-w-xs leading-relaxed">Connect with your team in real-time. Fast, secure, and beautifully simple.</p>
          </div>
          <div className="flex gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-brand-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              End-to-end encrypted
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-brand-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              Real-time sync
            </span>
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 max-w-md mx-auto w-full lg:max-w-none lg:w-[480px]">
        {/* Mobile logo */}
        <div className="lg:hidden flex items-center gap-2 mb-10">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <span className="text-xl font-bold text-white">Pulse</span>
        </div>

        <div className="w-full animate-slide-up">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white mb-1.5">Welcome back</h1>
            <p className="text-slate-400 text-sm">Sign in to continue to Pulse</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={handleChange('email')}
                placeholder="you@company.com"
                className={`input-field ${errors.email ? 'border-red-500/60 focus:border-red-500 focus:ring-red-500/20' : ''}`}
              />
              {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Password</label>
              <input
                type="password"
                value={form.password}
                onChange={handleChange('password')}
                placeholder="••••••••"
                className={`input-field ${errors.password ? 'border-red-500/60 focus:border-red-500 focus:ring-red-500/20' : ''}`}
              />
              {errors.password && <p className="mt-1.5 text-xs text-red-400">{errors.password}</p>}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-600 bg-slate-800 accent-brand-500" />
                <span className="text-xs text-slate-400">Remember me</span>
              </label>
              <button type="button" className="text-xs text-brand-400 hover:text-brand-300 transition-colors">Forgot password?</button>
            </div>

            <button type="submit" disabled={loading} className="btn-primary mt-2">
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Signing in...
                </span>
              ) : 'Sign in'}
            </button>

            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-800" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-surface-950 px-3 text-xs text-slate-500">or</span>
              </div>
            </div>

            {/* Demo login */}
            <button
              type="button"
              onClick={() => login('demo@pulse.app', 'Alex Johnson')}
              className="w-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-medium py-3 px-6 rounded-xl transition-all duration-200 text-sm"
            >
              ⚡ Continue with demo account
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Don't have an account?{' '}
            <button onClick={onNavigateRegister} className="text-brand-400 hover:text-brand-300 font-semibold transition-colors">
              Create one
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
