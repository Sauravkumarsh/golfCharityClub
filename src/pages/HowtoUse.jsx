import { useState } from "react";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const steps = [
  {
    num: "01",
    icon: "🏌️",
    title: "Choose Your Plan",
    desc: "Pick the subscription tier that matches your golfing ambitions — from Caddy to Benefactor. Each plan unlocks a unique set of club privileges.",
    color: "#6ee7b7",
  },
  {
    num: "02",
    icon: "📋",
    title: "Complete Registration",
    desc: "Fill in your member profile, handicap, and billing details. Your 14-day free trial starts immediately upon sign-up.",
    color: "#fcd34d",
  },
  {
    num: "03",
    icon: "🏆",
    title: "Play & Earn Points",
    desc: "Every round you play earns Fairway Points. Attend events, refer friends, and complete challenges to multiply your monthly points balance.",
    color: "#f9a8d4",
  },
  {
    num: "04",
    icon: "🎁",
    title: "Win Monthly Rewards",
    desc: "At the end of each month, the top points earners win exclusive prizes — gear, tee times, VIP experiences and more, chosen by the admin.",
    color: "#a5b4fc",
  },
  {
    num: "05",
    icon: "❤️",
    title: "Your Charity Impact",
    desc: "10% of your monthly subscription is automatically directed to our Charity Foundation by the club admin — creating lasting community impact.",
    color: "#fb923c",
  },
];

const plans = [
  {
    id: "caddy",
    name: "Caddy",
    price: 49,
    icon: "⛳",
    color: "#6ee7b7",
    bg: "from-emerald-900/60 to-emerald-800/30",
    border: "#6ee7b733",
    charity: 4.9,
    points: 100,
    perks: ["1 round/month", "Driving range", "Newsletter", "Community events"],
  },
  {
    id: "member",
    name: "Member",
    price: 129,
    icon: "🏌️",
    color: "#fcd34d",
    bg: "from-amber-900/60 to-amber-800/30",
    border: "#fcd34d33",
    charity: 12.9,
    points: 300,
    badge: "Popular",
    perks: [
      "Unlimited rounds",
      "Priority bookings",
      "2 guest passes/mo",
      "Coaching session",
      "10% pro shop discount",
    ],
  },
  {
    id: "patron",
    name: "Patron",
    price: 299,
    icon: "🏆",
    color: "#a5b4fc",
    bg: "from-indigo-900/60 to-indigo-800/30",
    border: "#a5b4fc33",
    charity: 29.9,
    points: 800,
    perks: [
      "All Member perks",
      "VIP lounge",
      "Named sponsorship",
      "6 guest passes/mo",
      "Dedicated concierge",
    ],
  },
  {
    id: "benefactor",
    name: "Benefactor",
    price: 599,
    icon: "👑",
    color: "#fda4af",
    bg: "from-rose-900/60 to-rose-800/30",
    border: "#fda4af33",
    charity: 59.9,
    points: 2000,
    perks: [
      "All Patron perks",
      "Board advisory seat",
      "Unlimited guests",
      "Personal caddy",
      "Annual gala table",
    ],
  },
];

const rewards = [
  {
    rank: 1,
    label: "Gold Champion",
    icon: "🥇",
    prize: "Weekend Golf Getaway for 2",
    points: "2000+ pts",
    color: "#fcd34d",
  },
  {
    rank: 2,
    label: "Silver Ace",
    icon: "🥈",
    prize: "Premium Club Set (worth $800)",
    points: "1200–1999 pts",
    color: "#cbd5e1",
  },
  {
    rank: 3,
    label: "Bronze Eagle",
    icon: "🥉",
    prize: "3-Month Pro Shop Credit",
    points: "600–1199 pts",
    color: "#fb923c",
  },
  {
    rank: 4,
    label: "Participant",
    icon: "⭐",
    prize: "Free Coaching Session",
    points: "200–599 pts",
    color: "#6ee7b7",
  },
];

const charityStats = [
  { label: "Members Contributing", value: "1,240+", icon: "👥" },
  { label: "Total Donated This Year", value: "$186,400", icon: "💰" },
  { label: "Charity Initiatives Funded", value: "14", icon: "🌱" },
  { label: "Communities Impacted", value: "6", icon: "🏘️" },
];

