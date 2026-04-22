// V2 · Brutalist / raw-HTML energy
// Oversized type, hard color blocks, Strava stats as the hero,
// no rounded corners, no gradients, brutal honesty.

function V2Brutalist() {
  const S = {
    shell: {
      width: 1440, height: 900,
      background: '#f4f1ea',
      color: '#0a0a0a',
      fontFamily: '"JetBrains Mono", "SF Mono", Menlo, monospace',
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden', position: 'relative',
    },
    nav: {
      borderBottom: '3px solid #0a0a0a',
      padding: '14px 28px',
      display: 'flex', alignItems: 'center',
      gap: 24, fontSize: 13,
      background: '#f4f1ea',
      flexShrink: 0,
    },
    navItem: (active) => ({
      padding: '4px 10px',
      background: active ? '#0a0a0a' : 'transparent',
      color: active ? '#f4f1ea' : '#0a0a0a',
      textDecoration: active ? 'none' : 'underline',
      textUnderlineOffset: 3,
    }),
    main: { flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', overflow: 'hidden' },
  };

  return (
    <div style={S.shell}>
      {/* brutal nav */}
      <div style={S.nav}>
        <div style={{ fontWeight: 900, fontSize: 16 }}>[mk]</div>
        <div style={{ flex: 1 }}>MINJU KIM / SOFTWARE ENGINEER / SEOUL, KR</div>
        <a style={S.navItem()}>Projects</a>
        <a style={S.navItem()}>Gears</a>
        <a style={S.navItem()}>Strava</a>
        <a style={S.navItem(true)}>Content</a>
        <div style={{ padding: '4px 10px', background: '#ff3b00', color: 'white', fontWeight: 700 }}>
          ● AVAILABLE
        </div>
      </div>

      <div style={S.main}>
        {/* LEFT: hero + proof */}
        <div style={{ borderRight: '3px solid #0a0a0a', padding: 28, display: 'flex', flexDirection: 'column', gap: 18, overflow: 'hidden' }}>
          <div style={{ fontSize: 11, letterSpacing: '0.15em' }}>
            ━━━ WHO / 01 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          </div>

          <div style={{
            fontSize: 92, lineHeight: 0.9, fontWeight: 900,
            letterSpacing: '-0.05em', textTransform: 'uppercase',
            margin: '4px 0',
          }}>
            I BUILD<br />
            <span style={{ background: '#0a0a0a', color: '#f4f1ea', padding: '0 8px', marginLeft: -8 }}>THINGS</span><br />
            THAT <span style={{ color: '#ff3b00' }}>MOVE</span>.
          </div>

          <div style={{ fontSize: 14, lineHeight: 1.55, maxWidth: 520 }}>
            Software engineer in Seoul. I ride 600+ km a month and ship code for
            the other 22 hours. Currently building <b>bikelog</b> (a smarter Strava)
            and <b>cutter.ai</b> (video editing at the speed of thought).
          </div>

          <div style={{ display: 'flex', gap: 0, marginTop: 4, border: '3px solid #0a0a0a' }}>
            <a style={{ padding: '12px 16px', background: '#0a0a0a', color: '#f4f1ea', fontWeight: 700, fontSize: 13 }}>
              → SEE THE WORK
            </a>
            <a style={{ padding: '12px 16px', borderLeft: '3px solid #0a0a0a', fontSize: 13 }}>
              hello@minju25kim.dev ↗
            </a>
          </div>

          <div style={{ fontSize: 11, letterSpacing: '0.15em', marginTop: 6 }}>
            ━━━ PROOF / 02 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', border: '3px solid #0a0a0a' }}>
            {[
              ['637.4', 'KM / MONTH', '#ff3b00'],
              ['47', 'POSTS', null],
              ['2016', 'SCULTURA 100', null],
            ].map(([big, small, bg], i) => (
              <div key={i} style={{
                padding: '16px 14px',
                borderRight: i < 2 ? '3px solid #0a0a0a' : 'none',
                background: bg || 'transparent',
                color: bg ? 'white' : '#0a0a0a',
              }}>
                <div style={{ fontSize: 36, fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1 }}>{big}</div>
                <div style={{ fontSize: 10, marginTop: 6, letterSpacing: '0.1em' }}>{small}</div>
              </div>
            ))}
          </div>

          <div style={{ fontSize: 11, letterSpacing: '0.15em', marginTop: 4 }}>
            ━━━ FIND / 03 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {[
              ['GITHUB', '@minju25kim'],
              ['INSTAGRAM', '@minju25kim'],
              ['YOUTUBE', '@minju25kim'],
              ['STRAVA', '@minju25kim'],
            ].map(([k, v], i) => (
              <div key={i} style={{ border: '2px solid #0a0a0a', padding: '6px 10px', fontSize: 12 }}>
                <b>{k}</b> &nbsp; {v} &nbsp;↗
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: work ledger */}
        <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* marquee */}
          <div style={{
            background: '#0a0a0a', color: '#f4f1ea',
            padding: '8px 0', borderBottom: '3px solid #0a0a0a',
            fontSize: 13, fontWeight: 700, overflow: 'hidden', whiteSpace: 'nowrap',
            flexShrink: 0,
          }}>
            <div className="marquee-track" style={{ display: 'inline-block', animation: 'marq 30s linear infinite' }}>
              SHIPPING / BIKELOG · CUTTER.AI · PORTFOLIO / RIDING / 637 KM THIS MONTH · 4,120 M CLIMBED / WRITING / 47 POSTS · LEETCODE GRIND / HIRING? LET'S TALK · HELLO@MINJU25KIM.DEV /&nbsp;&nbsp;&nbsp;
              SHIPPING / BIKELOG · CUTTER.AI · PORTFOLIO / RIDING / 637 KM THIS MONTH · 4,120 M CLIMBED / WRITING / 47 POSTS · LEETCODE GRIND / HIRING? LET'S TALK · HELLO@MINJU25KIM.DEV /&nbsp;&nbsp;&nbsp;
            </div>
          </div>

          {/* work list */}
          <div style={{ padding: '20px 28px', borderBottom: '3px solid #0a0a0a' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, fontSize: 11, letterSpacing: '0.15em' }}>
              <span>▼ PROJECTS ({2})</span>
              <span>UPDATED 22/04/26</span>
            </div>
            {[
              ['01', 'BIKELOG', 'A smarter ride journal. GPX, mapbox, strava webhooks.', 'TYPESCRIPT', 'IN PROGRESS'],
              ['02', 'CUTTER.AI', 'Edit video at the speed of thought. Whisper + ffmpeg.', 'PYTHON', 'PROTOTYPE'],
            ].map(([n, name, desc, stack, status], i) => (
              <div key={i} style={{
                display: 'grid',
                gridTemplateColumns: '38px 1fr 110px 110px',
                gap: 14, alignItems: 'baseline',
                padding: '14px 0',
                borderTop: '1px solid #0a0a0a',
              }}>
                <div style={{ fontSize: 24, fontWeight: 900 }}>{n}</div>
                <div>
                  <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: '-0.02em' }}>{name}</div>
                  <div style={{ fontSize: 12, marginTop: 4, color: '#333' }}>{desc}</div>
                </div>
                <div style={{ fontSize: 11 }}>{stack}</div>
                <div style={{ fontSize: 11, background: '#0a0a0a', color: '#f4f1ea', padding: '4px 8px', textAlign: 'center', justifySelf: 'end' }}>
                  {status}
                </div>
              </div>
            ))}
          </div>

          {/* content ledger */}
          <div style={{ padding: '20px 28px', flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, fontSize: 11, letterSpacing: '0.15em' }}>
              <span>▼ CONTENT / LEDGER</span>
              <span>TAIL -F</span>
            </div>
            <div style={{ fontSize: 12, flex: 1, overflow: 'hidden' }}>
              {[
                ['17/03/26', 'DEV', 'Summary'],
                ['27/07/25', 'DEV', '[Leetcode] 133. Clone Graph'],
                ['24/07/25', 'DEV', '[Leetcode] 150. Evaluate RPN'],
                ['23/07/25', 'DEV', '[Leetcode] 739. Daily Temperatures'],
                ['21/07/25', 'DEV', '[Leetcode] 297. Serialize Binary Tree'],
                ['20/07/25', 'PY3', '[python3] ASGI uv uvicorn Fastapi Pydantic'],
                ['16/07/25', 'DEV', '[Leetcode] 117. Populating Next Right Pointers'],
              ].map(([d, cat, title], i) => (
                <div key={i} style={{
                  display: 'grid',
                  gridTemplateColumns: '78px 44px 1fr 20px',
                  gap: 12, padding: '6px 0',
                  borderBottom: '1px dashed #0a0a0a',
                  alignItems: 'center',
                }}>
                  <span>{d}</span>
                  <span style={{ background: cat === 'PY3' ? '#ff3b00' : '#0a0a0a', color: 'white', textAlign: 'center', padding: '1px 0', fontSize: 10 }}>{cat}</span>
                  <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{title}</span>
                  <span>↗</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`@keyframes marq { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }`}</style>
    </div>
  );
}

window.V2Brutalist = V2Brutalist;
