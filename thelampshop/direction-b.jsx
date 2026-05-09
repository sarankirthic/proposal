/* global React, NavBar, LampShape, Stripes, Note, Ruler */

// ────────────────── DIRECTION B — Specimen Index ──────────────────
// Catalog-as-archive. Shape silhouettes, ruler annotations, technical
// drawings. The shape & size finder IS the hero.

const B_Home = () => (
  <div style={{height:'100%', background:'var(--paper)', overflow:'hidden', position:'relative'}}>
    <NavBar variant="specimen" />

    {/* Hero: full-width "spec sheet" with finder front and center */}
    <div style={{display:'grid', gridTemplateColumns:'1fr 360px', borderBottom:'1.5px solid var(--ink)'}}>
      {/* Left — drawing board */}
      <div style={{padding:'40px 32px 32px', borderRight:'1.5px solid var(--ink)', position:'relative'}}>
        <div className="row" style={{justifyContent:'space-between', alignItems:'baseline'}}>
          <div className="serif" style={{fontSize:64, lineHeight:1.0, letterSpacing:'-0.025em', maxWidth:600}}>
            A specimen<br/>book of shades.
          </div>
          <div className="mono" style={{fontSize:10, letterSpacing:'0.18em', color:'var(--ink-soft)'}}>FIG. 01 / SPECIMEN INDEX</div>
        </div>
        <div style={{maxWidth:480, marginTop:16, fontFamily:'Inter, sans-serif', fontSize:13, lineHeight:1.6, color:'var(--ink-soft)'}}>
          142 shades, drawn to scale, organized by shape and fitting. Find what fits your lamp before you fall in love with it.
        </div>

        {/* Big drawn lamp with measurements */}
        <div style={{marginTop:28, display:'grid', gridTemplateColumns:'auto 1fr', gap:32, alignItems:'end'}}>
          <div style={{position:'relative'}}>
            <LampShape kind="drum" size={260} stroke={1.5} />
            {/* dimension lines */}
            <div style={{position:'absolute', top:60, right:-44, fontFamily:'IBM Plex Mono, monospace', fontSize:10, color:'var(--coral)'}}>↕ 10″</div>
            <div style={{position:'absolute', bottom:-22, left:50, fontFamily:'IBM Plex Mono, monospace', fontSize:10, color:'var(--coral)'}}>↔ 14″ bottom</div>
            <div style={{position:'absolute', top:48, left:60, fontFamily:'IBM Plex Mono, monospace', fontSize:10, color:'var(--coral)'}}>↔ 14″ top</div>
          </div>
          <div className="col gap-sm">
            <div className="tag">SPECIMEN 014 / DRUM, LINEN</div>
            <div className="serif" style={{fontSize:24, fontStyle:'italic'}}>"the most universal shape we sell"</div>
            <div className="row gap-sm">
              <span className="btn btn-coral">View specimen 014</span>
              <span className="btn">Compare 5 sizes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right — Find-a-fit finder */}
      <div className="fill-paper2 sketchy" style={{padding:'24px 22px', position:'relative'}}>
        <div className="tag" style={{marginBottom:6}}>FIND A FIT — 30 SEC</div>
        <div className="serif" style={{fontSize:24, letterSpacing:'-0.01em', lineHeight:1.1}}>What's on your lamp now?</div>

        <div style={{marginTop:16}} className="col gap-sm">
          <div>
            <div className="mono" style={{fontSize:9, letterSpacing:'0.14em', color:'var(--ink-soft)', marginBottom:4}}>STEP 1 · SHAPE</div>
            <div className="row gap-xs">
              {['drum','empire','bell','coolie'].map((k,i)=>(
                <div key={k} className={`box sketchy center ${i===0?'box-coral fill-coral-soft':''}`} style={{width:62, height:62}}>
                  <LampShape kind={k} size={48} />
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="mono" style={{fontSize:9, letterSpacing:'0.14em', color:'var(--ink-soft)', marginBottom:4}}>STEP 2 · TOP × BOTTOM × HEIGHT</div>
            <div className="row gap-xs">
              <div className="field" style={{flex:1}}>10″</div>
              <div className="field" style={{flex:1}}>14″</div>
              <div className="field" style={{flex:1}}>10″</div>
            </div>
          </div>
          <div>
            <div className="mono" style={{fontSize:9, letterSpacing:'0.14em', color:'var(--ink-soft)', marginBottom:4}}>STEP 3 · FITTING</div>
            <div className="row gap-xs">
              <div className="box sketchy center" style={{flex:1, height:44}}>
                <div className="mono" style={{fontSize:10}}>SPIDER</div>
              </div>
              <div className="box sketchy center box-coral fill-coral-soft" style={{flex:1, height:44}}>
                <div className="mono" style={{fontSize:10}}>UNO</div>
              </div>
              <div className="box sketchy center" style={{flex:1, height:44}}>
                <div className="mono" style={{fontSize:10}}>CLIP</div>
              </div>
            </div>
          </div>
          <div className="btn btn-ink center" style={{justifyContent:'center', marginTop:8, padding:'14px 0'}}>Show 18 matching shades →</div>
          <div className="hand" style={{fontSize:16, color:'var(--coral)', textAlign:'center', marginTop:4}}>or send a photo, we'll measure for you</div>
        </div>
      </div>
    </div>

    {/* Specimen strip */}
    <div style={{padding:'22px 32px'}}>
      <div className="row" style={{justifyContent:'space-between', alignItems:'baseline'}}>
        <div className="serif" style={{fontSize:22, fontStyle:'italic'}}>By shape, drawn to scale</div>
        <div className="mono" style={{fontSize:10, letterSpacing:'0.16em', color:'var(--ink-soft)'}}>8 SHAPES · ALL FITTINGS</div>
      </div>
      <div className="row gap-md" style={{marginTop:18}}>
        {['drum','empire','bell','coolie','square','oval','pendant','table'].map((k,i)=>(
          <div key={k} className="col gap-xs" style={{flex:1, alignItems:'center', padding:14, border:'1.5px dashed var(--ink)'}}>
            <LampShape kind={k} size={64} />
            <div className="mono" style={{fontSize:9, letterSpacing:'0.12em'}}>0{i+1}</div>
            <div style={{fontFamily:'Inter, sans-serif', fontSize:11, fontWeight:500, textTransform:'capitalize'}}>{k}</div>
            <div className="mono" style={{fontSize:9, color:'var(--ink-soft)'}}>{[18,12,9,14,7,6,11,10][i]} shades</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const B_Listing = () => (
  <div style={{height:'100%', background:'var(--paper)', overflow:'hidden'}}>
    <NavBar variant="specimen" />

    {/* sub-header — index style */}
    <div style={{padding:'18px 28px', borderBottom:'1.5px solid var(--ink)'}} className="sketchy">
      <div className="row" style={{alignItems:'baseline', justifyContent:'space-between'}}>
        <div>
          <div className="tag">02 / FIND A FIT — RESULTS</div>
          <div className="serif" style={{fontSize:36, letterSpacing:'-0.02em', marginTop:4}}>18 shades fit a 14″ drum, uno fitter.</div>
        </div>
        <div className="row gap-sm" style={{alignItems:'center'}}>
          <span className="hand" style={{fontSize:18, color:'var(--coral)'}}>edit my measurements ↗</span>
        </div>
      </div>
    </div>

    {/* Two-pane: filter rail + index table */}
    <div style={{display:'grid', gridTemplateColumns:'220px 1fr', height:'calc(100% - 152px)'}}>
      {/* Filter rail */}
      <div style={{borderRight:'1.5px solid var(--ink)', padding:'18px 18px'}} className="sketchy">
        <div className="mono" style={{fontSize:9, letterSpacing:'0.16em', color:'var(--ink-soft)'}}>YOUR FIT</div>
        <div className="col gap-xs" style={{marginTop:8, marginBottom:18}}>
          <div className="row" style={{justifyContent:'space-between', fontFamily:'Inter, sans-serif', fontSize:12}}><span>Shape</span><span>Drum ✕</span></div>
          <div className="row" style={{justifyContent:'space-between', fontFamily:'Inter, sans-serif', fontSize:12}}><span>Bottom Ø</span><span>14″ ✕</span></div>
          <div className="row" style={{justifyContent:'space-between', fontFamily:'Inter, sans-serif', fontSize:12}}><span>Fitter</span><span>Uno ✕</span></div>
        </div>

        {['Material','Color','Lining','Price','Made-to-order'].map((g,i)=>(
          <div key={g} style={{marginBottom:14}}>
            <div className="mono" style={{fontSize:9, letterSpacing:'0.16em', color:'var(--ink-soft)', marginBottom:6}}>{g.toUpperCase()}</div>
            <div className="col gap-xs" style={{fontFamily:'Inter, sans-serif', fontSize:12}}>
              {(g==='Material'?['Linen','Silk','Parchment','Cotton']:g==='Color'?['Ivory','Oat','Black','Stripe']:g==='Lining'?['Silk','None','White']:g==='Price'?['Under $200','$200–$400','$400+']:['Yes','No']).map((o,j)=>(
                <div key={o} className="row gap-xs"><span className="box" style={{width:12, height:12, display:'inline-block', borderColor:'var(--ink)', background: i===0&&j<2?'var(--coral)':'transparent'}}></span>{o}</div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Index table */}
      <div style={{padding:'18px 24px', overflow:'hidden'}}>
        <div className="row" style={{justifyContent:'space-between', alignItems:'center', marginBottom:10}}>
          <div className="row gap-sm">
            <span className="tag-pill" style={{borderColor:'var(--coral)', color:'var(--coral)'}}>View · Index</span>
            <span className="tag-pill">View · Grid</span>
          </div>
          <div className="mono" style={{fontSize:10, color:'var(--ink-soft)'}}>SORT · TOP-DIAMETER ↑</div>
        </div>

        <div style={{display:'grid', gridTemplateColumns:'40px 60px 1.4fr 0.8fr 0.6fr 0.7fr 0.6fr 0.4fr', alignItems:'center', borderBottom:'1.5px solid var(--ink)', paddingBottom:6, fontFamily:'IBM Plex Mono, monospace', fontSize:9, letterSpacing:'0.14em', color:'var(--ink-soft)', textTransform:'uppercase'}}>
          <span>№</span><span>FIG</span><span>NAME</span><span>MATERIAL</span><span>T×B×H</span><span>FITTING</span><span>PRICE</span><span></span>
        </div>

        {[
          ['014','drum','Pleated Linen Drum','Belgian linen, silk-lined','14×14×10','Uno','$340'],
          ['017','drum','Cotton Drum, ivory','Cotton, white-lined','14×14×9','Uno','$185'],
          ['021','drum','Parchment Drum','Parchment, unlined','14×14×11','Uno','$240'],
          ['028','drum','Striped Linen Drum','Linen, hand-stripe','14×14×10','Uno','$295'],
          ['031','drum','Silk Drum, oat','Dupioni silk','14×14×10','Uno','$420'],
          ['037','drum','Black Linen Drum','Linen, gold-lined','14×14×11','Uno','$365'],
        ].map((r,i)=>(
          <div key={i} style={{display:'grid', gridTemplateColumns:'40px 60px 1.4fr 0.8fr 0.6fr 0.7fr 0.6fr 0.4fr', alignItems:'center', padding:'10px 0', borderBottom:'1px dashed var(--ink)', fontFamily:'Inter, sans-serif', fontSize:12}}>
            <span className="mono" style={{fontSize:11, color:'var(--ink-soft)'}}>{r[0]}</span>
            <LampShape kind={r[1]} size={36} stroke={1.2}/>
            <span className="serif" style={{fontSize:16}}>{r[2]}</span>
            <span style={{color:'var(--ink-soft)'}}>{r[3]}</span>
            <span className="mono" style={{fontSize:11}}>{r[4]}″</span>
            <span className="mono" style={{fontSize:11}}>{r[5]}</span>
            <span className="mono" style={{fontSize:11}}>{r[6]}</span>
            <span className="btn btn-sm" style={{justifySelf:'end'}}>View →</span>
          </div>
        ))}

        <div className="row" style={{justifyContent:'space-between', marginTop:14, fontFamily:'IBM Plex Mono, monospace', fontSize:10, color:'var(--ink-soft)'}}>
          <span>← prev 6</span><span>showing 1–6 of 18</span><span>next 6 →</span>
        </div>
      </div>
    </div>
  </div>
);

const B_Detail = () => (
  <div style={{height:'100%', background:'var(--paper)', overflow:'hidden'}}>
    <NavBar variant="specimen" />

    <div style={{padding:'12px 28px', borderBottom:'1.5px dashed var(--ink)'}}>
      <div className="mono" style={{fontSize:10, letterSpacing:'0.14em', color:'var(--ink-soft)'}}>SPECIMEN 014 · DRUM · LINEN · UNO</div>
    </div>

    <div style={{display:'grid', gridTemplateColumns:'1.05fr 1fr', height:'calc(100% - 100px)'}}>
      {/* Left — technical drawings */}
      <div style={{borderRight:'1.5px solid var(--ink)', padding:'24px 28px', display:'grid', gridTemplateRows:'1fr auto', gap:18}}>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:18}}>
          <div className="box-thin sketchy" style={{padding:14, position:'relative', display:'flex', flexDirection:'column'}}>
            <div className="mono" style={{fontSize:9, letterSpacing:'0.14em', color:'var(--ink-soft)'}}>FIG. A — FRONT ELEVATION</div>
            <div className="center" style={{flex:1}}>
              <LampShape kind="drum" size={180} />
            </div>
            <div className="row" style={{justifyContent:'space-between'}}>
              <span className="mono" style={{fontSize:9, color:'var(--coral)'}}>↔ 14″</span>
              <span className="mono" style={{fontSize:9, color:'var(--coral)'}}>↕ 10″</span>
            </div>
          </div>
          <div className="box-thin sketchy" style={{padding:14, position:'relative', display:'flex', flexDirection:'column'}}>
            <div className="mono" style={{fontSize:9, letterSpacing:'0.14em', color:'var(--ink-soft)'}}>FIG. B — TOP, FITTING</div>
            <div className="center" style={{flex:1, position:'relative'}}>
              <svg width="180" height="180" viewBox="0 0 180 180" className="sketchy">
                <circle cx="90" cy="90" r="70" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <line x1="90" y1="20" x2="90" y2="160" stroke="currentColor" strokeWidth="1"/>
                <line x1="20" y1="90" x2="160" y2="90" stroke="currentColor" strokeWidth="1"/>
                <circle cx="90" cy="90" r="6" stroke="var(--coral)" strokeWidth="1.5" fill="var(--coral)" opacity="0.4"/>
                <circle cx="90" cy="90" r="14" stroke="var(--coral)" strokeWidth="1.5" fill="none"/>
              </svg>
            </div>
            <div className="mono" style={{fontSize:9, color:'var(--coral)', textAlign:'center'}}>uno fitter · ⌀ 1.625″</div>
          </div>
        </div>
        <div className="box-thin sketchy" style={{padding:14}}>
          <div className="row" style={{justifyContent:'space-between'}}>
            <span className="mono" style={{fontSize:9, letterSpacing:'0.14em', color:'var(--ink-soft)'}}>FIG. C — MATERIAL SWATCHES</span>
            <span className="hand" style={{fontSize:14, color:'var(--coral)'}}>request samples — free</span>
          </div>
          <div className="row gap-sm" style={{marginTop:10}}>
            {['Ivory','Oat','Cream','Black','Stripe','Sage'].map((c,i)=>(
              <div key={c} className="col gap-xs" style={{alignItems:'center'}}>
                <div className={`stripes sketchy ${i===0?'stripes-coral':''} ${i===3?'stripes-dark':''}`} style={{width:54, height:54}}/>
                <div className="mono" style={{fontSize:9}}>{c}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right — order panel */}
      <div style={{padding:'24px 28px', display:'flex', flexDirection:'column', gap:14}}>
        <div className="serif" style={{fontSize:42, lineHeight:1.0, letterSpacing:'-0.02em'}}>Pleated Linen Drum<span style={{fontStyle:'italic', color:'var(--coral)'}}>.</span></div>
        <div className="row" style={{justifyContent:'space-between', alignItems:'baseline'}}>
          <span className="serif" style={{fontSize:24}}>$340.00</span>
          <span className="mono" style={{fontSize:10, color:'var(--ink-soft)'}}>SPECIMEN № 014</span>
        </div>

        <div className="rule"></div>

        {/* size matrix */}
        <div>
          <div className="mono" style={{fontSize:9, letterSpacing:'0.14em', color:'var(--ink-soft)', marginBottom:6}}>SIZE — TOP × BOTTOM × HEIGHT (INCHES)</div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(5, 1fr)', gap:6}}>
            {['10×10×8','12×12×9','14×14×10','16×16×11','18×18×12'].map((s,i)=>(
              <div key={s} className={`box sketchy center ${i===2?'fill-coral box-coral':''}`} style={{padding:'10px 4px', flexDirection:'column'}}>
                <div className="mono" style={{fontSize:11}}>{s}</div>
                <div className="mono" style={{fontSize:8, opacity:0.8, marginTop:2}}>${[260,300,340,380,420][i]}</div>
              </div>
            ))}
          </div>
        </div>

        {/* material */}
        <div>
          <div className="mono" style={{fontSize:9, letterSpacing:'0.14em', color:'var(--ink-soft)', marginBottom:6}}>MATERIAL — IVORY</div>
          <div className="row gap-xs">
            {['Ivory','Oat','Cream','Black','Stripe','Sage'].map((c,i)=>(
              <div key={c} className={`box sketchy ${i===0?'box-coral':''}`} style={{width:30, height:30, padding:0}}>
                <div className={`stripes ${i===3?'stripes-dark':''}`} style={{width:'100%', height:'100%', border:'none'}}/>
              </div>
            ))}
          </div>
        </div>

        <div className="rule-dashed"></div>

        {/* spec list */}
        <div className="col gap-xs" style={{fontFamily:'IBM Plex Mono, monospace', fontSize:11}}>
          {[
            ['SHAPE','DRUM'],
            ['MATERIAL','BELGIAN LINEN, SILK-LINED'],
            ['FITTING','UNO · ⌀ 1.625″'],
            ['MAKER','MARIAN H. — HUDSON, NY'],
            ['LEAD TIME','SHIPS IN 5 DAYS'],
            ['CARE','SPOT-CLEAN, COOL IRON'],
          ].map(([k,v])=>(
            <div key={k} className="row" style={{justifyContent:'space-between', borderBottom:'1px dashed var(--ink)', paddingBottom:4}}>
              <span style={{color:'var(--ink-soft)'}}>{k}</span><span>{v}</span>
            </div>
          ))}
        </div>

        <div className="row gap-sm" style={{marginTop:'auto'}}>
          <span className="btn btn-ink" style={{flex:1, justifyContent:'center', padding:'14px 0'}}>Add to Bag</span>
          <span className="btn">Compare</span>
        </div>
      </div>
    </div>
  </div>
);

window.B_Home = B_Home;
window.B_Listing = B_Listing;
window.B_Detail = B_Detail;
