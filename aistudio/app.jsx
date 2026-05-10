const { useState, useEffect, useRef, useMemo } = React;

// ---------- helpers ----------
const uid = () => Math.random().toString(36).slice(2, 9);
const fmtTime = (ts) => {
  const d = new Date(ts);
  return d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
};
const fmtDay = (ts) => {
  const d = new Date(ts);
  const today = new Date();
  const diff = Math.floor((today - d) / 86400000);
  if (diff === 0) return "Today";
  if (diff === 1) return "Yesterday";
  return d.toLocaleDateString([], { month: "short", day: "numeric" });
};
const approxTokens = (s) => Math.max(1, Math.round((s || "").length / 4));

const SEED_SESSIONS = [
  {
    id: "s1",
    title: "Onboarding email draft",
    updatedAt: Date.now() - 1000 * 60 * 12,
    messages: [
      { id: uid(), role: "user", content: "Draft a friendly onboarding email for new users of our analytics dashboard.", ts: Date.now() - 1000 * 60 * 14 },
      { id: uid(), role: "assistant", content: "Subject: Welcome to Lumen — let's get your first dashboard up\n\nHi {{first_name}},\n\nThanks for signing up. In the next two minutes you'll connect a data source and see your first chart. If anything's unclear, just reply to this email — a real person will get back to you.\n\n— The Lumen team", ts: Date.now() - 1000 * 60 * 13, model: "gpt-class-large", latencyMs: 842, tokensIn: 18, tokensOut: 74 },
    ],
  },
  {
    id: "s2",
    title: "Summarize Q2 retro notes",
    updatedAt: Date.now() - 1000 * 60 * 60 * 4,
    messages: [
      { id: uid(), role: "user", content: "Summarize these retro notes into 3 themes and 5 action items.", ts: Date.now() - 1000 * 60 * 60 * 4 },
    ],
  },
  {
    id: "s3",
    title: "SQL: top 10 churned cohorts",
    updatedAt: Date.now() - 1000 * 60 * 60 * 26,
    messages: [],
  },
  {
    id: "s4",
    title: "Product copy variants",
    updatedAt: Date.now() - 1000 * 60 * 60 * 50,
    messages: [],
  },
];

const MODELS = [
  { id: "fast", name: "Studio Fast", desc: "Low latency, short answers", badge: "default" },
  { id: "balanced", name: "Studio Balanced", desc: "Good quality, ~1s typical", badge: "" },
  { id: "deep", name: "Studio Deep", desc: "Slower, longer reasoning", badge: "" },
];

const SUGGESTIONS = [
  "Summarize a long document into bullet points",
  "Draft a polite follow-up email",
  "Explain a SQL query in plain English",
  "Generate 5 product name variants",
];

// ---------- icons (simple, original) ----------
const Icon = {
  Plus: (p) => <svg viewBox="0 0 16 16" width="14" height="14" {...p}><path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  Search: (p) => <svg viewBox="0 0 16 16" width="14" height="14" {...p}><circle cx="7" cy="7" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.5"/><path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  Send: (p) => <svg viewBox="0 0 16 16" width="14" height="14" {...p}><path d="M2 8l12-5-5 12-2-5-5-2z" fill="currentColor"/></svg>,
  Stop: (p) => <svg viewBox="0 0 16 16" width="12" height="12" {...p}><rect x="3" y="3" width="10" height="10" rx="1.5" fill="currentColor"/></svg>,
  Copy: (p) => <svg viewBox="0 0 16 16" width="13" height="13" {...p}><rect x="4" y="4" width="9" height="9" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.5"/><path d="M3 11V4a1 1 0 011-1h7" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>,
  Refresh: (p) => <svg viewBox="0 0 16 16" width="13" height="13" {...p}><path d="M13 8a5 5 0 1 1-1.5-3.5M13 3v2.5h-2.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  Up: (p) => <svg viewBox="0 0 16 16" width="13" height="13" {...p}><path d="M3 10l5-5 5 5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  Down: (p) => <svg viewBox="0 0 16 16" width="13" height="13" {...p}><path d="M3 6l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  Sparkle: (p) => <svg viewBox="0 0 16 16" width="13" height="13" {...p}><path d="M8 2l1.4 3.6L13 7l-3.6 1.4L8 12l-1.4-3.6L3 7l3.6-1.4L8 2z" fill="currentColor"/></svg>,
  Dot: (p) => <svg viewBox="0 0 16 16" width="8" height="8" {...p}><circle cx="8" cy="8" r="3" fill="currentColor"/></svg>,
  Trash: (p) => <svg viewBox="0 0 16 16" width="13" height="13" {...p}><path d="M3 4.5h10M6 4V3a1 1 0 011-1h2a1 1 0 011 1v1M5 4.5L5.5 13a1 1 0 001 1h3a1 1 0 001-1L11 4.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
};

