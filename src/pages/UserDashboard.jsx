import { useState } from "react";

const NAV_ITEMS = [
  { id: "subscription", label: "Membership", icon: "◈" },
  { id: "scores", label: "Scores", icon: "⛳" },
  { id: "charity", label: "Charity", icon: "♡" },
  { id: "participation", label: "Draws", icon: "◉" },
  { id: "winnings", label: "Winnings", icon: "◆" },
];

const CHARITIES = [
  { id: 1, name: "St. Jude Children's Research", category: "Health", logo: "🏥" },
  { id: 2, name: "World Wildlife Fund", category: "Environment", logo: "🌿" },
  { id: 3, name: "Local Food Bank Network", category: "Community", logo: "🤝" },
  { id: 4, name: "Veterans Support Alliance", category: "Veterans", logo: "🎖️" },
];

const SCORES = [
  { id: 1, date: "Mar 22, 2026", course: "Pebble Beach GC", score: 78, par: 72, diff: "+6", weather: "Sunny" },
  { id: 2, date: "Mar 15, 2026", course: "Augusta National", score: 74, par: 72, diff: "+2", weather: "Cloudy" },
  { id: 3, date: "Mar 8, 2026", course: "St Andrews Links", score: 80, par: 72, diff: "+8", weather: "Windy" },
  { id: 4, date: "Mar 1, 2026", course: "Torrey Pines GC", score: 71, par: 71, diff: "E", weather: "Sunny" },
];

const DRAWS = [
  { id: 1, name: "Spring Classic Draw", date: "Apr 5, 2026", prize: "$5,000", entered: true, status: "upcoming" },
  { id: 2, name: "Easter Charity Cup", date: "Apr 20, 2026", prize: "$3,500", entered: true, status: "upcoming" },
  { id: 3, name: "Masters Week Draw", date: "Apr 13, 2026", prize: "$2,000", entered: false, status: "upcoming" },
  { id: 4, name: "Winter Championship", date: "Jan 15, 2026", prize: "$4,200", entered: true, status: "completed", result: "No win" },
  { id: 5, name: "New Year Draw", date: "Jan 2, 2026", prize: "$1,500", entered: true, status: "completed", result: "Won $300" },
  { id: 6, name: "Christmas Charity", date: "Dec 20, 2025", prize: "$6,000", entered: true, status: "completed", result: "No win" },
];

export default function GolfCharityClub() {
  const [activePage, setActivePage] = useState("subscription");
  const [scores, setScores] = useState(SCORES);
  const [editingScore, setEditingScore] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [addingScore, setAddingScore] = useState(false);
  const [newScore, setNewScore] = useState({ date: "", course: "", score: "", par: "72", weather: "Sunny" });
  const [selectedCharity, setSelectedCharity] = useState(1);
  const [contribution, setContribution] = useState(10);

  return (
    <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif", minHeight: "100vh", background: "#0c1a0e" }}>
      {/* Background texture */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0,
        backgroundImage: `radial-gradient(ellipse at 20% 50%, rgba(34,85,34,0.15) 0%, transparent 60%),
          radial-gradient(ellipse at 80% 20%, rgba(180,140,60,0.08) 0%, transparent 50%)`,
        pointerEvents: "none"
      }} />

      {/* Header */}
      <header style={{
        position: "sticky", top: 0, zIndex: 50,
        background: "rgba(8,20,10,0.95)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(180,140,60,0.3)",
        padding: "0 24px"
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 36, height: 36, borderRadius: "50%",
              background: "linear-gradient(135deg, #b48c3c, #e8c96a)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18
            }}>⛳</div>
            <div>
              <div style={{ color: "#e8c96a", fontSize: 16, fontWeight: "bold", letterSpacing: "0.05em" }}>FAIRWAY CHARITABLE</div>
              <div style={{ color: "#6b8f6b", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase" }}>Golf Club Society</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{
              width: 8, height: 8, borderRadius: "50%",
              background: "#4ade80",
              boxShadow: "0 0 8px #4ade80"
            }} />
            <span style={{ color: "#4ade80", fontSize: 12, letterSpacing: "0.1em" }}>ACTIVE MEMBER</span>
          </div>
        </div>
      </header>

      {/* Nav */}
      <nav style={{
        background: "rgba(8,20,10,0.8)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "0 24px",
        position: "sticky", top: 64, zIndex: 40,
        backdropFilter: "blur(8px)"
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", gap: 0 }}>
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              style={{
                padding: "14px 20px",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: activePage === item.id ? "#e8c96a" : "#6b8f6b",
                fontSize: 13,
                letterSpacing: "0.08em",
                borderBottom: activePage === item.id ? "2px solid #e8c96a" : "2px solid transparent",
                transition: "all 0.2s",
                display: "flex", alignItems: "center", gap: 6,
                fontFamily: "inherit"
              }}
            >
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              <span style={{ textTransform: "uppercase", fontWeight: activePage === item.id ? "bold" : "normal" }}>{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Page Content */}
      <main style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "40px 24px" }}>
        {activePage === "subscription" && <SubscriptionPage />}
        {activePage === "scores" && (
          <ScoresPage
            scores={scores} setScores={setScores}
            editingScore={editingScore} setEditingScore={setEditingScore}
            editForm={editForm} setEditForm={setEditForm}
            addingScore={addingScore} setAddingScore={setAddingScore}
            newScore={newScore} setNewScore={setNewScore}
          />
        )}
        {activePage === "charity" && (
          <CharityPage
            selectedCharity={selectedCharity} setSelectedCharity={setSelectedCharity}
            contribution={contribution} setContribution={setContribution}
          />
        )}
        {activePage === "participation" && <ParticipationPage draws={DRAWS} />}
        {activePage === "winnings" && <WinningsPage />}
      </main>
    </div>
  );
}

