// V1 · Terminal / tmux dev-core
// The site as a tmux/terminal workspace. Four panes, status bar,
// typed boot message. All monospace.

function V1Terminal() {
  const [typed, setTyped] = React.useState('');
  const fullText = "hi, i'm minju. developer in seoul. i ride bikes & ship software.";
  React.useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      i++;
      setTyped(fullText.slice(0, i));
      if (i >= fullText.length) clearInterval(t);
    }, 28);
    return () => clearInterval(t);
  }, []);

  const [time, setTime] = React.useState(new Date());
  React.useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const hhmm = time.toTimeString().slice(0, 5);

  const S = {
    shell: {
      width: 1440, height: 900,
      background: '#0e1116',
      color: '#c9d1d9',
      fontFamily: '"JetBrains Mono", "SF Mono", Menlo, monospace',
      fontSize: 13,
      lineHeight: 1.6,
      display: 'flex', flexDirection: 'column',
      position: 'relative', overflow: 'hidden',
    },
    titleBar: {
      height: 28, background: '#161b22',
      borderBottom: '1px solid #21262d',
      display: 'flex', alignItems: 'center',
      padding: '0 12px', gap: 8,
      fontSize: 11, color: '#8b949e',
      flexShrink: 0,
    },
    dot: (c) => ({ width: 11, height: 11, borderRadius: '50%', background: c }),
    grid: {
      flex: 1, display: 'grid',
      gridTemplateColumns: '1.1fr 1fr',
      gridTemplateRows: '1.15fr 1fr',
      gap: 1, background: '#21262d',
    },
    pane: {
      background: '#0e1116',
      padding: '14px 18px',
      overflow: 'hidden',
      position: 'relative',
      display: 'flex', flexDirection: 'column',
    },
    paneHead: {
      fontSize: 10, letterSpacing: '0.1em',
      color: '#6e7681', marginBottom: 10,
      display: 'flex', justifyContent: 'space-between',
    },
    prompt: { color: '#7ee787' },
    user: { color: '#79c0ff' },
    comment: { color: '#6e7681' },
    string: { color: '#a5d6ff' },
    kw: { color: '#ff7b72' },
    accent: { color: '#d2a8ff' },
    fn: { color: '#d29922' },
    statusBar: {
      height: 24, background: '#1f6feb',
      color: 'white', fontSize: 11,
      display: 'flex', alignItems: 'center',
      padding: '0 10px', gap: 10,
      flexShrink: 0,
    },
    tag: (bg) => ({
      background: bg, padding: '1px 8px',
      marginRight: 4,
    }),
  };

  const rides = [
    ['2026-04-05', '86.0 km', '4h 25m', '↑420m'],
    ['2026-04-01', '34.8 km', '2h 02m', '↑73m'],
    ['2026-04-01', '21.6 km', '1h 18m', '↑32m'],
    ['2026-03-28', '133.7 km', '7h 19m', '↑543m'],
  ];

  const leetcode = [
    ['133', 'Clone Graph', 'medium'],
    ['150', 'Evaluate Reverse Polish Notation', 'medium'],
    ['739', 'Daily Temperatures', 'medium'],
    ['297', 'Serialize and Deserialize Binary Tree', 'hard'],
    ['236', 'Lowest Common Ancestor', 'medium'],
  ];

  return (
    <div style={S.shell}>
      {/* title bar */}
      <div style={S.titleBar}>
        <div style={S.dot('#ff5f56')} />
        <div style={S.dot('#ffbd2e')} />
        <div style={S.dot('#27c93f')} />
        <div style={{ flex: 1, textAlign: 'center' }}>
          minju@mbp: ~/minju25kim — tmux (80×24)
        </div>
        <div>{hhmm}</div>
      </div>

      {/* four panes */}
      <div style={S.grid}>
        {/* pane: intro / boot */}
        <div style={S.pane}>
          <div style={S.paneHead}>
            <span>[0] ~/about</span><span>● running</span>
          </div>
          <div>
            <div><span style={S.comment}>{'// booted '}{new Date().toISOString().slice(0, 10)}</span></div>
            <div style={{ marginTop: 4 }}>
              <span style={S.prompt}>$ </span>
              <span style={S.fn}>whoami</span>
            </div>
            <div style={{ marginLeft: 2, color: '#e6edf3' }}>minju25kim</div>

            <div style={{ marginTop: 10 }}>
              <span style={S.prompt}>$ </span>
              <span style={S.fn}>cat</span> <span style={S.string}>./intro.txt</span>
            </div>
            <div style={{ marginTop: 4, color: '#e6edf3', fontSize: 18, lineHeight: 1.35, letterSpacing: '-0.01em', maxWidth: 560 }}>
              {typed}<span style={{ background: '#c9d1d9', color: '#0e1116' }}>&nbsp;</span>
            </div>

            <div style={{ marginTop: 22 }}>
              <span style={S.prompt}>$ </span>
              <span style={S.fn}>ls</span> <span style={{ color: '#ffa657' }}>-la</span> ./socials/
            </div>
            <div style={{ marginTop: 6, display: 'grid', gridTemplateColumns: 'auto auto auto 1fr', columnGap: 16, rowGap: 2, fontSize: 12 }}>
              {[
                ['drwxr-xr-x', '@minju25kim', 'github.com',  '→ /minju25kim'],
                ['drwxr-xr-x', '@minju25kim', 'instagram',   '→ /minju25kim'],
                ['drwxr-xr-x', '@minju25kim', 'youtube',     '→ /@minju25kim'],
                ['drwxr-xr-x', '@minju25kim', 'strava',      '→ /athletes/minju25kim'],
              ].map(([perm, u, h, p], i) => (
                <React.Fragment key={i}>
                  <span style={S.comment}>{perm}</span>
                  <span style={S.user}>{u}</span>
                  <span style={S.accent}>{h}</span>
                  <span style={{ color: '#e6edf3' }}>{p}</span>
                </React.Fragment>
              ))}
            </div>

            <div style={{ marginTop: 22 }}>
              <span style={S.prompt}>$ </span>
              <span style={{ color: '#e6edf3' }}>_</span>
              <span className="cursor-blink" style={{ display: 'inline-block', width: 8, height: 14, background: '#e6edf3', verticalAlign: 'middle', marginLeft: 2 }} />
            </div>
          </div>
        </div>

        {/* pane: projects / now */}
        <div style={S.pane}>
          <div style={S.paneHead}>
            <span>[1] ~/now</span><span>● building</span>
          </div>
          <div>
            <div style={S.comment}>{'/* currently shipping */'}</div>

            <div style={{ marginTop: 10, paddingLeft: 14, borderLeft: '2px solid #f78166' }}>
              <div><span style={S.kw}>project</span> <span style={S.fn}>bikelog</span> {'{'}</div>
              <div style={{ paddingLeft: 14 }}>
                <div><span style={S.accent}>status</span>: <span style={S.string}>"in progress"</span>,</div>
                <div><span style={S.accent}>stack</span>: [<span style={S.string}>"ts"</span>, <span style={S.string}>"strava api"</span>, <span style={S.string}>"mapbox"</span>],</div>
                <div><span style={S.accent}>why</span>: <span style={S.string}>"every ride is a story"</span></div>
              </div>
              <div>{'}'}</div>
            </div>

            <div style={{ marginTop: 14, paddingLeft: 14, borderLeft: '2px solid #a5d6ff' }}>
              <div><span style={S.kw}>project</span> <span style={S.fn}>cutter.ai</span> {'{'}</div>
              <div style={{ paddingLeft: 14 }}>
                <div><span style={S.accent}>status</span>: <span style={S.string}>"prototyping"</span>,</div>
                <div><span style={S.accent}>stack</span>: [<span style={S.string}>"ffmpeg"</span>, <span style={S.string}>"whisper"</span>, <span style={S.string}>"python"</span>],</div>
                <div><span style={S.accent}>why</span>: <span style={S.string}>"edit video at the speed of thought"</span></div>
              </div>
              <div>{'}'}</div>
            </div>

            <div style={{ marginTop: 14, color: '#6e7681' }}>
              <span style={S.prompt}>{'>'} </span>
              <span>git log --oneline | head -3</span>
            </div>
            <div style={{ marginTop: 4, fontSize: 12 }}>
              <div><span style={{ color: '#d29922' }}>a1f3c0d</span> <span style={{ color: '#e6edf3' }}>fix: gpx elevation smoothing</span></div>
              <div><span style={{ color: '#d29922' }}>c44e892</span> <span style={{ color: '#e6edf3' }}>feat: strava webhook</span></div>
              <div><span style={{ color: '#d29922' }}>7b019a2</span> <span style={{ color: '#e6edf3' }}>chore: bump deps</span></div>
            </div>
          </div>
        </div>

        {/* pane: strava */}
        <div style={S.pane}>
          <div style={S.paneHead}>
            <span>[2] ~/strava · week 17</span><span style={{ color: '#f78166' }}>▲ 12%</span>
          </div>
          <div style={{ display: 'flex', gap: 28, marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 10, color: '#6e7681', letterSpacing: '0.12em' }}>RUN</div>
              <div style={{ fontSize: 28, color: '#e6edf3', letterSpacing: '-0.02em' }}>14.1<span style={{ fontSize: 14, color: '#6e7681' }}> km</span></div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: '#6e7681', letterSpacing: '0.12em' }}>RIDE</div>
              <div style={{ fontSize: 28, color: '#7ee787', letterSpacing: '-0.02em' }}>637.4<span style={{ fontSize: 14, color: '#6e7681' }}> km</span></div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: '#6e7681', letterSpacing: '0.12em' }}>CLIMB</div>
              <div style={{ fontSize: 28, color: '#e6edf3', letterSpacing: '-0.02em' }}>4,120<span style={{ fontSize: 14, color: '#6e7681' }}> m</span></div>
            </div>
          </div>

          {/* ascii sparkline */}
          <div style={{ color: '#7ee787', fontSize: 11, lineHeight: 1, marginBottom: 12, letterSpacing: '-0.03em' }}>
            ▁▃▂▅▇▃▂▁▄▆█▅▃▂▁▅▇▆▄▂▃▅▇▆▃▂▁▃▅▇
          </div>

          <div style={S.comment}>{'// recent rides'}</div>
          <div style={{ marginTop: 6, fontSize: 12 }}>
            {rides.map(([d, km, t, el], i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '92px 70px 60px 58px', gap: 10, padding: '3px 0', borderBottom: i < rides.length - 1 ? '1px dashed #21262d' : 'none' }}>
                <span style={S.comment}>{d}</span>
                <span style={{ color: '#e6edf3' }}>{km}</span>
                <span style={S.accent}>{t}</span>
                <span style={{ color: '#f78166' }}>{el}</span>
              </div>
            ))}
          </div>
        </div>

        {/* pane: content / leetcode */}
        <div style={S.pane}>
          <div style={S.paneHead}>
            <span>[3] ~/content · tail -f</span><span>47 posts</span>
          </div>
          <div style={S.comment}>{'// dev notes, tips, snippets'}</div>
          <div style={{ marginTop: 8, fontSize: 12 }}>
            {leetcode.map(([id, title, diff], i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '36px 50px 1fr 60px', gap: 10, padding: '5px 0', borderBottom: i < leetcode.length - 1 ? '1px solid #161b22' : 'none', alignItems: 'center' }}>
                <span style={S.comment}>{String(i + 1).padStart(2, '0')}</span>
                <span style={{ color: '#d29922' }}>[{id}]</span>
                <span style={{ color: '#e6edf3', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{title}</span>
                <span style={{
                  color: diff === 'hard' ? '#ff7b72' : diff === 'medium' ? '#d29922' : '#7ee787',
                  fontSize: 10, textAlign: 'right',
                }}>{diff}</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 14 }}>
            <span style={S.prompt}>$ </span>
            <span style={{ color: '#e6edf3' }}>curl minju25kim.dev/rss.xml</span>
          </div>
        </div>
      </div>

      {/* status bar */}
      <div style={S.statusBar}>
        <span style={S.tag('#0d3b66')}>NORMAL</span>
        <span>~/minju25kim</span>
        <span style={{ flex: 1, color: 'rgba(255,255,255,.7)' }}>main ✓</span>
        <span style={{ color: 'rgba(255,255,255,.7)' }}>utf-8</span>
        <span style={{ color: 'rgba(255,255,255,.7)' }}>{hhmm} KST</span>
        <span style={S.tag('#0d3b66')}>100%</span>
      </div>
    </div>
  );
}

window.V1Terminal = V1Terminal;
