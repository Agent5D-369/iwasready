import { useState } from "react";

const patterns = [
  {
    code: "F1",
    name: "Interpersonal\nConflict",
    plain: "The same argument keeps coming back in different forms.",
    color: "#C0392B",
    glow: "rgba(192,57,43,0.5)",
    angle: -90,
  },
  {
    code: "F2",
    name: "No Shared\nVision",
    plain: "People are doing the work but pulling in different directions.",
    color: "#D9A741",
    glow: "rgba(217,167,65,0.5)",
    angle: -90 + 360/7,
  },
  {
    code: "F3",
    name: "Governance\nShadows",
    plain: "Decisions happen in back channels. Nobody has the map.",
    color: "#7B68EE",
    glow: "rgba(123,104,238,0.5)",
    angle: -90 + (360/7)*2,
  },
  {
    code: "F4",
    name: "Financial\nFragility",
    plain: "The money conversation keeps getting deferred.",
    color: "#B87333",
    glow: "rgba(184,115,51,0.5)",
    angle: -90 + (360/7)*3,
  },
  {
    code: "F5",
    name: "Burnout &\nDepletion",
    plain: "Your most committed people are the closest to leaving.",
    color: "#E07B39",
    glow: "rgba(224,123,57,0.5)",
    angle: -90 + (360/7)*4,
  },
  {
    code: "F6",
    name: "Wrong-Fit\nPeople",
    plain: "Misaligned presence is costing more than absence would.",
    color: "#7AD1E2",
    glow: "rgba(122,209,226,0.5)",
    angle: -90 + (360/7)*5,
  },
  {
    code: "F7",
    name: "Scale\nTrap",
    plain: "What worked at one size is breaking at another.",
    color: "#A8C5A0",
    glow: "rgba(168,197,160,0.5)",
    angle: -90 + (360/7)*6,
  },
];

const toRad = (deg) => (deg * Math.PI) / 180;