// ---------- small UI atoms ----------
function Pill({ children, tone = "default" }) {
  const tones = {
    default: { bg: "var(--panel-2)", fg: "var(--ink-2)", bd: "var(--line)" },
    accent: { bg: "var(--accent-soft)", fg: "var(--accent)", bd: "transparent" },
    ok: { bg: "oklch(0.95 0.04 150)", fg: "var(--ok)", bd: "transparent" },
  };
  const t = tones[tone];
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      padding: "2px 8px", borderRadius: 999,
      background: t.bg, color: t.fg, border: `1px solid ${t.bd}`,
      fontFamily: "var(--mono)", fontSize: 11, lineHeight: "16px",
      letterSpacing: 0.2,
    }}>{children}</span>
  );
}

function IconBtn({ children, onClick, title, active, danger }) {
  return (
    <button
      onClick={onClick} title={title}
      style={{
        height: 28, minWidth: 28, padding: "0 8px",
        display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6,
        background: active ? "var(--panel-2)" : "transparent",
        border: "1px solid " + (active ? "var(--line)" : "transparent"),
        borderRadius: 8, cursor: "pointer",
        color: danger ? "oklch(0.55 0.18 25)" : "var(--ink-2)",
        fontSize: 12,
      }}
      onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = "var(--panel-2)"; }}
      onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = "transparent"; }}
    >{children}</button>
  );
}

// ---------- progress / typing indicators ----------
function StreamingDots() {
  return (
    <span style={{ display: "inline-flex", gap: 4, alignItems: "center", height: 14 }}>
      {[0, 1, 2].map(i => (
        <span key={i} style={{
          width: 5, height: 5, borderRadius: 99, background: "var(--ink-3)",
          animation: `bounce 1s ${i * 0.15}s infinite ease-in-out`,
        }} />
      ))}
      <style>{`@keyframes bounce { 0%,80%,100%{transform:translateY(0);opacity:.4} 40%{transform:translateY(-3px);opacity:1} }`}</style>
    </span>
  );
}

function ProgressBar({ progress }) {
  return (
    <div style={{ height: 2, background: "var(--line-2)", overflow: "hidden", borderRadius: 99 }}>
      <div style={{
        height: "100%", width: `${Math.min(100, progress)}%`,
        background: "var(--accent)", transition: "width 120ms linear",
      }} />
    </div>
  );
}

