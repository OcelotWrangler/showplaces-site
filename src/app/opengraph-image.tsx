import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Showplaces - the places worth going back to.";

const NAVY = "#12094e";
const DEEP = "#05021c";
const CYAN = "#22c7ec";
const SPRING = "#2ee6a8";
const FOREGROUND = "#e9eef8";

// The pin mark, inlined so the card builds with no network or asset reads.
const MARK = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 132" width="150" height="198">
  <defs>
    <linearGradient id="g" x1="0.15" y1="0" x2="0.6" y2="1">
      <stop offset="0%" stop-color="${CYAN}"/>
      <stop offset="100%" stop-color="${SPRING}"/>
    </linearGradient>
  </defs>
  <g fill="none" stroke="url(#g)" stroke-width="7" stroke-linecap="round" stroke-linejoin="round">
    <path d="M50 125.5c0 0-36-59.5-36-81.5a36 36 0 1 1 72 0c0 22-36 81.5-36 81.5z"/>
    <circle cx="50" cy="44" r="16"/>
  </g>
</svg>`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: `radial-gradient(circle at 50% 12%, ${NAVY} 0%, ${DEEP} 68%)`,
          color: FOREGROUND,
        }}
      >
        <img
          width={150}
          height={198}
          alt=""
          src={`data:image/svg+xml;base64,${Buffer.from(MARK).toString("base64")}`}
        />
        <div
          style={{
            fontSize: 96,
            fontWeight: 600,
            letterSpacing: -3,
            marginTop: 28,
          }}
        >
          Showplaces
        </div>
        <div style={{ fontSize: 38, color: SPRING, marginTop: 14 }}>
          The places worth going back to.
        </div>
        <div style={{ fontSize: 26, color: "#97a3c6", marginTop: 34 }}>
          In development · coming to iOS
        </div>
      </div>
    ),
    size,
  );
}
