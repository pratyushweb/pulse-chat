import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Register({ onNavigateLogin }) {
  const { login } = useAuth()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Full name is required'
    else if (form.name.trim().length < 2) e.name = 'Name must be at least 2 characters'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.password) e.password = 'Password is required'
    else if (form.password.length < 6) e.password = 'Must be at least 6 characters'
    if (!form.confirm) e.confirm = 'Please confirm your password'
    else if (form.confirm !== form.password) e.confirm = 'Passwords do not match'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setLoading(true)
    setTimeout(() => {
      login(form.email, form.name.trim())
      setLoading(false)
    }, 900)
  }

  const handleChange = (field) => (e) => {
    setForm(f => ({ ...f, [field]: e.target.value }))
    if (errors[field]) setErrors(er => ({ ...er, [field]: '' }))
  }

  const strength = (() => {
    const p = form.password
    if (!p) return 0
    let s = 0
    if (p.length >= 6) s++
    if (p.length >= 10) s++
    if (/[A-Z]/.test(p)) s++
    if (/[0-9]/.test(p)) s++
    if (/[^A-Za-z0-9]/.test(p)) s++
    return s
  })()

  const strengthLabel = ['', 'Very weak', 'Weak', 'Fair', 'Strong', 'Very strong'][strength]
  const strengthColor = ['', 'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-emerald-500', 'bg-emerald-400'][strength]

  return (
    <div className="min-h-screen flex bg-surface-950">
      {/* Left decorative panel */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden bg-gradient-to-br from-slate-900 via-surface-950 to-indigo-950">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 70% 40%, rgba(99,102,241,0.15) 0%, transparent 60%), radial-gradient(circle at 20% 80%, rgba(14,165,233,0.1) 0%, transparent 50%)'
        }} />

        {/* Feature list */}
        <div className="flex flex-col justify-center items-center w-full gap-8 relative z-10 px-12">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-brand-700 flex items-center justify-center shadow-xl">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-3">Join Pulse today</h2>
            <p className="text-slate-400 text-sm max-w-xs leading-relaxed">Everything your team needs for seamless communication in one place.</p>
          </div>

          <div className="w-full max-w-xs space-y-3">
            {[
              { icon: '⚡', title: 'Instant messaging', desc: 'Messages delivered in milliseconds' },
              { icon: '🔒', title: 'End-to-end encrypted', desc: 'Your conversations stay private' },
              { icon: '📱', title: 'Works everywhere', desc: 'Desktop, tablet, and mobile' },
            ].map(f => (
              <div key={f.title} className="flex items-start gap-3 bg-surface-800/30 backdrop-blur rounded-xl p-3 border border-slate-700/30">
                <span className="text-xl">{f.icon}</span>
                <div>
                  <p className="text-sm font-semibold text-white">{f.title}</p>
                  <p className="text-xs text-slate-500">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right form panel */}
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
            <h1 className="text-2xl font-bold text-white mb-1.5">Create your account</h1>
            <p className="text-slate-400 text-sm">Join thousands of teams already using Pulse</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Full Name</label>
              <input
                type="text"
                value={form.name}
                onChange={handleChange('name')}
                placeholder="Alex Johnson"
                className={`input-field ${errors.name ? 'border-red-500/60 focus:border-red-500 focus:ring-red-500/20' : ''}`}
              />
              {errors.name && <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>}
            </div>

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
              {form.password && (
                <div className="mt-2 space-y-1">
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(i => (
                      <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= strength ? strengthColor : 'bg-slate-700'}`} />
                    ))}
                  </div>
                  <p className="text-[11px] text-slate-500">{strengthLabel}</p>
                </div>
              )}
              {errors.password && <p className="mt-1.5 text-xs text-red-400">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Confirm Password</label>
              <input
                type="password"
                value={form.confirm}
                onChange={handleChange('confirm')}
                placeholder="••••••••"
                className={`input-field ${errors.confirm ? 'border-red-500/60 focus:border-red-500 focus:ring-red-500/20' : form.confirm && form.confirm === form.password ? 'border-emerald-500/60' : ''}`}
              />
              {errors.confirm && <p className="mt-1.5 text-xs text-red-400">{errors.confirm}</p>}
              {form.confirm && form.confirm === form.password && !errors.confirm && (
                <p className="mt-1.5 text-xs text-emerald-400 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Passwords match
                </p>
              )}
            </div>

            <div className="flex items-start gap-2 pt-1">
              <input type="checkbox" required className="mt-0.5 w-4 h-4 rounded border-slate-600 bg-slate-800 accent-brand-500" />
              <p className="text-xs text-slate-400 leading-relaxed">
                I agree to the{' '}
                <button type="button" className="text-brand-400 hover:text-brand-300">Terms of Service</button>
                {' '}and{' '}
                <button type="button" className="text-brand-400 hover:text-brand-300">Privacy Policy</button>
              </p>
            </div>

            <button type="submit" disabled={loading} className="btn-primary mt-1">
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Creating account...
                </span>
              ) : 'Create account'}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Already have an account?{' '}
            <button onClick={onNavigateLogin} className="text-brand-400 hover:text-brand-300 font-semibold transition-colors">
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