// ---------- sidebar ----------
function Sidebar({ sessions, activeId, onSelect, onNew, onDelete, query, setQuery }) {
  const groups = useMemo(() => {
    const filtered = sessions.filter(s =>
      !query || s.title.toLowerCase().includes(query.toLowerCase())
    );
    const map = {};
    filtered.forEach(s => {
      const k = fmtDay(s.updatedAt);
      (map[k] = map[k] || []).push(s);
    });
    return map;
  }, [sessions, query]);

  return (
    <aside style={{
      width: 264, flexShrink: 0,
      borderRight: "1px solid var(--line)",
      background: "var(--panel)",
      display: "flex", flexDirection: "column",
      height: "100%",
    }}>
      <div style={{ padding: "14px 14px 8px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <div style={{
            width: 22, height: 22, borderRadius: 6,
            background: "var(--ink)", color: "var(--bg)",
            display: "grid", placeItems: "center",
          }}>
            <Icon.Sparkle />
          </div>
          <div style={{ fontWeight: 600, letterSpacing: -0.2 }}>AI Studio</div>
          <Pill tone="accent">demo</Pill>
        </div>
        <button onClick={onNew} style={{
          width: "100%", height: 32, border: "1px solid var(--line)",
          background: "var(--bg)", borderRadius: 8, cursor: "pointer",
          display: "flex", alignItems: "center", gap: 8, padding: "0 10px",
          color: "var(--ink)", fontSize: 13, fontWeight: 500,
        }}>
          <Icon.Plus /> New session
          <span style={{ marginLeft: "auto", fontFamily: "var(--mono)", color: "var(--ink-3)", fontSize: 11 }}>⌘N</span>
        </button>
      </div>

      <div style={{ padding: "0 14px 10px" }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 6,
          height: 28, padding: "0 8px",
          background: "var(--panel-2)", borderRadius: 8,
          color: "var(--ink-3)",
        }}>
          <Icon.Search />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search sessions"
            style={{
              border: "none", outline: "none", background: "transparent",
              flex: 1, color: "var(--ink)", fontSize: 12, fontFamily: "inherit",
            }}
          />
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "0 8px 14px" }}>
        {Object.keys(groups).length === 0 && (
          <div style={{ padding: 14, color: "var(--ink-3)", fontSize: 12 }}>
            No sessions match "{query}".
          </div>
        )}
        {Object.entries(groups).map(([day, items]) => (
          <div key={day} style={{ marginBottom: 8 }}>
            <div style={{
              padding: "8px 10px 4px",
              fontSize: 10, textTransform: "uppercase", letterSpacing: 0.8,
              color: "var(--ink-3)", fontFamily: "var(--mono)",
            }}>{day}</div>
            {items.map(s => (
              <SessionRow key={s.id} session={s}
                active={s.id === activeId}
                onSelect={() => onSelect(s.id)}
                onDelete={() => onDelete(s.id)} />
            ))}
          </div>
        ))}
      </div>

      <div style={{
        padding: 12, borderTop: "1px solid var(--line)",
        display: "flex", alignItems: "center", gap: 10,
      }}>
        <div style={{
          width: 28, height: 28, borderRadius: 99,
          background: "var(--accent-soft)", color: "var(--accent)",
          display: "grid", placeItems: "center", fontWeight: 600, fontSize: 12,
        }}>AC</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12, fontWeight: 500 }}>Alex Chen</div>
          <div style={{ fontSize: 11, color: "var(--ink-3)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            alex@acme.co
          </div>
        </div>
        <Pill>Pro</Pill>
      </div>
    </aside>
  );
}

function SessionRow({ session, active, onSelect, onDelete }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onClick={onSelect}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex", alignItems: "center", gap: 8,
        padding: "8px 10px", borderRadius: 8, cursor: "pointer",
        background: active ? "var(--bg)" : (hover ? "var(--panel-2)" : "transparent"),
        border: `1px solid ${active ? "var(--line)" : "transparent"}`,
        marginBottom: 1,
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 13, color: "var(--ink)", fontWeight: active ? 500 : 400,
          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
        }}>{session.title}</div>
        <div style={{ fontSize: 11, color: "var(--ink-3)", fontFamily: "var(--mono)" }}>
          {session.messages.length} msg · {fmtTime(session.updatedAt)}
        </div>
      </div>
      {hover && (
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(); }}
          title="Delete"
          style={{
            border: "none", background: "transparent", padding: 4,
            color: "var(--ink-3)", cursor: "pointer", borderRadius: 4,
          }}
        ><Icon.Trash /></button>
      )}
    </div>
  );
}

// ---------- header ----------
function Header({ session, model, setModel, modelOpen, setModelOpen, status }) {
  return (
    <header style={{
      height: 52, padding: "0 18px",
      borderBottom: "1px solid var(--line)",
      display: "flex", alignItems: "center", gap: 14,
      background: "var(--bg)",
    }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontWeight: 500, fontSize: 14,
          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
        }}>{session?.title || "New session"}</div>
        <div style={{ fontSize: 11, color: "var(--ink-3)", fontFamily: "var(--mono)" }}>
          {session ? `id ${session.id} · ${fmtDay(session.updatedAt)} ${fmtTime(session.updatedAt)}` : "untitled"}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--ink-2)", fontSize: 12 }}>
        <span style={{
          width: 6, height: 6, borderRadius: 99,
          background: status === "streaming" ? "var(--warn)" : "var(--ok)",
        }} />
        <span style={{ fontFamily: "var(--mono)", fontSize: 11 }}>
          {status === "streaming" ? "generating…" : "ready"}
        </span>
      </div>

      <div style={{ position: "relative" }}>
        <button onClick={() => setModelOpen(v => !v)} style={{
          height: 30, padding: "0 10px", borderRadius: 8,
          border: "1px solid var(--line)", background: "var(--bg)",
          display: "flex", alignItems: "center", gap: 8, cursor: "pointer",
          fontSize: 12, color: "var(--ink)",
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: 99, background: "var(--accent)",
          }} />
          {MODELS.find(m => m.id === model)?.name}
          {modelOpen ? <Icon.Up /> : <Icon.Down />}
        </button>
        {modelOpen && (
          <div style={{
            position: "absolute", right: 0, top: 36, zIndex: 20,
            width: 260, background: "var(--bg)",
            border: "1px solid var(--line)", borderRadius: 10,
            boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
            padding: 4,
          }}>
            {MODELS.map(m => (
              <button key={m.id} onClick={() => { setModel(m.id); setModelOpen(false); }}
                style={{
                  width: "100%", textAlign: "left", padding: "8px 10px",
                  border: "none", background: m.id === model ? "var(--panel-2)" : "transparent",
                  borderRadius: 6, cursor: "pointer", display: "block",
                }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 500 }}>{m.name}</span>
                  {m.badge && <Pill tone="accent">{m.badge}</Pill>}
                </div>
                <div style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 2 }}>{m.desc}</div>
              </button>
            ))}
            <div style={{
              borderTop: "1px solid var(--line-2)", margin: "4px 0",
              padding: "8px 10px", fontSize: 11, color: "var(--ink-3)",
              fontFamily: "var(--mono)",
            }}>
              backend: POST /v1/generate
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

