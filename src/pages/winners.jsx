import { useState } from "react";

const mockWinners = [
  {
    id: 1,
    rank: 1,
    name: "James Whitfield",
    avatar: "JW",
    email: "james.w@example.com",
    tournament: "Spring Charity Open 2025",
    score: -14,
    grossScore: 58,
    handicap: 12,
    prize: 2500,
    submittedAt: "2025-04-12 14:32",
    screenshotUrl: "https://placehold.co/800x500/1a2e1a/4ade80?text=Scorecard+James+W",
    verificationStatus: "pending",
    payoutStatus: "pending",
  },
  {
    id: 2,
    rank: 2,
    name: "Sandra Okafor",
    avatar: "SO",
    email: "sandra.o@example.com",
    tournament: "Spring Charity Open 2025",
    score: -11,
    grossScore: 61,
    handicap: 10,
    prize: 1500,
    submittedAt: "2025-04-12 15:10",
    screenshotUrl: "https://placehold.co/800x500/1a2e1a/4ade80?text=Scorecard+Sandra+O",
    verificationStatus: "verified",
    payoutStatus: "pending",
  },
  {
    id: 3,
    rank: 3,
    name: "Tom Briggs",
    avatar: "TB",
    email: "tom.b@example.com",
    tournament: "Spring Charity Open 2025",
    score: -9,
    grossScore: 63,
    handicap: 8,
    prize: 1000,
    submittedAt: "2025-04-12 15:55",
    screenshotUrl: "https://placehold.co/800x500/1a2e1a/4ade80?text=Scorecard+Tom+B",
    verificationStatus: "verified",
    payoutStatus: "completed",
  },
  {
    id: 4,
    rank: 4,
    name: "Priya Nair",
    avatar: "PN",
    email: "priya.n@example.com",
    tournament: "Spring Charity Open 2025",
    score: -7,
    grossScore: 65,
    handicap: 9,
    prize: 750,
    submittedAt: "2025-04-12 16:30",
    screenshotUrl: "https://placehold.co/800x500/1a2e1a/4ade80?text=Scorecard+Priya+N",
    verificationStatus: "rejected",
    payoutStatus: "pending",
  },
  {
    id: 5,
    rank: 5,
    name: "Charlie Voss",
    avatar: "CV",
    email: "charlie.v@example.com",
    tournament: "Spring Charity Open 2025",
    score: -5,
    grossScore: 67,
    handicap: 7,
    prize: 500,
    submittedAt: "2025-04-12 17:05",
    screenshotUrl: "https://placehold.co/800x500/1a2e1a/4ade80?text=Scorecard+Charlie+V",
    verificationStatus: "pending",
    payoutStatus: "pending",
  },
];

const statusStyles = {
  verified: "bg-emerald-900/50 text-emerald-300 border border-emerald-700",
  pending: "bg-amber-900/50 text-amber-300 border border-amber-700",
  rejected: "bg-red-900/50 text-red-300 border border-red-700",
  completed: "bg-sky-900/50 text-sky-300 border border-sky-700",
};

const statusIcons = {
  verified: "✓",
  pending: "⏳",
  rejected: "✕",
  completed: "◉",
};

const rankMedal = { 1: "🥇", 2: "🥈", 3: "🥉" };

