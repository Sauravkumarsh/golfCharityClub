import { useState, useRef, useEffect } from "react";

const CATEGORIES = [
  "Health & Medical",
  "Education",
  "Environment",
  "Children & Youth",
  "Elderly Care",
  "Animal Welfare",
  "Disaster Relief",
  "Sports & Recreation",
  "Community Development",
  "Arts & Culture",
];

const CATEGORY_ICONS = {
  "Health & Medical": "🏥",
  "Education": "📚",
  "Environment": "🌿",
  "Children & Youth": "🧒",
  "Elderly Care": "🤝",
  "Animal Welfare": "🐾",
  "Disaster Relief": "🆘",
  "Sports & Recreation": "⛳",
  "Community Development": "🏘️",
  "Arts & Culture": "🎨",
};

const CATEGORY_COLORS = {
  "Health & Medical": "from-rose-900/60 to-rose-950/40 border-rose-800/40 text-rose-300",
  "Education": "from-sky-900/60 to-sky-950/40 border-sky-800/40 text-sky-300",
  "Environment": "from-emerald-900/60 to-emerald-950/40 border-emerald-800/40 text-emerald-300",
  "Children & Youth": "from-amber-900/60 to-amber-950/40 border-amber-800/40 text-amber-300",
  "Elderly Care": "from-violet-900/60 to-violet-950/40 border-violet-800/40 text-violet-300",
  "Animal Welfare": "from-orange-900/60 to-orange-950/40 border-orange-800/40 text-orange-300",
  "Disaster Relief": "from-red-900/60 to-red-950/40 border-red-800/40 text-red-300",
  "Sports & Recreation": "from-green-900/60 to-green-950/40 border-green-800/40 text-green-300",
  "Community Development": "from-teal-900/60 to-teal-950/40 border-teal-800/40 text-teal-300",
  "Arts & Culture": "from-pink-900/60 to-pink-950/40 border-pink-800/40 text-pink-300",
};

const BADGE_COLORS = {
  "Health & Medical": "bg-rose-900/50 text-rose-300 border-rose-700/50",
  "Education": "bg-sky-900/50 text-sky-300 border-sky-700/50",
  "Environment": "bg-emerald-900/50 text-emerald-300 border-emerald-700/50",
  "Children & Youth": "bg-amber-900/50 text-amber-300 border-amber-700/50",
  "Elderly Care": "bg-violet-900/50 text-violet-300 border-violet-700/50",
  "Animal Welfare": "bg-orange-900/50 text-orange-300 border-orange-700/50",
  "Disaster Relief": "bg-red-900/50 text-red-300 border-red-700/50",
  "Sports & Recreation": "bg-green-900/50 text-green-300 border-green-700/50",
  "Community Development": "bg-teal-900/50 text-teal-300 border-teal-700/50",
  "Arts & Culture": "bg-pink-900/50 text-pink-300 border-pink-700/50",
};

const INITIAL_CHARITIES = [
  { id: 1, charityName: "Swings for Hope", category: "Health & Medical", organizationName: "GreenHeart Foundation", targetAmount: 15000, createdAt: "2025-01-10", raised: 9200 },
  { id: 2, charityName: "Eagles' Scholars Fund", category: "Education", organizationName: "Birdie Education Trust", targetAmount: 25000, createdAt: "2025-02-14", raised: 18400 },
  { id: 3, charityName: "Fairway Forests", category: "Environment", organizationName: "GreenLinks Initiative", targetAmount: 10000, createdAt: "2025-03-01", raised: 5600 },
  { id: 4, charityName: "Junior Golfers Outreach", category: "Children & Youth", organizationName: "Par for Kids", targetAmount: 8000, createdAt: "2025-03-18", raised: 7100 },
];

const EMPTY_FORM = { charityName: "", category: "", organizationName: "", targetAmount: "" };

