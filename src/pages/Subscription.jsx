import { useState } from "react";

const plans = [
  {
    id: "caddy",
    name: "Caddy",
    subtitle: "Start your journey",
    price: 49,
    period: "month",
    color: "from-emerald-800 to-emerald-600",
    accent: "#6ee7b7",
    badge: null,
    icon: "⛳",
    features: [
      "1 round of golf per month",
      "Access to driving range",
      "Club storage (basic)",
      "Charity newsletter",
      "Community events access",
    ],
    cta: "Join as Caddy",
  },
  {
    id: "member",
    name: "Member",
    subtitle: "The golfer's choice",
    price: 129,
    period: "month",
    color: "from-amber-700 to-yellow-500",
    accent: "#fcd34d",
    badge: "Most Popular",
    icon: "🏌️",
    features: [
      "Unlimited rounds of golf",
      "Priority tee bookings",
      "Full club storage locker",
      "Guest passes (2/month)",
      "Charity gala invitations",
      "Coaching sessions (1/month)",
      "Pro shop discount (10%)",
    ],
    cta: "Become a Member",
  },
  {
    id: "patron",
    name: "Patron",
    subtitle: "Lead with legacy",
    price: 299,
    period: "month",
    color: "from-slate-700 to-slate-500",
    accent: "#c7d2fe",
    badge: "Prestige",
    icon: "🏆",
    features: [
      "Everything in Member",
      "VIP lounge access",
      "Named charity sponsorship",
      "Annual tournament slot",
      "Guest passes (6/month)",
      "Exclusive Patron dinners",
      "Dedicated concierge",
      "Pro shop discount (20%)",
    ],
    cta: "Become a Patron",
  },
  {
    id: "benefactor",
    name: "Benefactor",
    subtitle: "The ultimate gift",
    price: 599,
    period: "month",
    color: "from-rose-900 to-rose-600",
    accent: "#fda4af",
    badge: "Elite",
    icon: "👑",
    features: [
      "Everything in Patron",
      "Lifetime membership plaque",
      "Private charity event hosting",
      "Charity board advisory seat",
      "Unlimited guest passes",
      "Bespoke golf gear package",
      "Personal caddy on demand",
      "Annual charity gala table",
    ],
    cta: "Become a Benefactor",
  },
];

const CheckIcon = ({ color }) => (
  <svg
    className="w-4 h-4 flex-shrink-0 mt-0.5"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="10" cy="10" r="9" fill={color} fillOpacity="0.18" />
    <path
      d="M6 10.5L8.8 13.5L14 7.5"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function PlanCard({ plan, isAnnual }) {
  const [hovered, setHovered] = useState(false);
  const displayPrice = isAnnual
    ? Math.round(plan.price * 10)
    : plan.price;
  const period = isAnnual ? "year" : "month";

  return (
    <div
      className={`relative flex flex-col rounded-3xl overflow-hidden transition-all duration-500 cursor-pointer
        ${hovered ? "scale-[1.03] shadow-2xl z-10" : "scale-100 shadow-lg z-0"}
        ${plan.badge === "Most Popular" ? "ring-2 ring-amber-400" : ""}
      `}
      style={{ background: "rgba(10,20,15,0.92)" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top gradient bar */}
      <div className={`h-2 w-full bg-gradient-to-r ${plan.color}`} />

      {/* Badge */}
      {plan.badge && (
        <div className="absolute top-5 right-5">
          <span
            className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest"
            style={{
              background: plan.accent + "22",
              color: plan.accent,
              border: `1px solid ${plan.accent}55`,
            }}
          >
            {plan.badge}
          </span>
        </div>
      )}

      <div className="p-7 flex flex-col flex-1">
        {/* Icon + Name */}
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{plan.icon}</span>
          <div>
            <h3
              className="text-xl font-bold tracking-tight"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: plan.accent,
              }}
            >
              {plan.name}
            </h3>
            <p className="text-xs text-gray-400 tracking-wide mt-0.5">
              {plan.subtitle}
            </p>
          </div>
        </div>

        {/* Price */}
        <div className="mt-5 mb-6 flex items-end gap-2">
          <span
            className="text-5xl font-black"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: "#f0f4ef",
            }}
          >
            ${displayPrice}
          </span>
          <span className="text-gray-400 mb-2 text-sm">/{period}</span>
          {isAnnual && (
            <span
              className="mb-2 text-xs px-2 py-0.5 rounded-full font-semibold"
              style={{ background: "#16a34a22", color: "#4ade80" }}
            >
              Save 17%
            </span>
          )}
        </div>

        {/* Divider */}
        <div
          className="w-full h-px mb-6"
          style={{ background: plan.accent + "22" }}
        />

        {/* Features */}
        <ul className="flex flex-col gap-3 flex-1">
          {plan.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-sm text-gray-300">
              <CheckIcon color={plan.accent} />
              <span>{f}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          className={`mt-8 w-full py-3.5 rounded-2xl font-bold text-sm tracking-wider uppercase transition-all duration-300
            ${hovered ? "opacity-100 translate-y-0" : "opacity-80"}
          `}
          style={{
            background: `linear-gradient(135deg, ${plan.accent}33, ${plan.accent}55)`,
            color: plan.accent,
            border: `1.5px solid ${plan.accent}66`,
            fontFamily: "'Playfair Display', Georgia, serif",
          }}
        >
          {plan.cta}
        </button>
      </div>
    </div>
  );
}

