/* global React */

// ─────────────── primitives ───────────────

// lamp shape silhouettes — pure outlines, hand-drawn-feel via SVG filter
const LampShape = ({ kind = 'drum', size = 80, stroke = 1.5, color = 'currentColor', fill='none' }) => {
  const w = size, h = size;
  const paths = {
    drum: <>
      <path d={`M ${w*0.2} ${h*0.25} L ${w*0.8} ${h*0.25} L ${w*0.82} ${h*0.85} L ${w*0.18} ${h*0.85} Z`} />
      <line x1={w*0.32} y1={h*0.18} x2={w*0.68} y2={h*0.18} />
      <line x1={w*0.5}  y1={h*0.12} x2={w*0.5}  y2={h*0.18} />
    </>,
    empire: <>
      <path d={`M ${w*0.3} ${h*0.25} L ${w*0.7} ${h*0.25} L ${w*0.85} ${h*0.85} L ${w*0.15} ${h*0.85} Z`} />
      <line x1={w*0.38} y1={h*0.18} x2={w*0.62} y2={h*0.18} />
      <line x1={w*0.5}  y1={h*0.12} x2={w*0.5}  y2={h*0.18} />
    </>,
    bell: <>
      <path d={`M ${w*0.3} ${h*0.22} Q ${w*0.5} ${h*0.18}, ${w*0.7} ${h*0.22} L ${w*0.86} ${h*0.85} Q ${w*0.5} ${h*0.95}, ${w*0.14} ${h*0.85} Z`} />
      <line x1={w*0.5} y1={h*0.12} x2={w*0.5} y2={h*0.18} />
    </>,
    coolie: <>
      <path d={`M ${w*0.38} ${h*0.3} L ${w*0.62} ${h*0.3} L ${w*0.92} ${h*0.85} L ${w*0.08} ${h*0.85} Z`} />
      <line x1={w*0.42} y1={h*0.22} x2={w*0.58} y2={h*0.22} />
      <line x1={w*0.5}  y1={h*0.14} x2={w*0.5}  y2={h*0.22} />
    </>,
    pendant: <>
      <path d={`M ${w*0.5} ${h*0.05} L ${w*0.5} ${h*0.32}`} />
      <ellipse cx={w*0.5} cy={h*0.6} rx={w*0.34} ry={h*0.28} />
    </>,
    square: <>
      <path d={`M ${w*0.25} ${h*0.25} L ${w*0.75} ${h*0.25} L ${w*0.82} ${h*0.85} L ${w*0.18} ${h*0.85} Z`} />
      <line x1={w*0.36} y1={h*0.18} x2={w*0.64} y2={h*0.18} />
      <line x1={w*0.5}  y1={h*0.12} x2={w*0.5}  y2={h*0.18} />
    </>,
    oval: <>
      <ellipse cx={w*0.5} cy={h*0.55} rx={w*0.34} ry={h*0.32} />
      <line x1={w*0.5} y1={h*0.18} x2={w*0.5} y2={h*0.23} />
    </>,
    table: <>
      <path d={`M ${w*0.28} ${h*0.18} L ${w*0.72} ${h*0.18} L ${w*0.78} ${h*0.5} L ${w*0.22} ${h*0.5} Z`} />
      <line x1={w*0.5} y1={h*0.5} x2={w*0.5} y2={h*0.78} />
      <line x1={w*0.36} y1={h*0.78} x2={w*0.64} y2={h*0.78} />
      <ellipse cx={w*0.5} cy={h*0.85} rx={w*0.22} ry={h*0.04} />
    </>,
  };
  return (
    <svg width={size} height={size} viewBox={`0 0 ${w} ${h}`} fill={fill} stroke={color} strokeWidth={stroke} className="sketchy">
      {paths[kind]}
    </svg>
  );
};

// striped placeholder labelled with monospace caption
const Stripes = ({ children, w='100%', h=200, coral=false, dark=false, label, sub, style={}, className='' }) => (
  <div className={`stripes sketchy ${coral?'stripes-coral':''} ${dark?'stripes-dark':''} ${className}`}
       style={{ width:w, height:h, ...style }}>
    <div style={{textAlign:'center', fontFamily:'IBM Plex Mono, monospace', fontSize:11, letterSpacing:'0.08em', textTransform:'uppercase', opacity:0.7}}>
      <div>{label || children || '[ image ]'}</div>
      {sub && <div style={{marginTop:6, opacity:0.6, fontSize:9}}>{sub}</div>}
    </div>
  </div>
);

// scribble annotation arrow + handwritten label
const Note = ({ children, dx=0, dy=0, dir='left', style={} }) => {
  // dir: 'left' means arrow points left, label sits to the right
  const arrow = {
    left:  <svg width="40" height="20" viewBox="0 0 40 20"><path className="sketchy" d="M2 10 Q 14 4, 28 10" stroke="currentColor" fill="none" strokeWidth="1.2"/><path d="M2 10 l5 -3 M2 10 l5 3" stroke="currentColor" fill="none" strokeWidth="1.2"/></svg>,
    right: <svg width="40" height="20" viewBox="0 0 40 20"><path className="sketchy" d="M38 10 Q 26 4, 12 10" stroke="currentColor" fill="none" strokeWidth="1.2"/><path d="M38 10 l-5 -3 M38 10 l-5 3" stroke="currentColor" fill="none" strokeWidth="1.2"/></svg>,
    down:  <svg width="20" height="40" viewBox="0 0 20 40"><path className="sketchy" d="M10 38 Q 4 26, 10 12" stroke="currentColor" fill="none" strokeWidth="1.2"/><path d="M10 38 l-3 -5 M10 38 l3 -5" stroke="currentColor" fill="none" strokeWidth="1.2"/></svg>,
    up:    <svg width="20" height="40" viewBox="0 0 20 40"><path className="sketchy" d="M10 2 Q 16 14, 10 28" stroke="currentColor" fill="none" strokeWidth="1.2"/><path d="M10 2 l-3 5 M10 2 l3 5" stroke="currentColor" fill="none" strokeWidth="1.2"/></svg>,
  };
  return (
    <div className="flag" style={{ left:dx, top:dy, ...style, display:'flex', alignItems:'center', gap:4, flexDirection: dir==='down'||dir==='up' ? 'column':'row' }}>
      {dir==='left' && arrow.left}
      {dir==='up' && arrow.up}
      <span>{children}</span>
      {dir==='right' && arrow.right}
      {dir==='down' && arrow.down}
    </div>
  );
};

