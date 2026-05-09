/* global React, NavBar, LampShape, Stripes, Note, Ruler */

// ────────────────── DIRECTION A — Editorial Atelier ──────────────────
// "Magazine cover" hero, single shade, oversized issue numerology,
// long-read PDP. Sparse like a fashion editorial.

const A_Home = () => (
  <div style={{height:'100%', background:'var(--paper)', overflow:'hidden', position:'relative'}}>
    <NavBar variant="editorial" />

    {/* Issue marker strip */}
    <div className="row sketchy" style={{justifyContent:'space-between', padding:'10px 36px', fontFamily:'IBM Plex Mono, monospace', fontSize:10, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--ink-soft)'}}>
      <span>Issue Nº 014 · Spring</span>
      <span>Featuring · The Pleated Linen Drum</span>
      <span>14 Shades In</span>
    </div>

    {/* Hero — magazine cover */}
    <div style={{display:'grid', gridTemplateColumns:'1.1fr 1fr', gap:40, padding:'40px 36px 60px'}}>
      {/* Left text column */}
      <div className="col" style={{justifyContent:'space-between'}}>
        <div className="tag">№ 014 — The Issue</div>
        <div>
          <div className="serif" style={{fontSize:96, lineHeight:0.95, letterSpacing:'-0.04em', color:'var(--ink)'}}>
            One shade.<br/>
            <span style={{fontStyle:'italic'}}>Six</span> rooms<br/>
            it could<br/>change.
          </div>
          <div style={{maxWidth:380, marginTop:24, fontFamily:'Inter, sans-serif', fontSize:14, lineHeight:1.55, color:'var(--ink-soft)'}}>
            We don't do catalogs. Each season we publish one shade, made fourteen ways, and walk you through where it belongs.
          </div>
          <div className="row gap-sm" style={{marginTop:28}}>
            <span className="btn btn-coral">Read Issue 014 →</span>
            <span className="btn">Shop the archive</span>
          </div>
        </div>
        <div style={{fontFamily:'Caveat, cursive', color:'var(--coral)', fontSize:18, marginTop:16}}>
          ↳ replacing one shade? <span className="scribble-underline">find your fit in 30 seconds</span>
        </div>
      </div>

      {/* Right hero card — single product shot */}
      <div style={{position:'relative'}}>
        <Stripes h={520} coral label="HERO PRODUCT SHOT" sub="14&quot; pleated linen drum on brass bobbin lamp" />
        <div style={{position:'absolute', top:-12, right:-12, transform:'rotate(8deg)'}}>
          <div className="fill-ink sketchy" style={{padding:'10px 14px', fontFamily:'IBM Plex Mono, monospace', fontSize:10, letterSpacing:'0.12em'}}>NEW · MADE IN HUDSON, NY</div>
        </div>
        <Note dx={-130} dy={120} dir="right">hand-pleated, 84 folds</Note>
        <Note dx={420} dy={300} dir="left">silk-lined; warm glow</Note>
        <div style={{position:'absolute', bottom:8, left:12, fontFamily:'IBM Plex Mono, monospace', fontSize:10, letterSpacing:'0.16em', color:'var(--ink-soft)'}}>FIG. A — DRUM, 14 × 14 × 10″</div>
      </div>
    </div>

    {/* below: index strip */}
    <div style={{padding:'24px 36px', borderTop:'1.5px solid var(--ink)', borderBottom:'1.5px solid var(--ink)'}} className="sketchy">
      <div className="row" style={{justifyContent:'space-between', alignItems:'center'}}>
        <div className="serif" style={{fontSize:20, fontStyle:'italic'}}>In this issue</div>
        <div className="tag">14 SHADES · 6 ROOMS · 1 FITTING GUIDE</div>
      </div>
      <div className="row gap-lg" style={{marginTop:20}}>
        {['drum','empire','bell','coolie','square','oval'].map((k,i)=>(
          <div key={k} className="col gap-xs" style={{flex:1, alignItems:'center'}}>
            <LampShape kind={k} size={70} />
            <div className="mono" style={{fontSize:9, letterSpacing:'0.12em', color:'var(--ink-soft)'}}>0{i+1} · {k.toUpperCase()}</div>
          </div>
        ))}
      </div>
    </div>

    {/* footer hint */}
    <div className="row" style={{justifyContent:'space-between', padding:'18px 36px', fontFamily:'IBM Plex Mono, monospace', fontSize:10, letterSpacing:'0.16em', color:'var(--ink-soft)'}}>
      <span>NEW SHADE EVERY SEASON · NEXT: SUMMER 25</span>
      <span>SHIPPING FROM HUDSON</span>
      <span>↓ KEEP READING</span>
    </div>
  </div>
);

const A_Listing = () => (
  <div style={{height:'100%', background:'var(--paper)', overflow:'hidden'}}>
    <NavBar variant="editorial" />

    {/* breadcrumb / title */}
    <div style={{padding:'24px 36px 12px'}}>
      <div className="tag">Shop / The Archive</div>
      <div className="row" style={{alignItems:'baseline', justifyContent:'space-between', marginTop:8}}>
        <div className="serif" style={{fontSize:56, letterSpacing:'-0.02em'}}>Every shade we've made.</div>
        <div className="hand" style={{fontSize:20, color:'var(--coral)'}}>↓ 142 of them, scroll slowly</div>
      </div>
    </div>

    {/* filter rail */}
    <div style={{padding:'12px 36px', borderTop:'1.5px solid var(--ink)', borderBottom:'1.5px dashed var(--ink)'}} className="sketchy">
      <div className="row gap-lg" style={{justifyContent:'space-between'}}>
        <div className="row gap-md">
          <span className="tag-pill">All shapes</span>
          <span className="tag-pill" style={{borderColor:'var(--coral)', color:'var(--coral)'}}>Drum ×</span>
          <span className="tag-pill">Linen</span>
          <span className="tag-pill">10–16″</span>
        </div>
        <div className="row gap-md" style={{fontFamily:'Inter, sans-serif', fontSize:12, color:'var(--ink-soft)'}}>
          <span>Sort: Newest ▾</span>
          <span>Grid ▦</span>
        </div>
      </div>
    </div>

    {/* editorial grid — irregular, gallery-style */}
    <div style={{padding:'28px 36px', display:'grid', gridTemplateColumns:'1.3fr 1fr 1fr', gridTemplateRows:'auto auto', gap:28}}>
      {/* feature row */}
      <div style={{position:'relative'}}>
        <Stripes h={340} coral label="THE PLEATED DRUM" sub="14×14×10″ · linen" />
        <div className="serif" style={{fontSize:22, marginTop:14, letterSpacing:'-0.01em'}}>Hand-pleated linen drum</div>
        <div className="row" style={{justifyContent:'space-between', marginTop:6, fontFamily:'Inter, sans-serif', fontSize:12, color:'var(--ink-soft)'}}>
          <span>$340 · 5 sizes</span><span className="tag">FEATURED</span>
        </div>
      </div>
      <div>
        <Stripes h={260} label="EMPIRE — LINEN" />
        <div className="serif" style={{fontSize:18, marginTop:12}}>Cottage empire</div>
        <div style={{fontFamily:'Inter, sans-serif', fontSize:12, color:'var(--ink-soft)'}}>$220 · 4 sizes</div>
      </div>
      <div>
        <Stripes h={260} label="BELL — SILK" />
        <div className="serif" style={{fontSize:18, marginTop:12}}>Belmont bell <span style={{fontStyle:'italic', color:'var(--coral)'}}>· silk</span></div>
        <div style={{fontFamily:'Inter, sans-serif', fontSize:12, color:'var(--ink-soft)'}}>$385 · 3 sizes</div>
      </div>

      <div>
        <Stripes h={220} label="COOLIE — PARCHMENT" />
        <div className="serif" style={{fontSize:18, marginTop:12}}>Wide coolie</div>
        <div style={{fontFamily:'Inter, sans-serif', fontSize:12, color:'var(--ink-soft)'}}>$175 · 6 sizes</div>
      </div>
      <div>
        <Stripes h={220} label="OVAL — LINEN" />
        <div className="serif" style={{fontSize:18, marginTop:12}}>Long oval</div>
        <div style={{fontFamily:'Inter, sans-serif', fontSize:12, color:'var(--ink-soft)'}}>$295 · 2 sizes</div>
      </div>
      <div className="fill-coral-soft sketchy" style={{padding:24, display:'flex', flexDirection:'column', justifyContent:'space-between', height:220}}>
        <div className="serif" style={{fontSize:24, lineHeight:1.1, letterSpacing:'-0.01em'}}>Don't see yours?</div>
        <div>
          <div style={{fontFamily:'Inter, sans-serif', fontSize:12, color:'var(--ink-soft)', marginBottom:12}}>We make to order in 4 weeks.</div>
          <span className="btn btn-coral">Start a custom →</span>
        </div>
      </div>
    </div>
  </div>
);

const A_Detail = () => (
  <div style={{height:'100%', background:'var(--paper)', overflow:'hidden'}}>
    <NavBar variant="editorial" />

    <div style={{padding:'14px 36px'}}>
      <div className="tag">Shop / Drum / Pleated Linen Drum 14″</div>
    </div>

    <div style={{display:'grid', gridTemplateColumns:'1.3fr 1fr', gap:40, padding:'4px 36px 28px', height:'calc(100% - 110px)'}}>
      {/* left — long-read image stack */}
      <div className="col gap-md" style={{position:'relative'}}>
        <Stripes h={420} coral label="HERO — ON LAMP" sub="14&quot; pleated linen drum, on brass bobbin" />
        <div className="row gap-sm">
          <Stripes h={110} w={110} label="ALT" />
          <Stripes h={110} w={110} label="DETAIL" />
          <Stripes h={110} w={110} label="LINING" />
          <Stripes h={110} w={110} label="IN ROOM" />
        </div>
        <Note dx={420} dy={180} dir="left">hand-pleated, 84 folds</Note>
      </div>

      {/* right — long-read column */}
      <div className="col gap-md" style={{position:'relative'}}>
        <div className="tag">DRUM · LINEN · IVORY</div>
        <div className="serif" style={{fontSize:42, lineHeight:1.0, letterSpacing:'-0.02em'}}>The Pleated <span style={{fontStyle:'italic'}}>Linen</span> Drum.</div>
        <div className="serif" style={{fontSize:22, color:'var(--ink-soft)', fontStyle:'italic'}}>$340.00</div>

        <div className="rule"></div>

        <div style={{fontFamily:'Inter, sans-serif', fontSize:13, lineHeight:1.65, color:'var(--ink-soft)'}}>
          Eighty-four folds, one continuous yard of Belgian linen, and a silk lining that turns
          a sixty-watt bulb into something honest and warm. Made by Marian in Hudson, NY.
        </div>

        <div>
          <div className="tag" style={{marginBottom:8}}>SIZE — TOP × BOTTOM × HEIGHT</div>
          <div className="row gap-sm">
            {['10×10×8','12×12×9','14×14×10','16×16×11','18×18×12'].map((s,i)=>(
              <div key={s} className={`box sketchy ${i===2?'box-coral fill-coral-soft':''}`} style={{padding:'10px 12px', fontFamily:'IBM Plex Mono, monospace', fontSize:11}}>{s}″</div>
            ))}
          </div>
        </div>

        <div>
          <div className="tag" style={{marginBottom:8}}>FITTING</div>
          <div className="row gap-sm">
            <span className="tag-pill" style={{borderColor:'var(--coral)', color:'var(--coral)'}}>Spider · standard</span>
            <span className="tag-pill">Uno fitter</span>
            <span className="tag-pill">Clip-on</span>
            <span className="hand" style={{fontSize:16, color:'var(--coral)'}}>not sure? → Find a Fit</span>
          </div>
        </div>

        <div className="row gap-sm" style={{marginTop:8}}>
          <span className="btn btn-coral" style={{flex:1, justifyContent:'center', padding:'14px 0'}}>Add to Bag — $340</span>
          <span className="btn">♡</span>
        </div>

        <div className="rule-dashed"></div>

        <div className="row gap-md" style={{fontFamily:'Inter, sans-serif', fontSize:11, color:'var(--ink-soft)'}}>
          <span>Ships in 5 days</span>·<span>Free returns</span>·<span>Made in NY</span>
        </div>
      </div>
    </div>
  </div>
);

window.A_Home = A_Home;
window.A_Listing = A_Listing;
window.A_Detail = A_Detail;
