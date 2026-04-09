import { useState, useEffect, useRef } from "react";

const SECTIONS = [
  { id: "overview", label: "Overview", num: "01" },
  { id: "planning", label: "Planning Process", num: "02" },
  { id: "platforms", label: "Platform Selection", num: "03" },
  { id: "framework", label: "Media Framework", num: "04" },
  { id: "formats", label: "High Impact Formats", num: "05" },
  { id: "budget", label: "Budget & Channel Mix", num: "06" },
  { id: "measurement", label: "Measurement & KPIs", num: "07" },
  { id: "updates", label: "Platform Updates", num: "08" },
  { id: "caveats", label: "Caveats & Risks", num: "09" },
  { id: "checklist", label: "Pre-Launch QA", num: "10" },
  { id: "mistakes", label: "Common Mistakes", num: "11" },
  { id: "programmatic", label: "Programmatic Deep Dive", num: "12" },
  { id: "vendors", label: "Vendor Landscape", num: "13" },
  { id: "creativespecs", label: "Creative Specs", num: "14" },
  { id: "divider", label: "TOOLS", num: "" },
  { id: "budgetcalc", label: "Budget Calculator", num: "15" },
  { id: "creativegen", label: "Creative Generator", num: "16" },
  { id: "comparison", label: "Platform Compare", num: "17" },
  { id: "heatmap", label: "CPM Heatmap", num: "18" },
  { id: "benchmark", label: "Benchmark Tracker", num: "19" },
  { id: "ratecard", label: "Rate Card Database", num: "20" },
  { id: "pacing", label: "Pacing Tracker", num: "21" },
  { id: "marketmatrix", label: "Market Planning Matrix", num: "22" },
  { id: "qbr", label: "Etihad Report Builder", num: "23" },
  { id: "glossary", label: "KPI Glossary", num: "24" },
  { id: "admin", label: "Admin Panel", num: "⚙" },
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

// HiddenPika is rendered inside App - uses gameActive/foundPikas from closure

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
  { platform: "Meta", update: "Andromeda Algorithm - Global Rollout", impact: "🔴", date: "Oct 2025", detail: "Creative is now the primary targeting signal. Supply 8-12 diverse creatives per campaign.", status: "Critical", statusColor: "#cc3333", why: "Without diverse creative, campaign performance will degrade. Algorithm needs creative variety to find audiences.", link: "https://www.facebook.com/business/news" },
  { platform: "Meta", update: "Advantage+ Sales (replaces Shopping)", impact: "🔴", date: "Early 2026", detail: "Covers broader conversion objectives. Old API deprecated - migrate by Sep 2026.", status: "Critical", statusColor: "#cc3333", why: "Old campaigns will stop delivering. Must migrate all conversion campaigns before deadline.", link: "https://www.facebook.com/business/help/advantage-plus-shopping-campaigns" },
  { platform: "Meta", update: "Threads Ads - Global Rollout", impact: "🟡", date: "Feb 2026", detail: "400M+ MAU. Image, video, carousel ads via Ads Manager.", status: "Test", statusColor: "#b8860b", why: "New inventory source. Worth testing but not critical. May offer lower CPMs during early adoption.", link: "https://about.fb.com/news/" },
  { platform: "Meta", update: "WhatsApp Status Ads Expanding", impact: "🔴", date: "Mar 2026", detail: "Auto-activates in Traffic campaigns. ~95%+ WhatsApp penetration in MENA, 60%+ India/LATAM.", status: "Critical", statusColor: "#cc3333", why: "Ads auto-placed here. If creative isn't optimised for WhatsApp Status, budget will be wasted on poor placements.", link: "https://business.whatsapp.com/resources" },
  { platform: "Meta", update: "Detailed Targeting Exclusions Removed", impact: "🔴", date: "Mar 2025", detail: "Rely on creative signals, Value Rules, and first-party data (CAPI).", status: "Critical", statusColor: "#cc3333", why: "Cannot exclude audiences the old way. Plans relying on exclusions need immediate restructuring.", link: "https://www.facebook.com/business/help/detailed-targeting" },
  { platform: "TikTok", update: "Logo Takeover - NEW", impact: "🟡", date: "Mar 2026", detail: "Highest-impact format. Brand logo co-brands TikTok splash screen.", status: "Monitor", statusColor: "#b8860b", why: "Premium format for big-budget awareness campaigns. Monitor pricing and availability per market.", link: "https://ads.tiktok.com/help/article/about-brand-takeover" },
  { platform: "TikTok", update: "Prime Time - NEW", impact: "🟡", date: "Mar 2026", detail: "3 sequential ads, 15-min window. For live events.", status: "Monitor", statusColor: "#b8860b", why: "Niche use case for live moments. Not relevant to all campaigns but powerful for event marketing.", link: "https://ads.tiktok.com/business/en/blog" },
  { platform: "TikTok", update: "TopReach - NEW", impact: "🟡", date: "Mar 2026", detail: "Bundles TopView + TopFeed in single buy.", status: "Test", statusColor: "#b8860b", why: "Simplifies premium buying. Test for awareness campaigns - may offer better value than separate buys.", link: "https://ads.tiktok.com/help/" },
  { platform: "TikTok", update: "TopView now CPM/Auction", impact: "🔴", date: "2023+", detail: "More targeting flexibility. Brand Takeover remains reservation.", status: "Critical", statusColor: "#cc3333", why: "Unlocks precision targeting on premium placement. Plans should shift from reservation to auction for better efficiency.", link: "https://ads.tiktok.com/help/article/about-topview" },
  { platform: "Snapchat", update: "Total Snap Takeover - NEW", impact: "🟡", date: "Mar 2026", detail: "First ad across ALL app tabs. 97% users visit multiple tabs.", status: "Monitor", statusColor: "#b8860b", why: "Highest-reach Snap format. Essential for KSA/Kuwait campaigns where Snapchat dominates.", link: "https://forbusiness.snapchat.com/blog" },
  { platform: "Snapchat", update: "Sponsored Snaps - Global", impact: "🔴", date: "2025", detail: "Ads in Chat/Inbox. High native feel. Inbox-first in KSA/Kuwait.", status: "Critical", statusColor: "#cc3333", why: "New high-attention placement. In MENA, inbox is primary Snapchat surface - must include in KSA/Kuwait plans.", link: "https://forbusiness.snapchat.com/advertising/sponsored-snaps" },
  { platform: "Snapchat", update: "Smart Bidding & Smart Budget", impact: "🟢", date: "May 2025", detail: "Auto CPA bidding and spend reallocation. Aligns with Meta Advantage+.", status: "Adopt", statusColor: "#2a8c3e", why: "Reduces manual optimisation work and improves efficiency. Should be default for all conversion campaigns.", link: "https://forbusiness.snapchat.com/blog" },
  { platform: "Cross-Platform", update: "9:16 Vertical is Default Standard", impact: "🔴", date: "2025-26", detail: "Meta confirmed 90% vertical by 2026. Non-vertical ads penalised.", status: "Critical", statusColor: "#cc3333", why: "Landscape/square creative will receive less distribution. All new creative must be produced in 9:16 first.", link: "https://www.facebook.com/business/news/vertical-video" },
  { platform: "Cross-Platform", update: "AI-Driven Creative Optimisation", impact: "🔴", date: "2025-26", detail: "All major platforms use AI for creative selection. Supply 8-12 variants.", status: "Critical", statusColor: "#cc3333", why: "Single-creative campaigns cannot compete. AI needs volume to test and learn. Budget allocated to 1-2 creatives will underperform.", link: "https://www.facebook.com/business/help/advantage-plus-creative" },
  { platform: "Cross-Platform", update: "First-Party Data & Server-Side Essential", impact: "🔴", date: "2025-26", detail: "CAPI, Events API, Snap CAPI are measurement baseline.", status: "Critical", statusColor: "#cc3333", why: "Without server-side tracking, 30-40% of conversions go unreported. Campaign optimisation is blind without this.", link: "https://developers.facebook.com/docs/marketing-api/conversions-api" },
  { platform: "Google", update: "Performance Max - Asset Group Reporting", impact: "🔴", date: "2025", detail: "PMax now shows asset-level performance data. See which headlines, images, and videos drive results.", status: "Critical", statusColor: "#cc3333", why: "Previously a black box. Now you can optimise creative within PMax instead of guessing. Must review weekly.", link: "https://support.google.com/google-ads/answer/13258498" },
  { platform: "Google", update: "Demand Gen Campaigns - Expanded", impact: "🔴", date: "2025-26", detail: "Replaces Discovery campaigns. Runs across YouTube, Gmail, Discover with AI-optimised creative combinations.", status: "Critical", statusColor: "#cc3333", why: "All Discovery campaigns auto-migrated. Demand Gen offers lookalike segments and video ads - plan accordingly.", link: "https://support.google.com/google-ads/answer/13695777" },
  { platform: "Google", update: "Enhanced Conversions - Required", impact: "🔴", date: "2025", detail: "First-party data matching for conversion tracking. Uses hashed email/phone to recover lost conversions.", status: "Critical", statusColor: "#cc3333", why: "Google estimates 15-25% conversion loss without Enhanced Conversions. Non-negotiable for Search and PMax.", link: "https://support.google.com/google-ads/answer/11062876" },
  { platform: "Google", update: "Broad Match + Smart Bidding Default", impact: "🔴", date: "2025-26", detail: "Google pushing broad match as default with AI bidding. Phrase/exact match losing volume.", status: "Critical", statusColor: "#cc3333", why: "Resist defaulting blindly - works well with Smart Bidding but requires strong negative keyword lists and conversion data.", link: "https://support.google.com/google-ads/answer/7478529" },
  { platform: "Google", update: "Search Generative Experience (SGE) Impact", impact: "🔴", date: "2025-26", detail: "AI Overviews in Search results push organic and paid results lower. CTRs changing across verticals.", status: "Monitor", statusColor: "#b8860b", why: "Monitor CTR trends weekly. Some verticals seeing 20-30% CTR decline. May need to increase bids or shift to PMax.", link: "https://blog.google/products/search/generative-ai-search/" },
  { platform: "YouTube", update: "YouTube Shorts Monetisation Expanded", impact: "🟡", date: "2025", detail: "Shorts ads now in auction alongside in-feed. 70B+ daily Shorts views globally.", status: "Adopt", statusColor: "#2a8c3e", why: "Massive reach at lower CPMs than standard YouTube. 9:16 creative required. Should be in every video plan.", link: "https://blog.youtube/news-and-events/shorts-ads/" },
  { platform: "YouTube", update: "YouTube Select for CTV", impact: "🟡", date: "2025-26", detail: "Premium CTV inventory via YouTube Select. Top 5% of channels, brand-safe, living room experience.", status: "Test", statusColor: "#b8860b", why: "CTV viewing growing 30%+ YoY. YouTube Select guarantees premium placement. Test for awareness campaigns.", link: "https://ads.google.com/intl/en/home/campaigns/youtube-select/" },
  { platform: "Google", update: "Consent Mode V2 - Required in EU/UK", impact: "🔴", date: "Mar 2025", detail: "Google Ads and GA4 require Consent Mode V2 for EU/UK campaigns. Non-compliant tags lose data.", status: "Critical", statusColor: "#cc3333", why: "Without Consent Mode V2, remarketing audiences and conversion data stop populating for EU/UK users. Immediate action.", link: "https://support.google.com/google-ads/answer/10000067" },
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authUser, setAuthUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [isApproved, setIsApproved] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [pendingApproval, setPendingApproval] = useState(false);
  const [supaClient, setSupaClient] = useState(null);
  const [activeSection, setActiveSection] = useState("overview");
  const [search, setSearch] = useState("");
  const [checkedItems, setCheckedItems] = useState({});
  const [mobileNav, setMobileNav] = useState(false);

  // ── SUPABASE AUTH ──
  const ADMIN_EMAILS = ["mike.ernst8002@gmail.com"];

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js";
    script.onload = () => {
      const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
      setSupaClient(client);
      client.auth.getSession().then(({ data }) => {
        if (data.session?.user) {
          handleAuthUser(client, data.session.user);
        } else { setAuthLoading(false); }
      });
      client.auth.onAuthStateChange((event, session) => {
        if (session?.user) { handleAuthUser(client, session.user); }
        else { setIsLoggedIn(false); setAuthUser(null); setAuthLoading(false); }
      });
    };
    document.head.appendChild(script);
  }, []);

  const handleAuthUser = async (client, user) => {
    setAuthUser(user);
    const email = user.email;
    const isAdm = ADMIN_EMAILS.includes(email);
    setIsAdmin(isAdm);
    try {
      const { data } = await client.from("approved_users").select("*").eq("email", email).single();
      if (data) {
        if (data.approved || isAdm) {
          setIsApproved(true); setIsLoggedIn(true); setPendingApproval(false);
          if (isAdm && data.role !== "admin") { await client.from("approved_users").update({ role: "admin" }).eq("email", email); }
        } else { setPendingApproval(true); setIsLoggedIn(false); }
      } else {
        await client.from("approved_users").insert({ email, name: user.user_metadata?.full_name || email, avatar_url: user.user_metadata?.avatar_url || "", role: isAdm ? "admin" : "user", approved: isAdm });
        if (isAdm) { setIsApproved(true); setIsLoggedIn(true); }
        else { setPendingApproval(true); setIsLoggedIn(false); }
      }
    } catch { if (isAdm) { setIsApproved(true); setIsLoggedIn(true); } else { setPendingApproval(true); } }
    setAuthLoading(false);
  };

  const signInWithGoogle = () => { if (supaClient) { supaClient.auth.signInWithOAuth({ provider: "google", options: { redirectTo: window.location.origin } }); } };
  const signOut = () => { if (supaClient) { supaClient.auth.signOut(); setIsLoggedIn(false); setAuthUser(null); setIsApproved(false); setPendingApproval(false); } };
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
  const [rateCardFilter, setRateCardFilter] = useState({ platform: "All", market: "All", objective: "All" });
  const [pacingRows, setPacingRows] = useState([{ campaign: "Campaign 1", budget: 50000, spent: 0, daysElapsed: 1, totalDays: 30 }]);
  const [marketMatrix, setMarketMatrix] = useState({});
  const [matBudget, setMatBudget] = useState(100000);
  const [savedPlans, setSavedPlans] = useState([]);

  // ── SUPABASE CONFIG ──
  const SUPABASE_URL = "https://erpufythihpjksutyqst.supabase.co";
  const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVycHVmeXRoaWhwamtzdXR5cXN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2Mjk5MzksImV4cCI6MjA5MTIwNTkzOX0.VCHbHzdRRbvStBR--EU_O5Lscwu39Z4AqFU95_zZQRs";
  // ──────────────────────

  const sbHeaders = { "apikey": SUPABASE_KEY, "Authorization": "Bearer " + SUPABASE_KEY, "Content-Type": "application/json", "Prefer": "return=representation" };
  const sbFetch = async (path, opts = {}) => { const res = await fetch(SUPABASE_URL + "/rest/v1/" + path, { ...opts, headers: { ...sbHeaders, ...opts.headers } }); return res.json(); };

  useEffect(() => {
    if (SUPABASE_URL.includes("YOUR_PROJECT")) return;
    sbFetch("media_plans?order=created_at.desc").then(data => { if (Array.isArray(data)) setSavedPlans(data.map(r => ({ ...r.data, id: r.id, savedAt: r.created_at, name: r.name }))); }).catch(() => {});
  }, []);

  const savePlan = async (plan) => {
    const row = { name: plan.name || "Untitled", data: plan };
    if (SUPABASE_URL.includes("YOUR_PROJECT")) {
      const local = [...savedPlans, { ...plan, id: Date.now(), savedAt: new Date().toISOString() }];
      setSavedPlans(local);
      try { localStorage.setItem("phd_media_plans_backup", JSON.stringify(local)); } catch {}
      return;
    }
    try {
      const result = await sbFetch("media_plans", { method: "POST", body: JSON.stringify(row) });
      if (Array.isArray(result) && result[0]) { setSavedPlans(prev => [{ ...result[0].data, id: result[0].id, savedAt: result[0].created_at, name: result[0].name }, ...prev]); }
    } catch (e) { alert("Save failed: " + e.message); }
  };

  const deletePlan = async (id) => {
    if (SUPABASE_URL.includes("YOUR_PROJECT")) {
      setSavedPlans(prev => prev.filter(p => p.id !== id));
      return;
    }
    try {
      await fetch(SUPABASE_URL + "/rest/v1/media_plans?id=eq." + id, { method: "DELETE", headers: sbHeaders });
      setSavedPlans(prev => prev.filter(p => p.id !== id));
    } catch (e) { alert("Delete failed: " + e.message); }
  };
  const [adminUsers, setAdminUsers] = useState([]);
  const [adminLoading, setAdminLoading] = useState(true);
  const [creativePreview, setCreativePreview] = useState(null);
  const [updatePlatformFilter, setUpdatePlatformFilter] = useState("All");
  const [qbrData, setQbrData] = useState({ campaign: "", period: "", objective: "", context: "", platforms: [], aiParsed: null, aiLoading: false });
  const [gameActive, setGameActive] = useState(false);
  const [gameTimer, setGameTimer] = useState(120);
  const [foundPikas, setFoundPikas] = useState({});
  const [gameWon, setGameWon] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const TOTAL_PIKAS = 20;
  const gameTimerRef = useRef(null);

  const startGame = () => {
    setGameActive(true); setGameTimer(120); setFoundPikas({}); setGameWon(false); setGameOver(false); setShowConfetti(false);
    if (gameTimerRef.current) clearInterval(gameTimerRef.current);
    gameTimerRef.current = setInterval(() => {
      setGameTimer(prev => {
        if (prev <= 1) { clearInterval(gameTimerRef.current); setGameOver(true); setGameActive(false); return 0; }
        return prev - 1;
      });
    }, 1000);
  };

  const findPika = (id) => {
    if (!gameActive) return;
    setFoundPikas(prev => ({...prev, [id]: true}));
  };

  window.__findPika = findPika;
  window.__showCreativePreview = (format) => setCreativePreview(format);
  const foundCount = Object.keys(foundPikas).length;

  useEffect(() => {
    if (foundCount >= TOTAL_PIKAS && gameActive) {
      clearInterval(gameTimerRef.current);
      setGameWon(true); setGameActive(false); setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  }, [foundCount, gameActive]);

  const Pika = ({ id, style = {} }) => {
    if (!gameActive && !gameWon) return null;
    const isFound = foundPikas[id];
    return (
      <span onClick={(e) => { e.stopPropagation(); if (!isFound && gameActive) findPika(id); }}
        style={{ display: "inline-block", cursor: gameActive && !isFound ? "pointer" : "default", transition: "all 0.3s", verticalAlign: "middle", marginLeft: 4, position: "relative", ...style }}>
        {!isFound && gameActive && <span style={{ position: "absolute", inset: -4, background: "radial-gradient(circle, rgba(255,217,61,0.3) 0%, transparent 70%)", borderRadius: "50%", animation: "pulse 2s ease-in-out infinite" }} />}
        <svg width="15" height="15" viewBox="0 0 24 24" style={{ opacity: isFound ? 0.15 : 0.85, transform: isFound ? "scale(0.6) rotate(30deg)" : "scale(1)", transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)", filter: isFound ? "grayscale(1)" : "drop-shadow(0 1px 2px rgba(0,0,0,0.15))" }}>
          {/* Body */}
          <ellipse cx="12" cy="13" rx="8" ry="7" fill="#FFD93D"/>
          <ellipse cx="12" cy="15" rx="5" ry="3.5" fill="#FFE566" opacity="0.5"/>
          {/* Ears */}
          <polygon points="6,8 2,0 9,6" fill="#FFD93D" stroke="#E8B800" strokeWidth="0.3"/>
          <polygon points="18,8 22,0 15,6" fill="#FFD93D" stroke="#E8B800" strokeWidth="0.3"/>
          <polygon points="2.5,0.5 4,3 2,2" fill="#2D1768"/>
          <polygon points="21.5,0.5 20,3 22,2" fill="#2D1768"/>
          {/* Eyes */}
          <circle cx="9" cy="11" r="2" fill="#2D1768"/>
          <circle cx="15" cy="11" r="2" fill="#2D1768"/>
          <circle cx="9.7" cy="10.3" r="0.7" fill="white"/>
          <circle cx="15.7" cy="10.3" r="0.7" fill="white"/>
          {/* Cheeks */}
          <circle cx="6" cy="14" r="2.2" fill="#FF6B6B" opacity="0.35"/>
          <circle cx="18" cy="14" r="2.2" fill="#FF6B6B" opacity="0.35"/>
          {/* Mouth */}
          <path d="M10 16 Q12 18.5 14 16" fill="none" stroke="#2D1768" strokeWidth="0.8" strokeLinecap="round"/>
          {/* Tail */}
          <path d="M20 10 L22.5 6 L21 5.5 L23.5 2 L20.5 5 L21 6 Z" fill="#E8B800" stroke="#D4A012" strokeWidth="0.3"/>
        </svg>
        {isFound && <span style={{ position: "absolute", top: -2, right: -2, fontSize: 8, background: "#7AC143", color: "white", borderRadius: "50%", width: 12, height: 12, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800 }}>✓</span>}
      </span>
    );
  };
  const [audienceData, setAudienceData] = useState([
    { persona: "Primary", description: "", markets: ["UAE"], platform: "Meta", ageRange: "25-44", gender: "All", interests: "", estimatedSize: "", notes: "" },
  ]);
  const [basePlanId, setBasePlanId] = useState(null);
  const [historicData, setHistoricData] = useState(null);

  const AUDIENCE_SIZES = {
    Meta: { "UAE": {all:9800000,"18-24":1900000,"25-34":3400000,"25-44":5200000,"35-54":2800000,"55+":600000}, "KSA": {all:25000000,"18-24":5500000,"25-34":8500000,"25-44":13000000,"35-54":6500000,"55+":1200000}, "Kuwait": {all:4200000,"18-24":850000,"25-34":1400000,"25-44":2200000,"35-54":1100000,"55+":250000}, "Qatar": {all:3100000,"18-24":600000,"25-34":1050000,"25-44":1600000,"35-54":850000,"55+":180000}, "UK": {all:45000000,"18-24":7200000,"25-34":9800000,"25-44":18000000,"35-54":13000000,"55+":7500000}, "US": {all:195000000,"18-24":32000000,"25-34":42000000,"25-44":78000000,"35-54":55000000,"55+":32000000}, "India": {all:400000000,"18-24":95000000,"25-34":130000000,"25-44":200000000,"35-54":95000000,"55+":28000000}, "Germany": {all:32000000,"18-24":5000000,"25-34":7200000,"25-44":13500000,"35-54":9500000,"55+":5200000}, "Australia": {all:18000000,"18-24":3000000,"25-34":4200000,"25-44":7800000,"35-54":5200000,"55+":2800000}, "Singapore": {all:4500000,"18-24":750000,"25-34":1200000,"25-44":2000000,"35-54":1300000,"55+":450000} },
    TikTok: { "UAE": {all:8200000,"18-24":2800000,"25-34":2600000,"25-44":3800000,"35-54":1200000,"55+":200000}, "KSA": {all:22000000,"18-24":8000000,"25-34":7500000,"25-44":10500000,"35-54":3200000,"55+":400000}, "UK": {all:24000000,"18-24":8500000,"25-34":7200000,"25-44":10500000,"35-54":4000000,"55+":800000}, "US": {all:120000000,"18-24":42000000,"25-34":35000000,"25-44":52000000,"35-54":18000000,"55+":4000000}, "India": {all:280000000,"18-24":95000000,"25-34":85000000,"25-44":120000000,"35-54":35000000,"55+":5000000} },
    Snapchat: { "UAE": {all:4500000,"18-24":1800000,"25-34":1400000,"25-44":2000000,"35-54":500000}, "KSA": {all:18000000,"18-24":7500000,"25-34":5500000,"25-44":8000000,"35-54":2000000}, "Kuwait": {all:3200000,"18-24":1300000,"25-34":1000000,"25-44":1500000,"35-54":400000}, "UK": {all:18000000,"18-24":7000000,"25-34":5200000,"25-44":7500000,"35-54":2200000}, "US": {all:95000000,"18-24":35000000,"25-34":28000000,"25-44":40000000,"35-54":12000000} },
    YouTube: { "UAE": {all:8500000,"18-24":1800000,"25-34":2800000,"25-44":4500000,"35-54":2200000,"55+":500000}, "KSA": {all:24000000,"18-24":5500000,"25-34":8000000,"25-44":12500000,"35-54":6000000,"55+":1200000}, "UK": {all:48000000,"18-24":8000000,"25-34":10500000,"25-44":19000000,"35-54":14000000,"55+":8000000}, "US": {all:210000000,"18-24":35000000,"25-34":45000000,"25-44":82000000,"35-54":58000000,"55+":35000000} },
    LinkedIn: { "UAE": {all:6200000,"18-24":600000,"25-34":2500000,"25-44":4200000,"35-54":1400000,"55+":200000}, "KSA": {all:8500000,"18-24":800000,"25-34":3200000,"25-44":5500000,"35-54":2000000,"55+":300000}, "UK": {all:35000000,"18-24":3000000,"25-34":12000000,"25-44":22000000,"35-54":8500000,"55+":2000000}, "US": {all:100000000,"18-24":8000000,"25-34":32000000,"25-44":58000000,"35-54":25000000,"55+":8000000} },
    "Google Search": { "UAE": {all:9500000}, "KSA": {all:28000000}, "UK": {all:55000000}, "US": {all:270000000}, "India": {all:600000000} },
  };

  const getAudienceSize = (platform, markets, ageRange) => {
    let total = 0;
    (markets || []).forEach(market => {
      const platData = AUDIENCE_SIZES[platform];
      if (platData && platData[market]) {
        total += platData[market][ageRange] || platData[market]["all"] || 0;
      }
    });
    return total;
  };

  const autoFillAudience = (idx) => {
    setAudienceData(prev => prev.map((row, i) => {
      if (i !== idx) return row;
      const size = getAudienceSize(row.platform, row.markets, row.ageRange);
      return { ...row, estimatedSize: size > 0 ? size.toLocaleString() : "" };
    }));
  };
  const contentRef = useRef(null);

  const toggleCheck = (key) => setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }));

  const totalChecks = Object.values(qaChecklist).flat().length;
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;

  useEffect(() => { if (contentRef.current) contentRef.current.scrollTop = 0; }, [activeSection]);

  // ── SET YOUR CREDENTIALS HERE ──
  if (authLoading) {
    return (
      <div style={{ minHeight: "100vh", background: "#f5f5f7", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <div style={{ textAlign: "center" }}>
          <div style={{ width: 40, height: 40, border: "3px solid #e0e0e8", borderTopColor: "#2D1768", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto" }} />
          <div style={{ fontSize: 12, color: "#6a6a7e", marginTop: 12 }}>Loading...</div>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div style={{ minHeight: "100vh", background: "#f5f5f7", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <div style={{ width: 400, padding: 40, background: "#ffffff", borderRadius: 16, border: "1px solid #e0e0e8", boxShadow: "0 20px 60px rgba(0,0,0,.05)", borderTop: "3px solid #7AC143" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ marginBottom: 12, display: "flex", justifyContent: "center" }}><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARgAAAB6CAYAAABkxUxpAAABCGlDQ1BJQ0MgUHJvZmlsZQAAeJxjYGA8wQAELAYMDLl5JUVB7k4KEZFRCuwPGBiBEAwSk4sLGHADoKpv1yBqL+viUYcLcKakFicD6Q9ArFIEtBxopAiQLZIOYWuA2EkQtg2IXV5SUAJkB4DYRSFBzkB2CpCtkY7ETkJiJxcUgdT3ANk2uTmlyQh3M/Ck5oUGA2kOIJZhKGYIYnBncAL5H6IkfxEDg8VXBgbmCQixpJkMDNtbGRgkbiHEVBYwMPC3MDBsO48QQ4RJQWJRIliIBYiZ0tIYGD4tZ2DgjWRgEL7AwMAVDQsIHG5TALvNnSEfCNMZchhSgSKeDHkMyQx6QJYRgwGDIYMZAKbWPz9HbOBQAAAUc0lEQVR42u2de4zdxXXHP2dmfvexXr+xjbHBLm+ckPAmNCrrOGlSEEnEH5e0UlWllZq+o1aKVLVpsixqkrb5M6latapSKVIJXMiTUtIGxJIoDSS8wQn4gSHgF/Yae+3du/f+Zk7/+P12bQxJWXv37t3lfKzrte/ex+93ZuY758zMmQHDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMIyZQbr8fQ4a0ntmaKbyHzrHFzKH9mkqkGbmswYdbBVoAo25KEvt8XZXlvOc2GcGy9mYltYOom6AwTDAQCgaiXU4hjFfKpTrY+OlGmLWAbI5vOnOif/JO+TsfRF47eRfCY7r+UwYZijNsuoLoFXOPs/BckJ3LDR5s1lel0j+Wpud2yav5TQ+NmRsuDSEmofDQN/JZp2le+nQl2ck8l1H2XNgBu5j1sq5jzPWtkN9HXTIulnOBEl5PDjBSzu7ZZ8uCEzDQzMu5fzL12bXPlZjNVEDTiMqcY7K2aMoEAvdUEaidkZx7WdzPby1E1tPHmDnI6P87Pkppx91Q2x2MJzPUhksOif76M+Wu43rNOqsF01RuxQVIUuBlhwZP5D/6Nr9PP104b0NpVMp57Xhyvcul6t/ELQPR5ukNZBOF8pU8S5wRHZ9bcfE13+rQcM3acYeExeAZRdXGk/WdP3ZkQ6ivitfnRACgXG3c+9z7e9tgsOvdWNYIHTLuu0wXq3papbm58dIxzkSylxFIa606+TDrUD8Co1pg4reGGWCJe6i2Nb3Pd5i3zdH0v3/MYS8AKRCaIQZ9mgUqNXT6qVL8osVbSmIzL7AFDcRIAX/av2A1zOJPF2Mn5yiZbWvukTXahaXJaHjlGop5LNODNLnJ9zY2lLwKMY4ekpgEtT6q3H1uuXxEs0Zm/2ehKKqKi55FjnCuMLhCRAFnfXv7prAdECjZkQ6kjgmiQo6R2NNMiXak/aNmjRXISokdcDSuC4gtava7leuWuLP+fSY7nloP880h5L8W/GegQDDcWZ6AAFUlZaqtiQnR7ogMIIS8YBKRzoaVWfA1RDNiSKoCFGggxJnvR0piKMl3nU69JLf8gZaKZfYbstYLdECDdIVbZOWOK1JStW8KzFrtwUmAxwRh5LIgIDQOSkUlDfx2uRNOvs3+51O4/V68jvFgYCbcllzVNExlejSYrexvpiNH1rszv7QqFz0oT3xqVuPMrxVELToBWbCzUyQtRBZLJqQKS9rNuxSdJyF4wxCAERy8hmo7HnpI2r5zXkp6G6aZXT8Ot/6ax0R1/MD1U4rIurLq08ntIGZtouW3YggKggtXFHGXbNRV2MUlYjiytCoc8J9nnzP8ibP/X+/m87rC6Pr64pFy1GJVHpWKiBO0JDShMbUjvV8Y75Gr29sqAw8vMa/73OKVos3Nk4nkNYGd3jgUMX1P+3UAZJm1y6T/osH0VLMZqbO5eRT4pXKz5SpanYq1/5WXwuKQ7TXZ6jrKAlHfpLdZ8MuUjbyCISyzvtuDL3MjcDMX5wIeKEVSMQVncv6N/Ibf32u/8gPgTXQjEXIdPrhhdnaWFAtx0wwnZGbHBjz6JhWo++sZfMVF/tPfH8p6zYXs0sDwexkGCYwpxDeKUk8kSoJL5GUEYlr0rsuWO9vvHcll7y/EJmGN2sZhgnMNIMXQbTwY4o4JiDkvq3jcaleVj8r/Oo9S7lwSxEumcgYRtFKjOn6MuXPhBIRwackqZ8ra2c5d3eWRjYd4K49pXhbzodhHoxxKjIjKBUgIjLqNLXiKt61bIX/wH+BVhrc2dXpQMMwD2bBeTIetI7IBB58TMSV/qp3b/CHvtyMt3yiB5er/7IgEI/zAwyGVxjx6xicljhOvmcb3327hodlh9IQ2C8DbH7dL4+yR/pZ6x7hS/J26tdNYE6ZdILIVMr1PeJd0nyVvOf3Jxj/ZpPmvZM5Or0pkQmnQiIALVrx1UPDDOVAvn36H5dvB1bKVYchJ4qWY1aCLmhRabgGDe7iY1FRnUxPGGb4F72nE11LJBbWMYExfkmHBZQLy5RYrA9WlUV6hi7z67+4N/JQA8abPZnZK2WEHElE8dRYK5v/XJx70eEEkp4opW8WU7/+eSeJpES9XFyGIlJ06ZMCs5BkpuEbNGjysQjN2CxEJdSoresP79zoUt9lNVm+qpJqiivyfSL56ojkuY6el+miSpI8oeoWusiYwMyY0ICQo1R9op2v0Es3rXe/9kfN1PziAANheOazsGcAT5I2aFtCXMGZXPfbpNN03yURkyIEKVbzdimfrysMOuVWFWRSVOpn+utuqrHxI1Xtu6bqauszXdKXyRK8Vov7TsclWKRNlAk01ojq3IL27UxgZh6HI5ecpN4FXZz63Lmfgp/cPsyDrxTpTr00q5QQEqoZSMKrI5HiiZ7LqcVdKp7gi3SLMld7/jckaXCna3JLFIZYziU39LuLfm+RnHP1Yl21ocYSXJJy5w8SSIq0SaV3OyXn6vDURVFfJKYILHCRMYGZUV+myLFKEhw6ni+TC1avdpd9fH+Svx1gwA8z3EMCM5mJVQHNERIO52fGDhEWzNhLw8NdscktcTnnvneZu/q2Ze7sLf1xDWiFpBojbU2oU1SSiFNR59Th1E35b0oqx6U8jg7FMoeFPwZj09QzSERxGhDNSeDqsa5LZePHgdpDPNRjIZIUyYHk5UYlxRLCE3fJOdVHMfw9mUE9H7bIfXOKrVObEXT5Rv/hf9oYbh5ez3Vb+vJ1KSoxajspbQ8ExTnw4lTwyRW7rZwg5SCIpqIDWvB+i3kw3fAQXFKou7POq8RLzm7z022ntlPcXHg25oyCMozka7jiljP8lZ9bLO84P+QVTRyNCv6NWdD6Fmz59lsWZR7MrNVQIaJxUTyTte6C9wM0eIctvJsHRVcmhej6MPCZdeF9dyxPV5zv4pEcOShC1YutnzSB6Q1fQDXTjIquuMVsPT/agyCqaH29u+E/1zJw26K4ISYdTYlaiNRJtLAMEAuResSLiR6tU/WLLyZSafKxFrwNpg7maXEpqoLUNoQP3LNWB7aEvJ5H2gFCuVNPLDsOb0VoHkwPeDAiomgKkq1cmm24pKiUDbN5D4pLg4YTxJ/tPnjPWt2yJcQlHZgIKjlKmhoMf/3Wn4YJzJwqTLFStqKLK/3p4qVmkN5kgAHfpBnXyfVfWCfveX8WF3eEsQxyUI9geasmMD0aJCkxhdRP0nBNUZk3WU3tKRp+mOF8pb/so6vDNZ+qxDPyxFgWpU0kw+EQ81hMYHrYjUGoUNW6eTC92ANwZwL6z+CKr/TlF6ScCZ/IUK0AHpjtQz1NYIxTr73lvjGCdyE3i/SY70LDgejZ4YZ/XcGm5egRBREhlqUWOb6k3zCB6VEPplzfarW0x0KjJs24kgu3rJArftMlHx1j3tnEqgnMvBMXURLRAvkeYpA7Fagud++6dXE8Q9EcZRGJDjZLZAIzj8KkIsOnkyYys0avMBCGkLTcX7R5idvwa6SUIPgobVS8NQsTmPnivzgElUSbjkzsBRjmQTPMXAdH/IkCnCEXNRbF9RpJKDmioUxINA/GBGaeeC+Cl46MEt1rTxTPrrbaO8fF0uSWCCvWBT3rd1RFoDyQ3BZZm8DML5IiXjocOXI0376reK5pNXhu/RcHcI5/90VL9LxMiWqj7yYw81ZhhCBo9ZEWh14aLJb22qKKOQ2PGgDUZdnv1qiokqKt0jWBmachUlCVXI/pS3sBttK0mjzn4VEjASGkNdegTiBaGzCBmY8o4KUlh2XMbf8WQLlRtDGXmo/oomzNxUFqG1Nxzoi1AROYeaowon6U3fv2xkf/p3DDmxYezW2AJADL/aYVVemvKLnpiwnMfMVHpEOLV+4ADg/w2QWxvf58ZoD9AqDtRZf5tBjomMCYwMwnY07uH5/UE9w4e9uH4/P/DMhwz+/F+3ZgMwCZVs/0mgFOTfNNYOYRxd78IiHicEd15+0jbPtpgztt9qiHqLpqBymPzBUrFhOYeUIuipBpphU34nbmI/rE50GlybPWTfYQwQWx6TwTmHnG5DlAGvNwxB3R5/7uAC883+CWeXBUydvMz0zJAqNuibmZYOa0OqgmnIT9uu2Vn8f7hgrvxXzwnvM0U16OvZgfYx5MT3ssik6dXpg0UE9H3M8n9sXH/hAkh1stuaUHOcZEJZWnWqp6M4gJTK+azlPsfpbwZPmRcCgcSD/6+ChP3QPXBwuNeothtiqASv5UlGMINhRjAtPTHkxebAgt/Z1WGMv264//fnf636/BJzIYti0ye5QJ9+LOjh9JEMQ29DaB6VEESOrIOm1/JHuZBx54OX77r4rzp//FxKUnaSYQRvKnnuuk8dcQ5yCZwpjA9IKcCCo5UQACgTwFqTPmj2W748Nf3pPffxMMCgxNbsJr9KDbOUhywGhHj+10KIgNwpvA9IrEaAVPBNq5upo7HHbEl/W7n3xFv/1ngoybuPQ+D3KrA2JbX/3vSELUWXmZwMw9SXIVOnmm/aTgwx7/xPZt6f4P70s/+BIMBkVtxmgeMFyuqD6kL99+1B1ERIIVmwnMTHnI03plsV23JnC516qoq4aDYVtnt37/c9s7/371WNx63wADAYZyE5f5wlAShEM8tW2MHTsEUcsXMIE5rdBmsu0roTwIbUo8yj+U61kAVAVNAXJPNXpqTlwKY+6l9og8/JUX8u9c+VL81t+AvDZ57Oj8ts3rHS89zT8n27wXuZ7rAzBxTF/6SpSOyJTAmBM60yzwlbwKhHIqOSGa5Uobocbx3EOd+il4Jzgn4gTJXUteY5x9O8Zk91f35T+5+xgvPwPQ4E7f5JYEzbgw+peIw6G4KKfZwgQEkk8kIOP4wXO9FCYNJ0B2px/fvjRc9OlVaVM1Iqqo2PpeE5hpVXchlmttBXGd4KiV1T1SHk5fHhIayd1hch0daen4gZYcu2+U7T8YiY9+B2idICxa7Eq/EOgUs2N4ouQ48V5Os3kVm1VERDOE1KvHrqZGcbLjzom087aOv/ALPvZHx5hP5UlWJjMmMG+5wucS9IjfpaO6/auBZS8Xx7hGTSSUpIk2E3rkYOLoYwfi488Ch4F8UqQa3LHAhOV4eCREIGjbHZP9+sy9TsLjDhHQKbcj/YKY+vXPiyRUUb18lXvnjZVYV2FCitCz90KPJs0Eg25nGvrHLNv4x6v0snUkl4Ro00omMNNpRqqeTNocar8U7/1T4Ogv7teO+z3X89lQLC1vpoUlLMcDQvCFJydeczkqr8Znbx3n+R+fzueu5KqrV2YX3igxU2hJEkXU0YMrZhW2OmB0RJ74i8XurLuqaU2udFzRLExmTGDeYkMSLZbG1Vi+4lo+2XqVrW4Vm9Lr4/IHKQ5FayZFGS5mhhay8BaaKg6vIJJR99Wl18TB8Aojfh0rpiWqk+/Z5u9fKhqANhHBKWWo1Is04yCDbqg99PWanPXw+jBwreSuUNxiTA5H56RJAMME5o1dFaC0OBRL4bAd5srAJU2ONagj0i7t09DtfGmaXlvxnjVcE4slQcX4S6+PZAwxhKKIys11XfPdNXL1paqjEZIv5tTC1DyjMX1Mlo23O0kQB7JnT7yvcdA/Mq6uLko9FcO90SxkAmMYp0WE68Mou5/bpw/fdMg/6dQFp/gkbzqjZN6MCYxhTIvhHAbdwbj1gX3pRzcf8Y+NI8FBiEib4syIyVCpYuYygTGM6TKU4MrsYHzmmz/v3HfTfv/EURwereSODo4ABFRaZioTmPmI2uquOefRDgyEw7zywK78O1fvlR8+k5wGkaCKRgeIFZMJzJs03p6/QsF3rEr2SrjU8G0O/mxHvHvzXnfPX46EFzT6ioc8CkQbh+lJgZlc0dmtwtETbrN3Z+Q30VCgmuuxNeU1S3esc0JZSLEF6MwUc5n2KN1uhDNZt5qxqDhycFf+4D+80Lnvmv3yve+13CHvpOZdMQ6TKzEqScuN30+6Aj3pMZdd69ysyuhiqxN1KiqlyHRn4ZIg5CDj5bYLvem4DOESsDjqsfPLpfUy2zk8UuZhiWqZYZ4Ucj39ChVQVBMZwgRK1pV8JJ3swCTOZEtOoNKg4Zo0H92R7/j1Fey6eZk7/w/6/ZoP1vXckKXloBNAJyqiRRqKSCnf8vrOYq5CK4/QBjK0SAHRbqVvdE1glBREVISQAqLdSoRTMhyL8FDv9ZBQCE6oaujKPrECBJQkHiHTqnjq2enb27mgmQQkoTWFTMreU2dZYNRRTWjfTJexNmlGGHTCbWmEJ78xkp78Rp8/6/JVXHfDYr96S0UXba7qKu/J8JrhVEhTHuLcx1KFlFRVqKhIChRp7l0Jx7sgMJsUkJTXXj2a7TuaQt4fk8NJ3hWBSaBe+mjLoW0UeUi9lnmn8FkHQ6Ntf3DrYffsVTHlIrPuwRTkolRQmWB8QmO294QyOyVySWOjsisPsieo+qnMdSHIbJpd0eAl46i8XMZ5zRn+hqFS9Rt+kDt1qCOPv8jdjwOfX8y6C5a7Tdc6V9lcY81aTbV3VunTJGPnCE7m9pC30leV5L3WGXe768Rlq+C1l7rRFqRrdwlaZfW5jrgSsq418JyJFlnbdTrHdgFH6M1dhQTQRaxZnVh0TpHMnXXhazvkuE4FFzv4dpvdz5+mfQSgwhkXeMKSwv7agrYEqtXZtp+n1tdG9rZ54fkulLMbYNA9yK1R3jjYlBV/LbowUKsXzkLWpTL9RSXdISOTRByZ4NUdLMDdtWxuz8pooeIGGAgDDIZB1L1h6MXoXkEAHhq++Dnbj4Yvv9PNkxKX7tlm6uFOeMxGOZef3ehmefeCUMtxO/TKo2fsYxiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGMW3+DxPH1UarOO5ZAAAAAElFTkSuQmCC" alt="PHD" style={{ width: 140, height: "auto" }} /></div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#7AC143", letterSpacing: "0.05em" }}>Intelligence. Connected.</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: "#1a1a2e", marginTop: 6 }}>Global Media Planning Playbook</div>
            <div style={{ fontSize: 11, color: "#7a7a8a", marginTop: 8 }}>Sign in with your agency Google account</div>
          </div>

          {pendingApproval ? (
            <div style={{ textAlign: "center", padding: 20 }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>⏳</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#1a1a2e", marginBottom: 8 }}>Approval Pending</div>
              <div style={{ fontSize: 12, color: "#6a6a7e", lineHeight: 1.6, marginBottom: 16 }}>Your account ({authUser?.email}) has been registered. An admin needs to approve your access before you can use the playbook.</div>
              <div style={{ fontSize: 11, color: "#9a9aaa" }}>Contact your team lead for access approval.</div>
              <button onClick={signOut} style={{ marginTop: 16, padding: "8px 20px", borderRadius: 8, border: "1px solid #d0d0d8", background: "transparent", color: "#6a6a7e", fontSize: 11, cursor: "pointer", fontFamily: "inherit" }}>Sign out</button>
            </div>
          ) : (
            <div>
              <button onClick={signInWithGoogle} style={{ width: "100%", padding: "12px", borderRadius: 8, border: "1px solid #e0e0e8", background: "#ffffff", color: "#1a1a2e", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, boxShadow: "0 2px 8px rgba(0,0,0,.06)" }}>
                <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                Sign in with Google
              </button>
              <div style={{ fontSize: 9, color: "#2D176840", textAlign: "center", marginTop: 20 }}>PHD Media | Internal Use Only</div>
            </div>
          )}
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
        @keyframes confettiFall { 0% { transform: translateY(-20px) rotate(0deg); opacity: 1; } 100% { transform: translateY(100vh) rotate(720deg); opacity: 0; } }
        @keyframes pikaJump { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
      `}</style>

      {/* Mobile nav toggle */}
      <button onClick={() => setMobileNav(!mobileNav)} style={{ position: "fixed", top: 12, left: 12, zIndex: 1000, display: "none", background: "#ffffff", border: "1px solid #e0e0e8", borderRadius: 8, color: "#1a1a2e", padding: "8px 12px", fontSize: 18, cursor: "pointer", "@media(maxWidth:768px)": { display: "block" } }}>☰</button>

      {/* Sidebar */}
      <nav style={{ width: 240, minWidth: 240, background: "#f9f9fb", borderRight: "1px solid #e5e5ea", display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ padding: "20px 16px 12px", borderBottom: "1px solid #e5e5ea" }}>
          <div style={{ marginBottom: 12 }}><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARgAAAB6CAYAAABkxUxpAAABCGlDQ1BJQ0MgUHJvZmlsZQAAeJxjYGA8wQAELAYMDLl5JUVB7k4KEZFRCuwPGBiBEAwSk4sLGHADoKpv1yBqL+viUYcLcKakFicD6Q9ArFIEtBxopAiQLZIOYWuA2EkQtg2IXV5SUAJkB4DYRSFBzkB2CpCtkY7ETkJiJxcUgdT3ANk2uTmlyQh3M/Ck5oUGA2kOIJZhKGYIYnBncAL5H6IkfxEDg8VXBgbmCQixpJkMDNtbGRgkbiHEVBYwMPC3MDBsO48QQ4RJQWJRIliIBYiZ0tIYGD4tZ2DgjWRgEL7AwMAVDQsIHG5TALvNnSEfCNMZchhSgSKeDHkMyQx6QJYRgwGDIYMZAKbWPz9HbOBQAAAUc0lEQVR42u2de4zdxXXHP2dmfvexXr+xjbHBLm+ckPAmNCrrOGlSEEnEH5e0UlWllZq+o1aKVLVpsixqkrb5M6latapSKVIJXMiTUtIGxJIoDSS8wQn4gSHgF/Yae+3du/f+Zk7/+P12bQxJWXv37t3lfKzrte/ex+93ZuY758zMmQHDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMIyZQbr8fQ4a0ntmaKbyHzrHFzKH9mkqkGbmswYdbBVoAo25KEvt8XZXlvOc2GcGy9mYltYOom6AwTDAQCgaiXU4hjFfKpTrY+OlGmLWAbI5vOnOif/JO+TsfRF47eRfCY7r+UwYZijNsuoLoFXOPs/BckJ3LDR5s1lel0j+Wpud2yav5TQ+NmRsuDSEmofDQN/JZp2le+nQl2ck8l1H2XNgBu5j1sq5jzPWtkN9HXTIulnOBEl5PDjBSzu7ZZ8uCEzDQzMu5fzL12bXPlZjNVEDTiMqcY7K2aMoEAvdUEaidkZx7WdzPby1E1tPHmDnI6P87Pkppx91Q2x2MJzPUhksOif76M+Wu43rNOqsF01RuxQVIUuBlhwZP5D/6Nr9PP104b0NpVMp57Xhyvcul6t/ELQPR5ukNZBOF8pU8S5wRHZ9bcfE13+rQcM3acYeExeAZRdXGk/WdP3ZkQ6ivitfnRACgXG3c+9z7e9tgsOvdWNYIHTLuu0wXq3papbm58dIxzkSylxFIa606+TDrUD8Co1pg4reGGWCJe6i2Nb3Pd5i3zdH0v3/MYS8AKRCaIQZ9mgUqNXT6qVL8osVbSmIzL7AFDcRIAX/av2A1zOJPF2Mn5yiZbWvukTXahaXJaHjlGop5LNODNLnJ9zY2lLwKMY4ekpgEtT6q3H1uuXxEs0Zm/2ehKKqKi55FjnCuMLhCRAFnfXv7prAdECjZkQ6kjgmiQo6R2NNMiXak/aNmjRXISokdcDSuC4gtava7leuWuLP+fSY7nloP880h5L8W/GegQDDcWZ6AAFUlZaqtiQnR7ogMIIS8YBKRzoaVWfA1RDNiSKoCFGggxJnvR0piKMl3nU69JLf8gZaKZfYbstYLdECDdIVbZOWOK1JStW8KzFrtwUmAxwRh5LIgIDQOSkUlDfx2uRNOvs3+51O4/V68jvFgYCbcllzVNExlejSYrexvpiNH1rszv7QqFz0oT3xqVuPMrxVELToBWbCzUyQtRBZLJqQKS9rNuxSdJyF4wxCAERy8hmo7HnpI2r5zXkp6G6aZXT8Ot/6ax0R1/MD1U4rIurLq08ntIGZtouW3YggKggtXFHGXbNRV2MUlYjiytCoc8J9nnzP8ibP/X+/m87rC6Pr64pFy1GJVHpWKiBO0JDShMbUjvV8Y75Gr29sqAw8vMa/73OKVos3Nk4nkNYGd3jgUMX1P+3UAZJm1y6T/osH0VLMZqbO5eRT4pXKz5SpanYq1/5WXwuKQ7TXZ6jrKAlHfpLdZ8MuUjbyCISyzvtuDL3MjcDMX5wIeKEVSMQVncv6N/Ibf32u/8gPgTXQjEXIdPrhhdnaWFAtx0wwnZGbHBjz6JhWo++sZfMVF/tPfH8p6zYXs0sDwexkGCYwpxDeKUk8kSoJL5GUEYlr0rsuWO9vvHcll7y/EJmGN2sZhgnMNIMXQbTwY4o4JiDkvq3jcaleVj8r/Oo9S7lwSxEumcgYRtFKjOn6MuXPhBIRwackqZ8ra2c5d3eWRjYd4K49pXhbzodhHoxxKjIjKBUgIjLqNLXiKt61bIX/wH+BVhrc2dXpQMMwD2bBeTIetI7IBB58TMSV/qp3b/CHvtyMt3yiB5er/7IgEI/zAwyGVxjx6xicljhOvmcb3327hodlh9IQ2C8DbH7dL4+yR/pZ6x7hS/J26tdNYE6ZdILIVMr1PeJd0nyVvOf3Jxj/ZpPmvZM5Or0pkQmnQiIALVrx1UPDDOVAvn36H5dvB1bKVYchJ4qWY1aCLmhRabgGDe7iY1FRnUxPGGb4F72nE11LJBbWMYExfkmHBZQLy5RYrA9WlUV6hi7z67+4N/JQA8abPZnZK2WEHElE8dRYK5v/XJx70eEEkp4opW8WU7/+eSeJpES9XFyGIlJ06ZMCs5BkpuEbNGjysQjN2CxEJdSoresP79zoUt9lNVm+qpJqiivyfSL56ojkuY6el+miSpI8oeoWusiYwMyY0ICQo1R9op2v0Es3rXe/9kfN1PziAANheOazsGcAT5I2aFtCXMGZXPfbpNN03yURkyIEKVbzdimfrysMOuVWFWRSVOpn+utuqrHxI1Xtu6bqauszXdKXyRK8Vov7TsclWKRNlAk01ojq3IL27UxgZh6HI5ecpN4FXZz63Lmfgp/cPsyDrxTpTr00q5QQEqoZSMKrI5HiiZ7LqcVdKp7gi3SLMld7/jckaXCna3JLFIZYziU39LuLfm+RnHP1Yl21ocYSXJJy5w8SSIq0SaV3OyXn6vDURVFfJKYILHCRMYGZUV+myLFKEhw6ni+TC1avdpd9fH+Svx1gwA8z3EMCM5mJVQHNERIO52fGDhEWzNhLw8NdscktcTnnvneZu/q2Ze7sLf1xDWiFpBojbU2oU1SSiFNR59Th1E35b0oqx6U8jg7FMoeFPwZj09QzSERxGhDNSeDqsa5LZePHgdpDPNRjIZIUyYHk5UYlxRLCE3fJOdVHMfw9mUE9H7bIfXOKrVObEXT5Rv/hf9oYbh5ez3Vb+vJ1KSoxajspbQ8ExTnw4lTwyRW7rZwg5SCIpqIDWvB+i3kw3fAQXFKou7POq8RLzm7z022ntlPcXHg25oyCMozka7jiljP8lZ9bLO84P+QVTRyNCv6NWdD6Fmz59lsWZR7MrNVQIaJxUTyTte6C9wM0eIctvJsHRVcmhej6MPCZdeF9dyxPV5zv4pEcOShC1YutnzSB6Q1fQDXTjIquuMVsPT/agyCqaH29u+E/1zJw26K4ISYdTYlaiNRJtLAMEAuResSLiR6tU/WLLyZSafKxFrwNpg7maXEpqoLUNoQP3LNWB7aEvJ5H2gFCuVNPLDsOb0VoHkwPeDAiomgKkq1cmm24pKiUDbN5D4pLg4YTxJ/tPnjPWt2yJcQlHZgIKjlKmhoMf/3Wn4YJzJwqTLFStqKLK/3p4qVmkN5kgAHfpBnXyfVfWCfveX8WF3eEsQxyUI9geasmMD0aJCkxhdRP0nBNUZk3WU3tKRp+mOF8pb/so6vDNZ+qxDPyxFgWpU0kw+EQ81hMYHrYjUGoUNW6eTC92ANwZwL6z+CKr/TlF6ScCZ/IUK0AHpjtQz1NYIxTr73lvjGCdyE3i/SY70LDgejZ4YZ/XcGm5egRBREhlqUWOb6k3zCB6VEPplzfarW0x0KjJs24kgu3rJArftMlHx1j3tnEqgnMvBMXURLRAvkeYpA7Fagud++6dXE8Q9EcZRGJDjZLZAIzj8KkIsOnkyYys0avMBCGkLTcX7R5idvwa6SUIPgobVS8NQsTmPnivzgElUSbjkzsBRjmQTPMXAdH/IkCnCEXNRbF9RpJKDmioUxINA/GBGaeeC+Cl46MEt1rTxTPrrbaO8fF0uSWCCvWBT3rd1RFoDyQ3BZZm8DML5IiXjocOXI0376reK5pNXhu/RcHcI5/90VL9LxMiWqj7yYw81ZhhCBo9ZEWh14aLJb22qKKOQ2PGgDUZdnv1qiokqKt0jWBmachUlCVXI/pS3sBttK0mjzn4VEjASGkNdegTiBaGzCBmY8o4KUlh2XMbf8WQLlRtDGXmo/oomzNxUFqG1Nxzoi1AROYeaowon6U3fv2xkf/p3DDmxYezW2AJADL/aYVVemvKLnpiwnMfMVHpEOLV+4ADg/w2QWxvf58ZoD9AqDtRZf5tBjomMCYwMwnY07uH5/UE9w4e9uH4/P/DMhwz+/F+3ZgMwCZVs/0mgFOTfNNYOYRxd78IiHicEd15+0jbPtpgztt9qiHqLpqBymPzBUrFhOYeUIuipBpphU34nbmI/rE50GlybPWTfYQwQWx6TwTmHnG5DlAGvNwxB3R5/7uAC883+CWeXBUydvMz0zJAqNuibmZYOa0OqgmnIT9uu2Vn8f7hgrvxXzwnvM0U16OvZgfYx5MT3ssik6dXpg0UE9H3M8n9sXH/hAkh1stuaUHOcZEJZWnWqp6M4gJTK+azlPsfpbwZPmRcCgcSD/6+ChP3QPXBwuNeothtiqASv5UlGMINhRjAtPTHkxebAgt/Z1WGMv264//fnf636/BJzIYti0ye5QJ9+LOjh9JEMQ29DaB6VEESOrIOm1/JHuZBx54OX77r4rzp//FxKUnaSYQRvKnnuuk8dcQ5yCZwpjA9IKcCCo5UQACgTwFqTPmj2W748Nf3pPffxMMCgxNbsJr9KDbOUhywGhHj+10KIgNwpvA9IrEaAVPBNq5upo7HHbEl/W7n3xFv/1ngoybuPQ+D3KrA2JbX/3vSELUWXmZwMw9SXIVOnmm/aTgwx7/xPZt6f4P70s/+BIMBkVtxmgeMFyuqD6kL99+1B1ERIIVmwnMTHnI03plsV23JnC516qoq4aDYVtnt37/c9s7/371WNx63wADAYZyE5f5wlAShEM8tW2MHTsEUcsXMIE5rdBmsu0roTwIbUo8yj+U61kAVAVNAXJPNXpqTlwKY+6l9og8/JUX8u9c+VL81t+AvDZ57Oj8ts3rHS89zT8n27wXuZ7rAzBxTF/6SpSOyJTAmBM60yzwlbwKhHIqOSGa5Uobocbx3EOd+il4Jzgn4gTJXUteY5x9O8Zk91f35T+5+xgvPwPQ4E7f5JYEzbgw+peIw6G4KKfZwgQEkk8kIOP4wXO9FCYNJ0B2px/fvjRc9OlVaVM1Iqqo2PpeE5hpVXchlmttBXGd4KiV1T1SHk5fHhIayd1hch0daen4gZYcu2+U7T8YiY9+B2idICxa7Eq/EOgUs2N4ouQ48V5Os3kVm1VERDOE1KvHrqZGcbLjzom087aOv/ALPvZHx5hP5UlWJjMmMG+5wucS9IjfpaO6/auBZS8Xx7hGTSSUpIk2E3rkYOLoYwfi488Ch4F8UqQa3LHAhOV4eCREIGjbHZP9+sy9TsLjDhHQKbcj/YKY+vXPiyRUUb18lXvnjZVYV2FCitCz90KPJs0Eg25nGvrHLNv4x6v0snUkl4Ro00omMNNpRqqeTNocar8U7/1T4Ogv7teO+z3X89lQLC1vpoUlLMcDQvCFJydeczkqr8Znbx3n+R+fzueu5KqrV2YX3igxU2hJEkXU0YMrZhW2OmB0RJ74i8XurLuqaU2udFzRLExmTGDeYkMSLZbG1Vi+4lo+2XqVrW4Vm9Lr4/IHKQ5FayZFGS5mhhay8BaaKg6vIJJR99Wl18TB8Aojfh0rpiWqk+/Z5u9fKhqANhHBKWWo1Is04yCDbqg99PWanPXw+jBwreSuUNxiTA5H56RJAMME5o1dFaC0OBRL4bAd5srAJU2ONagj0i7t09DtfGmaXlvxnjVcE4slQcX4S6+PZAwxhKKIys11XfPdNXL1paqjEZIv5tTC1DyjMX1Mlo23O0kQB7JnT7yvcdA/Mq6uLko9FcO90SxkAmMYp0WE68Mou5/bpw/fdMg/6dQFp/gkbzqjZN6MCYxhTIvhHAbdwbj1gX3pRzcf8Y+NI8FBiEib4syIyVCpYuYygTGM6TKU4MrsYHzmmz/v3HfTfv/EURwereSODo4ABFRaZioTmPmI2uquOefRDgyEw7zywK78O1fvlR8+k5wGkaCKRgeIFZMJzJs03p6/QsF3rEr2SrjU8G0O/mxHvHvzXnfPX46EFzT6ioc8CkQbh+lJgZlc0dmtwtETbrN3Z+Q30VCgmuuxNeU1S3esc0JZSLEF6MwUc5n2KN1uhDNZt5qxqDhycFf+4D+80Lnvmv3yve+13CHvpOZdMQ6TKzEqScuN30+6Aj3pMZdd69ysyuhiqxN1KiqlyHRn4ZIg5CDj5bYLvem4DOESsDjqsfPLpfUy2zk8UuZhiWqZYZ4Ucj39ChVQVBMZwgRK1pV8JJ3swCTOZEtOoNKg4Zo0H92R7/j1Fey6eZk7/w/6/ZoP1vXckKXloBNAJyqiRRqKSCnf8vrOYq5CK4/QBjK0SAHRbqVvdE1glBREVISQAqLdSoRTMhyL8FDv9ZBQCE6oaujKPrECBJQkHiHTqnjq2enb27mgmQQkoTWFTMreU2dZYNRRTWjfTJexNmlGGHTCbWmEJ78xkp78Rp8/6/JVXHfDYr96S0UXba7qKu/J8JrhVEhTHuLcx1KFlFRVqKhIChRp7l0Jx7sgMJsUkJTXXj2a7TuaQt4fk8NJ3hWBSaBe+mjLoW0UeUi9lnmn8FkHQ6Ntf3DrYffsVTHlIrPuwRTkolRQmWB8QmO294QyOyVySWOjsisPsieo+qnMdSHIbJpd0eAl46i8XMZ5zRn+hqFS9Rt+kDt1qCOPv8jdjwOfX8y6C5a7Tdc6V9lcY81aTbV3VunTJGPnCE7m9pC30leV5L3WGXe768Rlq+C1l7rRFqRrdwlaZfW5jrgSsq418JyJFlnbdTrHdgFH6M1dhQTQRaxZnVh0TpHMnXXhazvkuE4FFzv4dpvdz5+mfQSgwhkXeMKSwv7agrYEqtXZtp+n1tdG9rZ54fkulLMbYNA9yK1R3jjYlBV/LbowUKsXzkLWpTL9RSXdISOTRByZ4NUdLMDdtWxuz8pooeIGGAgDDIZB1L1h6MXoXkEAHhq++Dnbj4Yvv9PNkxKX7tlm6uFOeMxGOZef3ehmefeCUMtxO/TKo2fsYxiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGMW3+DxPH1UarOO5ZAAAAAElFTkSuQmCC" alt="PHd" style={{ width: 160, height: "auto" }} /></div><div style={{ fontSize: 11, fontWeight: 700, color: "#7AC143", letterSpacing: "0.05em" }} style={{ position: "relative" }}>Intelligence. Connected. <Pika id="p1" style={{ position: "absolute", top: -12, right: -8 }} /></div>
          <div style={{ fontSize: 18, fontWeight: 800, color: "#1a1a2e", marginTop: 2 }}>Planning Playbook</div>
          <div style={{ fontSize: 10, color: "#7a7a8a", marginTop: 4 }}>Updated March 2026 · PHD</div>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "8px 8px" }}>
          {SECTIONS.filter(s => s.id !== "admin" || isAdmin).map(s => s.id === "divider" ? (
            <div key={s.id} style={{ padding: "10px 12px", fontSize: 9, fontWeight: 800, color: "#2D1768", letterSpacing: "0.1em", textAlign: "center", borderTop: "1px solid #e0e0e8", borderBottom: "1px solid #e0e0e8", marginTop: 6, marginBottom: 6 }}>{s.label}</div>
          ) : (
            <button
              key={s.id}
              onClick={() => { setActiveSection(s.id); setMobileNav(false); }}
              style={{
                display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "9px 12px", border: "none",
                borderRadius: 8, cursor: "pointer", fontSize: 12.5, fontWeight: 600, fontFamily: "inherit", textAlign: "left",
                background: activeSection === s.id ? "#2D176812" : "transparent",
                color: activeSection === s.id ? "#2D1768" : "#1a1a2e",
                transition: "all .15s",
              }}
            >
              <span style={{ fontSize: 10, fontWeight: 700, color: activeSection === s.id ? "#2D1768" : "#9a9aaa", minWidth: 18 }}>{s.num}</span> {s.label}
            </button>
          ))}
        </div>
        <div style={{ padding: "10px 16px", borderTop: "1px solid #e5e5ea" }}>
          {authUser && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              {authUser.user_metadata?.avatar_url && <img src={authUser.user_metadata.avatar_url} alt="" style={{ width: 24, height: 24, borderRadius: "50%" }} />}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: "#1a1a2e", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{authUser.user_metadata?.full_name || authUser.email}</div>
                {isAdmin && <div style={{ fontSize: 8, color: "#7AC143", fontWeight: 700 }}>ADMIN</div>}
              </div>
              <button onClick={signOut} style={{ padding: "3px 8px", borderRadius: 4, border: "1px solid #d0d0d8", background: "transparent", color: "#6a6a7e", fontSize: 9, cursor: "pointer", fontFamily: "inherit" }}>Sign out</button>
            </div>
          )}
          <div style={{ fontSize: 10, color: "#9a9aaa" }}>All benchmarks in USD · Global · Directional only</div>
        </div>
      </nav>

      {/* Main Content */}
      <main ref={contentRef} style={{ flex: 1, overflowY: "auto", padding: "28px 36px 60px" }}>
        <div style={{ maxWidth: 900 }}>

          {/* GAME BAR - FLOATING */}
          {(gameActive || gameWon || (gameOver && !gameWon)) && (
            <div style={{ position: "fixed", top: 0, left: 260, right: 0, zIndex: 100, padding: "8px 24px", background: "rgba(245,245,247,0.95)", backdropFilter: "blur(10px)", borderBottom: "1px solid #e0e0e8", boxShadow: "0 2px 12px rgba(0,0,0,.08)" }}>
              {gameActive && (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ width: 36, height: 36, borderRadius: "50%", background: gameTimer <= 10 ? "#ffebee" : "#f0faf5", border: gameTimer <= 10 ? "2px solid #cc3333" : "2px solid #7AC143", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, color: gameTimer <= 10 ? "#cc3333" : "#2D1768", fontFamily: "monospace", animation: gameTimer <= 10 ? "pulse 0.5s ease-in-out infinite" : "none" }}>{gameTimer}</div>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: "#2D1768" }}>Find the Pikachu! <span style={{ color: "#7AC143" }}>{foundCount}/{TOTAL_PIKAS}</span></div>
                      <div style={{ height: 4, width: 160, background: "#e0e0e8", borderRadius: 2, marginTop: 3, overflow: "hidden" }}><div style={{ height: "100%", width: `${(foundCount / TOTAL_PIKAS) * 100}%`, background: "#7AC143", borderRadius: 2, transition: "width 0.3s" }} /></div>
                    </div>
                  </div>
                  <span style={{ fontSize: 11, color: "#6a6a7e" }}>They're hiding everywhere - scroll and explore!</span>
                </div>
              )}
              {gameWon && (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
                  <svg width="32" height="32" viewBox="0 0 40 40" style={{ animation: "pikaJump 1s ease-in-out infinite" }}>
                    <circle cx="20" cy="20" r="16" fill="#f0f0f4" stroke="#333" strokeWidth="2"/>
                    <rect x="4" y="18" width="32" height="4" fill="#333"/>
                    <path d="M4 20 A16 16 0 0 1 36 20" fill="#E03030" stroke="#333" strokeWidth="2"/>
                    <circle cx="20" cy="20" r="5" fill="white" stroke="#333" strokeWidth="2"/>
                    <circle cx="20" cy="20" r="2.5" fill="#7AC143"/>
                  </svg>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 18, fontWeight: 800, color: "#2D1768" }}>You caught them all!</div>
                    <div style={{ fontSize: 12, color: "#7AC143", fontWeight: 600 }}>{gameTimer}s remaining - Nice work!</div>
                  </div>
                  <button onClick={startGame} style={{ padding: "6px 16px", borderRadius: 8, border: "1px solid #7AC143", background: "#7AC14320", color: "#2a8c3e", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Play Again</button>
                  <button onClick={() => { setGameWon(false); setGameOver(false); }} style={{ padding: "6px 12px", borderRadius: 8, border: "1px solid #d0d0d8", background: "transparent", color: "#6a6a7e", fontSize: 11, cursor: "pointer", fontFamily: "inherit" }}>Dismiss</button>
                </div>
              )}
              {gameOver && !gameWon && (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
                  <span style={{ fontSize: 16, fontWeight: 800, color: "#cc3333" }}>⏰ Time's up! Found {foundCount}/20</span>
                  <button onClick={startGame} style={{ padding: "6px 16px", borderRadius: 8, border: "1px solid #cc3333", background: "#cc333320", color: "#cc3333", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Try Again</button>
                  <button onClick={() => { setGameOver(false); }} style={{ padding: "6px 12px", borderRadius: 8, border: "1px solid #d0d0d8", background: "transparent", color: "#6a6a7e", fontSize: 11, cursor: "pointer", fontFamily: "inherit" }}>Dismiss</button>
                </div>
              )}
            </div>
          )}
          {showConfetti && <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999, overflow: "hidden" }}>{Array.from({length: 80}).map((_, i) => <div key={i} style={{ position: "absolute", left: `${Math.random() * 100}%`, top: -20, width: Math.random() * 10 + 5, height: Math.random() * 10 + 5, background: ["#FFD93D","#7AC143","#2D1768","#FF6B6B","#cc3333","#E8B800","#ff69b4","#00bcd4"][i % 8], borderRadius: Math.random() > 0.5 ? "50%" : "2px", animation: `confettiFall ${2 + Math.random() * 3}s ${Math.random() * 0.5}s ease-out forwards`, transform: `rotate(${Math.random() * 360}deg)` }} />)}</div>}

          {/* CREATIVE PREVIEW MODAL */}
          {creativePreview && (() => {
            const EY = { navy: "#1A1A2E", gold: "#BD8B13", teal: "#1B4D4F", warm: "#F5E6C8", sky: "#87CEEB" };
            const formats = {
              feed_1x1: { title: "Feed Post - 1:1 Square", size: "1080x1080", platforms: "Meta, LinkedIn, X, Pinterest",
                tips: ["Safe default - works across all platforms", "Keep text under 20% of image for Meta", "Logo top-left for brand recall", "Strong CTA in bottom third"],
                mockup: (
                  <div style={{ width: 300, background: "#fff", borderRadius: 8, boxShadow: "0 2px 20px rgba(0,0,0,.1)", overflow: "hidden" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 12px" }}>
                      <div style={{ width: 32, height: 32, borderRadius: "50%", background: EY.teal, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 6, color: "#fff", fontWeight: 800, letterSpacing: 1 }}>EY</div>
                      <div><div style={{ fontSize: 11, fontWeight: 700, color: "#1a1a2e" }}>Etihad Airways</div><div style={{ fontSize: 9, color: "#999" }}>Sponsored</div></div>
                    </div>
                    <div style={{ width: "100%", height: 300, background: "linear-gradient(135deg, #1B4D4F, #2a6a6e)", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <div style={{ textAlign: "center", padding: 20 }}>
                        <div style={{ fontSize: 7, color: EY.gold, letterSpacing: 3, fontWeight: 700, marginBottom: 6 }}>ETIHAD AIRWAYS</div>
                        <div style={{ fontSize: 22, fontWeight: 800, color: "#fff", lineHeight: 1.2, marginBottom: 8 }}>Plans change.<br/>Your ticket can too.</div>
                        <div style={{ fontSize: 10, color: "rgba(255,255,255,.7)", marginBottom: 12 }}>No change fees until March 2027</div>
                        <div style={{ display: "inline-block", padding: "6px 20px", background: EY.gold, color: "#fff", borderRadius: 20, fontSize: 10, fontWeight: 700 }}>Learn More</div>
                      </div>
                    </div>
                    <div style={{ padding: "10px 12px", display: "flex", gap: 16 }}>{["❤️ 2.4K","💬 186","↗️ Share"].map(a => <span key={a} style={{ fontSize: 10, color: "#666" }}>{a}</span>)}</div>
                  </div>
                )},
              feed_4x5: { title: "Feed Post - 4:5 Vertical", size: "1080x1350", platforms: "Meta Feed (mobile priority)",
                tips: ["Takes up 20% more screen than 1:1", "Higher engagement rate vs square", "Key message in centre - edges may crop", "Best for destination/product hero shots"],
                mockup: (
                  <div style={{ width: 260, background: "#fff", borderRadius: 8, boxShadow: "0 2px 20px rgba(0,0,0,.1)", overflow: "hidden" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 12px" }}>
                      <div style={{ width: 28, height: 28, borderRadius: "50%", background: EY.teal, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 5, color: "#fff", fontWeight: 800 }}>EY</div>
                      <div><div style={{ fontSize: 10, fontWeight: 700 }}>Etihad Airways</div><div style={{ fontSize: 8, color: "#999" }}>Sponsored</div></div>
                    </div>
                    <div style={{ width: "100%", height: 325, background: "linear-gradient(180deg, #f0c27f, #4B1248)", position: "relative" }}>
                      <div style={{ position: "absolute", bottom: 20, left: 16, right: 16, textAlign: "left" }}>
                        <div style={{ fontSize: 6, color: EY.gold, letterSpacing: 2, fontWeight: 700 }}>THE RESIDENCE</div>
                        <div style={{ fontSize: 18, fontWeight: 800, color: "#fff", lineHeight: 1.2, marginTop: 4 }}>The only 3-room<br/>suite in the sky</div>
                        <div style={{ display: "inline-block", padding: "5px 16px", background: EY.gold, color: "#fff", borderRadius: 16, fontSize: 9, fontWeight: 700, marginTop: 8 }}>Discover More</div>
                      </div>
                    </div>
                  </div>
                )},
              stories_916: { title: "Stories / Reels - 9:16", size: "1080x1920", platforms: "Meta, TikTok, Snapchat, Shorts",
                tips: ["Keep top 250px + bottom 340px clear (safe zones)", "Hook in first 2 seconds", "Sound ON for Reels/TikTok, optional for Stories", "Native content outperforms polished ads 3:1"],
                mockup: (
                  <div style={{ width: 200, height: 360, background: "linear-gradient(180deg, #0f2027, #203a43, #2c5364)", borderRadius: 24, border: "3px solid #333", position: "relative", overflow: "hidden", boxShadow: "0 8px 30px rgba(0,0,0,.3)" }}>
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 24, background: "rgba(0,0,0,.3)", zIndex: 2, display: "flex", alignItems: "center", padding: "0 12px" }}>
                      <div style={{ flex: 1, height: 2, background: "rgba(255,255,255,.2)", borderRadius: 1 }}><div style={{ width: "40%", height: "100%", background: "#fff", borderRadius: 1 }} /></div>
                    </div>
                    <div style={{ position: "absolute", top: 30, left: 10, display: "flex", alignItems: "center", gap: 6, zIndex: 2 }}>
                      <div style={{ width: 28, height: 28, borderRadius: "50%", border: "2px solid " + EY.gold, background: EY.teal, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 5, color: "#fff", fontWeight: 800 }}>EY</div>
                      <div style={{ fontSize: 10, color: "#fff", fontWeight: 600 }}>etihad</div>
                    </div>
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 30%, rgba(0,0,0,.6))" }} />
                    <div style={{ position: "absolute", bottom: 60, left: 14, right: 14 }}>
                      <div style={{ fontSize: 20, fontWeight: 800, color: "#fff", lineHeight: 1.15, marginBottom: 4 }}>Choose Well ✈️</div>
                      <div style={{ fontSize: 9, color: "rgba(255,255,255,.8)" }}>Abu Dhabi to 170+ destinations</div>
                    </div>
                    <div style={{ position: "absolute", bottom: 16, left: 14, right: 14, textAlign: "center" }}>
                      <div style={{ padding: "8px", background: "rgba(255,255,255,.15)", backdropFilter: "blur(4px)", borderRadius: 8, fontSize: 10, color: "#fff", fontWeight: 700, border: "1px solid rgba(255,255,255,.2)" }}>Swipe Up to Book ↑</div>
                    </div>
                    <div style={{ position: "absolute", right: 10, bottom: 80, display: "flex", flexDirection: "column", gap: 14 }}>
                      {["♡","💬","↗️","🔖"].map((e,i) => <div key={i} style={{ fontSize: 14, textAlign: "center" }}>{e}</div>)}
                    </div>
                  </div>
                )},
              tiktok_infeed: { title: "TikTok In-Feed", size: "1080x1920", platforms: "TikTok, Spark Ads",
                tips: ["Creative IS targeting - algorithm matches to audience", "Spark Ads (boosted organic) get 70% higher CTR", "Use trending audio + native transitions", "First 2 seconds = watch or scroll decision"],
                mockup: (
                  <div style={{ width: 200, height: 360, background: "#000", borderRadius: 24, border: "3px solid #333", position: "relative", overflow: "hidden", boxShadow: "0 8px 30px rgba(0,0,0,.3)" }}>
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, #1a1a2e 0%, #0d1117 40%, #BD8B13 200%)" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 50%, rgba(0,0,0,.7))" }} />
                    <div style={{ position: "absolute", top: "25%", left: "50%", transform: "translate(-50%,-50%)" }}>
                      <div style={{ width: 50, height: 50, borderRadius: "50%", border: "2px solid rgba(255,255,255,.2)", display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ width: 0, height: 0, borderLeft: "14px solid white", borderTop: "9px solid transparent", borderBottom: "9px solid transparent", marginLeft: 4 }} /></div>
                    </div>
                    <div style={{ position: "absolute", bottom: 60, left: 12, right: 50 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                        <div style={{ width: 24, height: 24, borderRadius: "50%", background: EY.teal, fontSize: 5, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800 }}>EY</div>
                        <span style={{ fontSize: 10, color: "#fff", fontWeight: 700 }}>etihad</span>
                        <span style={{ fontSize: 8, padding: "1px 6px", border: "1px solid #fff", borderRadius: 3, color: "#fff" }}>Follow</span>
                      </div>
                      <div style={{ fontSize: 10, color: "#fff", lineHeight: 1.4 }}>POV: You just got upgraded to Business ✈️ #etihad #travel #luxury</div>
                      <div style={{ fontSize: 8, color: "rgba(255,255,255,.6)", marginTop: 4, display: "flex", alignItems: "center", gap: 4 }}>♪ original sound - etihad</div>
                    </div>
                    <div style={{ position: "absolute", right: 10, bottom: 80, display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
                      {[["♡","48K"],["💬","2.1K"],["🔖",""],["↗️",""]].map(([e,n],i) => <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 16 }}>{e}</div>{n && <div style={{ fontSize: 8, color: "#fff" }}>{n}</div>}</div>)}
                    </div>
                    <div style={{ position: "absolute", bottom: 12, left: 12, right: 12, padding: "6px 10px", background: EY.gold, borderRadius: 4, textAlign: "center", fontSize: 10, color: "#fff", fontWeight: 700 }}>Book Now | etihad.com</div>
                  </div>
                )},
              carousel: { title: "Carousel - Multi-Card", size: "1080x1080 per card", platforms: "Meta, LinkedIn",
                tips: ["2-10 cards, sweet spot is 5-6", "Tell a story or show features across cards", "First card is the hook", "Last card = clear CTA"],
                mockup: (
                  <div style={{ width: 320 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 0 10px" }}>
                      <div style={{ width: 28, height: 28, borderRadius: "50%", background: EY.teal, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 5, color: "#fff", fontWeight: 800 }}>EY</div>
                      <div><div style={{ fontSize: 10, fontWeight: 700 }}>Etihad Airways</div><div style={{ fontSize: 8, color: "#999" }}>Sponsored</div></div>
                    </div>
                    <div style={{ display: "flex", gap: 6, overflow: "hidden" }}>
                      {[
                        { bg: "linear-gradient(135deg,#1B4D4F,#2a8a6e)", label: "1. The Lounge", sub: "Relax before you fly" },
                        { bg: "linear-gradient(135deg,#1A1A2E,#3a3a5e)", label: "2. Business", sub: "Flatbed seats" },
                        { bg: "linear-gradient(135deg,#4B1248,#f0c27f)", label: "3. Dining", sub: "Chef-curated menus" },
                        { bg: "linear-gradient(135deg,#0f2027,#87CEEB)", label: "4. Destinations", sub: "170+ cities" },
                      ].map((c,i) => (
                        <div key={i} style={{ width: 140, height: 140, borderRadius: 6, background: c.bg, flexShrink: 0, position: "relative", overflow: "hidden" }}>
                          <div style={{ position: "absolute", bottom: 8, left: 8, right: 8 }}>
                            <div style={{ fontSize: 10, fontWeight: 800, color: "#fff" }}>{c.label}</div>
                            <div style={{ fontSize: 8, color: "rgba(255,255,255,.7)" }}>{c.sub}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", gap: 4, marginTop: 8 }}>{[0,1,2,3].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: i === 0 ? EY.teal : "#ddd" }} />)}</div>
                  </div>
                )},
              desktop_feed: { title: "Desktop Feed", size: "1200x628", platforms: "Meta, LinkedIn, X (Desktop)",
                tips: ["Desktop users = lean-back mode, longer copy OK", "Link preview: 1200x628 with headline below", "CTR lower but conversion rate higher than mobile", "Right column: bold imagery, minimal text"],
                mockup: (
                  <div style={{ width: 340, background: "#fff", borderRadius: 8, boxShadow: "0 2px 20px rgba(0,0,0,.1)", overflow: "hidden" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 12px" }}>
                      <div style={{ width: 32, height: 32, borderRadius: "50%", background: EY.teal, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 6, color: "#fff", fontWeight: 800 }}>EY</div>
                      <div><div style={{ fontSize: 11, fontWeight: 700 }}>Etihad Airways</div><div style={{ fontSize: 9, color: "#999" }}>Sponsored · &#127758;</div></div>
                    </div>
                    <div style={{ padding: "0 12px 8px", fontSize: 11, color: "#333", lineHeight: 1.4 }}>Discover Abu Dhabi with a free 2-night stopover. Explore the city between flights.</div>
                    <div style={{ width: "100%", height: 180, background: "linear-gradient(135deg, #f0c27f, #1B4D4F)", position: "relative" }}>
                      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div style={{ textAlign: "center" }}><div style={{ fontSize: 24, fontWeight: 800, color: "#fff" }}>Abu Dhabi Stopover</div><div style={{ fontSize: 10, color: "rgba(255,255,255,.8)" }}>2 free nights when you fly through Abu Dhabi</div></div>
                      </div>
                    </div>
                    <div style={{ padding: "8px 12px", background: "#f5f5f7", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div><div style={{ fontSize: 9, color: "#999" }}>ETIHAD.COM</div><div style={{ fontSize: 11, fontWeight: 700, color: "#1a1a2e" }}>Book Your Stopover</div></div>
                      <div style={{ padding: "5px 14px", background: EY.gold, color: "#fff", borderRadius: 4, fontSize: 10, fontWeight: 700 }}>Learn More</div>
                    </div>
                  </div>
                )},
              display_banners: { title: "Display / Programmatic", size: "300x250, 728x90, 160x600", platforms: "GDN, DV360, Programmatic",
                tips: ["300x250 + 728x90 cover 60% of inventory", "Max 3 elements: logo, headline, CTA", "Don't overcrowd - especially 320x50 mobile", "15s max animation, 3 loops"],
                mockup: (
                  <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "center" }}>
                    <div style={{ width: 300, height: 100, background: EY.navy, borderRadius: 4, display: "flex", overflow: "hidden", border: "1px solid #333" }}>
                      <div style={{ width: "40%", background: "linear-gradient(135deg,#1B4D4F,#2a8a6e)" }} />
                      <div style={{ flex: 1, padding: "10px 14px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <div style={{ fontSize: 5, color: EY.gold, letterSpacing: 2, fontWeight: 700 }}>ETIHAD</div>
                        <div style={{ fontSize: 12, fontWeight: 800, color: "#fff", lineHeight: 1.2, margin: "3px 0" }}>Summer Fares<br/>from $399</div>
                        <div style={{ alignSelf: "flex-start", padding: "2px 10px", background: EY.gold, color: "#fff", borderRadius: 2, fontSize: 7, fontWeight: 700 }}>Book Now</div>
                      </div>
                    </div>
                    <div style={{ width: 160, height: 220, background: EY.navy, borderRadius: 4, display: "flex", flexDirection: "column", overflow: "hidden", border: "1px solid #333" }}>
                      <div style={{ height: "50%", background: "linear-gradient(180deg,#0f2027,#1B4D4F)" }} />
                      <div style={{ flex: 1, padding: "8px 10px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
                        <div style={{ fontSize: 5, color: EY.gold, letterSpacing: 2, fontWeight: 700 }}>ETIHAD</div>
                        <div style={{ fontSize: 11, fontWeight: 800, color: "#fff", lineHeight: 1.2, margin: "4px 0" }}>Beyond<br/>Borders</div>
                        <div style={{ padding: "3px 12px", background: EY.gold, color: "#fff", borderRadius: 2, fontSize: 7, fontWeight: 700 }}>Explore</div>
                      </div>
                    </div>
                  </div>
                )},
              interstitial: { title: "Interstitial / Takeover", size: "320x480 or 1080x1920", platforms: "Programmatic, Apps",
                tips: ["Full-screen = maximum attention", "Clear close/skip button always", "5s minimum exposure before dismiss", "Best for high-impact awareness"],
                mockup: (
                  <div style={{ width: 220, height: 340, background: "linear-gradient(180deg,#0f2027,#1A1A2E,#1B4D4F)", borderRadius: 20, border: "3px solid #333", position: "relative", overflow: "hidden", boxShadow: "0 8px 30px rgba(0,0,0,.3)" }}>
                    <div style={{ position: "absolute", top: 10, right: 10, width: 20, height: 20, borderRadius: "50%", background: "rgba(255,255,255,.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#fff", zIndex: 2 }}>×</div>
                    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 20 }}>
                      <div style={{ fontSize: 7, color: EY.gold, letterSpacing: 3, fontWeight: 700, marginBottom: 12 }}>ETIHAD AIRWAYS</div>
                      <div style={{ width: 50, height: 1, background: EY.gold, marginBottom: 12 }} />
                      <div style={{ fontSize: 24, fontWeight: 800, color: "#fff", lineHeight: 1.15, marginBottom: 8 }}>Introducing<br/>the A350</div>
                      <div style={{ fontSize: 10, color: "rgba(255,255,255,.6)", marginBottom: 16, lineHeight: 1.4 }}>Our newest aircraft.<br/>Reimagined for you.</div>
                      <div style={{ padding: "8px 24px", background: EY.gold, color: "#fff", borderRadius: 20, fontSize: 10, fontWeight: 700 }}>Explore the A350</div>
                    </div>
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: EY.gold }} />
                  </div>
                )},
              youtube_preroll: { title: "YouTube Pre-Roll", size: "1920x1080", platforms: "YouTube, Google Video",
                tips: ["TrueView: skip after 5s - front-load message", "Bumper: 6s non-skip, one message only", "Add end cards + CTAs in final 5 seconds", "16:9 only - no vertical on desktop YouTube"],
                mockup: (
                  <div style={{ width: 340, background: "#000", borderRadius: 8, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,.3)" }}>
                    <div style={{ width: "100%", height: 192, background: "linear-gradient(135deg,#1A1A2E,#1B4D4F)", position: "relative" }}>
                      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div style={{ textAlign: "center" }}>
                          <div style={{ fontSize: 7, color: EY.gold, letterSpacing: 3, fontWeight: 700, marginBottom: 8 }}>ETIHAD AIRWAYS</div>
                          <div style={{ fontSize: 20, fontWeight: 800, color: "#fff", lineHeight: 1.2 }}>Choose Well</div>
                          <div style={{ fontSize: 9, color: "rgba(255,255,255,.6)", marginTop: 4 }}>Beyond Borders</div>
                        </div>
                      </div>
                      <div style={{ position: "absolute", bottom: 8, left: 8, padding: "2px 8px", background: "rgba(0,0,0,.7)", borderRadius: 3, fontSize: 9, color: "#fff" }}>0:05 / 0:15</div>
                      <div style={{ position: "absolute", bottom: 8, right: 8, padding: "3px 10px", background: "rgba(255,255,255,.9)", borderRadius: 3, fontSize: 9, color: "#333", fontWeight: 600 }}>Skip Ad ▸</div>
                      <div style={{ position: "absolute", top: 8, right: 8, padding: "2px 6px", background: "rgba(0,0,0,.5)", borderRadius: 3, fontSize: 7, color: EY.gold }}>Ad · 0:15</div>
                    </div>
                    <div style={{ padding: "8px 10px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#0f0f0f" }}>
                      <div style={{ fontSize: 10, color: "#fff", fontWeight: 600 }}>Etihad Airways - Choose Well</div>
                      <div style={{ padding: "3px 8px", background: EY.gold, borderRadius: 3, fontSize: 8, color: "#fff", fontWeight: 700 }}>Visit Site</div>
                    </div>
                  </div>
                )},
              native: { title: "Native / In-Content", size: "1200x628 + text", platforms: "Taboola, Outbrain, Programmatic",
                tips: ["Blends with editorial content", "Headline is the creative - make it click-worthy", "Image + headline + source logo format", "Avoid stock photo look - editorial style works best"],
                mockup: (
                  <div style={{ width: 300, background: "#fff", borderRadius: 6, boxShadow: "0 2px 12px rgba(0,0,0,.08)", overflow: "hidden", border: "1px solid #e0e0e8" }}>
                    <div style={{ fontSize: 9, color: "#999", padding: "6px 10px", borderBottom: "1px solid #f0f0f5" }}>Recommended for you</div>
                    <div style={{ display: "flex", gap: 10, padding: 10 }}>
                      <div style={{ width: 100, height: 70, background: "linear-gradient(135deg,#f0c27f,#1B4D4F)", borderRadius: 4, flexShrink: 0 }} />
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: "#1a1a2e", lineHeight: 1.3 }}>This Abu Dhabi Stopover Deal Is Too Good to Miss</div>
                        <div style={{ fontSize: 9, color: "#999", marginTop: 6, display: "flex", alignItems: "center", gap: 4 }}><div style={{ width: 12, height: 12, borderRadius: "50%", background: EY.teal }} />Etihad Airways | Sponsored</div>
                      </div>
                    </div>
                  </div>
                )},
              ctv: { title: "Connected TV (CTV)", size: "1920x1080 HD", platforms: "Shahid, OSN+, YouTube CTV",
                tips: ["16:9 only - always landscape", "15s and 30s standard durations", "Non-skippable = guaranteed full view", "Near 100% viewability on CTV"],
                mockup: (
                  <div style={{ width: 340, background: "#111", borderRadius: 10, overflow: "hidden", boxShadow: "0 4px 30px rgba(0,0,0,.4)", border: "3px solid #222" }}>
                    <div style={{ width: "100%", height: 192, background: "linear-gradient(135deg,#1A1A2E,#1B4D4F,#0f2027)", position: "relative" }}>
                      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div style={{ textAlign: "center" }}>
                          <div style={{ fontSize: 8, color: EY.gold, letterSpacing: 4, fontWeight: 700, marginBottom: 10 }}>ETIHAD AIRWAYS</div>
                          <div style={{ width: 40, height: 1, background: EY.gold, margin: "0 auto 10px" }} />
                          <div style={{ fontSize: 26, fontWeight: 800, color: "#fff", lineHeight: 1.1 }}>Beyond<br/>Borders</div>
                          <div style={{ fontSize: 9, color: "rgba(255,255,255,.5)", marginTop: 8 }}>etihad.com</div>
                        </div>
                      </div>
                    </div>
                    <div style={{ height: 8, background: "#222", display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ width: 20, height: 2, borderRadius: 1, background: "#444" }} /></div>
                  </div>
                )},
              dooh: { title: "DOOH - Digital Billboard", size: "Varies by screen", platforms: "Dubai Mall, SZR, Riyadh",
                tips: ["10-15 second loops, no audio", "Bold text - readable at distance", "Landscape or portrait depending on screen", "Book 2-4 weeks ahead for premium locations"],
                mockup: (
                  <div style={{ width: 320 }}>
                    <div style={{ width: "100%", height: 160, background: EY.navy, borderRadius: 4, position: "relative", overflow: "hidden", border: "4px solid #555", boxShadow: "0 4px 20px rgba(0,0,0,.3)" }}>
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,#1A1A2E,#1B4D4F)" }} />
                      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px" }}>
                        <div>
                          <div style={{ fontSize: 6, color: EY.gold, letterSpacing: 3, fontWeight: 700 }}>ETIHAD AIRWAYS</div>
                          <div style={{ fontSize: 20, fontWeight: 800, color: "#fff", lineHeight: 1.15, marginTop: 6 }}>Abu Dhabi<br/>is calling</div>
                          <div style={{ fontSize: 9, color: "rgba(255,255,255,.6)", marginTop: 4 }}>Fly from $399 return</div>
                        </div>
                        <div style={{ fontSize: 9, color: EY.gold, fontWeight: 700, padding: "4px 12px", border: "1px solid " + EY.gold, borderRadius: 3 }}>etihad.com</div>
                      </div>
                    </div>
                    <div style={{ width: 10, height: 30, background: "#777", margin: "0 auto" }} />
                    <div style={{ width: 60, height: 4, background: "#888", borderRadius: 2, margin: "0 auto" }} />
                    <div style={{ fontSize: 8, color: "#999", textAlign: "center", marginTop: 6 }}>Sheikh Zayed Road - Digital Billboard</div>
                  </div>
                )},
              youtube_masthead: { title: "YouTube Masthead", size: "Homepage takeover", platforms: "YouTube Desktop + Mobile",
                tips: ["$50K-$200K/day depending on market", "Book 6-8 weeks ahead", "Auto-plays at top of YouTube homepage", "Maximum reach play - great for launches"],
                mockup: (
                  <div style={{ width: 340, background: "#0f0f0f", borderRadius: 8, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,.3)" }}>
                    <div style={{ display: "flex", alignItems: "center", padding: "8px 10px", gap: 8, background: "#202020" }}>
                      <div style={{ fontSize: 14 }}>▶️</div><div style={{ height: 6, flex: 1, background: "#333", borderRadius: 3 }}><div style={{ width: "60%", height: "100%", background: "#fff", borderRadius: 3 }} /></div><div style={{ fontSize: 9, color: "#fff" }}>🔍 🔔 👤</div>
                    </div>
                    <div style={{ width: "100%", height: 140, background: "linear-gradient(135deg,#1A1A2E,#1B4D4F)", position: "relative" }}>
                      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div style={{ textAlign: "center" }}><div style={{ fontSize: 6, color: EY.gold, letterSpacing: 3, fontWeight: 700 }}>ETIHAD AIRWAYS</div><div style={{ fontSize: 16, fontWeight: 800, color: "#fff", marginTop: 4 }}>Your Journey Starts Here</div></div>
                      </div>
                      <div style={{ position: "absolute", bottom: 6, right: 8, padding: "2px 8px", background: EY.gold, borderRadius: 3, fontSize: 7, color: "#fff", fontWeight: 700 }}>Visit Site</div>
                    </div>
                    <div style={{ display: "flex", gap: 6, padding: "8px 10px" }}>
                      {[1,2,3,4].map(i => <div key={i} style={{ width: 70, height: 40, background: "#1a1a1a", borderRadius: 4 }} />)}
                    </div>
                  </div>
                )},
              document_ad: { title: "Document Ad (Swipeable)", size: "1080x1080 per page", platforms: "LinkedIn",
                tips: ["PDF/PPT uploaded as swipeable carousel", "Great for thought leadership + B2B", "Each page = swipe, aim for 5-10 pages", "Gate with lead form for downloads"],
                mockup: (
                  <div style={{ width: 260, background: "#fff", borderRadius: 8, boxShadow: "0 2px 20px rgba(0,0,0,.1)", overflow: "hidden" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 12px" }}>
                      <div style={{ width: 28, height: 28, borderRadius: "50%", background: EY.teal, fontSize: 5, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800 }}>EY</div>
                      <div><div style={{ fontSize: 10, fontWeight: 700 }}>Etihad Airways</div><div style={{ fontSize: 8, color: "#999" }}>4,200 followers</div></div>
                    </div>
                    <div style={{ width: "100%", height: 260, background: EY.navy, position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 20, textAlign: "center" }}>
                      <div style={{ fontSize: 7, color: EY.gold, letterSpacing: 2, fontWeight: 700, marginBottom: 8 }}>ETIHAD AIRWAYS</div>
                      <div style={{ fontSize: 16, fontWeight: 800, color: "#fff", lineHeight: 1.2, marginBottom: 6 }}>Sustainability<br/>Report 2025</div>
                      <div style={{ fontSize: 9, color: "rgba(255,255,255,.5)" }}>Our commitment to responsible aviation</div>
                      <div style={{ position: "absolute", bottom: 8, right: 8, fontSize: 8, color: "rgba(255,255,255,.4)" }}>1 / 8</div>
                    </div>
                    <div style={{ padding: "8px 12px", fontSize: 9, color: EY.teal, fontWeight: 600, textAlign: "center" }}>← Swipe through pages →</div>
                  </div>
                )},
              snap_fullscreen: { title: "Snapchat Full-Screen", size: "1080x1920", platforms: "Snapchat Ads, Story Ads",
                tips: ["Swipe Up CTA is primary action", "6s Commercial format is non-skippable", "AR Lens for interactive experiences", "KSA/Kuwait: 60-70% penetration, essential market"],
                mockup: (
                  <div style={{ width: 200, height: 360, background: "#FFFC00", borderRadius: 24, border: "3px solid #333", position: "relative", overflow: "hidden", boxShadow: "0 8px 30px rgba(0,0,0,.3)" }}>
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#1A1A2E 0%,#1B4D4F 60%,#FFFC00 200%)" }} />
                    <div style={{ position: "absolute", top: 14, left: 12, right: 12, display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 2 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <div style={{ width: 28, height: 28, borderRadius: "50%", border: "2px solid " + EY.gold, background: EY.teal, fontSize: 5, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800 }}>EY</div>
                        <span style={{ fontSize: 10, color: "#fff", fontWeight: 700 }}>Etihad</span>
                      </div>
                      <span style={{ fontSize: 8, color: "rgba(255,255,255,.5)" }}>Ad</span>
                    </div>
                    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 20 }}>
                      <div>
                        <div style={{ fontSize: 22, fontWeight: 800, color: "#fff", lineHeight: 1.15 }}>Escape to<br/>paradise ☀️</div>
                        <div style={{ fontSize: 9, color: "rgba(255,255,255,.7)", marginTop: 6 }}>Maldives from $799 return</div>
                      </div>
                    </div>
                    <div style={{ position: "absolute", bottom: 16, left: 14, right: 14, textAlign: "center" }}>
                      <div style={{ padding: "10px", background: "rgba(255,255,255,.15)", borderRadius: 8, fontSize: 11, color: "#fff", fontWeight: 700, letterSpacing: 0.5, border: "1px solid rgba(255,255,255,.2)" }}>Swipe Up ↑</div>
                    </div>
                  </div>
                )},
            };
            const p = formats[creativePreview];
            if (!p) { setCreativePreview(null); return null; }

            return (
              <div onClick={() => setCreativePreview(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)", zIndex: 9998, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
                <div onClick={e => e.stopPropagation()} style={{ width: 740, maxHeight: "90vh", overflow: "auto", background: "#fff", borderRadius: 16, boxShadow: "0 20px 60px rgba(0,0,0,.3)" }}>
                  <div style={{ padding: "16px 24px", borderBottom: "1px solid #e0e0e8", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: 18, fontWeight: 800, color: "#1A1A2E" }}>{p.title}</div>
                      <div style={{ fontSize: 11, color: "#6a6a7e", marginTop: 2 }}>{p.size} | {p.platforms}</div>
                    </div>
                    <button onClick={() => setCreativePreview(null)} style={{ width: 32, height: 32, borderRadius: "50%", border: "1px solid #e0e0e8", background: "transparent", color: "#6a6a7e", fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>x</button>
                  </div>
                  <div style={{ display: "flex" }}>
                    <div style={{ flex: "0 0 55%", padding: 24, background: "#f9f9fb", display: "flex", alignItems: "center", justifyContent: "center", minHeight: 300 }}>{p.mockup}</div>
                    <div style={{ flex: 1, padding: 24 }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: "#2D1768", marginBottom: 10 }}>Best Practices</div>
                      {p.tips.map((t, i) => <div key={i} style={{ fontSize: 11, color: "#444455", marginBottom: 6, paddingLeft: 12, position: "relative", lineHeight: 1.5 }}><span style={{ position: "absolute", left: 0, color: "#BD8B13", fontWeight: 800 }}>-</span>{t}</div>)}
                      <div style={{ marginTop: 14, padding: 10, background: "#f0edf5", borderRadius: 6, border: "1px solid #d0c0e0" }}>
                        <div style={{ fontSize: 9, fontWeight: 700, color: "#2D1768", marginBottom: 3 }}>Etihad Brand Guidelines</div>
                        <div style={{ fontSize: 10, color: "#555", lineHeight: 1.5 }}>Colours: Navy (#1A1A2E), Gold (#BD8B13), Teal (#1B4D4F). Logo: "ETIHAD BEYOND BORDERS". Always use approved assets from the Etihad brand portal.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}


          {/* START GAME CTA - only when no game state */}
          {!gameActive && !gameWon && !gameOver && (
            <div onClick={startGame} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 16px", marginBottom: 12, background: "#fff8e1", border: "1px solid #ffe082", borderRadius: 10, cursor: "pointer" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 16 }}>{"🔍"}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#b8860b" }}>{"Bored? Find the 20 Pikachu hidden across the playbook! You have 2 minutes..."}</span>
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#fff", background: "#FFD93D", padding: "4px 12px", borderRadius: 20, border: "1px solid #E8B800" }}>START</span>
            </div>
          )}

          <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 20 }}>
            <div style={{ flex: 1 }}><SearchBar value={search} onChange={setSearch} /></div>
            <button onClick={() => setActiveSection("aiplanner")} style={{ padding: "10px 18px", borderRadius: 10, border: "none", background: "#2D1768", color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap", boxShadow: "0 2px 8px rgba(45,23,104,.25)", flexShrink: 0, marginTop: 0 }}>AI Plan Generator</button>
          </div>

          {/* OVERVIEW */}
          {activeSection === "overview" && (
            <div>
              <SectionTitle>Global Digital Media Planning Framework 2026</SectionTitle>
              <SectionDesc>The complete internal reference for digital media planning across global markets - WEST (Americas/Europe), CENTRAL (MENA/Africa), and EAST (APAC/China/India). Contains the full planning toolkit: platform-by-objective framework with benchmarks, verified 2026 platform updates, high-impact format guidance, regional cultural calendar, budget recommendations, and QA checklists.</SectionDesc>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 12, marginBottom: 24 }}>
                {SECTIONS.filter(s => s.id !== "overview").map(s => (
                  <Card key={s.id} hoverable onClick={() => setActiveSection(s.id)} style={{ cursor: "pointer" }}>
                    <div style={{ fontSize: 12, fontWeight: 800, color: "#2D1768", marginBottom: 6, opacity: 0.4 }}>{s.num}</div>
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
              <SectionTitle>Planning Process & Methodology</SectionTitle><Pika id="p2" />
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
                <div style={{ fontSize: 13, fontWeight: 700, color: "#2D1768", marginBottom: 8 }}>🎯 Platform Selection Framework - 6 Questions Before Adding Any Platform</div><Pika id="p3" />
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
                      <div style={{ fontWeight: 700, color: "#6a1b9a", fontSize: 11, textTransform: "uppercase", marginBottom: 4 }}>Audience Fit<Pika id="p4" /></div>
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
              <SectionTitle>Media Planning Framework</SectionTitle><Pika id="p5" />
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
              <SectionTitle>High Impact Ad Formats</SectionTitle><Pika id="p6" />
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
              <SectionTitle>Programmatic Deep Dive</SectionTitle><Pika id="p13" />
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
                        <div style={{ position: "relative", width: 150, height: 200, margin: "0 auto" }}>
                          <svg width="150" height="200" viewBox="0 0 150 200">
                            {/* Ground shadow */}
                            <ellipse cx="75" cy="185" rx={stage >= 5 ? 40 : 25} ry="6" fill="rgba(0,0,0,0.08)" style={{ transition: "all 0.6s" }}/>

                            {/* === CREATURE === */}
                            <g style={{ transform: `translateY(${stage === 0 ? 80 : stage === 1 ? 65 : stage === 2 ? 50 : stage === 3 ? 30 : stage === 4 ? 12 : stage === 5 ? 0 : -5}px)`, transition: "transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)", opacity: stage >= 1 ? 1 : 0 }}>

                              {/* Lightning tail - visible from stage 4 */}
                              {stage >= 4 && <path d="M105 75 L118 55 L112 53 L125 35 L115 42 L120 25 L102 58 L108 60 Z" fill="#F5C518" stroke="#D4A012" strokeWidth="0.8" strokeLinejoin="round" style={{ opacity: stage >= 4 ? 1 : 0, transition: "opacity 0.4s" }}/>}

                              {/* Body */}
                              <ellipse cx="75" cy="80" rx="30" ry="28" fill="#FFD93D"/>
                              <ellipse cx="75" cy="80" rx="30" ry="28" fill="none" stroke="#E8B800" strokeWidth="0.8"/>

                              {/* Belly highlight */}
                              <ellipse cx="75" cy="88" rx="18" ry="14" fill="#FFE566" opacity="0.6"/>

                              {/* Left ear */}
                              <path d="M52 58 L38 22 L58 50" fill="#FFD93D" stroke="#E8B800" strokeWidth="0.8" strokeLinejoin="round"/>
                              <path d="M40 28 L44 38 L38 34" fill="#2D1768"/>

                              {/* Right ear */}
                              <path d="M98 58 L112 22 L92 50" fill="#FFD93D" stroke="#E8B800" strokeWidth="0.8" strokeLinejoin="round"/>
                              <path d="M110 28 L106 38 L112 34" fill="#2D1768"/>

                              {/* Eyes */}
                              <g>
                                <circle cx="63" cy="72" r="6" fill="#2D1768"/>
                                <circle cx="87" cy="72" r="6" fill="#2D1768"/>
                                {/* Shine */}
                                <circle cx="65" cy="70" r="2.2" fill="white"/>
                                <circle cx="89" cy="70" r="2.2" fill="white"/>
                                <circle cx="62" cy="73" r="1" fill="white" opacity="0.5"/>
                                <circle cx="86" cy="73" r="1" fill="white" opacity="0.5"/>
                              </g>

                              {/* Cheeks */}
                              <circle cx="48" cy="82" r="7" fill="#FF6B6B" opacity="0.35"/>
                              <circle cx="102" cy="82" r="7" fill="#FF6B6B" opacity="0.35"/>

                              {/* Mouth - changes with stage */}
                              {stage < 6 ? (
                                <path d="M68 90 Q75 96 82 90" fill="none" stroke="#2D1768" strokeWidth="1.5" strokeLinecap="round"/>
                              ) : (
                                <g>
                                  <path d="M65 88 Q75 102 85 88" fill="#2D1768"/>
                                  <path d="M68 88 Q75 92 82 88" fill="#FF6B6B" opacity="0.6"/>
                                </g>
                              )}

                              {/* Arms - waving when complete */}
                              <path d={stage === 6 ? "M45 78 L30 62 L35 58" : "M45 80 L38 90 L42 92"} fill="#FFD93D" stroke="#E8B800" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "d 0.4s" }}/>
                              <path d={stage === 6 ? "M105 78 L120 62 L115 58" : "M105 80 L112 90 L108 92"} fill="#FFD93D" stroke="#E8B800" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "d 0.4s" }}/>

                              {/* Feet */}
                              <ellipse cx="62" cy="106" rx="10" ry="4" fill="#E8B800"/>
                              <ellipse cx="88" cy="106" rx="10" ry="4" fill="#E8B800"/>
                            </g>

                            {/* === POKEBALL === */}
                            <g style={{ transform: `translateY(${stage >= 6 ? 20 : 0}px)`, opacity: stage >= 6 ? 0 : 1, transition: "all 0.6s ease-out" }}>
                              {/* Ball shadow */}
                              <ellipse cx="75" cy="178" rx="22" ry="5" fill="rgba(0,0,0,0.06)"/>

                              {/* Bottom half - white */}
                              <path d="M40 155 A35 35 0 0 0 110 155 L40 155" fill="#f0f0f4" stroke="#ccc" strokeWidth="2"/>

                              {/* Shine on bottom */}
                              <path d="M55 162 Q65 170 90 165" fill="none" stroke="white" strokeWidth="3" opacity="0.4" strokeLinecap="round"/>

                              {/* Center band */}
                              <rect x="38" y="150" width="74" height="10" fill="#333" rx="2"/>

                              {/* Center button */}
                              <circle cx="75" cy="155" r="8" fill="white" stroke="#333" strokeWidth="2.5"/>
                              <circle cx="75" cy="155" r="4" fill={stage >= 3 ? "#7AC143" : "#e0e0e8"} stroke="#bbb" strokeWidth="1" style={{ transition: "fill 0.4s" }}/>
                              {stage >= 3 && <circle cx="75" cy="155" r="4" fill="#7AC143" style={{ animation: "pulse 2s ease-in-out infinite" }}/>}

                              {/* Top half - red - opens based on stage */}
                              <g style={{ transform: `rotate(${stage >= 3 ? -15 - (stage - 3) * 18 : 0}deg)`, transformOrigin: "40px 155px", transition: "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)" }}>
                                <path d="M40 155 A35 35 0 0 1 110 155 L40 155" fill="#E03030" stroke="#B82020" strokeWidth="2"/>
                                {/* Shine on red */}
                                <path d="M55 135 Q70 125 88 132" fill="none" stroke="white" strokeWidth="3.5" opacity="0.35" strokeLinecap="round"/>
                                <path d="M60 140 Q68 136 78 138" fill="none" stroke="white" strokeWidth="2" opacity="0.2" strokeLinecap="round"/>
                              </g>

                              {/* Shake lines when shaking */}
                              {stage >= 1 && stage < 3 && <>
                                <line x1="28" y1="145" x2="22" y2="142" stroke="#FFD93D" strokeWidth="2.5" strokeLinecap="round" opacity="0.7"/>
                                <line x1="122" y1="145" x2="128" y2="142" stroke="#FFD93D" strokeWidth="2.5" strokeLinecap="round" opacity="0.7"/>
                                <line x1="25" y1="155" x2="18" y2="155" stroke="#FFD93D" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
                                <line x1="125" y1="155" x2="132" y2="155" stroke="#FFD93D" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
                              </>}
                            </g>

                            {/* === SPARKLES at 100% === */}
                            {stage === 6 && <>
                              <text x="15" y="35" fontSize="16" style={{ animation: "sparkle 1.5s ease-in-out infinite" }}>⚡</text>
                              <text x="120" y="30" fontSize="14" style={{ animation: "sparkle 1.5s 0.25s ease-in-out infinite" }}>✨</text>
                              <text x="8" y="75" fontSize="12" style={{ animation: "sparkle 1.5s 0.5s ease-in-out infinite" }}>⚡</text>
                              <text x="130" y="70" fontSize="13" style={{ animation: "sparkle 1.5s 0.75s ease-in-out infinite" }}>✨</text>
                              <text x="25" y="55" fontSize="10" style={{ animation: "sparkle 1.5s 1.0s ease-in-out infinite" }}>✦</text>
                              <text x="115" y="50" fontSize="11" style={{ animation: "sparkle 1.5s 1.25s ease-in-out infinite" }}>✦</text>
                            </>}

                            {/* Burst lines at 100% */}
                            {stage === 6 && [0,45,90,135,180,225,270,315].map(angle => (
                              <line key={angle} x1="75" y1="75" x2={75 + Math.cos(angle * Math.PI/180) * 55} y2={75 + Math.sin(angle * Math.PI/180) * 55} stroke="#FFD93D" strokeWidth="1.5" strokeLinecap="round" opacity="0.15" style={{ animation: `sparkle 2s ${angle/360}s ease-in-out infinite` }}/>
                            ))}
                          </svg>
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
              <SectionTitle>Global Vendor Landscape<Pika id="p14" /> - By Channel & Region</SectionTitle>
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

              <h3 style={{ fontSize: 15, fontWeight: 700, color: "#2D1768", marginTop: 28, marginBottom: 12 }}>Seasonal Budget Weighting (by Region)</h3><Pika id="p7" />
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
              <SectionTitle>Measurement & KPIs</SectionTitle><Pika id="p8" />
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
              <SectionTitle>Latest Platform Updates<Pika id="p9" /> (2025–2026)</SectionTitle>
              <SectionDesc>Verified updates from official newsrooms and trusted sources. Check before every campaign.</SectionDesc>

              <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
                {[
                  { label: "Critical", color: "#cc3333", desc: "Must act now - directly impacts performance" },
                  { label: "Adopt", color: "#2a8c3e", desc: "Proven improvement - make it default" },
                  { label: "Test", color: "#b8860b", desc: "Worth testing - allocate small budget" },
                  { label: "Monitor", color: "#b8860b", desc: "Track development - not actionable yet" },
                ].map(s => (
                  <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 10px", background: s.color + "08", borderRadius: 6, border: `1px solid ${s.color}20` }}>
                    <span style={{ padding: "1px 6px", borderRadius: 8, background: s.color + "15", color: s.color, fontSize: 9, fontWeight: 700, border: `1px solid ${s.color}30` }}>{s.label}</span>
                    <span style={{ fontSize: 10, color: "#555566" }}>{s.desc}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
                {["All", ...new Set(platformUpdates.map(u => u.platform))].map(p => (
                  <button key={p} onClick={() => setUpdatePlatformFilter(p)} style={{ padding: "5px 14px", borderRadius: 20, border: updatePlatformFilter === p ? "2px solid #2D1768" : "1px solid #d0d0d8", background: updatePlatformFilter === p ? "#2D176812" : "transparent", color: updatePlatformFilter === p ? "#2D1768" : "#6a6a7e", fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>{p} ({p === "All" ? platformUpdates.length : platformUpdates.filter(u => u.platform === p).length})</button>
                ))}
              </div>

              {platformUpdates.filter(u => (updatePlatformFilter === "All" || u.platform === updatePlatformFilter) && (!filterText || JSON.stringify(u).toLowerCase().includes(filterText))).map((u, i) => (
                <Card key={i} style={{ borderLeft: `4px solid ${u.statusColor}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "#1a1a2e" }}>{u.update}</div>
                        <span style={{ padding: "2px 8px", borderRadius: 10, background: u.statusColor + "15", color: u.statusColor, fontSize: 9, fontWeight: 700, border: `1px solid ${u.statusColor}30`, whiteSpace: "nowrap" }}>{u.status}</span>
                      </div>
                      <div style={{ fontSize: 11, color: "#5a5a6e" }}>{u.platform} · {u.date}</div>
                    </div>
                    <span style={{ fontSize: 18 }}>{u.impact}</span>
                  </div>
                  <div style={{ fontSize: 12, color: "#444455", lineHeight: 1.6, marginBottom: 8 }}>{u.detail}</div>
                  <div style={{ fontSize: 11, color: u.statusColor, lineHeight: 1.5, padding: "6px 10px", background: u.statusColor + "08", borderRadius: 6, marginBottom: 8 }}>
                    <strong>Why it matters:</strong> {u.why}
                  </div>
                  <a href={u.link} target="_blank" rel="noopener noreferrer" style={{ fontSize: 10, color: "#2D1768", fontWeight: 600, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4 }}>
                    View source ↗
                  </a>
                </Card>
              ))}
            </div>
          )}

          {/* CAVEATS */}
          {activeSection === "caveats" && (
            <div>
              <SectionTitle>Caveats, Disclaimers & Risk Areas</SectionTitle><Pika id="p10" />
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
              <SectionTitle>Pre-Launch QA Checklist</SectionTitle><Pika id="p11" />
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
              <SectionTitle>Common Planning Mistakes</SectionTitle><Pika id="p12" />
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
                <Card onClick={() => setCreativePreview("feed_1x1")} style={{ padding: 16, textAlign: "center", cursor: "pointer", transition: "box-shadow 0.2s" }} hoverable>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#2D1768", marginBottom: 8 }}>Feed Post - 1:1 Square<span style={{ fontSize: 8, color: "#7AC143", display: "block", marginTop: 2 }}>Click to preview</span></div>
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
                <Card onClick={() => setCreativePreview("feed_4x5")} style={{ padding: 16, textAlign: "center", cursor: "pointer", transition: "box-shadow 0.2s" }} hoverable>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#b8860b", marginBottom: 8 }}>Feed Post - 4:5 Vertical<span style={{ fontSize: 8, color: "#7AC143", display: "block", marginTop: 2 }}>Click to preview</span></div>
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
                <Card onClick={() => setCreativePreview("stories_916")} style={{ padding: 16, textAlign: "center", cursor: "pointer", transition: "box-shadow 0.2s" }} hoverable>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#6a1b9a", marginBottom: 8 }}>Stories / Reels - 9:16<span style={{ fontSize: 8, color: "#7AC143", display: "block", marginTop: 2 }}>Click to preview</span></div>
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
                <Card onClick={() => setCreativePreview("tiktok_infeed")} style={{ padding: 16, textAlign: "center", cursor: "pointer", transition: "box-shadow 0.2s" }} hoverable>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#6a1b9a", marginBottom: 8 }}>TikTok In-Feed<span style={{ fontSize: 8, color: "#7AC143", display: "block", marginTop: 2 }}>Click to preview</span></div>
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
                <Card onClick={() => setCreativePreview("carousel")} style={{ padding: 16, textAlign: "center", cursor: "pointer", transition: "box-shadow 0.2s" }} hoverable>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#2D1768", marginBottom: 8 }}>Carousel - Multi-Card<span style={{ fontSize: 8, color: "#7AC143", display: "block", marginTop: 2 }}>Click to preview</span></div>
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
                <Card onClick={() => setCreativePreview("desktop_feed")} style={{ padding: 16, textAlign: "center", cursor: "pointer", transition: "box-shadow 0.2s" }} hoverable>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#2D1768", marginBottom: 8 }}>Desktop Feed<span style={{ fontSize: 8, color: "#7AC143", display: "block", marginTop: 2 }}>Click to preview</span></div>
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
                <Card onClick={() => setCreativePreview("display_banners")} style={{ padding: 16, textAlign: "center", cursor: "pointer", transition: "box-shadow 0.2s" }} hoverable>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#b8860b", marginBottom: 8 }}>Display Banners<span style={{ fontSize: 8, color: "#7AC143", display: "block", marginTop: 2 }}>Click to preview</span></div>
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
                <Card onClick={() => setCreativePreview("interstitial")} style={{ padding: 16, textAlign: "center", cursor: "pointer", transition: "box-shadow 0.2s" }} hoverable>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#cc3333", marginBottom: 8 }}>Interstitial / Takeover<span style={{ fontSize: 8, color: "#7AC143", display: "block", marginTop: 2 }}>Click to preview</span></div>
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
                <Card onClick={() => setCreativePreview("native")} style={{ padding: 16, textAlign: "center", cursor: "pointer", transition: "box-shadow 0.2s" }} hoverable>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#2a8c3e", marginBottom: 8 }}>Native / In-Content<span style={{ fontSize: 8, color: "#7AC143", display: "block", marginTop: 2 }}>Click to preview</span></div>
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
                <Card onClick={() => setCreativePreview("ctv")} style={{ padding: 16, textAlign: "center", cursor: "pointer", transition: "box-shadow 0.2s" }} hoverable>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#6a1b9a", marginBottom: 8 }}>CTV / OTT - 16:9<span style={{ fontSize: 8, color: "#7AC143", display: "block", marginTop: 2 }}>Click to preview</span></div>
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
                <Card onClick={() => setCreativePreview("dooh")} style={{ padding: 16, textAlign: "center", cursor: "pointer", transition: "box-shadow 0.2s" }} hoverable>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#b8860b", marginBottom: 8 }}>DOOH - Billboard<span style={{ fontSize: 8, color: "#7AC143", display: "block", marginTop: 2 }}>Click to preview</span></div>
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
                <Card onClick={() => setCreativePreview("youtube_masthead")} style={{ padding: 16, textAlign: "center", cursor: "pointer", transition: "box-shadow 0.2s" }} hoverable>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#cc3333", marginBottom: 8 }}>YouTube Masthead<span style={{ fontSize: 8, color: "#7AC143", display: "block", marginTop: 2 }}>Click to preview</span></div>
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
                <Card onClick={() => setCreativePreview("document_ad")} style={{ padding: 16, textAlign: "center", cursor: "pointer", transition: "box-shadow 0.2s" }} hoverable>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#2D1768", marginBottom: 8 }}>Document Ad (Swipeable)<span style={{ fontSize: 8, color: "#7AC143", display: "block", marginTop: 2 }}>Click to preview</span></div>
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
              <div style={{ textAlign: "right", padding: "8px 0" }}><Pika id="p15" /></div>
            </div>
          )}

          {/* BUDGET CALCULATOR */}
          {activeSection === "budgetcalc" && (
            <div>
              <SectionTitle>Budget Calculator & Reach Estimator</SectionTitle><Pika id="p16" />
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
                <div style={{ fontSize: 10, fontWeight: 700, color: "#5a5a6e", marginBottom: 6 }}>Select platforms in your plan:<Pika id="p17" /></div>
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
                          <td style={{ padding: 8, fontSize: 9, color: "#5a5a6e", fontWeight: 600 }}>Key Event<Pika id="p18" /></td>
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

              <button onClick={() => setBenchmarkData(prev => [...prev, { platform: "Meta", kpi: "CPM", benchmark: "3–11", actual: "", id: Date.now() }])} style={{ padding: "8px 16px", borderRadius: 8, border: "1px solid #3b82f6", background: "#e8e0f0", color: "#2D1768", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", marginBottom: 16 }}>+ Add Row</button><Pika id="p19" />

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

              {savedPlans.length > 0 && (
                <Card style={{ marginBottom: 16, padding: 14, borderLeft: "4px solid #2D1768" }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#2D1768", marginBottom: 8 }}>Saved Media Plans ({savedPlans.length})</div>
                  {savedPlans.map(plan => (
                    <div key={plan.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: "1px solid #f0f0f5" }}>
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 600, color: "#1a1a2e" }}>{plan.name}</div>
                        <div style={{ fontSize: 10, color: "#6a6a7e" }}>Saved {new Date(plan.savedAt).toLocaleDateString()} | {plan.line_items?.length || 0} line items | ${plan.summary?.total_investment_usd?.toLocaleString() || "N/A"}</div>
                      </div>
                      <div style={{ display: "flex", gap: 6 }}>
                        <button onClick={() => { navigator.clipboard.writeText(JSON.stringify(plan, null, 2)); alert("Plan JSON copied"); }} style={{ padding: "3px 8px", borderRadius: 4, border: "1px solid #d0d0d8", background: "transparent", color: "#6a6a7e", fontSize: 9, cursor: "pointer", fontFamily: "inherit" }}>Copy</button>
                        <button onClick={() => deletePlan(plan.id)} style={{ padding: "3px 8px", borderRadius: 4, border: "1px solid #ffcdd2", background: "transparent", color: "#cc3333", fontSize: 9, cursor: "pointer", fontFamily: "inherit" }}>Delete</button>
                      </div>
                    </div>
                  ))}
                </Card>
              )}

              {/* AUDIENCE SIZING MODULE */}
              <div style={{ marginBottom: 24, padding: 20, background: "#f0ecf5", borderRadius: 12, border: "1px solid #d0c0e0" }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: "#2D1768", marginBottom: 4 }}>👥 Audience & Persona Builder</div>
                <div style={{ fontSize: 12, color: "#555566", marginBottom: 14 }}>Define your target personas - audience sizes auto-populate from platform data. Upload historic campaign data to help AI plan more accurately.</div>

                {/* BASE ON EXISTING PLAN */}
                {savedPlans.length > 0 && (
                  <div style={{ marginBottom: 14, padding: 12, background: "#f9f9fb", borderRadius: 8, border: "1px solid #e0e0e8" }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: "#2D1768", marginBottom: 4 }}>Base on Existing Plan (optional)</div>
                    <div style={{ fontSize: 9, color: "#6a6a7e", marginBottom: 6 }}>Load a previous plan as a starting point - AI will reference it for budget splits and platform mix.</div>
                    <select value={basePlanId || ""} onChange={e => {
                      const plan = savedPlans.find(p => p.id === (e.target.value.includes("-") ? e.target.value : Number(e.target.value)));
                      if (plan) {
                        setBasePlanId(plan.id);
                        setAiPrompt(prev => prev || `Build on previous plan: ${plan.name}. Previous budget: $${plan.summary?.total_investment_usd?.toLocaleString() || "N/A"}. Adjust for new requirements.`);
                      } else { setBasePlanId(null); }
                    }} style={{ width: "100%", padding: "6px 8px", background: "#fff", border: "1px solid #d0d0d8", borderRadius: 6, fontSize: 11, fontFamily: "inherit", color: "#1a1a2e" }}>
                      <option value="">-- Start from scratch --</option>
                      {savedPlans.map(plan => <option key={plan.id} value={plan.id}>{plan.name} (${plan.summary?.total_investment_usd?.toLocaleString() || "N/A"} | {new Date(plan.savedAt).toLocaleDateString()})</option>)}
                    </select>
                  </div>
                )}

                {/* HISTORIC CAMPAIGN DATA */}
                <div style={{ marginBottom: 14, padding: 12, background: "#fffdf5", borderRadius: 8, border: "1px solid #ffe082" }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "#b8860b", marginBottom: 4 }}>Upload Historic Campaign Data (optional)</div>
                  <div style={{ fontSize: 9, color: "#6a6a7e", marginBottom: 6 }}>Upload past campaign results (CSV) so AI can learn from what worked. Columns: Platform, Spend, Impressions, Clicks, Conversions, CPA, ROAS</div>
                  <input type="file" accept=".csv" onChange={e => {
                    const f = e.target.files[0]; if (!f) return;
                    const r = new FileReader(); r.onload = ev => {
                      const rows = ev.target.result.split("\n").filter(r => r.trim());
                      const data = rows.slice(1).map(r => r.split(",").map(s => s.trim())).filter(r => r[0]);
                      setHistoricData({ headers: rows[0].split(",").map(s => s.trim()), rows: data, raw: ev.target.result });
                    }; r.readAsText(f);
                  }} style={{ fontSize: 11, fontFamily: "inherit" }} />
                  {historicData && (
                    <div style={{ marginTop: 8, padding: 8, background: "#fff", borderRadius: 6, border: "1px solid #e0e0e8" }}>
                      <div style={{ fontSize: 10, fontWeight: 600, color: "#2a8c3e" }}>Loaded: {historicData.rows.length} rows of historic data</div>
                      <div style={{ fontSize: 9, color: "#6a6a7e", marginTop: 2 }}>Columns: {historicData.headers.join(", ")}</div>
                    </div>
                  )}
                </div>

                {/* PERSONA ROWS */}
                {audienceData.map((row, idx) => (
                  <div key={idx} style={{ background: "#ffffff", borderRadius: 10, padding: 14, marginBottom: 10, border: "1px solid #e0e0e8" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: "#2D1768" }}>Persona {idx + 1}: {row.persona || "Unnamed"}</div>
                      <div style={{ display: "flex", gap: 6 }}>
                        <button onClick={() => autoFillAudience(idx)} style={{ padding: "3px 10px", borderRadius: 4, border: "1px solid #7AC143", background: "#7AC14310", color: "#2a8c3e", fontSize: 9, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Auto-size</button>
                        {audienceData.length > 1 && <button onClick={() => setAudienceData(prev => prev.filter((_,i) => i !== idx))} style={{ background: "transparent", border: "none", color: "#cc3333", cursor: "pointer", fontSize: 12 }}>Remove</button>}
                      </div>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8, marginBottom: 8 }}>
                      <div>
                        <div style={{ fontSize: 9, fontWeight: 700, color: "#6a6a7e", marginBottom: 2 }}>Persona Name</div>
                        <input value={row.persona} onChange={e => setAudienceData(prev => prev.map((r,i) => i === idx ? {...r, persona: e.target.value} : r))} placeholder="e.g. HNWI Investors" style={{ width: "100%", padding: "6px 8px", background: "#fff", border: "1px solid #d0d0d8", borderRadius: 6, color: "#1a1a2e", fontSize: 11, fontFamily: "inherit", boxSizing: "border-box" }} />
                      </div>
                      <div>
                        <div style={{ fontSize: 9, fontWeight: 700, color: "#6a6a7e", marginBottom: 2 }}>Markets <span style={{ color: "#9a9aaa", fontWeight: 400 }}>(multi-select)</span></div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                          {["UAE","KSA","Kuwait","Qatar","UK","US","India","Germany","Australia","Singapore"].map(m => (
                            <button key={m} onClick={() => {
                              setAudienceData(prev => prev.map((r,i) => {
                                if (i !== idx) return r;
                                const markets = r.markets || [];
                                return {...r, markets: markets.includes(m) ? markets.filter(x => x !== m) : [...markets, m]};
                              }));
                            }} style={{ padding: "2px 6px", borderRadius: 3, border: "1px solid " + ((row.markets||[]).includes(m) ? "#2D1768" : "#d0d0d8"), background: (row.markets||[]).includes(m) ? "#2D176815" : "transparent", color: (row.markets||[]).includes(m) ? "#2D1768" : "#999", fontSize: 8, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>{m}</button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: 9, fontWeight: 700, color: "#6a6a7e", marginBottom: 2 }}>Platform</div>
                        <select value={row.platform} onChange={e => { setAudienceData(prev => prev.map((r,i) => i === idx ? {...r, platform: e.target.value} : r)); setTimeout(() => autoFillAudience(idx), 50); }} style={{ width: "100%", padding: "6px 8px", background: "#fff", border: "1px solid #d0d0d8", borderRadius: 6, color: "#1a1a2e", fontSize: 11, fontFamily: "inherit" }}>
                          {["Meta","TikTok","Snapchat","YouTube","Google Search","LinkedIn","X (Twitter)","Programmatic"].map(p => <option key={p}>{p}</option>)}
                        </select>
                      </div>
                      <div>
                        <div style={{ fontSize: 9, fontWeight: 700, color: "#6a6a7e", marginBottom: 2 }}>Age Range</div>
                        <select value={row.ageRange} onChange={e => { setAudienceData(prev => prev.map((r,i) => i === idx ? {...r, ageRange: e.target.value} : r)); setTimeout(() => autoFillAudience(idx), 50); }} style={{ width: "100%", padding: "6px 8px", background: "#fff", border: "1px solid #d0d0d8", borderRadius: 6, color: "#1a1a2e", fontSize: 11, fontFamily: "inherit" }}>
                          {["18-24","25-34","25-44","35-54","55+","all"].map(a => <option key={a}>{a}</option>)}
                        </select>
                      </div>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8 }}>
                      <div>
                        <div style={{ fontSize: 9, fontWeight: 700, color: "#6a6a7e", marginBottom: 2 }}>Gender</div>
                        <select value={row.gender} onChange={e => setAudienceData(prev => prev.map((r,i) => i === idx ? {...r, gender: e.target.value} : r))} style={{ width: "100%", padding: "6px 8px", background: "#fff", border: "1px solid #d0d0d8", borderRadius: 6, color: "#1a1a2e", fontSize: 11, fontFamily: "inherit" }}>
                          {["All","Male","Female"].map(g => <option key={g}>{g}</option>)}
                        </select>
                      </div>
                      <div>
                        <div style={{ fontSize: 9, fontWeight: 700, color: "#6a6a7e", marginBottom: 2 }}>Interests / Targeting</div>
                        <input value={row.interests} onChange={e => setAudienceData(prev => prev.map((r,i) => i === idx ? {...r, interests: e.target.value} : r))} placeholder="e.g. Luxury, Travel, Finance" style={{ width: "100%", padding: "6px 8px", background: "#fff", border: "1px solid #d0d0d8", borderRadius: 6, color: "#1a1a2e", fontSize: 11, fontFamily: "inherit", boxSizing: "border-box" }} />
                      </div>
                      <div>
                        <div style={{ fontSize: 9, fontWeight: 700, color: "#6a6a7e", marginBottom: 2 }}>Est. Audience Size <span style={{ color: "#7AC143" }}>●</span></div>
                        <input value={row.estimatedSize} onChange={e => setAudienceData(prev => prev.map((r,i) => i === idx ? {...r, estimatedSize: e.target.value} : r))} placeholder="Auto or manual" style={{ width: "100%", padding: "6px 8px", background: row.estimatedSize ? "#f0faf5" : "#fff", border: "1px solid " + (row.estimatedSize ? "#c0e0d0" : "#d0d0d8"), borderRadius: 6, color: "#1a1a2e", fontSize: 11, fontFamily: "monospace", boxSizing: "border-box", fontWeight: 600 }} />
                      </div>
                      <div>
                        <div style={{ fontSize: 9, fontWeight: 700, color: "#6a6a7e", marginBottom: 2 }}>Notes</div>
                        <input value={row.notes} onChange={e => setAudienceData(prev => prev.map((r,i) => i === idx ? {...r, notes: e.target.value} : r))} placeholder="e.g. CRM lookalikes" style={{ width: "100%", padding: "6px 8px", background: "#fff", border: "1px solid #d0d0d8", borderRadius: 6, color: "#1a1a2e", fontSize: 11, fontFamily: "inherit", boxSizing: "border-box" }} />
                      </div>
                    </div>
                    {(row.markets||[]).length > 1 && row.estimatedSize && (
                      <div style={{ marginTop: 6, fontSize: 9, color: "#6a6a7e" }}>Across {(row.markets||[]).length} markets: {(row.markets||[]).map(m => { const s = getAudienceSize(row.platform, [m], row.ageRange); return s > 0 ? `${m}: ${s.toLocaleString()}` : null; }).filter(Boolean).join(" | ")}</div>
                    )}
                  </div>
                ))}

                <button onClick={() => setAudienceData(prev => [...prev, { persona: "", description: "", markets: [], platform: "Meta", ageRange: "25-44", gender: "All", interests: "", estimatedSize: "", notes: "" }])} style={{ padding: "8px 16px", borderRadius: 8, border: "1px solid #2D1768", background: "#2D176810", color: "#2D1768", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>+ Add Persona</button>

                {audienceData.some(a => a.persona && a.estimatedSize) && (
                  <div style={{ marginTop: 14, padding: 12, background: "#f0faf5", borderRadius: 8, border: "1px solid #c0e0d0" }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#2a8c3e", marginBottom: 6 }}>Audience Summary</div>
                    <div style={{ display: "flex", gap: 16, flexWrap: "wrap", fontSize: 12, color: "#444455" }}>
                      <div><strong>Total Personas:</strong> {audienceData.filter(a => a.persona).length}</div>
                      <div><strong>Total Est. Reach:</strong> {audienceData.reduce((sum, a) => sum + (parseInt(String(a.estimatedSize).replace(/,/g, "")) || 0), 0).toLocaleString()}</div>
                      <div><strong>Markets:</strong> {[...new Set(audienceData.flatMap(a => a.markets || []))].join(", ") || "None"}</div>
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
                        })}\n\nProvide 3-6 line items with realistic regional benchmark numbers. Use real CPM/CPC/CPL ranges.\n\nBrief: ${aiPrompt}\n\nTarget Personas:\n${audienceData.filter(a => a.persona).map((a,i) => `Persona ${i+1}: ${a.persona} - Markets: ${(a.markets||[]).join(", ")}, Platform: ${a.platform}, Age: ${a.ageRange}, Gender: ${a.gender}, Interests: ${a.interests}, Est. Size: ${a.estimatedSize}, Notes: ${a.notes}`).join("\n")}${basePlanId && savedPlans.find(p => p.id === basePlanId) ? `\n\nPREVIOUS PLAN TO BUILD ON:\n${JSON.stringify(savedPlans.find(p => p.id === basePlanId)?.line_items || [])}` : ""}${historicData ? `\n\nHISTORIC CAMPAIGN DATA (use to calibrate benchmarks):\n${historicData.raw}` : ""}` }]
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
                      <button onClick={() => { try { const plan = JSON.parse(aiResult); savePlan({ name: plan.campaign?.campaign_name || plan.campaign?.client || "Untitled Plan", campaign: plan.campaign, line_items: plan.line_items, summary: plan.summary, notes: plan.notes, prompt: aiPrompt }); alert("Plan saved!"); } catch { alert("Could not save - generate a plan first"); } }} style={{ padding: "10px 20px", borderRadius: 8, border: "1px solid #2D1768", background: "#2D176810", color: "#2D1768", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Save Plan</button>
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

          {/* RATE CARD DATABASE */}
          {activeSection === "ratecard" && (
            <div>
              <SectionTitle>Rate Card / CPM Database</SectionTitle>
              <SectionDesc>Searchable benchmark database by platform, market, objective, and format. Use as directional guidance for planning - always validate with platform reps for current rates.</SectionDesc>

              <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
                {[
                  { key: "platform", label: "Platform", options: ["All", "Meta", "TikTok", "Snapchat", "YouTube", "Google Search", "LinkedIn", "X (Twitter)", "Programmatic", "Pinterest"] },
                  { key: "market", label: "Market", options: ["All", "US/Canada", "UK/Europe", "UAE", "KSA", "India", "China", "SEA", "Australia"] },
                  { key: "objective", label: "Objective", options: ["All", "Awareness", "Video Views", "Traffic", "Lead Gen", "Conversions", "App Install", "Engagement"] },
                ].map(f => (
                  <div key={f.key}>
                    <div style={{ fontSize: 9, fontWeight: 700, color: "#6a6a7e", marginBottom: 3 }}>{f.label}</div>
                    <select value={rateCardFilter[f.key]} onChange={e => setRateCardFilter(p => ({...p, [f.key]: e.target.value}))} style={{ padding: "6px 10px", background: "#fff", border: "1px solid #d0d0d8", borderRadius: 6, color: "#1a1a2e", fontSize: 11, fontFamily: "inherit" }}>
                      {f.options.map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                ))}
              </div>

              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid #d0d0e0" }}>
                      {["Platform", "Market", "Objective", "Format", "Buying Model", "Low", "Mid", "High", "Currency", "Notes"].map(h => (
                        <th key={h} style={{ padding: "8px 6px", textAlign: "left", color: "#555566", fontSize: 9, fontWeight: 700, textTransform: "uppercase" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { platform: "Meta", market: "US/Canada", objective: "Awareness", format: "Feed Image/Video", buying: "CPM", low: 8, mid: 14, high: 22, notes: "Q4 peaks $18-25. Ramadan N/A." },
                      { platform: "Meta", market: "UK/Europe", objective: "Awareness", format: "Feed Image/Video", buying: "CPM", low: 6, mid: 11, high: 18, notes: "GDPR consent impacts reach." },
                      { platform: "Meta", market: "UAE", objective: "Awareness", format: "Feed Image/Video", buying: "CPM", low: 4, mid: 7, high: 15, notes: "Ramadan Feb-Mar: 2-3x spike." },
                      { platform: "Meta", market: "KSA", objective: "Awareness", format: "Feed Image/Video", buying: "CPM", low: 5, mid: 9, high: 18, notes: "Arabic creative essential." },
                      { platform: "Meta", market: "India", objective: "Awareness", format: "Feed Image/Video", buying: "CPM", low: 1.5, mid: 3, high: 6, notes: "Massive reach, low CPMs." },
                      { platform: "Meta", market: "SEA", objective: "Awareness", format: "Feed Image/Video", buying: "CPM", low: 2, mid: 4, high: 8, notes: "Varies by country within SEA." },
                      { platform: "Meta", market: "US/Canada", objective: "Traffic", format: "Feed/Stories", buying: "CPC", low: 0.50, mid: 1.20, high: 2.50, notes: "LPV optimisation recommended." },
                      { platform: "Meta", market: "UAE", objective: "Traffic", format: "Feed/Stories", buying: "CPC", low: 0.20, mid: 0.50, high: 1.20, notes: "Optimise for LPV not clicks." },
                      { platform: "Meta", market: "UAE", objective: "Lead Gen", format: "Lead Forms", buying: "CPL", low: 5, mid: 15, high: 35, notes: "In-platform forms convert 2-3x better." },
                      { platform: "Meta", market: "US/Canada", objective: "Lead Gen", format: "Lead Forms", buying: "CPL", low: 15, mid: 35, high: 80, notes: "Varies hugely by vertical." },
                      { platform: "Meta", market: "UAE", objective: "Conversions", format: "Advantage+ Sales", buying: "CPA", low: 10, mid: 30, high: 80, notes: "CAPI required. 8-12 creatives." },
                      { platform: "TikTok", market: "US/Canada", objective: "Awareness", format: "In-Feed Video", buying: "CPM", low: 6, mid: 12, high: 20, notes: "TopView reservation: $50K+/day." },
                      { platform: "TikTok", market: "UAE", objective: "Awareness", format: "In-Feed Video", buying: "CPM", low: 5, mid: 10, high: 18, notes: "Arabic content critical." },
                      { platform: "TikTok", market: "KSA", objective: "Awareness", format: "In-Feed Video", buying: "CPM", low: 6, mid: 12, high: 22, notes: "Highest TikTok usage regionally." },
                      { platform: "TikTok", market: "SEA", objective: "Awareness", format: "In-Feed Video", buying: "CPM", low: 2, mid: 5, high: 10, notes: "TikTok Shop live in SEA." },
                      { platform: "TikTok", market: "UAE", objective: "Video Views", format: "In-Feed Video", buying: "CPV", low: 0.01, mid: 0.03, high: 0.08, notes: "Spark Ads 70% better CTR." },
                      { platform: "Snapchat", market: "KSA", objective: "Awareness", format: "Snap Ad/Story", buying: "CPM", low: 3, mid: 5, high: 12, notes: "60-70% penetration. Non-negotiable." },
                      { platform: "Snapchat", market: "UAE", objective: "Awareness", format: "Snap Ad/Story", buying: "CPM", low: 4, mid: 6, high: 14, notes: "Strong youth audience." },
                      { platform: "Snapchat", market: "US/Canada", objective: "Awareness", format: "Snap Ad/Story", buying: "CPM", low: 5, mid: 8, high: 16, notes: "AR Lens: $15K-$50K reservation." },
                      { platform: "YouTube", market: "US/Canada", objective: "Video Views", format: "TrueView", buying: "CPV", low: 0.02, mid: 0.06, high: 0.12, notes: "Skip after 5s. 15-30s ideal." },
                      { platform: "YouTube", market: "UAE", objective: "Video Views", format: "TrueView", buying: "CPV", low: 0.01, mid: 0.03, high: 0.08, notes: "Arabic content high consumption." },
                      { platform: "YouTube", market: "UAE", objective: "Awareness", format: "Bumper/Non-Skip", buying: "CPM", low: 5, mid: 10, high: 20, notes: "Masthead: book 4-8 weeks ahead." },
                      { platform: "Google Search", market: "US/Canada", objective: "Traffic", format: "Text Ads", buying: "CPC", low: 1.50, mid: 4.00, high: 12.00, notes: "Varies hugely by vertical." },
                      { platform: "Google Search", market: "UAE", objective: "Traffic", format: "Text Ads", buying: "CPC", low: 0.80, mid: 2.50, high: 8.00, notes: "Brand terms much cheaper." },
                      { platform: "Google Search", market: "UAE", objective: "Lead Gen", format: "Search + PMax", buying: "CPL", low: 20, mid: 60, high: 200, notes: "Real estate/luxury CPL $100+." },
                      { platform: "LinkedIn", market: "US/Canada", objective: "Awareness", format: "Sponsored Content", buying: "CPM", low: 30, mid: 55, high: 90, notes: "Premium B2B audience." },
                      { platform: "LinkedIn", market: "UAE", objective: "Awareness", format: "Sponsored Content", buying: "CPM", low: 20, mid: 35, high: 65, notes: "Growing enterprise sector." },
                      { platform: "LinkedIn", market: "UAE", objective: "Lead Gen", format: "Lead Gen Forms", buying: "CPL", low: 30, mid: 80, high: 200, notes: "Pre-filled forms convert best." },
                      { platform: "X (Twitter)", market: "UAE", objective: "Awareness", format: "Promoted Ads", buying: "CPM", low: 6, mid: 12, high: 22, notes: "Best for live events/moments." },
                      { platform: "Programmatic", market: "UAE", objective: "Awareness", format: "Display Banner", buying: "CPM", low: 2, mid: 8, high: 18, notes: "PMPs: $8-15. Open: $2-5." },
                      { platform: "Programmatic", market: "UAE", objective: "Awareness", format: "CTV (Shahid/OSN+)", buying: "CPM", low: 15, mid: 30, high: 50, notes: "PMP only. Near 100% viewability." },
                      { platform: "Programmatic", market: "US/Canada", objective: "Awareness", format: "CTV (Hulu/Peacock)", buying: "CPM", low: 20, mid: 35, high: 55, notes: "Premium inventory. Non-skip." },
                      { platform: "Programmatic", market: "UAE", objective: "Awareness", format: "DOOH", buying: "CPM", low: 8, mid: 20, high: 45, notes: "Premium locations: Dubai Mall, SZR." },
                    ].filter(r => (rateCardFilter.platform === "All" || r.platform === rateCardFilter.platform) && (rateCardFilter.market === "All" || r.market === rateCardFilter.market) && (rateCardFilter.objective === "All" || r.objective === rateCardFilter.objective)).map((r, i) => (
                      <tr key={i} style={{ borderBottom: "1px solid #f0f0f5", background: i % 2 === 0 ? "#f9f9fb" : "transparent" }}>
                        <td style={{ padding: "6px", fontWeight: 600, color: "#1a1a2e" }}>{r.platform}</td>
                        <td style={{ padding: "6px", color: "#555566" }}>{r.market}</td>
                        <td style={{ padding: "6px", color: "#555566" }}>{r.objective}</td>
                        <td style={{ padding: "6px", color: "#555566" }}>{r.format}</td>
                        <td style={{ padding: "6px" }}><Chip color="blue">{r.buying}</Chip></td>
                        <td style={{ padding: "6px", color: "#2a8c3e", fontFamily: "monospace", fontWeight: 600 }}>${r.low}</td>
                        <td style={{ padding: "6px", color: "#b8860b", fontFamily: "monospace", fontWeight: 600 }}>${r.mid}</td>
                        <td style={{ padding: "6px", color: "#cc3333", fontFamily: "monospace", fontWeight: 600 }}>${r.high}</td>
                        <td style={{ padding: "6px", color: "#6a6a7e", fontSize: 10 }}>USD</td>
                        <td style={{ padding: "6px", color: "#6a6a7e", fontSize: 10, maxWidth: 180 }}>{r.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Card style={{ marginTop: 16, background: "#f0edf5", border: "1px solid #d0c0e0" }}>
                <div style={{ fontSize: 11, color: "#555566" }}><strong style={{ color: "#2D1768" }}>Note:</strong> All rates are directional benchmarks based on agency experience. Actual rates vary by auction dynamics, creative quality, targeting, seasonality, and client vertical. Always confirm with platform reps for current pricing and minimum commitments.</div>
              </Card>
            </div>
          )}

          {/* PACING TRACKER */}
          {activeSection === "pacing" && (
            <div>
              <SectionTitle>Campaign Pacing & Budget Tracker</SectionTitle>
              <SectionDesc>Monitor daily spend against monthly budgets. Traffic light system flags campaigns that are over or under-pacing so you can adjust before it's too late.</SectionDesc>

              <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                <button onClick={() => setPacingRows(p => [...p, { campaign: `Campaign ${p.length + 1}`, budget: 50000, spent: 0, daysElapsed: 1, totalDays: 30 }])} style={{ padding: "8px 16px", borderRadius: 8, border: "1px solid #2D1768", background: "#2D176810", color: "#2D1768", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>+ Add Campaign</button>
                <button onClick={() => {
                  const rows = pacingRows.map(row => {
                    const dailyTarget = row.budget / row.totalDays;
                    const actualDaily = row.daysElapsed > 0 ? row.spent / row.daysElapsed : 0;
                    const projectedEOM = actualDaily * row.totalDays;
                    const idealSpent = dailyTarget * row.daysElapsed;
                    const pacingPct = idealSpent > 0 ? (row.spent / idealSpent) * 100 : 0;
                    const variance = projectedEOM - row.budget;
                    const status = pacingPct >= 90 && pacingPct <= 110 ? "On Track" : pacingPct > 110 ? "Over-pacing" : "Under-pacing";
                    return `<tr><td>${row.campaign}</td><td>$${row.budget.toLocaleString()}</td><td>$${row.spent.toLocaleString()}</td><td>${row.daysElapsed}</td><td>${row.totalDays}</td><td>$${dailyTarget.toFixed(0)}</td><td>$${actualDaily.toFixed(0)}</td><td>${pacingPct.toFixed(0)}%</td><td>$${projectedEOM.toFixed(0)}</td><td>$${variance.toFixed(0)}</td><td>${status}</td></tr>`;
                  }).join("");
                  const html = `<html><head><meta charset="UTF-8"><style>td,th{font-family:Arial;font-size:10pt;padding:4px 8px;border:1px solid #ddd}th{background:#2D1768;color:white;font-weight:bold}</style></head><body><table><tr><th>Campaign</th><th>Monthly Budget</th><th>Spent to Date</th><th>Day</th><th>Total Days</th><th>Daily Target</th><th>Actual Daily</th><th>Pacing %</th><th>Projected EOM</th><th>Variance</th><th>Status</th></tr>${rows}</table></body></html>`;
                  const blob = new Blob([html], { type: "application/vnd.ms-excel" });
                  const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
                  a.download = `Pacing_Report_${new Date().toISOString().split("T")[0]}.xls`; a.click();
                }} style={{ padding: "8px 16px", borderRadius: 8, border: "1px solid #7AC143", background: "#7AC14310", color: "#2a8c3e", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Export Excel</button>
              </div>

              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid #d0d0e0" }}>
                      {["Campaign", "Monthly Budget", "Spent to Date", "Day", "Total Days", "Daily Target", "Actual Daily", "Pacing", "Projected EOM", "Variance", "Status", ""].map(h => (
                        <th key={h} style={{ padding: "8px 4px", textAlign: "left", color: "#555566", fontSize: 9, fontWeight: 700, textTransform: "uppercase" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {pacingRows.map((row, i) => {
                      const dailyTarget = row.budget / row.totalDays;
                      const idealSpent = dailyTarget * row.daysElapsed;
                      const actualDaily = row.daysElapsed > 0 ? row.spent / row.daysElapsed : 0;
                      const projectedEOM = actualDaily * row.totalDays;
                      const pacingPct = idealSpent > 0 ? (row.spent / idealSpent) * 100 : 0;
                      const variance = projectedEOM - row.budget;
                      const variancePct = row.budget > 0 ? (variance / row.budget) * 100 : 0;
                      const status = pacingPct >= 90 && pacingPct <= 110 ? "on-track" : pacingPct > 110 ? "over" : "under";
                      const statusColor = status === "on-track" ? "#2a8c3e" : status === "over" ? "#cc3333" : "#b8860b";
                      const statusBg = status === "on-track" ? "#e8f5e9" : status === "over" ? "#ffebee" : "#fff8e1";
                      const statusIcon = status === "on-track" ? "🟢" : status === "over" ? "🔴" : "🟡";

                      return (
                        <tr key={i} style={{ borderBottom: "1px solid #f0f0f5" }}>
                          <td style={{ padding: "6px" }}><input value={row.campaign} onChange={e => setPacingRows(p => p.map((r,ri) => ri === i ? {...r, campaign: e.target.value} : r))} style={{ width: 120, padding: "4px 6px", border: "1px solid #d0d0d8", borderRadius: 4, fontSize: 11, fontFamily: "inherit", color: "#1a1a2e", background: "#fff" }} /></td>
                          <td style={{ padding: "6px" }}><input type="number" value={row.budget} onChange={e => setPacingRows(p => p.map((r,ri) => ri === i ? {...r, budget: Number(e.target.value)} : r))} style={{ width: 80, padding: "4px 6px", border: "1px solid #d0d0d8", borderRadius: 4, fontSize: 11, fontFamily: "monospace", color: "#1a1a2e", background: "#fff" }} /></td>
                          <td style={{ padding: "6px" }}><input type="number" value={row.spent} onChange={e => setPacingRows(p => p.map((r,ri) => ri === i ? {...r, spent: Number(e.target.value)} : r))} style={{ width: 80, padding: "4px 6px", border: "1px solid #d0d0d8", borderRadius: 4, fontSize: 11, fontFamily: "monospace", color: "#1a1a2e", background: "#fff" }} /></td>
                          <td style={{ padding: "6px" }}><input type="number" value={row.daysElapsed} onChange={e => setPacingRows(p => p.map((r,ri) => ri === i ? {...r, daysElapsed: Number(e.target.value)} : r))} style={{ width: 40, padding: "4px 6px", border: "1px solid #d0d0d8", borderRadius: 4, fontSize: 11, fontFamily: "monospace", color: "#1a1a2e", background: "#fff", textAlign: "center" }} /></td>
                          <td style={{ padding: "6px" }}><input type="number" value={row.totalDays} onChange={e => setPacingRows(p => p.map((r,ri) => ri === i ? {...r, totalDays: Number(e.target.value)} : r))} style={{ width: 40, padding: "4px 6px", border: "1px solid #d0d0d8", borderRadius: 4, fontSize: 11, fontFamily: "monospace", color: "#1a1a2e", background: "#fff", textAlign: "center" }} /></td>
                          <td style={{ padding: "6px", fontFamily: "monospace", color: "#555566" }}>${dailyTarget.toFixed(0)}</td>
                          <td style={{ padding: "6px", fontFamily: "monospace", fontWeight: 600, color: statusColor }}>${actualDaily.toFixed(0)}</td>
                          <td style={{ padding: "6px" }}><span style={{ padding: "2px 8px", borderRadius: 10, background: statusBg, color: statusColor, fontSize: 10, fontWeight: 700 }}>{pacingPct.toFixed(0)}%</span></td>
                          <td style={{ padding: "6px", fontFamily: "monospace", fontWeight: 600, color: "#1a1a2e" }}>${projectedEOM.toLocaleString(undefined, {maximumFractionDigits: 0})}</td>
                          <td style={{ padding: "6px", fontFamily: "monospace", fontWeight: 600, color: statusColor }}>{variance >= 0 ? "+" : ""}${variance.toLocaleString(undefined, {maximumFractionDigits: 0})} ({variancePct >= 0 ? "+" : ""}{variancePct.toFixed(1)}%)</td>
                          <td style={{ padding: "6px", fontSize: 14 }}>{statusIcon}</td>
                          <td style={{ padding: "6px" }}><button onClick={() => setPacingRows(p => p.filter((_,ri) => ri !== i))} style={{ background: "transparent", border: "none", color: "#cc3333", cursor: "pointer", fontSize: 12 }}>x</button></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <Card style={{ marginTop: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#1a1a2e", marginBottom: 8 }}>Pacing Legend</div>
                <div style={{ display: "flex", gap: 20, fontSize: 11, color: "#555566" }}>
                  <span>🟢 <strong style={{ color: "#2a8c3e" }}>On Track</strong> (90-110%)</span>
                  <span>🟡 <strong style={{ color: "#b8860b" }}>Under-pacing</strong> (&lt;90%) - Increase bids/budgets or broaden targeting</span>
                  <span>🔴 <strong style={{ color: "#cc3333" }}>Over-pacing</strong> (&gt;110%) - Reduce daily caps or narrow targeting</span>
                </div>
              </Card>
            </div>
          )}

          {/* CROSS-MARKET PLANNING MATRIX */}
          {activeSection === "marketmatrix" && (
            <div>
              <SectionTitle>Cross-Market Planning Matrix</SectionTitle>
              <SectionDesc>Toggle platforms on/off per market. Auto-calculates total budget needed and flags markets where spend falls below platform learning minimums.</SectionDesc>

              {(() => {
                const markets = ["UAE", "KSA", "Kuwait", "Qatar", "UK", "US", "Germany", "France", "India", "China", "Singapore", "Australia"];
                const plats = [
                  { name: "Meta", min: 5000, icon: "Meta" },
                  { name: "TikTok", min: 5000, icon: "TikTok" },
                  { name: "Snap", min: 5000, icon: "Snap" },
                  { name: "YouTube", min: 5000, icon: "YT" },
                  { name: "Google", min: 10000, icon: "Ggl" },
                  { name: "LinkedIn", min: 10000, icon: "Li" },
                  { name: "X", min: 5000, icon: "X" },
                  { name: "Prog", min: 20000, icon: "Prg" },
                ];
                const toggleCell = (market, plat) => setMarketMatrix(p => ({...p, [`${market}_${plat}`]: !p[`${market}_${plat}`]}));
                const activeCount = Object.values(marketMatrix).filter(Boolean).length;
                const perCell = activeCount > 0 ? matBudget / activeCount : 0;
                const marketTotals = {};
                markets.forEach(m => { marketTotals[m] = plats.filter(p => marketMatrix[`${m}_${p.name}`]).length * perCell; });

                return (<>
                  <Card style={{ marginBottom: 16, padding: 14 }}>
                    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                      <div>
                        <div style={{ fontSize: 10, fontWeight: 700, color: "#6a6a7e", marginBottom: 4 }}>Total Monthly Budget (USD)</div>
                        <input type="number" value={matBudget} onChange={e => setMatBudget(Number(e.target.value))} style={{ width: 140, padding: "8px 10px", background: "#fff", border: "1px solid #d0d0d8", borderRadius: 6, fontSize: 14, fontWeight: 700, fontFamily: "monospace", color: "#2D1768" }} />
                      </div>
                      <div style={{ fontSize: 11, color: "#555566" }}>
                        Active cells: <strong>{activeCount}</strong> | Per cell: <strong>${perCell.toLocaleString(undefined, {maximumFractionDigits: 0})}</strong>
                      </div>
                    </div>
                  </Card>

                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
                      <thead>
                        <tr>
                          <th style={{ padding: "8px 6px", textAlign: "left", color: "#555566", fontSize: 9, fontWeight: 700, minWidth: 80 }}>MARKET</th>
                          {plats.map(p => <th key={p.name} style={{ padding: "8px 4px", textAlign: "center", color: "#555566", fontSize: 9, fontWeight: 700, minWidth: 60 }}>{p.name}<br/><span style={{ color: "#9a9aaa", fontWeight: 400 }}>${(p.min/1000).toFixed(0)}K min</span></th>)}
                          <th style={{ padding: "8px 6px", textAlign: "right", color: "#555566", fontSize: 9, fontWeight: 700 }}>TOTAL</th>
                        </tr>
                      </thead>
                      <tbody>
                        {markets.map(market => {
                          const total = marketTotals[market];
                          const hasIssue = plats.some(p => marketMatrix[`${market}_${p.name}`] && perCell < p.min);
                          return (
                            <tr key={market} style={{ borderBottom: "1px solid #f0f0f5" }}>
                              <td style={{ padding: "6px", fontWeight: 700, color: "#1a1a2e" }}>{market}</td>
                              {plats.map(p => {
                                const key = `${market}_${p.name}`;
                                const active = marketMatrix[key];
                                const belowMin = active && perCell < p.min;
                                return (
                                  <td key={p.name} style={{ padding: "4px", textAlign: "center" }}>
                                    <button onClick={() => toggleCell(market, p.name)} style={{
                                      width: 36, height: 28, borderRadius: 6, border: belowMin ? "2px solid #cc3333" : active ? "2px solid #7AC143" : "1px solid #d0d0d8",
                                      background: belowMin ? "#ffebee" : active ? "#e8f5e9" : "#f9f9fb",
                                      color: active ? "#2a8c3e" : "#d0d0d8", fontSize: 12, fontWeight: 800, cursor: "pointer", fontFamily: "inherit"
                                    }}>{active ? "✓" : ""}</button>
                                  </td>
                                );
                              })}
                              <td style={{ padding: "6px", textAlign: "right", fontFamily: "monospace", fontWeight: 700, color: total > 0 ? "#1a1a2e" : "#d0d0d8" }}>${total.toLocaleString(undefined, {maximumFractionDigits: 0})}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {Object.values(marketMatrix).some(Boolean) && plats.some(p => Object.entries(marketMatrix).some(([k,v]) => v && k.endsWith(`_${p.name}`) && perCell < p.min)) && (
                    <Card style={{ marginTop: 16, background: "#ffebee", border: "1px solid #ffcdd2" }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: "#cc3333", marginBottom: 4 }}>Budget Warning</div>
                      <div style={{ fontSize: 11, color: "#555566" }}>
                        Some cells are below platform learning minimums (highlighted in red). At ${perCell.toLocaleString(undefined, {maximumFractionDigits: 0})} per cell, consider: reducing markets, reducing platforms per market, or increasing total budget. Platforms below minimum won't exit learning phase and will underperform.
                      </div>
                    </Card>
                  )}
                </>);
              })()}
            </div>
          )}


          {/* ETIHAD REPORT BUILDER */}
          {activeSection === "qbr" && (
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
                <div style={{ width: 40, height: 40, borderRadius: 8, background: "#1A1A2E", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 12L12 3L21 12L12 21Z" fill="#BD8B13" opacity="0.8"/><path d="M7 12L12 7L17 12L12 17Z" fill="#BD8B13"/></svg>
                </div>
                <div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: "#1A1A2E", letterSpacing: "-0.02em" }}>Etihad Airways - Campaign Report Builder</div>
                  <div style={{ fontSize: 11, color: "#BD8B13", fontWeight: 600 }}>Performance Analysis & Insights Deck Generator</div>
                </div>
              </div>
              <SectionDesc>Upload weekly/monthly performance data with time periods. AI analyses trends, generates observations, and exports a branded Etihad PPTX deck.</SectionDesc>

              <Card style={{ marginBottom: 16, padding: 18, borderLeft: "4px solid #BD8B13" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#1A1A2E", marginBottom: 12 }}>Step 1: Campaign Details</div>
                {savedPlans.length > 0 && (
                  <div style={{ marginBottom: 14, padding: 12, background: "#f0edf5", borderRadius: 8, border: "1px solid #d0c0e0" }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: "#2D1768", marginBottom: 4 }}>Link to Saved Media Plan (optional)</div>
                    <div style={{ fontSize: 9, color: "#6a6a7e", marginBottom: 6 }}>Select a saved plan to give the AI context on what was planned vs what actually happened.</div>
                    <select onChange={e => {
                      const plan = savedPlans.find(p => p.id === Number(e.target.value));
                      if (plan) {
                        setQbrData(p => ({...p,
                          campaign: plan.name || p.campaign,
                          linkedPlan: plan,
                          context: (p.context || "") + "\n\nLinked Media Plan:\n" + (plan.line_items||[]).map(li => `${li.platform} - ${li.placement}: $${li.media_cost_usd} (${li.buying_unit} $${li.unit_cost})`).join("\n") + "\n\nPlanned Budget: $" + (plan.summary?.total_investment_usd || "N/A") + "\nPlanned Notes: " + (plan.notes||[]).join("; ")
                        }));
                      }
                    }} style={{ width: "100%", padding: "6px 8px", background: "#fff", border: "1px solid #d0d0d8", borderRadius: 6, fontSize: 11, fontFamily: "inherit", color: "#1a1a2e" }}>
                      <option value="">-- No plan linked --</option>
                      {savedPlans.map(plan => <option key={plan.id} value={plan.id}>{plan.name} (saved {new Date(plan.savedAt).toLocaleDateString()})</option>)}
                    </select>
                  </div>
                )}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 12 }}>
                  {[
                    { k: "campaign", l: "Campaign Name", p: "e.g. EY Brand Awareness - Q1 2026" },
                    { k: "period", l: "Reporting Period", p: "e.g. January - March 2026" },
                    { k: "objective", l: "Campaign Objective", p: "e.g. Awareness, Traffic, Bookings" },
                  ].map(f => (
                    <div key={f.k}>
                      <div style={{ fontSize: 10, fontWeight: 700, color: "#6a6a7e", marginBottom: 3 }}>{f.l}</div>
                      <input value={qbrData[f.k] || ""} onChange={e => setQbrData(p => ({...p, [f.k]: e.target.value}))} placeholder={f.p} style={{ width: "100%", padding: "8px 10px", background: "#fff", border: "1px solid #d0d0d8", borderRadius: 6, fontSize: 12, fontFamily: "inherit", color: "#1a1a2e", boxSizing: "border-box" }} />
                    </div>
                  ))}
                </div>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "#6a6a7e", marginBottom: 3 }}>Additional Context for AI Analysis</div>
                  <textarea value={qbrData.context || ""} onChange={e => setQbrData(p => ({...p, context: e.target.value}))} placeholder={"Provide any context that would help the AI analyse performance: budget changes mid-flight, creative refreshes, seasonal factors (Ramadan, holidays), competitor activity, tracking issues, new routes launched, fare sales, etc."} style={{ width: "100%", minHeight: 70, padding: "8px 10px", background: "#fff", border: "1px solid #d0d0d8", borderRadius: 6, fontSize: 12, fontFamily: "inherit", color: "#1a1a2e", boxSizing: "border-box", resize: "vertical", lineHeight: 1.5 }} />
                </div>
              </Card>

              <Card style={{ marginBottom: 16, padding: 18, borderLeft: "4px solid #1A1A2E" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#1A1A2E", marginBottom: 4 }}>Step 2: Performance Data</div>
                <div style={{ fontSize: 11, color: "#6a6a7e", marginBottom: 12 }}>Upload CSV with time periods for trend analysis, or add rows manually.</div>

                <div style={{ marginBottom: 12, padding: 12, background: "#f9f9fb", borderRadius: 8, border: "1px dashed #d0d0d8" }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "#6a6a7e", marginBottom: 4 }}>Upload CSV</div>
                  <div style={{ fontSize: 9, color: "#9a9aaa", marginBottom: 6 }}>Columns: Period, Platform, Spend, Impressions, Clicks, Conversions, Revenue</div>
                  <input type="file" accept=".csv" onChange={e => {
                    const f = e.target.files[0]; if (!f) return;
                    const r = new FileReader(); r.onload = ev => {
                      const rows = ev.target.result.split("\n").filter(r => r.trim());
                      const data = rows.slice(1).map(r => { const c = r.split(",").map(s => s.trim()); return { period: c[0]||"", platform: c[1]||"", spend: c[2]||"0", impressions: c[3]||"0", clicks: c[4]||"0", conversions: c[5]||"0", revenue: c[6]||"0" }; }).filter(r => r.platform);
                      setQbrData(p => ({...p, platforms: data}));
                    }; r.readAsText(f);
                  }} style={{ fontSize: 11, fontFamily: "inherit" }} />
                </div>

                <button onClick={() => setQbrData(p => ({...p, platforms: [...(p.platforms||[]), {period:"Week 1", platform:"Meta", spend:"", impressions:"", clicks:"", conversions:"", revenue:""}]}))} style={{ padding: "6px 14px", borderRadius: 6, border: "1px solid #1A1A2E", background: "#1A1A2E10", color: "#1A1A2E", fontSize: 10, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", marginBottom: 10 }}>+ Add Row</button>

                {(qbrData.platforms||[]).length > 0 && (
                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 10 }}>
                      <thead><tr style={{ borderBottom: "2px solid #1A1A2E" }}>{["Period","Platform","Spend","Impressions","Clicks","Conversions","Revenue",""].map(h => <th key={h} style={{ padding: "6px 4px", textAlign: "left", color: "#1A1A2E", fontSize: 9, fontWeight: 700 }}>{h}</th>)}</tr></thead>
                      <tbody>{(qbrData.platforms||[]).map((p,i) => <tr key={i} style={{ borderBottom: "1px solid #f0f0f5" }}>
                        <td style={{ padding: "3px" }}><input value={p.period} onChange={e => setQbrData(prev => ({...prev, platforms: prev.platforms.map((pl,pi) => pi===i?{...pl,period:e.target.value}:pl)}))} style={{ width: 70, padding: "4px", background: "#fff", border: "1px solid #d0d0d8", borderRadius: 4, fontSize: 10, fontFamily: "inherit" }} /></td>
                        <td style={{ padding: "3px" }}><select value={p.platform} onChange={e => setQbrData(prev => ({...prev, platforms: prev.platforms.map((pl,pi) => pi===i?{...pl,platform:e.target.value}:pl)}))} style={{ padding: "4px", background: "#fff", border: "1px solid #d0d0d8", borderRadius: 4, fontSize: 10, fontFamily: "inherit" }}>{["Meta","TikTok","Snapchat","YouTube","Google Search","Google PMax","Google DV360","LinkedIn","X (Twitter)","Programmatic","Pinterest","Other"].map(o => <option key={o}>{o}</option>)}</select></td>
                        {["spend","impressions","clicks","conversions","revenue"].map(f => <td key={f} style={{ padding: "3px" }}><input value={p[f]} onChange={e => setQbrData(prev => ({...prev, platforms: prev.platforms.map((pl,pi) => pi===i?{...pl,[f]:e.target.value}:pl)}))} placeholder="0" style={{ width: 75, padding: "4px", background: "#fff", border: "1px solid #d0d0d8", borderRadius: 4, fontSize: 10, fontFamily: "monospace" }} /></td>)}
                        <td><button onClick={() => setQbrData(prev => ({...prev, platforms: prev.platforms.filter((_,pi) => pi!==i)}))} style={{ background: "transparent", border: "none", color: "#cc3333", cursor: "pointer", fontSize: 11 }}>x</button></td>
                      </tr>)}</tbody>
                    </table>
                    <div style={{ fontSize: 10, color: "#6a6a7e", marginTop: 6 }}>{(qbrData.platforms||[]).length} rows | {[...new Set((qbrData.platforms||[]).map(p => p.period))].length} periods | {[...new Set((qbrData.platforms||[]).map(p => p.platform))].length} platforms</div>
                  </div>
                )}
              </Card>

              {(qbrData.platforms||[]).length > 0 && (
                <Card style={{ marginBottom: 16, padding: 18, borderLeft: "4px solid #BD8B13" }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#1A1A2E", marginBottom: 4 }}>Step 3: Generate AI Analysis & PPTX</div>
                  <div style={{ fontSize: 11, color: "#6a6a7e", marginBottom: 10 }}>AI will analyse trends over time, identify insights, and generate an Etihad-branded deck.</div>

                  <div style={{ marginBottom: 10 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: "#6a6a7e", marginBottom: 3 }}>Anthropic API Key</div>
                    <input type="password" id="qbrApiKey" placeholder="sk-ant-..." style={{ width: 300, padding: "6px 8px", background: "#fff", border: "1px solid #d0d0d8", borderRadius: 6, fontSize: 11, fontFamily: "monospace", boxSizing: "border-box" }} />
                  </div>

                  <button onClick={async () => {
                    const apiKey = document.getElementById("qbrApiKey")?.value;
                    if (!apiKey) { alert("Please enter your API key"); return; }
                    setQbrData(p => ({...p, aiLoading: true, aiParsed: null}));
                    try {
                      const ps = qbrData.platforms || [];
                      const periods = [...new Set(ps.map(p => p.period))];
                      const platNames = [...new Set(ps.map(p => p.platform))];

                      const trendData = periods.map(period => {
                        const periodRows = ps.filter(p => p.period === period);
                        return { period, platforms: periodRows.map(r => ({ platform: r.platform, spend: parseFloat(r.spend)||0, impressions: parseFloat(r.impressions)||0, clicks: parseFloat(r.clicks)||0, conversions: parseFloat(r.conversions)||0, revenue: parseFloat(r.revenue)||0 })) };
                      });

                      const prompt = `You are a senior media strategist at PHD agency analysing an Etihad Airways digital campaign. Analyse this time-series performance data and generate a comprehensive report. Respond ONLY in valid JSON.

Campaign: ${qbrData.campaign || "Etihad Campaign"}
Period: ${qbrData.period || "N/A"}
Objective: ${qbrData.objective || "N/A"}
Additional Context: ${qbrData.context || "None provided"}\n\nLinked Media Plan: ${qbrData.linkedPlan ? JSON.stringify({campaign: qbrData.linkedPlan.campaign, line_items: qbrData.linkedPlan.line_items?.map(li => ({platform: li.platform, placement: li.placement, planned_spend: li.media_cost_usd, buying_unit: li.buying_unit, unit_cost: li.unit_cost})), planned_total: qbrData.linkedPlan.summary?.total_investment_usd}) : "No plan linked - analyse actuals only"}

Performance Data by Period:
${JSON.stringify(trendData, null, 2)}

JSON format:
{
  "executive_summary": "3-4 sentence overview of campaign performance",
  "total_spend": number,
  "total_conversions": number,
  "blended_cpa": number,
  "total_revenue": number,
  "overall_roas": number,
  "slide_observations": {
    "overall_performance": ["bullet 1", "bullet 2", "bullet 3", "bullet 4"],
    "platform_breakdown": ["bullet about top platform", "bullet about #2", "bullet about underperformer", "efficiency observation"],
    "trend_analysis": ["trend observation over time", "what improved", "what declined", "seasonality note"],
    "audience_creative": ["creative performance note", "audience insight", "format observation", "device/placement insight"],
    "recommendations": ["recommendation 1", "recommendation 2", "recommendation 3", "recommendation 4"],
    "next_steps": ["action 1", "action 2", "action 3"]
  },
  "platform_summary": [{"platform":"string","total_spend":number,"total_impressions":number,"total_clicks":number,"total_conversions":number,"ctr":number,"cpa":number,"roas":number,"trend":"improving/stable/declining","observation":"string"}],
  "period_totals": [{"period":"string","total_spend":number,"total_impressions":number,"total_clicks":number,"total_conversions":number}],
  "top_performer": {"platform":"string","reason":"string"},
  "underperformer": {"platform":"string","reason":"string"},
  "budget_reallocation": [{"platform":"string","current_pct":number,"recommended_pct":number,"rationale":"string"}]
}`;

                      const res = await fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "Content-Type": "application/json", "x-api-key": apiKey, "anthropic-version": "2023-06-01", "anthropic-dangerous-direct-browser-access": "true" }, body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 3000, messages: [{ role: "user", content: prompt }] }) });
                      const data = await res.json();
                      if (data.error) { alert("API Error: " + (data.error.message || JSON.stringify(data.error))); setQbrData(p => ({...p, aiLoading: false})); return; }
                      const text = data.content?.[0]?.text || "";
                      const clean = text.replace(/```json|```/g, "").trim();
                      const parsed = JSON.parse(clean);
                      setQbrData(p => ({...p, aiParsed: parsed, aiLoading: false}));
                    } catch (e) { alert("Error: " + e.message); setQbrData(p => ({...p, aiLoading: false})); }
                  }} disabled={qbrData.aiLoading} style={{ padding: "10px 24px", borderRadius: 8, border: "none", background: qbrData.aiLoading ? "#d0d0d8" : "#1A1A2E", color: qbrData.aiLoading ? "#6a6a7e" : "#BD8B13", fontSize: 12, fontWeight: 700, cursor: qbrData.aiLoading ? "wait" : "pointer", fontFamily: "inherit" }}>{qbrData.aiLoading ? "Analysing performance data..." : "Generate AI Analysis"}</button>
                </Card>
              )}

              {qbrData.aiParsed && (() => {
                const ai = qbrData.aiParsed;
                const obs = ai.slide_observations || {};

                const downloadPPTX = async () => {
                  if (!window.PptxGenJS) {
                    const script = document.createElement("script");
                    script.src = "https://cdn.jsdelivr.net/npm/pptxgenjs@3.12.0/dist/pptxgen.bundle.js";
                    document.head.appendChild(script);
                    await new Promise(r => { script.onload = r; });
                  }
                  const pptx = new window.PptxGenJS();
                  pptx.layout = "LAYOUT_WIDE";
                  pptx.author = "PHD Media";

                  const EY_NAVY = "1A1A2E";
                  const EY_GOLD = "BD8B13";

                  const addSlide = (title, bullets, chartData) => {
                    const slide = pptx.addSlide();
                    slide.background = { color: "FFFFFF" };
                    slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: "100%", h: 0.06, fill: { color: EY_GOLD } });
                    slide.addShape(pptx.ShapeType.rect, { x: 0, y: 7.44, w: "100%", h: 0.06, fill: { color: EY_NAVY } });
                    slide.addText("ETIHAD AIRWAYS", { x: 0.5, y: 0.2, w: 3, h: 0.3, fontSize: 8, color: EY_GOLD, fontFace: "Arial", bold: true, letterSpacing: 3 });
                    slide.addText(title, { x: 0.5, y: 0.55, w: 8, h: 0.5, fontSize: 22, color: EY_NAVY, fontFace: "Arial", bold: true });
                    slide.addText(qbrData.campaign || "Campaign Report", { x: 0.5, y: 1.0, w: 6, h: 0.3, fontSize: 11, color: "999999", fontFace: "Arial" });
                    slide.addText("PHD | Intelligence. Connected.", { x: 9, y: 7.1, w: 4, h: 0.3, fontSize: 7, color: "BBBBBB", fontFace: "Arial", align: "right" });

                    if (bullets && bullets.length > 0) {
                      const bulletRows = bullets.map(b => ({ text: b, options: { fontSize: 12, color: "333333", fontFace: "Arial", bullet: { type: "bullet", color: EY_GOLD }, paraSpaceAfter: 8, lineSpacing: 18 } }));
                      slide.addText(bulletRows, { x: 0.5, y: 1.5, w: chartData ? 5.5 : 12, h: 5, valign: "top" });
                    }

                    if (chartData) {
                      try {
                        slide.addChart(pptx.ChartType.bar, chartData, { x: 6.5, y: 1.5, w: 6.5, h: 4.5, showValue: false, catAxisLabelColor: "666666", catAxisLabelFontSize: 8, valAxisLabelColor: "666666", valAxisLabelFontSize: 8, chartColors: [EY_NAVY, EY_GOLD, "7AC143", "CC3333", "3B82F6", "8B5CF6"], showLegend: true, legendFontSize: 8, legendPos: "b" });
                      } catch(e) { console.log("Chart error:", e); }
                    }
                    return slide;
                  };

                  // SLIDE 1: Title
                  const s1 = pptx.addSlide();
                  s1.background = { color: EY_NAVY };
                  s1.addShape(pptx.ShapeType.rect, { x: 0, y: 7.2, w: "100%", h: 0.3, fill: { color: EY_GOLD } });
                  s1.addText("ETIHAD AIRWAYS", { x: 1, y: 2, w: 11, h: 0.5, fontSize: 14, color: EY_GOLD, fontFace: "Arial", bold: true, letterSpacing: 5 });
                  s1.addText(qbrData.campaign || "Campaign Report", { x: 1, y: 2.8, w: 11, h: 0.8, fontSize: 36, color: "FFFFFF", fontFace: "Arial", bold: true });
                  s1.addText(qbrData.period || "", { x: 1, y: 3.8, w: 11, h: 0.4, fontSize: 16, color: "AAAAAA", fontFace: "Arial" });
                  s1.addText("Prepared by PHD Media | Intelligence. Connected.", { x: 1, y: 6.5, w: 11, h: 0.3, fontSize: 10, color: "777777", fontFace: "Arial" });

                  // SLIDE 2: Executive Summary
                  const s2 = addSlide("Executive Summary", [
                    ai.executive_summary || "",
                    "",
                    "Total Spend: $" + (ai.total_spend||0).toLocaleString(),
                    "Total Conversions: " + (ai.total_conversions||0).toLocaleString(),
                    "Blended CPA: $" + (ai.blended_cpa||0).toFixed(2),
                    "Overall ROAS: " + (ai.overall_roas||0).toFixed(2) + "x",
                  ]);

                  // SLIDE 3: Overall Performance with chart
                  const periodTotals = ai.period_totals || [];
                  addSlide("Overall Performance", obs.overall_performance || [], periodTotals.length > 0 ? [
                    { name: "Spend ($)", labels: periodTotals.map(p => p.period), values: periodTotals.map(p => p.total_spend) },
                    { name: "Conversions", labels: periodTotals.map(p => p.period), values: periodTotals.map(p => p.total_conversions) },
                  ] : null);

                  // SLIDE 4: Platform Breakdown with chart
                  const platSummary = ai.platform_summary || [];
                  addSlide("Platform Performance", obs.platform_breakdown || [], platSummary.length > 0 ? [
                    { name: "Spend ($)", labels: platSummary.map(p => p.platform), values: platSummary.map(p => p.total_spend) },
                  ] : null);

                  // SLIDE 5: Trend Analysis
                  addSlide("Trend Analysis", obs.trend_analysis || [], periodTotals.length > 0 ? [
                    { name: "CPA ($)", labels: periodTotals.map(p => p.period), values: periodTotals.map(p => p.total_conversions > 0 ? p.total_spend / p.total_conversions : 0) },
                  ] : null);

                  // SLIDE 6: Platform Detail Table
                  const s6 = addSlide("Platform Detail", []);
                  if (platSummary.length > 0) {
                    const tableRows = [
                      [{ text: "Platform", options: { bold: true, color: "FFFFFF", fill: { color: EY_NAVY }, fontSize: 9 } }, { text: "Spend", options: { bold: true, color: "FFFFFF", fill: { color: EY_NAVY }, fontSize: 9 } }, { text: "Impressions", options: { bold: true, color: "FFFFFF", fill: { color: EY_NAVY }, fontSize: 9 } }, { text: "Clicks", options: { bold: true, color: "FFFFFF", fill: { color: EY_NAVY }, fontSize: 9 } }, { text: "CTR", options: { bold: true, color: "FFFFFF", fill: { color: EY_NAVY }, fontSize: 9 } }, { text: "Conversions", options: { bold: true, color: "FFFFFF", fill: { color: EY_NAVY }, fontSize: 9 } }, { text: "CPA", options: { bold: true, color: "FFFFFF", fill: { color: EY_NAVY }, fontSize: 9 } }, { text: "Trend", options: { bold: true, color: "FFFFFF", fill: { color: EY_NAVY }, fontSize: 9 } }],
                      ...platSummary.map((p, i) => [
                        { text: p.platform, options: { fontSize: 9, fill: { color: i%2===0?"F5F5F7":"FFFFFF" } } },
                        { text: "$"+((p.total_spend||0).toLocaleString()), options: { fontSize: 9, fill: { color: i%2===0?"F5F5F7":"FFFFFF" } } },
                        { text: (p.total_impressions||0).toLocaleString(), options: { fontSize: 9, fill: { color: i%2===0?"F5F5F7":"FFFFFF" } } },
                        { text: (p.total_clicks||0).toLocaleString(), options: { fontSize: 9, fill: { color: i%2===0?"F5F5F7":"FFFFFF" } } },
                        { text: (p.ctr||0).toFixed(2)+"%", options: { fontSize: 9, fill: { color: i%2===0?"F5F5F7":"FFFFFF" } } },
                        { text: (p.total_conversions||0).toLocaleString(), options: { fontSize: 9, fill: { color: i%2===0?"F5F5F7":"FFFFFF" } } },
                        { text: "$"+(p.cpa||0).toFixed(2), options: { fontSize: 9, bold: true, color: EY_NAVY, fill: { color: i%2===0?"F5F5F7":"FFFFFF" } } },
                        { text: p.trend||"", options: { fontSize: 9, color: p.trend==="improving"?"2A8C3E":p.trend==="declining"?"CC3333":"666666", fill: { color: i%2===0?"F5F5F7":"FFFFFF" } } },
                      ])
                    ];
                    s6.addTable(tableRows, { x: 0.5, y: 1.5, w: 12, colW: [1.8, 1.2, 1.5, 1.2, 0.8, 1.3, 1.0, 1.0], fontSize: 9, border: { type: "solid", pt: 0.5, color: "E0E0E0" } });
                  }

                  // SLIDE 7: Recommendations
                  addSlide("Recommendations & Next Steps", [...(obs.recommendations||[]), "", "NEXT STEPS:", ...(obs.next_steps||[])]);

                  // SLIDE 8: Budget Reallocation
                  if (ai.budget_reallocation && ai.budget_reallocation.length > 0) {
                    addSlide("Budget Reallocation", ai.budget_reallocation.map(b => `${b.platform}: ${b.current_pct}% -> ${b.recommended_pct}% (${b.rationale})`), [
                      { name: "Current %", labels: ai.budget_reallocation.map(b => b.platform), values: ai.budget_reallocation.map(b => b.current_pct) },
                      { name: "Recommended %", labels: ai.budget_reallocation.map(b => b.platform), values: ai.budget_reallocation.map(b => b.recommended_pct) },
                    ]);
                  }

                  // SLIDE 9: Thank You
                  const s9 = pptx.addSlide();
                  s9.background = { color: EY_NAVY };
                  s9.addShape(pptx.ShapeType.rect, { x: 0, y: 7.2, w: "100%", h: 0.3, fill: { color: EY_GOLD } });
                  s9.addText("Thank You", { x: 1, y: 2.5, w: 11, h: 1, fontSize: 40, color: "FFFFFF", fontFace: "Arial", bold: true, align: "center" });
                  s9.addText("PHD Media | Intelligence. Connected.", { x: 1, y: 4, w: 11, h: 0.5, fontSize: 14, color: EY_GOLD, fontFace: "Arial", align: "center" });

                  pptx.writeFile({ fileName: `Etihad_${(qbrData.campaign||"Report").replace(/\s+/g,"_")}_${new Date().toISOString().split("T")[0]}.pptx` });
                };

                return (<>
                  <Card style={{ marginBottom: 16, padding: 18, background: "#1A1A2E", border: "none" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <div style={{ fontSize: 16, fontWeight: 800, color: "#BD8B13" }}>Analysis Complete</div>
                        <div style={{ fontSize: 11, color: "#888" }}>{(ai.platform_summary||[]).length} platforms analysed across {(ai.period_totals||[]).length} periods</div>
                      </div>
                      <button onClick={downloadPPTX} style={{ padding: "12px 28px", borderRadius: 8, border: "2px solid #BD8B13", background: "transparent", color: "#BD8B13", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Download PPTX Deck</button>
                    </div>
                  </Card>

                  <Card style={{ marginBottom: 12, padding: 20, borderBottom: "4px solid #BD8B13" }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: "#BD8B13", letterSpacing: 2, marginBottom: 4 }}>ETIHAD AIRWAYS</div>
                    <div style={{ fontSize: 20, fontWeight: 800, color: "#1A1A2E" }}>{qbrData.campaign}</div>
                    <div style={{ fontSize: 12, color: "#6a6a7e", marginTop: 2 }}>{qbrData.period}</div>
                    <div style={{ fontSize: 13, color: "#444455", marginTop: 12, lineHeight: 1.7 }}>{ai.executive_summary}</div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginTop: 16 }}>
                      {[
                        { l: "Total Spend", v: "$"+(ai.total_spend||0).toLocaleString() },
                        { l: "Conversions", v: (ai.total_conversions||0).toLocaleString() },
                        { l: "Blended CPA", v: "$"+(ai.blended_cpa||0).toFixed(2) },
                        { l: "ROAS", v: (ai.overall_roas||0).toFixed(2)+"x" },
                      ].map(m => <div key={m.l} style={{ padding: 12, background: "#f9f9fb", borderRadius: 8, textAlign: "center" }}><div style={{ fontSize: 9, color: "#6a6a7e", fontWeight: 700 }}>{m.l}</div><div style={{ fontSize: 20, fontWeight: 800, color: "#1A1A2E", marginTop: 4 }}>{m.v}</div></div>)}
                    </div>
                  </Card>

                  {Object.entries(obs).map(([key, bullets]) => (
                    <Card key={key} style={{ marginBottom: 12, padding: 16 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#1A1A2E", marginBottom: 10, textTransform: "capitalize" }}>{key.replace(/_/g, " ")}</div>
                      {(bullets||[]).map((b, i) => <div key={i} style={{ fontSize: 12, color: "#444455", marginBottom: 6, paddingLeft: 14, position: "relative", lineHeight: 1.6 }}><span style={{ position: "absolute", left: 0, color: "#BD8B13", fontWeight: 800 }}>-</span>{b}</div>)}
                    </Card>
                  ))}

                  {(ai.platform_summary||[]).length > 0 && (
                    <Card style={{ marginBottom: 12, padding: 16 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#1A1A2E", marginBottom: 10 }}>Platform Performance Summary</div>
                      <div style={{ overflowX: "auto" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
                          <thead><tr style={{ borderBottom: "2px solid #1A1A2E" }}>{["Platform","Spend","Impressions","Clicks","CTR","Conversions","CPA","ROAS","Trend"].map(h => <th key={h} style={{ padding: "6px 4px", textAlign: "left", color: "#1A1A2E", fontSize: 9, fontWeight: 700 }}>{h}</th>)}</tr></thead>
                          <tbody>{(ai.platform_summary||[]).map((p, i) => <tr key={i} style={{ borderBottom: "1px solid #f0f0f5" }}>
                            <td style={{ padding: "6px 4px", fontWeight: 600 }}>{p.platform}</td>
                            <td style={{ padding: "6px 4px", fontFamily: "monospace" }}>${(p.total_spend||0).toLocaleString()}</td>
                            <td style={{ padding: "6px 4px", fontFamily: "monospace" }}>{(p.total_impressions||0).toLocaleString()}</td>
                            <td style={{ padding: "6px 4px", fontFamily: "monospace" }}>{(p.total_clicks||0).toLocaleString()}</td>
                            <td style={{ padding: "6px 4px", fontFamily: "monospace" }}>{(p.ctr||0).toFixed(2)}%</td>
                            <td style={{ padding: "6px 4px", fontFamily: "monospace" }}>{(p.total_conversions||0).toLocaleString()}</td>
                            <td style={{ padding: "6px 4px", fontFamily: "monospace", fontWeight: 700, color: "#1A1A2E" }}>${(p.cpa||0).toFixed(2)}</td>
                            <td style={{ padding: "6px 4px", fontFamily: "monospace", color: (p.roas||0) >= 3 ? "#2a8c3e" : "#b8860b" }}>{(p.roas||0).toFixed(2)}x</td>
                            <td style={{ padding: "6px 4px", fontSize: 10, fontWeight: 600, color: p.trend==="improving" ? "#2a8c3e" : p.trend==="declining" ? "#cc3333" : "#6a6a7e" }}>{p.trend}</td>
                          </tr>)}</tbody>
                        </table>
                      </div>
                    </Card>
                  )}
                </>);
              })()}
            </div>
          )}

          {/* GLOSSARY */}
          {activeSection === "glossary" && (
            <div>
              <SectionTitle>KPI & Metric Glossary</SectionTitle><Pika id="p20" />
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

          {/* ADMIN PANEL */}
          {activeSection === "admin" && isAdmin && (
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: "#2D1768", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 16, fontWeight: 800 }}>⚙</div>
                <div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: "#1a1a2e" }}>Admin Panel</div>
                  <div style={{ fontSize: 11, color: "#7AC143", fontWeight: 600 }}>User Management & Access Control</div>
                </div>
              </div>

              {(() => {
                const loadAdminUsers = () => { sbFetch("approved_users?order=created_at.desc").then(data => { if (Array.isArray(data)) setAdminUsers(data); setAdminLoading(false); }).catch(() => setAdminLoading(false)); };
                if (adminLoading && adminUsers.length === 0) loadAdminUsers();

                const toggleApproval = async (user) => {
                  const newStatus = !user.approved;
                  await fetch(SUPABASE_URL + "/rest/v1/approved_users?id=eq." + user.id, { method: "PATCH", headers: sbHeaders, body: JSON.stringify({ approved: newStatus }) });
                  setAdminUsers(prev => prev.map(u => u.id === user.id ? {...u, approved: newStatus} : u));
                };

                const setRole = async (user, role) => {
                  await fetch(SUPABASE_URL + "/rest/v1/approved_users?id=eq." + user.id, { method: "PATCH", headers: sbHeaders, body: JSON.stringify({ role }) });
                  setAdminUsers(prev => prev.map(u => u.id === user.id ? {...u, role} : u));
                };

                const removeUser = async (user) => {
                  if (!confirm("Remove " + user.email + "?")) return;
                  await fetch(SUPABASE_URL + "/rest/v1/approved_users?id=eq." + user.id, { method: "DELETE", headers: sbHeaders });
                  setAdminUsers(prev => prev.filter(u => u.id !== user.id));
                };

                const pending = adminUsers.filter(u => !u.approved);
                const approved = adminUsers.filter(u => u.approved);

                if (adminLoading && adminUsers.length === 0) return <div style={{ padding: 40, textAlign: "center", color: "#6a6a7e" }}>Loading users...</div>;

                return (<>
                  {pending.length > 0 && (
                    <Card style={{ marginBottom: 16, padding: 16, borderLeft: "4px solid #b8860b", background: "#fffdf5" }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#b8860b", marginBottom: 12 }}>Pending Approval ({pending.length})</div>
                      {pending.map(user => (
                        <div key={user.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #f0ead0" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            {user.avatar_url && <img src={user.avatar_url} alt="" style={{ width: 32, height: 32, borderRadius: "50%" }} />}
                            <div>
                              <div style={{ fontSize: 13, fontWeight: 600, color: "#1a1a2e" }}>{user.name || user.email}</div>
                              <div style={{ fontSize: 10, color: "#6a6a7e" }}>{user.email} - Requested {new Date(user.created_at).toLocaleDateString()}</div>
                            </div>
                          </div>
                          <div style={{ display: "flex", gap: 6 }}>
                            <button onClick={() => toggleApproval(user)} style={{ padding: "6px 14px", borderRadius: 6, border: "none", background: "#2a8c3e", color: "#fff", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Approve</button>
                            <button onClick={() => removeUser(user)} style={{ padding: "6px 14px", borderRadius: 6, border: "1px solid #cc3333", background: "transparent", color: "#cc3333", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Reject</button>
                          </div>
                        </div>
                      ))}
                    </Card>
                  )}

                  <Card style={{ padding: 16 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#2D1768", marginBottom: 12 }}>Approved Users ({approved.length})</div>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                      <thead><tr style={{ borderBottom: "2px solid #d0d0e0" }}>
                        {["User", "Email", "Role", "Approved", "Joined", "Actions"].map(h => <th key={h} style={{ padding: "6px 4px", textAlign: "left", color: "#555566", fontSize: 9, fontWeight: 700, textTransform: "uppercase" }}>{h}</th>)}
                      </tr></thead>
                      <tbody>
                        {approved.map(user => (
                          <tr key={user.id} style={{ borderBottom: "1px solid #f0f0f5" }}>
                            <td style={{ padding: "8px 4px" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                {user.avatar_url && <img src={user.avatar_url} alt="" style={{ width: 24, height: 24, borderRadius: "50%" }} />}
                                <span style={{ fontWeight: 600 }}>{user.name || "—"}</span>
                              </div>
                            </td>
                            <td style={{ padding: "8px 4px", color: "#555566" }}>{user.email}</td>
                            <td style={{ padding: "8px 4px" }}>
                              <select value={user.role} onChange={e => setRole(user, e.target.value)} style={{ padding: "3px 6px", background: "#fff", border: "1px solid #d0d0d8", borderRadius: 4, fontSize: 10, fontFamily: "inherit", color: user.role === "admin" ? "#2D1768" : "#1a1a2e" }}>
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                              </select>
                            </td>
                            <td style={{ padding: "8px 4px" }}><span style={{ color: "#2a8c3e", fontSize: 10, fontWeight: 700 }}>Active</span></td>
                            <td style={{ padding: "8px 4px", color: "#6a6a7e", fontSize: 10 }}>{new Date(user.created_at).toLocaleDateString()}</td>
                            <td style={{ padding: "8px 4px" }}>
                              <div style={{ display: "flex", gap: 4 }}>
                                <button onClick={() => toggleApproval(user)} style={{ padding: "3px 8px", borderRadius: 4, border: "1px solid #b8860b", background: "transparent", color: "#b8860b", fontSize: 9, cursor: "pointer", fontFamily: "inherit" }}>Revoke</button>
                                <button onClick={() => removeUser(user)} style={{ padding: "3px 8px", borderRadius: 4, border: "1px solid #cc3333", background: "transparent", color: "#cc3333", fontSize: 9, cursor: "pointer", fontFamily: "inherit" }}>Remove</button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Card>
                </>);
              })()}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