// ---------- empty state ----------
function EmptyState({ onSuggest }) {
  return (
    <div style={{
      flex: 1, display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: 32, textAlign: "center",
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: 12,
        background: "var(--accent-soft)", color: "var(--accent)",
        display: "grid", placeItems: "center", marginBottom: 16,
      }}>
        <Icon.Sparkle />
      </div>
      <div style={{ fontSize: 22, fontWeight: 500, letterSpacing: -0.4, marginBottom: 6 }}>
        What can I help you make?
      </div>
      <div style={{ color: "var(--ink-2)", fontSize: 13, maxWidth: 420, marginBottom: 22 }}>
        Ask a question, paste content to summarize, or pick one of the starters below.
      </div>
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr",
        gap: 8, width: "min(540px, 100%)",
      }}>
        {SUGGESTIONS.map((s, i) => (
          <button key={i} onClick={() => onSuggest(s)} style={{
            textAlign: "left", padding: "10px 12px",
            background: "var(--panel)", border: "1px solid var(--line)",
            borderRadius: 10, cursor: "pointer", fontSize: 13,
            color: "var(--ink)", fontFamily: "inherit",
          }}>{s}</button>
        ))}
      </div>
    </div>
  );
}

// ---------- message ----------
function Message({ msg, onCopy, onRegen, showTokens }) {
  const isUser = msg.role === "user";
  return (
    <div style={{
      display: "flex", gap: 12,
      padding: "10px 24px", maxWidth: 760, margin: "0 auto", width: "100%",
    }}>
      <div style={{
        width: 26, height: 26, borderRadius: 99, flexShrink: 0,
        marginTop: 2,
        background: isUser ? "var(--accent-soft)" : "var(--ink)",
        color: isUser ? "var(--accent)" : "var(--bg)",
        display: "grid", placeItems: "center",
        fontSize: 11, fontWeight: 600,
      }}>
        {isUser ? "AC" : <Icon.Sparkle />}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <span style={{ fontSize: 12, fontWeight: 600 }}>
            {isUser ? "You" : "Studio Fast"}
          </span>
          <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink-3)" }}>
            {fmtTime(msg.ts)}
          </span>
          {!isUser && msg.latencyMs && (
            <Pill>{msg.latencyMs}ms</Pill>
          )}
        </div>
        <div style={{
          fontSize: 14, lineHeight: 1.6,
          whiteSpace: "pre-wrap", wordBreak: "break-word",
          color: msg.streaming && !msg.content ? "var(--ink-3)" : "var(--ink)",
        }}>
          {msg.content || (msg.streaming ? <StreamingDots /> : "")}
          {msg.streaming && msg.content && (
            <span style={{
              display: "inline-block", width: 7, height: 14,
              background: "var(--accent)", marginLeft: 2, verticalAlign: "-2px",
              animation: "blink 1s steps(2) infinite",
            }} />
          )}
          <style>{`@keyframes blink { 50% { opacity: 0 } }`}</style>
        </div>
        {!isUser && !msg.streaming && (
          <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 8 }}>
            <IconBtn onClick={() => onCopy(msg)} title="Copy"><Icon.Copy /> <span style={{ fontSize: 11 }}>Copy</span></IconBtn>
            <IconBtn onClick={() => onRegen(msg)} title="Regenerate"><Icon.Refresh /> <span style={{ fontSize: 11 }}>Regenerate</span></IconBtn>
            {showTokens && msg.tokensIn != null && (
              <span style={{ marginLeft: "auto", fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink-3)" }}>
                in {msg.tokensIn} · out {msg.tokensOut}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ---------- composer ----------
function Composer({ value, setValue, onSend, onStop, streaming, density }) {
  const taRef = useRef();
  useEffect(() => {
    const el = taRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(180, el.scrollHeight) + "px";
  }, [value]);

  const padY = density === "compact" ? 10 : 14;

  return (
    <div style={{
      borderTop: "1px solid var(--line)",
      background: "var(--bg)",
      padding: `${padY}px 24px ${padY + 4}px`,
    }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{
          border: "1px solid var(--line)",
          background: "var(--panel)",
          borderRadius: 12,
          padding: 10,
          display: "flex", flexDirection: "column", gap: 6,
        }}>
          <textarea
            ref={taRef}
            value={value}
            onChange={e => setValue(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                if (!streaming && value.trim()) onSend();
              }
            }}
            placeholder="Ask anything, or paste content to work with…"
            rows={1}
            style={{
              border: "none", outline: "none", resize: "none",
              background: "transparent", color: "var(--ink)",
              fontFamily: "inherit", fontSize: 14, lineHeight: 1.5,
              padding: "4px 6px", minHeight: 22,
            }}
          />
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Pill>≈ {approxTokens(value)} tok</Pill>
            <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink-3)" }}>
              ⏎ send · ⇧⏎ newline
            </span>
            <div style={{ flex: 1 }} />
            {streaming ? (
              <button onClick={onStop} style={{
                height: 32, padding: "0 14px", borderRadius: 8,
                border: "1px solid var(--line)", background: "var(--bg)",
                display: "flex", alignItems: "center", gap: 6,
                cursor: "pointer", fontSize: 13, color: "var(--ink)",
              }}>
                <Icon.Stop /> Stop
              </button>
            ) : (
              <button onClick={onSend} disabled={!value.trim()} style={{
                height: 32, padding: "0 14px", borderRadius: 8,
                border: "none",
                background: value.trim() ? "var(--accent)" : "var(--panel-2)",
                color: value.trim() ? "white" : "var(--ink-3)",
                display: "flex", alignItems: "center", gap: 6,
                cursor: value.trim() ? "pointer" : "not-allowed",
                fontSize: 13, fontWeight: 500,
              }}>
                Send <Icon.Send />
              </button>
            )}
          </div>
        </div>
        <div style={{
          textAlign: "center", marginTop: 8,
          fontFamily: "var(--mono)", fontSize: 10, color: "var(--ink-3)",
        }}>
          Responses are AI-generated · this is a client demo, not for production data
        </div>
      </div>
    </div>
  );
}

// ---------- inspector (right panel) ----------
function Inspector({ session, model }) {
  const m = MODELS.find(x => x.id === model);
  const totalIn = (session?.messages || []).reduce((a, m) => a + (m.tokensIn || approxTokens(m.role === "user" ? m.content : "")), 0);
  const totalOut = (session?.messages || []).reduce((a, m) => a + (m.tokensOut || (m.role === "assistant" ? approxTokens(m.content) : 0)), 0);
  const avgLat = (() => {
    const arr = (session?.messages || []).filter(m => m.latencyMs);
    if (!arr.length) return null;
    return Math.round(arr.reduce((a, m) => a + m.latencyMs, 0) / arr.length);
  })();

  const Row = ({ k, v, mono }) => (
    <div style={{
      display: "flex", justifyContent: "space-between",
      padding: "8px 0", borderBottom: "1px dashed var(--line-2)",
      fontSize: 12,
    }}>
      <span style={{ color: "var(--ink-3)" }}>{k}</span>
      <span style={{ color: "var(--ink)", fontFamily: mono ? "var(--mono)" : "inherit", fontSize: mono ? 11 : 12 }}>{v}</span>
    </div>
  );

  return (
    <aside style={{
      width: 280, flexShrink: 0,
      borderLeft: "1px solid var(--line)",
      background: "var(--panel)",
      padding: "16px 18px",
      overflowY: "auto",
    }}>
      <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 0.8, color: "var(--ink-3)", fontFamily: "var(--mono)", marginBottom: 8 }}>
        Run details
      </div>
      <div style={{ marginBottom: 18 }}>
        <Row k="Model" v={m?.name} />
        <Row k="Endpoint" v="/v1/generate" mono />
        <Row k="Avg latency" v={avgLat ? `${avgLat} ms` : "—"} mono />
        <Row k="Tokens in" v={totalIn} mono />
        <Row k="Tokens out" v={totalOut} mono />
        <Row k="Messages" v={session?.messages?.length || 0} mono />
      </div>

      <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 0.8, color: "var(--ink-3)", fontFamily: "var(--mono)", marginBottom: 8 }}>
        Parameters
      </div>
      <ParamSlider label="Temperature" min={0} max={1} step={0.1} defaultValue={0.7} />
      <ParamSlider label="Max tokens" min={64} max={2048} step={64} defaultValue={1024} mono />
      <ParamSlider label="Top P" min={0} max={1} step={0.05} defaultValue={0.9} />

      <div style={{ marginTop: 24, padding: 12, background: "var(--bg)", borderRadius: 10, border: "1px solid var(--line)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
          <span style={{ width: 6, height: 6, borderRadius: 99, background: "var(--ok)" }} />
          <span style={{ fontSize: 12, fontWeight: 600 }}>Backend healthy</span>
        </div>
        <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink-3)", lineHeight: 1.6 }}>
          api.studio.local:8000<br />
          uptime 4d 17h<br />
          queue: 0 jobs
        </div>
      </div>
    </aside>
  );
}

