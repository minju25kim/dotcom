// V2 Brutalist — Mobile routes

function M2Landing() {
  return (
    <div style={{ height: '100%', background: BR.bg, color: BR.ink, fontFamily: BR.font, display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: 54 }} />
      <BrNav active="home" mobile />
      <div style={{ flex: 1, overflow: 'auto' }}>
        <div style={{ padding: '20px 16px 16px' }}>
          <div style={{ fontSize: 10, letterSpacing: '0.18em' }}>━ WHO / 01 ━━━━━━━━━━━</div>
          <div style={{ fontSize: 46, fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 0.95, textTransform: 'uppercase', marginTop: 8 }}>
            I BUILD<br/>
            <span style={{ background: BR.ink, color: BR.bg, padding: '0 4px', marginLeft: -4 }}>THINGS</span><br/>
            THAT <span style={{ color: BR.hot }}>MOVE</span>.
          </div>
          <div style={{ fontSize: 12, lineHeight: 1.55, marginTop: 12 }}>
            Software engineer in Seoul. Ride 600+ km a month, ship code for the other 22 hours. Currently on <b>bikelog</b> + <b>cutter.ai</b>.
          </div>
          <div style={{ display: 'flex', border: '2.5px solid #0a0a0a', marginTop: 14 }}>
            <a style={{ padding: '10px 12px', background: BR.ink, color: BR.bg, fontWeight: 700, fontSize: 12, flex: 1, textAlign: 'center' }}>→ THE WORK</a>
            <a href={`mailto:${BR.email}`} style={{ padding: '10px 12px', borderLeft: '2.5px solid #0a0a0a', fontSize: 12, flex: 1, textAlign: 'center' }}>email ↗</a>
          </div>
        </div>
        <div style={{ padding: '10px 16px 4px', fontSize: 10, letterSpacing: '0.18em' }}>━ PROOF / 02 ━━━━━━━━━</div>
        <div style={{ margin: '8px 16px', border: '2.5px solid #0a0a0a', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {[['637', 'KM/MO', BR.hot], ['47', 'POSTS', null], ['10', 'RIDES', null]].map(([big, small, bg], i) => (
            <div key={i} style={{ padding: '12px 8px', borderRight: i < 2 ? '2.5px solid #0a0a0a' : 'none', background: bg || 'transparent', color: bg ? 'white' : BR.ink }}>
              <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1 }}>{big}</div>
              <div style={{ fontSize: 9, marginTop: 4, letterSpacing: '0.08em' }}>{small}</div>
            </div>
          ))}
        </div>
        <BrMarquee text="SHIPPING / BIKELOG · CUTTER.AI / 637 KM · HIRING? MINJU25KIM@GMAIL.COM /" />
        <div style={{ padding: '14px 16px 4px', fontSize: 10, letterSpacing: '0.18em' }}>━ NOW / 03 ━━━━━━━━━━━</div>
        {[
          ['01', 'BIKELOG', 'Smarter ride journal. TS · Mapbox.'],
          ['02', 'CUTTER.AI', 'Video editing via transcript. Py.'],
        ].map(([n, name, desc], i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '32px 1fr auto', gap: 8, padding: '10px 16px', borderTop: '1px solid #0a0a0a', alignItems: 'baseline' }}>
            <div style={{ fontSize: 18, fontWeight: 900 }}>{n}</div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 900, letterSpacing: '-0.02em' }}>{name}</div>
              <div style={{ fontSize: 11, marginTop: 2 }}>{desc}</div>
            </div>
            <span style={{ fontSize: 14 }}>↗</span>
          </div>
        ))}
        <div style={{ padding: '14px 16px 4px', fontSize: 10, letterSpacing: '0.18em' }}>━ FIND / 04 ━━━━━━━━━━</div>
        <div style={{ padding: '4px 16px 20px', display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {['GITHUB', 'INSTAGRAM', 'YOUTUBE', 'STRAVA'].map((k) => (
            <div key={k} style={{ border: '2px solid #0a0a0a', padding: '5px 8px', fontSize: 10 }}><b>{k}</b> @minju25kim ↗</div>
          ))}
        </div>
      </div>
    </div>
  );
}

