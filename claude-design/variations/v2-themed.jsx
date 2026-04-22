// V2 — Full palette variations. Each takes (bg, ink, accent, accent2) and rebuilds Landing.
// Also: bike name rendered as a small sticker over the bike photo on /home.

function V2LandingThemed({ theme }) {
  const { bg, ink, accent, accent2, soft, name } = theme;
  return (
    <div style={{
      width: 1440, height: 900, background: bg, color: ink,
      fontFamily: BR.font, display: 'flex', flexDirection: 'column', overflow: 'hidden',
    }}>
      {/* nav */}
      <div style={{ borderBottom: `3px solid ${ink}`, padding: '14px 28px', display: 'flex', alignItems: 'center', gap: 24, fontSize: 13, background: bg, flexShrink: 0 }}>
        <div style={{ fontWeight: 900, fontSize: 16 }}>[mk]</div>
        <div style={{ flex: 1 }}>MINJU KIM / SOFTWARE ENGINEER / SEOUL, KR · <span style={{ opacity: .6 }}>{name}</span></div>
        {['Projects', 'Gears', 'Strava', 'Content'].map((x) => (
          <a key={x} style={{ padding: '4px 10px', textDecoration: 'underline', textUnderlineOffset: 3 }}>{x}</a>
        ))}
        <a href="mailto:minju25kim@gmail.com" style={{ padding: '4px 10px', background: accent, color: bg, fontWeight: 700 }}>● AVAILABLE</a>
      </div>

      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', overflow: 'hidden' }}>
        {/* LEFT */}
        <div style={{ borderRight: `3px solid ${ink}`, padding: 28, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ fontSize: 11, letterSpacing: '0.15em' }}>━━━ WHO / 01 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━</div>
          <div style={{ fontSize: 92, lineHeight: 0.9, fontWeight: 900, letterSpacing: '-0.05em', textTransform: 'uppercase' }}>
            I BUILD<br/>
            <span style={{ background: ink, color: bg, padding: '0 8px', marginLeft: -8 }}>THINGS</span><br/>
            THAT <span style={{ color: accent }}>MOVE</span>.
          </div>
          <div style={{ fontSize: 14, lineHeight: 1.55, maxWidth: 520 }}>
            Software engineer in Seoul. 600+ km/mo in the saddle, code the rest.
            Building <b>bikelog</b> and <b>cutter.ai</b>.
          </div>
          <div style={{ display: 'flex', border: `3px solid ${ink}` }}>
            <a style={{ padding: '12px 16px', background: ink, color: bg, fontWeight: 700, fontSize: 13 }}>→ SEE THE WORK</a>
            <a href="mailto:minju25kim@gmail.com" style={{ padding: '12px 16px', borderLeft: `3px solid ${ink}`, fontSize: 13 }}>minju25kim@gmail.com ↗</a>
          </div>

          {/* PROOF / FIND — matches V2 home */}
          <div style={{ fontSize: 11, letterSpacing: '0.15em', marginTop: 2 }}>━━━ PROOF / 02 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', border: `3px solid ${ink}` }}>
            {[['637.4', 'KM / MONTH', accent, bg], ['47', 'POSTS', null, ink], ['2016', 'SCULTURA 100', null, ink]].map(([big, small, bgc, fg], i) => (
              <div key={i} style={{
                padding: '14px 12px', borderRight: i < 2 ? `3px solid ${ink}` : 'none',
                background: bgc || 'transparent', color: fg,
              }}>
                <div style={{ fontSize: 32, fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1 }}>{big}</div>
                <div style={{ fontSize: 10, marginTop: 6, letterSpacing: '0.1em' }}>{small}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 11, letterSpacing: '0.15em', marginTop: 2 }}>━━━ FIND / 03 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {[['GITHUB', '@minju25kim'], ['INSTAGRAM', '@minju25kim'], ['YOUTUBE', '@minju25kim'], ['STRAVA', '@minju25kim']].map(([k, v], i) => (
              <div key={i} style={{ border: `2px solid ${ink}`, padding: '6px 10px', fontSize: 12 }}><b>{k}</b> &nbsp; {v} &nbsp;↗</div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ background: ink, color: bg, padding: '8px 0', borderBottom: `3px solid ${ink}`, fontSize: 13, fontWeight: 700, overflow: 'hidden', whiteSpace: 'nowrap' }}>
            <div style={{ display: 'inline-block', animation: 'marq 30s linear infinite' }}>
              SHIPPING · BIKELOG · CUTTER.AI / 637 KM THIS MONTH · 4,120 M CLIMBED / HIRING? MINJU25KIM@GMAIL.COM /&nbsp;&nbsp;&nbsp;
              SHIPPING · BIKELOG · CUTTER.AI / 637 KM THIS MONTH · 4,120 M CLIMBED / HIRING? MINJU25KIM@GMAIL.COM /&nbsp;&nbsp;&nbsp;
            </div>
          </div>

          {/* Proof tri */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderBottom: `3px solid ${ink}` }}>
            {[
              ['637.4', 'KM / MONTH', accent, bg],
              ['47', 'POSTS', accent2 || soft, ink],
              ['2016', 'RIDING', null, ink],
            ].map(([big, small, bgc, fg], i) => (
              <div key={i} style={{
                padding: '18px 16px', borderRight: i < 2 ? `3px solid ${ink}` : 'none',
                background: bgc || 'transparent', color: fg,
              }}>
                <div style={{ fontSize: 38, fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1 }}>{big}</div>
                <div style={{ fontSize: 10, marginTop: 6, letterSpacing: '0.1em' }}>{small}</div>
              </div>
            ))}
          </div>

          {/* Projects list */}
          <div style={{ padding: '18px 28px', borderBottom: `3px solid ${ink}` }}>
            <div style={{ fontSize: 11, letterSpacing: '0.15em', marginBottom: 8 }}>▼ PROJECTS (2) · NOW SHIPPING</div>
            {[
              ['01', 'BIKELOG', 'Ride journal. GPX + mapbox + strava.', 'TS', 'WIP'],
              ['02', 'CUTTER.AI', 'Video editing via transcript.', 'PY', 'LAB'],
            ].map(([n, name, desc, stack, status], i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '38px 1fr 60px 70px',
                gap: 14, alignItems: 'baseline', padding: '12px 0',
                borderTop: `1px solid ${ink}`,
              }}>
                <div style={{ fontSize: 22, fontWeight: 900 }}>{n}</div>
                <div>
                  <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: '-0.02em' }}>{name}</div>
                  <div style={{ fontSize: 12, marginTop: 2 }}>{desc}</div>
                </div>
                <div style={{ fontSize: 11 }}>{stack}</div>
                <div style={{ fontSize: 11, background: ink, color: bg, padding: '3px 8px', textAlign: 'center' }}>{status}</div>
              </div>
            ))}
          </div>

          {/* Content tail */}
          <div style={{ padding: '14px 28px', flex: 1, overflow: 'hidden' }}>
            <div style={{ fontSize: 11, letterSpacing: '0.15em', marginBottom: 8 }}>▼ CONTENT · TAIL -F</div>
            {[
              ['17/03/26', 'DEV', 'Summary', true],
              ['27/07/25', 'DEV', '[Leetcode] 133. Clone Graph'],
              ['20/07/25', 'PY3', '[python3] ASGI uv uvicorn FastAPI'],
              ['16/07/25', 'DEV', '[Leetcode] 117. Next Right Pointers'],
            ].map(([d, cat, title, pinned], i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '74px 40px 1fr 20px',
                gap: 10, padding: '6px 0', borderBottom: `1px dashed ${ink}`, alignItems: 'center',
                background: pinned ? accent : 'transparent', color: pinned ? bg : ink,
                fontSize: 12,
              }}>
                <span>{d}</span>
                <span style={{ background: pinned ? bg : (cat === 'PY3' ? accent : ink), color: pinned ? accent : bg, textAlign: 'center', padding: '1px 0', fontSize: 10, fontWeight: 700 }}>{cat}</span>
                <span style={{ fontWeight: pinned ? 900 : 400 }}>{pinned && '★ '}{title}</span>
                <span>↗</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

window.V2LandingThemed = V2LandingThemed;
