import { useState } from "react";
import Setup from "./components/Setup";
import Trip from "./components/Trip";
import Settlement from "./components/Settlement";
import "./App.css";
import bg from "./assets/bg.png";

// Avatar colour palette — 10 distinct hues
export const AVATAR_COLORS = [
  "#5b4fe9","#e9504f","#1da462","#e9954f","#4f9de9",
  "#a44fe9","#4fe9b8","#e94f9b","#7de94f","#4fbbe9"
];

export default function App() {
  const [phase, setPhase] = useState("setup");
  const [members, setMembers] = useState([]);
  const [payments, setPayments] = useState([]);

  function startTrip(names) {
    setMembers(names);
    setPayments([]);
    setPhase("trip");
  }

  function addPayment(payment) {
    setPayments((prev) => [...prev, payment]);
  }

  function endTrip() { setPhase("settled"); }

  function reset() {
    setMembers([]);
    setPayments([]);
    setPhase("setup");
  }

  return (
    <div
      className="app"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <header className="app-header">
        <div className="header-brand">
          <BrandMark />
          <span className="brand-name">SplitTab</span>
        </div>
        <div className="header-meta">
          {phase === "trip" && (
            <div className="trip-badge">
              <span className="dot" />
              Trip in progress · {members.length} people
            </div>
          )}
          {phase !== "setup" && (
            <button className="btn-ghost" onClick={reset}>New trip</button>
          )}
        </div>
      </header>

      <main className="app-main">
        {phase === "setup" && <Setup onStart={startTrip} />}
        {phase === "trip" && (
          <Trip members={members} payments={payments} onAdd={addPayment} onEnd={endTrip} />
        )}
        {phase === "settled" && (
          <Settlement members={members} payments={payments} onReset={reset} />
        )}
      </main>
    </div>
  );
}

function BrandMark() {
  return (
    <svg className="brand-mark" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="8" fill="#5b4fe9"/>
      <path d="M8 11h10M8 16h7M8 21h10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="23" cy="20" r="5" fill="white" opacity="0.9"/>
      <path d="M21 20l1.5 1.5L25 18.5" stroke="#5b4fe9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}