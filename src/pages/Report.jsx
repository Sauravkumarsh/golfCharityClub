import { useState } from "react";

const data = {
  totalUsers: 1248,
  userGrowth: [820, 890, 950, 1020, 1090, 1150, 1248],
  prizePool: {
    total: 84500,
    distributed: 61200,
    pending: 23300,
    monthly: [8200, 9100, 7400, 10200, 11800, 9500, 12300, 8800, 10900, 9200, 11400, 13400],
  },
  charity: {
    total: 42750,
    ytd: 28400,
    target: 50000,
    beneficiaries: ["Green Kids Foundation", "Veterans Golf Program", "Junior Golf Academy"],
    monthly: [2800, 3100, 2600, 3800, 4200, 3600, 4100, 3400, 3900, 3200, 4100, 5200],
  },
  draws: {
    total: 312,
    thisMonth: 28,
    avgParticipants: 44,
    completionRate: 94.2,
    recentDraws: [
      { id: "D-0312", date: "Mar 22, 2026", participants: 52, prize: 2800, charity: 1400, status: "Completed" },
      { id: "D-0311", date: "Mar 15, 2026", participants: 48, prize: 2400, charity: 1200, status: "Completed" },
      { id: "D-0310", date: "Mar 08, 2026", participants: 39, prize: 1950, charity: 975, status: "Completed" },
      { id: "D-0309", date: "Mar 01, 2026", participants: 61, prize: 3050, charity: 1525, status: "Completed" },
      { id: "D-0313", date: "Mar 29, 2026", participants: 44, prize: 2200, charity: 1100, status: "Upcoming" },
    ],
  },
};

const MiniSparkline = ({ values, color = "#4ade80", height = 40 }) => {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const w = 120;
  const h = height;
  const pts = values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * w;
      const y = h - ((v - min) / range) * (h - 6) - 3;
      return `${x},${y}`;
    })
    .join(" ");
  const areaBottom = `${w},${h} 0,${h}`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} className="overflow-visible">
      <defs>
        <linearGradient id={`grad-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon
        points={`0,${h} ${pts} ${areaBottom}`}
        fill={`url(#grad-${color.replace("#", "")})`}
      />
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {values.map((v, i) => {
        const x = (i / (values.length - 1)) * w;
        const y = h - ((v - min) / range) * (h - 6) - 3;
        return i === values.length - 1 ? (
          <circle key={i} cx={x} cy={y} r="3" fill={color} />
        ) : null;
      })}
    </svg>
  );
};

const DonutChart = ({ percent, color, size = 80 }) => {
  const r = 32;
  const circ = 2 * Math.PI * r;
  const dash = (percent / 100) * circ;
  return (
    <svg width={size} height={size} viewBox="0 0 80 80">
      <circle cx="40" cy="40" r={r} fill="none" stroke="#1e2d1e" strokeWidth="10" />
      <circle
        cx="40" cy="40" r={r} fill="none" stroke={color} strokeWidth="10"
        strokeDasharray={`${dash} ${circ - dash}`}
        strokeLinecap="round"
        transform="rotate(-90 40 40)"
      />
      <text x="40" y="45" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">
        {percent}%
      </text>
    </svg>
  );
};

const BarChart = ({ values, color = "#4ade80" }) => {
  const max = Math.max(...values);
  const months = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
  return (
    <div className="flex items-end gap-1 h-16">
      {values.map((v, i) => (
        <div key={i} className="flex flex-col items-center flex-1 gap-0.5">
          <div
            className="w-full rounded-sm transition-all duration-500"
            style={{
              height: `${(v / max) * 52}px`,
              backgroundColor: i === values.length - 1 ? color : `${color}66`,
            }}
          />
          <span className="text-[8px] text-gray-600">{months[i]}</span>
        </div>
      ))}
    </div>
  );
};

const StatCard = ({ label, value, sub, sparkValues, sparkColor, badge, badgeColor, icon, accent }) => (
  <div className="relative bg-[#0f1a0f] border border-[#1e3320] rounded-2xl p-5 overflow-hidden group hover:border-[#2d5235] transition-all duration-300">
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      style={{ background: `radial-gradient(ellipse at top left, ${accent}0d 0%, transparent 60%)` }} />
    <div className="relative z-10">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-500 mb-1">{label}</p>
          <p className="text-3xl font-bold text-white tracking-tight">{value}</p>
          {sub && <p className="text-xs text-gray-500 mt-1">{sub}</p>}
        </div>
        <div className="text-2xl opacity-60">{icon}</div>
      </div>
      {sparkValues && (
        <div className="mt-2 opacity-70">
          <MiniSparkline values={sparkValues} color={sparkColor || accent} />
        </div>
      )}
      {badge && (
        <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
          style={{ backgroundColor: `${badgeColor}22`, color: badgeColor }}>
          <span>↑</span> {badge}
        </div>
      )}
    </div>
  </div>
);

