// V2 Gears — detailed: hero bike + ride system grid (helmet, pedals, computer) + maintenance log

function V2GearsDetailed({ accent = BR.hot, accentName = 'HOT RED' }) {
  const HOT = accent;
  return (
    <div style={{
      width: 1440, height: 900, background: BR.bg, color: BR.ink,
      fontFamily: BR.font, display: 'flex', flexDirection: 'column', overflow: 'hidden',
    }}>
      <BrNav active="gears" />
      {/* compact head with counts */}
      <div style={{ padding: '18px 28px 14px', borderBottom: '3px solid #0a0a0a', display: 'flex', alignItems: 'flex-end', gap: 40 }}>
        <div>
          <div style={{ fontSize: 11, letterSpacing: '0.2em' }}>━━ GEARS / THE RIDE SYSTEM ━━━━━━━━━━</div>
          <div style={{ fontSize: 72, fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 0.95, textTransform: 'uppercase', marginTop: 8 }}>WHAT I RIDE.</div>
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex', gap: 0, border: '3px solid #0a0a0a' }}>
          {[['4', 'ITEMS'], ['14,200', 'KM'], ['2016', 'SINCE']].map(([v, k], i, a) => (
            <div key={i} style={{ padding: '12px 18px', borderRight: i < a.length - 1 ? '3px solid #0a0a0a' : 'none', textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 900, lineHeight: 1, letterSpacing: '-0.03em' }}>{v}</div>
              <div style={{ fontSize: 10, marginTop: 4, letterSpacing: '0.12em' }}>{k}</div>
            </div>
          ))}
        </div>
      </div>

      {/* HERO bike + specs */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.25fr 1fr', borderBottom: '3px solid #0a0a0a', flexShrink: 0 }}>
        <div style={{
          borderRight: '3px solid #0a0a0a', position: 'relative',
          background: BR.bg, height: 340,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <img src="assets/bike.png" alt="Merida Scultura 100" style={{ maxWidth: '85%', maxHeight: '90%', objectFit: 'contain' }} />
          <div style={{ position: 'absolute', top: 14, left: 16, fontSize: 10, letterSpacing: '0.15em' }}>◎ 01 / FRAME</div>
          <div style={{ position: 'absolute', bottom: 14, left: 16, fontSize: 10, letterSpacing: '0.15em' }}>MERIDA · TAIWAN</div>
          <div style={{ position: 'absolute', top: 14, right: 16, fontSize: 10, letterSpacing: '0.15em' }}>BOUGHT USED · 2020</div>
        </div>
        <div style={{ padding: '20px 26px' }}>
          <div style={{ display: 'inline-block', border: '2px solid #0a0a0a', padding: '3px 10px', fontSize: 11, fontWeight: 700 }}>ROAD BIKE</div>
          <div style={{ fontSize: 48, fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 0.95, marginTop: 10 }}>SCULTURA 100</div>
          <div style={{ fontSize: 13, marginTop: 4 }}>Merida · 2016</div>
          <div style={{ fontSize: 11, marginTop: 10, lineHeight: 1.55, maxWidth: 400 }}>
            Entry aluminium road bike. Not fast. Not light. But it climbs Bukhansan without complaining, and it's carried me 14,200 km.
          </div>
          <div style={{ marginTop: 14, border: '2.5px solid #0a0a0a' }}>
            {[['FRAME', 'Aluminium 6061'], ['GROUPSET', 'Shimano Sora 9-spd'], ['WHEELS', 'Merida Sport'], ['WEIGHT', '9.8 kg'], ['KM ON IT', '14,200']].map(([k, v], j, a) => (
              <div key={j} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: j < a.length - 1 ? '1.5px solid #0a0a0a' : 'none' }}>
                <div style={{ padding: '6px 12px', borderRight: '1.5px solid #0a0a0a', fontSize: 10, letterSpacing: '0.1em' }}>{k}</div>
                <div style={{ padding: '6px 12px', fontSize: 12, fontWeight: 700 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ACCESSORIES ROW */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', overflow: 'hidden' }}>
        {[
          { n: '02', tag: 'HELMET', name: 'VELOCE', brand: 'Crnk · Trend Changer', img: 'assets/helmet.png', specs: [['WEIGHT', '280 g'], ['VENTS', '18'], ['SIZE', 'M/L']] },
          { n: '03', tag: 'PEDALS', name: 'PD-RS500', brand: 'Shimano SPD-SL', img: 'assets/pedal.png', specs: [['SYSTEM', 'SPD-SL'], ['WEIGHT', '310 g/pair'], ['SINCE', '2022']] },
          { n: '04', tag: 'COMPUTER', name: 'GEOID NAV', brand: 'Bike GPS', img: 'assets/computer.png', specs: [['BATTERY', '20 h'], ['MAPS', 'OSM turn-by-turn'], ['SINCE', '2024']] },
        ].map((g, i) => (
          <div key={i} style={{ borderRight: i < 2 ? '3px solid #0a0a0a' : 'none', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{
              flex: 1, position: 'relative', borderBottom: '3px solid #0a0a0a',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: BR.bg, minHeight: 0,
            }}>
              <img src={g.img} alt={g.name} style={{ maxWidth: '70%', maxHeight: '80%', objectFit: 'contain' }} />
              <div style={{ position: 'absolute', top: 12, left: 14, fontSize: 10, letterSpacing: '0.15em' }}>◎ {g.n} / {g.tag}</div>
            </div>
            <div style={{ padding: '12px 18px' }}>
              <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1 }}>{g.name}</div>
              <div style={{ fontSize: 11, marginTop: 3 }}>{g.brand}</div>
              <div style={{ marginTop: 8, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', border: '2px solid #0a0a0a' }}>
                {g.specs.map(([k, v], j, a) => (
                  <div key={j} style={{ padding: '5px 6px', borderRight: j < a.length - 1 ? '1.5px solid #0a0a0a' : 'none' }}>
                    <div style={{ fontSize: 8, letterSpacing: '0.1em' }}>{k}</div>
                    <div style={{ fontSize: 11, fontWeight: 700, marginTop: 1 }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* maintenance / wishlist strip */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', borderTop: '3px solid #0a0a0a', flexShrink: 0 }}>
        <div style={{ padding: '12px 28px', borderRight: '3px solid #0a0a0a' }}>
          <div style={{ fontSize: 10, letterSpacing: '0.18em', marginBottom: 6 }}>▼ MAINTENANCE LOG</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6, fontSize: 11 }}>
            {[['CHAIN', '420 km ago'], ['TIRES', '2,100 km ago'], ['BAR TAPE', '180 km ago'], ['SERVICE', '03/26']].map(([k, v], j) => (
              <div key={j}><b>{k}</b> · {v}</div>
            ))}
          </div>
        </div>
        <div style={{ padding: '12px 20px', background: HOT, color: 'white', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ fontSize: 10, letterSpacing: '0.15em' }}>WISHLIST · NEXT → <span style={{ opacity: .7 }}>· ACCENT: {accentName}</span></div>
          <div style={{ fontSize: 16, fontWeight: 900, flex: 1 }}>CARBON ENDURANCE FRAME</div>
        </div>
      </div>
    </div>
  );
}

// Mobile variant
function M2GearsDetailed() {
  const items = [
    { n: '01', tag: 'ROAD BIKE', name: 'Scultura 100', brand: 'Merida · 2016', img: 'assets/bike.png', specs: [['FRAME', 'Alu 6061'], ['GROUP', 'Sora 9s'], ['WT', '9.8 kg'], ['KM', '14,200']] },
    { n: '02', tag: 'HELMET', name: 'Veloce', brand: 'Crnk · Trend Changer', img: 'assets/helmet.png', specs: [['WT', '280 g'], ['VENTS', '18'], ['SIZE', 'M/L']] },
    { n: '03', tag: 'PEDALS', name: 'PD-RS500', brand: 'Shimano SPD-SL', img: 'assets/pedal.png', specs: [['SYS', 'SPD-SL'], ['WT', '310 g'], ['YR', '2022']] },
    { n: '04', tag: 'COMPUTER', name: 'Geoid Nav', brand: 'Bike GPS', img: 'assets/computer.png', specs: [['BAT', '20 h'], ['MAPS', 'OSM'], ['YR', '2024']] },
  ];
  return (
    <div style={{ height: '100%', background: BR.bg, color: BR.ink, fontFamily: BR.font, display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: 54 }} />
      <BrNav active="gears" mobile />
      <div style={{ padding: '16px 16px 12px', borderBottom: '2.5px solid #0a0a0a' }}>
        <div style={{ fontSize: 10, letterSpacing: '0.18em' }}>━ GEARS / 4 ITEMS ━━━━━</div>
        <div style={{ fontSize: 46, fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 0.95, textTransform: 'uppercase', marginTop: 6 }}>WHAT I RIDE.</div>
      </div>
      <div style={{ flex: 1, overflow: 'auto' }}>
        {items.map((g, i) => (
          <div key={i} style={{ borderBottom: '2.5px solid #0a0a0a' }}>
            <div style={{
              height: 160, borderBottom: '2px solid #0a0a0a',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: BR.bg, position: 'relative',
            }}>
              <img src={g.img} alt={g.name} style={{ maxWidth: '72%', maxHeight: '85%', objectFit: 'contain' }} />
              <div style={{ position: 'absolute', top: 8, left: 12, fontSize: 9, letterSpacing: '0.15em' }}>◎ {g.n} / {g.tag}</div>
            </div>
            <div style={{ padding: 14 }}>
              <div style={{ display: 'inline-block', border: '1.5px solid #0a0a0a', padding: '1px 6px', fontSize: 9, fontWeight: 700 }}>{g.tag}</div>
              <div style={{ fontSize: 26, fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1, marginTop: 6 }}>{g.name}</div>
              <div style={{ fontSize: 11, marginTop: 2 }}>{g.brand}</div>
              <div style={{ marginTop: 8, display: 'grid', gridTemplateColumns: `repeat(${g.specs.length}, 1fr)`, border: '1.5px solid #0a0a0a' }}>
                {g.specs.map(([k, v], j, a) => (
                  <div key={j} style={{ padding: '4px 6px', borderRight: j < a.length - 1 ? '1px solid #0a0a0a' : 'none' }}>
                    <div style={{ fontSize: 8, letterSpacing: '0.1em' }}>{k}</div>
                    <div style={{ fontSize: 11, fontWeight: 700, marginTop: 1 }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
        <div style={{ padding: '12px 16px', background: BR.hot, color: 'white' }}>
          <div style={{ fontSize: 9, letterSpacing: '0.15em' }}>WISHLIST · NEXT</div>
          <div style={{ fontSize: 16, fontWeight: 900, marginTop: 2 }}>CARBON ENDURANCE FRAME.</div>
        </div>
      </div>
    </div>
  );
}

// Accent theming helper — wraps a gears page with a one-line accent override.
function AccentTheme({ accent, children }) {
  // Overrides BR.hot at runtime via CSS var; simpler: re-render by passing accent through a React context.
  return (
    <div style={{ '--accent': accent }}>
      <style>{`
        [data-accent-scope] [style*="rgb(255, 59, 0)"],
        [data-accent-scope] [style*="${BR.hot}"] { }
      `}</style>
      <div data-accent-scope>{children}</div>
    </div>
  );
}

Object.assign(window, { V2GearsDetailed, M2GearsDetailed });
