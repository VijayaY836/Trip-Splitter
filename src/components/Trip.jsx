import { useState } from "react";
import { AVATAR_COLORS } from "../App";
import { computeBalances } from "../utils/splitLogic";

// Map category keywords to emoji
function guessEmoji(desc) {
  const d = desc.toLowerCase();
  if (/food|eat|lunch|dinner|breakfast|cafe|coffee|tea|restaurant|pizza|burger|cake|snack|biryani|swiggy|zomato/.test(d)) return "🍽️";
  if (/cab|taxi|uber|ola|ride|auto|bus|train|metro|flight|travel|fuel|petrol/.test(d)) return "🚗";
  if (/mall|shop|store|buy|purchase|market/.test(d)) return "🛍️";
  if (/movie|film|cinema|show|concert|ticket|event/.test(d)) return "🎬";
  if (/hotel|stay|room|hostel|airbnb/.test(d)) return "🏨";
  if (/drink|beer|bar|wine|cocktail/.test(d)) return "🍻";
  if (/ice cream|dessert|sweet/.test(d)) return "🍦";
  return "💳";
}

export default function Trip({ members, payments, onAdd, onEnd }) {
  const [payer, setPayer] = useState(members[0]);
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [splitWith, setSplitWith] = useState(members.filter(m => m !== members[0]));
  const [error, setError] = useState("");

  const balances = computeBalances(members, payments);
  const totalSpent = payments.reduce((s, p) => s + p.amount, 0);

  const amt = parseFloat(amount) || 0;
  const splitCount = splitWith.length + 1; // +1 for payer
  const shareEach = amt > 0 && splitWith.length > 0 ? amt / splitCount : 0;

  function handlePayerChange(name) {
    setPayer(name);
    setSplitWith(members.filter(m => m !== name));
  }

  function toggleSplit(name) {
    setSplitWith(prev =>
      prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
    );
  }

  function handleAdd() {
    if (!desc.trim()) { setError("Enter a description."); return; }
    if (isNaN(amt) || amt <= 0) { setError("Enter a valid amount."); return; }
    if (splitWith.length === 0) { setError("Select at least one person to split with."); return; }

    onAdd({ payer, desc: desc.trim(), amount: amt, splitWith, id: Date.now() });
    setDesc("");
    setAmount("");
    setSplitWith(members.filter(m => m !== payer));
    setError("");
  }

  return (
    <div className="trip-screen">
      {/* LEFT — live feed + balances */}
      <div className="panel-left">
        <p className="panel-section-label">Balances</p>
        <div className="balances-grid">
          {members.map((m, i) => {
            const bal = balances[m] ?? 0;
            const isPos = bal >= 0;
            return (
              <div key={m} className={`balance-card ${isPos ? "positive" : "negative"}`}>
                <div className="bc-name">
                  <div className="bc-avatar" style={{ background: AVATAR_COLORS[i % AVATAR_COLORS.length] }}>
                    {m[0].toUpperCase()}
                  </div>
                  {m}
                </div>
                <div className="bc-amount">
                  {isPos ? "+" : "−"}₹{Math.abs(bal).toFixed(2)}
                </div>
                <div className="bc-status">
                  {Math.abs(bal) < 0.01 ? "settled" : isPos ? "owed back" : "owes"}
                </div>
              </div>
            );
          })}
        </div>

        <p className="panel-section-label">Payments</p>
        {payments.length === 0 ? (
          <div className="feed-empty">
            <ReceiptSvg />
            <p>No payments yet. Log your first one →</p>
          </div>
        ) : (
          <div className="feed-list">
            {[...payments].reverse().map((p, i) => {
              const pidx = members.indexOf(p.payer);
              return (
                <div key={p.id} className="feed-item">
                  <div className="feed-icon">{guessEmoji(p.desc)}</div>
                  <div className="feed-meta">
                    <div className="feed-desc">{p.desc}</div>
                    <div className="feed-sub">
                      <span className="feed-payer" style={{ color: AVATAR_COLORS[pidx % AVATAR_COLORS.length] }}>{p.payer}</span>
                      <span className="feed-sep">paid ·</span>
                      <span>split {p.splitWith.length + 1} ways</span>
                    </div>
                  </div>
                  <div>
                    <div className="feed-amount">₹{p.amount.toFixed(2)}</div>
                    <div className="feed-share">₹{(p.amount / (p.splitWith.length + 1)).toFixed(2)} each</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {payments.length > 0 && (
          <div className="end-strip">
            <p>Done spending? Calculate who owes whom.</p>
            <button className="btn-end-trip" onClick={onEnd}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 2v9M4 7l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="2" y1="14" x2="14" y2="14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
              End trip & settle
            </button>
          </div>
        )}
      </div>

      {/* RIGHT — form */}
      <div className="panel-right">
        {totalSpent > 0 && (
          <div className="total-strip">
            <span className="total-label">Total spent</span>
            <span className="total-amount">₹{totalSpent.toFixed(2)}</span>
          </div>
        )}

        <div className="form-card" style={{ marginTop: totalSpent > 0 ? 20 : 0 }}>
          <div className="form-title">
            <div className="form-title-dot" />
            Log a payment
          </div>

          <label className="form-label">Who paid?</label>
          <div className="who-grid">
            {members.map((m, i) => (
              <button
                key={m}
                className={`who-btn ${payer === m ? "selected" : ""}`}
                onClick={() => handlePayerChange(m)}
              >
                <div className="avatar" style={{ background: AVATAR_COLORS[i % AVATAR_COLORS.length] }}>
                  {m[0].toUpperCase()}
                </div>
                {m}
              </button>
            ))}
          </div>

          <label className="form-label">For what?</label>
          <input
            className="form-input"
            type="text"
            placeholder="e.g. Dinner, Cab, Cakes..."
            value={desc}
            onChange={e => { setDesc(e.target.value); setError(""); }}
            onKeyDown={e => e.key === "Enter" && handleAdd()}
          />

          <label className="form-label">Amount</label>
          <div className="amount-wrapper">
            <span className="amount-prefix">₹</span>
            <input
              className="form-input amount-input"
              type="number"
              placeholder="0"
              value={amount}
              min="0"
              onChange={e => { setAmount(e.target.value); setError(""); }}
              onKeyDown={e => e.key === "Enter" && handleAdd()}
            />
          </div>

          <div className="form-divider" />

          <label className="form-label">Split with</label>
          <div className="who-grid">
            {members.filter(m => m !== payer).map((m, i) => {
              const ci = members.indexOf(m);
              const selected = splitWith.includes(m);
              return (
                <button
                  key={m}
                  className={`who-btn ${selected ? "selected" : ""}`}
                  onClick={() => { toggleSplit(m); setError(""); }}
                  aria-pressed={selected}
                >
                  <div className="avatar" style={{ background: AVATAR_COLORS[ci % AVATAR_COLORS.length] }}>
                    {m[0].toUpperCase()}
                  </div>
                  <div className="who-content">
                    <span>{m}</span>
                    <span className="who-action">{selected ? "Remove" : "Add"}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {shareEach > 0 && (
            <div className="split-preview">
              <span>Each person pays</span>
              <span className="amount-each">₹{shareEach.toFixed(2)}</span>
              <span style={{ color: "var(--ink-3)", fontSize: 13 }}>({splitCount} people)</span>
            </div>
          )}

          {error && <p className="error-msg" style={{ marginTop: 10 }}>{error}</p>}

          <button className="btn-log" onClick={handleAdd}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 3v12M3 9h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Add payment
          </button>
        </div>
      </div>
    </div>
  );
}

function ReceiptSvg() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="8" width="32" height="40" rx="4" stroke="#c4c3cc" strokeWidth="2"/>
      <path d="M12 44l4-4 4 4 4-4 4 4 4-4 4 4" stroke="#c4c3cc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="20" y1="20" x2="36" y2="20" stroke="#c4c3cc" strokeWidth="2" strokeLinecap="round"/>
      <line x1="20" y1="26" x2="36" y2="26" stroke="#c4c3cc" strokeWidth="2" strokeLinecap="round"/>
      <line x1="20" y1="32" x2="28" y2="32" stroke="#c4c3cc" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}