export default function GolfCharityDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const charityPct = Math.round((data.charity.total / data.charity.target) * 100);
  const distributedPct = Math.round((data.prizePool.distributed / data.prizePool.total) * 100);

  const tabs = ["overview", "prize pool", "charity", "draws"];

  return (
    <div className="min-h-screen bg-[#070d07] text-white font-mono"
      style={{ fontFamily: "'Courier Prime', 'Courier New', monospace" }}>

      {/* Header */}
      <header className="border-b border-[#1a2e1a] px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#1e3320] flex items-center justify-center text-green-400 text-lg">⛳</div>
          <div>
            <h1 className="text-sm font-bold tracking-[0.2em] uppercase text-green-400">Fairway Charity Club</h1>
            <p className="text-[10px] text-gray-600 tracking-widest uppercase">Admin Reports & Analytics</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-[10px] text-gray-600 uppercase tracking-widest">
            Season 2026 · Q1
          </div>
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        </div>
      </header>

      {/* Tabs */}
      <nav className="px-8 pt-6 flex gap-1">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`px-4 py-2 rounded-lg text-xs uppercase tracking-widest font-bold transition-all duration-200 ${
              activeTab === t
                ? "bg-[#1e3320] text-green-400 border border-[#2d5235]"
                : "text-gray-600 hover:text-gray-400"
            }`}
          >
            {t}
          </button>
        ))}
      </nav>

      <main className="px-8 py-6 space-y-6">

        {/* ── OVERVIEW ── */}
        {activeTab === "overview" && (
          <>
            {/* KPI Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                label="Total Members"
                value="1,248"
                sub="+98 this month"
                sparkValues={data.userGrowth}
                sparkColor="#4ade80"
                accent="#4ade80"
                badge="+8.5% MoM"
                badgeColor="#4ade80"
                icon="👥"
              />
              <StatCard
                label="Total Prize Pool"
                value="$84,500"
                sub="$23,300 pending"
                sparkValues={data.prizePool.monthly}
                sparkColor="#facc15"
                accent="#facc15"
                badge="+14.2% YoY"
                badgeColor="#facc15"
                icon="🏆"
              />
              <StatCard
                label="Charity Raised"
                value="$42,750"
                sub="Target: $50,000"
                sparkValues={data.charity.monthly}
                sparkColor="#38bdf8"
                accent="#38bdf8"
                badge="85.5% of Goal"
                badgeColor="#38bdf8"
                icon="🎗️"
              />
              <StatCard
                label="Draws Conducted"
                value="312"
                sub="28 this month"
                sparkValues={[18, 22, 25, 20, 28, 24, 31, 26, 29, 24, 28, 28]}
                sparkColor="#f472b6"
                accent="#f472b6"
                badge="94.2% completion"
                badgeColor="#f472b6"
                icon="🎲"
              />
            </div>

            {/* Middle Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

              {/* Prize Distribution Donut */}
              <div className="bg-[#0f1a0f] border border-[#1e3320] rounded-2xl p-5">
                <p className="text-xs font-bold tracking-[0.15em] uppercase text-gray-500 mb-4">Prize Distribution</p>
                <div className="flex items-center gap-6">
                  <DonutChart percent={distributedPct} color="#facc15" />
                  <div className="space-y-2 flex-1">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-500">Distributed</span>
                        <span className="text-yellow-400 font-bold">${data.prizePool.distributed.toLocaleString()}</span>
                      </div>
                      <div className="h-1.5 bg-[#1e3320] rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${distributedPct}%` }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-500">Pending</span>
                        <span className="text-orange-400 font-bold">${data.prizePool.pending.toLocaleString()}</span>
                      </div>
                      <div className="h-1.5 bg-[#1e3320] rounded-full overflow-hidden">
                        <div className="h-full bg-orange-400 rounded-full" style={{ width: `${100 - distributedPct}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Charity Progress */}
              <div className="bg-[#0f1a0f] border border-[#1e3320] rounded-2xl p-5">
                <p className="text-xs font-bold tracking-[0.15em] uppercase text-gray-500 mb-4">Charity Goal Progress</p>
                <div className="flex items-center gap-6">
                  <DonutChart percent={charityPct} color="#38bdf8" />
                  <div className="flex-1 space-y-2">
                    {data.charity.beneficiaries.map((b, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-sky-400 flex-shrink-0" />
                        <span className="text-[10px] text-gray-400 truncate">{b}</span>
                      </div>
                    ))}
                    <div className="pt-1 border-t border-[#1e3320]">
                      <span className="text-[10px] text-gray-600">YTD Contribution: </span>
                      <span className="text-[10px] text-sky-400 font-bold">${data.charity.ytd.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Draw Stats Summary */}
              <div className="bg-[#0f1a0f] border border-[#1e3320] rounded-2xl p-5">
                <p className="text-xs font-bold tracking-[0.15em] uppercase text-gray-500 mb-4">Draw Summary</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Total Draws", value: data.draws.total, color: "text-pink-400" },
                    { label: "This Month", value: data.draws.thisMonth, color: "text-green-400" },
                    { label: "Avg. Players", value: data.draws.avgParticipants, color: "text-yellow-400" },
                    { label: "Completion", value: `${data.draws.completionRate}%`, color: "text-sky-400" },
                  ].map((s) => (
                    <div key={s.label} className="bg-[#0a130a] rounded-xl p-3">
                      <p className="text-[9px] uppercase tracking-widest text-gray-600 mb-1">{s.label}</p>
                      <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Draws Table */}
            <div className="bg-[#0f1a0f] border border-[#1e3320] rounded-2xl overflow-hidden">
              <div className="px-5 py-4 border-b border-[#1e3320] flex items-center justify-between">
                <p className="text-xs font-bold tracking-[0.15em] uppercase text-gray-400">Recent Draws</p>
                <button onClick={() => setActiveTab("draws")}
                  className="text-[10px] text-green-500 hover:text-green-400 uppercase tracking-widest">
                  View All →
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-[#1a2a1a]">
                      {["Draw ID", "Date", "Participants", "Prize", "Charity", "Status"].map((h) => (
                        <th key={h} className="px-5 py-3 text-left text-[10px] uppercase tracking-widest text-gray-600 font-bold">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.draws.recentDraws.map((d, i) => (
                      <tr key={i} className="border-b border-[#0f1a0f] hover:bg-[#111d11] transition-colors">
                        <td className="px-5 py-3 text-green-400 font-bold">{d.id}</td>
                        <td className="px-5 py-3 text-gray-400">{d.date}</td>
                        <td className="px-5 py-3 text-white font-semibold">{d.participants}</td>
                        <td className="px-5 py-3 text-yellow-400 font-bold">${d.prize.toLocaleString()}</td>
                        <td className="px-5 py-3 text-sky-400 font-bold">${d.charity.toLocaleString()}</td>
                        <td className="px-5 py-3">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            d.status === "Completed"
                              ? "bg-green-400/10 text-green-400"
                              : "bg-yellow-400/10 text-yellow-400"
                          }`}>
                            {d.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* ── PRIZE POOL ── */}
        {activeTab === "prize pool" && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Total Pool", value: `$${data.prizePool.total.toLocaleString()}`, color: "text-yellow-400", bg: "bg-yellow-400/10" },
                { label: "Distributed", value: `$${data.prizePool.distributed.toLocaleString()}`, color: "text-green-400", bg: "bg-green-400/10" },
                { label: "Pending", value: `$${data.prizePool.pending.toLocaleString()}`, color: "text-orange-400", bg: "bg-orange-400/10" },
              ].map((c) => (
                <div key={c.label} className={`${c.bg} border border-[#1e3320] rounded-2xl p-5`}>
                  <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-2">{c.label}</p>
                  <p className={`text-4xl font-bold ${c.color}`}>{c.value}</p>
                </div>
              ))}
            </div>
            <div className="bg-[#0f1a0f] border border-[#1e3320] rounded-2xl p-5">
              <p className="text-xs font-bold tracking-[0.15em] uppercase text-gray-500 mb-4">Monthly Prize Pool Distribution</p>
              <BarChart values={data.prizePool.monthly} color="#facc15" />
              <div className="mt-3 flex justify-between text-[10px] text-gray-600">
                <span>Jan 2026</span><span>Dec 2026</span>
              </div>
            </div>
            <div className="bg-[#0f1a0f] border border-[#1e3320] rounded-2xl p-5">
              <p className="text-xs font-bold tracking-[0.15em] uppercase text-gray-500 mb-4">Distribution Rate</p>
              <div className="h-4 bg-[#1e3320] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-yellow-500 to-green-400 rounded-full transition-all duration-1000"
                  style={{ width: `${distributedPct}%` }} />
              </div>
              <div className="flex justify-between mt-2 text-xs">
                <span className="text-green-400 font-bold">{distributedPct}% distributed</span>
                <span className="text-orange-400">{100 - distributedPct}% pending</span>
              </div>
            </div>
          </div>
        )}

        {/* ── CHARITY ── */}
        {activeTab === "charity" && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Total Raised", value: `$${data.charity.total.toLocaleString()}`, color: "text-sky-400" },
                { label: "YTD Raised", value: `$${data.charity.ytd.toLocaleString()}`, color: "text-green-400" },
                { label: "Annual Target", value: `$${data.charity.target.toLocaleString()}`, color: "text-purple-400" },
              ].map((c) => (
                <div key={c.label} className="bg-[#0f1a0f] border border-[#1e3320] rounded-2xl p-5">
                  <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-2">{c.label}</p>
                  <p className={`text-4xl font-bold ${c.color}`}>{c.value}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#0f1a0f] border border-[#1e3320] rounded-2xl p-5">
                <p className="text-xs font-bold tracking-[0.15em] uppercase text-gray-500 mb-4">Monthly Contributions</p>
                <BarChart values={data.charity.monthly} color="#38bdf8" />
              </div>
              <div className="bg-[#0f1a0f] border border-[#1e3320] rounded-2xl p-5">
                <p className="text-xs font-bold tracking-[0.15em] uppercase text-gray-500 mb-4">Beneficiaries</p>
                <div className="space-y-3">
                  {data.charity.beneficiaries.map((b, i) => {
                    const amounts = [18200, 14300, 10250];
                    const pcts = [42, 34, 24];
                    const colors = ["#38bdf8", "#4ade80", "#a78bfa"];
                    return (
                      <div key={i}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-300">{b}</span>
                          <span style={{ color: colors[i] }} className="font-bold">${amounts[i].toLocaleString()}</span>
                        </div>
                        <div className="h-2 bg-[#1e3320] rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all duration-1000"
                            style={{ width: `${pcts[i]}%`, backgroundColor: colors[i] }} />
                        </div>
                        <p className="text-[9px] text-gray-600 mt-0.5">{pcts[i]}% of total</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="bg-[#0f1a0f] border border-[#1e3320] rounded-2xl p-5">
              <p className="text-xs font-bold tracking-[0.15em] uppercase text-gray-500 mb-3">Annual Target Progress</p>
              <div className="h-5 bg-[#1e3320] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-sky-500 to-blue-400 rounded-full"
                  style={{ width: `${charityPct}%` }} />
              </div>
              <div className="flex justify-between mt-2 text-xs">
                <span className="text-sky-400 font-bold">${data.charity.total.toLocaleString()} raised</span>
                <span className="text-gray-500">${(data.charity.target - data.charity.total).toLocaleString()} remaining</span>
              </div>
            </div>
          </div>
        )}

        {/* ── DRAWS ── */}
        {activeTab === "draws" && (
          <div className="space-y-4">
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: "Total Draws", value: data.draws.total, color: "text-pink-400" },
                { label: "This Month", value: data.draws.thisMonth, color: "text-green-400" },
                { label: "Avg Players", value: data.draws.avgParticipants, color: "text-yellow-400" },
                { label: "Completion", value: `${data.draws.completionRate}%`, color: "text-sky-400" },
              ].map((s) => (
                <div key={s.label} className="bg-[#0f1a0f] border border-[#1e3320] rounded-2xl p-5">
                  <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-2">{s.label}</p>
                  <p className={`text-4xl font-bold ${s.color}`}>{s.value}</p>
                </div>
              ))}
            </div>
            <div className="bg-[#0f1a0f] border border-[#1e3320] rounded-2xl overflow-hidden">
              <div className="px-5 py-4 border-b border-[#1e3320]">
                <p className="text-xs font-bold tracking-[0.15em] uppercase text-gray-400">All Draws</p>
              </div>
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-[#1a2a1a]">
                    {["Draw ID", "Date", "Participants", "Prize", "Charity Contribution", "Status"].map((h) => (
                      <th key={h} className="px-5 py-3 text-left text-[10px] uppercase tracking-widest text-gray-600 font-bold">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.draws.recentDraws.map((d, i) => (
                    <tr key={i} className="border-b border-[#0f1a0f] hover:bg-[#111d11] transition-colors cursor-pointer">
                      <td className="px-5 py-4 text-green-400 font-bold">{d.id}</td>
                      <td className="px-5 py-4 text-gray-400">{d.date}</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 bg-[#1e3320] rounded-full w-16 overflow-hidden">
                            <div className="h-full bg-green-400 rounded-full" style={{ width: `${(d.participants / 70) * 100}%` }} />
                          </div>
                          <span className="text-white font-semibold">{d.participants}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-yellow-400 font-bold">${d.prize.toLocaleString()}</td>
                      <td className="px-5 py-4 text-sky-400 font-bold">${d.charity.toLocaleString()}</td>
                      <td className="px-5 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          d.status === "Completed"
                            ? "bg-green-400/10 text-green-400"
                            : "bg-yellow-400/10 text-yellow-400"
                        }`}>{d.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="mt-8 px-8 py-4 border-t border-[#1a2e1a] flex justify-between items-center">
        <span className="text-[10px] text-gray-700 uppercase tracking-widest">Fairway Charity Club · Admin Panel</span>
        <span className="text-[10px] text-gray-700 uppercase tracking-widest">Last updated: Mar 27, 2026</span>
      </footer>
    </div>
  );
}