/* ─────────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────────── */
function SectionLabel({ children }) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-5"
      style={{ background: "#16a34a18", color: "#4ade80", border: "1px solid #16a34a44" }}>
      {children}
    </div>
  );
}

function StepCard({ step, idx }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="relative flex gap-5 p-6 rounded-2xl transition-all duration-400 cursor-default"
      style={{
        background: hovered ? `${step.color}0d` : "rgba(10,25,15,0.7)",
        border: `1px solid ${hovered ? step.color + "44" : "#ffffff0f"}`,
        transform: hovered ? "translateY(-4px)" : "none",
        transition: "all 0.3s ease",
        animationDelay: `${idx * 0.1}s`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-xl"
        style={{ background: step.color + "18", border: `1px solid ${step.color}44` }}
      >
        {step.icon}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-1">
          <span
            className="text-xs font-black tracking-widest"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              color: step.color,
              opacity: 0.7,
            }}
          >
            STEP {step.num}
          </span>
        </div>
        <h3
          className="text-base font-bold text-white mb-1"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          {step.title}
        </h3>
        <p className="text-sm text-gray-400 leading-relaxed">{step.desc}</p>
      </div>
    </div>
  );
}

function PlanCard({ plan }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={`relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300 bg-gradient-to-b ${plan.bg}`}
      style={{
        border: `1px solid ${hovered ? plan.color + "55" : plan.border}`,
        transform: hovered ? "translateY(-6px)" : "none",
        boxShadow: hovered ? `0 20px 40px ${plan.color}18` : "none",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {plan.badge && (
        <div className="absolute top-3 right-3">
          <span
            className="text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-widest"
            style={{ background: plan.color + "22", color: plan.color, border: `1px solid ${plan.color}44` }}
          >
            {plan.badge}
          </span>
        </div>
      )}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">{plan.icon}</span>
          <h3
            className="text-lg font-black"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: plan.color }}
          >
            {plan.name}
          </h3>
        </div>
        <div className="flex items-end gap-1 mb-4">
          <span className="text-3xl font-black text-white" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
            ${plan.price}
          </span>
          <span className="text-gray-400 text-xs mb-1">/month</span>
        </div>

        {/* Points & Charity pills */}
        <div className="flex gap-2 mb-4 flex-wrap">
          <span className="text-xs px-2.5 py-1 rounded-full font-semibold"
            style={{ background: "#a5b4fc18", color: "#a5b4fc", border: "1px solid #a5b4fc33" }}>
            🎯 {plan.points} pts/mo
          </span>
          <span className="text-xs px-2.5 py-1 rounded-full font-semibold"
            style={{ background: "#fb923c18", color: "#fb923c", border: "1px solid #fb923c33" }}>
            ❤️ ${plan.charity} to charity
          </span>
        </div>

        <div className="w-full h-px mb-4" style={{ background: plan.color + "22" }} />

        <ul className="space-y-2">
          {plan.perks.map((p) => (
            <li key={p} className="flex items-center gap-2 text-xs text-gray-300">
              <span style={{ color: plan.color }}>✓</span> {p}
            </li>
          ))}
        </ul>

        <button
          className="mt-5 w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300"
          style={{
            background: hovered ? plan.color + "33" : plan.color + "18",
            color: plan.color,
            border: `1px solid ${plan.color}44`,
          }}
        >
          Choose {plan.name}
        </button>
      </div>
    </div>
  );
}

function RewardRow({ reward, idx }) {
  return (
    <div
      className="flex items-center gap-4 p-4 rounded-xl"
      style={{
        background: idx === 0 ? reward.color + "0f" : "rgba(10,25,15,0.5)",
        border: `1px solid ${reward.color}33`,
        animationDelay: `${idx * 0.1}s`,
      }}
    >
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0"
        style={{ background: reward.color + "22" }}
      >
        {reward.icon}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-white" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
            {reward.label}
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: reward.color + "22", color: reward.color }}>
            {reward.points}
          </span>
        </div>
        <p className="text-xs text-gray-400 mt-0.5">{reward.prize}</p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
