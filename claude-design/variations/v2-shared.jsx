// V2 Brutalist — shared styles + primitives

const BR = {
  bg: '#f4f1ea',
  ink: '#0a0a0a',
  hot: '#ff3b00',
  soft: '#e8e2d1',
  email: 'minju25kim@gmail.com',
  font: '"JetBrains Mono", "SF Mono", Menlo, monospace',
};

function BrNav({ active = 'home', mobile = false }) {
  const items = ['Projects', 'Gears', 'Strava', 'Content'];
  const pad = mobile ? '10px 16px' : '14px 28px';
  const gap = mobile ? 8 : 24;
  return (
    <div style={{
      borderBottom: '3px solid #0a0a0a',
      padding: pad,
      display: 'flex', alignItems: 'center',
      gap, fontSize: mobile ? 11 : 13,
      background: '#f4f1ea',
      flexShrink: 0,
    }}>
      <div style={{ fontWeight: 900, fontSize: mobile ? 14 : 16 }}>[mk]</div>
      {!mobile && <div style={{ flex: 1 }}>MINJU KIM / SOFTWARE ENGINEER / SEOUL, KR</div>}
      {mobile && <div style={{ flex: 1 }} />}
      {!mobile && items.map((x) => (
        <a key={x} style={{
          padding: '4px 10px',
          background: active === x.toLowerCase() ? '#0a0a0a' : 'transparent',
          color: active === x.toLowerCase() ? '#f4f1ea' : '#0a0a0a',
          textDecoration: active === x.toLowerCase() ? 'none' : 'underline',
          textUnderlineOffset: 3,
        }}>{x}</a>
      ))}
      <a href={`mailto:${BR.email}`} style={{
        padding: mobile ? '3px 8px' : '4px 10px',
        background: BR.hot, color: 'white', fontWeight: 700,
        fontSize: mobile ? 10 : 13,
      }}>● AVAILABLE</a>
    </div>
  );
}

function BrPageHead({ label, title, sub, big = true }) {
  return (
    <div style={{ padding: '22px 28px 18px', borderBottom: '3px solid #0a0a0a' }}>
      <div style={{ fontSize: 11, letterSpacing: '0.2em' }}>━━ {label} ━━━━━━━━━━━━━━━━━━━━━━━━━━━</div>
      <div style={{
        fontSize: big ? 96 : 56, fontWeight: 900,
        letterSpacing: '-0.05em', lineHeight: 0.95,
        textTransform: 'uppercase', marginTop: 8,
      }}>{title}</div>
      {sub && <div style={{ marginTop: 10, fontSize: 13, maxWidth: 620 }}>{sub}</div>}
    </div>
  );
}

function BrFooter({ mobile = false }) {
  return (
    <div style={{
      borderTop: '3px solid #0a0a0a',
      padding: mobile ? '14px 16px' : '18px 28px',
      display: 'flex', alignItems: 'center', gap: mobile ? 10 : 20,
      fontSize: mobile ? 10 : 12,
      background: '#0a0a0a', color: '#f4f1ea',
      flexShrink: 0,
    }}>
      <div style={{ fontWeight: 900 }}>[mk]</div>
      <div>© 2026 MINJU KIM</div>
      <div style={{ flex: 1 }} />
      {!mobile && <div>{BR.email}</div>}
      <div>↗ GH · IG · YT · STRAVA</div>
    </div>
  );
}

function BrMarquee({ text }) {
  return (
    <div style={{
      background: '#0a0a0a', color: '#f4f1ea',
      padding: '8px 0', borderBottom: '3px solid #0a0a0a',
      fontSize: 13, fontWeight: 700, overflow: 'hidden', whiteSpace: 'nowrap',
      flexShrink: 0,
    }}>
      <div style={{ display: 'inline-block', animation: 'marq 30s linear infinite' }}>
        {text}&nbsp;&nbsp;&nbsp;{text}&nbsp;&nbsp;&nbsp;
      </div>
    </div>
  );
}

window.BR = BR;
window.BrNav = BrNav;
window.BrPageHead = BrPageHead;
window.BrFooter = BrFooter;
window.BrMarquee = BrMarquee;
