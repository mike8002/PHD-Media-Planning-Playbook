import { useState, useEffect, useRef } from "react";

const SECTIONS = [
  { id: "overview", label: "Overview", icon: "📋" },
  { id: "planning", label: "Planning Process", icon: "🗺️" },
  { id: "platforms", label: "Platform Selection", icon: "📱" },
  { id: "framework", label: "Media Framework", icon: "📊" },
  { id: "formats", label: "High Impact Formats", icon: "⚡" },
  { id: "budget", label: "Budget & Channel Mix", icon: "💰" },
  { id: "measurement", label: "Measurement & KPIs" },
  { id: "updates", label: "Platform Updates", icon: "🔄" },
  { id: "caveats", label: "Caveats & Risks", icon: "⚠️" },
  { id: "checklist", label: "Pre-Launch QA", icon: "✅" },
  { id: "mistakes", label: "Common Mistakes", icon: "🚫" },
  { id: "programmatic", label: "Programmatic Deep Dive", icon: "🖥️" },
  { id: "vendors", label: "Vendor Landscape", icon: "🏢" },
  { id: "creativespecs", label: "Creative Specs", icon: "🎨" },
  { id: "divider", label: "─── TOOLS ───", icon: "" },
  { id: "budgetcalc", label: "Budget Calculator", icon: "🧮" },
  { id: "creativegen", label: "Creative Generator", icon: "🖼️" },
  { id: "comparison", label: "Platform Compare", icon: "⚖️" },
  { id: "heatmap", label: "CPM Heatmap", icon: "🗓️" },
  { id: "benchmark", label: "Benchmark Tracker", icon: "📈" },
  { id: "glossary", label: "KPI Glossary", icon: "📖" },
];


