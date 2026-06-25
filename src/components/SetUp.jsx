import { useState } from "react";
import { AVATAR_COLORS } from "../App";

export default function Setup({ onStart }) {
  const [input, setInput] = useState("");
  const [names, setNames] = useState([]);
  const [error, setError] = useState("");

  function addName() {
    const trimmed = input.trim();
    if (!trimmed) return;
    if (names.map(n => n.toLowerCase()).includes(trimmed.toLowerCase())) {
      setError("Already added.");
      return;
    }
    setNames(prev => [...prev, trimmed]);
    setInput("");
    setError("");
  }

  function removeName(name) {
    setNames(prev => prev.filter(n => n !== name));
  }

  function handleKey(e) {
    if (e.key === "Enter") addName();
  }

  function handleStart() {
    if (names.length < 2) { setError("Add at least 2 people."); return; }
    onStart(names);
  }

  return (
    <div className="setup-screen">
      <div className="setup-card">
        <div className="setup-eyebrow">
          <span />
          Bill splitting, simplified
        </div>
        <h1>Who's <em>on</em><br />this trip?</h1>
        <p className="subtitle">Add everyone joining. Log payments as you go.</p>

        <div className="input-group">
          <input
            className="input-field"
            type="text"
            placeholder="Name"
            value={input}
            onChange={e => { setInput(e.target.value); setError(""); }}
            onKeyDown={handleKey}
            maxLength={20}
            autoFocus
          />
          <button className="btn-add-name" onClick={addName}>Add</button>
        </div>

        <p className="error-msg">{error}</p>

        <div className="names-grid">
          {names.map((name, i) => (
            <div key={name} className="name-chip">
              <div
                className="avatar"
                style={{ background: AVATAR_COLORS[i % AVATAR_COLORS.length] }}
              >
                {name[0].toUpperCase()}
              </div>
              {name}
              <button className="chip-x" onClick={() => removeName(name)} aria-label={`Remove ${name}`}>✕</button>
            </div>
          ))}
        </div>

        <button className="btn-start" onClick={handleStart} disabled={names.length < 2}>
          Start trip
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M3 9h12M10 4l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}