export default function GolfSubscription() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <div
      className="min-h-screen w-full relative"
      style={{
        background: "linear-gradient(160deg, #071a0e 0%, #0d2618 50%, #0a1a10 100%)",
        fontFamily: "'Lato', 'Helvetica Neue', sans-serif",
      }}
    >
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 30%, #16a34a44 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, #78350f44 0%, transparent 50%)`,
        }}
      />

      {/* Subtle golf course lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-5"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="#6ee7b7"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-xs font-semibold tracking-widest uppercase"
            style={{ background: "#16a34a22", color: "#4ade80", border: "1px solid #16a34a44" }}>
            ⛳ &nbsp; Fairway Charity Golf Club
          </div>

          <h1
            className="text-5xl md:text-7xl font-black leading-none mb-5 text-white"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Play with <span style={{ color: "#6ee7b7" }}>Purpose</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
            Join our charity golf club. Every swing helps fund local communities.
            Choose the membership that fits your game.
          </p>

          {/* Annual/Monthly Toggle */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <span className={`text-sm font-semibold ${!isAnnual ? "text-white" : "text-gray-500"}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-14 h-7 rounded-full transition-all duration-300"
              style={{
                background: isAnnual
                  ? "linear-gradient(90deg,#16a34a,#4ade80)"
                  : "#1a2e1f",
                border: "1.5px solid #4ade8044",
              }}
            >
              <span
                className="absolute top-0.5 w-6 h-6 rounded-full bg-white shadow transition-all duration-300"
                style={{ left: isAnnual ? "calc(100% - 26px)" : "2px" }}
              />
            </button>
            <span className={`text-sm font-semibold ${isAnnual ? "text-white" : "text-gray-500"}`}>
              Annual
              <span
                className="ml-2 text-xs px-2 py-0.5 rounded-full font-bold"
                style={{ background: "#16a34a33", color: "#4ade80" }}
              >
                −17%
              </span>
            </span>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} isAnnual={isAnnual} />
          ))}
        </div>

        {/* Footer note */}
        <div className="text-center mt-16 space-y-2">
          <p className="text-gray-500 text-sm">
            🏌️ All memberships include a{" "}
            <span className="text-emerald-400 font-semibold">14-day free trial</span>. Cancel anytime.
          </p>
          <p className="text-gray-600 text-xs">
            A portion of every membership goes directly to our{" "}
            <span className="text-amber-400">Charity Foundation</span>. Tax receipt available on request.
          </p>
        </div>
      </div>

      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Lato:wght@400;700&display=swap');
      `}</style>
    </div>
  );
}