/* ─── CARD COMPONENT ─── */
function Card({ children, style = {}, gold = false }) {
  return (
    <div style={{
      background: gold
        ? "linear-gradient(135deg, rgba(180,140,60,0.12), rgba(232,201,106,0.06))"
        : "rgba(255,255,255,0.03)",
      border: `1px solid ${gold ? "rgba(180,140,60,0.4)" : "rgba(255,255,255,0.08)"}`,
      borderRadius: 16,
      padding: 28,
      ...style
    }}>
      {children}
    </div>
  );
}

function Label({ children }) {
  return (
    <div style={{ color: "#6b8f6b", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 6 }}>
      {children}
    </div>
  );
}

function Value({ children, size = 24, color = "#f0ede6" }) {
  return (
    <div style={{ color, fontSize: size, fontWeight: "bold" }}>{children}</div>
  );
}

/* ─── PAGE 1: SUBSCRIPTION ─── */
function SubscriptionPage() {
  const daysLeft = 47;
  const pct = Math.round((daysLeft / 365) * 100);

  return (
    <div>
      <PageHeader icon="◈" title="Membership Status" subtitle="Your subscription overview and renewal details" />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20, marginBottom: 28 }}>
        <Card gold>
          <Label>Status</Label>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 4 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 10px #4ade80" }} />
            <Value color="#4ade80">Active</Value>
          </div>
          <div style={{ color: "#6b8f6b", fontSize: 13, marginTop: 8 }}>Member since Jan 2023</div>
        </Card>

        <Card>
          <Label>Renewal Date</Label>
          <Value>May 13, 2026</Value>
          <div style={{ color: "#e8c96a", fontSize: 13, marginTop: 8 }}>⏱ {daysLeft} days remaining</div>
        </Card>

        <Card>
          <Label>Plan</Label>
          <Value>Gold Annual</Value>
          <div style={{ color: "#6b8f6b", fontSize: 13, marginTop: 8 }}>£299/year · Auto-renew ON</div>
        </Card>
      </div>

      {/* Progress bar */}
      <Card style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
          <Label>Membership Cycle Progress</Label>
          <span style={{ color: "#e8c96a", fontSize: 12 }}>{100 - pct}% elapsed</span>
        </div>
        <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 99, height: 10, overflow: "hidden" }}>
          <div style={{
            width: `${100 - pct}%`, height: "100%",
            background: "linear-gradient(90deg, #4ade80, #e8c96a)",
            borderRadius: 99,
            transition: "width 1s ease"
          }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, color: "#6b8f6b", fontSize: 12 }}>
          <span>May 13, 2025</span>
          <span>May 13, 2026</span>
        </div>
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <Card>
          <Label>Benefits Included</Label>
          {["Unlimited draw entries", "Score tracking & history", "Charity contribution matching", "Priority customer support", "Monthly members newsletter"].map(b => (
            <div key={b} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <span style={{ color: "#4ade80", fontSize: 14 }}>✓</span>
              <span style={{ color: "#c8c0b0", fontSize: 14 }}>{b}</span>
            </div>
          ))}
        </Card>

        <Card>
          <Label>Billing History</Label>
          {[
            { date: "May 13, 2025", amount: "£299.00", status: "Paid" },
            { date: "May 13, 2024", amount: "£259.00", status: "Paid" },
            { date: "May 13, 2023", amount: "£229.00", status: "Paid" },
          ].map(b => (
            <div key={b.date} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <div>
                <div style={{ color: "#f0ede6", fontSize: 14 }}>{b.date}</div>
                <div style={{ color: "#6b8f6b", fontSize: 12 }}>{b.amount}</div>
              </div>
              <span style={{ background: "rgba(74,222,128,0.12)", color: "#4ade80", padding: "3px 10px", borderRadius: 99, fontSize: 12 }}>{b.status}</span>
            </div>
          ))}
          <button style={{
            width: "100%", marginTop: 16, padding: "12px",
            background: "linear-gradient(135deg, #b48c3c, #e8c96a)",
            border: "none", borderRadius: 10, cursor: "pointer",
            color: "#0c1a0e", fontWeight: "bold", fontSize: 14, fontFamily: "inherit",
            letterSpacing: "0.05em"
          }}>
            Renew Early · Save 10%
          </button>
        </Card>
      </div>
    </div>
  );
}

