// V2 Brutalist — Desktop routes (Landing, Projects, Gears, Strava, Content)

// ── LANDING ────────────────────────────────────────────────────
function V2Landing() {
  return (
    <div style={{
      width: 1440, height: 900, background: BR.bg, color: BR.ink,
      fontFamily: BR.font, display: 'flex', flexDirection: 'column', overflow: 'hidden',
    }}>
      <BrNav active="home" />
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', overflow: 'hidden' }}>
        {/* LEFT */}
        <div style={{ borderRight: '3px solid #0a0a0a', padding: 28, display: 'flex', flexDirection: 'column', gap: 18, overflow: 'hidden' }}>
          <div style={{ fontSize: 11, letterSpacing: '0.15em' }}>━━━ WHO / 01 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</div>
          <div style={{ fontSize: 92, lineHeight: 0.9, fontWeight: 900, letterSpacing: '-0.05em', textTransform: 'uppercase', margin: '4px 0' }}>
            I BUILD<br/>
            <span style={{ background: BR.ink, color: BR.bg, padding: '0 8px', marginLeft: -8 }}>THINGS</span><br/>
            THAT <span style={{ color: BR.hot }}>MOVE</span>.
          </div>
          <div style={{ fontSize: 14, lineHeight: 1.55, maxWidth: 520 }}>
            Software engineer in Seoul. I ride 600+ km a month and ship code for
            the other 22 hours. Currently building <b>bikelog</b> (a smarter Strava)
            and <b>cutter.ai</b> (video editing at the speed of thought).
          </div>
          <div style={{ display: 'flex', border: '3px solid #0a0a0a' }}>
            <a style={{ padding: '12px 16px', background: BR.ink, color: BR.bg, fontWeight: 700, fontSize: 13 }}>→ SEE THE WORK</a>
            <a href={`mailto:${BR.email}`} style={{ padding: '12px 16px', borderLeft: '3px solid #0a0a0a', fontSize: 13 }}>{BR.email} ↗</a>
          </div>
          <div style={{ fontSize: 11, letterSpacing: '0.15em', marginTop: 6 }}>━━━ PROOF / 02 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', border: '3px solid #0a0a0a' }}>
            {[['637.4', 'KM / MONTH', BR.hot], ['47', 'POSTS', null], ['2016', 'SCULTURA 100', null]].map(([big, small, bg], i) => (
              <div key={i} style={{
                padding: '16px 14px', borderRight: i < 2 ? '3px solid #0a0a0a' : 'none',
                background: bg || 'transparent', color: bg ? 'white' : BR.ink,
              }}>
                <div style={{ fontSize: 36, fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1 }}>{big}</div>
                <div style={{ fontSize: 10, marginTop: 6, letterSpacing: '0.1em' }}>{small}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 11, letterSpacing: '0.15em', marginTop: 4 }}>━━━ FIND / 03 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {[['GITHUB', '@minju25kim'], ['INSTAGRAM', '@minju25kim'], ['YOUTUBE', '@minju25kim'], ['STRAVA', '@minju25kim']].map(([k, v], i) => (
              <div key={i} style={{ border: '2px solid #0a0a0a', padding: '6px 10px', fontSize: 12 }}><b>{k}</b> &nbsp; {v} &nbsp;↗</div>
            ))}
          </div>
        </div>
        {/* RIGHT */}
        <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <BrMarquee text="SHIPPING / BIKELOG · CUTTER.AI / RIDING / 637 KM THIS MONTH · 4,120 M CLIMBED / WRITING / 47 POSTS · LEETCODE GRIND / HIRING? LET'S TALK · MINJU25KIM@GMAIL.COM /" />
          <div style={{ padding: '20px 28px', borderBottom: '3px solid #0a0a0a' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, fontSize: 11, letterSpacing: '0.15em' }}>
              <span>▼ PROJECTS (2)</span><span>UPDATED 22/04/26</span>
            </div>
            {[
              ['01', 'BIKELOG', 'A smarter ride journal. GPX, mapbox, strava webhooks.', 'TYPESCRIPT', 'IN PROGRESS'],
              ['02', 'CUTTER.AI', 'Edit video at the speed of thought. Whisper + ffmpeg.', 'PYTHON', 'PROTOTYPE'],
            ].map(([n, name, desc, stack, status], i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '38px 1fr 110px 110px',
                gap: 14, alignItems: 'baseline', padding: '14px 0',
                borderTop: '1px solid #0a0a0a',
              }}>
                <div style={{ fontSize: 24, fontWeight: 900 }}>{n}</div>
                <div>
                  <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: '-0.02em' }}>{name}</div>
                  <div style={{ fontSize: 12, marginTop: 4, color: '#333' }}>{desc}</div>
                </div>
                <div style={{ fontSize: 11 }}>{stack}</div>
                <div style={{ fontSize: 11, background: BR.ink, color: BR.bg, padding: '4px 8px', textAlign: 'center', justifySelf: 'end' }}>{status}</div>
              </div>
            ))}
          </div>
          <div style={{ padding: '20px 28px', flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, fontSize: 11, letterSpacing: '0.15em' }}>
              <span>▼ CONTENT / LEDGER</span><span>TAIL -F</span>
            </div>
            <div style={{ fontSize: 12, flex: 1, overflow: 'hidden' }}>
              {[
                ['17/03/26', 'DEV', 'Summary'],
                ['27/07/25', 'DEV', '[Leetcode] 133. Clone Graph'],
                ['24/07/25', 'DEV', '[Leetcode] 150. Evaluate RPN'],
                ['23/07/25', 'DEV', '[Leetcode] 739. Daily Temperatures'],
                ['21/07/25', 'DEV', '[Leetcode] 297. Serialize Binary Tree'],
                ['20/07/25', 'PY3', '[python3] ASGI uv uvicorn Fastapi Pydantic'],
                ['16/07/25', 'DEV', '[Leetcode] 117. Next Right Pointers'],
              ].map(([d, cat, title], i) => (
                <div key={i} style={{
                  display: 'grid', gridTemplateColumns: '78px 44px 1fr 20px',
                  gap: 12, padding: '6px 0', borderBottom: '1px dashed #0a0a0a', alignItems: 'center',
                }}>
                  <span>{d}</span>
                  <span style={{ background: cat === 'PY3' ? BR.hot : BR.ink, color: 'white', textAlign: 'center', padding: '1px 0', fontSize: 10 }}>{cat}</span>
                  <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{title}</span>
                  <span>↗</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── PROJECTS ───────────────────────────────────────────────────
function V2Projects() {
  const projects = [
    {
      n: '01', name: 'BIKELOG', status: 'IN PROGRESS', year: '2026',
      desc: 'A smarter ride journal for cyclists. Pull your Strava rides, overlay them on mapbox, add notes, remember every climb.',
      stack: ['TYPESCRIPT', 'NEXT', 'MAPBOX', 'STRAVA API'],
      bg: BR.hot,
    },
    {
      n: '02', name: 'CUTTER.AI', status: 'PROTOTYPE', year: '2026',
      desc: 'Edit video at the speed of thought. Whisper transcribes; you rewrite the transcript; ffmpeg re-cuts the video.',
      stack: ['PYTHON', 'WHISPER', 'FFMPEG'],
      bg: null,
    },
    {
      n: '03', name: 'MINJU25KIM.DEV', status: 'LIVE', year: '2025',
      desc: 'This site. Static, fast, brutally honest. Hosted on cloudflare pages.',
      stack: ['ASTRO', 'MDX', 'CF PAGES'],
      bg: null,
    },
  ];
  return (
    <div style={{
      width: 1440, height: 900, background: BR.bg, color: BR.ink,
      fontFamily: BR.font, display: 'flex', flexDirection: 'column', overflow: 'hidden',
    }}>
      <BrNav active="projects" />
      <BrPageHead label="PROJECTS / A TO Z" title="THE WORK." sub="Three things I'm shipping or have shipped. Some finished. Some not. All honest." />
      <div style={{ flex: 1, overflow: 'auto' }}>
        {projects.map((p, i) => (
          <div key={i} style={{
            display: 'grid', gridTemplateColumns: '80px 1.3fr 1fr 120px',
            borderBottom: '3px solid #0a0a0a',
            background: p.bg || 'transparent', color: p.bg ? 'white' : BR.ink,
          }}>
            <div style={{ padding: '24px 20px', borderRight: '3px solid #0a0a0a', fontSize: 48, fontWeight: 900, lineHeight: 1 }}>{p.n}</div>
            <div style={{ padding: '24px 20px', borderRight: '3px solid #0a0a0a' }}>
              <div style={{ fontSize: 42, fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 0.95 }}>{p.name}</div>
              <div style={{ fontSize: 13, marginTop: 10, lineHeight: 1.5, maxWidth: 460 }}>{p.desc}</div>
              <div style={{ display: 'flex', gap: 6, marginTop: 12, flexWrap: 'wrap' }}>
                {p.stack.map((s, j) => (
                  <span key={j} style={{ border: `2px solid ${p.bg ? 'white' : BR.ink}`, padding: '3px 8px', fontSize: 10 }}>{s}</span>
                ))}
              </div>
            </div>
            <div style={{ padding: '24px 20px', borderRight: '3px solid #0a0a0a' }}>
              <div style={{ fontSize: 11, letterSpacing: '0.15em', marginBottom: 6 }}>WHY IT MATTERS</div>
              <div style={{ fontSize: 12, lineHeight: 1.6 }}>
                {i === 0 && "Every ride tells a story. Strava forgets. bikelog remembers."}
                {i === 1 && "Text is the fastest editor UI ever invented. Apply it to video."}
                {i === 2 && "A developer site should be a developer's resume."}
              </div>
            </div>
            <div style={{ padding: '24px 16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 11, letterSpacing: '0.15em' }}>{p.year}</div>
                <div style={{
                  fontSize: 11, marginTop: 8,
                  background: p.bg ? 'white' : BR.ink,
                  color: p.bg ? BR.hot : BR.bg,
                  padding: '3px 8px', textAlign: 'center', fontWeight: 700,
                }}>{p.status}</div>
              </div>
              <a style={{ fontSize: 13, fontWeight: 700, marginTop: 20 }}>→ OPEN</a>
            </div>
          </div>
        ))}
      </div>
      <BrFooter />
    </div>
  );
}

// ── GEARS ──────────────────────────────────────────────────────
function V2Gears() {
  const gears = [
    {
      tag: 'ROAD BIKE', name: 'Scultura 100', brand: 'Merida · 2016',
      specs: [['FRAME', 'Aluminium'], ['GROUPSET', 'Shimano Sora'], ['WEIGHT', '9.8 kg'], ['KM ON IT', '14,200']],
      note: 'Entry road bike. Bought used. Paid for itself in commutes.',
    },
  ];
  return (
    <div style={{
      width: 1440, height: 900, background: BR.bg, color: BR.ink,
      fontFamily: BR.font, display: 'flex', flexDirection: 'column', overflow: 'hidden',
    }}>
      <BrNav active="gears" />
      <BrPageHead label="GEARS / THE TOOLS" title="WHAT I RIDE." sub="Every gram accounted for. Every kilometer earned." />
      <div style={{ flex: 1, overflow: 'hidden', display: 'grid', gridTemplateColumns: '1.4fr 1fr' }}>
        {/* Bike placeholder */}
        <div style={{
          borderRight: '3px solid #0a0a0a', position: 'relative',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: `repeating-linear-gradient(45deg, ${BR.bg} 0 14px, ${BR.soft} 14px 28px)`,
        }}>
          <div style={{
            background: BR.bg, border: '3px solid #0a0a0a',
            padding: '14px 24px', fontSize: 13, fontWeight: 700,
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            [ BIKE PHOTO — drop product shot ]
          </div>
          <div style={{ position: 'absolute', top: 20, left: 20, fontSize: 11, letterSpacing: '0.15em' }}>◎ PHOTO / 01</div>
          <div style={{ position: 'absolute', bottom: 20, right: 20, fontSize: 11, letterSpacing: '0.15em' }}>3000 × 2000</div>
        </div>
        {/* Specs */}
        <div style={{ padding: 28, overflow: 'auto' }}>
          {gears.map((g, i) => (
            <div key={i}>
              <div style={{ display: 'inline-block', border: '2px solid #0a0a0a', padding: '3px 10px', fontSize: 11, fontWeight: 700 }}>{g.tag}</div>
              <div style={{ fontSize: 56, fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 0.95, marginTop: 14 }}>{g.name}</div>
              <div style={{ fontSize: 14, marginTop: 6 }}>{g.brand}</div>
              <div style={{ marginTop: 20, fontSize: 12, lineHeight: 1.6, maxWidth: 380 }}>{g.note}</div>
              <div style={{ marginTop: 24, border: '3px solid #0a0a0a' }}>
                {g.specs.map(([k, v], j) => (
                  <div key={j} style={{
                    display: 'grid', gridTemplateColumns: '1fr 1fr',
                    borderBottom: j < g.specs.length - 1 ? '2px solid #0a0a0a' : 'none',
                  }}>
                    <div style={{ padding: '10px 14px', borderRight: '2px solid #0a0a0a', fontSize: 11, letterSpacing: '0.12em' }}>{k}</div>
                    <div style={{ padding: '10px 14px', fontSize: 13, fontWeight: 700 }}>{v}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 16, padding: '12px 16px', background: BR.hot, color: 'white' }}>
                <div style={{ fontSize: 11, letterSpacing: '0.15em' }}>WISHLIST · NEXT</div>
                <div style={{ fontSize: 20, fontWeight: 900, marginTop: 4 }}>CARBON ENDURANCE FRAME.</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BrFooter />
    </div>
  );
}

// ── STRAVA ─────────────────────────────────────────────────────
function V2Strava() {
  const rides = [
    ['2026-04-05', '86.0 km', '4h 25m', '↑420m', 'Bukhansan loop'],
    ['2026-04-01', '34.8 km', '2h 02m', '↑73m', 'Han river east'],
    ['2026-04-01', '21.6 km', '1h 18m', '↑32m', 'Evening spin'],
    ['2026-03-28', '133.7 km', '7h 19m', '↑543m', 'Chuncheon century'],
    ['2026-03-21', '72.4 km', '3h 48m', '↑310m', 'Seoul grand park'],
  ];
  // Simple bar sparkline data
  const bars = [20, 35, 48, 28, 62, 38, 72, 58, 90, 54, 46, 68, 82, 40, 55];
  return (
    <div style={{
      width: 1440, height: 900, background: BR.bg, color: BR.ink,
      fontFamily: BR.font, display: 'flex', flexDirection: 'column', overflow: 'hidden',
    }}>
      <BrNav active="strava" />
      <div style={{ padding: '22px 28px 18px', borderBottom: '3px solid #0a0a0a' }}>
        <div style={{ fontSize: 11, letterSpacing: '0.2em' }}>━━ STRAVA / APRIL 2026 ━━━━━━━━━━━━━━━━━━━━━━━━</div>
        <div style={{ fontSize: 96, fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 0.95, textTransform: 'uppercase', marginTop: 8, display: 'flex', alignItems: 'baseline', gap: 16 }}>
          637.4 <span style={{ fontSize: 28, fontWeight: 700 }}>KM</span>
          <span style={{ color: BR.hot, fontSize: 42, marginLeft: 20 }}>▲ 12%</span>
        </div>
        <div style={{ fontSize: 13, marginTop: 6 }}>10 rides · 4,120m climbed · 34h 13m in the saddle. More than last month. Less than next.</div>
      </div>
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1.2fr 1fr', overflow: 'hidden' }}>
        {/* left: ledger */}
        <div style={{ borderRight: '3px solid #0a0a0a', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ padding: '12px 28px', borderBottom: '3px solid #0a0a0a', fontSize: 11, letterSpacing: '0.15em', display: 'flex', justifyContent: 'space-between' }}>
            <span>▼ RECENT ACTIVITIES</span><span>10 RIDES</span>
          </div>
          <div style={{ flex: 1, overflow: 'auto' }}>
            {rides.map(([d, km, t, el, name], i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '100px 1fr 80px 70px 60px',
                gap: 10, padding: '14px 28px',
                borderBottom: '1px dashed #0a0a0a', alignItems: 'center',
                fontSize: 13, background: i % 2 === 0 ? 'transparent' : BR.soft,
              }}>
                <span style={{ fontSize: 11 }}>{d}</span>
                <span style={{ fontWeight: 700 }}>{name}</span>
                <span>{km}</span>
                <span>{t}</span>
                <span style={{ color: BR.hot, fontWeight: 700 }}>{el}</span>
              </div>
            ))}
          </div>
        </div>
        {/* right: breakdown */}
        <div style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: '0.15em' }}>▼ WEEKLY RHYTHM</div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 120, marginTop: 14, borderBottom: '3px solid #0a0a0a', paddingBottom: 2 }}>
              {bars.map((h, i) => (
                <div key={i} style={{ flex: 1, height: `${h}%`, background: h > 70 ? BR.hot : BR.ink }} />
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, marginTop: 4 }}>
              <span>15 WEEKS AGO</span><span>NOW</span>
            </div>
          </div>
          <div style={{ border: '3px solid #0a0a0a', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            {[['RUN', '14.1 km', '3 runs'], ['RIDE', '637.4 km', '10 rides']].map(([k, v, s], i) => (
              <div key={i} style={{ padding: '18px 20px', borderRight: i === 0 ? '3px solid #0a0a0a' : 'none' }}>
                <div style={{ fontSize: 11, letterSpacing: '0.15em' }}>{k}</div>
                <div style={{ fontSize: 36, fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1, marginTop: 6 }}>{v}</div>
                <div style={{ fontSize: 11, marginTop: 4, color: '#333' }}>{s}</div>
              </div>
            ))}
          </div>
          <div style={{ background: BR.ink, color: BR.bg, padding: '18px 20px' }}>
            <div style={{ fontSize: 11, letterSpacing: '0.15em' }}>GOAL · 2026</div>
            <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: '-0.03em', marginTop: 4 }}>8,000 KM BY DEC.</div>
            <div style={{ height: 10, background: 'rgba(255,255,255,0.15)', marginTop: 12, position: 'relative' }}>
              <div style={{ position: 'absolute', inset: 0, width: '32%', background: BR.hot }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 11 }}>
              <span>2,580 km</span><span>32%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── CONTENT ────────────────────────────────────────────────────
function V2Content() {
  const posts = [
    ['17/03/26', 'DEV', 'Summary', '4 min', true],
    ['27/07/25', 'DEV', '[Leetcode] 133. Clone Graph', '6 min'],
    ['24/07/25', 'DEV', '[Leetcode] 150. Evaluate Reverse Polish Notation', '5 min'],
    ['23/07/25', 'DEV', '[Leetcode] 739. Daily Temperatures', '4 min'],
    ['21/07/25', 'DEV', '[Leetcode] 297. Serialize and Deserialize Binary Tree', '8 min'],
    ['21/07/25', 'DEV', '[Leetcode] 236. Lowest Common Ancestor', '6 min'],
    ['20/07/25', 'PY3', '[python3] ASGI uv uvicorn pip Fastapi Pydantic', '10 min'],
    ['16/07/25', 'DEV', '[Leetcode] 117. Populating Next Right Pointers II', '5 min'],
    ['15/07/25', 'DEV', '[Leetcode] 116. Populating Next Right Pointers', '5 min'],
    ['14/07/25', 'DEV', '[Leetcode] 105. Construct Binary Tree from Preorder & Inorder', '7 min'],
    ['14/07/25', 'DEV', '[Leetcode] 106. Construct Binary Tree from Inorder & Postorder', '7 min'],
    ['13/07/25', 'DEV', 'Binary tree traversal DFS BFS', '9 min'],
  ];
  return (
    <div style={{
      width: 1440, height: 900, background: BR.bg, color: BR.ink,
      fontFamily: BR.font, display: 'flex', flexDirection: 'column', overflow: 'hidden',
    }}>
      <BrNav active="content" />
      <BrPageHead label="CONTENT / 47 POSTS" title="NOTES." sub="Dev notes, tips, snippets. Mostly leetcode, mostly python and typescript, sometimes life." />
      {/* tag filters */}
      <div style={{ padding: '14px 28px', borderBottom: '3px solid #0a0a0a', display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontSize: 11, letterSpacing: '0.15em', marginRight: 4 }}>FILTER:</span>
        {[['ALL', true, 47], ['DEV', false, 38], ['PY3', false, 6], ['LIFE', false, 3]].map(([k, on, n], i) => (
          <span key={i} style={{
            border: '2px solid #0a0a0a', padding: '4px 10px', fontSize: 11, fontWeight: 700,
            background: on ? BR.ink : 'transparent', color: on ? BR.bg : BR.ink,
          }}>{k} · {n}</span>
        ))}
        <div style={{ flex: 1 }} />
        <span style={{ fontSize: 11 }}>SORT: NEWEST FIRST ↓</span>
      </div>
      <div style={{ flex: 1, overflow: 'auto' }}>
        {posts.map(([d, cat, title, time, pinned], i) => (
          <div key={i} style={{
            display: 'grid', gridTemplateColumns: '100px 60px 1fr 80px 40px',
            gap: 16, padding: '14px 28px', alignItems: 'center',
            borderBottom: '1px solid #0a0a0a',
            background: pinned ? BR.hot : 'transparent',
            color: pinned ? 'white' : BR.ink, fontSize: 13,
          }}>
            <span style={{ fontSize: 11 }}>{d}</span>
            <span style={{ background: pinned ? 'white' : (cat === 'PY3' ? BR.hot : BR.ink), color: pinned ? BR.hot : 'white', textAlign: 'center', padding: '2px 0', fontSize: 10, fontWeight: 700 }}>{cat}</span>
            <span style={{ fontWeight: pinned ? 900 : 400 }}>{pinned && '★ '}{title}</span>
            <span style={{ fontSize: 11, textAlign: 'right' }}>{time}</span>
            <span style={{ textAlign: 'right' }}>↗</span>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { V2Landing, V2Projects, V2Gears, V2Strava, V2Content });