function ProgressBar({ value, max }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className="mt-3">
      <div className="flex justify-between text-xs mb-1">
        <span className="text-slate-400">${value.toLocaleString()} raised</span>
        <span className="text-slate-500">{pct}%</span>
      </div>
      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function Toast({ toast }) {
  if (!toast) return null;
  const styles = {
    success: "bg-emerald-900/95 border-emerald-600/60 text-emerald-200",
    error: "bg-red-900/95 border-red-600/60 text-red-200",
    info: "bg-sky-900/95 border-sky-600/60 text-sky-200",
  };
  const icons = { success: "✓", error: "✕", info: "ℹ" };
  return (
    <div className={`fixed bottom-6 right-6 z-[100] flex items-center gap-3 px-5 py-3 rounded-xl border shadow-2xl text-sm font-medium backdrop-blur-sm transition-all ${styles[toast.type]}`}>
      <span className="text-lg">{icons[toast.type]}</span>
      {toast.msg}
    </div>
  );
}

function ConfirmModal({ data, onConfirm, onCancel }) {
  if (!data) return null;
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-[#0e1117] border border-red-800/60 rounded-2xl w-full max-w-sm p-8 text-center space-y-5 shadow-2xl">
        <div className="w-16 h-16 mx-auto rounded-full bg-red-900/30 border-2 border-red-700/50 flex items-center justify-center text-3xl">🗑️</div>
        <div>
          <h3 className="text-lg font-bold text-white">Delete Charity?</h3>
          <p className="text-sm text-slate-400 mt-1">
            <span className="text-white font-semibold">"{data.charityName}"</span> will be permanently removed.
          </p>
        </div>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 py-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-700/60 text-slate-300 border border-slate-700/40 text-sm font-semibold transition-all">
            Cancel
          </button>
          <button onClick={onConfirm} className="flex-1 py-2.5 rounded-xl bg-red-800/60 hover:bg-red-700/70 text-red-200 border border-red-700/50 text-sm font-semibold transition-all">
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}

function CharityFormModal({ mode, initial, onSave, onClose }) {
  const [form, setForm] = useState(initial || EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const firstRef = useRef();

  useEffect(() => { firstRef.current?.focus(); }, []);

  const validate = () => {
    const e = {};
    if (!form.charityName.trim()) e.charityName = "Charity name is required.";
    if (!form.category) e.category = "Select a category.";
    if (!form.organizationName.trim()) e.organizationName = "Organization name is required.";
    if (!form.targetAmount || isNaN(form.targetAmount) || Number(form.targetAmount) <= 0)
      e.targetAmount = "Enter a valid target amount.";
    return e;
  };

  const handleChange = (field, val) => {
    setForm((f) => ({ ...f, [field]: val }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    onSave({ ...form, targetAmount: Number(form.targetAmount) });
  };

  const inputBase = "w-full bg-slate-900/60 border rounded-xl px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:ring-2 transition-all";
  const inputOk = "border-slate-700/50 focus:ring-green-600/50 focus:border-green-700/60";
  const inputErr = "border-red-700/60 focus:ring-red-600/40";

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-[#0e1117] border border-slate-700/50 rounded-2xl w-full max-w-lg shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-600 to-emerald-800 flex items-center justify-center text-lg">
              {mode === "add" ? "➕" : "✏️"}
            </div>
            <div>
              <h2 className="font-bold text-white text-base">{mode === "add" ? "Add New Charity" : "Edit Charity"}</h2>
              <p className="text-xs text-slate-500">Fill all fields to {mode === "add" ? "register" : "update"} the charity</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white text-2xl transition-colors leading-none">×</button>
        </div>

        {/* Body */}
        <div className="px-6 py-6 space-y-5">
          {/* Charity Name */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">Charity Name</label>
            <input
              ref={firstRef}
              value={form.charityName}
              onChange={(e) => handleChange("charityName", e.target.value)}
              placeholder="e.g. Swings for Hope"
              className={`${inputBase} ${errors.charityName ? inputErr : inputOk}`}
            />
            {errors.charityName && <p className="text-xs text-red-400 mt-1.5">{errors.charityName}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">Charity Category</label>
            <div className="relative">
              <select
                value={form.category}
                onChange={(e) => handleChange("category", e.target.value)}
                className={`${inputBase} ${errors.category ? inputErr : inputOk} appearance-none pr-10 cursor-pointer`}
              >
                <option value="" disabled className="bg-slate-900">Select a category…</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c} className="bg-slate-900">{CATEGORY_ICONS[c]} {c}</option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">▾</span>
            </div>
            {errors.category && <p className="text-xs text-red-400 mt-1.5">{errors.category}</p>}
          </div>

          {/* Organization Name */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">Organization Name</label>
            <input
              value={form.organizationName}
              onChange={(e) => handleChange("organizationName", e.target.value)}
              placeholder="e.g. GreenHeart Foundation"
              className={`${inputBase} ${errors.organizationName ? inputErr : inputOk}`}
            />
            {errors.organizationName && <p className="text-xs text-red-400 mt-1.5">{errors.organizationName}</p>}
          </div>

          {/* Target Amount */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">Target Amount (USD)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
              <input
                type="number"
                min="1"
                value={form.targetAmount}
                onChange={(e) => handleChange("targetAmount", e.target.value)}
                placeholder="10000"
                className={`${inputBase} ${errors.targetAmount ? inputErr : inputOk} pl-8`}
              />
            </div>
            {errors.targetAmount && <p className="text-xs text-red-400 mt-1.5">{errors.targetAmount}</p>}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 rounded-xl bg-slate-800/50 hover:bg-slate-700/60 text-slate-300 border border-slate-700/40 font-semibold text-sm transition-all">
            Cancel
          </button>
          <button onClick={handleSubmit} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-green-700 to-emerald-600 hover:from-green-600 hover:to-emerald-500 text-white font-bold text-sm transition-all shadow-lg shadow-green-900/30">
            {mode === "add" ? "➕ Add Charity" : "✓ Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CharityManagement() {
  const [charities, setCharities] = useState(INITIAL_CHARITIES);
  const [modal, setModal] = useState(null); // { type: 'add' | 'edit', data? }
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState(null);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("all");
  const [viewMode, setViewMode] = useState("grid"); // grid | table
  const nextId = useRef(100);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleAdd = (form) => {
    const newCharity = {
      ...form,
      id: nextId.current++,
      createdAt: new Date().toISOString().slice(0, 10),
      raised: 0,
    };
    setCharities((prev) => [newCharity, ...prev]);
    setModal(null);
    showToast(`"${form.charityName}" added successfully.`, "success");
  };

  const handleEdit = (form) => {
    setCharities((prev) => prev.map((c) => c.id === modal.data.id ? { ...c, ...form } : c));
    setModal(null);
    showToast(`"${form.charityName}" updated.`, "info");
  };

  const handleDelete = () => {
    setCharities((prev) => prev.filter((c) => c.id !== deleteTarget.id));
    showToast(`"${deleteTarget.charityName}" deleted.`, "error");
    setDeleteTarget(null);
  };

  const filtered = charities.filter((c) => {
    const matchSearch =
      c.charityName.toLowerCase().includes(search.toLowerCase()) ||
      c.organizationName.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat === "all" || c.category === filterCat;
    return matchSearch && matchCat;
  });

  const totalTarget = charities.reduce((a, c) => a + c.targetAmount, 0);
  const totalRaised = charities.reduce((a, c) => a + c.raised, 0);

  return (
    <div className="min-h-screen bg-[#080c10] text-white" style={{ fontFamily: "'Georgia', serif" }}>
      {/* Dot grid bg */}
      <div className="fixed inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #94a3b8 1px, transparent 0)", backgroundSize: "28px 28px" }} />

      {/* Header */}
      <header className="relative z-10 border-b border-slate-800/60 bg-black/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-800 flex items-center justify-center text-xl">⛳</div>
            <div>
              <p className="text-[10px] text-green-500 tracking-[0.2em] uppercase font-sans">Admin · GreenHeart Golf</p>
              <h1 className="text-xl font-bold text-white tracking-tight leading-tight">Charity Management</h1>
            </div>
          </div>
          <button
            onClick={() => setModal({ type: "add" })}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-green-700 to-emerald-600 hover:from-green-600 hover:to-emerald-500 text-white font-semibold text-sm shadow-lg shadow-green-900/30 transition-all font-sans"
          >
            <span className="text-base">➕</span> Add Charity
          </button>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-8 space-y-8">

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-sans">
          {[
            { label: "Total Charities", value: charities.length, color: "text-white", icon: "🏅" },
            { label: "Categories Active", value: [...new Set(charities.map(c => c.category))].length, color: "text-sky-300", icon: "📂" },
            { label: "Total Target", value: `$${totalTarget.toLocaleString()}`, color: "text-emerald-300", icon: "🎯" },
            { label: "Total Raised", value: `$${totalRaised.toLocaleString()}`, color: "text-amber-300", icon: "💰" },
          ].map((s) => (
            <div key={s.label} className="bg-slate-900/40 border border-slate-800/50 rounded-2xl p-5 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-slate-500 uppercase tracking-widest">{s.label}</p>
                <span className="text-lg">{s.icon}</span>
              </div>
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3 font-sans">
          {/* Search */}
          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">🔍</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by charity or organization name…"
              className="w-full bg-slate-900/50 border border-slate-800/60 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-green-700/40 focus:border-green-800/60 transition-all"
            />
          </div>

          {/* Category filter */}
          <div className="relative">
            <select
              value={filterCat}
              onChange={(e) => setFilterCat(e.target.value)}
              className="appearance-none bg-slate-900/50 border border-slate-800/60 rounded-xl px-4 py-2.5 pr-9 text-sm text-white focus:outline-none focus:ring-2 focus:ring-green-700/40 transition-all cursor-pointer"
            >
              <option value="all">All Categories</option>
              {CATEGORIES.map((c) => <option key={c} value={c}>{CATEGORY_ICONS[c]} {c}</option>)}
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">▾</span>
          </div>

          {/* View toggle */}
          <div className="flex rounded-xl border border-slate-800/60 overflow-hidden bg-slate-900/50">
            {["grid", "table"].map((v) => (
              <button key={v} onClick={() => setViewMode(v)}
                className={`px-4 py-2.5 text-sm font-medium transition-all ${viewMode === v ? "bg-green-800/60 text-green-200" : "text-slate-500 hover:text-slate-300"}`}>
                {v === "grid" ? "⊞ Grid" : "☰ Table"}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p className="text-xs text-slate-600 font-sans -mt-4">
          {filtered.length} {filtered.length === 1 ? "charity" : "charities"} found
        </p>

        {/* ——— GRID VIEW ——— */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.length === 0 && (
              <div className="col-span-3 text-center py-20 text-slate-600 font-sans">
                <div className="text-4xl mb-3">🏌️</div>
                <p className="text-base">No charities match your search.</p>
              </div>
            )}
            {filtered.map((c) => {
              const colors = CATEGORY_COLORS[c.category] || "from-slate-900 to-slate-950 border-slate-800 text-slate-300";
              const badge = BADGE_COLORS[c.category] || "bg-slate-800 text-slate-300 border-slate-700";
              const pct = Math.min(100, Math.round((c.raised / c.targetAmount) * 100));
              return (
                <div key={c.id}
                  className={`relative bg-gradient-to-br ${colors} rounded-2xl border p-5 flex flex-col gap-3 group hover:scale-[1.01] transition-transform duration-200 shadow-xl`}>

                  {/* Top row */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="text-3xl">{CATEGORY_ICONS[c.category]}</div>
                    <span className={`text-[10px] font-semibold uppercase tracking-widest px-2 py-1 rounded-full border font-sans ${badge}`}>
                      {c.category}
                    </span>
                  </div>

                  {/* Names */}
                  <div>
                    <h3 className="font-bold text-white text-base leading-snug">{c.charityName}</h3>
                    <p className="text-xs text-slate-400 mt-0.5 font-sans">{c.organizationName}</p>
                  </div>

                  {/* Target */}
                  <div className="flex items-center justify-between font-sans">
                    <span className="text-xs text-slate-500 uppercase tracking-wide">Target</span>
                    <span className="text-emerald-300 font-bold text-sm">${c.targetAmount.toLocaleString()}</span>
                  </div>

                  {/* Progress */}
                  <ProgressBar value={c.raised} max={c.targetAmount} />

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-1 font-sans">
                    <span className="text-[10px] text-slate-600">Added {c.createdAt}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setModal({ type: "edit", data: c })}
                        className="p-2 rounded-lg bg-slate-800/60 hover:bg-slate-700/70 text-slate-300 hover:text-white text-xs border border-slate-700/40 transition-all"
                        title="Edit"
                      >✏️</button>
                      <button
                        onClick={() => setDeleteTarget(c)}
                        className="p-2 rounded-lg bg-red-900/30 hover:bg-red-800/50 text-red-400 hover:text-red-200 text-xs border border-red-900/30 transition-all"
                        title="Delete"
                      >🗑️</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ——— TABLE VIEW ——— */}
        {viewMode === "table" && (
          <div className="rounded-2xl border border-slate-800/50 overflow-hidden bg-slate-900/20 backdrop-blur-sm font-sans">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-800/60 text-xs text-slate-500 uppercase tracking-widest">
                    <th className="text-left px-6 py-3">#</th>
                    <th className="text-left px-6 py-3">Charity Name</th>
                    <th className="text-left px-6 py-3">Category</th>
                    <th className="text-left px-6 py-3">Organization</th>
                    <th className="text-right px-6 py-3">Target</th>
                    <th className="text-right px-6 py-3">Raised</th>
                    <th className="text-left px-6 py-3">Progress</th>
                    <th className="text-center px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={8} className="text-center py-16 text-slate-600">
                        <div className="text-4xl mb-2">🏌️</div>
                        No charities match your search.
                      </td>
                    </tr>
                  )}
                  {filtered.map((c, i) => {
                    const badge = BADGE_COLORS[c.category] || "bg-slate-800 text-slate-300 border-slate-700";
                    const pct = Math.min(100, Math.round((c.raised / c.targetAmount) * 100));
                    return (
                      <tr key={c.id} className="border-b border-slate-800/30 hover:bg-slate-800/20 transition-colors">
                        <td className="px-6 py-4 text-slate-600 font-mono text-xs">{i + 1}</td>
                        <td className="px-6 py-4">
                          <p className="font-semibold text-white">{c.charityName}</p>
                          <p className="text-xs text-slate-500 mt-0.5">Added {c.createdAt}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${badge}`}>
                            <span>{CATEGORY_ICONS[c.category]}</span>
                            {c.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-300">{c.organizationName}</td>
                        <td className="px-6 py-4 text-right font-bold text-emerald-300">${c.targetAmount.toLocaleString()}</td>
                        <td className="px-6 py-4 text-right text-slate-400">${c.raised.toLocaleString()}</td>
                        <td className="px-6 py-4 min-w-[120px]">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full" style={{ width: `${pct}%` }} />
                            </div>
                            <span className="text-xs text-slate-500 w-8 text-right">{pct}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => setModal({ type: "edit", data: c })}
                              className="p-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/60 text-slate-300 border border-slate-700/30 text-xs transition-all"
                              title="Edit"
                            >✏️</button>
                            <button
                              onClick={() => setDeleteTarget(c)}
                              className="p-2 rounded-lg bg-red-900/30 hover:bg-red-800/50 text-red-400 border border-red-900/30 text-xs transition-all"
                              title="Delete"
                            >🗑️</button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Modals */}
      {modal?.type === "add" && (
        <CharityFormModal mode="add" onSave={handleAdd} onClose={() => setModal(null)} />
      )}
      {modal?.type === "edit" && (
        <CharityFormModal
          mode="edit"
          initial={{ charityName: modal.data.charityName, category: modal.data.category, organizationName: modal.data.organizationName, targetAmount: modal.data.targetAmount }}
          onSave={handleEdit}
          onClose={() => setModal(null)}
        />
      )}
      <ConfirmModal data={deleteTarget} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />
      <Toast toast={toast} />
    </div>
  );
}