// ruler: a short tick line with mm marks for "specimen" feel
const Ruler = ({ length=120, vertical=false, label }) => {
  const ticks = [];
  const n = 10;
  for (let i=0; i<=n; i++){
    const big = i%5===0;
    const t = (i/n)*length;
    if (vertical){
      ticks.push(<line key={i} x1="0" y1={t} x2={big?10:6} y2={t} stroke="currentColor" strokeWidth="1"/>);
    } else {
      ticks.push(<line key={i} x1={t} y1="0" x2={t} y2={big?10:6} stroke="currentColor" strokeWidth="1"/>);
    }
  }
  return (
    <div style={{position:'relative', display:'flex', alignItems:'center'}}>
      <svg width={vertical?12:length} height={vertical?length:12} viewBox={`0 0 ${vertical?12:length} ${vertical?length:12}`} className="sketchy">
        {vertical
          ? <line x1="0" y1="0" x2="0" y2={length} stroke="currentColor" strokeWidth="1"/>
          : <line x1="0" y1="0" x2={length} y2="0" stroke="currentColor" strokeWidth="1"/>}
        {ticks}
      </svg>
      {label && <span className="mono" style={{fontSize:9, marginLeft:6, color:'var(--ink-soft)'}}>{label}</span>}
    </div>
  );
};

// Header / Nav row used by all wireframes
const NavBar = ({ variant='editorial' }) => {
  if (variant === 'editorial') {
    return (
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'18px 36px', borderBottom:'1.5px solid var(--ink)'}} className="sketchy">
        <div className="serif" style={{fontSize:22, letterSpacing:'-0.02em'}}>The Lampshade Shop<span style={{color:'var(--coral)'}}>.</span></div>
        <div className="row gap-lg" style={{fontFamily:'Inter, sans-serif', fontSize:12, letterSpacing:'0.06em', textTransform:'uppercase'}}>
          <span>Shop</span><span>Custom</span><span>Find a Fit</span><span>Journal</span>
        </div>
        <div className="row gap-md" style={{fontFamily:'Inter, sans-serif', fontSize:12}}>
          <span>Search</span><span>Account</span><span>Bag (0)</span>
        </div>
      </div>
    );
  }
  if (variant === 'specimen') {
    return (
      <div style={{display:'grid', gridTemplateColumns:'1fr auto 1fr', alignItems:'center', padding:'14px 28px', borderBottom:'1.5px solid var(--ink)'}} className="sketchy">
        <div className="row gap-lg" style={{fontFamily:'IBM Plex Mono, monospace', fontSize:11, letterSpacing:'0.1em', textTransform:'uppercase'}}>
          <span>01 / Shop</span><span>02 / Find a Fit</span><span>03 / Custom</span>
        </div>
        <div className="serif" style={{fontSize:18, letterSpacing:'-0.01em'}}>LAMPSHADE · SHOP</div>
        <div className="row gap-md" style={{justifyContent:'flex-end', fontFamily:'IBM Plex Mono, monospace', fontSize:11, letterSpacing:'0.08em', textTransform:'uppercase'}}>
          <span>⌕ Search</span><span>Account</span><span>Bag · 0</span>
        </div>
      </div>
    );
  }
  // builder-first
  return (
    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'18px 36px'}} className="sketchy">
      <div className="row gap-sm" style={{alignItems:'center'}}>
        <svg width="22" height="22" viewBox="0 0 22 22" className="sketchy"><circle cx="11" cy="11" r="9" stroke="currentColor" strokeWidth="1.5" fill="var(--coral)"/></svg>
        <div className="serif" style={{fontSize:20, letterSpacing:'-0.02em'}}>Lampshade.</div>
      </div>
      <div className="row gap-lg" style={{fontFamily:'Inter, sans-serif', fontSize:12, fontWeight:500}}>
        <span>Build Your Own</span><span>Shop Ready</span><span>Find a Fit</span><span>Trade</span>
      </div>
      <div className="row gap-sm">
        <span className="btn btn-sm">Save Build</span>
        <span className="btn btn-sm btn-coral">Bag · 0</span>
      </div>
    </div>
  );
};

// global SVG filter for sketchy wobble + Caveat handwriting font + serif
const SketchDefs = () => (
  <svg width="0" height="0" style={{position:'absolute'}} aria-hidden="true">
    <defs>
      <filter id="sketch-wobble" x="-2%" y="-2%" width="104%" height="104%">
        <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" seed="3" result="noise"/>
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.4"/>
      </filter>
    </defs>
  </svg>
);

Object.assign(window, { LampShape, Stripes, Note, Ruler, NavBar, SketchDefs });