function ParamSlider({ label, min, max, step, defaultValue, mono }) {
  const [v, setV] = useState(defaultValue);
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 6 }}>
        <span style={{ color: "var(--ink-2)" }}>{label}</span>
        <span style={{ fontFamily: "var(--mono)", color: "var(--ink)", fontSize: 11 }}>{v}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={v} onChange={e => setV(parseFloat(e.target.value))}
        style={{ width: "100%", accentColor: "var(--accent)" }} />
    </div>
  );
}

// ---------- main app ----------
function App() {
  const [tweaks, setTweak] = useTweaks(window.__TWEAK_DEFAULTS);
  const [sessions, setSessions] = useState(SEED_SESSIONS);
  const [activeId, setActiveId] = useState(SEED_SESSIONS[0].id);
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState("");
  const [model, setModel] = useState("fast");
  const [modelOpen, setModelOpen] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const [progress, setProgress] = useState(0);
  const stopRef = useRef(false);
  const scrollRef = useRef();

  const session = sessions.find(s => s.id === activeId);

  // accent live
  useEffect(() => {
    document.documentElement.style.setProperty("--accent", tweaks.accent);
    // derive soft accent
    document.documentElement.style.setProperty("--accent-soft",
      `color-mix(in oklab, ${tweaks.accent} 14%, white)`);
  }, [tweaks.accent]);

  // autoscroll
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [session?.messages, streaming]);

  // keyboard
  useEffect(() => {
    const h = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "n") {
        e.preventDefault();
        newSession();
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  });

  function newSession() {
    const id = uid();
    const s = { id, title: "New session", updatedAt: Date.now(), messages: [] };
    setSessions(prev => [s, ...prev]);
    setActiveId(id);
    setDraft("");
  }

  function deleteSession(id) {
    setSessions(prev => prev.filter(s => s.id !== id));
    if (activeId === id) {
      const remaining = sessions.filter(s => s.id !== id);
      setActiveId(remaining[0]?.id || null);
    }
  }

  function patchSession(id, fn) {
    setSessions(prev => prev.map(s => s.id === id ? fn(s) : s));
  }

  async function send(text) {
    if (!text.trim() || !session) return;
    const userMsg = { id: uid(), role: "user", content: text.trim(), ts: Date.now() };
    const assistantId = uid();
    const assistantMsg = { id: assistantId, role: "assistant", content: "", ts: Date.now(), streaming: true };
    const startedAt = Date.now();

    patchSession(session.id, s => ({
      ...s,
      title: s.messages.length === 0 ? text.trim().slice(0, 48) : s.title,
      updatedAt: Date.now(),
      messages: [...s.messages, userMsg, assistantMsg],
    }));
    setDraft("");
    setStreaming(true);
    setProgress(8);
    stopRef.current = false;

    // animated progress while waiting
    const progTimer = setInterval(() => {
      setProgress(p => Math.min(85, p + Math.random() * 8));
    }, 220);

    let full = "";
    try {
      const result = await window.claude.complete({
        messages: [
          { role: "user", content: text.trim() },
        ],
      });
      full = result || "(no response)";
    } catch (err) {
      full = "Sorry — the model couldn't reach the backend in this demo. (" + (err?.message || err) + ")";
    }
    clearInterval(progTimer);
    setProgress(95);

    // simulate streaming the response in
    const words = full.split(/(\s+)/);
    let acc = "";
    for (let i = 0; i < words.length; i++) {
      if (stopRef.current) break;
      acc += words[i];
      patchSession(session.id, s => ({
        ...s,
        messages: s.messages.map(m => m.id === assistantId ? { ...m, content: acc } : m),
      }));
      await new Promise(r => setTimeout(r, 14 + Math.random() * 30));
    }

    const elapsed = Date.now() - startedAt;
    patchSession(session.id, s => ({
      ...s,
      updatedAt: Date.now(),
      messages: s.messages.map(m => m.id === assistantId ? {
        ...m, streaming: false,
        latencyMs: elapsed,
        tokensIn: approxTokens(text),
        tokensOut: approxTokens(acc),
      } : m),
    }));
    setProgress(100);
    setTimeout(() => setProgress(0), 250);
    setStreaming(false);
  }

  function stop() {
    stopRef.current = true;
    setStreaming(false);
  }

  function regen(msg) {
    if (!session) return;
    // find prior user message
    const idx = session.messages.findIndex(m => m.id === msg.id);
    const prior = [...session.messages].slice(0, idx).reverse().find(m => m.role === "user");
    if (!prior) return;
    // remove this assistant message and resend
    patchSession(session.id, s => ({
      ...s, messages: s.messages.filter(m => m.id !== msg.id),
    }));
    setTimeout(() => send(prior.content), 0);
  }

  function copy(msg) {
    navigator.clipboard?.writeText(msg.content || "");
  }

  const showInspector = tweaks.layout === "split";

  return (
    <div style={{ display: "flex", height: "100%" }}>
      {tweaks.showSidebar && (
        <Sidebar
          sessions={sessions}
          activeId={activeId}
          onSelect={setActiveId}
          onNew={newSession}
          onDelete={deleteSession}
          query={query} setQuery={setQuery}
        />
      )}

      <main style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <Header
          session={session} model={model} setModel={setModel}
          modelOpen={modelOpen} setModelOpen={setModelOpen}
          status={streaming ? "streaming" : "ready"}
        />
        {progress > 0 && <ProgressBar progress={progress} />}

        <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column" }}>
          {!session || session.messages.length === 0 ? (
            <EmptyState onSuggest={(s) => { setDraft(s); }} />
          ) : (
            <div style={{ padding: "12px 0" }}>
              {session.messages.map(m => (
                <Message key={m.id} msg={m}
                  onCopy={copy} onRegen={regen}
                  showTokens={tweaks.showTokens} />
              ))}
            </div>
          )}
        </div>

        <Composer
          value={draft} setValue={setDraft}
          onSend={() => send(draft)} onStop={stop}
          streaming={streaming}
          density={tweaks.density}
        />
      </main>

      {showInspector && <Inspector session={session} model={model} />}

      <TweaksPanel title="Tweaks">
        <TweakSection title="Theme">
          <TweakColor label="Accent"
            value={tweaks.accent}
            onChange={(v) => setTweak("accent", v)}
            options={["#5b6ee8", "#1f8a5b", "#d97757", "#1a1a1a"]} />
        </TweakSection>
        <TweakSection title="Layout">
          <TweakRadio label="View"
            value={tweaks.layout}
            onChange={(v) => setTweak("layout", v)}
            options={[
              { value: "split", label: "With inspector" },
              { value: "focused", label: "Focused" },
            ]} />
          <TweakToggle label="Sidebar"
            value={tweaks.showSidebar}
            onChange={(v) => setTweak("showSidebar", v)} />
          <TweakRadio label="Density"
            value={tweaks.density}
            onChange={(v) => setTweak("density", v)}
            options={[
              { value: "compact", label: "Compact" },
              { value: "comfortable", label: "Comfy" },
            ]} />
        </TweakSection>
        <TweakSection title="Details">
          <TweakToggle label="Show token counts"
            value={tweaks.showTokens}
            onChange={(v) => setTweak("showTokens", v)} />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