export default function GolfHowToUse() {
  const [activeTab, setActiveTab] = useState("how");
  const tabs = [
    { id: "how", label: "How It Works" },
    { id: "plans", label: "Packages" },
    { id: "rewards", label: "Rewards" },
    { id: "charity", label: "Charity Impact" },
  ];

  return (
    <div
      className="min-h-screen w-full relative overflow-x-hidden"
      style={{
        background: "linear-gradient(150deg,#061410 0%,#0c1f16 55%,#071209 100%)",
        fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
      }}
    >
      {/* Background mesh */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 60% 40% at 15% 20%, #16a34a14 0%, transparent 60%),
            radial-gradient(ellipse 50% 50% at 85% 75%, #78350f14 0%, transparent 60%)`,
        }}
      />
      {/* Grid */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#6ee7b7" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-16">

        {/* ── HERO ── */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6"
            style={{ background: "#16a34a18", color: "#4ade80", border: "1px solid #16a34a44" }}>
            ⛳ &nbsp; Fairway Charity Golf Club
          </div>
          <h1
            className="text-5xl md:text-7xl font-black text-white leading-none mb-4"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            How It <span style={{ color: "#6ee7b7" }}>Works</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Your complete guide to memberships, monthly rewards, and how every subscription fuels meaningful charity work — managed with care by our admin team.
          </p>
        </div>

        {/* ── TABS ── */}
        <div className="flex gap-1 p-1 rounded-2xl mx-auto w-fit mb-12 flex-wrap justify-center"
          style={{ background: "rgba(10,25,15,0.8)", border: "1px solid #ffffff0f" }}>
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300"
              style={
                activeTab === t.id
                  ? { background: "#16a34a", color: "#fff" }
                  : { color: "#9ca3af" }
              }
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ── HOW IT WORKS ── */}
        {activeTab === "how" && (
          <section>
            <div className="text-center mb-10">
              <SectionLabel>📖 Step-by-Step Guide</SectionLabel>
              <h2 className="text-3xl md:text-4xl font-black text-white" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                Your Journey, <span style={{ color: "#6ee7b7" }}>From Tee to Trophy</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {steps.map((step, idx) => (
                <StepCard key={step.num} step={step} idx={idx} />
              ))}
            </div>

            {/* Quick Summary Banner */}
            <div
              className="mt-10 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6"
              style={{ background: "linear-gradient(135deg,#16a34a18,#78350f18)", border: "1px solid #6ee7b722" }}
            >
              <div className="text-5xl">🌍</div>
              <div className="flex-1 text-center md:text-left">
                <h3
                  className="text-xl font-black text-white mb-1"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  Play. Win. Give Back.
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Every membership automatically routes <span className="text-amber-400 font-bold">10% of your subscription fee</span> to our Charity Foundation. The admin allocates these funds monthly to vetted community programs — you play, and the world benefits.
                </p>
              </div>
              <button
                className="flex-shrink-0 px-6 py-3 rounded-xl text-sm font-bold text-white transition-all duration-300 hover:opacity-80"
                style={{ background: "linear-gradient(135deg,#16a34a,#15803d)" }}
              >
                Join Now →
              </button>
            </div>

            {/* FAQ strip */}
            <div className="mt-8 grid md:grid-cols-3 gap-4">
              {[
                { q: "Can I upgrade my plan?", a: "Yes — upgrade or downgrade anytime from your member dashboard, effective next billing cycle.", icon: "🔄" },
                { q: "How are charity funds managed?", a: "The club admin reviews and distributes the pooled 10% monthly to approved charity initiatives.", icon: "🛡️" },
                { q: "When are rewards announced?", a: "On the 1st of each month, the admin publishes winners and dispatches prizes within 7 days.", icon: "📅" },
              ].map((faq) => (
                <div
                  key={faq.q}
                  className="p-5 rounded-2xl"
                  style={{ background: "rgba(10,25,15,0.7)", border: "1px solid #ffffff0f" }}
                >
                  <div className="text-2xl mb-2">{faq.icon}</div>
                  <h4 className="text-sm font-bold text-white mb-1">{faq.q}</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── PACKAGES ── */}
        {activeTab === "plans" && (
          <section>
            <div className="text-center mb-10">
              <SectionLabel>📦 Subscription Packages</SectionLabel>
              <h2 className="text-3xl md:text-4xl font-black text-white" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                Choose Your <span style={{ color: "#fcd34d" }}>Membership</span>
              </h2>
              <p className="text-gray-400 text-sm mt-3 max-w-xl mx-auto">
                Every plan earns Fairway Points and contributes 10% to charity. More investment = more points, bigger prizes, and greater impact.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
              {plans.map((plan) => (
                <PlanCard key={plan.id} plan={plan} />
              ))}
            </div>

            {/* Points explainer */}
            <div
              className="mt-8 rounded-2xl p-6"
              style={{ background: "rgba(10,25,15,0.8)", border: "1px solid #a5b4fc33" }}
            >
              <h3 className="text-lg font-black text-white mb-4 flex items-center gap-2" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                🎯 How to Earn Points
              </h3>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { action: "Play a Round", pts: "+50 pts", icon: "⛳" },
                  { action: "Attend an Event", pts: "+30 pts", icon: "🎪" },
                  { action: "Refer a Friend", pts: "+100 pts", icon: "👥" },
                  { action: "Complete a Challenge", pts: "+25–150 pts", icon: "🏅" },
                ].map((item) => (
                  <div
                    key={item.action}
                    className="flex items-center gap-3 p-3 rounded-xl"
                    style={{ background: "#a5b4fc0d", border: "1px solid #a5b4fc22" }}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <div>
                      <p className="text-xs text-white font-semibold">{item.action}</p>
                      <p className="text-xs font-bold" style={{ color: "#a5b4fc" }}>{item.pts}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Charity row */}
            <div className="mt-5 rounded-2xl p-5 flex items-center gap-4"
              style={{ background: "#fb923c0d", border: "1px solid #fb923c33" }}>
              <span className="text-3xl">❤️</span>
              <div>
                <p className="text-sm font-bold text-white">Automatic Charity Contribution</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  10% of your monthly fee is ring-fenced by the admin and donated to our verified charity partners each billing cycle. You receive a donation receipt with your statement.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* ── REWARDS ── */}
        {activeTab === "rewards" && (
          <section>
            <div className="text-center mb-10">
              <SectionLabel>🏆 Monthly Rewards Program</SectionLabel>
              <h2 className="text-3xl md:text-4xl font-black text-white" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                Compete. <span style={{ color: "#fcd34d" }}>Win.</span> Repeat.
              </h2>
              <p className="text-gray-400 text-sm mt-3 max-w-xl mx-auto">
                Each month, the admin tallies Fairway Points and awards prizes to the top performers. Every member has a chance to win.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Reward tiers */}
              <div>
                <h3 className="text-lg font-black text-white mb-4 flex items-center gap-2" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                  🎖️ Monthly Prize Tiers
                </h3>
                <div className="space-y-3">
                  {rewards.map((r, i) => (
                    <RewardRow key={r.rank} reward={r} idx={i} />
                  ))}
                </div>
              </div>

              {/* How rewards work */}
              <div>
                <h3 className="text-lg font-black text-white mb-4 flex items-center gap-2" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                  ⚙️ How Rewards Work
                </h3>
                <div className="space-y-3">
                  {[
                    { icon: "📊", title: "Points are tallied on the last day of each month", desc: "Your leaderboard position is calculated from all activities during that calendar month." },
                    { icon: "👨‍💼", title: "Admin announces winners on the 1st", desc: "Results are published on the club portal and sent via email to all members." },
                    { icon: "🚚", title: "Prizes dispatched within 7 days", desc: "Physical prizes are couriered; digital rewards (credits, sessions) are activated instantly." },
                    { icon: "🔄", title: "Points reset each month", desc: "Every member starts fresh on the 1st — giving everyone a fair shot at winning." },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="flex gap-3 p-4 rounded-xl"
                      style={{ background: "rgba(10,25,15,0.7)", border: "1px solid #ffffff0f" }}
                    >
                      <span className="text-xl flex-shrink-0">{item.icon}</span>
                      <div>
                        <p className="text-sm font-bold text-white">{item.title}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8 text-center p-8 rounded-2xl"
              style={{ background: "linear-gradient(135deg,#fcd34d12,#fb923c12)", border: "1px solid #fcd34d33" }}>
              <p className="text-2xl font-black text-white mb-2" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                Ready to climb the leaderboard?
              </p>
              <p className="text-gray-400 text-sm mb-5">
                Start earning Fairway Points the moment you join. The top prize this month is a <span className="text-amber-400 font-bold">3-night golf retreat</span>.
              </p>
              <button
                className="px-8 py-3 rounded-xl font-bold text-sm text-black transition-all hover:opacity-80"
                style={{ background: "linear-gradient(90deg,#fcd34d,#fb923c)" }}
              >
                Start Earning Now →
              </button>
            </div>
          </section>
        )}

        {/* ── CHARITY ── */}
        {activeTab === "charity" && (
          <section>
            <div className="text-center mb-10">
              <SectionLabel>❤️ Charity Impact</SectionLabel>
              <h2 className="text-3xl md:text-4xl font-black text-white" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                Every Swing <span style={{ color: "#fb923c" }}>Changes Lives</span>
              </h2>
              <p className="text-gray-400 text-sm mt-3 max-w-xl mx-auto">
                The admin pools 10% from all subscriptions and distributes funds monthly to verified community charities. Here's the impact so far.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {charityStats.map((s) => (
                <div
                  key={s.label}
                  className="p-5 rounded-2xl text-center"
                  style={{ background: "rgba(10,25,15,0.8)", border: "1px solid #fb923c22" }}
                >
                  <div className="text-3xl mb-2">{s.icon}</div>
                  <p className="text-2xl font-black text-white" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                    {s.value}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{s.label}</p>
                </div>
              ))}
            </div>

            {/* How it works breakdown */}
            <div
              className="rounded-2xl p-6 mb-6"
              style={{ background: "rgba(10,25,15,0.8)", border: "1px solid #6ee7b722" }}
            >
              <h3 className="text-lg font-black text-white mb-5 flex items-center gap-2"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                💡 How the 10% Works
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  {
                    step: "1",
                    title: "You Subscribe",
                    desc: "You pay your monthly membership. 10% is immediately ring-fenced.",
                    icon: "💳",
                    color: "#6ee7b7",
                  },
                  {
                    step: "2",
                    title: "Admin Reviews",
                    desc: "The admin evaluates charity applications and allocates pooled funds to approved initiatives.",
                    icon: "🔍",
                    color: "#fcd34d",
                  },
                  {
                    step: "3",
                    title: "Charity Gets Funded",
                    desc: "Funds are transferred by the 10th of each month. You receive a receipt for tax purposes.",
                    icon: "🌱",
                    color: "#fb923c",
                  },
                ].map((item) => (
                  <div
                    key={item.step}
                    className="p-4 rounded-xl"
                    style={{ background: item.color + "0d", border: `1px solid ${item.color}33` }}
                  >
                    <div className="text-2xl mb-2">{item.icon}</div>
                    <p className="text-sm font-bold text-white mb-1">{item.title}</p>
                    <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Per-plan contribution visual */}
            <div className="rounded-2xl p-6" style={{ background: "rgba(10,25,15,0.8)", border: "1px solid #ffffff0f" }}>
              <h3 className="text-lg font-black text-white mb-5" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                Your Contribution by Plan
              </h3>
              <div className="space-y-4">
                {plans.map((plan) => (
                  <div key={plan.id} className="flex items-center gap-4">
                    <span className="w-24 text-sm font-bold flex items-center gap-1" style={{ color: plan.color }}>
                      {plan.icon} {plan.name}
                    </span>
                    <div className="flex-1 h-3 rounded-full overflow-hidden" style={{ background: "#ffffff0f" }}>
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{
                          width: `${(plan.charity / 59.9) * 100}%`,
                          background: `linear-gradient(90deg, ${plan.color}88, ${plan.color})`,
                        }}
                      />
                    </div>
                    <span className="text-sm font-bold w-14 text-right" style={{ color: plan.color }}>
                      ${plan.charity}
                    </span>
                    <span className="text-xs text-gray-500 w-12">/mo</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-4">
                * Exact monthly contribution routed to charity by admin. Annual members contribute the same percentage.
              </p>
            </div>
          </section>
        )}

        {/* ── FOOTER NOTE ── */}
        <div className="text-center mt-16 space-y-2">
          <p className="text-gray-500 text-sm">
            🏌️ Questions? Contact our club admin at{" "}
            <span className="text-emerald-400 underline cursor-pointer">admin@fairwaygolf.org</span>
          </p>
          <p className="text-gray-600 text-xs">
            All charity contributions are independently verified. Tax receipts issued on request.
          </p>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@700;900&family=DM+Sans:wght@400;500;600;700&display=swap');
      `}</style>
    </div>
  );
}