const PhoneMockup = ({ ratio, label, dims, color: bgColor = "#e8e0f0", children: overlay }) => (
  <div style={{ width: 85, display: "inline-flex", flexDirection: "column", alignItems: "center" }}>
    <div style={{ width: 75, background: "#f0f0f4", borderRadius: 12, border: "1.5px solid #d0d0d8", padding: "5px 4px" }}>
      <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#d0d0d8", margin: "0 auto 3px" }} />
      <div style={{ display: "flex", alignItems: "center", gap: 2, marginBottom: 3 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#e0e0e8" }} />
        <div style={{ height: 2, flex: 1, background: "#e0e0e8", borderRadius: 1 }} />
      </div>
      <div style={{ width: "100%", paddingBottom: ratio === "9:16" ? "160%" : ratio === "4:5" ? "125%" : "100%", background: `linear-gradient(135deg, ${bgColor}, #f9f9fb)`, borderRadius: 3, position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", color: "#444455", fontSize: 7, fontWeight: 700, textAlign: "center", padding: 2 }}>
          {overlay || <><span style={{ color: "#2D1768" }}>{ratio}</span><span style={{ fontSize: 6 }}>{dims}</span></>}
        </div>
      </div>
      {ratio !== "9:16" && <div style={{ height: 2, background: "#e0e0e8", borderRadius: 1, margin: "3px 8px 1px", width: "50%" }} />}
      <div style={{ width: 16, height: 2, borderRadius: 8, background: "#d0d0d8", margin: "3px auto 1px" }} />
    </div>
    <div style={{ fontSize: 10, color: "#333344", marginTop: 6, fontWeight: 600, textAlign: "center", lineHeight: 1.2 }}>{label}</div>
  </div>
);
const BannerMockup = ({ w, h, label }) => (
  <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center" }}>
    <div style={{ width: Math.min(w/4, 90), height: Math.max(h/4, 14), background: "#e8e6ee", borderRadius: 2, border: "1px dashed #c0c0cc", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 7, color: "#b8860b", fontWeight: 600 }}>{w}x{h}</div>
    <div style={{ fontSize: 9, color: "#333344", marginTop: 4, fontWeight: 600 }}>{label}</div>
  </div>
);
const ScreenMockup = ({ type, label, children: overlay }) => (
  <div style={{ width: 100, display: "inline-flex", flexDirection: "column", alignItems: "center" }}>
    <div style={{ width: "100%", background: "#f0f0f4", borderRadius: type === "tv" ? 4 : 6, border: type === "tv" ? "2.5px solid #d0d0d8" : "1.5px solid #d0d0d8", overflow: "hidden" }}>
      {type === "browser" && <div style={{ display: "flex", gap: 2, padding: "2px 4px", background: "#ffffff", borderBottom: "1px solid #e0e0e8" }}>{["#ff5f57","#febc2e","#28c840"].map((c,i) => <div key={i} style={{ width: 3, height: 3, borderRadius: "50%", background: c }} />)}</div>}
      <div style={{ paddingBottom: type === "tv" ? "56%" : "65%", background: "#e8e6ee", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", fontSize: 7, color: "#444455", fontWeight: 600 }}>{overlay}</div>
      </div>
    </div>
    {type === "tv" && <><div style={{ width: 14, height: 4, background: "#d0d0d8", margin: "0 auto" }} /><div style={{ width: 30, height: 2, background: "#e0e0e8", margin: "0 auto" }} /></>}
    <div style={{ fontSize: 10, color: "#333344", marginTop: 5, fontWeight: 600, textAlign: "center" }}>{label}</div>
  </div>
);
const platformMockups = {
  "Meta (Facebook + Instagram)": () => (<div style={{ display: "contents" }}><PhoneMockup ratio="1:1" label="Feed 1:1" dims="1080x1080" /><PhoneMockup ratio="4:5" label="Feed 4:5" dims="1080x1350" color="#ede8f5" /><PhoneMockup ratio="9:16" label="Stories" dims="1080x1920" color="#ede8f5"><span style={{color:"#c07eff"}}>9:16</span><span style={{fontSize:5,color:"#ff7e7e"}}>Safe zones</span></PhoneMockup><PhoneMockup ratio="9:16" label="Reels" dims="1080x1920" color="#ede8f5"><span style={{color:"#c07eff"}}>9:16</span><span style={{fontSize:5}}>Hook 2s</span></PhoneMockup><PhoneMockup ratio="1:1" label="Carousel" dims="1080x1080"><span style={{color:"#7eb8ff"}}>1:1</span><span style={{fontSize:5}}>2-10 cards</span></PhoneMockup><ScreenMockup type="browser" label="Desktop Feed"><span style={{color:"#7eb8ff"}}>16:9 / 1:1</span></ScreenMockup></div>),
  "TikTok": () => (<div style={{ display: "contents" }}><PhoneMockup ratio="9:16" label="In-Feed" dims="1080x1920" color="#ede8f5"><span style={{color:"#c07eff"}}>9:16</span><span style={{fontSize:5}}>Sound ON</span><span style={{fontSize:5,color:"#ffcb7e"}}>Hook 2s</span></PhoneMockup><PhoneMockup ratio="9:16" label="TopView" dims="1080x1920" color="#ede8f5"><span style={{color:"#c07eff"}}>9:16</span><span style={{fontSize:5}}>App Open</span></PhoneMockup><PhoneMockup ratio="9:16" label="Spark Ads" dims="Creator post" color="#ede8f5"><span style={{color:"#7effb8"}}>UGC</span><span style={{fontSize:5}}>70% CTR</span></PhoneMockup><PhoneMockup ratio="9:16" label="Brand Takeover" dims="Full screen" color="#ede8f5"><span style={{color:"#ff7e7e"}}>3-5s</span><span style={{fontSize:5}}>1/day</span></PhoneMockup></div>),
  "Snapchat": () => (<div style={{ display: "contents" }}><PhoneMockup ratio="9:16" label="Snap Ad" dims="1080x1920"><span style={{color:"#ffcb7e"}}>9:16</span><span style={{fontSize:5}}>Swipe Up</span></PhoneMockup><PhoneMockup ratio="9:16" label="Story Ads" dims="3-20 Snaps" color="#ede8f5"><span style={{color:"#c07eff"}}>9:16</span><span style={{fontSize:5}}>Multi-Snap</span></PhoneMockup><PhoneMockup ratio="9:16" label="Commercial" dims="6s non-skip" color="#ede8f5"><span style={{color:"#7effb8"}}>6s</span><span style={{fontSize:5}}>Non-skip</span></PhoneMockup><PhoneMockup ratio="9:16" label="Sponsored Snap" dims="Chat inbox" color="#ede8f5"><span style={{color:"#ffcb7e"}}>Inbox</span><span style={{fontSize:5}}>NEW</span></PhoneMockup><PhoneMockup ratio="1:1" label="AR Lens" dims="Camera" color="#ede8f5"><span style={{fontSize:8}}>&#x1f52e;</span><span style={{fontSize:5}}>AR/AI</span></PhoneMockup></div>),
  "YouTube / Google Video": () => (<div style={{ display: "contents" }}><ScreenMockup type="browser" label="TrueView (skip)"><span style={{color:"#7eb8ff"}}>16:9</span><span style={{fontSize:5}}>Skip 5s</span></ScreenMockup><ScreenMockup type="browser" label="Non-Skip 15-20s"><span style={{color:"#ff7e7e"}}>16:9</span><span style={{fontSize:5}}>Must watch</span></ScreenMockup><ScreenMockup type="browser" label="Bumper 6s"><span style={{color:"#ffcb7e"}}>16:9</span><span style={{fontSize:5}}>6s</span></ScreenMockup><PhoneMockup ratio="9:16" label="Shorts" dims="1080x1920"><span style={{color:"#c07eff"}}>9:16</span><span style={{fontSize:5}}>Vertical</span></PhoneMockup><ScreenMockup type="tv" label="CTV / Masthead"><span style={{color:"#c07eff"}}>16:9</span><span style={{fontSize:5}}>HD/4K</span></ScreenMockup></div>),
  "Google Performance Max": () => (<div style={{ display: "contents" }}><ScreenMockup type="browser" label="Search"><span style={{color:"#7eb8ff"}}>Text</span><span style={{fontSize:5}}>Auto</span></ScreenMockup><ScreenMockup type="browser" label="Display/Gmail"><span style={{color:"#ffcb7e"}}>Multi</span><span style={{fontSize:5}}>AI combo</span></ScreenMockup><PhoneMockup ratio="9:16" label="Shorts/Video" dims="AI selects"><span style={{color:"#c07eff"}}>Auto</span></PhoneMockup><ScreenMockup type="browser" label="Shopping"><span style={{color:"#7effb8"}}>Feed</span><span style={{fontSize:5}}>Products</span></ScreenMockup></div>),
  "LinkedIn": () => (<div style={{ display: "contents" }}><PhoneMockup ratio="1:1" label="Feed Image" dims="1080x1080"><span style={{color:"#7eb8ff"}}>1:1</span></PhoneMockup><PhoneMockup ratio="4:5" label="Feed Video" dims="Captions!"><span style={{color:"#ffcb7e"}}>1:1/16:9</span><span style={{fontSize:5}}>Muted</span></PhoneMockup><PhoneMockup ratio="4:5" label="Document Ad" dims="PDF pages" color="#ede8f5"><span style={{fontSize:7}}>&#x1f4c4;</span><span style={{fontSize:5}}>Swipe</span></PhoneMockup><PhoneMockup ratio="1:1" label="InMail" dims="300x250" color="#ede8f5"><span style={{fontSize:7}}>&#x2709;&#xfe0f;</span></PhoneMockup></div>),
  "X (Twitter)": () => (<div style={{ display: "contents" }}><PhoneMockup ratio="1:1" label="Promoted Ad" dims="1080x1080"><span style={{color:"#7eb8ff"}}>1:1</span></PhoneMockup><PhoneMockup ratio="4:5" label="Video Ad" dims="1920x1080"><span style={{color:"#ffcb7e"}}>16:9</span><span style={{fontSize:5}}>Muted</span></PhoneMockup><PhoneMockup ratio="1:1" label="Website Card" dims="CTA button" color="#ede8f5"><span style={{color:"#7effb8"}}>1.91:1</span><span style={{fontSize:5}}>+CTA</span></PhoneMockup><ScreenMockup type="browser" label="Trend Takeover"><span style={{color:"#ff7e7e"}}>&#x1f525;</span><span style={{fontSize:5}}>$20K-55K</span></ScreenMockup></div>),
  "Pinterest": () => (<div style={{ display: "contents" }}><PhoneMockup ratio="4:5" label="Standard Pin" dims="1000x1500" color="#ede8f5"><span style={{color:"#ffcb7e"}}>2:3</span></PhoneMockup><PhoneMockup ratio="9:16" label="Max-Width Video" dims="Full width" color="#ede8f5"><span style={{color:"#c07eff"}}>9:16</span><span style={{fontSize:5}}>Full screen</span></PhoneMockup><PhoneMockup ratio="1:1" label="Shopping" dims="Product grid" color="#ede8f5"><span style={{color:"#7effb8"}}>1:1</span><span style={{fontSize:5}}>Catalogue</span></PhoneMockup></div>),
  "Programmatic (Display, CTV, DOOH, Audio)": () => (<div style={{ display: "contents" }}><BannerMockup w={300} h={250} label="MPU" /><BannerMockup w={728} h={90} label="Leaderboard" /><BannerMockup w={160} h={600} label="Skyscraper" /><BannerMockup w={320} h={50} label="Mobile" /><ScreenMockup type="tv" label="CTV 16:9"><span style={{color:"#c07eff"}}>15-30s</span><span style={{fontSize:5}}>Sound ON</span></ScreenMockup><ScreenMockup type="browser" label="Native"><span style={{color:"#7effb8"}}>In-content</span></ScreenMockup></div>),
};


const PlatformLogo = ({ platform, size = 18 }) => {
  const logos = {
    "Meta": <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M12 2C6.48 2 2 6.48 2 12c0 5 3.68 9.13 8.44 9.88v-6.99H7.9v-2.89h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.45 2.89h-2.33v6.99C18.32 21.13 22 17 22 12c0-5.52-4.48-10-10-10z" fill="#1877F2"/></svg>,
    "TikTok": <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.8.1V9.01a6.27 6.27 0 00-.8-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.8a8.18 8.18 0 004.76 1.52V6.87a4.84 4.84 0 01-1-.18z" fill="#1a1a2e"/></svg>,
    "Snapchat": <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M12.21 2c2.72.04 4.76 1.3 5.95 3.68.42.84.56 1.74.56 2.67 0 .7-.07 1.4-.12 2.1-.02.22.04.33.25.42.42.18.84.37 1.24.59.56.3.82.78.68 1.2-.14.4-.56.66-1.12.66-.28 0-.56-.07-.84-.18-.34-.14-.66-.18-.92.04-.56.46-1.18.82-1.86 1.06-.14.04-.22.12-.26.28-.18.66-.52 1.2-1.04 1.64-.84.72-1.82 1-2.92 1s-2.08-.28-2.92-1c-.52-.44-.86-.98-1.04-1.64-.04-.16-.12-.24-.26-.28-.68-.24-1.3-.6-1.86-1.06-.26-.22-.58-.18-.92-.04-.28.11-.56.18-.84.18-.56 0-.98-.26-1.12-.66-.14-.42.12-.9.68-1.2.4-.22.82-.41 1.24-.59.21-.09.27-.2.25-.42-.05-.7-.12-1.4-.12-2.1 0-.93.14-1.83.56-2.67C5.45 3.3 7.49 2.04 10.21 2h2z" fill="#FFFC00" stroke="#1a1a2e" strokeWidth=".5"/></svg>,
    "YouTube": <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M23.5 6.19a3.02 3.02 0 00-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.55A3.02 3.02 0 00.5 6.19 31.56 31.56 0 000 12a31.56 31.56 0 00.5 5.81 3.02 3.02 0 002.12 2.14c1.88.55 9.38.55 9.38.55s7.5 0 9.38-.55a3.02 3.02 0 002.12-2.14A31.56 31.56 0 0024 12a31.56 31.56 0 00-.5-5.81z" fill="#FF0000"/><path d="M9.54 15.5V8.5L15.5 12l-5.96 3.5z" fill="#fff"/></svg>,
    "Google": <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.1a6.94 6.94 0 010-4.2V7.06H2.18A11.96 11.96 0 001 12c0 1.94.46 3.77 1.18 5.44l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>,
    "LinkedIn": <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#0A66C2"/><path d="M7.5 9.5v8h-2.5v-8h2.5zm-1.25-1.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zM19 17.5h-2.5v-3.9c0-1-.02-2.3-1.4-2.3-1.4 0-1.6 1.1-1.6 2.2v4h-2.5v-8h2.4v1.1h.03c.33-.63 1.15-1.3 2.37-1.3 2.53 0 3 1.67 3 3.83v4.37z" fill="#fff"/></svg>,
    "X": <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M18.24 2.25h3.45l-7.53 8.61L23 21.75h-6.93l-5.43-7.1-6.22 7.1H1l8.06-9.21L.75 2.25h7.11l4.91 6.49 5.47-6.49zm-1.21 17.52h1.91L7.12 4.2H5.08l11.95 15.57z" fill="#1a1a2e"/></svg>,
    "Pinterest": <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.25 2.64 7.88 6.36 9.34-.09-.79-.17-2 .03-2.87.18-.78 1.17-4.97 1.17-4.97s-.3-.6-.3-1.48c0-1.39.8-2.42 1.8-2.42.85 0 1.26.64 1.26 1.4 0 .85-.54 2.12-.82 3.3-.23.99.5 1.79 1.47 1.79 1.77 0 3.12-1.86 3.12-4.55 0-2.38-1.71-4.04-4.15-4.04-2.83 0-4.49 2.12-4.49 4.31 0 .85.33 1.77.74 2.27.08.1.09.19.07.29-.08.31-.25 1-.28 1.14-.05.19-.15.23-.35.14-1.31-.61-2.13-2.52-2.13-4.06 0-3.31 2.41-6.35 6.94-6.35 3.64 0 6.47 2.6 6.47 6.07 0 3.62-2.28 6.53-5.45 6.53-1.06 0-2.07-.55-2.41-1.21l-.66 2.5c-.24.91-.88 2.06-1.31 2.76.99.3 2.04.47 3.12.47 5.52 0 10-4.48 10-10S17.52 2 12 2z" fill="#E60023"/></svg>,
    "Programmatic": <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><rect x="2" y="3" width="20" height="14" rx="2" stroke="#2D1768" strokeWidth="2" fill="none"/><path d="M8 21h8M12 17v4" stroke="#2D1768" strokeWidth="2" strokeLinecap="round"/><circle cx="7" cy="10" r="1.5" fill="#7AC143"/><circle cx="12" cy="10" r="1.5" fill="#2D1768"/><circle cx="17" cy="10" r="1.5" fill="#7AC143"/></svg>,
  };
  return logos[platform] || null;
};

const Chip = ({ children, color = "blue" }) => {
  const colors = {
    blue: { bg: "#e8e0f0", text: "#2D1768", border: "#d0c0e0" },
    green: { bg: "#e0f0e8", text: "#2a8c3e", border: "#c0e0d0" },
    amber: { bg: "#f0e8d8", text: "#b8860b", border: "#e0d8c0" },
    red: { bg: "#f0e0e0", text: "#cc3333", border: "#e0c0c0" },
    purple: { bg: "#ece0f5", text: "#6a1b9a", border: "#d8c0e8" },
    teal: { bg: "#e0f0f0", text: "#1a8a8a", border: "#c0e0e0" },
  };
  const c = colors[color] || colors.blue;
  return (
    <span style={{ display: "inline-block", padding: "2px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, background: c.bg, color: c.text, border: `1px solid ${c.border}`, marginRight: 6, marginBottom: 4 }}>
      {children}
    </span>
  );
};

const Card = ({ children, style, onClick, hoverable }) => {
  const [hov, setHov] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov && hoverable ? "#f0f0f8" : "#ffffff",
        border: "1px solid #e0e0e8",
        borderRadius: 12,
        padding: 20,
        marginBottom: 14,
        cursor: onClick ? "pointer" : "default",
        transition: "all .2s",
        transform: hov && hoverable ? "translateY(-1px)" : "none",
        boxShadow: hov && hoverable ? "0 4px 20px rgba(0,0,0,.06)" : "none",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

const Accordion = ({ title, subtitle, children, defaultOpen, badge }) => {
  const [open, setOpen] = useState(defaultOpen || false);
  return (
    <Card hoverable onClick={() => setOpen(!open)} style={{ cursor: "pointer" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#1a1a2e", display: "flex", alignItems: "center", gap: 8 }}>
            {title} {badge}
          </div>
          {subtitle && <div style={{ fontSize: 12, color: "#5a5a6e", marginTop: 3 }}>{subtitle}</div>}
        </div>
        <div style={{ fontSize: 18, color: "#7a7a8a", transition: "transform .2s", transform: open ? "rotate(180deg)" : "none" }}>▾</div>
      </div>
      {open && <div onClick={e => e.stopPropagation()} style={{ marginTop: 16, borderTop: "1px solid #e0e0e8", paddingTop: 16, cursor: "default" }}>{children}</div>}
    </Card>
  );
};

const InfoRow = ({ label, value }) => (
  <div style={{ display: "flex", gap: 8, marginBottom: 8, fontSize: 13 }}>
    <span style={{ color: "#5a5a6e", fontWeight: 600, minWidth: 130, flexShrink: 0 }}>{label}</span>
    <span style={{ color: "#333344" }}>{value}</span>
  </div>
);

const SectionTitle = ({ children }) => (
  <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1a1a2e", marginBottom: 6, fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.02em", borderLeft: "3px solid #7AC143", paddingLeft: 12 }}>{children}</h2>
);

const SectionDesc = ({ children }) => (
  <p style={{ fontSize: 13, color: "#5a5a6e", marginBottom: 24, lineHeight: 1.6 }}>{children}</p>
);

const CheckItem = ({ children, checked, onChange }) => (
  <div
    onClick={() => onChange && onChange(!checked)}
    style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "8px 12px", borderRadius: 8, cursor: "pointer", background: checked ? "#f0faf5" : "transparent", marginBottom: 4, transition: "background .15s" }}
  >
    <div style={{ width: 18, height: 18, borderRadius: 4, border: checked ? "none" : "2px solid #d0d0d8", background: checked ? "#7AC143" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1, fontSize: 11, color: "#fff", fontWeight: 800 }}>
      {checked ? "✓" : ""}
    </div>
    <span style={{ fontSize: 13, color: checked ? "#2a8c3e" : "#1a1a2e", textDecoration: checked ? "line-through" : "none", lineHeight: 1.5 }}>{children}</span>
  </div>
);

const SearchBar = ({ value, onChange }) => (
  <div style={{ position: "relative", marginBottom: 0 }}>
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder="Search playbook..."
      style={{ width: "100%", padding: "10px 16px 10px 38px", background: "#ffffff", border: "1px solid #e0e0e8", borderRadius: 10, color: "#1a1a2e", fontSize: 13, outline: "none", fontFamily: "inherit", boxSizing: "border-box" }}
    />
    <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 14, opacity: .5 }}>🔍</span>
  </div>
);

const ProgressBar = ({ value, max, color = "#3b82f6" }) => (
  <div style={{ background: "#ffffff", borderRadius: 6, height: 6, overflow: "hidden" }}>
    <div style={{ width: `${(value / max) * 100}%`, height: "100%", background: color, borderRadius: 6, transition: "width .5s" }} />
  </div>
);

// DATA
const planningStages = [
  { stage: "1. Brief Intake & Objective Setting", what: "Receive and interrogate the client brief. Clarify the single most important objective. Identify target audience, geography (which regions and markets?), flight dates, blackout periods, and cultural calendar conflicts. For multi-market campaigns: confirm if strategy is global, regional, or market-specific.", actions: "Complete a brief interrogation checklist. Document: objective, KPI, audience, markets (WEST/CENTRAL/EAST split), budget per market, flight, creative status per language, measurement requirements. For global briefs: confirm single vs. multi-market reporting requirements.", mistake: "Accepting a brief at face value without asking 'what does success look like in a number?' Running a 'global' campaign with a single creative and assuming one platform mix fits all regions." },
  { stage: "2. Audience & Market Analysis", what: "Define the target audience with precision: demographics, platform behaviour, language preference, device usage, and regional cultural context. WEST: mature digital markets, privacy-first (GDPR, CCPA). CENTRAL: mobile-first, Arabic/English bilingual, high social media usage, cultural calendar critical (Ramadan, Eid, National Days). EAST: walled-garden ecosystems (China: WeChat/Douyin, not Google/Meta), mobile-dominant, high CTV adoption in Japan/Korea.", actions: "Pull platform audience estimates per region. Map platform dominance by market - e.g. Snapchat dominates KSA/Kuwait, LINE dominates Thailand, WeChat dominates China, VK dominates Russia. Document audience size per platform per market.", mistake: "Treating any region as a monolith. WEST varies hugely (US ≠ UK ≠ Germany). CENTRAL varies (UAE ≠ KSA ≠ Egypt). EAST varies (China ≠ India ≠ Japan). Each market has different platform dominance, language needs, and cultural context." },
  { stage: "3. Platform Selection & Justification", what: "Select platforms based on: (a) where your audience is in each market, (b) which formats support the objective, (c) whether budget is sufficient per market. For multi-market: platform mix WILL differ by region - Meta+TikTok works globally, but Snapchat is critical in MENA, LINE in Thailand, WeChat in China, VK in Russia. Every platform needs a written rationale per market.", actions: "Use the Platform × Objective matrix. Document why each platform is included per region. Build a market × platform matrix showing which platforms are active in which markets. Remove platforms that can't hit meaningful minimums in any given market.", mistake: "Using the same platform mix across all regions. 'We should be on everything everywhere' is not a strategy. A platform that dominates in one market may be irrelevant in another." },
  { stage: "4. Budget Allocation & Channel Mix", what: "Distribute budget across platforms, funnel stages, AND markets. Allocate enough per platform per market to exit the learning phase. For multi-market: decide whether to run centralised campaigns (one account, multiple geos) or market-specific campaigns (separate accounts per market). CPMs vary dramatically by region - WEST is typically most expensive, CENTRAL spikes during Ramadan, EAST varies by platform.", actions: "Build a budget allocation table: market | platform | monthly budget | % of total | buying type | expected KPI range. Include a market weighting column. Flag platforms below minimum budget per market. Account for CPM seasonality per region.", mistake: "Spreading budget equally across too many platforms AND too many markets. A $50K global budget split across 5 markets and 4 platforms per market = $2.5K per platform per market, which is below learning thresholds everywhere." },
  { stage: "5. Format & Creative Planning", what: "Identify which ad formats are required per platform per objective per market. Brief creative team with precise specs AND language/localisation requirements. Multi-market campaigns need: language variants (Arabic, English, Mandarin, Russian, etc.), culturally adapted messaging (not just translation), and market-specific formats (e.g. WeChat mini-programs for China).", actions: "Produce a creative requirements matrix: market | platform | format | aspect ratio | duration | language | localisation notes | deadline. Flag creative gaps by market. Confirm which markets need fully localised creative vs. adapted global creative.", mistake: "Running a single English creative globally. Treating translation as localisation. Planning for China without Mandarin creative. Running MENA campaigns without Arabic. Assuming one creative works across all cultures." },
  { stage: "6. Measurement Framework Setup", what: "Define measurement framework before the campaign goes live. Confirm tracking is in place: Meta Pixel + CAPI, TikTok Events API, Snap Pixel, LinkedIn Insight Tag.", actions: "Produce a measurement plan: KPI | target | source | reporting cadence | attribution window. Validate pixel firing.", mistake: "Setting up measurement after launch. Using inconsistent UTM naming across campaigns." },
  { stage: "7. Campaign Launch & QA", what: "Run a pre-launch QA checklist: pixels firing, tracking links working, creative approved, targeting correct, budget pacing set, naming conventions applied.", actions: "Complete QA checklist. Get two-person sign-off. Document go-live date and first reporting date.", mistake: "Launching without checking that pixels are firing. Forgetting frequency caps on awareness campaigns." },
  { stage: "8. Optimisation & Mid-Flight", what: "Optimise based on data. Wait for the learning phase (7–14 days or 50 conversion events) before changes. Change one variable at a time.", actions: "Weekly optimisation report: spend vs pacing, CPM/CPC/CPL vs benchmark, CTR, creative performance ranking.", mistake: "Making daily bid changes that reset the learning phase. Ignoring creative fatigue until performance collapses." },
  { stage: "9. Reporting & Post-Campaign", what: "Report against the KPIs defined in the measurement framework - not just metrics that look good. Include what worked, what didn't, and why.", actions: "Report structure: Executive Summary → KPI Performance → Platform Breakdown → Creative Performance → Audience Insights → Learnings → Recommendations.", mistake: "Reporting only the good numbers. Claiming credit for conversions that would have happened organically." },
];

const platforms = [
  { name: "Meta (Facebook + Instagram)", strengths: ["Broadest audience reach (18–55+) at any budget", "Most mature auction system - exits learning phase fastest", "Full-funnel: awareness through conversion in one platform", "Advantage+ / Andromeda AI optimises creative-to-audience matching", "CAPI enables strong server-side measurement", "WhatsApp Status + Threads extend reach further"], kpis: ["Awareness: CPM $3-$11, Reach, Frequency", "Traffic: CPC $0.30-$1.10, LPV, CTR"], audienceFit: "Almost universal. Strongest 25–54 but effective across all demos. Both Arabic & English audiences. Reach across demographics in all global markets.", capabilities: "Full-funnel bidding (awareness→conversion). Pixel + CAPI tracking. Custom/Lookalike audiences. Catalogue/DPA. Lead Gen Forms. A/B testing. DCO. Advantage+ Sales for e-commerce.", evaluate: "Is our audience on Meta? → Almost certainly yes. Do we have Pixel + CAPI? → Required for conversion campaigns. Budget $5K+/month? → Minimum for learning phase. Creative in 9:16? → Needed for Reels/Stories (now 90% of inventory). Past performance? → Check historical CPA/ROAS benchmarks. Is this platform on Omnicom\'s approved vendor list? - Verify compliance before activation.", gcc: "Essential baseline for all campaigns. Dual-language (AR+EN) recommended. Ramadan CPMs spike 2–3x - budget accordingly. Threads ads now live globally (Feb 2026). WhatsApp Status ads auto-activate in Traffic campaigns.", minBudget: "$5K/month", color: "blue" },
  { name: "TikTok", strengths: ["Dominant for 18–34 audience regionally", "Highest time-spent per session of any platform", "Creative IS targeting - algorithm finds audience based on content", "Spark Ads (creator content) drive 70% higher CTR than brand content", "New formats: Logo Takeover, Prime Time, TopReach, Pulse"], kpis: ["Awareness: CPM $5–$20, Reach, VCR", "Video Views: CPV $0.02–$0.08, Completion Rate", "Traffic: CPC $0.20–$1.00, LPV"], audienceFit: "Dominant 18–34. Growing 35–44. Weaker 45+. Local language content critical in every market. MENA and SEA among highest TikTok usage globally. Entertainment-first audience mindset.", capabilities: "In-Feed video, TopView (CPM auction), Spark Ads, Branded Hashtag Challenges, Dynamic Showcase Ads. Events API for server-side tracking. Smart+ (AI automation). TikTok Shop available in SEA, expanding to other markets.", evaluate: "Is target audience 18–34? → Strong signal to include. Can we produce native/UGC-style creative? → Essential - polished TV-style underperforms. Events API implemented? → Required for conversion campaigns. Budget $5K+/month? → Minimum. Is there a cultural moment to leverage? → TikTok excels at moment-based campaigns.", gcc: "Among highest usage globally. Arabic content and trending sounds are critical. Book TopView/TopReach 4–6 weeks ahead for peak moments. Spark Ads are underused by agencies globally.", minBudget: "$5K/month", color: "purple" },
  { name: "Snapchat", strengths: ["60–70% penetration in KSA & Kuwait - non-negotiable for these markets", "Strongest AR/Lens capabilities of any platform", "New: Total Snap Takeover, Sponsored Snaps, Reminder Ads", "Inbox-first usage behaviour = high ad attention", "Smart Bidding + Smart Budget for automated optimisation"], kpis: ["Awareness: CPM $3–$10, Reach, Swipe-Up Rate", "Video: CPV $0.01–$0.05, Completion Rate"], audienceFit: "WEST: Strong 13–34 in US/UK/France. CENTRAL: Dominant 13–34 in KSA/Kuwait (60–70% penetration). EAST: Limited presence. Weaker for 45+ and B2B everywhere.", capabilities: "AR Lenses (incl. AI Lenses), First Story, Commercials (non-skippable 6s), Dynamic Ads, Sponsored Snaps (inbox), Reminder Ads, Story Ads. Snap Pixel + CAPI.", evaluate: "Does the campaign target KSA or Kuwait? → Snapchat is mandatory, not optional. Audience 13–34? → Strong fit. AR or experiential component? → Snap is the leader. Budget to produce Snap-specific vertical creative? → Required. Past Snap performance in market? → Check historical CPMs and swipe rates.", gcc: "KSA & Kuwait penetration is 60–70% - cannot be excluded for these markets. Total Snap Takeover (Mar 2026) dominates entire app. Sponsored Snaps appear in Chat inbox.", minBudget: "$5K/month", color: "amber" },
  { name: "YouTube / Google Video", strengths: ["#1 video platform globally by time-spent", "Massive local language content consumption globally", "Non-skippable formats guarantee message delivery", "Masthead for maximum single-day reach", "Demand Gen spans YouTube + Shorts + Gmail + Discover"], kpis: ["Awareness: CPM $5–$15, Reach, Brand Lift", "Video Views: CPV $0.01–$0.05, VTR, Completion Rate", "Demand Gen: CPC $0.50–$2.00, ROAS 2–6x"], audienceFit: "Broadest video audience globally. All ages. Strong for audiences that research before buying (auto, real estate, B2B, tech, travel). Multi-language content consumption across markets.", capabilities: "TrueView (skippable), Non-Skip (15–20s), Bumpers (6s), Shorts, Masthead. Demand Gen (multi-surface). PMax (all Google surfaces). YouTube Select (top 5% content).", evaluate: "Is video storytelling important for this campaign? → YouTube is the primary platform. Does the audience research before purchasing? → YouTube is in the consideration path. Budget for $5K+/month? → Minimum. Video assets available? → Required. Need guaranteed message delivery? → Use non-skip or bumpers.", gcc: "#1 video platform globally. Local language content consumption is high across all markets. Masthead book 4–8 weeks in advance. Demand Gen is strongest Google mid-funnel format for the market.", minBudget: "$5K/month", color: "red" },
  { name: "Google Performance Max", strengths: ["Covers ALL Google surfaces from one campaign", "AI-driven creative and audience optimisation", "Strong for e-commerce with product feeds", "Enhanced Conversions for accurate measurement"], kpis: ["New Customer Rate, Impression Share"], audienceFit: "Broad - lets Google AI find the right audience. Best for brands with existing conversion data (50+ monthly conversions). Strongest for e-commerce, travel, auto globally.", capabilities: "Automated across YouTube, Search, GDN, Gmail, Discover, Maps, Shopping. AI generates ad combinations from asset library. Requires product feed for shopping, Enhanced Conversions.", evaluate: "Is the objective e-commerce conversions? → PMax is Google's strongest format. Do we have 50+ monthly conversions? → Required for AI to optimise. Enhanced Conversions implemented? → Non-negotiable. Product feed available? → Required for Shopping inventory. Budget $15K+/month? → Minimum for meaningful AI learning.", gcc: "Fashion, electronics, FMCG see strong ROAS across all markets. Not suitable for early-stage brands without conversion history.", minBudget: "$15K/month", color: "teal" },
  { name: "LinkedIn", strengths: ["Only platform for precise B2B professional targeting", "Job title, industry, company, seniority targeting", "Pre-filled Lead Gen Forms from profile data = high completion", "Thought Leader Ads amplify executive credibility", "Document Ads drive high engagement for thought leadership"], kpis: ["Awareness: CPM $10–$60", "Engagement: CPE $0.50–$3.00"], audienceFit: "Business professionals, C-suite, decision-makers. BFSI, tech, government, consulting, real estate investors. Not suitable for B2C mass-market or general consumers.", capabilities: "Sponsored Content (image/video/carousel), Lead Gen Forms (pre-filled), Document Ads (PDF carousels), InMail, Thought Leader Ads. Insight Tag for tracking. ABM targeting.", evaluate: "Is this a B2B campaign? → LinkedIn is likely essential. Target audience is decision-makers or specific job titles? → Only LinkedIn can target this precisely. Budget accepts premium CPMs ($15–$60)? → LinkedIn is expensive - thin budgets produce minimal reach. Past performance data? → Check historical CPL and lead quality scores.", gcc: "WEST: Dominant B2B globally. CENTRAL: Growing in UAE/KSA enterprise. EAST: Strong in India/SEA B2B. Government, BFSI, tech perform well everywhere. Thought Leader Ads underused globally.", minBudget: "$10K/month (practical minimum)", color: "blue" },
  { name: "X (Twitter)", strengths: ["Strongest platform for real-time event moments", "Trend Takeover+ dominates national conversation", "Strong news, culture, finance, sports, and government audience", "Amplify Pre-Roll for brand-safe in-stream video"], kpis: ["Awareness: CPM $7–$19, Impressions, SOV", "Video: CPV $0.04–$0.15, Completion Rate", "Engagement: CPE $0.15–$0.60", "Traffic: CPC $0.60–$2.40"], audienceFit: "News-aware, politically and culturally engaged adults. Sports fans. Finance and government professionals. Weaker for e-commerce and direct response.", capabilities: "Promoted Ads, Video Ads, Website Cards, Trend Takeover+, Amplify Pre-Roll, Vertical Video Ads. Limited conversion optimisation vs Meta/TikTok.", evaluate: "Is this campaign tied to a live event (F1, FIFA, National Day, Ramadan)? → X is essential for real-time. Is the audience news/sports/finance-engaged? → Good fit. Is the objective e-commerce or app installs? → X is weak here - deprioritise. Budget for meaningful reach ($5K+/month)? → Brand safety is a concern - verify controls. Is this platform on Omnicom\'s approved vendor list? - Verify before activation.", gcc: "WEST: Super Bowl, elections, breaking news. CENTRAL: F1, National Days, FIFA, Ramadan. EAST: Cricket IPL, festivals. Trend Takeover+ for owning national conversations. Moment-based buy, not always-on.", minBudget: "$5K/month", color: "green" },
  { name: "Pinterest", strengths: ["High purchase-intent audience in planning/discovery mode", "Strong for visually-driven lifestyle categories", "Shopping Spotlight for peak retail moments", "Affluent female audience globally"], kpis: ["Awareness: CPM $4–$12, Saves, Closeups", "Traffic: CPC $0.50–$2.00, Outbound Clicks"], audienceFit: "Female 25–44, interested in home, fashion, beauty, weddings, travel, lifestyle. Affluent. Users actively planning purchases - high intent.", capabilities: "Standard Pins, Video Pins, Max-Width Video, Shopping Ads, Dynamic Product Ads, Collections, Lead Ads. Pinterest Tag required for conversion tracking.", evaluate: "Is the category visually driven (fashion, beauty, home, weddings)? → Strong fit. Is the target audience female 25–44? → Pinterest's core demo. Do we have a product catalogue? → Enables Shopping Ads. Is the objective discovery-to-purchase? → Pinterest excels here. Direct response at scale? → Pinterest is a discovery platform, not DR.", gcc: "WEST: Strongest market, mature audience. CENTRAL: Growing affluent female audience, effective for Eid/DSF gifting. EAST: Expanding in India/SEA.", minBudget: "$3K/month", color: "red" },
  { name: "Programmatic (Display, CTV, DOOH, Audio)", strengths: ["Reach beyond social walled gardens", "Premium brand-safe inventory via PMPs", "CTV (Shahid/OSN+ (MENA), Hulu/Peacock (US), regional CTV platforms) for lean-back video", "DOOH for physical-world brand presence", "Retargeting across the open web", "DCO for personalised creative at scale"], kpis: ["Awareness: CPM $2–$30 (varies by inventory)", "Video: CPCV $0.05–$0.20, VCR", "Retargeting: CPC $0.30–$2.00, CVR", "CTV: CPM $15–$40, near-100% viewability"], audienceFit: "Broad - depends on inventory and data strategy. CTV reaches cord-cutters and streaming audiences. DOOH reaches commuters, shoppers, travellers. Display/native for retargeting and reach extension.", capabilities: "Display banners, native, OLV pre-roll, CTV/OTT, DOOH, audio (Spotify, Anghami (MENA), Spotify (global)). DCO. Retargeting. First-party data activation. Brand safety via DV/IAS. Needs DSP (DV360, Amazon DSP, StackAdapt, or specialist like MiQ).", evaluate: "Do we need reach beyond social platforms? → Programmatic extends across the open web + CTV + DOOH. Is retargeting a priority? → Programmatic display/native is the standard approach. Budget $20K+/month? → Minimum for meaningful programmatic. Verification (DV/IAS) in place? → Non-negotiable. First-party data available? → Significantly improves performance. Which DSP? → See Vendor Landscape section.", gcc: "WEST: Hulu, Peacock, Disney+ ad tiers for CTV. CENTRAL: Shahid/OSN+ for Arabic CTV, DOOH in Dubai/Riyadh. EAST: JioCinema in India, separate ecosystem in China. Always use PMPs for brand safety globally.", minBudget: "$20K/month", color: "amber" },
];

const frameworkData = [
  { platform: "Meta", objective: "Awareness", type: "Brand Awareness", format: "Image/Video/Carousel + Threads", buying: "CPM", kpi: "Reach/CPM", benchmark: "CPM: $3–$11", notes: "Reels & Threads growing. Ramadan 2–3x CPM. Supply 6–12 diverse creatives." },
  { platform: "Meta", objective: "Video Views", type: "ThruPlay", format: "Video (15s–60s)", buying: "CPV", kpi: "ThruPlay Rate/CPV", benchmark: "CPV: $0.01–$0.05", notes: "Arabic creative outperforms in KSA/Kuwait. 9:16 mandatory for Reels." },
  { platform: "Meta", objective: "Traffic", type: "Link Clicks/LPV", format: "Image/Video/Carousel/Collection", buying: "CPC", kpi: "CPC/CTR", benchmark: "CPC: $0.30–$1.10", notes: "WhatsApp Status ads auto-activate. ~95%+ WhatsApp penetration regionally." },
  { platform: "Meta", objective: "Lead Gen", type: "Lead Ads", format: "Lead Form/Instant Form", buying: "CPL", kpi: "CPL/Volume", benchmark: "CPL: $5–$30", notes: "Arabic form fields improve completion in KSA/Kuwait." },
  { platform: "Meta", objective: "Conversions", type: "Advantage+ Sales", format: "Image/Video/Carousel/DPA", buying: "CPA", kpi: "ROAS/CPA", benchmark: "ROAS: 2–5x", notes: "Flexible Multi-Format. Ensure CAPI implemented." },
  { platform: "TikTok", objective: "Awareness", type: "Brand Awareness", format: "TopView/TopReach/Logo Takeover/Prime Time", buying: "CPM/Reservation", kpi: "Reach/CPM", benchmark: "CPM: $5–$20", notes: "TopReach bundles TopView+TopFeed. Logo Takeover highest-impact. Book 4–6 wks." },
  { platform: "TikTok", objective: "Video Views", type: "Video Views", format: "In-Feed (up to 10min), Pulse", buying: "CPV", kpi: "View Rate/VTR", benchmark: "CPV: $0.02–$0.08", notes: "Pulse Mentions/Tastemakers new. regional time-spent among highest globally." },
  { platform: "TikTok", objective: "Conversions", type: "Product Sales", format: "In-Feed/Dynamic Showcase", buying: "CPA", kpi: "ROAS/CPA", benchmark: "ROAS: 1.5–4x", notes: "Smart+ growing. Events API required for attribution." },
  { platform: "Snapchat", objective: "Awareness", type: "Brand Awareness", format: "Story/Commercial/AR/Sponsored Snaps/Takeover", buying: "CPM", kpi: "Reach/CPM", benchmark: "CPM: $3–$10", notes: "Total Snap Takeover (Mar 2026) - first ad across all tabs. 60–70% reach KSA/Kuwait." },
  { platform: "Snapchat", objective: "AR Engagement", type: "AR Lens/AI Lens", format: "AR Lens/Sponsored AI Lens", buying: "Reservation", kpi: "Lens Plays/Shares", benchmark: "$15K–$41K+", notes: "AI Lenses use generative AI. High earned media regionally." },
  { platform: "YouTube", objective: "Awareness", type: "Brand Awareness", format: "Bumper/Non-Skip/Masthead", buying: "CPM", kpi: "Reach/CPM", benchmark: "CPM: $5–$15", notes: "#1 video platform globally. Masthead book well in advance." },
  { platform: "YouTube/Google", objective: "Traffic/Conv.", type: "Demand Gen", format: "Video/Image/Carousel", buying: "CPC/CPA", kpi: "CPC/CPA", benchmark: "CPM $5–15 | CPC $0.50–2", notes: "Spans YouTube, Shorts, Gmail & Discover. Requires Google Tag + GA4." },
  { platform: "YouTube/Google", objective: "Conversions", type: "Performance Max", format: "Video/Image/Text (AI combo)", buying: "CPA/tROAS", kpi: "ROAS/CPA", benchmark: "ROAS: 3–8x", notes: "All Google surfaces. Needs 50+ monthly conversions. Enhanced Conversions required." },
  { platform: "LinkedIn", objective: "Lead Gen", type: "Lead Gen Forms", format: "Image/Video + Lead Form", buying: "CPL", kpi: "CPL/Volume", benchmark: "CPL: $30–$150", notes: "Pre-filled from LinkedIn profiles. Dominant for B2B regionally." },
  { platform: "LinkedIn", objective: "Thought Leadership", type: "Thought Leader Ads", format: "Boosted personal posts", buying: "CPM/CPC", kpi: "Engagement/CTR", benchmark: "CPM: $20–$50", notes: "Amplify exec posts. Drives credibility regionally professional sector." },
  { platform: "X (Twitter)", objective: "Awareness", type: "Trend Takeover", format: "Trend Takeover+/Amplify", buying: "Reservation", kpi: "SOV/Impressions", benchmark: "$20K–$55K+", notes: "Dominates trending tab. Powerful for launch moments & cultural events." },
  { platform: "Programmatic", objective: "Awareness", type: "OLV/CTV/DOOH", format: "Display/Pre-Roll/CTV/DOOH", buying: "CPM", kpi: "Reach/CPM/vCPM", benchmark: "CPM: $2–$30", notes: "CTV via OSN+, Shahid. DOOH in Premium locations per market (e.g. Dubai Mall, Times Square, Shibuya). Always use PMPs." },
];

const highImpactFormats = [
  { platform: "Meta", name: "Trending Reels Ads", type: "Full-Screen Video", use: "Product launches, trend-jacking, Gen Z", cost: "CPM Reservation", specs: "9:16, up to 60s, auto-play sound-on", gcc: "Ads after top 5% Reels. Hook in 2s. Local language Reels drive high amplification in every market.", isNew: false },
  { platform: "Meta", name: "Advantage+ Sales", type: "AI Full-Funnel", use: "Always-on e-commerce, Eid, White Friday, DSF", cost: "CPA/ROAS", specs: "AI selects audience, placement & creative", gcc: "Replaces Advantage+ Shopping. Flexible Multi-Format. 8–12 creatives. COD common in MENA & parts of APAC.", isNew: true },
  { platform: "Meta", name: "Click-to-WhatsApp", type: "Conversational", use: "Lead gen, customer service, high-intent", cost: "CPC $0.30–$1.50", specs: "Opens WhatsApp chat from ad", gcc: "WhatsApp penetration ~95% in MENA, 60%+ in India/LATAM. Ideal for real estate, auto, hospitality.", isNew: false },
  { platform: "TikTok", name: "Logo Takeover ★", type: "App-Splash Co-Brand", use: "Major launches, Ramadan day-1, National Day", cost: "Reservation (above TopView)", specs: "Brand logo co-brands TikTok splash screen", gcc: "Highest-impact format on TikTok. First brand: Warner Bros. Availability varies by market - check with rep.", isNew: true },
  { platform: "TikTok", name: "Prime Time ★", type: "Sequential Live-Moment", use: "Live events (F1, FIFA, Ramadan nights)", cost: "Reservation premium", specs: "Up to 3 sequential ads, 15-min window", gcc: "Perfect for live events: F1, FIFA, cultural moments, product launches. 3-act narrative in one session.", isNew: true },
  { platform: "TikTok", name: "TopReach ★", type: "Bundled Premium Reach", use: "Max one-day reach, cultural moments", cost: "CPM-based single buy", specs: "TopView + TopFeed bundled", gcc: "More efficient than separate buys. Ideal for product launch days and peak cultural moments in any market.", isNew: true },
  { platform: "TikTok", name: "Pulse Mentions ★", type: "Contextual Creator-Adjacent", use: "Brand relevance, social proof", cost: "CPM auction", specs: "Ads next to content discussing your brand", gcc: "Own the conversation around your category in any market.", isNew: true },
  { platform: "Snapchat", name: "Total Snap Takeover ★", type: "Full-App Domination", use: "Major launches, National Days, Eid", cost: "Reservation premium", specs: "First ad across ALL app tabs simultaneously", gcc: "97% of users visit multiple tabs. Unmatched cross-surface presence. Strongest in KSA/Kuwait but available globally.", isNew: true },
  { platform: "Snapchat", name: "Sponsored Snaps ★", type: "Native Inbox Ad", use: "Product launches, time-sensitive offers", cost: "CPM $4–$12", specs: "Ads in Chat/Inbox as brand Snaps", gcc: "High native feel, strong open rates globally. Inbox-first usage especially strong in KSA/Kuwait.", isNew: true },
  { platform: "Snapchat", name: "Reminder Ads ★", type: "Intent-to-Return", use: "Countdown to launches, sale dates, live events", cost: "CPM auction", specs: "Users set in-app reminder, push notification sent", gcc: "Product launches, sale countdowns, live events. No equivalent on other platforms.", isNew: true },
  { platform: "Snapchat", name: "Sponsored AI Lenses", type: "Generative AI AR", use: "Personalised brand moments", cost: "$15K–$50K+", specs: "AI-generated personalised experiences", gcc: "Different from fixed AR. Strong for beauty, fashion, FMCG.", isNew: true },
  { platform: "YouTube", name: "Masthead", type: "Homepage Takeover", use: "Mass reach, product launches, Ramadan", cost: "$50K–$200K/day", specs: "Top of YouTube Home, auto-play muted", gcc: "Best for maximum region-wide reach. Book 6–8 weeks ahead.", isNew: false },
  { platform: "YouTube", name: "Demand Gen ★", type: "AI Multi-Surface", use: "E-commerce, lead gen, consideration", cost: "CPM/CPC/CPA/tROAS", specs: "YouTube + Shorts + Gmail + Discover in one", gcc: "Best Google format below Masthead. Strong for fashion, retail, travel.", isNew: true },
  { platform: "YouTube", name: "Performance Max ★", type: "Fully Automated Cross-Channel", use: "E-commerce, always-on conversions", cost: "CPA/tROAS automated", specs: "All Google surfaces, AI-generated combos", gcc: "Fashion, electronics, FMCG see strong ROAS. Needs 50+ conv/month.", isNew: true },
];

const programmaticEcosystem = [
  { category: "DSPs (Demand-Side Platforms)", description: "Platforms advertisers use to buy programmatic ad inventory via real-time bidding.", vendors: [
    { name: "Google DV360", type: "Enterprise DSP", what: "Google's enterprise DSP. Access to 80+ ad exchanges, YouTube, Gmail, Discover, GDN. Native GA4/CM360 integration.", gcc: "Available globally. Best for YouTube-heavy campaigns and Google ecosystem integration. Min ~$10K–$25K/month.", bestFor: "YouTube, Google ecosystem, large-scale awareness", minBudget: "$10K–$25K/month", regions: ["WEST","CENTRAL","EAST"] },
    { name: "Amazon DSP", type: "E-commerce DSP", what: "Amazon's DSP leveraging purchase-intent data. Strong for retargeting and lookalike audiences based on buying behaviour.", gcc: "Global availability. Best for e-commerce brands selling on Amazon marketplaces.", bestFor: "E-commerce retargeting, purchase-intent audiences", minBudget: "$15K+/month", regions: ["WEST","CENTRAL","EAST"] },
    { name: "Excelate (MEmob+)", type: "MENA-Native DSP", what: "Mobility-native DSP built for MENA. Offline intelligence, store-visit attribution, AllPings location data covering 2M+ points of interest.", gcc: "Purpose-built for MENA. Strongest for footfall attribution in malls, retail, real estate.", bestFor: "Footfall attribution, location targeting, MENA retail", minBudget: "Contact vendor", regions: ["CENTRAL"] },
    { name: "StackAdapt", type: "Mid-Market DSP", what: "Self-serve multi-channel DSP. Display, native, video, CTV, audio, in-game, DOOH. AI-powered contextual targeting.", gcc: "Global. Good entry point for mid-market budgets without DV360 access.", bestFor: "Mid-market, native ads, multi-channel", minBudget: "$5K–$15K/month", regions: ["WEST","CENTRAL","EAST"] },
  ]},
  { category: "CTV / Connected TV", description: "Connected TV and streaming platforms offering ad-supported inventory by region.", vendors: [
    { name: "DMS (Digital Media Solutions)", type: "CTV / Video Network", what: "Multi-market CTV and digital video network. Premium inventory across streaming platforms and publisher sites.", gcc: "Available WEST and EAST regions. Strong for cross-market video campaigns.", bestFor: "Cross-regional CTV, premium video", minBudget: "Contact vendor", regions: ["WEST","EAST"] },
    { name: "Dailymotion", type: "Video / CTV Platform", what: "Global video platform with ad-supported content. Premium publisher video inventory. Programmatic access available.", gcc: "WEST region primarily. Strong in Europe and Americas.", bestFor: "European video reach, publisher content", minBudget: "Contact vendor", regions: ["WEST"] },
    { name: "Shahid (MBC Group)", type: "Premium Arabic CTV/OTT", what: "MBC Group's dominant streaming platform. Largest Arabic content library globally. AVOD tier with pre-roll and mid-roll ads.", gcc: "CENTRAL region. #1 Arabic CTV platform. Essential for Arabic-speaking audiences.", bestFor: "Arabic content, MENA CTV, brand-safe premium", minBudget: "PMP deals", regions: ["CENTRAL"] },
    { name: "LG Ads", type: "Smart TV / ACR Data", what: "LG's advertising platform leveraging Automatic Content Recognition (ACR) data from LG smart TVs. Audience targeting based on actual TV viewing behaviour.", gcc: "CENTRAL region. Growing smart TV installed base in MENA.", bestFor: "Smart TV targeting, ACR data, cross-screen", minBudget: "Contact vendor", regions: ["CENTRAL"] },
    { name: "OSN+ (Orbit Showtime)", type: "Premium International CTV", what: "Premium streaming with exclusive HBO, Paramount content. Affluent English-speaking audience. Exploring AVOD.", gcc: "CENTRAL region. Premium international content for MENA audiences.", bestFor: "Affluent audiences, premium content, MENA", minBudget: "Premium - contact publisher", regions: ["CENTRAL"] },
    { name: "Skyscale", type: "Omnichannel Media Platform", what: "Omnichannel media buying platform with global reach. Covers CTV, linear TV, OOH, and digital video through global deals. One of the few platforms offering truly integrated cross-channel buying.", gcc: "Global omnichannel - CTV, linear TV, OOH, digital video. Unique cross-channel integration through global deals.", bestFor: "Omnichannel buying, linear TV, CTV, OOH, cross-channel", minBudget: "Contact vendor", regions: ["WEST","EAST"] },
    { name: "EternityX", type: "China Cross-Border CTV/Digital", what: "Cross-border platform connecting international brands with Chinese audiences inside China and outbound Chinese travellers. Covers WeChat, Weibo, Baidu, Douyin + CTV.", gcc: "EAST region. Essential for targeting Chinese investors and tourists globally.", bestFor: "China targeting, HNWI investors, cross-border", minBudget: "$10K+/month", regions: ["EAST"] },
  ]},
  { category: "VIDEO", description: "Programmatic video platforms spanning pre-roll, mid-roll, outstream, and native video across regions.", vendors: [
    { name: "Teads", type: "Outstream / Native Video", what: "Global outstream and native video platform. Ads placed within editorial content. Strong viewability. Cookieless targeting capabilities.", gcc: "Available across ALL regions. Premium publisher inventory globally.", bestFor: "Outstream video, native placements, viewability", minBudget: "$10K+/month", regions: ["WEST","CENTRAL","EAST"] },
    { name: "Seedtag", type: "Contextual Video / Display", what: "AI-powered contextual advertising platform. Places ads based on content context rather than cookies. Video and display formats.", gcc: "Available across ALL regions. Strong contextual targeting without third-party cookies.", bestFor: "Contextual targeting, cookieless, brand safety", minBudget: "$10K+/month", regions: ["WEST","CENTRAL","EAST"] },
    { name: "Equativ (formerly Smart AdServer)", type: "Full-Stack Ad Platform", what: "Independent full-stack ad tech platform. Ad server, SSP, and DSP capabilities. Premium publisher monetisation and buyer tools.", gcc: "Available across ALL regions. Independent alternative to Google Ad Manager.", bestFor: "Independent ad serving, premium publishers, transparency", minBudget: "$10K+/month", regions: ["WEST","CENTRAL","EAST"] },
    { name: "Amazon Video", type: "Premium Video / OLV", what: "Amazon's video advertising across Prime Video, Twitch, IMDb, and Fire TV. Leverages Amazon purchase data for targeting.", gcc: "Primarily WEST and expanding. Strong purchase-intent video targeting.", bestFor: "Purchase-intent video, Prime Video, Twitch", minBudget: "$15K+/month", regions: ["WEST","CENTRAL"] },
  ]},
  { category: "TRAVEL", description: "Specialist travel and tourism advertising platforms.", vendors: [
    { name: "Criteo", type: "Retargeting / Commerce Media", what: "Global commerce media platform. Dynamic retargeting, product recommendations, travel-specific solutions. Strong for airlines, hotels, OTAs.", gcc: "WEST and CENTRAL regions. Leading retargeting platform for travel and e-commerce.", bestFor: "Travel retargeting, dynamic product ads, e-commerce", minBudget: "$10K+/month", regions: ["WEST","CENTRAL"] },
    { name: "Reach MENA / Amadeus", type: "Travel Data & Distribution", what: "Travel industry data and advertising platforms. Amadeus provides travel intent data from GDS bookings. Reach MENA covers regional travel inventory.", gcc: "CENTRAL/MENA focused. Amadeus data covers global travel intent signals.", bestFor: "Travel intent data, airline/hotel advertising, GDS targeting", minBudget: "Contact vendor", regions: ["WEST","CENTRAL"] },
    { name: "Navigator", type: "Travel / APAC Specialist", what: "Travel and tourism advertising platform focused on Asia-Pacific markets. Connects brands with travel-intent audiences across APAC.", gcc: "EAST region. Specialist for APAC travel and tourism campaigns.", bestFor: "APAC travel marketing, tourism, destination campaigns", minBudget: "Contact vendor", regions: ["EAST"] },
  ]},
  { category: "SOCIAL", description: "Social media advertising platforms with programmatic or managed buying capabilities.", vendors: [
    { name: "Snap (Snapchat)", type: "Social / AR Platform", what: "Snapchat's advertising platform. AR Lenses, Sponsored Snaps, Story Ads, Dynamic Ads. Strong 13–34 demographic. 60–70% penetration in KSA/Kuwait.", gcc: "Available across ALL regions. Critical for MENA youth audiences. AR capabilities unmatched.", bestFor: "Youth audiences, AR experiences, MENA markets", minBudget: "$5K+/month", regions: ["WEST","CENTRAL","EAST"] },
  ]},
  { category: "MOBILE", description: "Mobile-first advertising platforms and in-app networks.", vendors: [
    { name: "Amazon DSP (Mobile)", type: "Mobile / Cross-Device", what: "Amazon's mobile advertising capabilities within its DSP. In-app ads, mobile display, and cross-device targeting using Amazon's identity graph.", gcc: "Available across ALL regions. Strong cross-device capabilities.", bestFor: "Mobile in-app, cross-device, Amazon shoppers", minBudget: "$15K+/month", regions: ["WEST","CENTRAL","EAST"] },
    { name: "InMobi", type: "Mobile-First DSP", what: "India-headquartered mobile-first DSP with global reach. In-app advertising, Glance lock-screen, proprietary mobile SDK data. Display, video, native, rewarded.", gcc: "Available across ALL regions. Strongest in APAC and India.", bestFor: "Mobile in-app, India/APAC reach, performance", minBudget: "$10K+/month", regions: ["WEST","CENTRAL","EAST"] },
  ]},
  { category: "AUDIO", description: "Audio and music streaming advertising platforms.", vendors: [
    { name: "Spotify", type: "Music Streaming", what: "Global music and podcast streaming. Audio, video, and display ad formats. Contextual targeting by mood, genre, activity, and time of day. 675M+ users globally.", gcc: "Available across ALL regions. Largest global audio platform.", bestFor: "Audio ads, mood targeting, global reach", minBudget: "Via DSP or direct", regions: ["WEST","CENTRAL","EAST"] },
    { name: "NBM (New Broadcast Media)", type: "Podcast Partner", what: "Dubai-based podcast advertising partner with global reach. Premium podcast inventory across business, lifestyle, and entertainment verticals. Programmatic and direct buying options.", gcc: "Dubai HQ with global podcast inventory reach across all regions.", bestFor: "Podcast advertising, audio content marketing, global reach", minBudget: "Contact vendor", regions: ["WEST","CENTRAL"] },
    { name: "iHeartMedia", type: "Radio / Podcast", what: "Largest US radio and podcast network. Programmatic audio buying available. Strong for US and Americas reach.", gcc: "WEST region primarily. #1 in US radio/podcast reach.", bestFor: "US/Americas audio, radio, podcast advertising", minBudget: "Contact vendor", regions: ["WEST"] },
    { name: "Anghami (MENA), Spotify (global)", type: "Arabic Music Streaming", what: "Leading Arabic music and podcast platform. Ad-supported tier. Audio, display, and video formats. Strong MENA reach.", gcc: "CENTRAL region. Dominant Arabic audio platform.", bestFor: "Arabic audiences, MENA audio, contextual", minBudget: "Via DSP or direct", regions: ["CENTRAL"] },
  ]},
  { category: "DOOH (Digital Out-of-Home)", description: "Programmatic and direct digital billboard and screen networks by region.", vendors: [
    { name: "Skyscale (DOOH)", type: "Global DOOH Network", what: "Multi-market DOOH network with programmatic buying capabilities. Digital screens across malls, transit, urban environments.", gcc: "Available across ALL regions. Cross-market DOOH campaigns.", bestFor: "Cross-regional DOOH, programmatic buying", minBudget: "$10K+/campaign", regions: ["WEST","CENTRAL","EAST"] },
    { name: "JCDecaux", type: "Premium DOOH Network", what: "Global DOOH leader. Airport, transit, urban, and mall screens. Dubai Airport programmatic DOOH. Integrates with major DSPs.", gcc: "Available across ALL regions. Premium airport and urban inventory globally.", bestFor: "Airport, transit, premium urban DOOH", minBudget: "From ~$350/day", regions: ["WEST","CENTRAL","EAST"] },
    { name: "Talon", type: "OOH Specialist Agency/Platform", what: "Independent OOH specialist. Planning, buying, and optimisation of out-of-home campaigns. Data-driven OOH strategy.", gcc: "Available across ALL regions. Strategic OOH planning and buying.", bestFor: "OOH strategy, planning, cross-format outdoor", minBudget: "Contact vendor", regions: ["WEST","CENTRAL","EAST"] },
    { name: "NEURONS (The Neuron)", type: "Programmatic OOH Platform", what: "Global programmatic out-of-home platform. AI-powered audience targeting and real-time bidding for digital billboards, transit screens, and urban displays worldwide. Dynamic creative optimisation for OOH.", gcc: "Global reach across all regions. Programmatic OOH buying with audience targeting and real-time optimisation.", bestFor: "Programmatic OOH, dynamic DOOH, audience-based outdoor, global reach", minBudget: "License-based", regions: ["WEST","CENTRAL","EAST"] },
  ]},
  { category: "Brand Safety & Verification", description: "Third-party vendors for viewability, brand safety, and fraud prevention.", vendors: [
    { name: "DoubleVerify (DV)", type: "Verification & Brand Safety", what: "Industry-leading verification. Pre-bid and post-bid controls for viewability, brand safety, fraud prevention, geo-accuracy. Integrates with all major DSPs.", gcc: "Global standard. Required on every programmatic campaign.", bestFor: "Brand safety, viewability, fraud prevention", minBudget: "CPM-based ($0.03–$0.15)", regions: ["WEST","CENTRAL","EAST"] },
    { name: "Integral Ad Science (IAS)", type: "Verification & Brand Safety", what: "Major verification vendor. Viewability, brand safety, invalid traffic, contextual targeting. Arabic-language content classification available.", gcc: "Global. Offers Arabic content classification for MENA brand safety.", bestFor: "Brand safety, viewability, social verification", minBudget: "CPM-based", regions: ["WEST","CENTRAL","EAST"] },
  ]},
  { category: "Ad Servers", description: "Platforms for hosting, delivering, and tracking ad creatives across campaigns.", vendors: [
    { name: "Campaign Manager 360 (CM360)", type: "Enterprise Ad Server", what: "Google's enterprise ad server. Ad trafficking, conversion tracking, reach/frequency management, unified reporting. Integrates with DV360.", gcc: "Global standard for enterprise advertisers.", bestFor: "Cross-channel tracking, DV360 integration", minBudget: "License-based", regions: ["WEST","CENTRAL","EAST"] },
    { name: "Flashtalking (Innovid)", type: "Independent Ad Server", what: "Independent ad server for creative analytics, DCO, and cross-channel measurement. Independence from Google stack.", gcc: "Global. Growing adoption for brands wanting independence from Google.", bestFor: "DCO, creative analytics, independence", minBudget: "License-based", regions: ["WEST","CENTRAL","EAST"] },
  ]},
  { category: "Mobile Measurement Partners (MMPs)", description: "App install attribution and mobile campaign measurement.", vendors: [
    { name: "AppsFlyer", type: "MMP", what: "Leading mobile measurement partner. App install and in-app event tracking. Fraud prevention. Deep linking.", gcc: "Global standard for app campaigns.", bestFor: "App attribution, fraud prevention", minBudget: "Tiered by installs", regions: ["WEST","CENTRAL","EAST"] },
    { name: "Adjust", type: "MMP", what: "Mobile measurement and fraud prevention. Attribution, analytics, audience segmentation.", gcc: "Global alternative to AppsFlyer.", bestFor: "App attribution, analytics", minBudget: "Tiered pricing", regions: ["WEST","CENTRAL","EAST"] },
  ]},
];

const chinaVendors = [
  { category: "Search & Display", description: "China's search and display ecosystem operates independently from global platforms.", vendors: [
    { name: "Baidu", type: "Search Engine", what: "China's dominant search engine (~70% market share). SEM, display, feed ads. Equivalent to Google in China.", gcc: "Essential for any China-targeting campaign. SEM is primary performance channel.", bestFor: "China search, brand awareness, performance", minBudget: "$5K+/month", regions: ["EAST"] },
    { name: "360 Search (Qihoo)", type: "Search Engine", what: "China's #2 search engine. Desktop-heavy. Lower CPCs than Baidu.", gcc: "Supplement to Baidu for additional search reach in China.", bestFor: "China search, desktop users, lower CPC", minBudget: "$3K+/month", regions: ["EAST"] },
  ]},
  { category: "Social & Content", description: "China's social platforms are walled gardens with no equivalent outside China.", vendors: [
    { name: "WeChat (Weixin)", type: "Super App", what: "1.3B+ users. Messaging, payments, mini-programs, Moments ads, official accounts. The single most important platform in China.", gcc: "Non-negotiable for China. WeChat Mini-Programs for e-commerce, lead gen, and brand experiences. Official Accounts for content marketing.", bestFor: "Everything in China - social, commerce, CRM, payments", minBudget: "$10K+/month", regions: ["EAST"] },
    { name: "Douyin (TikTok China)", type: "Short Video", what: "China's TikTok (separate app/ecosystem). 700M+ DAU. E-commerce integration, live shopping, brand challenges. NOT the same as international TikTok.", gcc: "Primary video platform for China. Douyin Shop enables direct e-commerce. Live shopping is massive revenue driver.", bestFor: "China video, e-commerce, live shopping, Gen Z", minBudget: "$10K+/month", regions: ["EAST"] },
    { name: "Xiaohongshu (RED / Little Red Book)", type: "Lifestyle / Social Commerce", what: "300M+ users. Instagram meets Pinterest for China. UGC reviews, luxury, beauty, travel, lifestyle. Highly trusted by Chinese consumers for purchase decisions.", gcc: "Essential for luxury, beauty, fashion, travel targeting Chinese consumers. KOL/KOC marketing critical. HNWI audience.", bestFor: "Luxury, beauty, lifestyle, Chinese HNWI, KOL marketing", minBudget: "$5K+/month", regions: ["EAST"] },
    { name: "Weibo", type: "Microblogging", what: "China's Twitter equivalent. 580M+ users. Celebrity, entertainment, trending topics. Display, video, KOL partnerships.", gcc: "Brand awareness and PR amplification in China. Celebrity/KOL endorsements. Trending topic takeovers.", bestFor: "China PR, celebrity marketing, trending moments", minBudget: "$5K+/month", regions: ["EAST"] },
    { name: "Bilibili", type: "Video / Gen Z", what: "China's YouTube for Gen Z. Anime, gaming, education, lifestyle content. Highly engaged community. 340M+ MAU.", gcc: "Best platform for reaching Chinese Gen Z (18-30). Long-form video content. Strong for gaming, tech, education brands.", bestFor: "China Gen Z, gaming, education, long-form video", minBudget: "$5K+/month", regions: ["EAST"] },
  ]},
  { category: "E-commerce & Marketplaces", description: "China's e-commerce platforms with integrated advertising.", vendors: [
    { name: "Tmall / Taobao (Alibaba)", type: "E-commerce", what: "China's largest e-commerce platforms. Tmall for brands, Taobao for marketplace. Alimama ad platform for search, display, live shopping ads.", gcc: "Required for e-commerce in China. Tmall Global for cross-border selling without China entity.", bestFor: "China e-commerce, cross-border selling, product launches", minBudget: "$10K+/month", regions: ["EAST"] },
    { name: "JD.com (Jingdong)", type: "E-commerce", what: "China's #2 e-commerce platform. Known for authenticity and fast delivery. JD Ads for sponsored products and display.", gcc: "Strong for electronics, luxury, authenticated goods. Premium audience.", bestFor: "China e-commerce, electronics, premium goods", minBudget: "$10K+/month", regions: ["EAST"] },
    { name: "Pinduoduo (Temu parent)", type: "Social Commerce", what: "Group-buying social commerce. 900M+ users. Value-oriented. Temu is international version.", gcc: "Mass market reach in China. Lower-tier city penetration. Value/promotion campaigns.", bestFor: "China mass market, promotions, group buying", minBudget: "$5K+/month", regions: ["EAST"] },
  ]},
  { category: "Cross-Border / HNWI", description: "Platforms specialising in reaching Chinese audiences globally.", vendors: [
    { name: "EternityX", type: "Cross-Border Platform", what: "Cross-border platform connecting international brands with Chinese audiences inside China and outbound Chinese travellers. Covers WeChat, Weibo, Baidu, Douyin, Xiaohongshu.", gcc: "Essential for luxury real estate, travel, education targeting Chinese investors and tourists globally. The bridge between global brands and China's walled garden.", bestFor: "China cross-border, HNWI investors, luxury, outbound travel", minBudget: "$10K+/month", regions: ["EAST"] },
  ]},
];

const russiaVendors = [
  { category: "Search & Display", description: "Russia's digital ecosystem is dominated by local platforms due to sanctions and platform exits.", vendors: [
    { name: "Yandex", type: "Search Engine / Ecosystem", what: "Russia's dominant search engine (~65% market share). Yandex Direct for search ads, Yandex Display Network, Yandex Maps, Yandex Market (e-commerce). Full ecosystem equivalent to Google.", gcc: "Essential for any Russia-targeting campaign. Primary search and display platform since Google Ads restrictions.", bestFor: "Russia search, display, maps, e-commerce", minBudget: "$5K+/month", regions: ["EAST"] },
    { name: "myTarget (VK Ads)", type: "Social Ad Platform", what: "VK Group's unified advertising platform covering VK, Odnoklassniki, and Mail.ru properties. Russia's primary social advertising ecosystem.", gcc: "Primary social advertising platform for Russia since Meta exit. Covers VK + Odnoklassniki + Mail.ru.", bestFor: "Russia social ads, broad demographic reach", minBudget: "$3K+/month", regions: ["EAST"] },
  ]},
  { category: "Social & Messaging", description: "Russia's social and messaging landscape after Western platform restrictions.", vendors: [
    { name: "VKontakte (VK)", type: "Social Network", what: "Russia's largest social network. 100M+ MAU. Feed ads, stories, video, communities, mini-apps, VK Pay. Equivalent to Facebook in Russia.", gcc: "Non-negotiable for Russia social. Feed, stories, video, communities. VK Clips competes with TikTok/Reels.", bestFor: "Russia social, all demographics, communities", minBudget: "$5K+/month", regions: ["EAST"] },
    { name: "Telegram", type: "Messaging / Channels", what: "900M+ global users, massive in Russia and CIS. Channels (broadcast), groups, bots, Telegram Ads platform. Growing ad ecosystem with channel sponsorships.", gcc: "Critical for Russia and CIS. Telegram Ads for channel promotion. Sponsored messages in public channels. Strong for news, crypto, tech audiences.", bestFor: "Russia messaging, channel marketing, CIS reach, tech audiences", minBudget: "$3K+/month", regions: ["EAST"] },
    { name: "Odnoklassniki (OK.ru)", type: "Social Network", what: "Russia's second social network. 40M+ MAU. Older demographic (35+). Strong in Russian regions outside Moscow/St Petersburg.", gcc: "Reach older Russian demographics and regional cities. Part of VK Group - buy through myTarget.", bestFor: "Russia 35+, regional cities, older demographics", minBudget: "Via myTarget", regions: ["EAST"] },
  ]},
  { category: "Video & Content", description: "Video platforms operating in Russia.", vendors: [
    { name: "Rutube", type: "Video Platform", what: "Russian video platform positioned as YouTube alternative. Growing since YouTube restrictions. State-backed.", gcc: "Supplementary video reach in Russia. Growing but still much smaller than YouTube.", bestFor: "Russia video, supplementary reach", minBudget: "Contact vendor", regions: ["EAST"] },
    { name: "Yandex Zen (Dzen)", type: "Content / Feed", what: "Yandex's content recommendation platform. Articles, videos, short-form content. Native advertising and branded content.", gcc: "Content marketing and native advertising in Russia. Strong for storytelling and branded content.", bestFor: "Russia content marketing, native ads, storytelling", minBudget: "$3K+/month", regions: ["EAST"] },
  ]},
  { category: "E-commerce", description: "Russian e-commerce advertising platforms.", vendors: [
    { name: "Wildberries", type: "E-commerce", what: "Russia's largest online retailer. Marketplace model. Integrated advertising with sponsored products and display.", gcc: "Largest e-commerce platform in Russia and CIS. Product advertising and brand stores.", bestFor: "Russia e-commerce, marketplace advertising", minBudget: "$5K+/month", regions: ["EAST"] },
    { name: "Ozon", type: "E-commerce", what: "Russia's #2 online marketplace. Strong logistics. Ozon Performance for sponsored products, display, and video ads.", gcc: "Major Russian e-commerce platform. Performance marketing and brand advertising.", bestFor: "Russia e-commerce, performance marketing", minBudget: "$5K+/month", regions: ["EAST"] },
  ]},
];

const regionalVendors = {
  "All Channels": { desc: "Complete vendor ecosystem organised by channel - CTV, Video, Travel, Social, Mobile, Audio, DOOH, Verification, and Ad Servers. Each vendor tagged with regional availability: WEST (Americas/Europe), CENTRAL (MENA/Africa), EAST (APAC/China/India).", data: programmaticEcosystem },
  "WEST (Americas / Europe)": { desc: "Vendors with availability in Americas and European markets.", data: programmaticEcosystem.map(cat => ({...cat, vendors: cat.vendors.filter(v => v.regions?.includes("WEST"))})).filter(cat => cat.vendors.length > 0) },
  "CENTRAL (MENA / Africa)": { desc: "Vendors with availability in Middle East, North Africa, and African markets.", data: programmaticEcosystem.map(cat => ({...cat, vendors: cat.vendors.filter(v => v.regions?.includes("CENTRAL"))})).filter(cat => cat.vendors.length > 0) },
  "EAST (APAC / India)": { desc: "Vendors with availability in Asia-Pacific and Indian markets (excluding China and Russia - see dedicated tabs).", data: programmaticEcosystem.map(cat => ({...cat, vendors: cat.vendors.filter(v => v.regions?.includes("EAST"))})).filter(cat => cat.vendors.length > 0) },
  "China": { desc: "China operates a completely separate digital ecosystem. Google, Meta, YouTube, and most Western platforms are blocked. These are the essential platforms for reaching Chinese audiences.", data: chinaVendors },
  "Russia & CIS": { desc: "Russia's digital landscape shifted significantly since 2022. Meta and Google Ads are restricted. Local platforms dominate. These are the key platforms for reaching Russian audiences.", data: russiaVendors },
};

const creativeSpecs = [
  // META
  { platform: "Meta", placement: "Feed (FB + IG)", device: "Mobile + Desktop", format: "Image", ratio: "1:1", dimensions: "1080 × 1080 px", alt: "4:5 (1080×1350) recommended for mobile", duration: "N/A", fileSize: "30 MB max", fileType: "JPG, PNG", notes: "4:5 takes up more screen on mobile - higher engagement. Avoid heavy text overlays." },
  { platform: "Meta", placement: "Feed (FB + IG)", device: "Mobile + Desktop", format: "Video", ratio: "4:5", dimensions: "1080 × 1350 px", alt: "1:1 (1080×1080) also supported", duration: "Up to 241 min (15–60s recommended)", fileSize: "4 GB max", fileType: "MP4, MOV", notes: "H.264 compression, AAC audio. Captions boost watch time by 12%. Hook in first 3s." },
  { platform: "Meta", placement: "Feed Carousel", device: "Mobile + Desktop", format: "Image/Video", ratio: "1:1", dimensions: "1080 × 1080 px", alt: "All cards must share same ratio", duration: "Up to 240 min per card", fileSize: "30 MB image / 4 GB video", fileType: "JPG, PNG, MP4, MOV", notes: "2–10 cards. First card is the hook. Min 3 cards recommended. Strong for product showcase." },
  { platform: "Meta", placement: "Stories (FB + IG)", device: "Mobile only", format: "Image/Video", ratio: "9:16", dimensions: "1080 × 1920 px", alt: "1440 × 2560 for sharper quality", duration: "Up to 120s (5–15s recommended)", fileSize: "30 MB image / 4 GB video", fileType: "JPG, PNG, MP4, MOV", notes: "Full-screen vertical. Safe zone: keep text 250px from top, 340px from bottom (UI overlays). Sound-on environment." },
  { platform: "Meta", placement: "Reels (FB + IG)", device: "Mobile only", format: "Video", ratio: "9:16", dimensions: "1080 × 1920 px", alt: "No landscape - 9:16 mandatory", duration: "Up to 90s (15–30s sweet spot)", fileSize: "4 GB max", fileType: "MP4, MOV", notes: "Must feel native - UGC-style outperforms polished. Hook in first 2s. Trending audio helps. Auto-plays with sound." },
  { platform: "Meta", placement: "Right Column", device: "Desktop only", format: "Image", ratio: "1:1", dimensions: "1200 × 1200 px", alt: "Minimum 254 × 133 px", duration: "N/A", fileSize: "30 MB max", fileType: "JPG, PNG", notes: "Desktop-only placement. Small format - keep visuals simple and text minimal." },
  { platform: "Meta", placement: "Collection / Instant Experience", device: "Mobile only", format: "Image/Video", ratio: "1:1", dimensions: "1080 × 1080 px", alt: "Cover image/video + product grid", duration: "Video up to 120s", fileSize: "30 MB image / 4 GB video", fileType: "JPG, PNG, MP4, MOV", notes: "Full-screen post-click experience. Product images auto-pulled from catalogue (1:1 crop). Min 4 products." },
  { platform: "Meta", placement: "Threads", device: "Mobile + Desktop", format: "Image/Video", ratio: "1:1 or 16:9", dimensions: "1080 × 1080 px", alt: "Same specs as Feed", duration: "Same as Feed", fileSize: "Same as Feed", fileType: "JPG, PNG, MP4, MOV", notes: "NEW (Feb 2026). 400M+ MAU. Can run ads without a Threads profile using IG/FB creative." },
  { platform: "Meta", placement: "WhatsApp Status", device: "Mobile only", format: "Image/Video", ratio: "9:16", dimensions: "1080 × 1920 px", alt: "Same as Stories", duration: "Up to 60s", fileSize: "Same as Stories", fileType: "JPG, PNG, MP4, MOV", notes: "NEW. Auto-activates in Traffic campaigns via Advantage+. 95%+ WhatsApp penetration in GCC." },

  // TIKTOK
  { platform: "TikTok", placement: "In-Feed Video", device: "Mobile only", format: "Video", ratio: "9:16", dimensions: "1080 × 1920 px", alt: "1:1 and 16:9 supported but penalised", duration: "5s–10 min (15–60s recommended)", fileSize: "500 MB max", fileType: "MP4, MOV, AVI", notes: "Native feel essential. Hook in first 2s. Trending sounds boost reach. UGC-style > polished. Now supports up to 10 min." },
  { platform: "TikTok", placement: "TopView", device: "Mobile only", format: "Video", ratio: "9:16", dimensions: "1080 × 1920 px", alt: "Full-screen, auto-play, sound-on", duration: "Up to 60s", fileSize: "500 MB max", fileType: "MP4, MOV", notes: "First ad on app open. Now CPM/auction (not reservation). Book 4–6 weeks for peak GCC moments." },
  { platform: "TikTok", placement: "Brand Takeover", device: "Mobile only", format: "Image/Video", ratio: "9:16", dimensions: "1080 × 1920 px", alt: "Static 3s or GIF 3–5s", duration: "3–5s", fileSize: "500 MB max", fileType: "JPG, PNG, MP4, GIF", notes: "Full-screen on app open. 1 advertiser per day per category. Reservation only ($30K–$100K/day). No engagement." },
  { platform: "TikTok", placement: "Spark Ads", device: "Mobile only", format: "Video", ratio: "9:16", dimensions: "1080 × 1920 px", alt: "Uses existing organic creator post", duration: "Same as original post", fileSize: "N/A (uses existing post)", fileType: "N/A", notes: "Amplify creator/influencer content as paid ads. 70% higher CTR vs standard brand content. Requires creator authorisation code." },
  { platform: "TikTok", placement: "Branded Hashtag Challenge", device: "Mobile only", format: "Video", ratio: "9:16", dimensions: "1080 × 1920 px", alt: "Challenge page + UGC content", duration: "6-day package", fileSize: "N/A", fileType: "N/A", notes: "Reservation ($100K–$200K). Drives massive UGC. Combine with creator seeding. GCC users highly participatory." },
  { platform: "TikTok", placement: "Logo Takeover ★", device: "Mobile only", format: "Logo/Image", ratio: "Custom", dimensions: "Per TikTok spec (TBC)", alt: "App splash screen co-brand", duration: "App open moment", fileSize: "TBC", fileType: "TBC", notes: "NEW Mar 2026. Highest-impact format. Brand logo on TikTok splash. GCC availability - check with rep." },

  // SNAPCHAT
  { platform: "Snapchat", placement: "Single Image / Video", device: "Mobile only", format: "Image/Video", ratio: "9:16", dimensions: "1080 × 1920 px", alt: "Full-screen vertical only", duration: "3–180s video (6–15s recommended)", fileSize: "5 MB image / 1 GB video", fileType: "JPG, PNG, MP4, MOV", notes: "Between Stories placement. Swipe-up CTA. 6s Commercials are non-skippable and drive strong recall in GCC." },
  { platform: "Snapchat", placement: "Story Ads", device: "Mobile only", format: "Image/Video", ratio: "9:16", dimensions: "1080 × 1920 px", alt: "3–20 Snaps in a series", duration: "Each Snap 3–180s", fileSize: "5 MB image / 1 GB video per Snap", fileType: "JPG, PNG, MP4, MOV", notes: "Swipeable multi-Snap experience in Discover. Tile creative is the hook - make it visually arresting." },
  { platform: "Snapchat", placement: "AR Lens / AI Lens", device: "Mobile only", format: "AR/3D", ratio: "Full-screen", dimensions: "Per Lens Studio specs", alt: "Generative AI Lens (new)", duration: "Interactive (user-controlled)", fileSize: "Per Lens Studio", fileType: "Lens Studio project", notes: "Reservation ($15K–$50K+). AI Lenses use generative AI for personalised brand experiences. High earned media." },
  { platform: "Snapchat", placement: "Sponsored Snaps ★", device: "Mobile only", format: "Image/Video", ratio: "9:16", dimensions: "1080 × 1920 px", alt: "Appears in Chat/Inbox", duration: "Short-form", fileSize: "5 MB image / 1 GB video", fileType: "JPG, PNG, MP4, MOV", notes: "NEW 2025. Ads in users' inbox. High native feel. Strong for KSA/Kuwait (inbox-first usage behaviour)." },
  { platform: "Snapchat", placement: "Dynamic Product Ads", device: "Mobile only", format: "Auto-generated", ratio: "9:16", dimensions: "Auto from product feed", alt: "Requires product catalogue + Snap Pixel", duration: "N/A", fileSize: "N/A", fileType: "Product feed (XML/CSV)", notes: "Auto-generates ads from catalogue. Personalised per user. Strong for fashion/retail retargeting in GCC." },

  // YOUTUBE
  { platform: "YouTube", placement: "TrueView In-Stream (Skippable)", device: "Mobile + Desktop + CTV", format: "Video", ratio: "16:9", dimensions: "1920 × 1080 px (HD)", alt: "4K (3840×2160) supported", duration: "No max (30s–3min recommended)", fileSize: "256 GB max", fileType: "MP4, MOV, AVI, WMV", notes: "Skippable after 5s. CTA overlay + end screen. Paid only if 30s+ viewed. Arabic CTAs boost GCC performance." },
  { platform: "YouTube", placement: "Non-Skippable In-Stream", device: "Mobile + Desktop + CTV", format: "Video", ratio: "16:9", dimensions: "1920 × 1080 px", alt: "Vertical (9:16) for Shorts placement", duration: "15–20s (max 20s)", fileSize: "256 GB max", fileType: "MP4, MOV", notes: "Viewer must watch in full. Creative must be compelling throughout - no skip option. CPM: $6–$18." },
  { platform: "YouTube", placement: "Bumper Ads", device: "Mobile + Desktop + CTV", format: "Video", ratio: "16:9", dimensions: "1920 × 1080 px", alt: "", duration: "6s max (non-skippable)", fileSize: "256 GB max", fileType: "MP4, MOV", notes: "Short, punchy. Pairs with TrueView for sequencing (awareness → recall). Cost-efficient GCC reach." },
  { platform: "YouTube", placement: "YouTube Shorts", device: "Mobile only", format: "Video", ratio: "9:16", dimensions: "1080 × 1920 px", alt: "Vertical mandatory", duration: "Up to 60s", fileSize: "256 GB max", fileType: "MP4, MOV", notes: "Part of Demand Gen campaigns. Full-screen vertical. Competes with TikTok/Reels. Growing rapidly in GCC." },
  { platform: "YouTube", placement: "Masthead", device: "Mobile + Desktop + CTV", format: "Video", ratio: "16:9", dimensions: "1920 × 1080 px", alt: "Auto-plays muted on desktop", duration: "Up to 30s auto-play", fileSize: "Per Google spec", fileType: "MP4", notes: "Homepage takeover. Reservation $50K–$200K/day. Maximum reach. Book 6–8 weeks ahead for GCC." },
  { platform: "YouTube", placement: "Demand Gen (Multi-Surface)", device: "Mobile + Desktop", format: "Video/Image/Carousel", ratio: "16:9 (video), 1:1 or 4:5 (image)", dimensions: "1920×1080 (video), 1080×1080 (image)", alt: "Carousel: 1200×628 landscape", duration: "15–30s video recommended", fileSize: "4 GB video / 5 MB image", fileType: "MP4, MOV, JPG, PNG", notes: "Spans YouTube, Shorts, Gmail & Discover. AI selects format per user. Requires Google Tag + GA4." },

  // LINKEDIN
  { platform: "LinkedIn", placement: "Sponsored Content (Feed)", device: "Mobile + Desktop", format: "Image", ratio: "1.91:1 or 1:1", dimensions: "1200 × 627 px (landscape) or 1080 × 1080 px (square)", alt: "", duration: "N/A", fileSize: "5 MB max", fileType: "JPG, PNG", notes: "Square (1:1) now outperforms landscape on mobile. Professional tone essential." },
  { platform: "LinkedIn", placement: "Sponsored Content (Feed)", device: "Mobile + Desktop", format: "Video", ratio: "1:1, 16:9, or 9:16", dimensions: "Min 360px wide", alt: "Vertical (9:16) growing", duration: "3s–30 min (15–60s recommended)", fileSize: "200 MB max", fileType: "MP4", notes: "Auto-plays muted - captions essential. Hook in first 3s. Arabic captions for KSA campaigns." },
  { platform: "LinkedIn", placement: "Document Ads", device: "Mobile + Desktop", format: "Document (PDF)", ratio: "Vertical pages", dimensions: "Per document", alt: "Appears as swipeable carousel", duration: "N/A", fileSize: "100 MB max", fileType: "PDF, DOC, DOCX, PPT, PPTX", notes: "High engagement for thought leadership. Users swipe through pages like a carousel. Strong for B2B in GCC." },
  { platform: "LinkedIn", placement: "InMail / Message Ads", device: "Mobile + Desktop", format: "Text + Banner", ratio: "Banner: 300 × 250", dimensions: "300 × 250 px", alt: "Text body + CTA button + optional banner", duration: "N/A", fileSize: "2 MB banner", fileType: "JPG, PNG, GIF (non-animated)", notes: "Direct to inbox. 1 InMail per member per 45 days. Personalisation boosts open rates." },
  { platform: "LinkedIn", placement: "Thought Leader Ads", device: "Mobile + Desktop", format: "Organic post (boosted)", ratio: "Per original post", dimensions: "Per original post", alt: "Boosts personal profile post as ad", duration: "Per original post", fileSize: "Per original post", fileType: "Per original post", notes: "Amplify exec posts. Drives credibility. Underused in GCC but highly effective for B2B." },

  // X (TWITTER)
  { platform: "X (Twitter)", placement: "Promoted Ad (Timeline)", device: "Mobile + Desktop", format: "Image", ratio: "1.91:1 or 1:1", dimensions: "1200 × 675 px (landscape) or 1080 × 1080 px (square)", alt: "", duration: "N/A", fileSize: "5 MB max", fileType: "JPG, PNG", notes: "GIF also supported (up to 15 MB). Max 4 images per tweet." },
  { platform: "X (Twitter)", placement: "Promoted Video", device: "Mobile + Desktop", format: "Video", ratio: "16:9, 1:1, or 9:16", dimensions: "1920 × 1080 px (16:9) or 1080 × 1080 px (1:1)", alt: "Vertical (9:16) growing", duration: "Up to 2:20 (6–15s recommended)", fileSize: "1 GB max", fileType: "MP4, MOV", notes: "Auto-plays muted in timeline. Sound-on for in-stream pre-roll. Shorter = stronger for GCC live events." },
  { platform: "X (Twitter)", placement: "Website Card", device: "Mobile + Desktop", format: "Image/Video + CTA", ratio: "1.91:1", dimensions: "800 × 418 px (min)", alt: "Includes headline + URL + CTA button", duration: "Video up to 2:20", fileSize: "5 MB image / 1 GB video", fileType: "JPG, PNG, MP4, MOV", notes: "Image + CTA button drives higher CTR than plain promoted tweets. Strong for traffic campaigns." },
  { platform: "X (Twitter)", placement: "Trend Takeover+", device: "Mobile + Desktop", format: "Video/Image + Hashtag", ratio: "16:9", dimensions: "1200 × 675 px min", alt: "Dominates Trending tab for 24hrs", duration: "Up to 6s (GIF/Video)", fileSize: "Per format", fileType: "JPG, PNG, MP4, GIF", notes: "Reservation $20K–$55K/day. Drives earned hashtag usage. Powerful for F1, Saudi National Day, FIFA." },

  // PINTEREST
  { platform: "Pinterest", placement: "Standard Pin", device: "Mobile + Desktop", format: "Image", ratio: "2:3", dimensions: "1000 × 1500 px", alt: "1:1 supported but 2:3 preferred", duration: "N/A", fileSize: "20 MB max", fileType: "JPG, PNG", notes: "Vertical format dominates on Pinterest. Users are in planning/discovery mode - high purchase intent." },
  { platform: "Pinterest", placement: "Video Pin", device: "Mobile + Desktop", format: "Video", ratio: "1:1, 2:3, or 9:16", dimensions: "1080 × 1080 px (1:1) or 1080 × 1920 px (9:16)", alt: "Max-Width Video takes full mobile width", duration: "4s–15 min (6–15s recommended)", fileSize: "2 GB max", fileType: "MP4, MOV", notes: "Auto-plays muted. Max-Width Video (full screen) is highest impact. Strong for lifestyle/design brands." },
  { platform: "Pinterest", placement: "Shopping / Collections", device: "Mobile + Desktop", format: "Image", ratio: "1:1", dimensions: "1080 × 1080 px", alt: "Hero image + 3 secondary product images", duration: "N/A", fileSize: "20 MB max", fileType: "JPG, PNG", notes: "Requires product catalogue + Pinterest Tag. Hero image is the hook. Strong for fashion/home/beauty in UAE." },

  // PROGRAMMATIC
  { platform: "Programmatic", placement: "Display Banners", device: "Mobile + Desktop", format: "Image/HTML5", ratio: "Various", dimensions: "300×250, 728×90, 160×600, 320×50, 300×600", alt: "These 5 sizes cover 90%+ of inventory", duration: "N/A (HTML5: 15–30s loops)", fileSize: "150 KB (standard) / 200 KB (rich media)", fileType: "JPG, PNG, GIF, HTML5", notes: "Always produce all 5 core sizes. Arabic + English versions for KSA/Kuwait. Use DCO for personalisation." },
  { platform: "Programmatic", placement: "Native Ads", device: "Mobile + Desktop", format: "Image + Text", ratio: "1.91:1 or 1:1", dimensions: "1200 × 627 px (landscape) or 1200 × 1200 px (square)", alt: "Headline (25 chars) + Description (90 chars) + Image", duration: "N/A", fileSize: "1 MB max", fileType: "JPG, PNG", notes: "Blends with publisher content. Via Taboola/Outbrain. Strong for BFSI, real estate, government in GCC." },
  { platform: "Programmatic", placement: "Pre-Roll / Mid-Roll (OLV)", device: "Mobile + Desktop", format: "Video", ratio: "16:9", dimensions: "1920 × 1080 px", alt: "640×360 minimum", duration: "15s or 30s (non-skippable)", fileSize: "Per publisher spec", fileType: "MP4, MOV, VAST tag", notes: "Premium publisher video. Via PMP deals (Shahid, MBC, Zawya). VAST/VPAID tags for ad serving." },
  { platform: "Programmatic", placement: "CTV / OTT", device: "Smart TV / Streaming", format: "Video", ratio: "16:9", dimensions: "1920 × 1080 px (HD) or 3840 × 2160 px (4K)", alt: "Full-screen non-skippable", duration: "15s or 30s", fileSize: "Per publisher", fileType: "MP4, VAST tag", notes: "Shahid, OSN+, StarzPlay. Full-screen, sound-on, lean-back. Near-100% viewability. PMPs only in GCC." },
  { platform: "Programmatic", placement: "DOOH", device: "Digital Screens", format: "Image/Video", ratio: "Varies by screen", dimensions: "Varies: 1920×1080, 1080×1920, 3840×2160", alt: "Check screen specs per location", duration: "10–15s video loops", fileSize: "Per network (typically <50 MB)", fileType: "JPG, PNG, MP4", notes: "Dubai Mall, SZR, airport, Riyadh screens. Always confirm exact specs with DOOH vendor. No audio on most screens." },
  { platform: "Programmatic", placement: "Audio (Spotify, Anghami)", device: "Mobile + Desktop", format: "Audio + Companion", ratio: "Companion: 1:1", dimensions: "Companion: 640 × 640 px", alt: "Audio: 15s or 30s", duration: "15s or 30s audio", fileSize: "Audio: 1 MB / Companion: 200 KB", fileType: "MP3, WAV (audio) / JPG, PNG (companion)", notes: "Anghami is the leading Arabic audio platform. Companion display shown during audio ad. Contextual targeting by mood/genre." },
];

const budgetTiers = [
  { tier: "Starter", budget: "$5K–$15K/mo", platforms: "Meta + 1 (TikTok or Snap)", mix: "Meta 70–80%, 1 secondary", max: 2, buying: "Auction only", reach: "50K–300K impressions/mo", constraint: "Too small for reservation formats" },
  { tier: "Growth", budget: "$15K–$50K/mo", platforms: "Meta + TikTok + Snap or YouTube", mix: "Meta 50–60%, TikTok 20–25%, Other 15–25%", max: 3, buying: "Auction + minor reservation", reach: "300K–1.5M impressions/mo", constraint: "Begin testing platform mix" },
  { tier: "Mid-Market", budget: "$50K–$150K/mo", platforms: "Meta + TikTok + Snap + YouTube + LinkedIn/X", mix: "Meta 35–40%, TikTok 20–25%, Snap 15–20%, YouTube 10–15%", max: 5, buying: "Auction + reservation formats", reach: "1.5M–6M impressions/mo", constraint: "Balance always-on with moment spikes" },
  { tier: "Premium", budget: "$150K–$400K/mo", platforms: "All major + Programmatic + DOOH", mix: "Meta 30–35%, TikTok 15–20%, YouTube 15%, Snap 10–15%, Prog 10%, DOOH 5–10%", max: 7, buying: "Auction + multiple reservations + PMPs", reach: "6M–20M impressions/mo", constraint: "Creative production is the bottleneck" },
  { tier: "Enterprise", budget: "$400K+/mo", platforms: "All + CTV + DOOH + Content partnerships", mix: "Meta 25–30%, TikTok 15–20%, YouTube 15–20%, Snap 10%, Prog+CTV 15%, DOOH 5–10%", max: "All", buying: "Full reservation + category exclusives", reach: "20M+ impressions/mo", constraint: "Measurement & attribution is the primary challenge" },
];

const channelMixByObjective = [
  { objective: "Brand Awareness", meta: "30%", tiktok: "20%", snap: "15%", youtube: "20%", google: "-", linkedin: "-", x: "5%", prog: "10%" },
  { objective: "Video Views", meta: "25%", tiktok: "30%", snap: "15%", youtube: "25%", google: "-", linkedin: "-", x: "5%", prog: "-" },
  { objective: "Traffic", meta: "40%", tiktok: "15%", snap: "15%", youtube: "-", google: "15%", linkedin: "5%", x: "5%", prog: "5%" },
  { objective: "Lead Gen", meta: "40%", tiktok: "15%", snap: "15%", youtube: "-", google: "10%", linkedin: "15%", x: "5%", prog: "-" },
  { objective: "E-commerce", meta: "45%", tiktok: "15%", snap: "10%", youtube: "-", google: "20%", linkedin: "-", x: "-", prog: "10%" },
  { objective: "App Installs", meta: "40%", tiktok: "20%", snap: "15%", youtube: "-", google: "20%", linkedin: "-", x: "-", prog: "5%" },
  { objective: "B2B", meta: "20%", tiktok: "-", snap: "-", youtube: "-", google: "15%", linkedin: "50%", x: "10%", prog: "5%" },
  { objective: "Full Funnel", meta: "30%", tiktok: "15%", snap: "12%", youtube: "10%", google: "15%", linkedin: "8%", x: "5%", prog: "10%" },
];

const seasonalCalendar = [];

const measurementSetup = [
  { tracking: "Meta Pixel + CAPI", what: "Tracks user actions on website. CAPI sends events server-side, bypassing iOS restrictions and ad blockers.", platform: "Meta", checks: ["Pixel installed and firing on all key pages", "CAPI implemented (server-side)", "Event deduplication configured", "Test Events tool confirms correct firing", "Standard events mapped (ViewContent, AddToCart, Purchase)"] },
  { tracking: "TikTok Events API + Pixel", what: "Server-side and browser-side event tracking. Required for conversion optimisation and accurate ROAS.", platform: "TikTok", checks: ["TikTok Pixel installed", "Events API implemented server-side", "Events verified in Events Manager", "Conversion events prioritised correctly", "Attribution window agreed (7-day click / 1-day view)"] },
  { tracking: "Snap Pixel + CAPI", what: "Tracks Snapchat-driven conversions. Required for Dynamic Ads and Smart Bidding.", platform: "Snapchat", checks: ["Snap Pixel installed", "CAPI implemented", "Pixel Events Manager shows data flowing", "Eligibility check passed"] },
  { tracking: "LinkedIn Insight Tag", what: "Tracks LinkedIn-driven website visits and conversions. Enables retargeting audiences.", platform: "LinkedIn", checks: ["Insight Tag installed on all pages", "Conversion events configured", "Domain verified in Campaign Manager"] },
  { tracking: "GA4 + UTM Parameters", what: "Cross-platform session tracking, attribution, and audience data.", platform: "All Platforms", checks: ["GA4 property configured", "UTM naming convention documented and shared", "Parameters applied to all ad URLs", "GA4 linked to Google Ads"] },
  { tracking: "3rd Party Verification (DV/IAS)", what: "Verifies viewability, brand safety, and invalid traffic.", platform: "Programmatic + Social", checks: ["DV or IAS tags implemented", "Brand safety categories configured", "Viewability threshold set (70%+)", "IVT monitoring active"] },
];

const attributionCaveats = [
  { caveat: "Each platform claims credit for conversions", detail: "A single purchase can be claimed by all four platforms simultaneously. Platform ROAS always looks better than reality.", handle: "Never sum platform ROAS. Use GA4 or MMP as single source of truth." },
  { caveat: "View-Through Attribution (VTA)", detail: "If someone saw your ad on Monday and bought on Friday without clicking, Meta claims the conversion. Default: 7-day click + 1-day view.", handle: "Explain VTA to clients upfront. Consider click-only attribution if strong organic demand." },
  { caveat: "Learning Phase & Data Instability", detail: "After any significant change, platforms re-enter a 7–14 day learning phase where CPAs are elevated.", handle: "Brief clients at kickoff. No structural changes in first 7–14 days." },
  { caveat: "iOS Privacy & Signal Loss", detail: "~60–70% of iOS users opt out of tracking. Platform-reported numbers are understated.", handle: "CAPI/server-side tracking is non-negotiable. Platform numbers are a floor, not ceiling." },
  { caveat: "Cash on Delivery (COD) - MENA & APAC", detail: "Significant COD orders in KSA can't be tracked via standard pixel events.", handle: "Ask for COD % at briefing. If >20%, build a blended attribution model." },
];

const caveats = [
  { area: "Benchmarks Are Directional & Region-Dependent", risk: "Actual costs vary by vertical, creative quality, audience, competition, algorithm state, AND market. CPMs in Western Europe are 2–3x higher than Southeast Asia. MENA spikes 2–3x during Ramadan. China operates entirely different pricing through BAT ecosystems.", handle: "Never guarantee. Present as ranges per region. Your own data always beats published benchmarks. Build separate benchmark databases per region.", flag: "Client asks for a KPI guarantee in writing. Using US benchmarks for a MENA campaign or vice versa." },
  { area: "Reservation Pricing Volatility", risk: "Pricing changes frequently, fluctuates with demand especially during Ramadan, National Days, sports.", handle: "Always get a formal rep quote. Quotes expire - confirm before presenting.", flag: "Plan includes reservation based on quote older than 2 weeks." },
  { area: "Platform Algorithm Changes", risk: "Meta had 83 changes in 2025. TikTok launched 4 formats in Mar 2026.", handle: "Check newsrooms monthly. Audit settings each campaign.", flag: "Plan uses template not updated in 6+ months." },
  { area: "Creative Is #1 Variable", risk: "Algorithm uses creative as primary targeting signal. Weak creative kills performance regardless of strategy.", handle: "Make creative quality non-negotiable. Flag non-native creative. Recommend A/B testing.", flag: "Single creative asset. No 9:16 vertical available." },
  { area: "Regional Cultural & Legal Sensitivity", risk: "Content acceptable globally may be restricted regionally markets.", handle: "Review all creative against regional guidelines. Check platform policies for market restrictions.", flag: "Global creative applied to regional without local review." },
  { area: "Regional Cultural Calendar Conflicts", risk: "Every region has peak media periods that spike CPMs: Ramadan/Eid (MENA, 2–3x CPM), Black Friday/Christmas (WEST), Singles Day/Golden Week/Chinese New Year (EAST), Diwali (India). Multi-market campaigns must account for these independently.", handle: "Build a global cultural calendar mapping peak periods per region. Plan budgets per market with seasonal weighting. Book reservation formats 6–10 weeks ahead for peak moments in any region.", flag: "A global campaign ignoring regional peak periods. Running flat monthly budgets across markets with different seasonal patterns." },
  { area: "Minimum Budgets", risk: "Below thresholds, results are statistically unreliable.", handle: "Meta ~$5K/mo, TikTok ~$5K/mo, LinkedIn ~$5K+/mo practical minimum.", flag: "Any platform with <$3K/month." },
  { area: "Data Privacy & First-Party Data", risk: "Third-party cookies declining. Retargeting capabilities reducing.", handle: "CAPI/server-side baseline. Build first-party data (CRM, loyalty, emails).", flag: "Conversion campaign with no first-party data strategy." },
  { area: "Brand Safety", risk: "Ads appearing alongside inappropriate content causes brand damage.", handle: "Apply platform controls. Use PMPs for programmatic. Keyword exclusion lists.", flag: "Programmatic open exchange without DV/IAS." },
];

const qaChecklist = {
  "Brief & Strategy": [
    "Objective is clearly defined with measurable KPI and target range",
    "Target audience documented (demographics, markets, language)",
    "Budget allocation confirmed per platform per month",
    "Flight dates confirmed - align with regional cultural calendar",
    "Client signed off on final media plan in writing",
  ],
  "Creative": [
    "All assets in correct formats and specs per platform",
    "9:16 vertical available for Reels, TikTok, Snapchat, Shorts",
    "Arabic creative available for KSA and Kuwait campaigns",
    "Creative reviewed for the market cultural sensitivity",
    "All assets uploaded and approved in platform ad managers",
    "No creative currently in rejected status",
  ],
  "Tracking & Measurement": [
    "Meta Pixel firing confirmed (Test Events tool)",
    "CAPI/server-side tracking implemented and verified",
    "TikTok Pixel + Events API configured and firing",
    "Snap Pixel verified",
    "LinkedIn Insight Tag installed",
    "UTM parameters applied to all destination URLs",
    "GA4 receiving traffic from all campaign sources",
    "Conversion events mapped correctly in all platforms",
  ],
  "Campaign Setup": [
    "Naming convention applied consistently across platforms",
    "Targeting verified - age, gender, geo, language, interests",
    "Budget pacing set correctly (daily vs lifetime)",
    "Bid strategy confirmed and appropriate for objective",
    "Frequency caps set for awareness (2–3x/week)",
    "Brand safety settings applied",
    "Ad scheduling set if event-based timing required",
    "All ads have correct destination URLs and CTAs",
  ],
  "Final Sign-Off": [
    "Two-person internal review completed",
    "Client confirmed creative preview and go-live approval",
    "First reporting date agreed and calendared",
    "Pacing/dashboard alerts configured",
  ],
};

const commonMistakes = [
  { mistake: "Treating regional as one market", why: "Brief says 'global campaign' or 'regional campaign' - same mix used everywhere", fix: "Segment by market within each region.", rule: "Document platform priority per market, not just per campaign." },
  { mistake: "Optimising before learning phase ends", why: "Client/AM panics at early CPAs and forces changes in week 1", fix: "Set expectations before launch. Share learning phase timeline.", rule: "No structural changes in first 7–14 days." },
  { mistake: "Claiming ROAS without attribution caveats", why: "Platform ROAS reported without noting view-through / double-counting", fix: "Always label as 'platform-reported'. Use GA4 as cross-channel truth.", rule: "Every ROAS figure must include source and attribution model." },
  { mistake: "Planning without confirmed creative", why: "Plan built before knowing creative will be delivered in right specs", fix: "Creative requirements are prerequisite of brief sign-off.", rule: "Don't activate without confirmed creative." },
  { mistake: "Spreading budget across too many platforms", why: "Client wants to 'be everywhere' or planner pads the plan", fix: "Apply minimum budget test: $5K/month per platform.", rule: "Every platform must have a clear role, justified budget, and KPI." },
  { mistake: "Not booking reservations early enough", why: "Planner assumes inventory is always available", fix: "Create reservations calendar. Book 4–8 weeks before peaks.", rule: "Reservation formats must be confirmed ahead." },
  { mistake: "Using a single creative per campaign", why: "Limited creative production budget", fix: "Advocate for minimum 3 variants. AI optimisation needs creative variety.", rule: "Campaign success is heavily reliant on creatives." },
];

const platformUpdates = [
  { platform: "Meta", update: "Andromeda Algorithm - Global Rollout", impact: "🔴", date: "Oct 2025", detail: "Creative is now the primary targeting signal. Supply 8–12 diverse creatives per campaign." },
  { platform: "Meta", update: "Advantage+ Sales (replaces Shopping)", impact: "🔴", date: "Early 2026", detail: "Covers broader conversion objectives. Old API deprecated - migrate by Sep 2026." },
  { platform: "Meta", update: "Threads Ads - Global Rollout", impact: "🔴", date: "Feb 2026", detail: "400M+ MAU. Image, video, carousel ads via Ads Manager." },
  { platform: "Meta", update: "WhatsApp Status Ads Expanding", impact: "🔴", date: "Mar 2026", detail: "Auto-activates in Traffic campaigns. ~95%+ WhatsApp penetration in MENA, 60%+ India/LATAM." },
  { platform: "Meta", update: "Detailed Targeting Exclusions Removed", impact: "🔴", date: "Mar 2025", detail: "Rely on creative signals, Value Rules, and first-party data (CAPI)." },
  { platform: "TikTok", update: "Logo Takeover - NEW", impact: "🔴", date: "Mar 2026", detail: "Highest-impact format. Brand logo co-brands TikTok splash screen." },
  { platform: "TikTok", update: "Prime Time - NEW", impact: "🔴", date: "Mar 2026", detail: "3 sequential ads, 15-min window. For live events." },
  { platform: "TikTok", update: "TopReach - NEW", impact: "🔴", date: "Mar 2026", detail: "Bundles TopView + TopFeed in single buy." },
  { platform: "TikTok", update: "TopView → CPM/Auction", impact: "🔴", date: "2023+", detail: "More targeting flexibility. Brand Takeover remains reservation." },
  { platform: "Snapchat", update: "Total Snap Takeover - NEW", impact: "🔴", date: "Mar 2026", detail: "First ad across ALL app tabs. 97% users visit multiple tabs." },
  { platform: "Snapchat", update: "Sponsored Snaps - Global", impact: "🔴", date: "2025", detail: "Ads in Chat/Inbox. High native feel. Inbox-first in KSA/Kuwait." },
  { platform: "Snapchat", update: "Smart Bidding & Smart Budget", impact: "🟡", date: "May 2025", detail: "Auto CPA bidding and spend reallocation. Aligns with Meta Advantage+." },
  { platform: "Cross-Platform", update: "9:16 Vertical is Default Standard", impact: "🔴", date: "2025–26", detail: "Meta confirmed 90% vertical by 2026. Non-vertical ads penalised." },
  { platform: "Cross-Platform", update: "AI-Driven Creative Optimisation", impact: "🔴", date: "2025–26", detail: "All major platforms use AI for creative selection. Supply 8–12 variants." },
  { platform: "Cross-Platform", update: "First-Party Data & Server-Side Essential", impact: "🔴", date: "2025–26", detail: "CAPI, Events API, Snap CAPI are measurement baseline." },
];

const glossary = [
  { term: "CPM", full: "Cost Per Mille", def: "Cost to serve 1,000 impressions", use: "Awareness, Reach" },
  { term: "CPC", full: "Cost Per Click", def: "Cost for each click on the ad", use: "Traffic, Lead Gen" },
  { term: "CPV", full: "Cost Per View", def: "Cost for each qualifying video view", use: "Video Views" },
  { term: "CPCV", full: "Cost Per Completed View", def: "Cost when video watched to 100%", use: "Video, OLV" },
  { term: "CPI", full: "Cost Per Install", def: "Cost per app install", use: "App Installs" },
  { term: "CPL", full: "Cost Per Lead", def: "Cost per lead form submission", use: "Lead Gen" },
  { term: "CPA", full: "Cost Per Acquisition", def: "Cost per conversion event", use: "Conversions" },
  { term: "ROAS", full: "Return on Ad Spend", def: "Revenue ÷ Spend", use: "E-commerce" },
  { term: "CTR", full: "Click-Through Rate", def: "Clicks ÷ Impressions × 100", use: "Traffic" },
  { term: "VTR", full: "View-Through Rate", def: "Video views ÷ Impressions × 100", use: "Video" },
  { term: "VCR", full: "Video Completion Rate", def: "Completed views ÷ Total starts × 100", use: "Video" },
  { term: "ThruPlay", full: "ThruPlay (Meta)", def: "View of 15s+ (or full if <15s)", use: "Meta Video" },
  { term: "vCPM", full: "Viewable CPM", def: "CPM when 50%+ in-view for 1+ second", use: "Display" },
  { term: "CVR", full: "Conversion Rate", def: "Conversions ÷ Clicks × 100", use: "Conversions" },
  { term: "LPV", full: "Landing Page Views", def: "Sessions where page fully loads", use: "Traffic Quality" },
  { term: "oCPM", full: "Optimised CPM", def: "Platform optimises for desired outcome", use: "Awareness" },
  { term: "tROAS", full: "Target ROAS", def: "Automated bidding targeting specific ROAS", use: "Google" },
  { term: "SOV", full: "Share of Voice", def: "Brand's share of total impressions in category", use: "Competitive" },
  { term: "DCO", full: "Dynamic Creative Optimisation", def: "Automated creative personalisation", use: "Retargeting" },
  { term: "PMP", full: "Private Marketplace", def: "Invite-only programmatic auction", use: "Programmatic" },
  { term: "MTA", full: "Multi-Touch Attribution", def: "Credit across multiple touchpoints", use: "Measurement" },
  { term: "MMM", full: "Marketing Mix Modelling", def: "Statistical analysis across all channels", use: "Enterprise" },
  { term: "COD", full: "Cash on Delivery", def: "Still dominant in KSA e-commerce", use: "E-commerce KSA" },
  { term: "DSF", full: "Dubai Shopping Festival", def: "Annual retail event in UAE", use: "All Platforms" },
  { term: "Demand Gen", full: "Google Demand Gen", def: "AI campaign across YouTube, Gmail & Discover", use: "Google Conv." },
  { term: "PMax", full: "Performance Max", def: "Fully automated all-Google inventory campaign", use: "Google E-com" },
  { term: "DOOH", full: "Digital Out-of-Home", def: "Digital billboard ads, programmatic", use: "Awareness" },
  { term: "CTV", full: "Connected TV", def: "Streaming TV ads via internet TV", use: "Awareness, Video" },
];

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => sessionStorage.getItem("playbook_auth") === "true");
  const [loginUser, setLoginUser] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeSection, setActiveSection] = useState("overview");
  const [search, setSearch] = useState("");
  const [checkedItems, setCheckedItems] = useState({});
  const [mobileNav, setMobileNav] = useState(false);
  const [vendorRegion, setVendorRegion] = useState("All Channels");
  const [creativePlatform, setCreativePlatform] = useState("All");
  const [funnelJourney, setFunnelJourney] = useState("E-commerce");
  const [funnelHover, setFunnelHover] = useState(null);
  const [budgetTotal, setBudgetTotal] = useState(50000);
  const [budgetObjective, setBudgetObjective] = useState("Full Funnel");
  const [budgetMarket, setBudgetMarket] = useState("UAE/MENA");
  const [briefData, setBriefData] = useState({ objective: "Awareness", audience: "", markets: [], budget: "", dates: "", creative: "", kpi: "", notes: "" });
  const [selectedPlatforms, setSelectedPlatforms] = useState(["Meta", "TikTok"]);
  const [comparePlatforms, setComparePlatforms] = useState(["Meta (Facebook + Instagram)", "TikTok", "Snapchat"]);
  const [benchmarkData, setBenchmarkData] = useState([]);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiResult, setAiResult] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [audienceData, setAudienceData] = useState([
    { persona: "Primary", description: "", market: "UAE", platform: "Meta", ageRange: "25-44", gender: "All", interests: "", estimatedSize: "", notes: "" },
  ]);
  const [planInputs, setPlanInputs] = useState({ objective: "Conversions / E-commerce", budget: 50000, markets: ["UAE"], duration: 2, audience: "25-44", vertical: "Real Estate", hasCreative: true, hasTracking: true });
  const [planGenerated, setPlanGenerated] = useState(false);
  const contentRef = useRef(null);

  const toggleCheck = (key) => setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }));

  const totalChecks = Object.values(qaChecklist).flat().length;
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;

  useEffect(() => { if (contentRef.current) contentRef.current.scrollTop = 0; }, [activeSection]);

  // ── SET YOUR CREDENTIALS HERE ──
  const VALID_USER = "PHD";
  const VALID_PASS = "PHD2026!";
  // ────────────────────────────────

  const handleLogin = () => {
    if (loginUser === VALID_USER && loginPass === VALID_PASS) {
      sessionStorage.setItem("playbook_auth", "true");
      setIsLoggedIn(true);
      setLoginError("");
    } else {
      setLoginError("Invalid username or password");
    }
  };

  if (!isLoggedIn) {
    return (
      <div style={{ minHeight: "100vh", background: "#f5f5f7", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <div style={{ width: 380, padding: 40, background: "#ffffff", borderRadius: 16, border: "1px solid #e0e0e8", boxShadow: "0 20px 60px rgba(0,0,0,.5)", borderTop: "3px solid #7AC143" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ marginBottom: 12 }}><img src="data:image/png;base64,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" alt="PHd" style={{ width: 160, height: "auto" }} /></div><div style={{ fontSize: 11, fontWeight: 700, color: "#7AC143", letterSpacing: "0.05em" }}>Intelligence. Connected.</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: "#1a1a2e", marginTop: 6 }}>Global Media Planning Playbook</div>
            <div style={{ fontSize: 11, color: "#7a7a8a", marginTop: 8 }}>Internal access only - enter your credentials</div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#5a5a6e", marginBottom: 4 }}>Username</div>
            <input value={loginUser} onChange={e => setLoginUser(e.target.value)} onKeyDown={e => e.key === "Enter" && handleLogin()} placeholder="Enter username" style={{ width: "100%", padding: "10px 14px", background: "#f5f5f7", border: "1px solid #e0e0e8", borderRadius: 8, color: "#1a1a2e", fontSize: 13, fontFamily: "inherit", boxSizing: "border-box", outline: "none" }} />
          </div>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#5a5a6e", marginBottom: 4 }}>Password</div>
            <input type="password" value={loginPass} onChange={e => setLoginPass(e.target.value)} onKeyDown={e => e.key === "Enter" && handleLogin()} placeholder="Enter password" style={{ width: "100%", padding: "10px 14px", background: "#f5f5f7", border: "1px solid #e0e0e8", borderRadius: 8, color: "#1a1a2e", fontSize: 13, fontFamily: "inherit", boxSizing: "border-box", outline: "none" }} />
          </div>
          {loginError && <div style={{ fontSize: 11, color: "#cc3333", marginBottom: 12, textAlign: "center" }}>{loginError}</div>}
          <button onClick={handleLogin} style={{ width: "100%", padding: "12px", borderRadius: 8, border: "none", background: "linear-gradient(135deg, #2D1768, #1a0e40)", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Sign In</button>
          <div style={{ fontSize: 9, color: "#2D176840", textAlign: "center", marginTop: 16 }}>Contact your team lead for access credentials</div>
        </div>
      </div>
    );
  }

  const filterText = search.toLowerCase();

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "'DM Sans', 'Segoe UI', sans-serif", background: "#f5f5f7", color: "#1a1a2e", overflow: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      <style>{`@keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.7; transform: scale(1.08); } }
        @keyframes creaturePop { 0% { transform: scale(0); opacity: 0; } 30% { transform: scale(1.2); opacity: 1; } 100% { transform: scale(1); opacity: 1; } }
        @keyframes ballOpen { 0% { transform: rotate(0deg); } 100% { transform: rotate(-120deg) translateY(-5px); opacity: 0; } }
        @keyframes creatureJump { 0% { opacity: 0; transform: translateY(20px) scale(0.3); } 50% { opacity: 1; transform: translateY(-8px) scale(1.1); } 70% { transform: translateY(0px) scale(0.95); } 100% { opacity: 1; transform: translateY(-2px) scale(1); } }
        @keyframes sparkle { 0% { opacity: 0; transform: scale(0); } 50% { opacity: 1; transform: scale(1.3); } 100% { opacity: 0; transform: scale(0.5); } }
        @keyframes ballShake { 0%, 100% { transform: rotate(0deg); } 25% { transform: rotate(-5deg); } 75% { transform: rotate(5deg); } }
        @keyframes pikaJump { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
      `}</style>

      {/* Mobile nav toggle */}
      <button onClick={() => setMobileNav(!mobileNav)} style={{ position: "fixed", top: 12, left: 12, zIndex: 1000, display: "none", background: "#ffffff", border: "1px solid #e0e0e8", borderRadius: 8, color: "#1a1a2e", padding: "8px 12px", fontSize: 18, cursor: "pointer", "@media(maxWidth:768px)": { display: "block" } }}>☰</button>

      {/* Sidebar */}
      <nav style={{ width: 240, minWidth: 240, background: "#f9f9fb", borderRight: "1px solid #e5e5ea", display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ padding: "20px 16px 12px", borderBottom: "1px solid #e5e5ea" }}>
          <div style={{ marginBottom: 12 }}><img src="data:image/png;base64,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" alt="PHd" style={{ width: 160, height: "auto" }} /></div><div style={{ fontSize: 11, fontWeight: 700, color: "#7AC143", letterSpacing: "0.05em" }}>Intelligence. Connected.</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: "#1a1a2e", marginTop: 2 }}>Planning Playbook</div>
          <div style={{ fontSize: 10, color: "#7a7a8a", marginTop: 4 }}>Updated March 2026 · PHD</div>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "8px 8px" }}>
          {SECTIONS.map(s => s.id === "divider" ? (
            <div key={s.id} style={{ padding: "8px 12px", fontSize: 9, fontWeight: 800, color: "#9a9aaa", letterSpacing: "0.1em", textAlign: "center" }}>{s.label}</div>
          ) : (
            <button
              key={s.id}
              onClick={() => { setActiveSection(s.id); setMobileNav(false); }}
              style={{
                display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "9px 12px", border: "none",
                borderRadius: 8, cursor: "pointer", fontSize: 12.5, fontWeight: 600, fontFamily: "inherit", textAlign: "left",
                background: activeSection === s.id ? "#2D176812" : "transparent",
                color: activeSection === s.id ? "#2D1768" : "#888899",
                transition: "all .15s",
              }}
            >
              <span style={{ fontSize: 14 }}>{s.icon}</span> {s.label}
            </button>
          ))}
        </div>
        <div style={{ padding: "12px 16px", borderTop: "1px solid #e5e5ea", fontSize: 10, color: "#9a9aaa" }}>
          All benchmarks in USD · Global · Directional only
        </div>
      </nav>

      {/* Main Content */}
      <main ref={contentRef} style={{ flex: 1, overflowY: "auto", padding: "28px 36px 60px" }}>
        <div style={{ maxWidth: 900 }}>
          <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 20 }}>
            <div style={{ flex: 1 }}><SearchBar value={search} onChange={setSearch} /></div>
            <button onClick={() => setActiveSection("aiplanner")} style={{ padding: "10px 18px", borderRadius: 10, border: "none", background: "linear-gradient(135deg, #2D1768, #7AC143)", color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap", boxShadow: "0 2px 8px rgba(45,23,104,.25)", flexShrink: 0, marginTop: 0 }}>🤖 AI Plan Generator</button>
          </div>

          {/* OVERVIEW */}
          {activeSection === "overview" && (
            <div>
              <SectionTitle>Global Digital Media Planning Framework 2026</SectionTitle>
              <SectionDesc>The complete internal reference for digital media planning across global markets - WEST (Americas/Europe), CENTRAL (MENA/Africa), and EAST (APAC/China/India). Contains the full planning toolkit: platform-by-objective framework with benchmarks, verified 2026 platform updates, high-impact format guidance, regional cultural calendar, budget recommendations, and QA checklists.</SectionDesc>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 12, marginBottom: 24 }}>
                {SECTIONS.filter(s => s.id !== "overview").map(s => (
                  <Card key={s.id} hoverable onClick={() => setActiveSection(s.id)} style={{ cursor: "pointer" }}>
                    <div style={{ fontSize: 22, marginBottom: 6 }}>{s.icon}</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#1a1a2e" }}>{s.label}</div>
                  </Card>
                ))}
              </div>

              <Card style={{ background: "#f0edf5", border: "1px solid #d0d0e0" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#2D1768", marginBottom: 8 }}>⚡ Key 2026 Changes (Global)</div>
                <div style={{ fontSize: 12, color: "#444455", lineHeight: 1.8 }}>
                  • <strong style={{ color: "#1a1a2e" }}>Meta Andromeda</strong> - Creative is now the primary targeting signal (8–12 assets per campaign)<br/>
                  • <strong style={{ color: "#1a1a2e" }}>TikTok NewFronts</strong> - Logo Takeover, Prime Time, TopReach, Pulse Mentions all new<br/>
                  • <strong style={{ color: "#1a1a2e" }}>Snapchat</strong> - Total Snap Takeover, Sponsored Snaps, Reminder Ads, AI Lenses<br/>
                  • <strong style={{ color: "#1a1a2e" }}>Google</strong> - Demand Gen replaces Discovery Ads; PMax covers all Google surfaces<br/>
                  • <strong style={{ color: "#1a1a2e" }}>Cross-Platform</strong> - 9:16 vertical is default standard; server-side tracking mandatory
                </div>
              </Card>
            </div>
          )}

          {/* PLANNING PROCESS */}
          {activeSection === "planning" && (
            <div>
              <SectionTitle>Planning Process & Methodology</SectionTitle>
              <SectionDesc>The 9-stage end-to-end planning process from brief intake to post-campaign analysis.</SectionDesc>
              {planningStages.filter(s => !filterText || JSON.stringify(s).toLowerCase().includes(filterText)).map((s, i) => (
                <Accordion key={i} title={s.stage} subtitle="Expand for details">
                  <div style={{ fontSize: 13, color: "#555566", lineHeight: 1.7 }}>
                    <div style={{ marginBottom: 12 }}>
                      <div style={{ fontWeight: 700, color: "#2D1768", fontSize: 11, textTransform: "uppercase", marginBottom: 4 }}>What Happens</div>
                      {s.what}
                    </div>
                    <div style={{ marginBottom: 12 }}>
                      <div style={{ fontWeight: 700, color: "#2a8c3e", fontSize: 11, textTransform: "uppercase", marginBottom: 4 }}>Agency Actions & Outputs</div>
                      {s.actions}
                    </div>
                    <div style={{ background: "#faf0f0", borderRadius: 8, padding: 12, border: "1px solid #e0d0e8" }}>
                      <div style={{ fontWeight: 700, color: "#cc3333", fontSize: 11, textTransform: "uppercase", marginBottom: 4 }}>⚠️ Common Mistake</div>
                      {s.mistake}
                    </div>
                  </div>
                </Accordion>
              ))}
            </div>
          )}

          {/* PLATFORM SELECTION */}
          {activeSection === "platforms" && (
            <div>
              <SectionTitle>Platform Evaluation & Selection</SectionTitle>
              <SectionDesc>A holistic framework for evaluating each platform. Consider: Does our audience live here? Can the platform deliver on our KPIs? Do we have the right creative, tracking, and budget? What does past performance tell us?</SectionDesc>

              <Card style={{ background: "#f0edf5", border: "1px solid #d0d0e0", marginBottom: 20 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#2D1768", marginBottom: 8 }}>🎯 Platform Selection Framework - 6 Questions Before Adding Any Platform</div>
                <div style={{ fontSize: 12, color: "#444455", lineHeight: 1.9 }}>
                  <strong style={{ color: "#2a8c3e" }}>1. Audience:</strong> Is our target audience actually on this platform in this market? (Don't assume - check platform data)<br/>
                  <strong style={{ color: "#b8860b" }}>2. Capability:</strong> Can this platform deliver against our specific KPI? (Awareness ≠ Conversion ≠ Lead Gen)<br/>
                  <strong style={{ color: "#6a1b9a" }}>3. Creative:</strong> Do we have the right creative format for this platform? (9:16 for TikTok/Snap, UGC-style, Arabic versions)<br/>
                  <strong style={{ color: "#2D1768" }}>4. Measurement:</strong> Is tracking in place? (Pixel, CAPI, Events API, UTMs, GA4 - platform-specific)<br/>
                  <strong style={{ color: "#cc3333" }}>5. Budget:</strong> Is budget sufficient for the platform to exit learning phase and deliver meaningful data?<br/>
                  <strong style={{ color: "#1a8a8a" }}>6. Vendor Approval:</strong> Is this platform/vendor part of Omnicom's approved vendor list? Confirm compliance before activation.
                </div>
              </Card>

              {platforms.filter(p => !filterText || JSON.stringify(p).toLowerCase().includes(filterText)).map((p, i) => (
                <Accordion key={i} title={<span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><PlatformLogo platform={p.name.split(" ")[0] === "Google" ? "Google" : p.name.split(" ")[0] === "YouTube" ? "YouTube" : p.name.split(" (")[0]} />{p.name}</span>} badge={null}>
                  <div style={{ fontSize: 13, color: "#555566", lineHeight: 1.7 }}>

                    <div style={{ marginBottom: 12 }}>
                      <div style={{ fontWeight: 700, color: "#2a8c3e", fontSize: 11, textTransform: "uppercase", marginBottom: 6 }}>Strengths</div>
                      {p.strengths.map((s, si) => <div key={si} style={{ fontSize: 12, marginBottom: 3, paddingLeft: 12, position: "relative" }}><span style={{ position: "absolute", left: 0 }}>•</span> {s}</div>)}
                    </div>

                    <div style={{ marginBottom: 12 }}>
                      <div style={{ fontWeight: 700, color: "#b8860b", fontSize: 11, textTransform: "uppercase", marginBottom: 6 }}>KPIs & Benchmarks</div>
                      {p.kpis.map((k, ki) => <div key={ki} style={{ fontSize: 12, marginBottom: 2, fontFamily: "'SF Mono', monospace" }}>{k}</div>)}
                    </div>

                    <div style={{ marginBottom: 12 }}>
                      <div style={{ fontWeight: 700, color: "#6a1b9a", fontSize: 11, textTransform: "uppercase", marginBottom: 4 }}>Audience Fit</div>
                      <div style={{ fontSize: 12 }}>{p.audienceFit}</div>
                    </div>

                    <div style={{ marginBottom: 12 }}>
                      <div style={{ fontWeight: 700, color: "#2D1768", fontSize: 11, textTransform: "uppercase", marginBottom: 4 }}>Platform Capabilities</div>
                      <div style={{ fontSize: 12 }}>{p.capabilities}</div>
                    </div>

                    <div style={{ marginBottom: 12, padding: 12, background: "#f0faf5", borderRadius: 8, border: "1px solid #c0e0d0" }}>
                      <div style={{ fontWeight: 700, color: "#2a8c3e", fontSize: 11, textTransform: "uppercase", marginBottom: 6 }}>📋 Should We Include This Platform? (Evaluation Checklist)</div>
                      <div style={{ fontSize: 12, lineHeight: 1.8 }}>{p.evaluate}</div>
                    </div>

                    <div style={{ padding: 10, background: "#ffffff", borderRadius: 8, fontSize: 12 }}>
                      <strong style={{ color: "#b8860b" }}>🌍 Regional Considerations:</strong> {p.gcc}
                    </div>

                    

                    {platformMockups[p.name] && (
                      <div style={{ marginTop: 16, padding: "16px 0 4px", borderTop: "1px solid #e0e0e8" }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: "#5a5a6e", textTransform: "uppercase", marginBottom: 10 }}>Ad Format Examples</div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "flex-end", marginBottom: 8, overflow: "hidden" }}>
                          {platformMockups[p.name]()}
                        </div>
                      </div>
                    )}
                  </div>
                </Accordion>
              ))}
            </div>
          )}

          {/* MEDIA FRAMEWORK */}
          {activeSection === "framework" && (
            <div>
              <SectionTitle>Media Planning Framework</SectionTitle>
              <SectionDesc>Platform × Objective matrix with buying units, KPIs, USD benchmarks, and regional planning notes.</SectionDesc>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11.5 }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid #d0d0e0" }}>
                      {["Platform", "Objective", "Type", "Buying", "Primary KPI", "Benchmark", "Regional Notes"].map(h => (
                        <th key={h} style={{ padding: "10px 8px", textAlign: "left", color: "#444455", fontWeight: 700, fontSize: 10, textTransform: "uppercase", letterSpacing: ".05em" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {frameworkData.filter(r => !filterText || JSON.stringify(r).toLowerCase().includes(filterText)).map((r, i) => (
                      <tr key={i} style={{ borderBottom: "1px solid #f0f0f5", background: i % 2 === 0 ? "#f9f9fb" : "transparent" }}>
                        <td style={{ padding: "8px", fontWeight: 700, color: "#1a1a2e" }}>{r.platform}</td>
                        <td style={{ padding: "8px" }}><Chip color={r.objective.includes("Aware") ? "blue" : r.objective.includes("Video") ? "purple" : r.objective.includes("Traffic") ? "green" : r.objective.includes("Lead") ? "amber" : r.objective.includes("Conv") ? "red" : "teal"}>{r.objective}</Chip></td>
                        <td style={{ padding: "8px", color: "#444455" }}>{r.type}</td>
                        <td style={{ padding: "8px", color: "#444455" }}>{r.buying}</td>
                        <td style={{ padding: "8px", color: "#333344", fontWeight: 600 }}>{r.kpi}</td>
                        <td style={{ padding: "8px", color: "#2a8c3e", fontWeight: 600 }}>{r.benchmark}</td>
                        <td style={{ padding: "8px", color: "#5a5a6e", maxWidth: 200, fontSize: 11 }}>{r.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* HIGH IMPACT FORMATS */}
          {activeSection === "formats" && (
            <div>
              <SectionTitle>High Impact Ad Formats</SectionTitle>
              <SectionDesc>The highest-impact ad units on each platform - when to use them, costs, specs, and regional considerations. ★ marks new 2025–2026 formats.</SectionDesc>
              {highImpactFormats.filter(f => !filterText || JSON.stringify(f).toLowerCase().includes(filterText)).map((f, i) => (
                <Accordion key={i} title={f.name} subtitle={`${f.platform} · ${f.type}`} badge={f.isNew ? <span style={{ display: "inline-block", animation: "pulse 2s ease-in-out infinite" }}><Chip color="green">NEW</Chip></span> : null}>
                  <div style={{ fontSize: 13, color: "#555566", lineHeight: 1.7 }}>
                    <InfoRow label="Best Use Cases" value={f.use} />
                    <InfoRow label="Cost / Buying" value={f.cost} />
                    <InfoRow label="Key Specs" value={f.specs} />
                    <div style={{ marginTop: 10, padding: 10, background: "#ffffff", borderRadius: 8, fontSize: 12 }}>
                      <strong style={{ color: "#b8860b" }}>🌍 Regional:</strong> {f.gcc}
                    </div>
                  </div>
                </Accordion>
              ))}
            </div>
          )}

          {/* PROGRAMMATIC DEEP DIVE */}
          {activeSection === "programmatic" && (
            <div>
              <SectionTitle>Programmatic Deep Dive</SectionTitle>
              <SectionDesc>The complete guide to programmatic advertising in the region: how it works, when to use it, the planning approach, what to watch out for, a pre-launch checklist, and the most common pitfalls.</SectionDesc>

              <Card style={{ background: "#f0edf5", border: "1px solid #d0d0e0", marginBottom: 24 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#2D1768", marginBottom: 10 }}>🖥️ How Programmatic Works (Simple Version)</div>
                <div style={{ fontSize: 12, color: "#444455", lineHeight: 2 }}>
                  <strong style={{ color: "#1a1a2e" }}>1. Advertiser</strong> sets campaign goals, budgets, targeting, and creative in a <strong style={{ color: "#2a8c3e" }}>DSP</strong> (Demand-Side Platform)<br/>
                  <strong style={{ color: "#1a1a2e" }}>2. Publisher</strong> makes ad inventory available via an <strong style={{ color: "#b8860b" }}>SSP</strong> (Supply-Side Platform)<br/>
                  <strong style={{ color: "#1a1a2e" }}>3. Ad Exchange</strong> connects DSPs and SSPs - runs a real-time auction in milliseconds<br/>
                  <strong style={{ color: "#1a1a2e" }}>4. Winning ad</strong> is served to the user - tracked by an <strong style={{ color: "#6a1b9a" }}>Ad Server</strong> (e.g. CM360)<br/>
                  <strong style={{ color: "#1a1a2e" }}>5. Verification vendor</strong> (DV/IAS) confirms: was it viewable? Brand-safe? Real human? Right country?<br/>
                  <strong style={{ color: "#1a1a2e" }}>6. All of this</strong> happens in under 100 milliseconds - before the page finishes loading
                </div>
              </Card>

              <Card style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#1a1a2e", marginBottom: 10 }}>📌 Key Buying Types</div>
                <div style={{ fontSize: 12, color: "#444455", lineHeight: 1.8 }}>
                  <strong style={{ color: "#2a8c3e" }}>Open Exchange (RTB)</strong> - Real-time bidding on open marketplace. Maximum scale, lower quality control. CPMs: $2–$10. Use with verification mandatory.<br/>
                  <strong style={{ color: "#2D1768" }}>Private Marketplace (PMP)</strong> - Invite-only auction with selected premium publishers. Better quality, brand-safe. CPMs: $10–$30. Recommended for the market.<br/>
                  <strong style={{ color: "#b8860b" }}>Programmatic Guaranteed (PG)</strong> - Fixed price, guaranteed inventory, automated delivery. Premium pricing. Best for tentpole moments (Ramadan, National Days).<br/>
                  <strong style={{ color: "#6a1b9a" }}>Preferred Deals</strong> - Fixed CPM with a specific publisher, non-guaranteed volume. Good for testing premium inventory before committing to PG.
                </div>
              </Card>

              <h3 style={{ fontSize: 15, fontWeight: 700, color: "#2D1768", marginBottom: 12, marginTop: 28 }}>📋 Planning Approach - Step by Step</h3>
              {[
                { step: "1. Define Role in the Media Mix", detail: "Programmatic is not a replacement for social - it's complementary. Define whether programmatic is playing an awareness role (CTV, DOOH, OLV), a retargeting role (display, native), or a reach-extension role (beyond social walled gardens). This determines your DSP, inventory, and creative requirements.", output: "Written rationale for programmatic's role in the campaign" },
                { step: "2. Select the Right DSP", detail: "Choose based on: budget (DV360 needs $10K+/month, TTD needs $25K+), inventory needs (YouTube = DV360, CTV-first = TTD or MiQ), data strategy (Google data = DV360, first-party via UID2 = TTD), and transparency requirements. One DSP per campaign unless budget justifies multi-DSP.", output: "DSP selection with rationale documented" },
                { step: "3. Build Your Inventory Strategy", detail: "Decide: Open Exchange vs PMP vs Programmatic Guaranteed. Default to PMPs for brand safety in all markets. Build an inclusion list of approved publishers and domains. For CTV, secure PMP deals with Shahid/OSN+ (MENA), Hulu/Peacock (US), regional CTV platforms. For DOOH, book premium locations early. Avoid open exchange without verification.", output: "Inventory strategy document: deal IDs, publisher list, buying type per format" },
                { step: "4. Set Up Audiences & Data", detail: "Layer audiences in priority order: (1) First-party data - CRM lists, website retargeting via pixel (highest value, 2–3x performance vs third-party), (2) Lookalike/similar audiences from first-party seeds, (3) Third-party data segments - contextual, intent, demographic. Ensure local language content targeting is configured per market.", output: "Audience strategy with segments, data sources, and priority ranking" },
                { step: "5. Creative Requirements", detail: "Programmatic needs multiple sizes and formats: display (300×250, 728×90, 160×600, 320×50 minimum), video (15s and 30s, horizontal and vertical), native (headline + image + description), CTV (15s and 30s, 16:9), DOOH (varies by screen). Arabic + English versions for KSA/Kuwait. Use DCO where possible for personalisation.", output: "Creative matrix: format × size × language × message variant" },
                { step: "6. Implement Verification & Tracking", detail: "Before launch: implement DV or IAS tags in the ad server (CM360 or Flashtalking). Configure brand safety categories - block content related to violence, politics, religion, adult. Set viewability threshold (70%+ industry standard). Enable IVT (invalid traffic) monitoring. Set up conversion pixels if running performance campaigns.", output: "Verification setup confirmed, brand safety categories documented" },
                { step: "7. Launch, Monitor & Optimise", detail: "Week 1: monitor delivery, pacing, viewability, and brand safety incidents. Week 2+: optimise - pause underperforming domains/apps, shift budget to high-performing PMPs, refresh creative. Ongoing: review placement reports for low-quality sites, check frequency caps, monitor fraud rates. Report weekly.", output: "Weekly optimisation report with actions taken" },
              ].map((s, i) => (
                <Accordion key={i} title={s.step}>
                  <div style={{ fontSize: 13, color: "#555566", lineHeight: 1.7 }}>
                    <div style={{ marginBottom: 10 }}>{s.detail}</div>
                    <div style={{ padding: 10, background: "#ffffff", borderRadius: 8, fontSize: 12 }}>
                      <strong style={{ color: "#2a8c3e" }}>📄 Output:</strong> {s.output}
                    </div>
                  </div>
                </Accordion>
              ))}

              <h3 style={{ fontSize: 15, fontWeight: 700, color: "#2D1768", marginBottom: 12, marginTop: 28 }}>🔍 What to Look Out For</h3>
              {[
                { area: "Viewability", what: "Industry average is 54–60% - meaning 40–46% of impressions you pay for are never seen.", action: "Use viewable CPM (vCPM) bidding. Set viewability threshold at 70%+. Use DV or IAS for independent measurement. CTV and DOOH have near-100% viewability - factor this into channel mix decisions.", metric: "Target: 70%+ viewability on display, 90%+ on video/CTV" },
                { area: "Ad Fraud / Invalid Traffic (IVT)", what: "Ad fraud costs the industry ~$84 billion annually. Bots, click farms, and spoofed domains inflate impressions and clicks. regional open exchange inventory has moderate fraud risk.", action: "Enable pre-bid fraud filtering in your DSP. Use DV/IAS for IVT monitoring. Build publisher inclusion lists instead of trying to block all bad inventory. Use PMPs over open exchange. Monitor for abnormally high CTRs with zero conversions.", metric: "Target: <3% IVT rate on PMPs, <5% on open exchange" },
                { area: "Brand Safety Incidents", what: "Ads appearing next to inappropriate content - violence, misinformation, politically sensitive, or content contradicting Islamic values. Especially risky regionally where cultural standards are strict.", action: "Configure DV/IAS brand safety categories per client. Block: violence, adult, political extremism, gambling, alcohol. Use custom keyword exclusion lists. Review placement reports weekly. For programmatic video, use PMPs only - open exchange video has highest brand safety risk.", metric: "Target: 0 brand safety incidents per campaign" },
                { area: "Frequency Oversaturation", what: "Without proper caps, programmatic will hammer the same users repeatedly - leading to ad fatigue, negative brand perception, and wasted spend.", action: "Set frequency caps in the DSP: 3–5x/week for awareness, 7–10x/week for retargeting. Use cross-campaign frequency management via CM360. Monitor frequency distribution - if >20% of users see the ad 10+ times, you have a problem.", metric: "Target: 3–5x/week (awareness), 7–10x/week (retargeting)" },
                { area: "Domain Spoofing & Low-Quality Inventory", what: "Some publishers misrepresent their domains to attract premium ad spend. Your ad thinks it's on a premium news site but it's actually on a low-quality content farm.", action: "Use ads.txt/app-ads.txt verification. Build inclusion lists of approved domains. Avoid buying on 'long-tail' open exchange without verification. Review placement reports - flag any domain you don't recognise.", metric: "Check placement reports weekly" },
                { area: "Data Leakage", what: "Some DSPs and data partners may share your audience data or retargeting lists with competitors or across clients if not properly ring-fenced.", action: "Confirm data isolation with your DSP. Use clean rooms for sensitive first-party data. Read data partner terms carefully. Ask: 'Can other advertisers target my audience segments?'", metric: "Contractual data isolation confirmed" },
                { area: "Hidden Fees / Non-Transparent Costs", what: "The programmatic supply chain can include 15–30% of spend going to intermediary fees (DSP, SSP, exchange, data, verification) before reaching the publisher.", action: "Demand cost transparency from your DSP. Understand the fee stack: DSP fee (10–20%) + data cost + verification cost + SSP take rate. With TTD, you can see the full breakdown. With DV360, less transparent. Ask your vendor to show working media vs. total spend.", metric: "Working media ratio: aim for 60%+ of spend reaching publishers" },
              ].map((s, i) => (
                <Accordion key={i} title={s.area} subtitle={s.metric}>
                  <div style={{ fontSize: 13, color: "#555566", lineHeight: 1.7 }}>
                    <div style={{ marginBottom: 10 }}>
                      <div style={{ fontWeight: 700, color: "#cc3333", fontSize: 11, textTransform: "uppercase", marginBottom: 4 }}>The Risk</div>
                      {s.what}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, color: "#2a8c3e", fontSize: 11, textTransform: "uppercase", marginBottom: 4 }}>What To Do</div>
                      {s.action}
                    </div>
                  </div>
                </Accordion>
              ))}

              <h3 style={{ fontSize: 15, fontWeight: 700, color: "#2D1768", marginBottom: 12, marginTop: 28 }}>✅ Programmatic Pre-Launch Checklist</h3>

              {(() => {
                const progCategories = {
                  "DSP & Inventory Setup": [
                    "DSP selected with documented rationale",
                    "PMP deals confirmed with deal IDs from publishers",
                    "Inclusion list of approved domains/apps created",
                    "Open exchange blocked or limited to verified inventory only",
                    "CTV inventory secured (Shahid/OSN+ (MENA), Hulu/Peacock (US), regional CTV platforms, StarzPlay PMP deals)",
                    "DOOH placements booked if applicable (lead time 2-4 weeks)",
                  ],
                  "Audiences & Data": [
                    "First-party data uploaded (CRM lists, website audiences)",
                    "Retargeting pixel installed and firing on client website",
                    "Lookalike/similar audiences built from first-party seeds",
                    "Third-party data segments selected and costed",
                    "Audience exclusions configured (existing customers, converters)",
                  ],
                  "Creative & Ad Serving": [
                    "All creative sizes produced (300x250, 728x90, 160x600, 320x50 minimum)",
                    "Video creative available in 15s and 30s (horizontal + vertical)",
                    "Local language creative versions available for target markets",
                    "DCO templates configured if using dynamic creative",
                    "All creatives trafficked in ad server (CM360 / Flashtalking)",
                    "Click-through URLs verified and UTM parameters applied",
                  ],
                  "Verification & Brand Safety": [
                    "DV or IAS tags implemented in ad server",
                    "Brand safety categories configured per client requirements",
                    "Custom keyword exclusion list applied",
                    "Viewability threshold set (70%+ display, 90%+ video)",
                    "IVT / fraud monitoring enabled (pre-bid filtering on)",
                    "Geographic targeting verified - correct regional markets selected",
                  ],
                  "Campaign Settings": [
                    "Frequency caps configured (3-5x/week awareness, 7-10x retargeting)",
                    "Budget pacing set correctly (daily/weekly/flight)",
                    "Bid strategy confirmed (CPM, vCPM, CPA target)",
                    "Dayparting configured if required",
                    "Campaign naming convention applied consistently",
                    "Conversion tracking pixels verified if performance campaign",
                  ],
                  "Reporting & Sign-Off": [
                    "Reporting template set up with agreed KPIs",
                    "Placement report review scheduled (weekly minimum)",
                    "Two-person internal QA completed before go-live",
                    "Client sign-off received on plan and targeting",
                  ],
                };
                const allItems = Object.entries(progCategories).flatMap(([cat, items]) => items.map((item, i) => `prog_qa_${cat}_${i}`));
                const totalItems = allItems.length;
                const checkedCount = allItems.filter(k => checkedItems[k]).length;
                const pct = totalItems > 0 ? checkedCount / totalItems : 0;

                // Creature reveal stages
                const stage = pct === 0 ? 0 : pct < 0.2 ? 1 : pct < 0.4 ? 2 : pct < 0.6 ? 3 : pct < 0.8 ? 4 : pct < 1 ? 5 : 6;
                const stageLabels = ["Sealed", "Shaking...", "Cracking!", "Opening!", "Emerging!", "Almost free!", "FREE! ⚡"];
                const ballShake = stage === 1 ? "ballShake 0.5s ease-in-out infinite" : "none";

                return (
                  <div style={{ display: "flex", gap: 20 }}>
                    <div style={{ flex: 1 }}>
                      {Object.entries(progCategories).map(([category, items]) => (
                        <Card key={category} style={{ marginBottom: 16 }}>
                          <div style={{ fontSize: 14, fontWeight: 700, color: "#1a1a2e", marginBottom: 12 }}>{category}</div>
                          {items.map((item, i) => {
                            const key = `prog_qa_${category}_${i}`;
                            return <CheckItem key={key} checked={checkedItems[key]} onChange={() => toggleCheck(key)}>{item}</CheckItem>;
                          })}
                        </Card>
                      ))}
                    </div>

                    {/* STICKY CREATURE TRACKER */}
                    <div style={{ width: 180, flexShrink: 0, position: "sticky", top: 20, alignSelf: "flex-start" }}>
                      <div style={{ background: "#ffffff", borderRadius: 16, border: "1px solid #e0e0e8", padding: "20px 16px", textAlign: "center", boxShadow: "0 4px 20px rgba(0,0,0,.06)" }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: "#2D1768", marginBottom: 4 }}>Launch Progress</div>
                        <div style={{ fontSize: 22, fontWeight: 800, color: pct === 1 ? "#7AC143" : "#2D1768" }}>{Math.round(pct * 100)}%</div>
                        <div style={{ fontSize: 10, color: "#6a6a7e", marginBottom: 16 }}>{checkedCount}/{totalItems} items</div>

                        {/* Creature Animation */}
                        <div style={{ position: "relative", width: 150, height: 180, margin: "0 auto", overflow: "visible" }}>
                          {/* Pikachu - rises from behind pokeball */}
                          <div style={{
                            position: "absolute", left: "50%", transform: `translateX(-50%) translateY(${stage === 0 ? 80 : stage === 1 ? 70 : stage === 2 ? 55 : stage === 3 ? 35 : stage === 4 ? 15 : stage === 5 ? 2 : -5}px)`,
                            transition: "transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)", zIndex: 1, width: 100, textAlign: "center",
                            opacity: stage >= 1 ? 1 : 0,
                          }}>
                            <img src="data:image/png;base64,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" alt="" style={{
                              width: stage === 6 ? 100 : 80 + stage * 3,
                              transition: "width 0.6s ease-out",
                              animation: stage === 6 ? "pikaJump 1s ease-in-out infinite" : stage >= 1 && stage < 3 ? "ballShake 0.6s ease-in-out infinite" : "none",
                              filter: stage < 2 ? "brightness(0.3)" : stage < 3 ? "brightness(0.6)" : "none",
                            }} />
                          </div>

                          {/* Pokeball */}
                          <div style={{
                            position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)",
                            zIndex: 2, width: 90, textAlign: "center",
                          }}>
                            {/* Top half - opens */}
                            {stage < 3 ? (
                              <img src="data:image/png;base64,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" alt="" style={{
                                width: 90,
                                animation: stage === 1 ? "ballShake 0.5s ease-in-out infinite" : stage === 2 ? "ballShake 0.3s ease-in-out infinite" : "none",
                              }} />
                            ) : (
                              <div style={{ position: "relative" }}>
                                {/* Ball top half rotates open */}
                                <div style={{ overflow: "hidden", height: 45 }}>
                                  <img src="data:image/png;base64,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" alt="" style={{
                                    width: 90,
                                    transform: `rotate(${stage >= 3 ? -15 - (stage - 3) * 12 : 0}deg)`,
                                    transformOrigin: "0% 100%",
                                    transition: "transform 0.6s ease-out",
                                    opacity: stage >= 6 ? 0 : 1,
                                  }} />
                                </div>
                                {/* Ball bottom half stays */}
                                <div style={{ overflow: "hidden", height: 45, marginTop: -1 }}>
                                  <img src="data:image/png;base64,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" alt="" style={{
                                    width: 90, marginTop: -45,
                                    opacity: stage >= 6 ? 0.3 : 1,
                                    transition: "opacity 0.5s",
                                  }} />
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Sparkles when complete */}
                          {stage === 6 && (
                            <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
                              <span style={{ position: "absolute", top: 5, left: 10, fontSize: 18, animation: "sparkle 1.2s ease-in-out infinite" }}>⚡</span>
                              <span style={{ position: "absolute", top: 0, right: 10, fontSize: 16, animation: "sparkle 1.2s 0.2s ease-in-out infinite" }}>✨</span>
                              <span style={{ position: "absolute", top: 30, left: 0, fontSize: 14, animation: "sparkle 1.2s 0.4s ease-in-out infinite" }}>⚡</span>
                              <span style={{ position: "absolute", top: 25, right: 0, fontSize: 12, animation: "sparkle 1.2s 0.6s ease-in-out infinite" }}>✨</span>
                              <span style={{ position: "absolute", top: 60, left: 5, fontSize: 10, animation: "sparkle 1.2s 0.8s ease-in-out infinite" }}>⚡</span>
                              <span style={{ position: "absolute", top: 55, right: 5, fontSize: 13, animation: "sparkle 1.2s 1.0s ease-in-out infinite" }}>✨</span>
                            </div>
                          )}

                          {/* Shadow */}
                          <div style={{ position: "absolute", bottom: -8, left: "50%", transform: "translateX(-50%)", width: stage >= 5 ? 80 : 60, height: 10, background: "radial-gradient(ellipse, rgba(0,0,0,0.12) 0%, transparent 70%)", borderRadius: "50%", transition: "width 0.5s" }} />
                        </div>

                        <div style={{ fontSize: 12, fontWeight: 700, color: stage === 6 ? "#7AC143" : "#2D1768", marginTop: 8, transition: "color 0.3s" }}>
                          {stageLabels[stage]}
                        </div>
                        {stage === 6 && <div style={{ fontSize: 10, color: "#7AC143", marginTop: 4 }}>Ready to launch! 🚀</div>}

                        <div style={{ marginTop: 12 }}>
                          <ProgressBar value={checkedCount} max={totalItems} color={pct === 1 ? "#7AC143" : "#2D1768"} />
                        </div>

                        <button onClick={() => {
                          const reset = {};
                          allItems.forEach(k => { reset[k] = false; });
                          setCheckedItems(prev => {
                            const next = {...prev};
                            allItems.forEach(k => delete next[k]);
                            return next;
                          });
                        }} style={{ marginTop: 10, padding: "4px 12px", borderRadius: 6, border: "1px solid #d0d0d8", background: "transparent", color: "#6a6a7e", fontSize: 10, cursor: "pointer", fontFamily: "inherit" }}>Reset</button>
                      </div>
                    </div>
                  </div>
                );
              })()}

              <h3 style={{ fontSize: 15, fontWeight: 700, color: "#cc3333", marginBottom: 12, marginTop: 28 }}>🚫 Common Programmatic Pitfalls</h3>
              {[
                { mistake: "Running open exchange without verification", why: "It's cheaper and easier to set up - planner skips DV/IAS to save on CPM costs or because it wasn't in the original plan.", impact: "Ads appear on low-quality content farms, fraud sites, or alongside culturally inappropriate content. Brand safety incident with the client. Inflated metrics from bot traffic.", fix: "Verification is non-negotiable. DV or IAS on every programmatic campaign. The $0.03–$0.15 CPM cost is insurance, not overhead.", rule: "No programmatic campaign goes live without DV or IAS. Ever." },
                { mistake: "Using open exchange for the market without an inclusion list", why: "Planner targets 'UAE' or 'KSA' in the DSP and lets it run across all available inventory in those geos.", impact: "Ads end up on obscure apps, made-for-advertising sites, and low-quality Arabic content. 40–60% of impressions may be non-viewable or fraudulent.", fix: "Build a curated inclusion list of 50–200 approved domains and apps. Use PMPs as the primary buying method. Open exchange only as supplementary reach with strict verification.", rule: "Inclusion lists before every programmatic campaign regionally." },
                { mistake: "Ignoring frequency caps", why: "DSP default settings often have no frequency cap, or caps are set too high. Planner doesn't configure them.", impact: "20–30% of budget wasted hammering the same users 15–20+ times. Negative brand perception. Audience fatigue. Creative burn-out.", fix: "Set caps at DSP level AND ad server level. Awareness: 3–5x/week. Retargeting: 7–10x/week max. Use CM360 for cross-campaign frequency management.", rule: "Frequency caps configured on every campaign. Review frequency distribution weekly." },
                { mistake: "Not reviewing placement reports", why: "Campaign is set up, optimised on top-line metrics (CPM, CTR), but nobody checks where ads actually ran.", impact: "Budget bleeds to low-quality sites, mobile game apps, or MFA (made-for-advertising) sites that generate clicks but zero real engagement or conversions.", fix: "Review placement reports weekly. Flag and block any domain/app you wouldn't want the client to see their ad on. Create an exclusion list that grows over time.", rule: "Weekly placement report review is mandatory. Build a running exclusion list." },
                { mistake: "Treating programmatic as 'set and forget'", why: "Campaign is launched, performing 'okay', and planner moves on to other tasks. Optimisation happens monthly instead of weekly.", impact: "Slow creative fatigue goes unnoticed. Budget shifts to underperforming inventory. CPMs creep up. Viewability drops. Performance degrades gradually.", fix: "Structured optimisation cadence: daily pacing checks, weekly full optimisation (creative, placement, audience, frequency), bi-weekly creative refresh, monthly strategy review.", rule: "Programmatic needs weekly active optimisation - not monthly check-ins." },
                { mistake: "Buying CTV inventory on open exchange", why: "CTV CPMs on open exchange ($5–$15) look cheaper than PMP deals ($15–$40). Planner opts for scale.", impact: "Most 'CTV' inventory on open exchange is actually mobile in-app video or desktop pre-roll being misrepresented as CTV. You're paying CTV prices for non-CTV quality.", fix: "CTV must be bought via PMPs with verified publishers (Shahid/OSN+ (MENA), Hulu/Peacock (US), regional CTV platforms, StarzPlay) or through a managed service partner like MiQ. Verify device-type reporting.", rule: "CTV = PMPs only. No open exchange CTV buying regionally." },
                { mistake: "No conversion tracking on performance campaigns", why: "Programmatic retargeting or performance display launched without a working conversion pixel on the client's website.", impact: "DSP cannot optimise toward conversions. Campaign runs on CPM/CPC optimisation instead. ROAS is unmeasurable. Budget is wasted on users who never convert.", fix: "Conversion pixel must be installed and firing before campaign launch. Verify with the DSP's diagnostic tools. Test with a known conversion before go-live.", rule: "No performance programmatic without verified conversion tracking." },
                { mistake: "Underestimating the minimum budget", why: "Client wants programmatic with a $5K/month budget. Planner adds it to the plan to look comprehensive.", impact: "DSP doesn't gather enough data to optimise. Results are statistically meaningless. Operational overhead (setup, trafficking, reporting) exceeds the value of the spend.", fix: "Minimum $20K/month for programmatic to be meaningful. Below that, the budget is better allocated to social platforms where learning algorithms are more efficient at lower spend.", rule: "$20K/month minimum. If budget doesn't allow it, don't include programmatic." },
              ].map((m, i) => (
                <Accordion key={i} title={m.mistake}>
                  <div style={{ fontSize: 13, color: "#555566", lineHeight: 1.7 }}>
                    <div style={{ marginBottom: 8 }}>
                      <div style={{ fontWeight: 700, color: "#5a5a6e", fontSize: 11, textTransform: "uppercase", marginBottom: 4 }}>Why It Happens</div>
                      {m.why}
                    </div>
                    <div style={{ marginBottom: 8 }}>
                      <div style={{ fontWeight: 700, color: "#cc3333", fontSize: 11, textTransform: "uppercase", marginBottom: 4 }}>Impact</div>
                      {m.impact}
                    </div>
                    <div style={{ marginBottom: 8 }}>
                      <div style={{ fontWeight: 700, color: "#2a8c3e", fontSize: 11, textTransform: "uppercase", marginBottom: 4 }}>The Fix</div>
                      {m.fix}
                    </div>
                    <div style={{ padding: 10, background: "#e8e0f0", borderRadius: 8, border: "1px solid #d0d0e0", fontSize: 12 }}>
                      <strong style={{ color: "#2D1768" }}>📌 Rule:</strong> {m.rule}
                    </div>
                  </div>
                </Accordion>
              ))}

              <h3 style={{ fontSize: 15, fontWeight: 700, color: "#2D1768", marginBottom: 12, marginTop: 28 }}>⚠️ Programmatic Rules of Thumb</h3>
              <Card style={{ background: "#fdf5f0", border: "1px solid #e8dcd0" }}>
                <div style={{ fontSize: 12, color: "#444455", lineHeight: 1.8 }}>
                  • <strong style={{ color: "#1a1a2e" }}>Always use PMPs</strong> over open exchange for the market campaigns - brand safety is non-negotiable<br/>
                  • <strong style={{ color: "#1a1a2e" }}>Minimum $20K/month</strong> for programmatic to generate meaningful optimisation data<br/>
                  • <strong style={{ color: "#1a1a2e" }}>Verification (DV or IAS)</strong> is required on every programmatic buy - no exceptions<br/>
                  • <strong style={{ color: "#1a1a2e" }}>Arabic creative</strong> is essential for KSA/Kuwait programmatic - use DCO for AR+EN versioning<br/>
                  • <strong style={{ color: "#1a1a2e" }}>CTV is growing fast</strong> - Shahid AVOD tier is the #1 Arabic CTV inventory regionally<br/>
                  • <strong style={{ color: "#1a1a2e" }}>DOOH</strong> in Premium locations per market (e.g. Dubai Mall, Times Square, Shibuya), and Riyadh King Fahd Road are premium placements - book early for peak moments<br/>
                  • <strong style={{ color: "#1a1a2e" }}>First-party data</strong> (CRM lists via LiveRamp) outperforms third-party data by 2–3x for conversions<br/>
                  • <strong style={{ color: "#1a1a2e" }}>Viewability target</strong>: 70%+ for display, 90%+ for video and CTV<br/>
                  • <strong style={{ color: "#1a1a2e" }}>Working media ratio</strong>: aim for 60%+ of total spend actually reaching publishers (rest is fees)<br/>
                  • <strong style={{ color: "#1a1a2e" }}>Placement reports</strong>: review weekly, build a running exclusion list, never trust 'set and forget'<br/>
                  • <strong style={{ color: "#1a1a2e" }}>CTV buying</strong>: PMPs only - never buy CTV on open exchange regionally<br/>
                  • <strong style={{ color: "#1a1a2e" }}>Ramadan/peak CPMs</strong>: book PG deals 6–8 weeks ahead for premium inventory during Ramadan, Eid, and National Days
                </div>
              </Card>
            </div>
          )}

          {/* VENDOR LANDSCAPE */}
          {activeSection === "vendors" && (
            <div>
              <SectionTitle>Global Vendor Landscape - By Channel & Region</SectionTitle>
              <SectionDesc>Platform and vendor ecosystems across key markets. Each region has different dominant platforms, DSPs, and rules of engagement.</SectionDesc>

              <div style={{ display: "flex", gap: 6, marginBottom: 24, flexWrap: "wrap" }}>
                {Object.keys(regionalVendors).map(region => (
                  <button key={region} onClick={() => setVendorRegion(region)} style={{
                    padding: "8px 16px", borderRadius: 20, border: vendorRegion === region ? "1px solid #7AC143" : "1px solid #e0e0e8",
                    background: vendorRegion === region ? "#2D176830" : "#f9f9fb", color: vendorRegion === region ? "#7AC143" : "#6a6a7e",
                    fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", transition: "all .15s"
                  }}>{region}</button>
                ))}
              </div>

              <Card style={{ background: "#f0edf5", border: "1px solid #d0d0e0", marginBottom: 24 }}>
                <div style={{ fontSize: 12, color: "#444455", lineHeight: 1.6 }}>{regionalVendors[vendorRegion].desc}</div>
              </Card>

              {regionalVendors[vendorRegion].data.filter(cat => !filterText || JSON.stringify(cat).toLowerCase().includes(filterText)).map((cat, ci) => (
                <div key={ci} style={{ marginBottom: 28 }}>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: "#2D1768", marginBottom: 4 }}>{cat.category}</h3>
                  <p style={{ fontSize: 12, color: "#5a5a6e", marginBottom: 14 }}>{cat.description}</p>
                  {cat.vendors.map((v, vi) => (
                    <Accordion key={vi} title={v.name} subtitle={v.type} badge={<Chip color={v.type.includes("DSP") || v.type.includes("Search") ? "blue" : v.type.includes("Safety") || v.type.includes("Verif") ? "red" : v.type.includes("CTV") || v.type.includes("OTT") || v.type.includes("Audio") || v.type.includes("Video") || v.type.includes("Social") ? "purple" : v.type.includes("DOOH") || v.type.includes("Outdoor") || v.type.includes("Commerce") ? "amber" : v.type.includes("Guideline") || v.type.includes("Must-Know") ? "red" : "teal"}>{v.type}</Chip>}>
                      <div style={{ fontSize: 13, color: "#555566", lineHeight: 1.7 }}>
                        <div style={{ marginBottom: 10 }}>
                          <div style={{ fontWeight: 700, color: "#5a5a6e", fontSize: 11, textTransform: "uppercase", marginBottom: 4 }}>What It Does</div>
                          {v.what}
                        </div>
                        <div style={{ marginBottom: 10, padding: 10, background: "#ffffff", borderRadius: 8 }}>
                          <strong style={{ color: "#b8860b" }}>🌍 regional Relevance / How to Use:</strong><br/>{v.gcc}
                        </div>
                        <InfoRow label="Best For" value={v.bestFor} />
                        {v.minBudget && v.minBudget !== "N/A" && <InfoRow label="Min Budget" value={<span style={{ color: "#2a8c3e", fontWeight: 600 }}>{v.minBudget}</span>} />}
                      </div>
                    </Accordion>
                  ))}
                </div>
              ))}
            </div>
          )}

          {/* BUDGET */}
          {activeSection === "budget" && (
            <div>
              <SectionTitle>Budget Guidance & Channel Mix</SectionTitle>
              <SectionDesc>Spend tier recommendations, channel mix by objective, and seasonal budget weighting for the market.</SectionDesc>

              <h3 style={{ fontSize: 15, fontWeight: 700, color: "#2D1768", marginBottom: 12 }}>Spend Tiers</h3>
              {budgetTiers.map((t, i) => (
                <Accordion key={i} title={`${t.tier} - ${t.budget}`} subtitle={`Max ${t.max} platforms · ${t.reach}`}>
                  <div style={{ fontSize: 13, color: "#555566", lineHeight: 1.7 }}>
                    <InfoRow label="Platforms" value={t.platforms} />
                    <InfoRow label="Channel Mix" value={t.mix} />
                    <InfoRow label="Buying" value={t.buying} />
                    <InfoRow label="Key Constraint" value={t.constraint} />
                  </div>
                </Accordion>
              ))}

              <h3 style={{ fontSize: 15, fontWeight: 700, color: "#2D1768", marginTop: 28, marginBottom: 12 }}>Channel Mix by Objective (Mid-Market+)</h3>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11.5 }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid #d0d0e0" }}>
                      {["Objective", "Meta", "TikTok", "Snap", "YouTube", "Google", "LinkedIn", "X", "Prog."].map(h => (
                        <th key={h} style={{ padding: "8px 6px", textAlign: "center", color: "#444455", fontWeight: 700, fontSize: 10, textTransform: "uppercase" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {channelMixByObjective.map((r, i) => (
                      <tr key={i} style={{ borderBottom: "1px solid #f0f0f5" }}>
                        <td style={{ padding: "8px", fontWeight: 700, color: "#1a1a2e", fontSize: 12 }}>{r.objective}</td>
                        {[r.meta, r.tiktok, r.snap, r.youtube, r.google, r.linkedin, r.x, r.prog].map((v, j) => (
                          <td key={j} style={{ padding: "8px", textAlign: "center", color: v === "-" ? "#d0d0d8" : parseInt(v) >= 30 ? "#7effb8" : parseInt(v) >= 15 ? "#7eb8ff" : "#94a3b8", fontWeight: parseInt(v) >= 30 ? 700 : 400 }}>{v}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3 style={{ fontSize: 15, fontWeight: 700, color: "#2D1768", marginTop: 28, marginBottom: 12 }}>Seasonal Budget Weighting (by Region)</h3>
              {seasonalCalendar.filter(s => !filterText || JSON.stringify(s).toLowerCase().includes(filterText)).map((s, i) => (
                <Accordion key={i} title={s.period} subtitle={`${s.months} · ${s.weight} of annual`} badge={<Chip color={s.color}>{s.cpm}</Chip>}>
                  <div style={{ fontSize: 13, color: "#555566", lineHeight: 1.7 }}>
                    <InfoRow label="Priority Action" value={s.action} />
                    <InfoRow label="Pre-Book" value={s.prebook} />
                  </div>
                </Accordion>
              ))}
            </div>
          )}

          {/* MEASUREMENT */}
          {activeSection === "measurement" && (
            <div>
              <SectionTitle>Measurement & KPIs</SectionTitle>
              <SectionDesc>KPI framework by funnel stage, tracking setup requirements, and attribution caveats every planner must understand.</SectionDesc>

              {(() => {
                const journeys = {
                  "E-commerce": {
                    stages: [
                      { name: "Awareness", width: "100%", color: "#3b82f6", kpi: "CPM $3–$20 · Reach · Frequency · Brand Lift", platforms: { mobile: ["Meta Reels", "TikTok TopView", "YouTube Bumper", "Snap Stories"], desktop: ["YouTube Masthead", "Meta Feed", "Programmatic Display"], ctv: ["Shahid CTV (MENA)", "OSN+ CTV (MENA)", "YouTube CTV"] }, tip: "Goal: Maximum reach among target audience. Use video-first formats. Budget 25–35% here. Measure unique reach and frequency (cap 2–3x/week). Arabic creative for KSA/Kuwait." },
                      { name: "Consideration", width: "80%", color: "#8b5cf6", kpi: "CPC $0.20–$1.50 · CTR · LPV · Video VTR", platforms: { mobile: ["Meta Traffic", "TikTok In-Feed", "Google Demand Gen", "Pinterest"], desktop: ["YouTube TrueView", "LinkedIn Content", "Google Demand Gen"], ctv: ["YouTube Select"] }, tip: "Goal: Drive qualified traffic and product exploration. Optimise for Landing Page Views (not link clicks). Use carousel and video to showcase products. Budget 15–25%." },
                      { name: "Conversion", width: "55%", color: "#f59e0b", kpi: "ROAS 2–8x · CPA · CVR · Add-to-Cart Rate", platforms: { mobile: ["Meta Advantage+ Sales", "Google PMax", "TikTok DSA", "Snap Dynamic Ads"], desktop: ["Google PMax", "Meta DPA", "Programmatic Retargeting"] }, tip: "Goal: Drive purchases. Use Advantage+ Sales (Meta) + PMax (Google) as primary. Retarget consideration audiences. Ensure CAPI/Enhanced Conversions. Budget 30–40%." },
                      { name: "Retention", width: "35%", color: "#22c55e", kpi: "CPA (retargeting) · ROAS · LTV · Repeat Rate", platforms: { mobile: ["Meta Custom Audiences", "Google Retargeting", "WhatsApp CTA", "Email/CRM"], desktop: ["Programmatic Retargeting", "Google RLSA", "Meta DPA"] }, tip: "Goal: Re-engage buyers, increase LTV. Use CRM lists for Custom Audiences. WhatsApp for the market (95%+ penetration). Frequency cap 5–7x/week. Budget 10–15%." },
                    ]
                  },
                  "Lead Generation": {
                    stages: [
                      { name: "Awareness", width: "100%", color: "#3b82f6", kpi: "CPM $3–$20 · Reach · Video Views · Brand Lift", platforms: { mobile: ["Meta Video", "TikTok TopView", "YouTube Non-Skip", "Snap AR Lens"], desktop: ["LinkedIn Sponsored Content", "YouTube TrueView", "Programmatic OLV"] }, tip: "Goal: Build brand awareness before asking for leads. Video content that educates or inspires. LinkedIn for B2B awareness. Budget 20–30%." },
                      { name: "Consideration", width: "80%", color: "#8b5cf6", kpi: "CTR · CPC · Engagement Rate · Content Views", platforms: { mobile: ["Meta Carousel", "TikTok Spark Ads", "LinkedIn Document Ads"], desktop: ["LinkedIn Thought Leader Ads", "Google Demand Gen", "Meta Traffic"] }, tip: "Goal: Educate and build trust. Document Ads on LinkedIn for B2B. Spark Ads for social proof. Drive to content pages or lead magnets. Budget 20–25%." },
                      { name: "Lead Capture", width: "55%", color: "#f59e0b", kpi: "CPL $5–$150 · Form Completion Rate · Lead Quality", platforms: { mobile: ["Meta Lead Forms", "LinkedIn Lead Gen", "TikTok Instant Form", "Snap Lead Ads"], desktop: ["LinkedIn Lead Gen", "Google Demand Gen Lead Form", "Meta Lead Forms"] }, tip: "Goal: Capture qualified leads. Native in-platform forms convert 2–3x better than landing pages. Arabic form fields for KSA/Kuwait. Pre-filled LinkedIn forms for B2B. Budget 30–40%." },
                      { name: "Nurture", width: "35%", color: "#22c55e", kpi: "SQL Rate · Meeting Booked Rate · Cost per SQL", platforms: { mobile: ["WhatsApp Follow-up", "Meta Retargeting", "Email Sequences"], desktop: ["LinkedIn InMail", "Google RLSA", "Programmatic Retargeting"] }, tip: "Goal: Convert leads to sales-qualified. WhatsApp follow-up is powerful regionally. LinkedIn InMail for B2B. Retarget form openers who didn't complete. Budget 10–20%." },
                    ]
                  },
                  "App Install": {
                    stages: [
                      { name: "Awareness", width: "100%", color: "#3b82f6", kpi: "CPM · Reach · Video Views · Brand Recall", platforms: { mobile: ["TikTok TopView", "Meta Reels", "Snap AR Lens", "YouTube Bumper"] }, tip: "Goal: Drive awareness of the app and its value prop. Video-first showing the app in action. TikTok and Reels for younger demos. Budget 20–25%." },
                      { name: "Install", width: "70%", color: "#8b5cf6", kpi: "CPI $1–$6 · Install Rate · CTR-to-Install", platforms: { mobile: ["Meta App Promotion", "TikTok App Install", "Google UAC", "Snap App Install"] }, tip: "Goal: Drive app installs at efficient CPI. Google UAC covers Play Store + YouTube + GDN. Meta and TikTok for social installs. Use AppsFlyer/Adjust for attribution. Budget 40–50%." },
                      { name: "Activation", width: "45%", color: "#f59e0b", kpi: "D1/D7 Retention · Registration Rate · First Action", platforms: { mobile: ["Meta App Events", "TikTok App Events", "Google UAC (in-app)", "Push Notifications"] }, tip: "Goal: Get installs to register and complete first action. Optimise toward in-app events, not just installs. Deep-link to specific content. Budget 15–20%." },
                      { name: "Retention", width: "30%", color: "#22c55e", kpi: "D30 Retention · LTV · Re-engagement Rate", platforms: { mobile: ["Meta Retargeting", "Google App Campaigns", "Push/In-App", "Programmatic Retargeting"] }, tip: "Goal: Re-engage lapsed users and increase LTV. Retarget users who installed but didn't activate. Rewarded video for gaming. Budget 10–15%." },
                    ]
                  },
                  "B2B": {
                    stages: [
                      { name: "Awareness", width: "100%", color: "#3b82f6", kpi: "CPM $10–$60 · Reach · Video Views · SOV", platforms: { mobile: ["LinkedIn Sponsored Content", "Meta Video", "YouTube TrueView"], desktop: ["LinkedIn Thought Leader Ads", "YouTube Select", "X (Twitter) Trends", "Programmatic OLV"] }, tip: "Goal: Build brand awareness among decision-makers. LinkedIn is primary - Thought Leader Ads from execs build credibility. YouTube for longer storytelling. Budget 25–30%." },
                      { name: "Consideration", width: "75%", color: "#8b5cf6", kpi: "CTR · CPC $5–$15 · Document Opens · Engagement", platforms: { mobile: ["LinkedIn Document Ads", "Meta Carousel"], desktop: ["LinkedIn Document Ads", "Google Demand Gen", "X Amplify Pre-Roll", "Programmatic Native"] }, tip: "Goal: Educate decision-makers. LinkedIn Document Ads (PDF carousels) drive high engagement. Webinar/whitepaper distribution. Content-led native ads. Budget 20–25%." },
                      { name: "Lead Gen", width: "50%", color: "#f59e0b", kpi: "CPL $30–$150 · Form Completion · Lead Quality Score", platforms: { mobile: ["LinkedIn Lead Gen Forms", "Meta Lead Forms"], desktop: ["LinkedIn Lead Gen Forms", "LinkedIn InMail", "Google Demand Gen", "Webinar Landing Pages"] }, tip: "Goal: Capture high-quality leads from qualified professionals. LinkedIn pre-filled forms convert best for B2B. InMail for ABM (1 per member per 45 days). Budget 30–35%." },
                      { name: "Pipeline", width: "30%", color: "#22c55e", kpi: "SQL Rate · Pipeline Value · Meeting Rate · Deal Close", platforms: { mobile: ["LinkedIn InMail", "Email Sequences", "WhatsApp"], desktop: ["LinkedIn Retargeting", "Google RLSA", "ABM Display", "Programmatic Retargeting"] }, tip: "Goal: Convert MQLs to SQLs and pipeline. ABM retargeting on LinkedIn by company list. Sales team follow-up. Track through to pipeline value, not just lead volume. Budget 10–20%." },
                    ]
                  },
                };

                const journey = journeys[funnelJourney];

                return (
                  <div style={{ marginBottom: 28 }}>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: "#2D1768", marginBottom: 12 }}>🔻 Interactive Funnel - Platform & KPI by Stage</h3>
                    <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
                      {Object.keys(journeys).map(j => (
                        <button key={j} onClick={() => { setFunnelJourney(j); setFunnelHover(null); }} style={{
                          padding: "6px 14px", borderRadius: 20, border: funnelJourney === j ? "1px solid #7AC143" : "1px solid #e0e0e8",
                          background: funnelJourney === j ? "#2D176830" : "#f9f9fb", color: funnelJourney === j ? "#7AC143" : "#6a6a7e",
                          fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit"
                        }}>{j}</button>
                      ))}
                    </div>

                    {/* Funnel Visual */}
                    <div style={{ position: "relative" }}>
                      {journey.stages.map((stage, si) => (
                        <div key={si} style={{ display: "flex", alignItems: "stretch", marginBottom: 2, cursor: "pointer", position: "relative" }}
                          onMouseEnter={() => setFunnelHover(si)} onMouseLeave={() => setFunnelHover(null)}>
                          {/* Funnel bar */}
                          <div style={{
                            width: stage.width, minHeight: 70, background: funnelHover === si ? `${stage.color}30` : `${stage.color}18`,
                            borderLeft: `4px solid ${stage.color}`, borderRadius: "0 12px 12px 0", padding: "12px 16px",
                            transition: "all .2s", display: "flex", flexDirection: "column", justifyContent: "center",
                            boxShadow: funnelHover === si ? `0 0 20px ${stage.color}20` : "none"
                          }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                              <div style={{ fontSize: 14, fontWeight: 800, color: stage.color }}>{stage.name}</div>
                              <div style={{ fontSize: 9, color: "#5a5a6e", fontFamily: "'SF Mono', monospace" }}>{stage.kpi.split("·")[0].trim()}</div>
                            </div>
                            <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                              {(stage.platforms.mobile || []).slice(0, 4).map((p, pi) => (
                                <span key={pi} style={{ fontSize: 9, padding: "1px 6px", borderRadius: 8, background: `${stage.color}20`, color: stage.color, border: `1px solid ${stage.color}30` }}>{p}</span>
                              ))}
                              {(stage.platforms.mobile || []).length > 4 && <span style={{ fontSize: 9, color: "#5a5a6e" }}>+{stage.platforms.mobile.length - 4}</span>}
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Hover popup */}
                      {funnelHover !== null && (
                        <div style={{
                          position: "absolute", right: 0, top: funnelHover * 72, width: 340, background: "#ffffff", boxShadow: "0 8px 32px rgba(0,0,0,.12)",
                          border: `1px solid ${journey.stages[funnelHover].color}40`, borderRadius: 12, padding: 16, zIndex: 10,
                          boxShadow: "0 8px 32px rgba(0,0,0,.5)", pointerEvents: "none"
                        }}>
                          <div style={{ fontSize: 13, fontWeight: 800, color: journey.stages[funnelHover].color, marginBottom: 8 }}>
                            {journey.stages[funnelHover].name} - {funnelJourney}
                          </div>

                          <div style={{ fontSize: 10, color: "#444455", marginBottom: 10, lineHeight: 1.5 }}>
                            {journey.stages[funnelHover].tip}
                          </div>

                          <div style={{ fontSize: 10, fontWeight: 700, color: "#5a5a6e", textTransform: "uppercase", marginBottom: 4 }}>KPIs</div>
                          <div style={{ fontSize: 11, color: "#1a1a2e", fontFamily: "'SF Mono', monospace", marginBottom: 10 }}>
                            {journey.stages[funnelHover].kpi}
                          </div>

                          <div style={{ display: "grid", gridTemplateColumns: journey.stages[funnelHover].platforms.ctv ? "1fr 1fr 1fr" : "1fr 1fr", gap: 8 }}>
                            <div>
                              <div style={{ fontSize: 9, fontWeight: 700, color: "#5a5a6e", marginBottom: 4 }}>📱 MOBILE</div>
                              {(journey.stages[funnelHover].platforms.mobile || []).map((p, i) => (
                                <div key={i} style={{ fontSize: 10, color: "#333344", marginBottom: 2 }}>• {p}</div>
                              ))}
                            </div>
                            <div>
                              <div style={{ fontSize: 9, fontWeight: 700, color: "#5a5a6e", marginBottom: 4 }}>🖥️ DESKTOP</div>
                              {(journey.stages[funnelHover].platforms.desktop || []).map((p, i) => (
                                <div key={i} style={{ fontSize: 10, color: "#333344", marginBottom: 2 }}>• {p}</div>
                              ))}
                            </div>
                            {journey.stages[funnelHover].platforms.ctv && (
                              <div>
                                <div style={{ fontSize: 9, fontWeight: 700, color: "#5a5a6e", marginBottom: 4 }}>📺 CTV</div>
                                {journey.stages[funnelHover].platforms.ctv.map((p, i) => (
                                  <div key={i} style={{ fontSize: 10, color: "#333344", marginBottom: 2 }}>• {p}</div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {funnelHover === null && <div style={{ fontSize: 10, color: "#7a7a8a", marginTop: 8, fontStyle: "italic" }}>Hover over a funnel stage to see platform recommendations, KPIs, and strategy tips split by device.</div>}
                  </div>
                );
              })()}

              <h3 style={{ fontSize: 15, fontWeight: 700, color: "#2D1768", marginBottom: 12 }}>Funnel Stage KPIs</h3>
              {[
                { stage: "Top (Awareness)", obj: "Build brand awareness, reach new audiences", primary: "CPM / Reach / Frequency", secondary: "Unique Reach, vCPM, Brand Lift ($30K+ budgets)" },
                { stage: "Top (Video)", obj: "Drive video consumption, storytelling", primary: "VTR / ThruPlay / CPV", secondary: "Completion Rate by quartile, Avg Watch Time, Skip Rate" },
                { stage: "Mid (Consideration)", obj: "Drive traffic, engagement, exploration", primary: "CTR / CPC / Landing Page Views", secondary: "Bounce Rate, Session Duration" },
                { stage: "Mid (Lead Gen)", obj: "Collect first-party data, qualified leads", primary: "CPL / Lead Volume", secondary: "Form Completion Rate, Lead Quality Score" },
                { stage: "Bottom (Conversions)", obj: "Purchases, sign-ups, downloads", primary: "ROAS / CPA / CVR", secondary: "Add-to-Cart, Checkout Rate, Incremental ROAS" },
                { stage: "Retention & Loyalty", obj: "Re-engage existing customers", primary: "CPA (Retargeting) / ROAS", secondary: "View-Through Conversions, Frequency (cap 5–7x/week)" },
              ].map((f, i) => (
                <Card key={i}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#1a1a2e", marginBottom: 6 }}>{f.stage}</div>
                  <div style={{ fontSize: 12, color: "#5a5a6e", marginBottom: 8 }}>{f.obj}</div>
                  <InfoRow label="Primary KPI" value={<span style={{ color: "#2a8c3e", fontWeight: 600 }}>{f.primary}</span>} />
                  <InfoRow label="Secondary" value={f.secondary} />
                </Card>
              ))}

              <h3 style={{ fontSize: 15, fontWeight: 700, color: "#2D1768", marginTop: 28, marginBottom: 12 }}>Tracking Setup (Pre-Launch)</h3>
              {measurementSetup.map((m, i) => (
                <Accordion key={i} title={m.tracking} subtitle={m.platform}>
                  <div style={{ fontSize: 12, color: "#444455", marginBottom: 12 }}>{m.what}</div>
                  {m.checks.map((c, j) => (
                    <CheckItem key={j} checked={checkedItems[`track_${i}_${j}`]} onChange={() => toggleCheck(`track_${i}_${j}`)}>{c}</CheckItem>
                  ))}
                </Accordion>
              ))}

              <h3 style={{ fontSize: 15, fontWeight: 700, color: "#cc3333", marginTop: 28, marginBottom: 12 }}>⚠️ Attribution Caveats</h3>
              {attributionCaveats.map((a, i) => (
                <Card key={i}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#1a1a2e", marginBottom: 4 }}>{a.caveat}</div>
                  <div style={{ fontSize: 12, color: "#444455", marginBottom: 8 }}>{a.detail}</div>
                  <div style={{ fontSize: 12, color: "#2a8c3e" }}>✅ {a.handle}</div>
                </Card>
              ))}
            </div>
          )}

          {/* CALENDAR */}
          {activeSection === "calendar" && (
            <div>
              <SectionTitle>Regional Cultural & Seasonal Calendar</SectionTitle>
              <SectionDesc>19 key moments across 6 categories with timing, audience mindset, platforms, formats, and strategy notes.</SectionDesc>
              {seasonalCalendar.filter(s => !filterText || JSON.stringify(s).toLowerCase().includes(filterText)).map((s, i) => (
                <Accordion key={i} title={s.period} subtitle={`${s.months} · Budget: ${s.weight}`} badge={<Chip color={s.color}>{s.cpm}</Chip>}>
                  <div style={{ fontSize: 13, color: "#555566", lineHeight: 1.7 }}>
                    <InfoRow label="Months" value={s.months} />
                    <InfoRow label="CPM Pressure" value={s.cpm} />
                    <InfoRow label="Budget Weight" value={s.weight} />
                    <InfoRow label="Priority Action" value={s.action} />
                    <InfoRow label="Pre-Book" value={s.prebook} />
                  </div>
                </Accordion>
              ))}
            </div>
          )}

          {/* PLATFORM UPDATES */}
          {activeSection === "updates" && (
            <div>
              <SectionTitle>Latest Platform Updates (2025–2026)</SectionTitle>
              <SectionDesc>Verified updates from official newsrooms and trusted sources. Check before every campaign.</SectionDesc>
              {platformUpdates.filter(u => !filterText || JSON.stringify(u).toLowerCase().includes(filterText)).map((u, i) => (
                <Card key={i}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "#1a1a2e" }}>{u.update}</div>
                      <div style={{ fontSize: 11, color: "#5a5a6e" }}>{u.platform} · {u.date}</div>
                    </div>
                    <span style={{ fontSize: 18 }}>{u.impact}</span>
                  </div>
                  <div style={{ fontSize: 12, color: "#444455", lineHeight: 1.6 }}>{u.detail}</div>
                </Card>
              ))}
            </div>
          )}

          {/* CAVEATS */}
          {activeSection === "caveats" && (
            <div>
              <SectionTitle>Caveats, Disclaimers & Risk Areas</SectionTitle>
              <SectionDesc>10 risk areas every planner must understand and communicate to clients.</SectionDesc>
              {caveats.filter(c => !filterText || JSON.stringify(c).toLowerCase().includes(filterText)).map((c, i) => (
                <Accordion key={i} title={c.area}>
                  <div style={{ fontSize: 13, color: "#555566", lineHeight: 1.7 }}>
                    <InfoRow label="Risk" value={c.risk} />
                    <InfoRow label="How to Handle" value={c.handle} />
                    <div style={{ marginTop: 8, padding: 10, background: "#faf0f0", borderRadius: 8, border: "1px solid #e0d0e8", fontSize: 12 }}>
                      <strong style={{ color: "#cc3333" }}>🚩 Red Flag:</strong> {c.flag}
                    </div>
                  </div>
                </Accordion>
              ))}
            </div>
          )}

          {/* CHECKLIST */}
          {activeSection === "checklist" && (
            <div>
              <SectionTitle>Pre-Launch QA Checklist</SectionTitle>
              <SectionDesc>Complete before every campaign go-live. {checkedCount}/{totalChecks} items checked.</SectionDesc>

              <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                {/* Left: Checklist items */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  {Object.entries(qaChecklist).map(([category, items]) => {
                    const catChecked = items.filter((_, i) => checkedItems[`qa_${category}_${i}`]).length;
                    const catDone = catChecked === items.length;
                    return (
                    <Card key={category} style={{ marginBottom: 16, border: catDone ? "1px solid #22c55e30" : "1px solid #e0e0e8" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                        <div style={{ fontSize: 14, fontWeight: 700, color: "#1a1a2e" }}>{category}</div>
                        <div style={{ fontSize: 11, color: catDone ? "#22c55e" : "#6a6a7e", fontWeight: 600 }}>
                          {catDone ? "✅ Complete" : `${catChecked}/${items.length}`}
                        </div>
                      </div>
                      {items.map((item, i) => {
                        const key = `qa_${category}_${i}`;
                        return <CheckItem key={key} checked={checkedItems[key]} onChange={() => toggleCheck(key)}>{item}</CheckItem>;
                      })}
                    </Card>
                  );})}
                </div>

                {/* Right: Sticky evolution card */}
                <div style={{ width: 220, flexShrink: 0, position: "sticky", top: 28 }}>
                  {(() => {
                    const pct = Math.round((checkedCount / totalChecks) * 100);
                    const stages = [
                      { min: 0, icon: "🥚", name: "The Brief Egg", msg: "Start checking items to hatch it.", bg: "#f5f5f7" },
                      { min: 8, icon: "🐣", name: "The Hatchling", msg: "Brief & strategy taking shape.", bg: "#f0f5f2" },
                      { min: 20, icon: "🐥", name: "Baby Planner", msg: "Creative & tracking coming together.", bg: "#eef5ee" },
                      { min: 35, icon: "🐦", name: "Fledgling Campaign", msg: "Learning to fly.", bg: "#e8f5e8" },
                      { min: 50, icon: "🦅", name: "Campaign Eagle", msg: "Over halfway there!", bg: "#e0f5e5" },
                      { min: 65, icon: "🚀", name: "Launch Sequence", msg: "Engines warming up.", bg: "#eef0f8" },
                      { min: 80, icon: "🛸", name: "Orbit Mode", msg: "Final checks in progress.", bg: "#ece0f5" },
                      { min: 95, icon: "⭐", name: "Supernova", msg: "So close!", bg: "#2a1a40" },
                      { min: 100, icon: "🏆", name: "Campaign Ready!", msg: "Cleared for launch! 🎉", bg: "#1a3a1a" },
                    ];
                    const stage = [...stages].reverse().find(s => pct >= s.min) || stages[0];
                    const nextStage = stages[stages.indexOf(stage) + 1];

                    return (
                      <div style={{ background: `linear-gradient(180deg, ${stage.bg} 0%, #f9f9fb 100%)`, border: "1px solid #e0e0e8", borderRadius: 12, padding: 20, textAlign: "center" }}>
                        <div style={{ fontSize: 48, marginBottom: 6, filter: pct === 100 ? "drop-shadow(0 0 12px #22c55e)" : "none", transition: "all .5s" }}>{stage.icon}</div>
                        <div style={{ fontSize: 14, fontWeight: 800, color: "#1a1a2e", marginBottom: 2 }}>{stage.name}</div>
                        <div style={{ fontSize: 10, color: "#444455", marginBottom: 12 }}>{stage.msg}</div>

                        <div style={{ marginBottom: 4 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                            <span style={{ fontSize: 10, color: "#5a5a6e" }}>{pct}%</span>
                            <span style={{ fontSize: 10, color: "#5a5a6e" }}>{checkedCount}/{totalChecks}</span>
                          </div>
                          <ProgressBar value={checkedCount} max={totalChecks} color={pct === 100 ? "#22c55e" : pct >= 80 ? "#7eb8ff" : pct >= 50 ? "#3b82f6" : "#d0d0d8"} />
                        </div>

                        {nextStage && pct < 100 && (
                          <div style={{ marginTop: 10, fontSize: 9, color: "#7a7a8a", lineHeight: 1.4 }}>
                            Next: {nextStage.icon} {nextStage.name}<br/>at {nextStage.min}%
                          </div>
                        )}

                        {pct === 100 && (
                          <div style={{ marginTop: 10, display: "flex", justifyContent: "center", gap: 3, flexWrap: "wrap" }}>
                            {stages.map((s, i) => <span key={i} style={{ fontSize: 12, opacity: 0.7 }}>{s.icon}</span>)}
                          </div>
                        )}

                        {/* Evolution timeline */}
                        <div style={{ marginTop: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 2 }}>
                          {stages.map((s, i) => (
                            <div key={i} style={{ display: "flex", alignItems: "center", gap: 2 }}>
                              <div style={{
                                width: 8, height: 8, borderRadius: "50%",
                                background: pct >= s.min ? (pct === 100 ? "#22c55e" : "#3b82f6") : "#e0e0e8",
                                border: pct >= s.min && pct < (stages[i+1]?.min || 101) ? "2px solid #7eb8ff" : "1px solid transparent",
                                transition: "all .3s",
                                fontSize: 5, display: "flex", alignItems: "center", justifyContent: "center"
                              }} />
                              {i < stages.length - 1 && <div style={{ width: 6, height: 1, background: pct >= (stages[i+1]?.min || 101) ? "#3b82f6" : "#e0e0e8" }} />}
                            </div>
                          ))}
                        </div>

                        {/* Reset button */}
                        <button
                          onClick={() => { if (window.confirm("Reset all checked items? This will clear your progress.")) setCheckedItems({}); }}
                          style={{
                            marginTop: 16, width: "100%", padding: "8px 0", borderRadius: 8,
                            background: "transparent", border: "1px solid #d0d0d8", color: "#5a5a6e",
                            fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
                            transition: "all .15s"
                          }}
                          onMouseEnter={e => { e.target.style.borderColor = "#ff7e7e"; e.target.style.color = "#ff7e7e"; }}
                          onMouseLeave={e => { e.target.style.borderColor = "#d0d0d8"; e.target.style.color = "#6a6a7e"; }}
                        >
                          ↺ Reset Checklist
                        </button>
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>
          )}

          {/* MISTAKES */}
          {activeSection === "mistakes" && (
            <div>
              <SectionTitle>Common Planning Mistakes</SectionTitle>
              <SectionDesc>7 recurring errors with root causes, fixes, and prevention rules.</SectionDesc>
              {commonMistakes.filter(m => !filterText || JSON.stringify(m).toLowerCase().includes(filterText)).map((m, i) => (
                <Accordion key={i} title={m.mistake}>
                  <div style={{ fontSize: 13, color: "#555566", lineHeight: 1.7 }}>
                    <InfoRow label="Why It Happens" value={m.why} />
                    <InfoRow label="The Fix" value={m.fix} />
                    <div style={{ marginTop: 8, padding: 10, background: "#e8e0f0", borderRadius: 8, border: "1px solid #d0d0e0", fontSize: 12 }}>
                      <strong style={{ color: "#2D1768" }}>📌 Rule:</strong> {m.rule}
                    </div>
                  </div>
                </Accordion>
              ))}
            </div>
          )}

          {/* CREATIVE SPECS */}
          {activeSection === "creativespecs" && (
            <div>
              <SectionTitle>Creative Specs by Platform</SectionTitle>
              <SectionDesc>Complete ad dimensions, formats, file requirements, and placement-specific specs across all platforms. {creativeSpecs.length} formats documented.</SectionDesc>

              <div style={{ display: "flex", gap: 6, marginBottom: 20, flexWrap: "wrap" }}>
                {["All"].concat(Array.from(new Set(creativeSpecs.map(s => s.platform)))).map(p => (
                  <button key={p} onClick={() => setCreativePlatform(p)} style={{
                    padding: "6px 14px", borderRadius: 20, border: creativePlatform === p ? "1px solid #7AC143" : "1px solid #e0e0e8",
                    background: creativePlatform === p ? "#2D176830" : "#f9f9fb", color: creativePlatform === p ? "#7AC143" : "#6a6a7e",
                    fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", transition: "all .15s"
                  }}>{p}</button>
                ))}
              </div>

              <Card style={{ background: "#f0edf5", border: "1px solid #d0d0e0", marginBottom: 20 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#2D1768", marginBottom: 8 }}>🎯 Quick Reference - The 3 Must-Have Ratios</div>
                <div style={{ fontSize: 12, color: "#444455", lineHeight: 1.8 }}>
                  <strong style={{ color: "#2a8c3e" }}>1:1 Square (1080×1080)</strong> - Works across 80% of placements. Safe default for Feed on all platforms.<br/>
                  <strong style={{ color: "#b8860b" }}>4:5 Vertical (1080×1350)</strong> - Best for mobile Feed. Takes up more screen. Higher engagement vs square.<br/>
                  <strong style={{ color: "#6a1b9a" }}>9:16 Full Vertical (1080×1920)</strong> - Mandatory for Reels, Stories, TikTok, Snapchat, Shorts. Non-negotiable in 2026.
                </div>
              </Card>

              {(() => { const filtered = creativeSpecs.filter(s => creativePlatform === "All" || s.platform === creativePlatform).filter(s => !filterText || JSON.stringify(s).toLowerCase().includes(filterText)); return (
                <div style={{ fontSize: 12, color: "#5a5a6e", marginBottom: 16 }}>Showing <strong style={{ color: "#2D1768" }}>{filtered.length}</strong> of {creativeSpecs.length} formats {creativePlatform !== "All" ? `for ${creativePlatform}` : ""}</div>
              ); })()}

              <h3 style={{ fontSize: 15, fontWeight: 700, color: "#2D1768", marginBottom: 14 }}>📱 Visual Format Examples</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16, marginBottom: 28 }}>

                {/* Phone: Feed 1:1 */}
                {(creativePlatform === "All" || ["Meta","LinkedIn","X (Twitter)","Pinterest"].includes(creativePlatform)) && (
                <Card style={{ padding: 16, textAlign: "center" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#2D1768", marginBottom: 8 }}>Feed Post - 1:1 Square</div>
                  <div style={{ width: 140, margin: "0 auto", background: "#f5f5f7", borderRadius: 16, border: "2px solid #d0d0d8", padding: "8px 6px", position: "relative" }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#d0d0d8", margin: "0 auto 6px" }} />
                    <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 4, padding: "0 4px" }}>
                      <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#e0e0e8" }} />
                      <div style={{ height: 4, flex: 1, background: "#e0e0e8", borderRadius: 2 }} />
                    </div>
                    <div style={{ width: "100%", paddingBottom: "100%", background: "#ede8f5", borderRadius: 4, position: "relative" }}>
                      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#2a8c3e", fontSize: 10, fontWeight: 700 }}>1:1<br/>1080×1080</div>
                    </div>
                    <div style={{ padding: "4px", display: "flex", gap: 3, marginTop: 4 }}>
                      {[1,2,3,4].map(i => <div key={i} style={{ width: 12, height: 12, borderRadius: "50%", background: "#e0e0e8" }} />)}
                    </div>
                    <div style={{ height: 3, background: "#e0e0e8", borderRadius: 2, margin: "4px 20px 2px", width: "60%" }} />
                    <div style={{ height: 3, background: "#e0e0e8", borderRadius: 2, margin: "2px 20px", width: "80%" }} />
                    <div style={{ width: 30, height: 3, borderRadius: 10, background: "#d0d0d8", margin: "8px auto 2px" }} />
                  </div>
                  <div style={{ fontSize: 9, color: "#5a5a6e", marginTop: 6 }}>Meta · LinkedIn · X · Pinterest</div>
                </Card>)}

                {/* Phone: Feed 4:5 */}
                {(creativePlatform === "All" || creativePlatform === "Meta") && (
                <Card style={{ padding: 16, textAlign: "center" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#b8860b", marginBottom: 8 }}>Feed Post - 4:5 Vertical</div>
                  <div style={{ width: 140, margin: "0 auto", background: "#f5f5f7", borderRadius: 16, border: "2px solid #d0d0d8", padding: "8px 6px" }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#d0d0d8", margin: "0 auto 6px" }} />
                    <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 4, padding: "0 4px" }}>
                      <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#e0e0e8" }} />
                      <div style={{ height: 4, flex: 1, background: "#e0e0e8", borderRadius: 2 }} />
                    </div>
                    <div style={{ width: "100%", paddingBottom: "125%", background: "#ede8f5", borderRadius: 4, position: "relative" }}>
                      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#b8860b", fontSize: 10, fontWeight: 700 }}>4:5<br/>1080×1350</div>
                    </div>
                    <div style={{ height: 3, background: "#e0e0e8", borderRadius: 2, margin: "4px 20px 2px", width: "60%" }} />
                    <div style={{ width: 30, height: 3, borderRadius: 10, background: "#d0d0d8", margin: "6px auto 2px" }} />
                  </div>
                  <div style={{ fontSize: 9, color: "#5a5a6e", marginTop: 6 }}>Meta Feed · Best for mobile</div>
                </Card>)}

                {/* Phone: Stories/Reels 9:16 */}
                <Card style={{ padding: 16, textAlign: "center" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#6a1b9a", marginBottom: 8 }}>Stories / Reels - 9:16</div>
                  <div style={{ width: 120, margin: "0 auto", background: "#ede8f5", borderRadius: 16, border: "2px solid #d0d0d8", height: 214, position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", top: 6, left: 8, right: 8, display: "flex", alignItems: "center", gap: 4, zIndex: 2 }}>
                      <div style={{ width: 16, height: 16, borderRadius: "50%", border: "1.5px solid rgba(0,0,0,.15)" }} />
                      <div style={{ height: 3, flex: 1, background: "rgba(0,0,0,.08)", borderRadius: 2 }} />
                    </div>
                    <div style={{ position: "absolute", top: 8, right: 8, display: "flex", flexDirection: "column", gap: 6, zIndex: 2 }}>
                      {["♡","💬","↗"].map((e,i) => <div key={i} style={{ fontSize: 8, opacity: .4 }}>{e}</div>)}
                    </div>
                    <div style={{ position: "absolute", top: 20, left: 0, right: 0, height: 2, background: "rgba(126,184,255,.2)", margin: "0 8px" }}>
                      <div style={{ width: "40%", height: "100%", background: "#7eb8ff", borderRadius: 1 }} />
                    </div>
                    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#6a1b9a", fontSize: 10, fontWeight: 700, flexDirection: "column" }}>
                      <span>9:16</span>
                      <span style={{ fontSize: 8 }}>1080×1920</span>
                      <span style={{ fontSize: 7, color: "#cc3333", marginTop: 4 }}>⬆ 250px safe zone</span>
                    </div>
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "rgba(0,0,0,.3)", padding: "6px 8px", zIndex: 2 }}>
                      <div style={{ height: 3, background: "rgba(0,0,0,.1)", borderRadius: 2, marginBottom: 3, width: "70%" }} />
                      <div style={{ background: "rgba(126,184,255,.3)", borderRadius: 4, padding: "3px 0", textAlign: "center", fontSize: 7, color: "#2D1768" }}>CTA Button</div>
                      <div style={{ fontSize: 7, color: "#cc3333", textAlign: "center", marginTop: 2 }}>⬇ 340px safe zone</div>
                    </div>
                  </div>
                  <div style={{ fontSize: 9, color: "#5a5a6e", marginTop: 6 }}>Meta · TikTok · Snap · Shorts</div>
                </Card>

                {/* Phone: TikTok In-Feed */}
                <Card style={{ padding: 16, textAlign: "center" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#6a1b9a", marginBottom: 8 }}>TikTok In-Feed</div>
                  <div style={{ width: 120, margin: "0 auto", background: "#ede8f5", borderRadius: 16, border: "2px solid #d0d0d8", height: 214, position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#6a1b9a", fontSize: 10, fontWeight: 700, flexDirection: "column" }}>
                      <span>9:16</span>
                      <span style={{ fontSize: 8 }}>Full Screen</span>
                      <span style={{ fontSize: 7, color: "#444455", marginTop: 4 }}>Sound ON</span>
                      <span style={{ fontSize: 7, color: "#b8860b" }}>Hook in 2s</span>
                    </div>
                    <div style={{ position: "absolute", right: 6, bottom: 40, display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
                      {["♡","💬","↗","🎵"].map((e,i) => <div key={i} style={{ fontSize: 10, opacity: .3 }}>{e}</div>)}
                    </div>
                    <div style={{ position: "absolute", bottom: 6, left: 8, right: 30 }}>
                      <div style={{ height: 3, background: "rgba(0,0,0,.08)", borderRadius: 2, marginBottom: 2, width: "60%" }} />
                      <div style={{ height: 3, background: "rgba(0,0,0,.06)", borderRadius: 2, width: "80%" }} />
                      <div style={{ height: 2, background: "rgba(0,0,0,.05)", borderRadius: 2, marginTop: 3, width: "40%" }} />
                    </div>
                  </div>
                  <div style={{ fontSize: 9, color: "#5a5a6e", marginTop: 6 }}>TikTok · Spark Ads · Prime Time</div>
                </Card>

                {/* Carousel */}
                <Card style={{ padding: 16, textAlign: "center" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#2D1768", marginBottom: 8 }}>Carousel - Multi-Card</div>
                  <div style={{ width: 140, margin: "0 auto", background: "#f5f5f7", borderRadius: 16, border: "2px solid #d0d0d8", padding: "8px 6px" }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#d0d0d8", margin: "0 auto 6px" }} />
                    <div style={{ display: "flex", gap: 4, overflow: "hidden" }}>
                      {[1,2,3].map(i => (
                        <div key={i} style={{ minWidth: i === 1 ? "85%" : "15%", paddingBottom: i === 1 ? "85%" : "15%", background: i === 1 ? "#ede8f5" : "#f0f0f5", borderRadius: 4, position: "relative", flexShrink: 0 }}>
                          {i === 1 && <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#2D1768", fontSize: 9, fontWeight: 700 }}>Card 1<br/>1:1</div>}
                        </div>
                      ))}
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", gap: 3, marginTop: 6 }}>
                      {[1,2,3,4,5].map(i => <div key={i} style={{ width: 4, height: 4, borderRadius: "50%", background: i === 1 ? "#7eb8ff" : "#e0e0e8" }} />)}
                    </div>
                    <div style={{ height: 3, background: "#e0e0e8", borderRadius: 2, margin: "4px 10px 2px", width: "70%" }} />
                    <div style={{ width: 30, height: 3, borderRadius: 10, background: "#d0d0d8", margin: "6px auto 2px" }} />
                  </div>
                  <div style={{ fontSize: 9, color: "#5a5a6e", marginTop: 6 }}>Meta · LinkedIn · Pinterest</div>
                </Card>

                {/* Desktop: Browser Feed */}
                <Card style={{ padding: 16, textAlign: "center" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#2D1768", marginBottom: 8 }}>Desktop Feed</div>
                  <div style={{ width: "100%", background: "#f5f5f7", borderRadius: 8, border: "2px solid #d0d0d8", overflow: "hidden" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "4px 8px", background: "#ffffff", borderBottom: "1px solid #e0e0e8" }}>
                      {["#ff5f57","#febc2e","#28c840"].map((c,i) => <div key={i} style={{ width: 5, height: 5, borderRadius: "50%", background: c }} />)}
                      <div style={{ flex: 1, height: 10, background: "#f5f5f7", borderRadius: 4, margin: "0 10px" }} />
                    </div>
                    <div style={{ padding: 8, display: "flex", gap: 6 }}>
                      <div style={{ flex: "0 0 30%", display: "flex", flexDirection: "column", gap: 3 }}>
                        {[1,2,3].map(i => <div key={i} style={{ height: 4, background: "#e0e0e8", borderRadius: 2, width: `${90-i*15}%` }} />)}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 4 }}>
                          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#e0e0e8" }} />
                          <div style={{ height: 3, flex: 1, background: "#e0e0e8", borderRadius: 2 }} />
                          <div style={{ fontSize: 6, color: "#9a9aaa" }}>Sponsored</div>
                        </div>
                        <div style={{ paddingBottom: "55%", background: "#ede8f5", borderRadius: 4, position: "relative" }}>
                          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#2D1768", fontSize: 9, fontWeight: 700 }}>16:9 or 1:1</div>
                        </div>
                        <div style={{ display: "flex", gap: 3, marginTop: 4 }}>
                          {[1,2,3].map(i => <div key={i} style={{ height: 3, flex: 1, background: "#e0e0e8", borderRadius: 2 }} />)}
                        </div>
                      </div>
                      <div style={{ flex: "0 0 20%" }}>
                        <div style={{ paddingBottom: "180%", background: "#ede8f5", borderRadius: 4, position: "relative" }}>
                          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#5a5a6e", fontSize: 7 }}>Right<br/>Column</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style={{ fontSize: 9, color: "#5a5a6e", marginTop: 6 }}>Meta · LinkedIn · X (Desktop)</div>
                </Card>

                {/* Display Banners */}
                <Card style={{ padding: 16, textAlign: "center" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#b8860b", marginBottom: 8 }}>Display Banners</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "center" }}>
                    <div style={{ width: "100%", height: 22, background: "#e8e6ee", borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, color: "#b8860b", fontWeight: 600, border: "1px dashed #c0c0cc" }}>728 × 90 - Leaderboard</div>
                    <div style={{ display: "flex", gap: 6, width: "100%", justifyContent: "center" }}>
                      <div style={{ width: 70, height: 58, background: "#ede8f5", borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 7, color: "#b8860b", fontWeight: 600, border: "1px dashed #c0c0cc" }}>300×250<br/>MPU</div>
                      <div style={{ width: 28, height: 80, background: "#eae6ee", borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 6, color: "#b8860b", fontWeight: 600, border: "1px dashed #c0c0cc", writingMode: "vertical-rl" }}>160×600</div>
                    </div>
                    <div style={{ width: "80%", height: 14, background: "#e8e6ee", borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 7, color: "#b8860b", fontWeight: 600, border: "1px dashed #c0c0cc" }}>320 × 50 - Mobile</div>
                  </div>
                  <div style={{ fontSize: 9, color: "#5a5a6e", marginTop: 6 }}>Programmatic · GDN · Display</div>
                </Card>

                {/* Interstitial */}
                <Card style={{ padding: 16, textAlign: "center" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#cc3333", marginBottom: 8 }}>Interstitial / Takeover</div>
                  <div style={{ width: 120, margin: "0 auto", background: "#f5f5f7", borderRadius: 16, border: "2px solid #d0d0d8", height: 200, position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", inset: 8, background: "#f5eaea", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", border: "1px dashed #e0c0c0" }}>
                      <div style={{ fontSize: 8, color: "#cc3333", fontWeight: 700 }}>Full Screen</div>
                      <div style={{ fontSize: 7, color: "#444455" }}>Overlay</div>
                      <div style={{ fontSize: 7, color: "#b8860b", marginTop: 4 }}>320×480 or</div>
                      <div style={{ fontSize: 7, color: "#b8860b" }}>1080×1920</div>
                    </div>
                    <div style={{ position: "absolute", top: 12, right: 12, width: 14, height: 14, borderRadius: "50%", background: "rgba(0,0,0,.06)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, color: "#444455" }}>✕</div>
                  </div>
                  <div style={{ fontSize: 9, color: "#5a5a6e", marginTop: 6 }}>Programmatic · In-App · Rich Media</div>
                </Card>

                {/* Native Ad */}
                <Card style={{ padding: 16, textAlign: "center" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#2a8c3e", marginBottom: 8 }}>Native / In-Content</div>
                  <div style={{ width: "100%", background: "#f5f5f7", borderRadius: 8, border: "1px solid #e0e0e8", padding: 8 }}>
                    {[1,2].map(i => <div key={i} style={{ height: 3, background: "#e0e0e8", borderRadius: 2, marginBottom: 3, width: `${95-i*10}%` }} />)}
                    <div style={{ border: "1px dashed #2a5040", borderRadius: 6, padding: 8, margin: "6px 0", background: "#f0faf5" }}>
                      <div style={{ display: "flex", gap: 6 }}>
                        <div style={{ width: 45, height: 35, background: "#ede8f5", borderRadius: 3, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 6, color: "#2a8c3e" }}>Image</div>
                        <div>
                          <div style={{ height: 3, background: "#2a5040", borderRadius: 2, width: 60, marginBottom: 3 }} />
                          <div style={{ height: 2, background: "#e0e0e8", borderRadius: 2, width: 50, marginBottom: 2 }} />
                          <div style={{ height: 2, background: "#e0e0e8", borderRadius: 2, width: 40 }} />
                          <div style={{ fontSize: 6, color: "#2a8c3e", marginTop: 3 }}>Sponsored</div>
                        </div>
                      </div>
                    </div>
                    {[1,2,3].map(i => <div key={i} style={{ height: 3, background: "#e0e0e8", borderRadius: 2, marginBottom: 3, width: `${100-i*8}%` }} />)}
                  </div>
                  <div style={{ fontSize: 9, color: "#5a5a6e", marginTop: 6 }}>Taboola · Outbrain · Programmatic</div>
                </Card>

                {/* CTV */}
                <Card style={{ padding: 16, textAlign: "center" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#6a1b9a", marginBottom: 8 }}>CTV / OTT - 16:9</div>
                  <div style={{ width: "100%", background: "#f5f5f7", borderRadius: 4, border: "3px solid #d0d0d8", overflow: "hidden", position: "relative" }}>
                    <div style={{ paddingBottom: "56.25%", background: "#ede8f5", position: "relative" }}>
                      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                        <div style={{ fontSize: 9, color: "#6a1b9a", fontWeight: 700 }}>16:9</div>
                        <div style={{ fontSize: 8, color: "#444455" }}>1920×1080 HD</div>
                        <div style={{ fontSize: 7, color: "#b8860b", marginTop: 4 }}>15s or 30s</div>
                        <div style={{ fontSize: 7, color: "#2a8c3e" }}>Non-skippable</div>
                        <div style={{ fontSize: 7, color: "#5a5a6e" }}>Sound ON</div>
                      </div>
                    </div>
                  </div>
                  <div style={{ width: 30, height: 8, background: "#d0d0d8", margin: "0 auto", borderRadius: "0 0 4px 4px" }} />
                  <div style={{ width: 60, height: 3, background: "#e0e0e8", margin: "0 auto", borderRadius: "0 0 2px 2px" }} />
                  <div style={{ fontSize: 9, color: "#5a5a6e", marginTop: 6 }}>Shahid · OSN+ · YouTube CTV</div>
                </Card>

                {/* DOOH */}
                <Card style={{ padding: 16, textAlign: "center" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#b8860b", marginBottom: 8 }}>DOOH - Billboard</div>
                  <div style={{ position: "relative" }}>
                    <div style={{ width: "100%", background: "#ede8f5", borderRadius: 3, border: "2px solid #d0d0d8", overflow: "hidden" }}>
                      <div style={{ paddingBottom: "50%", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                          <div style={{ fontSize: 9, color: "#b8860b", fontWeight: 700 }}>Landscape / Portrait</div>
                          <div style={{ fontSize: 8, color: "#444455" }}>Varies by screen</div>
                          <div style={{ fontSize: 9, color: "#333344", marginTop: 4, fontWeight: 600 }}>10–15s loops</div>
                          <div style={{ fontSize: 7, color: "#cc3333" }}>No audio</div>
                        </div>
                      </div>
                    </div>
                    <div style={{ width: 6, height: 20, background: "#504020", margin: "0 auto" }} />
                  </div>
                  <div style={{ fontSize: 9, color: "#5a5a6e", marginTop: 4 }}>Dubai Mall · SZR · Riyadh</div>
                </Card>

                {/* YouTube Masthead */}
                <Card style={{ padding: 16, textAlign: "center" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#cc3333", marginBottom: 8 }}>YouTube Masthead</div>
                  <div style={{ width: "100%", background: "#f5f5f7", borderRadius: 8, border: "2px solid #d0d0d8", overflow: "hidden" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "4px 8px", background: "#ffffff", borderBottom: "1px solid #e0e0e8" }}>
                      <div style={{ fontSize: 8, color: "#cc3333" }}>▶</div>
                      <div style={{ flex: 1, height: 10, background: "#f5f5f7", borderRadius: 4 }} />
                    </div>
                    <div style={{ padding: "0 8px 8px" }}>
                      <div style={{ paddingBottom: "35%", background: "#f5eaea", borderRadius: 4, position: "relative", marginTop: 8 }}>
                        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                          <div style={{ fontSize: 8, color: "#cc3333", fontWeight: 700 }}>MASTHEAD</div>
                          <div style={{ fontSize: 7, color: "#444455" }}>Homepage Takeover</div>
                          <div style={{ fontSize: 6, color: "#b8860b" }}>$50K–$200K/day</div>
                        </div>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 4, marginTop: 6 }}>
                        {[1,2,3].map(i => <div key={i} style={{ paddingBottom: "60%", background: "#ffffff", borderRadius: 3 }} />)}
                      </div>
                    </div>
                  </div>
                  <div style={{ fontSize: 9, color: "#5a5a6e", marginTop: 6 }}>YouTube · Book 6–8 weeks ahead</div>
                </Card>

                {/* LinkedIn Document Ad */}
                <Card style={{ padding: 16, textAlign: "center" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#2D1768", marginBottom: 8 }}>Document Ad (Swipeable)</div>
                  <div style={{ width: 140, margin: "0 auto", background: "#f5f5f7", borderRadius: 8, border: "1px solid #e0e0e8", padding: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 6 }}>
                      <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#e0e0e8" }} />
                      <div><div style={{ height: 3, background: "#e0e0e8", borderRadius: 2, width: 50, marginBottom: 2 }} /><div style={{ height: 2, background: "#ffffff", borderRadius: 2, width: 35 }} /></div>
                    </div>
                    <div style={{ display: "flex", gap: 3, overflow: "hidden" }}>
                      {[1,2].map(i => (
                        <div key={i} style={{ minWidth: i === 1 ? "88%" : "12%", paddingBottom: i === 1 ? "110%" : "20%", background: i === 1 ? "#f0f0f5" : "#f9f9fb", borderRadius: 4, border: "1px solid #e0e0e8", position: "relative", flexShrink: 0 }}>
                          {i === 1 && <div style={{ position: "absolute", inset: 6, display: "flex", flexDirection: "column", gap: 3 }}>
                            <div style={{ height: 3, background: "#e0e0e8", borderRadius: 2, width: "80%" }} />
                            <div style={{ height: 2, background: "#e0e0e8", borderRadius: 2, width: "60%" }} />
                            <div style={{ height: 2, background: "#e0e0e8", borderRadius: 2, width: "90%" }} />
                            <div style={{ height: 2, background: "#e0e0e8", borderRadius: 2, width: "70%" }} />
                            <div style={{ flex: 1, background: "#ede8f5", borderRadius: 3, marginTop: 3 }} />
                          </div>}
                        </div>
                      ))}
                    </div>
                    <div style={{ fontSize: 7, color: "#2D1768", textAlign: "center", marginTop: 4 }}>← Swipe through pages →</div>
                  </div>
                  <div style={{ fontSize: 9, color: "#5a5a6e", marginTop: 6 }}>LinkedIn · PDF/PPT · B2B</div>
                </Card>
              </div>

              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid #d0d0e0" }}>
                      {["Platform", "Placement", "Device", "Format", "Ratio", "Dimensions", "Duration", "File", "Notes"].map(h => (
                        <th key={h} style={{ padding: "8px 6px", textAlign: "left", color: "#555566", fontWeight: 700, fontSize: 9, textTransform: "uppercase", letterSpacing: ".04em", whiteSpace: "nowrap" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {creativeSpecs
                      .filter(s => creativePlatform === "All" || s.platform === creativePlatform)
                      .filter(s => !filterText || JSON.stringify(s).toLowerCase().includes(filterText))
                      .map((s, i) => (
                      <tr key={i} style={{ borderBottom: "1px solid #f0f0f5", background: i % 2 === 0 ? "#f9f9fb" : "transparent" }}>
                        <td style={{ padding: "7px 6px", fontWeight: 700, color: "#1a1a2e", whiteSpace: "nowrap" }}>{s.platform}</td>
                        <td style={{ padding: "7px 6px", color: "#333344", fontSize: 11 }}>{s.placement}</td>
                        <td style={{ padding: "7px 6px", color: "#5a5a6e", fontSize: 10 }}>{s.device}</td>
                        <td style={{ padding: "7px 6px" }}><Chip color={s.format.includes("Video") ? "purple" : s.format.includes("Image") ? "blue" : s.format.includes("Audio") ? "teal" : "amber"}>{s.format}</Chip></td>
                        <td style={{ padding: "7px 6px", color: "#2a8c3e", fontWeight: 700, fontFamily: "'SF Mono', monospace", fontSize: 11 }}>{s.ratio}</td>
                        <td style={{ padding: "7px 6px", color: "#b8860b", fontFamily: "'SF Mono', monospace", fontSize: 10, whiteSpace: "nowrap" }}>{s.dimensions}</td>
                        <td style={{ padding: "7px 6px", color: "#444455", fontSize: 10 }}>{s.duration}</td>
                        <td style={{ padding: "7px 6px", color: "#5a5a6e", fontSize: 10 }}>{s.fileType}</td>
                        <td style={{ padding: "7px 6px", color: "#5a5a6e", fontSize: 10, maxWidth: 200 }}>{s.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3 style={{ fontSize: 15, fontWeight: 700, color: "#2D1768", marginTop: 28, marginBottom: 12 }}>📐 Detailed Specs by Platform</h3>
              {[...new Set(creativeSpecs.filter(s => creativePlatform === "All" || s.platform === creativePlatform).map(s => s.platform))].map(platform => (
                <div key={platform} style={{ marginBottom: 24 }}>
                  <h4 style={{ fontSize: 14, fontWeight: 700, color: "#1a1a2e", marginBottom: 10, paddingBottom: 6, borderBottom: "1px solid #e0e0e8" }}>{platform}</h4>
                  {creativeSpecs.filter(s => s.platform === platform).filter(s => !filterText || JSON.stringify(s).toLowerCase().includes(filterText)).map((s, i) => (
                    <Accordion key={i} title={s.placement} subtitle={`${s.format} · ${s.device}`} badge={<Chip color={s.format.includes("Video") ? "purple" : s.format.includes("Image") ? "blue" : "amber"}>{s.ratio}</Chip>}>
                      <div style={{ fontSize: 13, color: "#555566", lineHeight: 1.7 }}>
                        <InfoRow label="Dimensions" value={<span style={{ color: "#b8860b", fontWeight: 600, fontFamily: "'SF Mono', monospace" }}>{s.dimensions}</span>} />
                        <InfoRow label="Aspect Ratio" value={<span style={{ color: "#2a8c3e", fontWeight: 600 }}>{s.ratio}</span>} />
                        {s.alt && <InfoRow label="Alternative" value={s.alt} />}
                        <InfoRow label="Format" value={s.format} />
                        <InfoRow label="File Type" value={s.fileType} />
                        <InfoRow label="File Size" value={s.fileSize} />
                        <InfoRow label="Duration" value={s.duration} />
                        <InfoRow label="Device" value={s.device} />
                        <div style={{ marginTop: 10, padding: 10, background: "#ffffff", borderRadius: 8, fontSize: 12 }}>
                          <strong style={{ color: "#b8860b" }}>📝 Notes:</strong> {s.notes}
                        </div>
                      </div>
                    </Accordion>
                  ))}
                </div>
              ))}

              <h3 style={{ fontSize: 15, fontWeight: 700, color: "#cc3333", marginTop: 28, marginBottom: 12 }}>⚠️ Creative Checklist Reminders</h3>
              <Card style={{ background: "#fdf5f0", border: "1px solid #e8dcd0" }}>
                <div style={{ fontSize: 12, color: "#444455", lineHeight: 1.8 }}>
                  • <strong style={{ color: "#1a1a2e" }}>9:16 vertical is the 2026 default</strong> - Meta confirmed 90% of inventory will be vertical. Produce 9:16 first, adapt from there.<br/>
                  • <strong style={{ color: "#1a1a2e" }}>Safe zones</strong> - Stories/Reels: keep text 250px from top, 340px from bottom (UI overlays cover these areas).<br/>
                  • <strong style={{ color: "#1a1a2e" }}>Hook in first 2 seconds</strong> - TikTok, Reels, and Snap users decide instantly whether to watch or swipe.<br/>
                  • <strong style={{ color: "#1a1a2e" }}>Captions always</strong> - 80%+ of feed video is watched muted. Captions boost watch time by 12%.<br/>
                  • <strong style={{ color: "#1a1a2e" }}>Local language versions</strong> - Mandatory per market. Use DCO for multi-language versioning on programmatic.<br/>
                  • <strong style={{ color: "#1a1a2e" }}>Minimum 3 creative variants</strong> - Algorithms need variety. Andromeda (Meta) uses creative as targeting signal.<br/>
                  • <strong style={{ color: "#1a1a2e" }}>Platform-native &gt; polished</strong> - UGC-style creative outperforms TV-style on TikTok and Reels.<br/>
                  • <strong style={{ color: "#1a1a2e" }}>Programmatic display: 5 core sizes</strong> - 300×250, 728×90, 160×600, 320×50, 300×600 covers 90%+ of inventory.<br/>
                  • <strong style={{ color: "#1a1a2e" }}>CTV is always 16:9</strong> - No vertical on TV screens. 15s and 30s are standard durations.<br/>
                  • <strong style={{ color: "#1a1a2e" }}>Test before launch</strong> - Preview in-platform before going live. What looks good in Canva may crop badly in-feed.
                </div>
              </Card>
            </div>
          )}

          {/* BUDGET CALCULATOR */}
          {activeSection === "budgetcalc" && (
            <div>
              <SectionTitle>Budget Calculator & Reach Estimator</SectionTitle>
              <SectionDesc>Input your total budget and objective - get an auto-generated platform split with estimated reach and impressions.</SectionDesc>

              <Card style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 16 }}>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#5a5a6e", marginBottom: 6 }}>Monthly Budget (USD)</div>
                    <input type="range" min={5000} max={500000} step={5000} value={budgetTotal} onChange={e => setBudgetTotal(Number(e.target.value))} style={{ width: "100%", accentColor: "#2D1768" }} />
                    <div style={{ fontSize: 24, fontWeight: 800, color: "#2D1768", marginTop: 4 }}>${budgetTotal.toLocaleString()}<span style={{ fontSize: 12, color: "#5a5a6e" }}>/month</span></div>
                  </div>
                  <div style={{ minWidth: 150 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#5a5a6e", marginBottom: 6 }}>Objective</div>
                    {["Brand Awareness", "Video Views", "Traffic", "Lead Gen", "E-commerce", "App Installs", "B2B", "Full Funnel"].map(o => (
                      <button key={o} onClick={() => setBudgetObjective(o)} style={{ display: "block", width: "100%", padding: "4px 8px", margin: "2px 0", border: budgetObjective === o ? "1px solid #7AC143" : "1px solid transparent", borderRadius: 6, background: budgetObjective === o ? "#2D176830" : "transparent", color: budgetObjective === o ? "#7AC143" : "#6a6a7e", fontSize: 10, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}>{o}</button>
                    ))}
                  </div>
                  <div style={{ minWidth: 100 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#5a5a6e", marginBottom: 6 }}>Market</div>
                    {["US/Canada", "UK/Europe", "UAE/MENA", "KSA", "India", "China", "SEA", "Multi-Market"].map(m => (
                      <button key={m} onClick={() => setBudgetMarket(m)} style={{ display: "block", width: "100%", padding: "4px 8px", margin: "2px 0", border: budgetMarket === m ? "1px solid #7AC143" : "1px solid transparent", borderRadius: 6, background: budgetMarket === m ? "#2D176830" : "transparent", color: budgetMarket === m ? "#7AC143" : "#6a6a7e", fontSize: 10, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}>{m}</button>
                    ))}
                  </div>
                </div>
              </Card>

              {(() => {
                const mixes = { "Brand Awareness": { Meta: 30, TikTok: 20, Snapchat: 15, YouTube: 20, "X (Twitter)": 5, Programmatic: 10 }, "Video Views": { Meta: 25, TikTok: 30, Snapchat: 15, YouTube: 25, "X (Twitter)": 5 }, "Traffic": { Meta: 40, TikTok: 15, Snapchat: 15, Google: 15, LinkedIn: 5, "X (Twitter)": 5, Programmatic: 5 }, "Lead Gen": { Meta: 40, TikTok: 15, Snapchat: 15, Google: 10, LinkedIn: 15, "X (Twitter)": 5 }, "E-commerce": { Meta: 45, TikTok: 15, Snapchat: 10, Google: 20, Programmatic: 10 }, "App Installs": { Meta: 40, TikTok: 20, Snapchat: 15, Google: 20, Programmatic: 5 }, "B2B": { Meta: 20, Google: 15, LinkedIn: 50, "X (Twitter)": 10, Programmatic: 5 }, "Full Funnel": { Meta: 30, TikTok: 15, Snapchat: 12, YouTube: 10, Google: 15, LinkedIn: 8, "X (Twitter)": 5, Programmatic: 5 } };
                const cpms = { Meta: { UAE: 7, KSA: 9, Kuwait: 8, "Multi-Market": 8 }, TikTok: { UAE: 10, KSA: 12, Kuwait: 11, "Multi-Market": 11 }, Snapchat: { UAE: 6, KSA: 5, Kuwait: 5, "Multi-Market": 5.5 }, YouTube: { UAE: 10, KSA: 9, Kuwait: 10, "Multi-Market": 9.5 }, Google: { UAE: 8, KSA: 7, Kuwait: 8, "Multi-Market": 7.5 }, LinkedIn: { UAE: 35, KSA: 30, Kuwait: 32, "Multi-Market": 32 }, "X (Twitter)": { UAE: 12, KSA: 11, Kuwait: 12, "Multi-Market": 11.5 }, Programmatic: { UAE: 8, KSA: 6, Kuwait: 7, "Multi-Market": 7 } };
                const mix = mixes[budgetObjective] || mixes["Full Funnel"];
                const tier = budgetTotal < 15000 ? "Starter" : budgetTotal < 50000 ? "Growth" : budgetTotal < 150000 ? "Mid-Market" : budgetTotal < 400000 ? "Premium" : "Enterprise";

                return (<>
                  <Card style={{ background: "#f0edf5", border: "1px solid #d0d0e0", marginBottom: 16 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#2D1768", marginBottom: 4 }}>Tier: <span style={{ color: "#1a1a2e" }}>{tier}</span> · Market: <span style={{ color: "#1a1a2e" }}>{budgetMarket}</span> · Objective: <span style={{ color: "#1a1a2e" }}>{budgetObjective}</span></div>
                  </Card>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10 }}>
                    {Object.entries(mix).map(([platform, pct]) => {
                      const spend = Math.round(budgetTotal * pct / 100);
                      const cpm = cpms[platform]?.[budgetMarket] || 10;
                      const impressions = Math.round((spend / cpm) * 1000);
                      const reach = Math.round(impressions * 0.6);
                      return (
                        <Card key={platform} style={{ padding: 14 }}>
                          <div style={{ fontSize: 12, fontWeight: 700, color: "#1a1a2e", marginBottom: 6 }}>{platform}</div>
                          <div style={{ fontSize: 20, fontWeight: 800, color: "#2a8c3e" }}>${spend.toLocaleString()}</div>
                          <div style={{ fontSize: 10, color: "#5a5a6e" }}>{pct}% of budget</div>
                          <div style={{ marginTop: 8, fontSize: 10, color: "#444455" }}>
                            Est. CPM: ${cpm}<br/>
                            Impressions: {(impressions/1000).toFixed(0)}K<br/>
                            Est. Reach: {(reach/1000).toFixed(0)}K
                          </div>
                          <ProgressBar value={pct} max={50} color="#3b82f6" />
                        </Card>
                      );
                    })}
                  </div>

                  <Card style={{ marginTop: 16 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#1a1a2e", marginBottom: 8 }}>Total Estimated Reach</div>
                    <div style={{ fontSize: 10, color: "#444455" }}>
                      Total Impressions: <strong style={{ color: "#2a8c3e" }}>{(Object.entries(mix).reduce((a, [p, pct]) => a + ((budgetTotal * pct / 100) / (cpms[p]?.[budgetMarket] || 10)) * 1000, 0) / 1000000).toFixed(1)}M</strong> · 
                      Note: Estimates based on directional regional CPM benchmarks. Actual results will vary by creative quality, audience, season, and competition.
                    </div>
                  </Card>
                </>);
              })()}
            </div>
          )}

          {/* CREATIVE REQUIREMENTS GENERATOR */}
          {activeSection === "creativegen" && (
            <div>
              <SectionTitle>Creative Requirements Generator</SectionTitle>
              <SectionDesc>Select platforms in your media plan - get a complete creative specs checklist for your creative team.</SectionDesc>

              <Card style={{ padding: 12, marginBottom: 16 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: "#5a5a6e", marginBottom: 6 }}>Select platforms in your plan:</div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {["Meta", "TikTok", "Snapchat", "YouTube", "LinkedIn", "X (Twitter)", "Pinterest", "Programmatic"].map(p => (
                    <button key={p} onClick={() => setSelectedPlatforms(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p])} style={{ padding: "6px 14px", borderRadius: 20, border: selectedPlatforms.includes(p) ? "1px solid #3b82f6" : "1px solid #e0e0e8", background: selectedPlatforms.includes(p) ? "#e8e0f0" : "transparent", color: selectedPlatforms.includes(p) ? "#7eb8ff" : "#6a6a7e", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>{p}</button>
                  ))}
                </div>
              </Card>

              {(() => {
                const reqs = {
                  "Meta": [{ format: "Feed Image", size: "1080×1350 (4:5)", type: "Image", notes: "JPG/PNG, <30MB. Arabic + English versions." }, { format: "Feed Video", size: "1080×1350 (4:5)", type: "Video", notes: "15–60s, MP4, <4GB. Captions mandatory. Hook in 3s." }, { format: "Stories/Reels", size: "1080×1920 (9:16)", type: "Video", notes: "15–30s, vertical only. Safe zones: 250px top, 340px bottom." }, { format: "Carousel Cards", size: "1080×1080 (1:1)", type: "Image/Video", notes: "2–10 cards. First card is the hook." }],
                  "TikTok": [{ format: "In-Feed Video", size: "1080×1920 (9:16)", type: "Video", notes: "15–60s, native/UGC style. Hook in 2s. Trending audio." }, { format: "Spark Ads", size: "Creator's format", type: "Video", notes: "Requires creator authorisation. UGC outperforms brand content by 70%." }],
                  "Snapchat": [{ format: "Single Video/Image", size: "1080×1920 (9:16)", type: "Video/Image", notes: "3–180s video, <1GB. 6s Commercial for non-skip." }, { format: "AR Lens", size: "Lens Studio specs", type: "AR", notes: "Requires Lens Studio. Budget $15K–$50K for reservation." }],
                  "YouTube": [{ format: "Horizontal Video", size: "1920×1080 (16:9)", type: "Video", notes: "TrueView (skip after 5s): 30s–3min. Bumper: 6s. Non-skip: 15–20s." }, { format: "Shorts", size: "1080×1920 (9:16)", type: "Video", notes: "Up to 60s vertical. Part of Demand Gen campaigns." }],
                  "LinkedIn": [{ format: "Sponsored Image", size: "1080×1080 (1:1) or 1200×627 (1.91:1)", type: "Image", notes: "Professional tone. Square outperforms landscape on mobile." }, { format: "Sponsored Video", size: "Min 360px wide", type: "Video", notes: "15–60s. Captions essential (auto-plays muted)." }, { format: "Document Ad", size: "PDF/PPT", type: "Document", notes: "<100MB. Swipeable pages. Strong for thought leadership." }],
                  "X (Twitter)": [{ format: "Promoted Image", size: "1200×675 (1.91:1) or 1080×1080 (1:1)", type: "Image", notes: "JPG/PNG/GIF, <5MB. Max 4 images per tweet." }, { format: "Promoted Video", size: "1920×1080 (16:9) or 1080×1080 (1:1)", type: "Video", notes: "Up to 2:20. 6–15s recommended." }],
                  "Pinterest": [{ format: "Standard Pin", size: "1000×1500 (2:3)", type: "Image", notes: "Vertical format dominant. <20MB." }, { format: "Video Pin", size: "1080×1920 (9:16) or 1080×1080 (1:1)", type: "Video", notes: "4s–15min. Max-Width for full-screen impact." }],
                  "Programmatic": [{ format: "Display Banners (5 sizes)", size: "300×250, 728×90, 160×600, 320×50, 300×600", type: "Image/HTML5", notes: "<150KB each. Arabic + English. All 5 sizes required." }, { format: "OLV Pre-Roll", size: "1920×1080 (16:9)", type: "Video", notes: "15s or 30s. VAST tag. For PMP deals." }, { format: "CTV", size: "1920×1080 (16:9)", type: "Video", notes: "15s or 30s. HD minimum. Non-skippable." }],
                };
                return selectedPlatforms.map(p => reqs[p] && (
                  <Card key={p} style={{ marginBottom: 12 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#1a1a2e", marginBottom: 10 }}>{p}</div>
                    {reqs[p].map((r, i) => (
                      <div key={i} style={{ display: "flex", gap: 12, padding: "8px 0", borderBottom: i < reqs[p].length - 1 ? "1px solid #e0e0e8" : "none", fontSize: 12 }}>
                        <div style={{ minWidth: 120, fontWeight: 600, color: "#333344" }}>{r.format}</div>
                        <div style={{ minWidth: 160, color: "#2a8c3e", fontFamily: "'SF Mono', monospace", fontSize: 11 }}>{r.size}</div>
                        <Chip color={r.type.includes("Video") ? "purple" : r.type.includes("Image") ? "blue" : "amber"}>{r.type}</Chip>
                        <div style={{ color: "#5a5a6e", flex: 1 }}>{r.notes}</div>
                      </div>
                    ))}
                  </Card>
                ));
              })()}
            </div>
          )}

          {/* PLATFORM COMPARISON */}
          {activeSection === "comparison" && (
            <div>
              <SectionTitle>Platform Comparison Tool</SectionTitle>
              <SectionDesc>Select 2–4 platforms to compare side-by-side.</SectionDesc>

              <Card style={{ padding: 12, marginBottom: 16 }}>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {platforms.map(p => (
                    <button key={p.name} onClick={() => setComparePlatforms(prev => prev.includes(p.name) ? prev.filter(x => x !== p.name) : prev.length < 4 ? [...prev, p.name] : prev)} style={{ padding: "6px 12px", borderRadius: 20, border: comparePlatforms.includes(p.name) ? "1px solid #3b82f6" : "1px solid #e0e0e8", background: comparePlatforms.includes(p.name) ? "#e8e0f0" : "transparent", color: comparePlatforms.includes(p.name) ? "#7eb8ff" : "#6a6a7e", fontSize: 10, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>{p.name.split("(")[0].trim()}</button>
                  ))}
                </div>
              </Card>

              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid #d0d0e0" }}>
                      <th style={{ padding: 8, textAlign: "left", color: "#555566", fontSize: 9, fontWeight: 700 }}>CRITERIA</th>
                      {comparePlatforms.map(name => <th key={name} style={{ padding: 8, textAlign: "left", color: "#2D1768", fontSize: 10, fontWeight: 700 }}>{name.split("(")[0].trim()}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {["minBudget", "audienceFit", "capabilities"].map(field => (
                      <tr key={field} style={{ borderBottom: "1px solid #f0f0f5" }}>
                        <td style={{ padding: 8, color: "#b8860b", fontWeight: 600, fontSize: 10, textTransform: "uppercase" }}>{field === "minBudget" ? "Min Budget" : field === "audienceFit" ? "Audience" : "Capabilities"}</td>
                        {comparePlatforms.map(name => {
                          const p = platforms.find(pl => pl.name === name);
                          return <td key={name} style={{ padding: 8, color: "#444455", fontSize: 11, maxWidth: 200 }}>{p ? (field === "minBudget" ? <span style={{ color: "#2a8c3e", fontWeight: 700 }}>{p[field]}</span> : p[field]) : "N/A"}</td>;
                        })}
                      </tr>
                    ))}
                    <tr style={{ borderBottom: "1px solid #f0f0f5" }}>
                      <td style={{ padding: 8, color: "#b8860b", fontWeight: 600, fontSize: 10 }}>TOP KPIS</td>
                      {comparePlatforms.map(name => {
                        const p = platforms.find(pl => pl.name === name);
                        return <td key={name} style={{ padding: 8, color: "#444455", fontSize: 10, fontFamily: "'SF Mono', monospace" }}>{p?.kpis?.slice(0,3).map((k,i) => <div key={i}>{k}</div>)}</td>;
                      })}
                    </tr>
                    <tr>
                      <td style={{ padding: 8, color: "#b8860b", fontWeight: 600, fontSize: 10 }}>REGIONAL NOTES</td>
                      {comparePlatforms.map(name => {
                        const p = platforms.find(pl => pl.name === name);
                        return <td key={name} style={{ padding: 8, color: "#5a5a6e", fontSize: 10 }}>{p?.gcc || "N/A"}</td>;
                      })}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* CPM HEATMAP */}
          {activeSection === "heatmap" && (
            <div>
              <SectionTitle>Seasonal CPM Heatmap (Global)</SectionTitle>
              <SectionDesc>Expected CPM pressure by month across platforms and regions. Green = low/efficient, Yellow = moderate, Red = high/expensive. Note: MENA peaks during Ramadan (Feb-Mar), WEST peaks during Q4 holidays, EAST peaks during Golden Week/Singles Day.</SectionDesc>

              {(() => {
                const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
                const heatData = {
                  Meta:     [2,3,3,1,1,1,1,1,2,2,3,2],
                  TikTok:   [2,3,3,1,1,1,1,1,2,2,3,2],
                  Snapchat: [2,3,3,1,1,1,1,1,2,2,3,2],
                  YouTube:  [2,3,3,1,1,1,1,1,2,2,3,2],
                  LinkedIn: [1,2,2,1,1,1,1,1,2,2,2,2],
                  Programmatic: [1,2,3,1,1,1,1,1,1,2,3,2],
                };
                const colors = { 1: "#1a3a2a", 2: "#3a3a1a", 3: "#3a1a1a" };
                const labels = { 1: "Low", 2: "Med", 3: "High" };
                const textColors = { 1: "#7effb8", 2: "#ffcb7e", 3: "#ff7e7e" };
                const events = { 0: "Ramadan prep", 1: "Ramadan", 2: "Eid / Ramadan", 3: "Post-Eid", 4: "Low season", 5: "Summer", 6: "Eid Al-Adha", 7: "Back to school", 8: "Saudi Nat Day", 9: "Q4 build", 10: "White Friday", 11: "UAE Nat Day" };

                return (
                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                      <thead>
                        <tr>
                          <th style={{ padding: 8, fontSize: 9, color: "#5a5a6e", textAlign: "left" }}>Platform</th>
                          {months.map(m => <th key={m} style={{ padding: "8px 4px", fontSize: 9, color: "#5a5a6e", textAlign: "center", minWidth: 45 }}>{m}</th>)}
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(heatData).map(([platform, data]) => (
                          <tr key={platform}>
                            <td style={{ padding: "10px 12px", fontSize: 13, fontWeight: 700, color: "#1a1a2e" }}>{platform}</td>
                            {data.map((level, mi) => (
                              <td key={mi} style={{ padding: 4, textAlign: "center" }}>
                                <div style={{ background: colors[level], borderRadius: 6, padding: "8px 4px", fontSize: 10, color: textColors[level], fontWeight: 700 }}>{labels[level]}</div>
                              </td>
                            ))}
                          </tr>
                        ))}
                        <tr>
                          <td style={{ padding: 8, fontSize: 9, color: "#5a5a6e", fontWeight: 600 }}>Key Event</td>
                          {months.map((m, i) => (
                            <td key={i} style={{ padding: 4, textAlign: "center", fontSize: 7, color: "#7a7a8a" }}>{events[i]}</td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                );
              })()}

              <Card style={{ marginTop: 16, background: "#fdf5f0", border: "1px solid #e8dcd0" }}>
                <div style={{ fontSize: 12, color: "#444455", lineHeight: 1.7 }}>
                  <strong style={{ color: "#cc3333" }}>🔴 High CPM months:</strong> Feb–Mar (Ramadan), Nov (White Friday). Budget 2–3x more or accept lower reach.<br/>
                  <strong style={{ color: "#b8860b" }}>🟡 Medium:</strong> Jan (pre-Ramadan), Sep (Saudi National Day), Oct–Dec (Q4). Plan early, book reservations.<br/>
                  <strong style={{ color: "#2a8c3e" }}>🟢 Low CPM months:</strong> Apr–Aug. Best time for reach-building, testing, and efficiency campaigns.
                </div>
              </Card>
            </div>
          )}

          {/* BENCHMARK TRACKER */}
          {activeSection === "benchmark" && (
            <div>
              <SectionTitle>Benchmark Tracker</SectionTitle>
              <SectionDesc>Input your actual campaign results and compare against the playbook benchmarks. Add rows for each platform.</SectionDesc>

              <button onClick={() => setBenchmarkData(prev => [...prev, { platform: "Meta", kpi: "CPM", benchmark: "3–11", actual: "", id: Date.now() }])} style={{ padding: "8px 16px", borderRadius: 8, border: "1px solid #3b82f6", background: "#e8e0f0", color: "#2D1768", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", marginBottom: 16 }}>+ Add Row</button>

              {benchmarkData.length > 0 && (
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                    <thead>
                      <tr style={{ borderBottom: "2px solid #d0d0e0" }}>
                        {["Platform", "KPI", "Benchmark Range", "Your Actual", "Status", ""].map(h => (
                          <th key={h} style={{ padding: 8, textAlign: "left", color: "#555566", fontSize: 9, fontWeight: 700 }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {benchmarkData.map((row, i) => {
                        const benchNums = row.benchmark.match(/[\d.]+/g)?.map(Number) || [0, 0];
                        const actual = parseFloat(row.actual);
                        const status = !actual ? "-" : row.kpi === "ROAS" ? (actual >= benchNums[0] ? "✅ On track" : "⚠️ Below") : (actual <= benchNums[1] ? "✅ On track" : actual <= benchNums[1] * 1.3 ? "⚠️ Watch" : "🔴 Over");
                        return (
                          <tr key={row.id} style={{ borderBottom: "1px solid #f0f0f5" }}>
                            <td style={{ padding: 6 }}>
                              <select value={row.platform} onChange={e => setBenchmarkData(prev => prev.map((r,ri) => ri === i ? {...r, platform: e.target.value} : r))} style={{ background: "#f5f5f7", border: "1px solid #e0e0e8", borderRadius: 4, color: "#1a1a2e", padding: "4px 6px", fontSize: 11, fontFamily: "inherit" }}>
                                {["Meta","TikTok","Snapchat","YouTube","LinkedIn","X (Twitter)","Programmatic"].map(p => <option key={p}>{p}</option>)}
                              </select>
                            </td>
                            <td style={{ padding: 6 }}>
                              <select value={row.kpi} onChange={e => { const benchmarks = { CPM: "3–11", CPC: "0.30–1.10", CPL: "5–30", ROAS: "2–5", CPV: "0.01–0.05", CTR: "0.8–2.5" }; setBenchmarkData(prev => prev.map((r,ri) => ri === i ? {...r, kpi: e.target.value, benchmark: benchmarks[e.target.value] || "-"} : r)); }} style={{ background: "#f5f5f7", border: "1px solid #e0e0e8", borderRadius: 4, color: "#1a1a2e", padding: "4px 6px", fontSize: 11, fontFamily: "inherit" }}>
                                {["CPM","CPC","CPL","ROAS","CPV","CTR"].map(k => <option key={k}>{k}</option>)}
                              </select>
                            </td>
                            <td style={{ padding: 6, color: "#2a8c3e", fontFamily: "'SF Mono', monospace" }}>${row.benchmark}</td>
                            <td style={{ padding: 6 }}>
                              <input value={row.actual} onChange={e => setBenchmarkData(prev => prev.map((r,ri) => ri === i ? {...r, actual: e.target.value} : r))} placeholder="e.g. 8.50" style={{ width: 80, background: "#f5f5f7", border: "1px solid #e0e0e8", borderRadius: 4, color: "#1a1a2e", padding: "4px 6px", fontSize: 11, fontFamily: "inherit" }} />
                            </td>
                            <td style={{ padding: 6, fontSize: 11 }}>{status}</td>
                            <td style={{ padding: 6 }}>
                              <button onClick={() => setBenchmarkData(prev => prev.filter((_,ri) => ri !== i))} style={{ background: "transparent", border: "none", color: "#cc3333", cursor: "pointer", fontSize: 12 }}>✕</button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}

              {benchmarkData.length === 0 && <Card><div style={{ fontSize: 12, color: "#5a5a6e", textAlign: "center", padding: 20 }}>Click "+ Add Row" to start comparing your campaign metrics against benchmarks.</div></Card>}
            </div>
          )}


          {/* AI PLAN GENERATOR */}
          {activeSection === "aiplanner" && (
            <div>
              <SectionTitle>AI Plan Generator</SectionTitle>

              {/* AUDIENCE SIZING MODULE */}
              <div style={{ marginBottom: 24, padding: 20, background: "#f0ecf5", borderRadius: 12, border: "1px solid #d0c0e0" }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: "#2D1768", marginBottom: 4 }}>👥 Audience & Persona Builder</div>
                <div style={{ fontSize: 12, color: "#555566", marginBottom: 14 }}>Define your target personas and estimate audience sizes per market before generating the plan.</div>

                {audienceData.map((row, idx) => (
                  <div key={idx} style={{ background: "#ffffff", borderRadius: 10, padding: 14, marginBottom: 10, border: "1px solid #e0e0e8" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: "#2D1768" }}>Persona {idx + 1}: {row.persona || "Unnamed"}</div>
                      {audienceData.length > 1 && <button onClick={() => setAudienceData(prev => prev.filter((_,i) => i !== idx))} style={{ background: "transparent", border: "none", color: "#cc3333", cursor: "pointer", fontSize: 12 }}>Remove</button>}
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8, marginBottom: 8 }}>
                      {[
                        { key: "persona", label: "Persona Name", placeholder: "e.g. HNWI Investors" },
                        { key: "market", label: "Market", placeholder: "e.g. UAE, UK, China" },
                        { key: "platform", label: "Primary Platform", placeholder: "e.g. Meta, LinkedIn" },
                        { key: "ageRange", label: "Age Range", placeholder: "e.g. 30-55" },
                      ].map(f => (
                        <div key={f.key}>
                          <div style={{ fontSize: 9, fontWeight: 700, color: "#6a6a7e", marginBottom: 2 }}>{f.label}</div>
                          <input value={row[f.key]} onChange={e => setAudienceData(prev => prev.map((r,i) => i === idx ? {...r, [f.key]: e.target.value} : r))} placeholder={f.placeholder} style={{ width: "100%", padding: "6px 8px", background: "#fff", border: "1px solid #d0d0d8", borderRadius: 6, color: "#1a1a2e", fontSize: 11, fontFamily: "inherit", boxSizing: "border-box" }} />
                        </div>
                      ))}
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8 }}>
                      {[
                        { key: "gender", label: "Gender", placeholder: "All / Male / Female" },
                        { key: "interests", label: "Interests / Targeting", placeholder: "e.g. Luxury, Real Estate, Finance" },
                        { key: "estimatedSize", label: "Est. Audience Size", placeholder: "e.g. 450,000" },
                        { key: "notes", label: "Notes", placeholder: "e.g. CRM lookalikes, retargeting pool" },
                      ].map(f => (
                        <div key={f.key}>
                          <div style={{ fontSize: 9, fontWeight: 700, color: "#6a6a7e", marginBottom: 2 }}>{f.label}</div>
                          <input value={row[f.key]} onChange={e => setAudienceData(prev => prev.map((r,i) => i === idx ? {...r, [f.key]: e.target.value} : r))} placeholder={f.placeholder} style={{ width: "100%", padding: "6px 8px", background: "#fff", border: "1px solid #d0d0d8", borderRadius: 6, color: "#1a1a2e", fontSize: 11, fontFamily: "inherit", boxSizing: "border-box" }} />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                <button onClick={() => setAudienceData(prev => [...prev, { persona: "", description: "", market: "", platform: "Meta", ageRange: "25-44", gender: "All", interests: "", estimatedSize: "", notes: "" }])} style={{ padding: "8px 16px", borderRadius: 8, border: "1px solid #2D1768", background: "#2D176810", color: "#2D1768", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>+ Add Persona</button>

                {audienceData.some(a => a.persona && a.estimatedSize) && (
                  <div style={{ marginTop: 14, padding: 12, background: "#f0faf5", borderRadius: 8, border: "1px solid #c0e0d0" }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#2a8c3e", marginBottom: 6 }}>Audience Summary</div>
                    <div style={{ display: "flex", gap: 16, flexWrap: "wrap", fontSize: 12, color: "#444455" }}>
                      <div><strong>Total Personas:</strong> {audienceData.filter(a => a.persona).length}</div>
                      <div><strong>Total Est. Reach:</strong> {audienceData.reduce((sum, a) => sum + (parseInt(a.estimatedSize?.replace(/,/g, "")) || 0), 0).toLocaleString()}</div>
                      <div><strong>Markets:</strong> {[...new Set(audienceData.filter(a => a.market).map(a => a.market))].join(", ") || "None"}</div>
                      <div><strong>Platforms:</strong> {[...new Set(audienceData.filter(a => a.platform).map(a => a.platform))].join(", ") || "None"}</div>
                    </div>
                  </div>
                )}
              </div>
              <SectionDesc>Describe your campaign brief - get an AI-generated media plan you can download as a formatted Excel file.</SectionDesc>

              <Card style={{ marginBottom: 12, padding: 12, background: "#f9f9fb", border: "1px solid #e0e0e8" }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: "#5a5a6e", marginBottom: 4 }}>🔑 Anthropic API Key <span style={{ color: "#7a7a8a", fontWeight: 400 }}>(get one at console.anthropic.com)</span></div>
                <input type="password" id="apiKeyInput" placeholder="sk-ant-..." style={{ width: "100%", padding: "8px 10px", background: "#f5f5f7", border: "1px solid #e0e0e8", borderRadius: 6, color: "#1a1a2e", fontSize: 12, fontFamily: "'SF Mono', monospace", boxSizing: "border-box" }} />
                <div style={{ fontSize: 9, color: "#9a9aaa", marginTop: 4 }}>Never stored - session only.</div>
              </Card>

              <Card style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#5a5a6e", marginBottom: 6 }}>Describe your campaign:</div>
                <textarea value={aiPrompt} onChange={e => setAiPrompt(e.target.value)} placeholder={"Example: Luxury real estate in Dubai, targeting Chinese and Russian UHNWI investors. Budget $80K/month, 3 months. Video creative in English and Mandarin. Goal: qualified leads via WhatsApp and phone calls. Markets: UAE, UK, China."} style={{ width: "100%", minHeight: 100, padding: "10px 12px", background: "#f5f5f7", border: "1px solid #e0e0e8", borderRadius: 8, color: "#1a1a2e", fontSize: 12, fontFamily: "inherit", resize: "vertical", boxSizing: "border-box", lineHeight: 1.6 }} />
                <button onClick={async () => {
                  const apiKey = document.getElementById("apiKeyInput")?.value;
                  if (!apiKey) { setAiResult("Please enter your Anthropic API key above."); return; }
                  if (!aiPrompt.trim()) return;
                  setAiLoading(true); setAiResult("");
                  try {
                    const res = await fetch("https://api.anthropic.com/v1/messages", {
                      method: "POST",
                      headers: { "Content-Type": "application/json", "x-api-key": apiKey, "anthropic-version": "2023-06-01", "anthropic-dangerous-direct-browser-access": "true" },
                      body: JSON.stringify({
                        model: "claude-sonnet-4-20250514", max_tokens: 3000,
                        messages: [{ role: "user", content: `You are a senior digital media planner. Based on this brief, generate a media plan as JSON ONLY. No markdown, no backticks, no explanation - ONLY valid JSON.\n\n${JSON.stringify({
                          format: {
                            campaign: { client: "string", brand: "string", campaign_name: "string", campaign_type: "string", objective: "string", target_audience: "string", market: "string", period: "string", total_budget_usd: "number" },
                            line_items: [{ market: "string", platform: "string (e.g. META, Google Ads, TikTok, LinkedIn, Snapchat)", placement: "string (e.g. Feed + Stories + Reels, Google: Search, Google: PMax)", objective: "string", media_type: "string (e.g. Social Display, Google Ads, Programmatic)", buying_method: "Auction or Reservation", dates: "string", duration_months: "number", ad_format: "string", language: "string", device: "string", audience_description: "string", targeting_description: "string", buying_unit: "string (CPM, CPC, CPL, CPA)", currency: "USD", unit_cost: "number", estimated_impressions: "number", estimated_clicks: "number", ctr_percent: "number", media_cost_usd: "number", agency_fee_pct: 0.03, agency_fee_usd: "number", total_cost_usd: "number" }],
                            notes: ["string - regional considerations, creative requirements, measurement setup, key risks"],
                            summary: { total_media_usd: "number", total_fees_usd: "number", total_investment_usd: "number" }
                          }
                        })}\n\nProvide 3-6 line items with realistic regional benchmark numbers. Use real CPM/CPC/CPL ranges.\n\nBrief: ${aiPrompt}\n\nTarget Personas:\n${audienceData.filter(a => a.persona).map((a,i) => `Persona ${i+1}: ${a.persona} - Market: ${a.market}, Platform: ${a.platform}, Age: ${a.ageRange}, Gender: ${a.gender}, Interests: ${a.interests}, Est. Size: ${a.estimatedSize}, Notes: ${a.notes}`).join("\n")}` }]
                      })
                    });
                    const data = await res.json();
                    if (data.error) { setAiResult("Error: " + (data.error.message || JSON.stringify(data.error))); return; }
                    const text = data.content?.[0]?.text || "";
                    try {
                      const clean = text.replace(/```json|```/g, "").trim();
                      const parsed = JSON.parse(clean);
                      setAiResult(JSON.stringify(parsed));
                    } catch { setAiResult(text); }
                  } catch (e) { setAiResult("Error: " + e.message); }
                  setAiLoading(false);
                }} disabled={aiLoading} style={{ marginTop: 10, padding: "10px 24px", borderRadius: 8, border: "none", background: aiLoading ? "#d0d0d8" : "#2D1768", color: "#fff", fontSize: 12, fontWeight: 700, cursor: aiLoading ? "wait" : "pointer", fontFamily: "inherit" }}>
                  {aiLoading ? "⏳ Generating plan..." : "🤖 Generate Media Plan"}
                </button>
              </Card>

              {aiResult && (() => {
                let plan = null;
                try { plan = JSON.parse(aiResult); } catch {}

                const downloadExcel = () => {
                  if (!plan) return;
                  const c = plan.campaign || {};
                  const items = plan.line_items || [];
                  const notes = plan.notes || [];
                  const s = plan.summary || {};

                  const html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel"><head><meta charset="UTF-8"><style>td,th{font-family:Arial;font-size:10pt;padding:4px 8px;border:1px solid #ddd}th{background:#e8e0f0;color:white;font-weight:bold}.header{background:#f9f9fb;color:#7eb8ff;font-weight:bold;border:none;font-size:11pt}.label{color:#666;font-weight:bold}.money{color:#2d8a4e;font-weight:bold}.section{background:#f0f4f8;font-weight:bold}</style></head><body>
                  <table><tr><td colspan="12" class="header" style="font-size:14pt;padding:12px">MEDIA PLAN</td></tr>
                  <tr><td class="label">Client</td><td colspan="3">${c.client||""}</td><td class="label">Plan Date</td><td colspan="2">${new Date().toLocaleDateString()}</td></tr>
                  <tr><td class="label">Brand</td><td colspan="3">${c.brand||""}</td><td class="label">Plan Status</td><td colspan="2">Draft</td></tr>
                  <tr><td class="label">Campaign Type</td><td colspan="3">${c.campaign_type||""}</td><td class="label">Currency</td><td colspan="2">USD</td></tr>
                  <tr><td class="label">Campaign Name</td><td colspan="3">${c.campaign_name||""}</td></tr>
                  <tr><td class="label">Objective</td><td colspan="3">${c.objective||""}</td></tr>
                  <tr><td class="label">Target Audience</td><td colspan="3">${c.target_audience||""}</td></tr>
                  <tr><td class="label">Market</td><td colspan="3">${c.market||""}</td></tr>
                  <tr><td class="label">Period</td><td colspan="3">${c.period||""}</td></tr>
                  <tr><td class="label">Total Budget</td><td colspan="3" class="money">$${(c.total_budget_usd||0).toLocaleString()}</td></tr>
                  <tr><td colspan="12"></td></tr>
                  <tr><th>Market</th><th>Platform</th><th>Placement</th><th>Objective</th><th>Media Type</th><th>Buying Method</th><th>Ad Format</th><th>Buying Unit</th><th>Unit Cost</th><th>Est. Impressions</th><th>Est. Clicks</th><th>CTR%</th><th>Media Cost</th><th>Agency Fee (3%)</th><th>Total Cost</th></tr>
                  ${items.map(r => `<tr><td>${r.market||""}</td><td>${r.platform||""}</td><td>${r.placement||""}</td><td>${r.objective||""}</td><td>${r.media_type||""}</td><td>${r.buying_method||""}</td><td>${r.ad_format||""}</td><td>${r.buying_unit||""}</td><td>$${(r.unit_cost||0).toFixed(2)}</td><td>${(r.estimated_impressions||0).toLocaleString()}</td><td>${(r.estimated_clicks||0).toLocaleString()}</td><td>${(r.ctr_percent||0).toFixed(2)}%</td><td class="money">$${(r.media_cost_usd||0).toLocaleString(undefined,{minimumFractionDigits:2})}</td><td>$${(r.agency_fee_usd||0).toLocaleString(undefined,{minimumFractionDigits:2})}</td><td class="money">$${(r.total_cost_usd||0).toLocaleString(undefined,{minimumFractionDigits:2})}</td></tr>`).join("")}
                  <tr><td colspan="12"></td></tr>
                  <tr class="section"><td colspan="12">TOTALS</td></tr>
                  <tr><td class="label" colspan="2">Total Media Cost</td><td colspan="3" class="money">$${(s.total_media_usd||0).toLocaleString(undefined,{minimumFractionDigits:2})}</td></tr>
                  <tr><td class="label" colspan="2">Total Agency Fees</td><td colspan="3">$${(s.total_fees_usd||0).toLocaleString(undefined,{minimumFractionDigits:2})}</td></tr>
                  <tr><td class="label" colspan="2">Total Investment</td><td colspan="3" class="money" style="font-size:12pt">$${(s.total_investment_usd||0).toLocaleString(undefined,{minimumFractionDigits:2})}</td></tr>
                  <tr><td colspan="12"></td></tr>
                  <tr class="section"><td colspan="12">NOTES & regional CONSIDERATIONS</td></tr>
                  ${notes.map(n => `<tr><td colspan="12" style="color:#555">• ${n}</td></tr>`).join("")}
                  </table></body></html>`;

                  const blob = new Blob([html], { type: "application/vnd.ms-excel" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a"); a.href = url;
                  a.download = `Media_Plan_${(c.client||"Campaign").replace(/\s+/g,"_")}_${new Date().toISOString().split("T")[0]}.xls`;
                  a.click(); URL.revokeObjectURL(url);
                };

                if (plan) {
                  const c = plan.campaign || {};
                  const items = plan.line_items || [];
                  const notes = plan.notes || [];
                  const s = plan.summary || {};
                  return (<>
                    <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                      <button onClick={downloadExcel} style={{ padding: "10px 20px", borderRadius: 8, border: "1px solid #7AC143", background: "#eef8ee", color: "#7AC143", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>📥 Download as Excel (.xls)</button>
                      <button onClick={() => { navigator.clipboard.writeText(aiResult); }} style={{ padding: "10px 20px", borderRadius: 8, border: "1px solid #d0d0d8", background: "transparent", color: "#5a5a6e", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>📋 Copy JSON</button>
                    </div>

                    <Card style={{ background: "#f0faf5", border: "1px solid #c0e0d0", marginBottom: 16 }}>
                      <div style={{ fontSize: 14, fontWeight: 800, color: "#2a8c3e", marginBottom: 12 }}>📋 Campaign Summary</div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4, fontSize: 12 }}>
                        {Object.entries(c).map(([k,v]) => <div key={k}><span style={{ color: "#5a5a6e" }}>{k.replace(/_/g," ")}: </span><strong style={{ color: "#1a1a2e" }}>{typeof v === "number" ? `$${v.toLocaleString()}` : v}</strong></div>)}
                      </div>
                    </Card>

                    <Card style={{ marginBottom: 16 }}>
                      <div style={{ fontSize: 14, fontWeight: 800, color: "#1a1a2e", marginBottom: 12 }}>📊 Line Items</div>
                      <div style={{ overflowX: "auto" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 10 }}>
                          <thead>
                            <tr style={{ borderBottom: "2px solid #d0d0e0" }}>
                              {["Platform","Placement","Media Type","Buying","Unit Cost","Impressions","Clicks","CTR","Media Cost","Total"].map(h => <th key={h} style={{ padding: "6px 4px", textAlign: "left", color: "#555566", fontSize: 9, fontWeight: 700 }}>{h}</th>)}
                            </tr>
                          </thead>
                          <tbody>
                            {items.map((r,i) => (
                              <tr key={i} style={{ borderBottom: "1px solid #f0f0f5" }}>
                                <td style={{ padding: "6px 4px", color: "#1a1a2e", fontWeight: 700 }}>{r.platform}</td>
                                <td style={{ padding: "6px 4px", color: "#444455" }}>{r.placement}</td>
                                <td style={{ padding: "6px 4px", color: "#444455" }}>{r.media_type}</td>
                                <td style={{ padding: "6px 4px" }}><Chip color="blue">{r.buying_unit}</Chip></td>
                                <td style={{ padding: "6px 4px", color: "#b8860b", fontFamily: "'SF Mono', monospace" }}>${r.unit_cost}</td>
                                <td style={{ padding: "6px 4px", color: "#444455", fontFamily: "'SF Mono', monospace" }}>{(r.estimated_impressions||0).toLocaleString()}</td>
                                <td style={{ padding: "6px 4px", color: "#444455", fontFamily: "'SF Mono', monospace" }}>{(r.estimated_clicks||0).toLocaleString()}</td>
                                <td style={{ padding: "6px 4px", color: "#444455" }}>{r.ctr_percent}%</td>
                                <td style={{ padding: "6px 4px", color: "#2a8c3e", fontWeight: 700, fontFamily: "'SF Mono', monospace" }}>${(r.media_cost_usd||0).toLocaleString()}</td>
                                <td style={{ padding: "6px 4px", color: "#2a8c3e", fontWeight: 700, fontFamily: "'SF Mono', monospace" }}>${(r.total_cost_usd||0).toLocaleString()}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </Card>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 16 }}>
                      <Card style={{ textAlign: "center", padding: 14 }}>
                        <div style={{ fontSize: 10, color: "#5a5a6e" }}>Total Media</div>
                        <div style={{ fontSize: 18, fontWeight: 800, color: "#2a8c3e" }}>${(s.total_media_usd||0).toLocaleString()}</div>
                      </Card>
                      <Card style={{ textAlign: "center", padding: 14 }}>
                        <div style={{ fontSize: 10, color: "#5a5a6e" }}>Agency Fees</div>
                        <div style={{ fontSize: 18, fontWeight: 800, color: "#b8860b" }}>${(s.total_fees_usd||0).toLocaleString()}</div>
                      </Card>
                      <Card style={{ textAlign: "center", padding: 14 }}>
                        <div style={{ fontSize: 10, color: "#5a5a6e" }}>Total Investment</div>
                        <div style={{ fontSize: 18, fontWeight: 800, color: "#1a1a2e" }}>${(s.total_investment_usd||0).toLocaleString()}</div>
                      </Card>
                    </div>

                    {notes.length > 0 && (
                      <Card>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "#b8860b", marginBottom: 8 }}>📝 Notes & regional Considerations</div>
                        {notes.map((n,i) => <div key={i} style={{ fontSize: 12, color: "#444455", marginBottom: 4, lineHeight: 1.6 }}>• {n}</div>)}
                      </Card>
                    )}
                  </>);
                }

                return (
                  <Card style={{ background: "#f0faf5", border: "1px solid #c0e0d0" }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#2a8c3e", marginBottom: 10 }}>🤖 AI Response</div>
                    <div style={{ fontSize: 12, color: "#333344", lineHeight: 1.8, whiteSpace: "pre-wrap" }}>{aiResult}</div>
                  </Card>
                );
              })()}

              {!aiResult && !aiLoading && (
                <Card>
                  <div style={{ fontSize: 12, color: "#5a5a6e", textAlign: "center", padding: 20 }}>
                    Enter your API key, describe your campaign, and click "Generate Media Plan".<br/>
                    The AI will generate a structured plan with line items you can <strong style={{ color: "#2a8c3e" }}>download as Excel</strong>.<br/><br/>
                    <span style={{ fontSize: 10 }}>Get an API key at <strong style={{ color: "#2D1768" }}>console.anthropic.com</strong></span>
                  </div>
                </Card>
              )}
            </div>
          )}

          {/* PLAN GENERATOR */}
          {activeSection === "aiplanner" && (
            <div>
              <SectionTitle>Media Plan Generator</SectionTitle>
              <SectionDesc>Configure your campaign parameters - get an instant media plan with platform split, budget allocation, KPIs, creative requirements, and regional recommendations.</SectionDesc>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                <Card style={{ padding: 14 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "#5a5a6e", marginBottom: 6 }}>Objective</div>
                  {["Brand Awareness", "Video Views", "Traffic", "Lead Generation", "Conversions / E-commerce", "App Installs", "B2B / Thought Leadership"].map(o => (
                    <button key={o} onClick={() => setPlanInputs(p => ({...p, objective: o}))} style={{ display: "block", width: "100%", padding: "5px 8px", margin: "2px 0", border: planInputs.objective === o ? "1px solid #3b82f6" : "1px solid transparent", borderRadius: 6, background: planInputs.objective === o ? "#e8e0f0" : "transparent", color: planInputs.objective === o ? "#7eb8ff" : "#6a6a7e", fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}>{o}</button>
                  ))}
                </Card>
                <div>
                  <Card style={{ padding: 14, marginBottom: 12 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: "#5a5a6e", marginBottom: 6 }}>Monthly Budget (USD)</div>
                    <input type="range" min={5000} max={500000} step={5000} value={planInputs.budget} onChange={e => setPlanInputs(p => ({...p, budget: Number(e.target.value)}))} style={{ width: "100%", accentColor: "#2D1768" }} />
                    <div style={{ fontSize: 20, fontWeight: 800, color: "#2D1768" }}>${planInputs.budget.toLocaleString()}<span style={{ fontSize: 11, color: "#5a5a6e" }}>/mo × {planInputs.duration} months = ${(planInputs.budget * planInputs.duration).toLocaleString()}</span></div>
                  </Card>
                  <Card style={{ padding: 14, marginBottom: 12 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: "#5a5a6e", marginBottom: 6 }}>Duration (months)</div>
                    <div style={{ display: "flex", gap: 6 }}>
                      {[1,2,3,4,6,12].map(d => (
                        <button key={d} onClick={() => setPlanInputs(p => ({...p, duration: d}))} style={{ flex: 1, padding: "6px 0", borderRadius: 6, border: planInputs.duration === d ? "1px solid #3b82f6" : "1px solid #e0e0e8", background: planInputs.duration === d ? "#e8e0f0" : "transparent", color: planInputs.duration === d ? "#7eb8ff" : "#6a6a7e", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>{d}</button>
                      ))}
                    </div>
                  </Card>
                  <Card style={{ padding: 14 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: "#5a5a6e", marginBottom: 6 }}>Markets</div>
                    <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                      {["UAE", "KSA", "Kuwait", "Qatar", "Multi-Market"].map(m => (
                        <button key={m} onClick={() => setPlanInputs(p => ({...p, markets: p.markets.includes(m) ? p.markets.filter(x => x !== m) : [...p.markets, m]}))} style={{ padding: "4px 10px", borderRadius: 14, border: planInputs.markets.includes(m) ? "1px solid #3b82f6" : "1px solid #e0e0e8", background: planInputs.markets.includes(m) ? "#e8e0f0" : "transparent", color: planInputs.markets.includes(m) ? "#7eb8ff" : "#6a6a7e", fontSize: 10, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>{m}</button>
                      ))}
                    </div>
                  </Card>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 16 }}>
                <Card style={{ padding: 14 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "#5a5a6e", marginBottom: 6 }}>Vertical / Industry</div>
                  <select value={planInputs.vertical} onChange={e => setPlanInputs(p => ({...p, vertical: e.target.value}))} style={{ width: "100%", padding: "6px 8px", background: "#f5f5f7", border: "1px solid #e0e0e8", borderRadius: 6, color: "#1a1a2e", fontSize: 11, fontFamily: "inherit" }}>
                    {["Real Estate", "Fashion / Retail", "FMCG", "Auto", "Travel / Hospitality", "F&B", "Finance / BFSI", "Tech / SaaS", "Education", "Gaming", "Healthcare", "Government", "Luxury", "Entertainment"].map(v => <option key={v}>{v}</option>)}
                  </select>
                </Card>
                <Card style={{ padding: 14 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "#5a5a6e", marginBottom: 6 }}>Creative Ready?</div>
                  <div style={{ display: "flex", gap: 6 }}>
                    {[true, false].map(v => (
                      <button key={String(v)} onClick={() => setPlanInputs(p => ({...p, hasCreative: v}))} style={{ flex: 1, padding: "6px 0", borderRadius: 6, border: planInputs.hasCreative === v ? "1px solid #3b82f6" : "1px solid #e0e0e8", background: planInputs.hasCreative === v ? "#e8e0f0" : "transparent", color: planInputs.hasCreative === v ? "#7eb8ff" : "#6a6a7e", fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>{v ? "Yes" : "No"}</button>
                    ))}
                  </div>
                </Card>
                <Card style={{ padding: 14 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "#5a5a6e", marginBottom: 6 }}>Tracking in Place?</div>
                  <div style={{ display: "flex", gap: 6 }}>
                    {[true, false].map(v => (
                      <button key={String(v)} onClick={() => setPlanInputs(p => ({...p, hasTracking: v}))} style={{ flex: 1, padding: "6px 0", borderRadius: 6, border: planInputs.hasTracking === v ? "1px solid #3b82f6" : "1px solid #e0e0e8", background: planInputs.hasTracking === v ? "#e8e0f0" : "transparent", color: planInputs.hasTracking === v ? "#7eb8ff" : "#6a6a7e", fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>{v ? "Yes" : "No"}</button>
                    ))}
                  </div>
                </Card>
              </div>

              <button onClick={() => setPlanGenerated(true)} style={{ padding: "12px 32px", borderRadius: 8, border: "none", background: "#3b82f6", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", marginBottom: 20 }}>⚡ Generate Media Plan</button>

              {planGenerated && (() => {
                const b = planInputs.budget;
                const obj = planInputs.objective;
                const isB2B = obj === "B2B / Thought Leadership";
                const isEcom = obj === "Conversions / E-commerce";
                const isApp = obj === "App Installs";
                const isLead = obj === "Lead Generation";
                const isAwareness = obj === "Brand Awareness" || obj === "Video Views";
                const hasKSA = planInputs.markets.includes("KSA") || planInputs.markets.includes("Multi-Market");
                const hasKuwait = planInputs.markets.includes("Kuwait") || planInputs.markets.includes("Multi-Market");
                const tier = b < 15000 ? "Starter" : b < 50000 ? "Growth" : b < 150000 ? "Mid-Market" : b < 400000 ? "Premium" : "Enterprise";

                const mix = isB2B ? { LinkedIn: 45, Meta: 20, Google: 15, "X (Twitter)": 10, Programmatic: 10 }
                  : isEcom ? { Meta: 40, Google: 25, TikTok: 15, ...(hasKSA || hasKuwait ? { Snapchat: 10 } : {}), Programmatic: 10 }
                  : isApp ? { Meta: 35, TikTok: 25, Google: 20, Snapchat: 15, Programmatic: 5 }
                  : isLead ? { Meta: 35, LinkedIn: 20, TikTok: 15, ...(hasKSA || hasKuwait ? { Snapchat: 10 } : {}), Google: 15, ...(!(hasKSA || hasKuwait) ? { "X (Twitter)": 5 } : {}) }
                  : isAwareness ? { Meta: 25, TikTok: 20, YouTube: 20, ...(hasKSA || hasKuwait ? { Snapchat: 15 } : { Snapchat: 10 }), Programmatic: 10, "X (Twitter)": 5, ...(!(hasKSA || hasKuwait) ? { Programmatic: 15 } : {}) }
                  : { Meta: 30, TikTok: 15, YouTube: 10, Snapchat: 12, Google: 15, LinkedIn: 8, "X (Twitter)": 5, Programmatic: 5 };

                const totalPct = Object.values(mix).reduce((a, v) => a + v, 0);
                const cpms = { Meta: 8, TikTok: 12, Snapchat: 6, YouTube: 10, Google: 8, LinkedIn: 35, "X (Twitter)": 12, Programmatic: 8 };
                const kpiMap = { Meta: isEcom ? "ROAS 2–5x" : isLead ? "CPL $5–30" : "CPM $3–11", TikTok: isEcom ? "ROAS 1.5–4x" : "CPV $0.02–0.08", Snapchat: isLead ? "CPL $8–34" : "CPM $3–10", YouTube: "CPV $0.01–0.05", Google: isEcom ? "ROAS 3–8x" : "CPC $0.50–2", LinkedIn: isLead ? "CPL $30–150" : "CPM $10–60", "X (Twitter)": "CPM $7–19", Programmatic: "CPM $2–30" };

                const warnings = [];
                if (!planInputs.hasCreative) warnings.push("⚠️ No creative ready - this is the #1 risk. Brief creative team immediately. Consider UGC/Spark Ads approach for TikTok.");
                if (!planInputs.hasTracking) warnings.push("⚠️ No tracking in place - implement Meta Pixel + CAPI, TikTok Events API, Google Tag + GA4 BEFORE launching any conversion campaign.");
                if (b < 15000) warnings.push("⚠️ Budget is in Starter tier ($5K–$15K). Recommend maximum 2 platforms. Meta should be primary.");
                if (hasKSA && !mix.Snapchat) warnings.push("⚠️ KSA market selected but no Snapchat - Snap has 60–70% penetration in KSA. Consider adding.");
                if (hasKuwait && !mix.Snapchat) warnings.push("⚠️ Kuwait market selected but no Snapchat - Snap penetration is 60–70% in Kuwait.");
                Object.entries(mix).forEach(([p, pct]) => { if ((b * pct / totalPct / 100) < 3000 && p !== "X (Twitter)") warnings.push(`⚠️ ${p} allocation ($${Math.round(b * pct / totalPct).toLocaleString()}) is below $3K - may not generate meaningful data.`); });

                return (
                  <div>
                    <Card style={{ background: "#f0edf5", border: "1px solid #d0d0e0", marginBottom: 16, padding: 20 }}>
                      <div style={{ fontSize: 16, fontWeight: 800, color: "#1a1a2e", marginBottom: 4 }}>Generated Media Plan</div>
                      <div style={{ fontSize: 11, color: "#5a5a6e" }}>{obj} · {planInputs.markets.join(", ")} · ${b.toLocaleString()}/mo × {planInputs.duration} months · {tier} tier · {planInputs.vertical}</div>
                    </Card>

                    {warnings.length > 0 && (
                      <Card style={{ background: "#fdf5f0", border: "1px solid #e8dcd0", marginBottom: 16 }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: "#cc3333", marginBottom: 8 }}>Flags & Warnings</div>
                        {warnings.map((w, i) => <div key={i} style={{ fontSize: 11, color: "#444455", marginBottom: 4 }}>{w}</div>)}
                      </Card>
                    )}

                    <h3 style={{ fontSize: 14, fontWeight: 700, color: "#2D1768", marginBottom: 12 }}>Platform Split & Budget Allocation</h3>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 10, marginBottom: 20 }}>
                      {Object.entries(mix).map(([platform, pct]) => {
                        const spend = Math.round(b * pct / totalPct);
                        const cpm = cpms[platform] || 10;
                        const impressions = Math.round((spend / cpm) * 1000);
                        return (
                          <Card key={platform} style={{ padding: 14 }}>
                            <div style={{ fontSize: 12, fontWeight: 700, color: "#1a1a2e" }}>{platform}</div>
                            <div style={{ fontSize: 20, fontWeight: 800, color: "#2a8c3e" }}>${spend.toLocaleString()}</div>
                            <div style={{ fontSize: 10, color: "#5a5a6e", marginBottom: 6 }}>{Math.round(pct / totalPct * 100)}% · {(impressions/1000).toFixed(0)}K impr.</div>
                            <div style={{ fontSize: 10, color: "#b8860b", fontFamily: "'SF Mono', monospace" }}>{kpiMap[platform]}</div>
                            <div style={{ marginTop: 6 }}><ProgressBar value={pct} max={50} color="#3b82f6" /></div>
                          </Card>
                        );
                      })}
                    </div>

                    <h3 style={{ fontSize: 14, fontWeight: 700, color: "#2D1768", marginBottom: 12 }}>Creative Requirements</h3>
                    <Card style={{ marginBottom: 20 }}>
                      <div style={{ fontSize: 12, color: "#444455", lineHeight: 1.8 }}>
                        {mix.Meta && <>• <strong style={{ color: "#1a1a2e" }}>Meta:</strong> Feed image/video 1080×1350 (4:5) + Stories/Reels 1080×1920 (9:16) + Carousel 1080×1080 (1:1){hasKSA || hasKuwait ? " · Arabic versions required" : ""}<br/></>}
                        {mix.TikTok && <>• <strong style={{ color: "#1a1a2e" }}>TikTok:</strong> In-Feed 1080×1920 (9:16), native/UGC style, hook in 2s, sound-on. Consider Spark Ads with creators.<br/></>}
                        {mix.Snapchat && <>• <strong style={{ color: "#1a1a2e" }}>Snapchat:</strong> Single video 1080×1920 (9:16), 6–15s recommended. AR Lens if budget allows.<br/></>}
                        {mix.YouTube && <>• <strong style={{ color: "#1a1a2e" }}>YouTube:</strong> TrueView/Non-Skip 1920×1080 (16:9) 15–30s + Shorts 1080×1920 (9:16) for Demand Gen.<br/></>}
                        {mix.Google && <>• <strong style={{ color: "#1a1a2e" }}>Google:</strong> {isEcom ? "PMax: video + image + text + product feed" : "Demand Gen: video 15–30s + image 1080×1080 + carousel"}<br/></>}
                        {mix.LinkedIn && <>• <strong style={{ color: "#1a1a2e" }}>LinkedIn:</strong> Feed image 1080×1080 (1:1) + video with captions + Document Ad (PDF) for thought leadership.<br/></>}
                        {mix.Programmatic && <>• <strong style={{ color: "#1a1a2e" }}>Programmatic:</strong> Display: 300×250, 728×90, 160×600, 320×50, 300×600 (all 5 sizes). {hasKSA || hasKuwait ? "Arabic + English versions." : ""}<br/></>}
                        {mix["X (Twitter)"] && <>• <strong style={{ color: "#1a1a2e" }}>X:</strong> Promoted image 1200×675 or 1080×1080 + video up to 2:20.<br/></>}
                      </div>
                    </Card>

                    <h3 style={{ fontSize: 14, fontWeight: 700, color: "#2D1768", marginBottom: 12 }}>Measurement Setup Required</h3>
                    <Card style={{ marginBottom: 20 }}>
                      <div style={{ fontSize: 12, color: "#444455", lineHeight: 1.8 }}>
                        {mix.Meta && <>• Meta Pixel + CAPI (server-side) - required for any conversion/lead campaign<br/></>}
                        {mix.TikTok && <>• TikTok Pixel + Events API - required for conversion optimisation<br/></>}
                        {mix.Snapchat && <>• Snap Pixel - required for conversion tracking and Dynamic Ads<br/></>}
                        {mix.Google && <>• Google Tag + GA4 + {isEcom ? "Enhanced Conversions" : "conversion events"}<br/></>}
                        {mix.LinkedIn && <>• LinkedIn Insight Tag - required for conversion tracking and retargeting<br/></>}
                        • UTM parameters on ALL ad destination URLs - consistent naming convention<br/>
                        • GA4 as cross-channel source of truth - do not sum platform ROAS figures<br/>
                        {isEcom && (hasKSA) && <>• COD attribution - ask client for Cash on Delivery % (common in KSA). Adjust ROAS reporting accordingly.<br/></>}
                      </div>
                    </Card>

                    <h3 style={{ fontSize: 14, fontWeight: 700, color: "#b8860b", marginBottom: 12 }}>Regional Recommendations</h3>
                    <Card style={{ background: "#ffffff" }}>
                      <div style={{ fontSize: 12, color: "#444455", lineHeight: 1.8 }}>
                        {hasKSA && <>• <strong style={{ color: "#1a1a2e" }}>KSA:</strong> Snapchat and TikTok are dominant for under-35. Arabic creative is mandatory. Snap penetration 60–70%.<br/></>}
                        {hasKuwait && <>• <strong style={{ color: "#1a1a2e" }}>Kuwait:</strong> Snapchat is the #1 platform - do not exclude. Arabic creative required.<br/></>}
                        {planInputs.markets.includes("UAE") && <>• <strong style={{ color: "#1a1a2e" }}>UAE:</strong> Most diverse audience (expat-heavy). Dual-language AR+EN recommended. WhatsApp penetration ~95%+.<br/></>}
                        • <strong style={{ color: "#1a1a2e" }}>9:16 vertical</strong> is mandatory for TikTok, Reels, Stories, Shorts, and Snapchat - this is the 2026 default.<br/>
                        • <strong style={{ color: "#1a1a2e" }}>Creative is #1 variable</strong> - supply minimum 3 variants per platform. Andromeda (Meta) uses creative as targeting signal.<br/>
                        {planInputs.vertical === "Real Estate" && <>• <strong style={{ color: "#1a1a2e" }}>Real Estate:</strong> Click-to-WhatsApp converts extremely well regionally. Consider WeChat for Chinese HNWI via EternityX.<br/></>}
                        {planInputs.vertical === "Luxury" && <>• <strong style={{ color: "#1a1a2e" }}>Luxury:</strong> Pinterest for affluent female audience. LinkedIn for HNWI professional targeting. Premium programmatic PMPs.<br/></>}
                        {planInputs.vertical === "Fashion / Retail" && <>• <strong style={{ color: "#1a1a2e" }}>Fashion/Retail:</strong> TikTok Spark Ads + Meta Advantage+ Sales for peak Eid/DSF/White Friday moments. DPA essential.<br/></>}
                        {planInputs.vertical === "Finance / BFSI" && <>• <strong style={{ color: "#1a1a2e" }}>BFSI:</strong> LinkedIn is primary. X (Twitter) for finance audience. Programmatic native for long-form content. Regulated category - check platform policies.<br/></>}
                        {planInputs.vertical === "Travel / Hospitality" && <>• <strong style={{ color: "#1a1a2e" }}>Travel:</strong> YouTube Demand Gen is strongest mid-funnel. Google PMax for booking conversions. Instagram Reels for inspiration. DSF and summer are key periods.<br/></>}
                      </div>
                    </Card>
                  </div>
                );
              })()}
            </div>
          )}

          {/* GLOSSARY */}
          {activeSection === "glossary" && (
            <div>
              <SectionTitle>KPI & Metric Glossary</SectionTitle>
              <SectionDesc>Definitions for every metric and acronym used across the framework. {glossary.length} terms.</SectionDesc>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid #d0d0e0" }}>
                      {["Term", "Full Name", "Definition", "Use Case"].map(h => (
                        <th key={h} style={{ padding: "10px 8px", textAlign: "left", color: "#444455", fontWeight: 700, fontSize: 10, textTransform: "uppercase" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {glossary.filter(g => !filterText || JSON.stringify(g).toLowerCase().includes(filterText)).map((g, i) => (
                      <tr key={i} style={{ borderBottom: "1px solid #f0f0f5", background: i % 2 === 0 ? "#f9f9fb" : "transparent" }}>
                        <td style={{ padding: "8px", fontWeight: 800, color: "#2D1768", fontFamily: "'SF Mono', monospace" }}>{g.term}</td>
                        <td style={{ padding: "8px", color: "#1a1a2e" }}>{g.full}</td>
                        <td style={{ padding: "8px", color: "#444455" }}>{g.def}</td>
                        <td style={{ padding: "8px" }}><Chip color="blue">{g.use}</Chip></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