export default function CollapseMap() {
  const [active, setActive] = useState(null);
  const [format, setFormat] = useState("square");

  const isSquare = format === "square";
  const W = isSquare ? 1080 : 1456;
  const H = isSquare ? 1080 : 816;
  const cx = W / 2;
  const cy = isSquare ? H / 2 : H / 2 + 20;
  const orbitR = isSquare ? 340 : 270;
  const nodeR = isSquare ? 72 : 60;
  const centerR = isSquare ? 52 : 42;

  const scale = isSquare ? 1 : 0.82;

  const nodePositions = patterns.map((p) => ({
    x: cx + orbitR * Math.cos(toRad(p.angle)),
    y: cy + orbitR * Math.sin(toRad(p.angle)),
  }));

  const activePattern = active !== null ? patterns[active] : null;

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "20px",
      background: "#0a0c14",
      minHeight: "100vh",
      padding: "32px 16px",
      fontFamily: "'Georgia', serif",
    }}>

      {/* Format Toggle */}
      <div style={{
        display: "flex",
        gap: "8px",
        background: "rgba(255,255,255,0.05)",
        borderRadius: "8px",
        padding: "4px",
      }}>
        {[["square", "1080×1080 Social"], ["wide", "1456×816 Substack"]].map(([val, label]) => (
          <button
            key={val}
            onClick={() => setFormat(val)}
            style={{
              background: format === val ? "rgba(122,209,226,0.2)" : "transparent",
              border: format === val ? "1px solid #7AD1E2" : "1px solid transparent",
              color: format === val ? "#7AD1E2" : "rgba(255,255,255,0.4)",
              padding: "6px 16px",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "12px",
              letterSpacing: "0.05em",
              transition: "all 0.2s",
            }}
          >{label}</button>
        ))}
      </div>

      {/* SVG Infographic */}
      <div style={{
        width: "100%",
        maxWidth: isSquare ? "600px" : "800px",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 0 80px rgba(122,209,226,0.1), 0 0 0 1px rgba(255,255,255,0.06)",
      }}>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          style={{ width: "100%", display: "block" }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Background gradient */}
            <radialGradient id="bgGrad" cx="50%" cy="50%" r="70%">
              <stop offset="0%" stopColor="#1A1F33" />
              <stop offset="100%" stopColor="#080A12" />
            </radialGradient>

            {/* Center gold glow */}
            <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#D9C37A" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#C4A84E" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#8B6914" stopOpacity="0" />
            </radialGradient>

            {/* Orbit ring */}
            <filter id="softGlow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>

            {/* Node glows */}
            {patterns.map((p, i) => (
              <radialGradient key={i} id={`nodeGrad${i}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={p.color} stopOpacity="0.25" />
                <stop offset="100%" stopColor={p.color} stopOpacity="0" />
              </radialGradient>
            ))}

            <filter id="nodeGlow">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>

            <filter id="centerGlowFilter">
              <feGaussianBlur stdDeviation="12" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Background */}
          <rect width={W} height={H} fill="url(#bgGrad)" />

          {/* Subtle star field */}
          {Array.from({length: 60}, (_, i) => {
            const sx = (i * 127 + 43) % W;
            const sy = (i * 89 + 17) % H;
            const sr = i % 3 === 0 ? 1.2 : 0.6;
            return (
              <circle key={i} cx={sx} cy={sy} r={sr}
                fill="white" opacity={0.15 + (i % 5) * 0.07} />
            );
          })}

          {/* Orbit ring */}
          <circle
            cx={cx} cy={cy} r={orbitR}
            fill="none"
            stroke="rgba(122,209,226,0.12)"
            strokeWidth="1"
            strokeDasharray="4 8"
          />

          {/* Connector lines from center to nodes */}
          {nodePositions.map((pos, i) => {
            const isAct = active === i;
            return (
              <line
                key={i}
                x1={cx} y1={cy}
                x2={pos.x} y2={pos.y}
                stroke={isAct ? patterns[i].color : "#7AD1E2"}
                strokeWidth={isAct ? 1.5 : 0.8}
                strokeOpacity={isAct ? 0.9 : 0.25}
                strokeDasharray={isAct ? "none" : "3 6"}
              />
            );
          })}

          {/* Node outer glow halos */}
          {nodePositions.map((pos, i) => (
            <circle
              key={i}
              cx={pos.x} cy={pos.y}
              r={nodeR + 24}
              fill={`url(#nodeGrad${i})`}
              opacity={active === i ? 1 : 0.4}
            />
          ))}

          {/* Center glow */}
          <circle cx={cx} cy={cy} r={centerR + 60}
            fill="url(#centerGlow)" opacity="0.3" filter="url(#centerGlowFilter)" />

          {/* Center circle */}
          <circle
            cx={cx} cy={cy} r={centerR}
            fill="#0E1224"
            stroke="#D9C37A"
            strokeWidth="2"
          />
          <circle
            cx={cx} cy={cy} r={centerR - 8}
            fill="none"
            stroke="#D9C37A"
            strokeWidth="0.5"
            strokeOpacity="0.4"
          />

          {/* Center text */}
          <text x={cx} y={cy - 10} textAnchor="middle"
            fill="#D9C37A" fontSize={isSquare ? 13 : 11}
            fontFamily="Georgia, serif" letterSpacing="0.15em">
            THE 7
          </text>
          <text x={cx} y={cy + 8} textAnchor="middle"
            fill="#D9C37A" fontSize={isSquare ? 13 : 11}
            fontFamily="Georgia, serif" letterSpacing="0.15em">
            COLLAPSE
          </text>
          <text x={cx} y={cy + 26} textAnchor="middle"
            fill="#D9C37A" fontSize={isSquare ? 13 : 11}
            fontFamily="Georgia, serif" letterSpacing="0.15em">
            PATTERNS
          </text>

          {/* Node circles + labels */}
          {nodePositions.map((pos, i) => {
            const p = patterns[i];
            const isAct = active === i;
            const lines = p.name.split("\n");

            return (
              <g key={i}
                style={{ cursor: "pointer" }}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
              >
                {/* Node bg */}
                <circle
                  cx={pos.x} cy={pos.y} r={nodeR}
                  fill="#0E1224"
                  stroke={p.color}
                  strokeWidth={isAct ? 2.5 : 1.5}
                  strokeOpacity={isAct ? 1 : 0.7}
                  filter={isAct ? "url(#nodeGlow)" : "none"}
                />

                {/* F-code */}
                <text
                  x={pos.x} y={pos.y - (lines.length > 1 ? 14 : 8)}
                  textAnchor="middle"
                  fill={p.color}
                  fontSize={isSquare ? 20 : 17}
                  fontFamily="Georgia, serif"
                  fontWeight="bold"
                  letterSpacing="0.05em"
                >
                  {p.code}
                </text>

                {/* Pattern name lines */}
                {lines.map((line, li) => (
                  <text
                    key={li}
                    x={pos.x}
                    y={pos.y + (lines.length > 1 ? 6 + li * 16 : 12)}
                    textAnchor="middle"
                    fill="rgba(248,247,244,0.85)"
                    fontSize={isSquare ? 11 : 9.5}
                    fontFamily="Georgia, serif"
                    letterSpacing="0.03em"
                  >
                    {line}
                  </text>
                ))}
              </g>
            );
          })}

          {/* Active pattern tooltip */}
          {activePattern && (() => {
            const pos = nodePositions[active];
            const tipW = isSquare ? 280 : 240;
            const tipH = 62;
            let tx = pos.x - tipW / 2;
            let ty = pos.y + nodeR + 14;
            if (tx < 20) tx = 20;
            if (tx + tipW > W - 20) tx = W - tipW - 20;
            if (ty + tipH > H - 20) ty = pos.y - nodeR - tipH - 14;

            return (
              <g>
                <rect
                  x={tx} y={ty} width={tipW} height={tipH}
                  rx="6"
                  fill="rgba(14,18,36,0.95)"
                  stroke={activePattern.color}
                  strokeWidth="1"
                  strokeOpacity="0.5"
                />
                <foreignObject x={tx + 12} y={ty + 10} width={tipW - 24} height={tipH - 20}>
                  <div xmlns="http://www.w3.org/1999/xhtml" style={{
                    color: "rgba(248,247,244,0.8)",
                    fontSize: isSquare ? "11px" : "10px",
                    fontFamily: "Georgia, serif",
                    lineHeight: "1.5",
                  }}>
                    {activePattern.plain}
                  </div>
                </foreignObject>
              </g>
            );
          })()}

          {/* Title block */}
          <text
            x={cx}
            y={isSquare ? 72 : 56}
            textAnchor="middle"
            fill="rgba(248,247,244,0.9)"
            fontSize={isSquare ? 28 : 22}
            fontFamily="Georgia, serif"
            letterSpacing="0.12em"
          >
            STOPPING THE COLLAPSE
          </text>
          <text
            x={cx}
            y={isSquare ? 100 : 80}
            textAnchor="middle"
            fill="rgba(122,209,226,0.7)"
            fontSize={isSquare ? 13 : 11}
            fontFamily="Georgia, serif"
            letterSpacing="0.2em"
          >
            FIELD DIAGNOSTIC · SEVEN STRUCTURAL FAILURE MODES
          </text>

          {/* Divider line under title */}
          <line
            x1={cx - 180} y1={isSquare ? 114 : 92}
            x2={cx + 180} y2={isSquare ? 114 : 92}
            stroke="rgba(217,195,122,0.25)" strokeWidth="0.5"
          />

          {/* Footer */}
          <text
            x={cx}
            y={H - (isSquare ? 36 : 28)}
            textAnchor="middle"
            fill="rgba(248,247,244,0.3)"
            fontSize={isSquare ? 12 : 10}
            fontFamily="Georgia, serif"
            letterSpacing="0.15em"
          >
            StopTheCollapse.com · Rick Broider (Omja Brhad)
          </text>
          <line
            x1={cx - 180} y1={H - (isSquare ? 50 : 40)}
            x2={cx + 180} y2={H - (isSquare ? 50 : 40)}
            stroke="rgba(217,195,122,0.15)" strokeWidth="0.5"
          />
        </svg>
      </div>

      {/* Legend below */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "10px",
        width: "100%",
        maxWidth: "800px",
      }}>
        {patterns.map((p, i) => (
          <div
            key={i}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
              padding: "10px 14px",
              borderRadius: "8px",
              background: active === i ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.02)",
              border: `1px solid ${active === i ? p.color : "rgba(255,255,255,0.06)"}`,
              cursor: "default",
              transition: "all 0.2s",
            }}
          >
            <div style={{
              width: "10px", height: "10px",
              borderRadius: "50%",
              background: p.color,
              flexShrink: 0,
              marginTop: "4px",
              boxShadow: active === i ? `0 0 8px ${p.color}` : "none",
            }} />
            <div>
              <div style={{
                color: p.color,
                fontSize: "11px",
                fontFamily: "Georgia, serif",
                letterSpacing: "0.1em",
                marginBottom: "2px",
              }}>{p.code}</div>
              <div style={{
                color: "rgba(248,247,244,0.8)",
                fontSize: "12px",
                fontFamily: "Georgia, serif",
                lineHeight: "1.4",
              }}>{p.name.replace("\n", " ")}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{
        color: "rgba(255,255,255,0.2)",
        fontSize: "11px",
        fontFamily: "Georgia, serif",
        letterSpacing: "0.1em",
        textAlign: "center",
      }}>
        Hover any node to reveal the pattern signal
      </div>
    </div>
  );
}
