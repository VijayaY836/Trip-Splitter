import { AVATAR_COLORS } from "../App";
import { computeSettlement } from "../utils/splitLogic";

export default function Settlement({ members, payments, onReset }) {
  const transactions = computeSettlement(members, payments);
  const totalSpent = payments.reduce((s, p) => s + p.amount, 0);

  return (
    <div className="settlement-screen">
      {/* LEFT col — summary */}
      <div className="settle-left">
        <div className="settle-eyebrow">
          <div className="check-circle">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          Trip complete
        </div>
        <h2 className="settle-headline">All wrapped<br/>up.</h2>
        <p className="settle-subline">{payments.length} payments logged across {members.length} people.</p>

        <div className="settle-stats">
          <div className="stat-item">
            <div className="stat-num">₹{totalSpent.toFixed(0)}</div>
            <div className="stat-label">Total spent</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">{payments.length}</div>
            <div className="stat-label">Payments</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">{transactions.length}</div>
            <div className="stat-label">Transfers needed</div>
          </div>
        </div>

        <div className="settle-summary">
          <h3>All payments</h3>
          <ul className="settle-summary-list">
            {payments.map(p => {
              const pidx = members.indexOf(p.payer);
              return (
                <li key={p.id} className="sl-item">
                  <span className="sl-left">
                    <span style={{ color: AVATAR_COLORS[pidx % AVATAR_COLORS.length], fontWeight: 500 }}>{p.payer}</span>
                    {" · "}{p.desc}
                  </span>
                  <span className="sl-right">₹{p.amount.toFixed(2)}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* RIGHT col — transfers */}
      <div className="settle-right">
        <div className="transfers-card">
          <h2>Who pays whom</h2>
          <p className="tc-sub">
            {transactions.length === 0
              ? "No transfers needed — everyone's square."
              : `${transactions.length} transfer${transactions.length > 1 ? "s" : ""} to settle everything up.`}
          </p>

          {transactions.length === 0 ? (
            <div className="all-even">
              <div className="checkmark">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path d="M6 14l6 6 10-10" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p>Everyone's even!</p>
            </div>
          ) : (
            <div className="transfer-list">
              {transactions.map((t, i) => {
                const fi = members.indexOf(t.from);
                const ti = members.indexOf(t.to);
                return (
                  <div key={i} className="transfer-row">
                    <div className="tr-person">
                      <div className="tr-avatar" style={{ background: AVATAR_COLORS[fi % AVATAR_COLORS.length] }}>
                        {t.from[0].toUpperCase()}
                      </div>
                      <span className="tr-name">{t.from}</span>
                    </div>

                    <div className="tr-middle">
                      <div className="tr-amount">₹{t.amount.toFixed(2)}</div>
                      <div className="tr-arrow">
                        <div className="tr-line" />
                        <span className="tr-head">▶</span>
                      </div>
                    </div>

                    <div className="tr-person">
                      <div className="tr-avatar" style={{ background: AVATAR_COLORS[ti % AVATAR_COLORS.length] }}>
                        {t.to[0].toUpperCase()}
                      </div>
                      <span className="tr-name">{t.to}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <button className="btn-new-trip" onClick={onReset}>
            Start a new trip
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 8h12M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}