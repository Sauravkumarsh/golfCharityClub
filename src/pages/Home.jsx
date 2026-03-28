import { useState } from "react";
import { useNavigate } from "react-router";

const NAV_LINKS = ["Home", "Charity", "Subscription", "How to Use", "Login"];

const STATS = [
  { value: "$2.4M+", label: "Raised for Charity" },
  { value: "3,800+", label: "Active Members" },
  { value: "120+", label: "Charity Partners" },
  { value: "48", label: "Tournaments Held" },
];

const CHARITIES = [
  {
    icon: "🏥",
    name: "Healers Fund",
    desc: "Supporting rural healthcare access across underserved communities.",
    raised: "$420,000",
  },
  {
    icon: "📚",
    name: "Scholar Drive",
    desc: "Scholarships for underprivileged youth in STEM education.",
    raised: "$310,000",
  },
  {
    icon: "🌱",
    name: "Green Earth",
    desc: "Reforestation and clean water initiatives worldwide.",
    raised: "$285,000",
  },
];

const PLANS = [
  {
    name: "Birdie",
    price: "$29",
    period: "/mo",
    color: "from-emerald-800 to-emerald-600",
    accent: "bg-emerald-500",
    features: ["Access to 2 events/month", "Charity leaderboard", "Member newsletter", "Basic handicap tracking"],
    cta: "Join Birdie",
  },
  {
    name: "Eagle",
    price: "$69",
    period: "/mo",
    color: "from-amber-700 to-amber-500",
    accent: "bg-amber-400",
    badge: "Most Popular",
    features: ["Unlimited events", "Priority tee times", "Charity impact dashboard", "Advanced stats", "Guest passes (2/mo)"],
    cta: "Join Eagle",
  },
  {
    name: "Albatross",
    price: "$149",
    period: "/mo",
    color: "from-slate-800 to-slate-600",
    accent: "bg-slate-300",
    features: ["All Eagle features", "VIP tournament access", "Personal caddie concierge", "Charity naming rights", "Unlimited guests"],
    cta: "Join Albatross",
  },
];

const HOW_STEPS = [
  { step: "01", title: "Sign Up", desc: "Choose your membership tier and complete your golfer profile in minutes." },
  { step: "02", title: "Book Events", desc: "Browse curated tournaments and charity rounds near you or worldwide." },
  { step: "03", title: "Play & Give", desc: "A portion of every round directly funds the charity of your choice." },
  { step: "04", title: "Track Impact", desc: "See your personal charity contributions grow with every swing." },
];