export default function GolfAdminPanel() {
  const [winners, setWinners] = useState(mockWinners);
  const [selectedWinner, setSelectedWinner] = useState(null);
  const [screenshotModal, setScreenshotModal] = useState(null);
  const [payoutModal, setPayoutModal] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [toast, setToast] = useState(null);
  const [confirmModal, setConfirmModal] = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const updateVerification = (id, status) => {
    setWinners((prev) =>
      prev.map((w) => (w.id === id ? { ...w, verificationStatus: status } : w))
    );
    setScreenshotModal(null);
    showToast(
      status === "verified"
        ? "Score verified successfully."
        : "Submission rejected.",
      status === "verified" ? "success" : "error"
    );
  };

  const completePayout = (id) => {
    setWinners((prev) =>
      prev.map((w) => (w.id === id ? { ...w, payoutStatus: "completed" } : w))
    );
    setPayoutModal(null);
    setConfirmModal(null);
    showToast("Payout marked as completed.", "success");
  };

  const filtered =
    filterStatus === "all"
      ? winners
      : winners.filter(
          (w) =>
            w.verificationStatus === filterStatus ||
            w.payoutStatus === filterStatus
        );

  const stats = {
    total: winners.length,
    verified: winners.filter((w) => w.verificationStatus === "verified").length,
    pending: winners.filter((w) => w.verificationStatus === "pending").length,
    paid: winners.filter((w) => w.payoutStatus === "completed").length,
    totalPrize: winners.reduce((a, w) => a + w.prize, 0),
  };

  return (
    <div className="min-h-screen bg-[#0a1a0f] text-white font-sans">
      {/* Background texture */}
      <div className="fixed inset-0 opacity-5 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #4ade80 1px, transparent 0)", backgroundSize: "32px 32px" }} />

      {/* Top Nav */}
      <header className="relative z-10 border-b border-green-900/60 bg-black/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-400 to-emerald-700 flex items-center justify-center text-lg">⛳</div>
            <div>
              <p className="text-xs text-green-500 tracking-widest uppercase font-medium">Admin Portal</p>
              <h1 className="text-lg font-bold text-white leading-tight tracking-tight">GreenHeart Charity Golf</h1>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-green-400/70">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse inline-block" />
            Spring Charity Open 2025
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-8 space-y-8">

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: "Total Entrants", value: stats.total, color: "text-white" },
            { label: "Verified", value: stats.verified, color: "text-emerald-400" },
            { label: "Pending Review", value: stats.pending, color: "text-amber-400" },
            { label: "Payouts Done", value: `${stats.paid}/${stats.total}`, color: "text-sky-400" },
            { label: "Total Prize Pool", value: `$${stats.totalPrize.toLocaleString()}`, color: "text-green-300" },
          ].map((s) => (
            <div key={s.label} className="bg-black/30 border border-green-900/50 rounded-xl p-4 backdrop-blur-sm">
              <p className="text-xs text-green-600 uppercase tracking-wider mb-1">{s.label}</p>
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs text-green-600 uppercase tracking-widest mr-2">Filter:</span>
          {["all", "pending", "verified", "rejected", "completed"].map((f) => (
            <button
              key={f}
              onClick={() => setFilterStatus(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wide transition-all ${
                filterStatus === f
                  ? "bg-green-500 text-black"
                  : "bg-green-900/20 text-green-400 border border-green-800/50 hover:bg-green-900/40"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Winners Table */}
        <div className="rounded-2xl border border-green-900/50 overflow-hidden bg-black/20 backdrop-blur-sm">
          <div className="px-6 py-4 border-b border-green-900/40 flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-widest text-green-400">Winners Leaderboard</h2>
            <span className="text-xs text-green-700">{filtered.length} entries</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-green-900/30 text-xs text-green-600 uppercase tracking-widest">
                  <th className="text-left px-6 py-3">Rank</th>
                  <th className="text-left px-6 py-3">Player</th>
                  <th className="text-center px-4 py-3">Score</th>
                  <th className="text-center px-4 py-3">Prize</th>
                  <th className="text-center px-4 py-3">Verification</th>
                  <th className="text-center px-4 py-3">Payout</th>
                  <th className="text-center px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((w, i) => (
                  <tr
                    key={w.id}
                    className={`border-b border-green-900/20 hover:bg-green-900/10 transition-colors cursor-pointer ${
                      selectedWinner?.id === w.id ? "bg-green-900/20" : ""
                    }`}
                    onClick={() => setSelectedWinner(w.id === selectedWinner?.id ? null : w)}
                  >
                    <td className="px-6 py-4 font-bold text-xl">
                      {rankMedal[w.rank] || <span className="text-green-600 text-base">#{w.rank}</span>}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-700 to-emerald-900 flex items-center justify-center text-xs font-bold text-green-200 flex-shrink-0">
                          {w.avatar}
                        </div>
                        <div>
                          <p className="font-semibold text-white">{w.name}</p>
                          <p className="text-xs text-green-600">{w.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className="text-green-300 font-bold">{w.score}</span>
                      <span className="text-green-700 text-xs ml-1">({w.grossScore})</span>
                    </td>
                    <td className="px-4 py-4 text-center font-bold text-emerald-400">${w.prize.toLocaleString()}</td>
                    <td className="px-4 py-4 text-center">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${statusStyles[w.verificationStatus]}`}>
                        <span>{statusIcons[w.verificationStatus]}</span>
                        {w.verificationStatus}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${statusStyles[w.payoutStatus]}`}>
                        <span>{statusIcons[w.payoutStatus]}</span>
                        {w.payoutStatus}
                      </span>
                    </td>
                    <td className="px-4 py-4" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-center gap-2">
                        <button
                          title="Verify Screenshot"
                          onClick={() => setScreenshotModal(w)}
                          className="p-2 rounded-lg bg-green-900/40 hover:bg-green-800/60 text-green-400 hover:text-green-200 transition-all text-sm border border-green-800/40"
                        >
                          🖼️
                        </button>
                        <button
                          title="Mark Payout"
                          disabled={w.verificationStatus !== "verified" || w.payoutStatus === "completed"}
                          onClick={() => setPayoutModal(w)}
                          className={`p-2 rounded-lg text-sm border transition-all ${
                            w.verificationStatus === "verified" && w.payoutStatus !== "completed"
                              ? "bg-sky-900/40 hover:bg-sky-800/60 text-sky-400 hover:text-sky-200 border-sky-800/40"
                              : "bg-gray-900/20 text-gray-700 border-gray-800/20 cursor-not-allowed"
                          }`}
                        >
                          💸
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Expanded Row Detail */}
        {selectedWinner && (
          <div className="rounded-2xl border border-green-700/40 bg-green-950/30 p-6 backdrop-blur-sm animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-green-300 text-base">Player Details — {selectedWinner.name}</h3>
              <button onClick={() => setSelectedWinner(null)} className="text-green-600 hover:text-green-300 text-xl">×</button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              {[
                ["Tournament", selectedWinner.tournament],
                ["Submitted At", selectedWinner.submittedAt],
                ["Gross Score", selectedWinner.grossScore],
                ["Handicap", selectedWinner.handicap],
                ["Net Score", selectedWinner.score],
                ["Prize", `$${selectedWinner.prize.toLocaleString()}`],
                ["Verification", selectedWinner.verificationStatus],
                ["Payout", selectedWinner.payoutStatus],
              ].map(([k, v]) => (
                <div key={k} className="bg-black/20 rounded-lg p-3 border border-green-900/30">
                  <p className="text-xs text-green-600 uppercase tracking-wide mb-1">{k}</p>
                  <p className="text-white font-medium">{v}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Screenshot Verification Modal */}
      {screenshotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#0d1f12] border border-green-800/60 rounded-2xl w-full max-w-2xl shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-green-900/40">
              <div>
                <h2 className="font-bold text-white">Score Submission</h2>
                <p className="text-xs text-green-500 mt-0.5">{screenshotModal.name} · Rank #{screenshotModal.rank}</p>
              </div>
              <button onClick={() => setScreenshotModal(null)} className="text-green-600 hover:text-white text-2xl transition-colors">×</button>
            </div>

            <div className="p-6 space-y-4">
              <div className="rounded-xl overflow-hidden border border-green-900/40 bg-black/30">
                <img
                  src={screenshotModal.screenshotUrl}
                  alt="Scorecard screenshot"
                  className="w-full object-cover"
                  onError={(e) => {
                    e.target.src = "https://placehold.co/800x400/0a1a0f/4ade80?text=Scorecard+Screenshot";
                  }}
                />
              </div>

              <div className="grid grid-cols-3 gap-3 text-center text-sm">
                <div className="bg-black/30 border border-green-900/30 rounded-xl p-3">
                  <p className="text-xs text-green-600 uppercase tracking-wide">Gross</p>
                  <p className="text-white font-bold text-lg">{screenshotModal.grossScore}</p>
                </div>
                <div className="bg-black/30 border border-green-900/30 rounded-xl p-3">
                  <p className="text-xs text-green-600 uppercase tracking-wide">Handicap</p>
                  <p className="text-white font-bold text-lg">{screenshotModal.handicap}</p>
                </div>
                <div className="bg-black/30 border border-green-900/30 rounded-xl p-3">
                  <p className="text-xs text-green-600 uppercase tracking-wide">Net</p>
                  <p className="text-emerald-300 font-bold text-lg">{screenshotModal.score}</p>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => updateVerification(screenshotModal.id, "rejected")}
                  className="flex-1 py-3 rounded-xl bg-red-900/40 hover:bg-red-800/60 text-red-300 border border-red-800/50 font-semibold text-sm transition-all"
                >
                  ✕ Reject Submission
                </button>
                <button
                  onClick={() => updateVerification(screenshotModal.id, "verified")}
                  className="flex-1 py-3 rounded-xl bg-emerald-800/50 hover:bg-emerald-700/60 text-emerald-200 border border-emerald-700/60 font-semibold text-sm transition-all"
                >
                  ✓ Verify Score
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payout Modal */}
      {payoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#0d1a24] border border-sky-800/60 rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-sky-900/40">
              <h2 className="font-bold text-white">Mark Payout</h2>
              <button onClick={() => setPayoutModal(null)} className="text-sky-600 hover:text-white text-2xl">×</button>
            </div>
            <div className="p-6 space-y-5">
              <div className="flex items-center gap-4 bg-black/30 rounded-xl p-4 border border-sky-900/30">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-700 to-blue-900 flex items-center justify-center text-base font-bold text-sky-200">
                  {payoutModal.avatar}
                </div>
                <div>
                  <p className="font-semibold text-white">{payoutModal.name}</p>
                  <p className="text-xs text-sky-400">{payoutModal.email}</p>
                  <p className="text-xs text-sky-600">Rank #{payoutModal.rank}</p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-xs text-sky-600 uppercase tracking-wide">Prize</p>
                  <p className="text-2xl font-bold text-emerald-300">${payoutModal.prize.toLocaleString()}</p>
                </div>
              </div>

              <div className="bg-amber-900/20 border border-amber-800/40 rounded-xl p-4 text-xs text-amber-300">
                ⚠ This action confirms the prize has been transferred. It cannot be undone.
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setPayoutModal(null)}
                  className="flex-1 py-3 rounded-xl bg-gray-900/40 hover:bg-gray-800/50 text-gray-300 border border-gray-700/40 font-semibold text-sm transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setConfirmModal(payoutModal)}
                  className="flex-1 py-3 rounded-xl bg-sky-700/50 hover:bg-sky-600/60 text-sky-100 border border-sky-600/50 font-semibold text-sm transition-all"
                >
                  ◉ Confirm Payout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Payout Modal */}
      {confirmModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
          <div className="bg-[#0d1a24] border border-sky-600/80 rounded-2xl w-full max-w-sm shadow-2xl text-center p-8 space-y-5">
            <div className="w-16 h-16 rounded-full bg-sky-900/40 border-2 border-sky-500/60 flex items-center justify-center text-3xl mx-auto">💸</div>
            <div>
              <h3 className="text-lg font-bold text-white">Confirm Payout</h3>
              <p className="text-sm text-sky-400 mt-1">
                Transfer <span className="text-emerald-300 font-bold">${confirmModal.prize.toLocaleString()}</span> to {confirmModal.name}?
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmModal(null)}
                className="flex-1 py-2.5 rounded-xl bg-gray-900/40 text-gray-400 border border-gray-700/40 text-sm font-semibold hover:bg-gray-800/50 transition-all"
              >
                Go Back
              </button>
              <button
                onClick={() => completePayout(confirmModal.id)}
                className="flex-1 py-2.5 rounded-xl bg-emerald-700/60 hover:bg-emerald-600/70 text-emerald-100 border border-emerald-600/50 text-sm font-semibold transition-all"
              >
                ✓ Yes, Mark Paid
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-[70] px-5 py-3 rounded-xl text-sm font-semibold shadow-xl border transition-all ${
          toast.type === "success"
            ? "bg-emerald-900/90 border-emerald-700 text-emerald-200"
            : "bg-red-900/90 border-red-700 text-red-200"
        }`}>
          {toast.type === "success" ? "✓" : "✕"} {toast.msg}
        </div>
      )}
    </div>
  );
}