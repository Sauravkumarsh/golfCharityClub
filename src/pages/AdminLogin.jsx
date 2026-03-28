import { useState } from "react";

/* ─── Charity Entry Component ─── */
function CharityEntry({ charity, index, onChange, onRemove, canRemove }) {
  return (
    <div className="relative bg-slate-800/60 border border-slate-700 rounded-xl p-5 group transition-all duration-200 hover:border-emerald-700/50">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-emerald-600/20 border border-emerald-600/40 flex items-center justify-center text-emerald-400 text-xs font-bold">
            {index + 1}
          </span>
          <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Charity {index + 1}</span>
        </div>
        {canRemove && (
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="w-7 h-7 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 hover:border-red-400 transition-all text-xs flex items-center justify-center"
            title="Remove charity"
          >
            ✕
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-slate-400 mb-1.5 tracking-wider uppercase">Charity Name *</label>
          <input
            type="text"
            value={charity.name}
            onChange={(e) => onChange(index, "name", e.target.value)}
            placeholder="e.g. Healers Fund"
            className="w-full bg-slate-900/80 border border-slate-600 focus:border-emerald-500 outline-none rounded-lg px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs text-slate-400 mb-1.5 tracking-wider uppercase">Category</label>
          <select
            value={charity.category}
            onChange={(e) => onChange(index, "category", e.target.value)}
            className="w-full bg-slate-900/80 border border-slate-600 focus:border-emerald-500 outline-none rounded-lg px-4 py-2.5 text-sm text-slate-200 transition-colors"
          >
            <option value="">Select category</option>
            <option>Healthcare</option>
            <option>Education</option>
            <option>Environment</option>
            <option>Poverty Relief</option>
            <option>Children & Youth</option>
            <option>Other</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="block text-xs text-slate-400 mb-1.5 tracking-wider uppercase">Charity Description</label>
          <textarea
            value={charity.description}
            onChange={(e) => onChange(index, "description", e.target.value)}
            placeholder="Brief description of this charity's mission..."
            rows={2}
            className="w-full bg-slate-900/80 border border-slate-600 focus:border-emerald-500 outline-none rounded-lg px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 transition-colors resize-none"
          />
        </div>
        <div>
          <label className="block text-xs text-slate-400 mb-1.5 tracking-wider uppercase">Target Amount ($)</label>
          <input
            type="number"
            value={charity.targetAmount}
            onChange={(e) => onChange(index, "targetAmount", e.target.value)}
            placeholder="e.g. 50000"
            min="0"
            className="w-full bg-slate-900/80 border border-slate-600 focus:border-emerald-500 outline-none rounded-lg px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs text-slate-400 mb-1.5 tracking-wider uppercase">Charity Website</label>
          <input
            type="url"
            value={charity.website}
            onChange={(e) => onChange(index, "website", e.target.value)}
            placeholder="https://charity.org"
            className="w-full bg-slate-900/80 border border-slate-600 focus:border-emerald-500 outline-none rounded-lg px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 transition-colors"
          />
        </div>
      </div>
    </div>
  );
}

/* ─── Step Indicator ─── */
function StepIndicator({ step, current }) {
  const done = current > step.id;
  const active = current === step.id;
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300 ${
        done ? "bg-emerald-600 border-emerald-600 text-white" :
        active ? "bg-slate-900 border-emerald-500 text-emerald-400 shadow-lg shadow-emerald-500/20" :
        "bg-slate-800 border-slate-700 text-slate-500"
      }`}>
        {done ? "✓" : step.id}
      </div>
      <span className={`text-[10px] uppercase tracking-widest font-semibold transition-colors ${
        active ? "text-emerald-400" : done ? "text-slate-400" : "text-slate-600"
      }`}>{step.label}</span>
    </div>
  );
}

/* ─── Input Field ─── */
function Field({ label, error, children, required }) {
  return (
    <div>
      <label className="block text-xs text-slate-400 mb-1.5 tracking-wider uppercase">
        {label} {required && <span className="text-emerald-500">*</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}

/* ─── Main Component ─── */
export default function AdminLoginPage() {
  const [mode, setMode] = useState("login"); // "login" | "register"
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  /* Login form */
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  /* Register form */
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    tournamentName: "",
    organizationName: "",
    numberOfPlayers: "",
    contact: "",
  });

  const [charities, setCharities] = useState([
    { name: "", category: "", description: "", targetAmount: "", website: "" },
  ]);

  const STEPS = [
    { id: 1, label: "Account" },
    { id: 2, label: "Tournament" },
    { id: 3, label: "Charities" },
  ];

  /* ── Validation ── */
  const validate = (step) => {
    const e = {};
    if (step === 1) {
      if (!form.username.trim()) e.username = "Username is required";
      if (!form.email.trim()) e.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
      if (!form.password) e.password = "Password is required";
      else if (form.password.length < 8) e.password = "Min 8 characters";
      if (form.password !== form.confirmPassword) e.confirmPassword = "Passwords do not match";
    }
    if (step === 2) {
      if (!form.tournamentName.trim()) e.tournamentName = "Tournament name is required";
      if (!form.organizationName.trim()) e.organizationName = "Organization name is required";
      if (!form.numberOfPlayers) e.numberOfPlayers = "Number of players is required";
      else if (parseInt(form.numberOfPlayers) < 1) e.numberOfPlayers = "Must be at least 1";
      if (!form.contact) e.contact = "Contact number is required";
      else if (!/^\d{7,15}$/.test(form.contact)) e.contact = "Enter a valid phone number (7–15 digits)";
    }
    if (step === 3) {
      charities.forEach((c, i) => {
        if (!c.name.trim()) e[`charity_${i}_name`] = "Charity name required";
      });
    }
    return e;
  };

  const next = () => {
    const e = validate(currentStep);
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setCurrentStep((s) => s + 1);
  };

  const back = () => { setErrors({}); setCurrentStep((s) => s - 1); };

  /* Charities handlers */
  const addCharity = () =>
    setCharities([...charities, { name: "", category: "", description: "", targetAmount: "", website: "" }]);

  const removeCharity = (i) =>
    setCharities(charities.filter((_, idx) => idx !== i));

  const updateCharity = (i, field, value) => {
    const updated = [...charities];
    updated[i] = { ...updated[i], [field]: value };
    setCharities(updated);
    if (errors[`charity_${i}_name`]) {
      const e = { ...errors };
      delete e[`charity_${i}_name`];
      setErrors(e);
    }
  };

  const handleRegisterSubmit = () => {
    const e = validate(3);
    if (Object.keys(e).length) { setErrors(e); return; }
    setSubmitted(true);
  };

  const handleLoginSubmit = (ev) => {
    ev.preventDefault();
    const e = {};
    if (!loginData.email) e.loginEmail = "Email is required";
    if (!loginData.password) e.loginPassword = "Password is required";
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    alert(`Admin login: ${loginData.email}`);
  };

  const inputClass = (err) =>
    `w-full bg-slate-900/80 border ${err ? "border-red-500" : "border-slate-600"} focus:border-emerald-500 outline-none rounded-lg px-4 py-3 text-sm text-slate-200 placeholder-slate-600 transition-colors`;

  /* ── Success Screen ── */
  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');
        .display{font-family:'Cormorant Garamond',serif;} body{font-family:'DM Sans',sans-serif;}`}</style>
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-emerald-600/20 border-2 border-emerald-500 flex items-center justify-center mx-auto mb-6 text-4xl">✓</div>
          <h2 className="display text-4xl font-bold text-white mb-3">Registration Complete</h2>
          <p className="text-slate-400 mb-2">Welcome, <span className="text-emerald-400 font-semibold">{form.username}</span></p>
          <p className="text-slate-500 text-sm mb-8">Your admin account for <strong className="text-slate-300">{form.tournamentName}</strong> has been created with <strong className="text-emerald-400">{charities.filter(c=>c.name).length}</strong> charity partner(s).</p>
          <button onClick={() => { setSubmitted(false); setMode("login"); setCurrentStep(1); }}
            className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg transition-colors text-sm tracking-wide">
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
        .display { font-family: 'Cormorant Garamond', serif; }
        body { font-family: 'DM Sans', sans-serif; }
        @keyframes fadeSlideIn { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        .animate-in { animation: fadeSlideIn 0.4s ease forwards; }
        input[type=number]::-webkit-inner-spin-button { -webkit-appearance:none; }
      `}</style>

      {/* ── Left Panel ── */}
      <div className="hidden lg:flex lg:w-[42%] relative bg-gradient-to-br from-slate-900 via-emerald-950/40 to-slate-900 flex-col justify-between p-12 overflow-hidden">
        {/* Decorative */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/8 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-600/8 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle,#fff_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-800 flex items-center justify-center shadow-lg shadow-emerald-900/50 text-xl">⛳</div>
            <div>
              <p className="display text-base font-bold text-amber-400 leading-none tracking-wide">FAIRWAY</p>
              <p className="text-[10px] text-slate-500 tracking-[0.25em] uppercase">User Portal</p>
            </div>
          </div>

          <h1 className="display text-5xl font-bold text-white leading-tight mb-5">
            Manage Your<br /><em className="text-emerald-400 not-italic">Golf Charity</em><br />Tournament
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
            Configure tournaments, register charities, and oversee player registrations — all from one powerful admin dashboard.
          </p>
        </div>

        <div className="relative z-10 space-y-4">
          {[
            { icon: "🏆", label: "Tournament Management", desc: "Create and manage golf events" },
            { icon: "🤝", label: "Charity Partners", desc: "Add multiple charity beneficiaries" },
            { icon: "👥", label: "Player Oversight", desc: "Track registrations and scores" },
          ].map((f) => (
            <div key={f.label} className="flex items-start gap-4 p-4 rounded-xl bg-white/4 border border-white/8 backdrop-blur-sm">
              <span className="text-2xl">{f.icon}</span>
              <div>
                <p className="text-sm font-semibold text-slate-200">{f.label}</p>
                <p className="text-xs text-slate-500">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right Panel ── */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 overflow-y-auto">
        <div className="w-full max-w-xl">

          {/* Tab Toggle */}
          <div className="flex bg-slate-800/60 border border-slate-700 rounded-xl p-1 mb-8">
            {["login", "register"].map((m) => (
              <button key={m} onClick={() => { setMode(m); setErrors({}); setCurrentStep(1); }}
                className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 capitalize tracking-wide ${
                  mode === m ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/30" : "text-slate-400 hover:text-slate-200"
                }`}>
                {m === "login" ? "Login" : "Admin Register"}
              </button>
            ))}
          </div>

          {/* ══ LOGIN MODE ══ */}
          {mode === "login" && (
            <div className="animate-in">
              <div className="mb-8">
                <h2 className="display text-3xl font-bold text-white mb-1">Welcome Back</h2>
                <p className="text-slate-500 text-sm">Sign in to your  account</p>
              </div>
              <form onSubmit={handleLoginSubmit} className="space-y-5">
                <Field label="Email Address" error={errors.loginEmail} required>
                  <input type="email" value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    placeholder="admin@fairway.com"
                    className={inputClass(errors.loginEmail)} />
                </Field>
                <Field label="Password" error={errors.loginPassword} required>
                  <div className="relative">
                    <input type={showPassword ? "text" : "password"} value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      placeholder="••••••••"
                      className={inputClass(errors.loginPassword) + " pr-12"} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs transition-colors">
                      {showPassword ? "HIDE" : "SHOW"}
                    </button>
                  </div>
                </Field>
                <div className="flex items-center justify-between text-xs">
                  <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
                    <input type="checkbox" className="accent-emerald-500 w-3.5 h-3.5" />
                    Remember me
                  </label>
                  <button type="button" className="text-emerald-400 hover:text-emerald-300 transition-colors">Forgot password?</button>
                </div>
                <button type="submit"
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition-all duration-200 text-sm tracking-wide shadow-lg shadow-emerald-900/30 mt-2">
                  Sign In to Your Account
                </button>
              </form>
              <p className="text-center text-xs text-slate-600 mt-6">
                Don't have an account?{" "}
                <button onClick={() => setMode("register")} className="text-emerald-400 hover:text-emerald-300 transition-colors font-medium">
                  Create one
                </button>
              </p>
            </div>
          )}

          {/* ══ REGISTER MODE ══ */}
          {mode === "register" && (
            <div className="animate-in">
              <div className="mb-6">
                <h2 className="display text-3xl font-bold text-white mb-1">Create Admin Account</h2>
                <p className="text-slate-500 text-sm">Set up your golf charity tournament administration</p>
              </div>

              {/* Step Indicators */}
              <div className="flex items-center justify-between mb-8 relative">
                <div className="absolute top-4 left-0 right-0 h-px bg-slate-700 z-0" />
                {STEPS.map((s, i) => (
                  <div key={s.id} className="flex items-center flex-1 relative z-10">
                    <StepIndicator step={s} current={currentStep} />
                    {i < STEPS.length - 1 && (
                      <div className={`flex-1 h-px mx-2 transition-all duration-500 ${currentStep > s.id ? "bg-emerald-600" : "bg-slate-700"}`} />
                    )}
                  </div>
                ))}
              </div>

              {/* ── STEP 1: Account ── */}
              {currentStep === 1 && (
                <div className="animate-in space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field label="Username" error={errors.username} required>
                      <input type="text" value={form.username}
                        onChange={(e) => { setForm({ ...form, username: e.target.value }); if(errors.username) setErrors({...errors,username:null}); }}
                        placeholder="admin_john"
                        className={inputClass(errors.username)} />
                    </Field>
                    <Field label="Email Address" error={errors.email} required>
                      <input type="email" value={form.email}
                        onChange={(e) => { setForm({ ...form, email: e.target.value }); if(errors.email) setErrors({...errors,email:null}); }}
                        placeholder="admin@fairway.com"
                        className={inputClass(errors.email)} />
                    </Field>
                  </div>
                  <Field label="Password" error={errors.password} required>
                    <div className="relative">
                      <input type={showPassword ? "text" : "password"} value={form.password}
                        onChange={(e) => { setForm({ ...form, password: e.target.value }); if(errors.password) setErrors({...errors,password:null}); }}
                        placeholder="Min. 8 characters"
                        className={inputClass(errors.password) + " pr-12"} />
                      <button type="button" onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs transition-colors">
                        {showPassword ? "HIDE" : "SHOW"}
                      </button>
                    </div>
                  </Field>
                  <Field label="Confirm Password" error={errors.confirmPassword} required>
                    <input type="password" value={form.confirmPassword}
                      onChange={(e) => { setForm({ ...form, confirmPassword: e.target.value }); if(errors.confirmPassword) setErrors({...errors,confirmPassword:null}); }}
                      placeholder="Repeat password"
                      className={inputClass(errors.confirmPassword)} />
                  </Field>
                  {/* Password strength */}
                  {form.password && (
                    <div>
                      <div className="flex gap-1 mt-1">
                        {[1,2,3,4].map((n) => (
                          <div key={n} className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                            form.password.length >= n*2
                              ? n <= 1 ? "bg-red-500" : n <= 2 ? "bg-amber-500" : n <= 3 ? "bg-yellow-400" : "bg-emerald-500"
                              : "bg-slate-700"
                          }`} />
                        ))}
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        {form.password.length < 4 ? "Weak" : form.password.length < 6 ? "Fair" : form.password.length < 8 ? "Good" : "Strong"} password
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* ── STEP 2: Tournament ── */}
              {currentStep === 2 && (
                <div className="animate-in space-y-5">
                  <Field label="Tournament Name" error={errors.tournamentName} required>
                    <input type="text" value={form.tournamentName}
                      onChange={(e) => { setForm({ ...form, tournamentName: e.target.value }); if(errors.tournamentName) setErrors({...errors,tournamentName:null}); }}
                      placeholder="e.g. Fairway Open 2026"
                      className={inputClass(errors.tournamentName)} />
                  </Field>
                  <Field label="Organization Name" error={errors.organizationName} required>
                    <input type="text" value={form.organizationName}
                      onChange={(e) => { setForm({ ...form, organizationName: e.target.value }); if(errors.organizationName) setErrors({...errors,organizationName:null}); }}
                      placeholder="e.g. Fairway Golf Association"
                      className={inputClass(errors.organizationName)} />
                  </Field>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field label="Number of Players" error={errors.numberOfPlayers} required>
                      <input type="number" value={form.numberOfPlayers}
                        onChange={(e) => { setForm({ ...form, numberOfPlayers: e.target.value }); if(errors.numberOfPlayers) setErrors({...errors,numberOfPlayers:null}); }}
                        placeholder="e.g. 120"
                        min="1"
                        className={inputClass(errors.numberOfPlayers)} />
                    </Field>
                    <Field label="Contact Number" error={errors.contact} required>
                      <input type="tel" value={form.contact}
                        onChange={(e) => { const v = e.target.value.replace(/\D/g,""); setForm({ ...form, contact: v }); if(errors.contact) setErrors({...errors,contact:null}); }}
                        placeholder="e.g. 9876543210"
                        maxLength={15}
                        className={inputClass(errors.contact)} />
                    </Field>
                  </div>

                  {/* Summary preview */}
                  {(form.tournamentName || form.organizationName) && (
                    <div className="bg-emerald-900/20 border border-emerald-800/40 rounded-xl p-4 text-sm">
                      <p className="text-xs text-emerald-400 uppercase tracking-widest mb-2 font-semibold">Preview</p>
                      {form.tournamentName && <p className="text-slate-300">🏆 <strong>{form.tournamentName}</strong></p>}
                      {form.organizationName && <p className="text-slate-400 text-xs mt-1">by {form.organizationName}</p>}
                      {form.numberOfPlayers && <p className="text-slate-400 text-xs mt-1">👥 {form.numberOfPlayers} players</p>}
                    </div>
                  )}
                </div>
              )}

              {/* ── STEP 3: Charities ── */}
              {currentStep === 3 && (
                <div className="animate-in space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">
                      {charities.length} Charity Partner{charities.length !== 1 ? "s" : ""}
                    </p>
                    <button type="button" onClick={addCharity}
                      className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-emerald-400 border border-emerald-600/40 hover:bg-emerald-600/10 rounded-lg transition-all">
                      <span className="text-base leading-none">+</span> Add Charity
                    </button>
                  </div>

                  <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1 custom-scroll">
                    {charities.map((c, i) => (
                      <div key={i}>
                        <CharityEntry
                          charity={c}
                          index={i}
                          onChange={updateCharity}
                          onRemove={removeCharity}
                          canRemove={charities.length > 1}
                        />
                        {errors[`charity_${i}_name`] && (
                          <p className="text-xs text-red-400 mt-1 px-1">{errors[`charity_${i}_name`]}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="flex gap-3 mt-8">
                {currentStep > 1 && (
                  <button type="button" onClick={back}
                    className="flex-1 py-3 border border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white font-semibold rounded-xl text-sm transition-all">
                    ← Back
                  </button>
                )}
                {currentStep < 3 ? (
                  <button type="button" onClick={next}
                    className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-sm transition-all shadow-lg shadow-emerald-900/30">
                    Continue →
                  </button>
                ) : (
                  <button type="button" onClick={handleRegisterSubmit}
                    className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-sm transition-all shadow-lg shadow-emerald-900/30">
                    ✓ Create Admin Account
                  </button>
                )}
              </div>

              <p className="text-center text-xs text-slate-600 mt-5">
                Already have an account?{" "}
                <button onClick={() => { setMode("login"); setErrors({}); }} className="text-emerald-400 hover:text-emerald-300 transition-colors font-medium">
                  Sign in
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}