const FOOTER_LINKS = {
  Club: ["About Us", "Our Story", "Leadership", "Press"],
  Charity: ["Current Campaigns", "Impact Reports", "Partner With Us", "Donate"],
  Members: ["Events Calendar", "Handicap Tracker", "Leaderboard", "Referral Program"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Accessibility"],
};

export default function GolfCharityClub() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");
  const navigate=useNavigate();

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-serif">
      {/* Custom font injection */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Lato:wght@300;400;700&display=swap');
        body { font-family: 'Lato', sans-serif; }
        .display { font-family: 'Playfair Display', serif; }
        .grain::before {
          content: '';
          position: absolute; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none; z-index: 1;
        }
        .hero-bg {
          background: radial-gradient(ellipse at 60% 40%, rgba(16,78,45,0.45) 0%, transparent 65%),
                      radial-gradient(ellipse at 20% 80%, rgba(120,85,30,0.25) 0%, transparent 55%),
                      #0c1a0f;
        }
        .card-hover { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .card-hover:hover { transform: translateY(-6px); box-shadow: 0 20px 60px rgba(0,0,0,0.5); }
        @keyframes fadeUp { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
        .fade-up { animation: fadeUp 0.9s ease forwards; }
        .fade-up-2 { animation: fadeUp 0.9s 0.2s ease both; }
        .fade-up-3 { animation: fadeUp 0.9s 0.4s ease both; }
        .flag-pin::after {
          content:'';
          display:block; width:2px; height:48px;
          background: linear-gradient(to bottom, #d4af37, transparent);
          margin: 0 auto;
        }
      `}</style>

      {/* ── HEADER ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-stone-950/80 backdrop-blur-md border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-600 to-emerald-900 flex items-center justify-center shadow-lg shadow-emerald-900/40">
              <span className="text-lg">⛳</span>
            </div>
            <div>
              <p className="display text-sm font-bold text-amber-400 leading-none tracking-wide">FAIRWAY</p>
              <p className="text-[10px] text-stone-400 tracking-[0.2em] uppercase leading-none">Charity Golf Club</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) =>
              link === "Login" ? (
                <button
                  onClick={()=>navigate("/admin-login")}
                  className="ml-4 px-5 py-2 text-sm font-bold tracking-wider border border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-stone-950 transition-all duration-200 rounded-sm"
                >
                  Login
                </button>
              ) : (
                <button
                  key={link}
                  onClick={() => setActiveLink(link)}
                  className={`px-4 py-2 text-sm tracking-wider transition-colors duration-200 ${
                    activeLink === link
                      ? "text-amber-400 font-bold"
                      : "text-stone-300 hover:text-amber-300"
                  }`}
                >
                  {link}
                </button>
              )
            )}
          </nav>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-stone-300 hover:text-amber-400 transition-colors"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-stone-900 border-t border-stone-800 px-6 py-4 flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                className={`text-left py-2 text-sm tracking-wider border-b border-stone-800 ${
                  link === "Login" ? "text-amber-400 font-bold" : "text-stone-300 hover:text-amber-300"
                }`}
              >
                {link}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section className="relative hero-bg grain pt-16 min-h-screen flex items-center overflow-hidden">
        {/* Decorative golf ball */}
        <div className="absolute right-[8%] top-[20%] w-48 h-48 rounded-full bg-gradient-to-br from-stone-200 to-stone-400 opacity-5 blur-2xl" />
        <div className="absolute right-[12%] top-[22%] w-32 h-32 rounded-full border border-stone-600/20" />

        <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <p className="fade-up text-amber-400 text-xs tracking-[0.3em] uppercase font-bold mb-4">
              ⛳ Where Golf Meets Purpose
            </p>
            <h1 className="fade-up-2 display text-5xl md:text-7xl font-black leading-[1.05] mb-6">
              Play With <em className="text-emerald-400 not-italic">Heart.</em>
              <br />Give With <em className="text-amber-400 not-italic">Pride.</em>
            </h1>
            <p className="fade-up-3 text-stone-400 text-lg leading-relaxed max-w-md mb-10">
              Join the most exclusive golf charity club where every swing drives real change. Premium golf. Meaningful impact. One membership.
            </p>
            <div className="fade-up-3 flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold tracking-widest text-sm transition-all duration-200 rounded-sm shadow-lg shadow-emerald-900/40">
                BECOME A MEMBER
              </button>
              <button className="px-8 py-4 border border-stone-600 hover:border-amber-500 hover:text-amber-400 text-stone-300 font-bold tracking-widest text-sm transition-all duration-200 rounded-sm">
                OUR IMPACT ↓
              </button>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="hidden md:flex flex-col items-center justify-center relative">
            <div className="relative w-72 h-72">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-800/40 to-transparent border border-emerald-700/30" />
              <div className="absolute inset-8 rounded-full bg-gradient-to-br from-emerald-700/20 to-transparent border border-emerald-600/20" />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-8xl">⛳</span>
                <div className="flag-pin mt-2" />
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-amber-500/10 border border-amber-500/30 rounded-lg px-5 py-3 text-center">
              <p className="display text-3xl font-black text-amber-400">$2.4M</p>
              <p className="text-xs text-stone-400 tracking-widest uppercase">Raised to Date</p>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-stone-900/80 backdrop-blur border-t border-stone-800">
          <div className="max-w-7xl mx-auto px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p className="display text-2xl font-black text-amber-400">{s.value}</p>
                <p className="text-xs text-stone-500 tracking-wider uppercase mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CHARITIES ── */}
      <section className="py-24 bg-stone-900 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-amber-400 text-xs tracking-[0.3em] uppercase font-bold mb-3">Our Cause</p>
            <h2 className="display text-4xl md:text-5xl font-black mb-4">Charities We Champion</h2>
            <p className="text-stone-400 max-w-xl mx-auto">Every membership directly fuels these causes. You choose where your game makes its mark.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {CHARITIES.map((c) => (
              <div key={c.name} className="card-hover bg-stone-800 border border-stone-700 rounded-lg p-8 relative overflow-hidden group">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-600 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="text-4xl block mb-5">{c.icon}</span>
                <h3 className="display text-xl font-bold mb-2">{c.name}</h3>
                <p className="text-stone-400 text-sm leading-relaxed mb-6">{c.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-stone-500 uppercase tracking-widest">Total Raised</span>
                  <span className="display text-lg font-black text-emerald-400">{c.raised}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW TO USE ── */}
      <section className="py-24 bg-stone-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(16,78,45,0.15)_0%,transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <p className="text-amber-400 text-xs tracking-[0.3em] uppercase font-bold mb-3">How It Works</p>
            <h2 className="display text-4xl md:text-5xl font-black mb-4">Four Simple Steps</h2>
            <p className="text-stone-400 max-w-xl mx-auto">From your first swing to your first charitable contribution — it's effortless.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {HOW_STEPS.map((s, i) => (
              <div key={s.step} className="relative">
                {i < HOW_STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-stone-700 to-transparent z-0" />
                )}
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center mb-5">
                    <span className="display text-xl font-black text-amber-400">{s.step}</span>
                  </div>
                  <h3 className="display text-lg font-bold mb-2">{s.title}</h3>
                  <p className="text-stone-400 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SUBSCRIPTIONS ── */}
      <section className="py-24 bg-stone-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-amber-400 text-xs tracking-[0.3em] uppercase font-bold mb-3">Membership</p>
            <h2 className="display text-4xl md:text-5xl font-black mb-4">Choose Your Tier</h2>
            <p className="text-stone-400 max-w-xl mx-auto">Flexible plans for every level of golfer and every level of generosity.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            {PLANS.map((p) => (
              <div key={p.name} className={`card-hover relative rounded-lg overflow-hidden border border-stone-700 flex flex-col ${p.badge ? "ring-2 ring-amber-500/50" : ""}`}>
                {p.badge && (
                  <div className="absolute top-4 right-4 bg-amber-500 text-stone-950 text-xs font-black px-3 py-1 rounded-full tracking-wider">
                    {p.badge}
                  </div>
                )}
                <div className={`bg-gradient-to-br ${p.color} p-8`}>
                  <p className="text-xs tracking-[0.3em] uppercase text-white/60 mb-2">{p.name} Plan</p>
                  <p className="display text-5xl font-black text-white">
                    {p.price}<span className="text-xl font-light text-white/60">{p.period}</span>
                  </p>
                </div>
                <div className="bg-stone-800 p-8 flex flex-col flex-1">
                  <ul className="space-y-3 mb-8 flex-1">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-stone-300">
                        <span className="text-emerald-400 mt-0.5 shrink-0">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full py-3 font-bold text-sm tracking-widest transition-all duration-200 rounded-sm ${p.badge ? "bg-amber-500 text-stone-950 hover:bg-amber-400" : "border border-stone-600 text-stone-300 hover:border-amber-500 hover:text-amber-400"}`}>
                    {p.cta.toUpperCase()}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-20 bg-gradient-to-r from-emerald-900 to-emerald-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[repeating-linear-gradient(45deg,#fff_0px,#fff_1px,transparent_1px,transparent_12px)]" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="display text-4xl md:text-5xl font-black mb-5">
            Your Best Round Starts Here.
          </h2>
          <p className="text-emerald-200 text-lg mb-10 max-w-xl mx-auto">
            Join thousands of members whose passion for golf is changing lives around the world.
          </p>
          <button className="px-10 py-4 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black tracking-widest text-sm transition-all duration-200 rounded-sm shadow-xl shadow-amber-900/30">
            START YOUR MEMBERSHIP TODAY
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-stone-950 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-5 gap-12 mb-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-600 to-emerald-900 flex items-center justify-center">
                  <span className="text-lg">⛳</span>
                </div>
                <div>
                  <p className="display text-sm font-bold text-amber-400 leading-none">FAIRWAY</p>
                  <p className="text-[9px] text-stone-500 tracking-[0.2em] uppercase">Charity Golf Club</p>
                </div>
              </div>
              <p className="text-stone-500 text-xs leading-relaxed mt-4">
                Uniting golfers worldwide through the power of sport and the spirit of giving.
              </p>
              <div className="flex gap-4 mt-6">
                {["𝕏", "in", "f", "▶"].map((icon) => (
                  <button key={icon} className="w-8 h-8 rounded-full border border-stone-700 hover:border-amber-500 hover:text-amber-400 text-stone-400 text-xs flex items-center justify-center transition-colors">
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Links */}
            {Object.entries(FOOTER_LINKS).map(([cat, links]) => (
              <div key={cat}>
                <p className="text-xs font-bold tracking-[0.2em] text-stone-400 uppercase mb-4">{cat}</p>
                <ul className="space-y-2">
                  {links.map((l) => (
                    <li key={l}>
                      <button className="text-stone-500 hover:text-amber-400 text-sm transition-colors">
                        {l}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div className="border-t border-stone-800 pt-10 mb-10">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <p className="display text-lg font-bold mb-1">Stay on the Fairway</p>
                <p className="text-stone-500 text-sm">Get tournament dates, charity news, and member spotlights.</p>
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="bg-stone-800 border border-stone-700 focus:border-amber-500 outline-none px-4 py-3 text-sm text-stone-200 rounded-sm flex-1 md:w-64 placeholder-stone-600 transition-colors"
                />
                <button className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold tracking-widest rounded-sm transition-colors whitespace-nowrap">
                  SUBSCRIBE
                </button>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-stone-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-600">
            <p>© 2026 Fairway Charity Golf Club. All rights reserved.</p>
            <p className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
              Registered 501(c)(3) Non-Profit Organization
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}