/* ─── PAGE 2: SCORES ─── */
function ScoresPage({ scores, setScores, editingScore, setEditingScore, editForm, setEditForm, addingScore, setAddingScore, newScore, setNewScore }) {
  const avg = Math.round(scores.reduce((a, s) => a + s.score, 0) / scores.length);
  const best = Math.min(...scores.map(s => s.score));

  function startEdit(score) {
    setEditingScore(score.id);
    setEditForm({ ...score });
  }

  function saveEdit() {
    setScores(s => s.map(sc => sc.id === editingScore ? { ...editForm, score: parseInt(editForm.score), par: parseInt(editForm.par) } : sc));
    setEditingScore(null);
  }

  function addNewScore() {
    const diff = parseInt(newScore.score) - parseInt(newScore.par);
    setScores(s => [{
      id: Date.now(),
      date: newScore.date || "Mar 27, 2026",
      course: newScore.course,
      score: parseInt(newScore.score),
      par: parseInt(newScore.par),
      diff: diff === 0 ? "E" : diff > 0 ? `+${diff}` : `${diff}`,
      weather: newScore.weather
    }, ...s]);
    setAddingScore(false);
    setNewScore({ date: "", course: "", score: "", par: "72", weather: "Sunny" });
  }

  const inputStyle = {
    background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: 8, padding: "8px 12px", color: "#f0ede6", fontSize: 14,
    fontFamily: "inherit", outline: "none", width: "100%", boxSizing: "border-box"
  };

  return (
    <div>
      <PageHeader icon="⛳" title="Score Entry" subtitle="Track and manage your round scores" />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 16, marginBottom: 28 }}>
        {[
          { label: "Rounds Played", value: scores.length },
          { label: "Average Score", value: avg },
          { label: "Best Round", value: best, color: "#4ade80" },
          { label: "Handicap Index", value: "8.4" },
        ].map(s => (
          <Card key={s.label}>
            <Label>{s.label}</Label>
            <Value color={s.color}>{s.value}</Value>
          </Card>
        ))}
      </div>

      {/* Add Score */}
      {addingScore ? (
        <Card gold style={{ marginBottom: 20 }}>
          <div style={{ color: "#e8c96a", fontSize: 16, fontWeight: "bold", marginBottom: 16 }}>New Score Entry</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr", gap: 12 }}>
            {[
              { label: "Date", field: "date", placeholder: "Mar 27, 2026" },
              { label: "Course Name", field: "course", placeholder: "Pebble Beach GC" },
              { label: "Score", field: "score", placeholder: "78" },
              { label: "Par", field: "par", placeholder: "72" },
              { label: "Weather", field: "weather", placeholder: "Sunny" },
            ].map(f => (
              <div key={f.field}>
                <Label>{f.label}</Label>
                <input
                  style={inputStyle}
                  value={newScore[f.field]}
                  placeholder={f.placeholder}
                  onChange={e => setNewScore(n => ({ ...n, [f.field]: e.target.value }))}
                />
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            <button onClick={addNewScore} style={{ padding: "10px 24px", background: "linear-gradient(135deg, #b48c3c, #e8c96a)", border: "none", borderRadius: 8, color: "#0c1a0e", fontWeight: "bold", cursor: "pointer", fontFamily: "inherit" }}>Save Score</button>
            <button onClick={() => setAddingScore(false)} style={{ padding: "10px 24px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, color: "#c8c0b0", cursor: "pointer", fontFamily: "inherit" }}>Cancel</button>
          </div>
        </Card>
      ) : (
        <button
          onClick={() => setAddingScore(true)}
          style={{
            marginBottom: 20, padding: "12px 24px",
            background: "linear-gradient(135deg, #b48c3c, #e8c96a)",
            border: "none", borderRadius: 10, cursor: "pointer",
            color: "#0c1a0e", fontWeight: "bold", fontSize: 14, fontFamily: "inherit"
          }}
        >
          + Add New Score
        </button>
      )}

      {/* Score table */}
      <Card>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["Date", "Course", "Score", "Par", "+/−", "Weather", "Actions"].map(h => (
                  <th key={h} style={{ color: "#6b8f6b", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", padding: "8px 12px", textAlign: "left", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {scores.map(sc => (
                editingScore === sc.id ? (
                  <tr key={sc.id} style={{ background: "rgba(180,140,60,0.08)" }}>
                    <td style={{ padding: "10px 12px" }}><input style={{ ...inputStyle, width: 100 }} value={editForm.date} onChange={e => setEditForm(f => ({ ...f, date: e.target.value }))} /></td>
                    <td style={{ padding: "10px 12px" }}><input style={inputStyle} value={editForm.course} onChange={e => setEditForm(f => ({ ...f, course: e.target.value }))} /></td>
                    <td style={{ padding: "10px 12px" }}><input style={{ ...inputStyle, width: 60 }} value={editForm.score} onChange={e => setEditForm(f => ({ ...f, score: e.target.value }))} /></td>
                    <td style={{ padding: "10px 12px" }}><input style={{ ...inputStyle, width: 60 }} value={editForm.par} onChange={e => setEditForm(f => ({ ...f, par: e.target.value }))} /></td>
                    <td style={{ padding: "10px 12px", color: "#6b8f6b" }}>auto</td>
                    <td style={{ padding: "10px 12px" }}><input style={inputStyle} value={editForm.weather} onChange={e => setEditForm(f => ({ ...f, weather: e.target.value }))} /></td>
                    <td style={{ padding: "10px 12px" }}>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button onClick={saveEdit} style={{ padding: "6px 14px", background: "#4ade80", border: "none", borderRadius: 6, color: "#0c1a0e", fontWeight: "bold", cursor: "pointer", fontSize: 12, fontFamily: "inherit" }}>Save</button>
                        <button onClick={() => setEditingScore(null)} style={{ padding: "6px 14px", background: "rgba(255,255,255,0.08)", border: "none", borderRadius: 6, color: "#c8c0b0", cursor: "pointer", fontSize: 12, fontFamily: "inherit" }}>Cancel</button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  <tr key={sc.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", transition: "background 0.15s" }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.03)"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                    <td style={{ padding: "14px 12px", color: "#6b8f6b", fontSize: 13 }}>{sc.date}</td>
                    <td style={{ padding: "14px 12px", color: "#f0ede6", fontSize: 14 }}>{sc.course}</td>
                    <td style={{ padding: "14px 12px", color: "#f0ede6", fontWeight: "bold", fontSize: 18 }}>{sc.score}</td>
                    <td style={{ padding: "14px 12px", color: "#6b8f6b" }}>{sc.par}</td>
                    <td style={{ padding: "14px 12px", color: sc.diff.startsWith("-") ? "#4ade80" : sc.diff === "E" ? "#e8c96a" : "#f87171", fontWeight: "bold" }}>{sc.diff}</td>
                    <td style={{ padding: "14px 12px", color: "#c8c0b0", fontSize: 13 }}>{sc.weather}</td>
                    <td style={{ padding: "14px 12px" }}>
                      <button onClick={() => startEdit(sc)} style={{ padding: "6px 14px", background: "rgba(232,201,106,0.12)", border: "1px solid rgba(232,201,106,0.3)", borderRadius: 6, color: "#e8c96a", cursor: "pointer", fontSize: 12, fontFamily: "inherit" }}>Edit</button>
                    </td>
                  </tr>
                )
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

/* ─── PAGE 3: CHARITY ─── */
function CharityPage({ selectedCharity, setSelectedCharity, contribution, setContribution }) {
  const charity = CHARITIES.find(c => c.id === selectedCharity);
  const monthlyAmount = ((299 * contribution) / 100 / 12).toFixed(2);
  const annualAmount = ((299 * contribution) / 100).toFixed(2);

  return (
    <div>
      <PageHeader icon="♡" title="Charity & Contribution" subtitle="Choose your cause and set your giving percentage" />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        {/* Charity selection */}
        <div>
          <div style={{ color: "#6b8f6b", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16 }}>Select Your Charity</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {CHARITIES.map(ch => (
              <div
                key={ch.id}
                onClick={() => setSelectedCharity(ch.id)}
                style={{
                  padding: 20,
                  borderRadius: 14,
                  border: `2px solid ${selectedCharity === ch.id ? "#e8c96a" : "rgba(255,255,255,0.08)"}`,
                  background: selectedCharity === ch.id ? "rgba(180,140,60,0.1)" : "rgba(255,255,255,0.02)",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  display: "flex", alignItems: "center", gap: 16
                }}
              >
                <div style={{ fontSize: 32 }}>{ch.logo}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: "#f0ede6", fontWeight: "bold", fontSize: 15 }}>{ch.name}</div>
                  <div style={{ color: "#6b8f6b", fontSize: 12, marginTop: 2, letterSpacing: "0.08em", textTransform: "uppercase" }}>{ch.category}</div>
                </div>
                {selectedCharity === ch.id && (
                  <div style={{ width: 22, height: 22, borderRadius: "50%", background: "#e8c96a", display: "flex", alignItems: "center", justifyContent: "center", color: "#0c1a0e", fontWeight: "bold", fontSize: 13 }}>✓</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contribution slider */}
        <div>
          <div style={{ color: "#6b8f6b", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16 }}>Contribution Percentage</div>

          <Card gold style={{ marginBottom: 20 }}>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <div style={{ fontSize: 64, fontWeight: "bold", color: "#e8c96a", lineHeight: 1 }}>{contribution}%</div>
              <div style={{ color: "#6b8f6b", fontSize: 14, marginTop: 8 }}>of membership fee donated</div>
            </div>

            <input
              type="range" min={5} max={50} step={5}
              value={contribution}
              onChange={e => setContribution(Number(e.target.value))}
              style={{ width: "100%", accentColor: "#e8c96a", cursor: "pointer" }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", color: "#6b8f6b", fontSize: 12, marginTop: 6 }}>
              <span>5%</span><span>50%</span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 24 }}>
              <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 10, padding: 16, textAlign: "center" }}>
                <div style={{ color: "#6b8f6b", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em" }}>Monthly</div>
                <div style={{ color: "#f0ede6", fontSize: 22, fontWeight: "bold", marginTop: 4 }}>£{monthlyAmount}</div>
              </div>
              <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 10, padding: 16, textAlign: "center" }}>
                <div style={{ color: "#6b8f6b", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em" }}>Annual</div>
                <div style={{ color: "#e8c96a", fontSize: 22, fontWeight: "bold", marginTop: 4 }}>£{annualAmount}</div>
              </div>
            </div>
          </Card>

          <Card>
            <Label>Currently Supporting</Label>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 8 }}>
              <span style={{ fontSize: 28 }}>{charity.logo}</span>
              <div>
                <div style={{ color: "#f0ede6", fontWeight: "bold" }}>{charity.name}</div>
                <div style={{ color: "#6b8f6b", fontSize: 13 }}>Since March 2025 · £{(annualAmount * 1.2).toFixed(2)} total given</div>
              </div>
            </div>
          </Card>

          <button style={{
            width: "100%", marginTop: 16, padding: "14px",
            background: "linear-gradient(135deg, #b48c3c, #e8c96a)",
            border: "none", borderRadius: 12, cursor: "pointer",
            color: "#0c1a0e", fontWeight: "bold", fontSize: 15, fontFamily: "inherit",
            letterSpacing: "0.05em"
          }}>
            Save Charity Preferences
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── PAGE 4: PARTICIPATION ─── */
function ParticipationPage({ draws }) {
  const upcoming = draws.filter(d => d.status === "upcoming");
  const completed = draws.filter(d => d.status === "completed");
  const entered = draws.filter(d => d.entered).length;

  return (
    <div>
      <PageHeader icon="◉" title="Draw Participation" subtitle="Track your draw entries and upcoming events" />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 28 }}>
        <Card gold>
          <Label>Total Draws Entered</Label>
          <Value>{entered}</Value>
        </Card>
        <Card>
          <Label>Upcoming Draws</Label>
          <Value>{upcoming.length}</Value>
        </Card>
        <Card>
          <Label>Win Rate</Label>
          <Value color="#e8c96a">33%</Value>
        </Card>
      </div>

      <div style={{ marginBottom: 32 }}>
        <div style={{ color: "#e8c96a", fontSize: 16, fontWeight: "bold", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
          <span>◉</span> Upcoming Draws
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {upcoming.map(d => (
            <div key={d.id} style={{
              padding: 20, borderRadius: 14,
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.02)",
              display: "flex", alignItems: "center", justifyContent: "space-between"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 10,
                  background: d.entered ? "rgba(74,222,128,0.12)" : "rgba(255,255,255,0.06)",
                  border: `1px solid ${d.entered ? "rgba(74,222,128,0.3)" : "rgba(255,255,255,0.1)"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 20
                }}>
                  {d.entered ? "✓" : "○"}
                </div>
                <div>
                  <div style={{ color: "#f0ede6", fontWeight: "bold", fontSize: 15 }}>{d.name}</div>
                  <div style={{ color: "#6b8f6b", fontSize: 13, marginTop: 2 }}>📅 {d.date}</div>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ color: "#e8c96a", fontWeight: "bold", fontSize: 18 }}>{d.prize}</div>
                <div style={{ marginTop: 6 }}>
                  {d.entered
                    ? <span style={{ background: "rgba(74,222,128,0.12)", color: "#4ade80", padding: "3px 12px", borderRadius: 99, fontSize: 12 }}>Entered</span>
                    : <button style={{ padding: "5px 16px", background: "linear-gradient(135deg, #b48c3c, #e8c96a)", border: "none", borderRadius: 99, color: "#0c1a0e", fontWeight: "bold", cursor: "pointer", fontSize: 12, fontFamily: "inherit" }}>Enter Draw</button>
                  }
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div style={{ color: "#6b8f6b", fontSize: 16, fontWeight: "bold", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
          <span>◈</span> Past Draws
        </div>
        <Card>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["Draw", "Date", "Prize Pool", "Result"].map(h => (
                  <th key={h} style={{ color: "#6b8f6b", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", padding: "8px 12px", textAlign: "left", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {completed.map(d => (
                <tr key={d.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "14px 12px", color: "#f0ede6" }}>{d.name}</td>
                  <td style={{ padding: "14px 12px", color: "#6b8f6b", fontSize: 13 }}>{d.date}</td>
                  <td style={{ padding: "14px 12px", color: "#c8c0b0" }}>{d.prize}</td>
                  <td style={{ padding: "14px 12px" }}>
                    <span style={{
                      padding: "4px 12px", borderRadius: 99, fontSize: 12,
                      background: d.result?.startsWith("Won") ? "rgba(74,222,128,0.12)" : "rgba(255,255,255,0.06)",
                      color: d.result?.startsWith("Won") ? "#4ade80" : "#6b8f6b"
                    }}>{d.result}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}

/* ─── PAGE 5: WINNINGS ─── */
function WinningsPage() {
  const payments = [
    { id: 1, draw: "New Year Draw", date: "Jan 8, 2026", amount: 300, status: "Paid", method: "Bank Transfer" },
    { id: 2, draw: "Autumn Classic", date: "Oct 22, 2025", amount: 750, status: "Paid", method: "Bank Transfer" },
    { id: 3, draw: "Summer Cup", date: "Jul 5, 2025", amount: 150, status: "Paid", method: "Cheque" },
    { id: 4, draw: "Spring Invitational", date: "Apr 18, 2025", amount: 500, status: "Pending", method: "Bank Transfer" },
  ];
  const total = payments.reduce((a, p) => a + p.amount, 0);
  const pending = payments.filter(p => p.status === "Pending").reduce((a, p) => a + p.amount, 0);
  const paid = total - pending;

  return (
    <div>
      <PageHeader icon="◆" title="Winnings Overview" subtitle="Your prize history and payment status" />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 16, marginBottom: 28 }}>
        {[
          { label: "Total Won", value: `£${total}`, color: "#e8c96a" },
          { label: "Paid Out", value: `£${paid}`, color: "#4ade80" },
          { label: "Pending", value: `£${pending}`, color: "#fb923c" },
          { label: "Prizes Won", value: payments.length },
        ].map(s => (
          <Card key={s.label} gold={s.label === "Total Won"}>
            <Label>{s.label}</Label>
            <Value color={s.color}>{s.value}</Value>
          </Card>
        ))}
      </div>

      {/* Bar chart */}
      <Card style={{ marginBottom: 24 }}>
        <Label>Winnings by Quarter (2025–2026)</Label>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 16, height: 120, marginTop: 16 }}>
          {[
            { label: "Q1 '25", val: 150, max: 800 },
            { label: "Q2 '25", val: 500, max: 800 },
            { label: "Q3 '25", val: 0, max: 800 },
            { label: "Q4 '25", val: 750, max: 800 },
            { label: "Q1 '26", val: 300, max: 800 },
          ].map(b => (
            <div key={b.label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, height: "100%" }}>
              <div style={{ flex: 1, display: "flex", alignItems: "flex-end", width: "100%" }}>
                <div style={{
                  width: "100%",
                  height: `${(b.val / b.max) * 100}%`,
                  background: "linear-gradient(180deg, #e8c96a, #b48c3c)",
                  borderRadius: "4px 4px 0 0",
                  minHeight: b.val > 0 ? 4 : 0,
                  transition: "height 0.5s ease"
                }} />
              </div>
              <div style={{ color: "#6b8f6b", fontSize: 11 }}>{b.label}</div>
              <div style={{ color: b.val > 0 ? "#e8c96a" : "#6b8f6b", fontSize: 12, fontWeight: "bold" }}>{b.val > 0 ? `£${b.val}` : "—"}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Payment table */}
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
          <div style={{ color: "#f0ede6", fontSize: 16, fontWeight: "bold" }}>Payment History</div>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {["Draw", "Date", "Amount", "Method", "Status"].map(h => (
                <th key={h} style={{ color: "#6b8f6b", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", padding: "8px 12px", textAlign: "left", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {payments.map(p => (
              <tr key={p.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <td style={{ padding: "16px 12px", color: "#f0ede6", fontWeight: "bold" }}>{p.draw}</td>
                <td style={{ padding: "16px 12px", color: "#6b8f6b", fontSize: 13 }}>{p.date}</td>
                <td style={{ padding: "16px 12px", color: "#e8c96a", fontWeight: "bold", fontSize: 17 }}>£{p.amount}</td>
                <td style={{ padding: "16px 12px", color: "#c8c0b0", fontSize: 13 }}>{p.method}</td>
                <td style={{ padding: "16px 12px" }}>
                  <span style={{
                    padding: "5px 14px", borderRadius: 99, fontSize: 12, fontWeight: "bold",
                    background: p.status === "Paid" ? "rgba(74,222,128,0.12)" : "rgba(251,146,60,0.12)",
                    color: p.status === "Paid" ? "#4ade80" : "#fb923c"
                  }}>
                    {p.status === "Pending" ? "⏳ " : "✓ "}{p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {pending > 0 && (
          <div style={{
            marginTop: 20, padding: 16, borderRadius: 10,
            background: "rgba(251,146,60,0.08)", border: "1px solid rgba(251,146,60,0.2)",
            display: "flex", alignItems: "center", gap: 12
          }}>
            <span style={{ fontSize: 20 }}>⚠️</span>
            <div>
              <div style={{ color: "#fb923c", fontWeight: "bold", fontSize: 14 }}>Payment Pending</div>
              <div style={{ color: "#c8c0b0", fontSize: 13, marginTop: 2 }}>£{pending} is awaiting processing. Please allow 3–5 working days for bank transfers.</div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

function PageHeader({ icon, title, subtitle }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
        <span style={{ color: "#e8c96a", fontSize: 28 }}>{icon}</span>
        <h1 style={{ color: "#f0ede6", fontSize: 28, fontWeight: "bold", margin: 0 }}>{title}</h1>
      </div>
      <div style={{ color: "#6b8f6b", fontSize: 15, marginLeft: 44 }}>{subtitle}</div>
      <div style={{ height: 1, background: "rgba(255,255,255,0.08)", marginTop: 20 }} />
    </div>
  );
}