function M2Projects() {
  return (
    <div style={{ height: '100%', background: BR.bg, color: BR.ink, fontFamily: BR.font, display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: 54 }} />
      <BrNav active="projects" mobile />
      <div style={{ padding: '18px 16px 14px', borderBottom: '2.5px solid #0a0a0a' }}>
        <div style={{ fontSize: 10, letterSpacing: '0.18em' }}>━ PROJECTS ━━━━━━━━━━━</div>
        <div style={{ fontSize: 54, fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 0.95, textTransform: 'uppercase', marginTop: 6 }}>THE WORK.</div>
      </div>
      <div style={{ flex: 1, overflow: 'auto' }}>
        {[
          { n: '01', name: 'BIKELOG', status: 'WIP', desc: 'Ride journal. Strava + mapbox + notes.', stack: ['TS', 'NEXT', 'MAPBOX'], bg: BR.hot },
          { n: '02', name: 'CUTTER.AI', status: 'LAB', desc: 'Edit video via transcript. Whisper + ffmpeg.', stack: ['PYTHON', 'WHISPER'], bg: null },
          { n: '03', name: 'MINJU25KIM.DEV', status: 'LIVE', desc: 'This site. Fast, honest, static.', stack: ['ASTRO', 'CF'], bg: null },
        ].map((p, i) => (
          <div key={i} style={{ borderBottom: '2.5px solid #0a0a0a', background: p.bg || 'transparent', color: p.bg ? 'white' : BR.ink }}>
            <div style={{ padding: '16px', display: 'flex', alignItems: 'baseline', gap: 10 }}>
              <div style={{ fontSize: 28, fontWeight: 900 }}>{p.n}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 26, fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1 }}>{p.name}</div>
                <div style={{ fontSize: 11, marginTop: 6 }}>{p.desc}</div>
                <div style={{ display: 'flex', gap: 4, marginTop: 8, flexWrap: 'wrap' }}>
                  {p.stack.map((s) => (
                    <span key={s} style={{ border: `1.5px solid ${p.bg ? 'white' : BR.ink}`, padding: '2px 6px', fontSize: 9 }}>{s}</span>
                  ))}
                </div>
              </div>
              <div style={{ fontSize: 9, background: p.bg ? 'white' : BR.ink, color: p.bg ? BR.hot : BR.bg, padding: '2px 6px', fontWeight: 700 }}>{p.status}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function M2Gears() {
  return (
    <div style={{ height: '100%', background: BR.bg, color: BR.ink, fontFamily: BR.font, display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: 54 }} />
      <BrNav active="gears" mobile />
      <div style={{ padding: '18px 16px 14px', borderBottom: '2.5px solid #0a0a0a' }}>
        <div style={{ fontSize: 10, letterSpacing: '0.18em' }}>━ GEARS ━━━━━━━━━━━━━</div>
        <div style={{ fontSize: 54, fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 0.95, textTransform: 'uppercase', marginTop: 6 }}>WHAT I RIDE.</div>
      </div>
      <div style={{ flex: 1, overflow: 'auto' }}>
        <div style={{
          height: 180, borderBottom: '2.5px solid #0a0a0a',
          background: `repeating-linear-gradient(45deg, ${BR.bg} 0 10px, ${BR.soft} 10px 20px)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
        }}>
          <div style={{ background: BR.bg, border: '2px solid #0a0a0a', padding: '8px 14px', fontSize: 10, fontWeight: 700 }}>
            [ BIKE PHOTO ]
          </div>
          <div style={{ position: 'absolute', top: 10, left: 12, fontSize: 9, letterSpacing: '0.15em' }}>◎ 01</div>
        </div>
        <div style={{ padding: 16 }}>
          <div style={{ display: 'inline-block', border: '2px solid #0a0a0a', padding: '2px 8px', fontSize: 10, fontWeight: 700 }}>ROAD BIKE</div>
          <div style={{ fontSize: 36, fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 0.95, marginTop: 10 }}>Scultura 100</div>
          <div style={{ fontSize: 12, marginTop: 4 }}>Merida · 2016</div>
          <div style={{ fontSize: 11, marginTop: 12, lineHeight: 1.55 }}>Entry road bike. Bought used. Paid for itself in commutes.</div>
          <div style={{ marginTop: 16, border: '2.5px solid #0a0a0a' }}>
            {[['FRAME', 'Aluminium'], ['GROUPSET', 'Shimano Sora'], ['WEIGHT', '9.8 kg'], ['KM ON IT', '14,200']].map(([k, v], j, a) => (
              <div key={j} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: j < a.length - 1 ? '1.5px solid #0a0a0a' : 'none' }}>
                <div style={{ padding: '8px 12px', borderRight: '1.5px solid #0a0a0a', fontSize: 10, letterSpacing: '0.1em' }}>{k}</div>
                <div style={{ padding: '8px 12px', fontSize: 12, fontWeight: 700 }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 14, padding: '10px 14px', background: BR.hot, color: 'white' }}>
            <div style={{ fontSize: 9, letterSpacing: '0.15em' }}>WISHLIST · NEXT</div>
            <div style={{ fontSize: 15, fontWeight: 900, marginTop: 2 }}>CARBON ENDURANCE.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function M2Strava() {
  const bars = [20, 35, 48, 28, 62, 38, 72, 58, 90, 54, 46, 68, 82, 40, 55];
  return (
    <div style={{ height: '100%', background: BR.bg, color: BR.ink, fontFamily: BR.font, display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: 54 }} />
      <BrNav active="strava" mobile />
      <div style={{ padding: '18px 16px 14px', borderBottom: '2.5px solid #0a0a0a' }}>
        <div style={{ fontSize: 10, letterSpacing: '0.18em' }}>━ STRAVA / APR '26 ━━━━</div>
        <div style={{ fontSize: 56, fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 0.95, marginTop: 8, display: 'flex', alignItems: 'baseline', gap: 8 }}>
          637<span style={{ fontSize: 18, fontWeight: 700 }}>KM</span>
        </div>
        <div style={{ fontSize: 11, color: BR.hot, fontWeight: 700, marginTop: 2 }}>▲ 12% vs last month</div>
      </div>
      <div style={{ flex: 1, overflow: 'auto' }}>
        <div style={{ padding: 16, borderBottom: '2.5px solid #0a0a0a' }}>
          <div style={{ fontSize: 10, letterSpacing: '0.15em' }}>▼ 15-WEEK RHYTHM</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 70, marginTop: 10, borderBottom: '2px solid #0a0a0a', paddingBottom: 1 }}>
            {bars.map((h, i) => (
              <div key={i} style={{ flex: 1, height: `${h}%`, background: h > 70 ? BR.hot : BR.ink }} />
            ))}
          </div>
        </div>
        <div style={{ borderBottom: '2.5px solid #0a0a0a', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
          {[['RUN', '14.1 km', '3 runs'], ['RIDE', '637 km', '10 rides']].map(([k, v, s], i) => (
            <div key={i} style={{ padding: '14px', borderRight: i === 0 ? '2.5px solid #0a0a0a' : 'none' }}>
              <div style={{ fontSize: 10, letterSpacing: '0.15em' }}>{k}</div>
              <div style={{ fontSize: 24, fontWeight: 900, letterSpacing: '-0.03em', marginTop: 4 }}>{v}</div>
              <div style={{ fontSize: 10, marginTop: 2 }}>{s}</div>
            </div>
          ))}
        </div>
        <div style={{ padding: '10px 16px', fontSize: 10, letterSpacing: '0.15em', borderBottom: '2px solid #0a0a0a' }}>▼ RECENT</div>
        {[
          ['04/05', 'Bukhansan loop', '86.0km', '↑420m'],
          ['04/01', 'Han river east', '34.8km', '↑73m'],
          ['04/01', 'Evening spin', '21.6km', '↑32m'],
          ['03/28', 'Chuncheon century', '133.7km', '↑543m'],
          ['03/21', 'Seoul grand park', '72.4km', '↑310m'],
        ].map(([d, name, km, el], i) => (
          <div key={i} style={{ padding: '10px 16px', borderBottom: '1px dashed #0a0a0a', display: 'grid', gridTemplateColumns: '44px 1fr auto auto', gap: 8, fontSize: 11, alignItems: 'center' }}>
            <span>{d}</span>
            <span style={{ fontWeight: 700 }}>{name}</span>
            <span>{km}</span>
            <span style={{ color: BR.hot, fontWeight: 700, marginLeft: 6 }}>{el}</span>
          </div>
        ))}
        <div style={{ margin: 16, padding: 14, background: BR.ink, color: BR.bg }}>
          <div style={{ fontSize: 10, letterSpacing: '0.15em' }}>GOAL · 2026</div>
          <div style={{ fontSize: 20, fontWeight: 900, marginTop: 4 }}>8,000 KM BY DEC.</div>
          <div style={{ height: 8, background: 'rgba(255,255,255,0.15)', marginTop: 10, position: 'relative' }}>
            <div style={{ position: 'absolute', inset: 0, width: '32%', background: BR.hot }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, fontSize: 10 }}>
            <span>2,580 km</span><span>32%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function M2Content() {
  const posts = [
    ['17/03/26', 'DEV', 'Summary', true],
    ['27/07/25', 'DEV', '[Leetcode] 133. Clone Graph'],
    ['24/07/25', 'DEV', '[Leetcode] 150. Evaluate RPN'],
    ['23/07/25', 'DEV', '[Leetcode] 739. Daily Temperatures'],
    ['21/07/25', 'DEV', '[Leetcode] 297. Serialize Binary Tree'],
    ['21/07/25', 'DEV', '[Leetcode] 236. Lowest Common Ancestor'],
    ['20/07/25', 'PY3', '[python3] ASGI Fastapi Pydantic'],
    ['16/07/25', 'DEV', '[Leetcode] 117. Next Right Pointers II'],
    ['15/07/25', 'DEV', '[Leetcode] 116. Next Right Pointers'],
    ['14/07/25', 'DEV', '[Leetcode] 105. Tree from Preorder'],
  ];
  return (
    <div style={{ height: '100%', background: BR.bg, color: BR.ink, fontFamily: BR.font, display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: 54 }} />
      <BrNav active="content" mobile />
      <div style={{ padding: '18px 16px 14px', borderBottom: '2.5px solid #0a0a0a' }}>
        <div style={{ fontSize: 10, letterSpacing: '0.18em' }}>━ CONTENT / 47 ━━━━━━━</div>
        <div style={{ fontSize: 54, fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 0.95, textTransform: 'uppercase', marginTop: 6 }}>NOTES.</div>
      </div>
      <div style={{ padding: '10px 16px', borderBottom: '2px solid #0a0a0a', display: 'flex', gap: 4, overflow: 'auto' }}>
        {[['ALL', true, 47], ['DEV', false, 38], ['PY3', false, 6], ['LIFE', false, 3]].map(([k, on, n], i) => (
          <span key={i} style={{ border: '1.5px solid #0a0a0a', padding: '3px 8px', fontSize: 10, fontWeight: 700, background: on ? BR.ink : 'transparent', color: on ? BR.bg : BR.ink, whiteSpace: 'nowrap' }}>{k}·{n}</span>
        ))}
      </div>
      <div style={{ flex: 1, overflow: 'auto' }}>
        {posts.map(([d, cat, title, pinned], i) => (
          <div key={i} style={{
            padding: '12px 16px', borderBottom: '1px solid #0a0a0a',
            display: 'grid', gridTemplateColumns: '36px 1fr 18px', gap: 8, alignItems: 'center',
            background: pinned ? BR.hot : 'transparent', color: pinned ? 'white' : BR.ink,
          }}>
            <span style={{ background: pinned ? 'white' : (cat === 'PY3' ? BR.hot : BR.ink), color: pinned ? BR.hot : 'white', textAlign: 'center', padding: '1px 0', fontSize: 9, fontWeight: 700 }}>{cat}</span>
            <div>
              <div style={{ fontSize: 12, fontWeight: pinned ? 900 : 500, lineHeight: 1.3 }}>{pinned && '★ '}{title}</div>
              <div style={{ fontSize: 10, marginTop: 2, opacity: pinned ? 0.85 : 0.6 }}>{d}</div>
            </div>
            <span style={{ fontSize: 12 }}>↗</span>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { M2Landing, M2Projects, M2Gears, M2Strava, M2Content });
