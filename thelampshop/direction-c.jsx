/* global React, NavBar, LampShape, Stripes, Note */

// ────────────────── DIRECTION C — Made for You ──────────────────
// Configurator-first. Landing dives straight into a build. Listing
// splits "Ready" vs "Made-to-order". Detail pages have a live preview
// with a builder docked at the bottom.

const C_Home = () => (
  <div style={{height:'100%', background:'var(--paper)', overflow:'hidden', position:'relative'}}>
    <NavBar variant="builder" />

    <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:0, height:'calc(100% - 60px)', borderTop:'1.5px solid var(--ink)'}}>
      {/* Left — preview canvas */}
      <div className="fill-paper2" style={{position:'relative', borderRight:'1.5px solid var(--ink)', display:'flex', alignItems:'center', justifyContent:'center'}}>
        <div className="mono" style={{position:'absolute', top:18, left:20, fontSize:10, letterSpacing:'0.14em', color:'var(--ink-soft)'}}>LIVE PREVIEW · UPDATES AS YOU CHOOSE</div>
        <div style={{position:'relative'}}>
          <LampShape kind="table" size={420} stroke={1.5} />
          <Note dx={-160} dy={70} dir="right">your shade — drum, 14″, linen</Note>
          <Note dx={420} dy={210} dir="left">your lamp — bring your own</Note>
        </div>
        <div className="row gap-sm" style={{position:'absolute', bottom:22, right:22}}>
          <span className="btn btn-sm">Front</span>
          <span className="btn btn-sm">Side</span>
          <span className="btn btn-sm btn-coral">Lit</span>
          <span className="btn btn-sm">In room</span>
        </div>
        <div className="hand sketchy" style={{position:'absolute', bottom:22, left:22, fontSize:18, color:'var(--coral)'}}>upload your lamp ↗</div>
      </div>

      {/* Right — builder steps */}
      <div style={{display:'flex', flexDirection:'column'}}>
        <div style={{padding:'28px 32px 20px', borderBottom:'1.5px solid var(--ink)'}}>
          <div className="tag">START FROM SCRATCH</div>
          <div className="serif" style={{fontSize:54, lineHeight:1.0, letterSpacing:'-0.025em', marginTop:6}}>
            Build the<br/>shade that<br/><span style={{fontStyle:'italic', color:'var(--coral)'}}>actually</span> fits.
          </div>
          <div style={{maxWidth:420, marginTop:14, fontFamily:'Inter, sans-serif', fontSize:13, lineHeight:1.6, color:'var(--ink-soft)'}}>
            Tell us your lamp, pick a shape, choose a fabric. We make it in 4 weeks. No guessing — every build comes with a fit guarantee.
          </div>
        </div>

        <div style={{flex:1, padding:'22px 32px', display:'flex', flexDirection:'column', gap:18}}>
          {/* Step 1 */}
          <div className="col gap-xs">
            <div className="row" style={{justifyContent:'space-between'}}>
              <span className="mono" style={{fontSize:10, letterSpacing:'0.14em'}}>01 · SHAPE</span>
              <span className="mono" style={{fontSize:10, color:'var(--coral)'}}>chosen: drum ✓</span>
            </div>
            <div className="row gap-xs">
              {['drum','empire','bell','coolie','square','oval'].map((k,i)=>(
                <div key={k} className={`box sketchy center ${i===0?'box-coral fill-coral-soft':''}`} style={{flex:1, padding:8}}>
                  <LampShape kind={k} size={42}/>
                </div>
              ))}
            </div>
          </div>

          {/* Step 2 */}
          <div className="col gap-xs">
            <div className="row" style={{justifyContent:'space-between'}}>
              <span className="mono" style={{fontSize:10, letterSpacing:'0.14em'}}>02 · SIZE — T × B × H</span>
              <span className="mono" style={{fontSize:10, color:'var(--coral)'}}>14 × 14 × 10″</span>
            </div>
            <div className="row gap-xs">
              <div className="field" style={{flex:1}}>14″</div>
              <div className="field" style={{flex:1}}>14″</div>
              <div className="field" style={{flex:1}}>10″</div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="col gap-xs">
            <div className="row" style={{justifyContent:'space-between'}}>
              <span className="mono" style={{fontSize:10, letterSpacing:'0.14em'}}>03 · FABRIC</span>
              <span className="mono" style={{fontSize:10, color:'var(--ink-soft)'}}>not chosen</span>
            </div>
            <div className="row gap-xs">
              {['Linen','Silk','Parchment','Cotton','Custom →'].map((m,i)=>(
                <div key={m} className="box sketchy center" style={{flex:1, padding:'10px 4px', fontFamily:'Inter, sans-serif', fontSize:11}}>{m}</div>
              ))}
            </div>
          </div>

          {/* Step 4 */}
          <div className="col gap-xs">
            <div className="row" style={{justifyContent:'space-between'}}>
              <span className="mono" style={{fontSize:10, letterSpacing:'0.14em'}}>04 · FITTING</span>
              <span className="hand" style={{fontSize:15, color:'var(--coral)'}}>not sure? send a photo</span>
            </div>
            <div className="row gap-xs">
              {['Spider','Uno','Clip-on'].map((m,i)=>(
                <div key={m} className="box sketchy center" style={{flex:1, padding:10, fontFamily:'Inter, sans-serif', fontSize:11}}>{m}</div>
              ))}
            </div>
          </div>
        </div>

        {/* footer cta */}
        <div className="fill-ink" style={{padding:'16px 32px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div>
            <div className="mono" style={{fontSize:10, letterSpacing:'0.16em', color:'#cfc7b8'}}>RUNNING TOTAL · 4 WK LEAD</div>
            <div className="serif" style={{fontSize:28, color:'var(--paper)'}}>$340 — keep going</div>
          </div>
          <span className="btn btn-coral">Continue → Fabric</span>
        </div>
      </div>
    </div>
  </div>
);

const C_Listing = () => (
  <div style={{height:'100%', background:'var(--paper)', overflow:'hidden'}}>
    <NavBar variant="builder" />

    {/* Title row */}
    <div style={{padding:'22px 36px 14px'}}>
      <div className="row" style={{justifyContent:'space-between', alignItems:'baseline'}}>
        <div>
          <div className="tag">SHOP</div>
          <div className="serif" style={{fontSize:48, letterSpacing:'-0.02em', marginTop:4}}>Two ways to get a shade.</div>
        </div>
        <div className="hand sketchy" style={{fontSize:18, color:'var(--coral)'}}>not sure which? → use Find a Fit</div>
      </div>
    </div>

    {/* The split */}
    <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:0, borderTop:'1.5px solid var(--ink)', height:'calc(100% - 130px)'}}>
      {/* READY */}
      <div style={{padding:'22px 28px', borderRight:'1.5px solid var(--ink)', display:'flex', flexDirection:'column'}}>
        <div className="row" style={{justifyContent:'space-between', alignItems:'baseline'}}>
          <div>
            <div className="serif" style={{fontSize:28, letterSpacing:'-0.01em'}}>Ready to ship.</div>
            <div className="mono" style={{fontSize:10, letterSpacing:'0.14em', color:'var(--ink-soft)', marginTop:4}}>FROM STOCK · 5-DAY DELIVERY · 86 SHADES</div>
          </div>
          <div className="row gap-xs">
            <span className="tag-pill">Drum</span>
            <span className="tag-pill" style={{borderColor:'var(--coral)', color:'var(--coral)'}}>14″</span>
            <span className="tag-pill">Linen</span>
          </div>
        </div>

        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:18, marginTop:18, flex:1}}>
          {[
            ['Pleated Linen Drum','$340','drum','linen, ivory'],
            ['Cotton Drum','$185','drum','cotton, white'],
            ['Striped Linen Drum','$295','drum','linen, stripe'],
            ['Parchment Drum','$240','drum','parchment'],
          ].map((p,i)=>(
            <div key={i} style={{display:'flex', flexDirection:'column'}}>
              <Stripes h={150} coral={i===0} label={p[0].toUpperCase()} />
              <div className="serif" style={{fontSize:18, marginTop:10}}>{p[0]}</div>
              <div className="row" style={{justifyContent:'space-between', fontFamily:'Inter, sans-serif', fontSize:12, color:'var(--ink-soft)'}}>
                <span>{p[3]}</span>
                <span>{p[1]}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MADE */}
      <div className="fill-paper2" style={{padding:'22px 28px', display:'flex', flexDirection:'column'}}>
        <div className="row" style={{justifyContent:'space-between', alignItems:'baseline'}}>
          <div>
            <div className="serif" style={{fontSize:28, letterSpacing:'-0.01em'}}>Made for your lamp.</div>
            <div className="mono" style={{fontSize:10, letterSpacing:'0.14em', color:'var(--ink-soft)', marginTop:4}}>4-WEEK BUILD · 142 STARTING POINTS</div>
          </div>
          <span className="btn btn-coral btn-sm">Start blank →</span>
        </div>

        {/* Builder template grid */}
        <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:12, marginTop:18, flex:1}}>
          {['drum','empire','bell','coolie','square','pendant'].map((k,i)=>(
            <div key={k} className="box-thin sketchy" style={{padding:14, background:'var(--paper)', display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
              <div className="row" style={{justifyContent:'space-between'}}>
                <span className="mono" style={{fontSize:9, letterSpacing:'0.12em'}}>{`0${i+1}`} / TEMPLATE</span>
                <span className="mono" style={{fontSize:9, color:'var(--coral)'}}>customize →</span>
              </div>
              <div className="center" style={{padding:'10px 0'}}>
                <LampShape kind={k} size={84}/>
              </div>
              <div>
                <div className="serif" style={{fontSize:16, textTransform:'capitalize'}}>{k} · {[14,12,16,18,14,12][i]}″</div>
                <div className="mono" style={{fontSize:9, color:'var(--ink-soft)'}}>FROM ${[280,240,360,200,310,400][i]}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="row" style={{justifyContent:'space-between', alignItems:'center', marginTop:14, padding:'12px 16px', border:'1.5px dashed var(--ink)'}}>
          <span className="hand" style={{fontSize:18, color:'var(--coral)'}}>...or send a photo of your lamp</span>
          <span className="btn btn-sm">Upload photo</span>
        </div>
      </div>
    </div>
  </div>
);

const C_Detail = () => (
  <div style={{height:'100%', background:'var(--paper)', overflow:'hidden'}}>
    <NavBar variant="builder" />

    {/* breadcrumb */}
    <div style={{padding:'10px 36px', borderBottom:'1.5px dashed var(--ink)', fontFamily:'IBM Plex Mono, monospace', fontSize:10, letterSpacing:'0.12em', color:'var(--ink-soft)'}}>
      SHOP / READY / DRUM 14″ — PLEATED LINEN
    </div>

    {/* Top: split preview + summary */}
    <div style={{display:'grid', gridTemplateColumns:'1.4fr 1fr', height:'calc(100% - 240px)', borderBottom:'1.5px solid var(--ink)'}}>
      {/* preview */}
      <div className="fill-paper2" style={{position:'relative', borderRight:'1.5px solid var(--ink)', display:'flex', alignItems:'center', justifyContent:'center'}}>
        <Stripes h="80%" w="80%" coral label="LIVE PREVIEW" sub="updates as you tweak below" style={{position:'absolute', inset:'10%'}}/>
        <div className="row gap-xs" style={{position:'absolute', top:18, left:20}}>
          <span className="btn btn-sm btn-coral">Lit</span>
          <span className="btn btn-sm">Unlit</span>
          <span className="btn btn-sm">Side</span>
          <span className="btn btn-sm">In room</span>
        </div>
        <div className="hand sketchy" style={{position:'absolute', bottom:18, left:22, fontSize:16, color:'var(--coral)'}}>↻ rotate · drag to compare</div>
      </div>

      {/* summary */}
      <div style={{padding:'26px 30px', display:'flex', flexDirection:'column', gap:14}}>
        <div className="serif" style={{fontSize:42, lineHeight:1.0, letterSpacing:'-0.02em'}}>Pleated Linen Drum.</div>
        <div className="row" style={{alignItems:'baseline', gap:14}}>
          <span className="serif" style={{fontSize:26}}>$340</span>
          <span className="mono" style={{fontSize:10, color:'var(--ink-soft)'}}>· READY · SHIPS IN 5 DAYS</span>
        </div>

        <div style={{fontFamily:'Inter, sans-serif', fontSize:13, lineHeight:1.6, color:'var(--ink-soft)'}}>
          A 14″ drum in Belgian linen with a hand-pleated face. Stock version on the right; tweak below to make it yours (4 weeks).
        </div>

        <div className="rule"></div>

        <div className="col gap-xs">
          {[
            ['Shape','Drum'],
            ['Size','14 × 14 × 10″'],
            ['Material','Belgian linen, silk-lined'],
            ['Fitting','Spider'],
            ['Color','Ivory'],
          ].map(([k,v])=>(
            <div key={k} className="row" style={{justifyContent:'space-between', fontFamily:'Inter, sans-serif', fontSize:13, paddingBottom:6, borderBottom:'1px dashed var(--ink)'}}>
              <span style={{color:'var(--ink-soft)'}}>{k}</span><span>{v}</span>
            </div>
          ))}
        </div>

        <div className="row gap-sm" style={{marginTop:'auto'}}>
          <span className="btn btn-coral" style={{flex:1, justifyContent:'center', padding:'12px 0'}}>Add to Bag — $340</span>
          <span className="btn">Tweak this →</span>
        </div>
      </div>
    </div>

    {/* Bottom: docked builder strip */}
    <div className="fill-ink" style={{padding:'16px 32px', height:240, display:'flex', flexDirection:'column', gap:10}}>
      <div className="row" style={{justifyContent:'space-between', alignItems:'baseline'}}>
        <div>
          <div className="mono" style={{fontSize:10, letterSpacing:'0.16em', color:'#cfc7b8'}}>MAKE IT YOURS · 4-WEEK BUILD</div>
          <div className="serif" style={{fontSize:22, color:'var(--paper)'}}>Tweak any of these — preview updates above.</div>
        </div>
        <div className="mono" style={{fontSize:10, letterSpacing:'0.14em', color:'#cfc7b8'}}>BASE $340 · CHANGES +$0 → $612 RANGE</div>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'repeat(5, 1fr)', gap:14, flex:1}}>
        {[
          ['SHAPE','Drum',['drum','empire','bell','coolie']],
          ['SIZE','14×14×10″',['10″','12″','14″','16″','18″']],
          ['MATERIAL','Linen',['Linen','Silk','Parchment','Cotton']],
          ['LINING','Silk',['Silk','None','White','Gold']],
          ['FITTING','Spider',['Spider','Uno','Clip']],
        ].map(([title,val,opts])=>(
          <div key={title} className="col gap-xs" style={{background:'#252320', padding:12, border:'1px solid #3a352f'}}>
            <div className="mono" style={{fontSize:9, letterSpacing:'0.14em', color:'#a09d96'}}>{title}</div>
            <div className="serif" style={{fontSize:18, color:'var(--paper)'}}>{val}</div>
            <div className="row gap-xs" style={{flexWrap:'wrap'}}>
              {opts.map((o,j)=>(
                <span key={j} className="mono" style={{fontSize:9, padding:'4px 6px', border:'1px solid #4a4540', color: j===0?'var(--coral)':'#cfc7b8', borderColor: j===0?'var(--coral)':'#4a4540'}}>{o}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

window.C_Home = C_Home;
window.C_Listing = C_Listing;
window.C_Detail = C_Detail;
