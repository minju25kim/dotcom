// V3 · Playful & colorful — "miniverse"
// Kinetic grid of cards w/ sticker energy. Cursor-reactive hero.
// Still monospace, but loud.

function V3Playful() {
  const [mouse, setMouse] = React.useState({ x: 0.5, y: 0.5 });
  const ref = React.useRef(null);

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setMouse({
      x: (e.clientX - r.left) / r.width,
      y: (e.clientY - r.top) / r.height,
    });
  };

  const S = {
    shell: {
      width: 1440, height: 900,
      background: '#fef6e4',
      color: '#1a1a2e',
      fontFamily: '"JetBrains Mono", "SF Mono", Menlo, monospace',
      position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
    },
    nav: {
      padding: '18px 32px',
      display: 'flex', alignItems: 'center', gap: 20,
      fontSize: 13, zIndex: 2, flexShrink: 0,
    },
    logo: {
      width: 38, height: 38, borderRadius: '50%',
      background: '#1a1a2e', color: '#fef6e4',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontWeight: 700, fontSize: 13,
    },
    grid: {
      flex: 1, padding: '0 32px 28px',
      display: 'grid',
      gridTemplateColumns: 'repeat(12, 1fr)',
      gridTemplateRows: 'auto 260px 200px',
      gap: 14, zIndex: 2, overflow: 'hidden',
    },
    card: (bg, color, rot) => ({
      background: bg,
      color: color || '#1a1a2e',
      borderRadius: 18,
      padding: 20,
      border: '2.5px solid #1a1a2e',
      boxShadow: '4px 4px 0 #1a1a2e',
      transform: `rotate(${rot || 0}deg)`,
      position: 'relative',
      display: 'flex', flexDirection: 'column',
      transition: 'transform .2s, box-shadow .2s',
      overflow: 'hidden',
    }),
    chip: (bg) => ({
      display: 'inline-block',
      background: bg, color: '#1a1a2e',
      border: '2px solid #1a1a2e',
      borderRadius: 999,
      padding: '3px 10px',
      fontSize: 10, fontWeight: 700,
      letterSpacing: '0.06em',
    }),
  };

  // parallax blobs
  const blob = (x, y, c, size) => ({
    position: 'absolute', zIndex: 0,
    width: size, height: size, borderRadius: '50%',
    background: c, filter: 'blur(40px)', opacity: 0.55,
    left: `calc(${x}% + ${(mouse.x - 0.5) * 30}px)`,
    top: `calc(${y}% + ${(mouse.y - 0.5) * 30}px)`,
    transition: 'left .3s, top .3s',
  });

  return (
    <div style={S.shell} ref={ref} onMouseMove={onMove}>
      {/* bg blobs */}
      <div style={blob(10, 20, '#ffd6a5', 300)} />
      <div style={blob(75, 55, '#a0c4ff', 360)} />
      <div style={blob(40, 80, '#ffadad', 260)} />

      {/* nav */}
      <div style={S.nav}>
        <div style={S.logo}>mk</div>
        <div style={{ fontWeight: 700 }}>minju25kim<span style={{ color: '#f55' }}>.</span>dev</div>
        <div style={{ flex: 1 }} />
        {['projects', 'gears', 'strava', 'content'].map((x, i) => (
          <a key={i} style={{ padding: '6px 12px', borderRadius: 999, border: '2px solid transparent', transition: 'all .15s' }}>
            {x}
          </a>
        ))}
        <a style={{ ...S.chip('#ffd803'), padding: '6px 14px', fontSize: 12 }}>say hi ✦</a>
      </div>

      {/* GRID */}
      <div style={S.grid}>
        {/* HERO (big intro) — spans 8 cols */}
        <div style={{ ...S.card('#f3d2c1', null, -0.8), gridColumn: 'span 8', padding: '32px 36px' }}>
          <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
            <span style={S.chip('#ffd803')}>✦ HELLO</span>
            <span style={S.chip('#b8f2e6')}>SEOUL, KR</span>
            <span style={S.chip('#ffadad')}>● AVAILABLE</span>
          </div>
          <div style={{
            fontSize: 64, lineHeight: 1.0,
            letterSpacing: '-0.04em', fontWeight: 800,
          }}>
            i'm <span style={{ background: '#ffd803', padding: '0 10px', borderRadius: 8, display: 'inline-block', transform: 'rotate(-1.5deg)' }}>minju</span>,<br />
            a <u style={{ textDecorationThickness: 4, textUnderlineOffset: 6, textDecorationColor: '#f55' }}>developer</u> who<br />
            builds & rides<span style={{ color: '#f55' }}>.</span>
          </div>
          <div style={{ fontSize: 13, marginTop: 18, maxWidth: 520, lineHeight: 1.6 }}>
            shipping small, delightful software from seoul. currently: a ride-journal
            for cyclists, and a tool that edits video by listening to you talk.
          </div>
        </div>

        {/* MONOGRAM sticker */}
        <div style={{ ...S.card('#1a1a2e', '#fef6e4', 2), gridColumn: 'span 4', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontSize: 120, fontWeight: 900, letterSpacing: '-0.08em', lineHeight: 0.9 }}>mk</div>
          <div style={{ fontSize: 10, letterSpacing: '0.25em', marginTop: 4 }}>EST. 2026</div>
          <div style={{
            position: 'absolute', top: 12, right: 12,
            fontSize: 10, letterSpacing: '0.2em',
            color: '#ffd803',
          }}>★ ★ ★</div>
        </div>

        {/* PROJECT · bikelog */}
        <div style={{ ...S.card('#b8f2e6', null, -1), gridColumn: 'span 4' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={S.chip('#fef6e4')}>01 / WIP</span>
            <span style={{ fontSize: 18 }}>🚴</span>
          </div>
          <div style={{ fontSize: 28, fontWeight: 800, marginTop: 10, letterSpacing: '-0.03em' }}>bikelog</div>
          <div style={{ fontSize: 12, lineHeight: 1.5, marginTop: 4 }}>
            a ride journal that actually remembers. GPX, mapbox, strava webhooks.
          </div>
          <div style={{ flex: 1 }} />
          <div style={{ fontSize: 10, letterSpacing: '0.1em', marginTop: 10 }}>TS · MAPBOX · STRAVA</div>
        </div>

        {/* PROJECT · cutter.ai */}
        <div style={{ ...S.card('#ffadad', null, 1.2), gridColumn: 'span 4' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={S.chip('#fef6e4')}>02 / LAB</span>
            <span style={{ fontSize: 18 }}>✂️</span>
          </div>
          <div style={{ fontSize: 28, fontWeight: 800, marginTop: 10, letterSpacing: '-0.03em' }}>cutter.ai</div>
          <div style={{ fontSize: 12, lineHeight: 1.5, marginTop: 4 }}>
            edit video at the speed of thought. whisper transcripts → ffmpeg cuts.
          </div>
          <div style={{ flex: 1 }} />
          <div style={{ fontSize: 10, letterSpacing: '0.1em', marginTop: 10 }}>PYTHON · WHISPER · FFMPEG</div>
        </div>

        {/* STRAVA */}
        <div style={{ ...S.card('#ffd803', null, -0.5), gridColumn: 'span 4' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={S.chip('#fef6e4')}>THIS MONTH</span>
            <span style={{ fontSize: 18 }}>⚡</span>
          </div>
          <div style={{ display: 'flex', gap: 20, marginTop: 12, flex: 1 }}>
            <div>
              <div style={{ fontSize: 10, letterSpacing: '0.15em' }}>RIDE</div>
              <div style={{ fontSize: 38, fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1 }}>637<span style={{ fontSize: 16 }}>km</span></div>
            </div>
            <div>
              <div style={{ fontSize: 10, letterSpacing: '0.15em' }}>CLIMB</div>
              <div style={{ fontSize: 38, fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1 }}>4.1<span style={{ fontSize: 16 }}>k m</span></div>
            </div>
          </div>
          {/* bars */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 36, marginTop: 10 }}>
            {[20, 35, 28, 48, 60, 42, 33, 52, 70, 45, 38, 55, 68, 80].map((h, i) => (
              <div key={i} style={{ flex: 1, height: `${h}%`, background: '#1a1a2e', borderRadius: '2px 2px 0 0' }} />
            ))}
          </div>
        </div>

        {/* SOCIALS strip */}
        <div style={{ ...S.card('#fef6e4', null, 0), gridColumn: 'span 5', padding: 16 }}>
          <div style={{ fontSize: 10, letterSpacing: '0.2em', marginBottom: 8 }}>FIND ME EVERYWHERE AS</div>
          <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 10, letterSpacing: '-0.02em' }}>@minju25kim</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {[
              ['GitHub', '#a0c4ff'],
              ['Instagram', '#ffadad'],
              ['YouTube', '#ff6b6b'],
              ['Strava', '#ff9f1c'],
            ].map(([n, c], i) => (
              <a key={i} style={{
                ...S.chip(c),
                padding: '6px 12px', fontSize: 12,
              }}>
                {n} ↗
              </a>
            ))}
          </div>
        </div>

        {/* CONTENT strip */}
        <div style={{ ...S.card('#a0c4ff', null, 0.6), gridColumn: 'span 3', padding: 16 }}>
          <div style={{ fontSize: 10, letterSpacing: '0.2em' }}>LATEST</div>
          <div style={{ fontSize: 48, fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 1, marginTop: 6 }}>47</div>
          <div style={{ fontSize: 12, marginTop: 4 }}>posts & notes on<br />leetcode, py, life</div>
          <div style={{ flex: 1 }} />
          <a style={{ ...S.chip('#fef6e4'), padding: '5px 10px', alignSelf: 'flex-start', marginTop: 10 }}>read → </a>
        </div>
      </div>
    </div>
  );
}

window.V3Playful = V3Playful;
