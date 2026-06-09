# SAVED — Desktop sky "sun-bloom halo" mouseover effect

Captured 2026-06-09 from the desktop sky-reveal prototype (Hero.js, commit `10bb214`).
The user loved this halo look and wants it preserved exactly. It is the warm,
pointer-tracking sun glow, screen-blended over the sky. Reuse verbatim.

## The halo element (tracks the cursor; screen blend)
```jsx
{heroMousePos && (
  <div
    aria-hidden="true"
    style={{
      position:      "absolute",
      left:          heroMousePos.x,
      top:           heroMousePos.y,
      width:         "640px",
      height:        "640px",
      transform:     "translate(-50%, -50%)",
      zIndex:        22,
      pointerEvents: "none",
      opacity:       thermalOpacity * 0.9,
      transition:    "opacity 200ms ease-out",
      mixBlendMode:  "screen",
      background:    "radial-gradient(circle, rgba(255,247,230,0.95) 0%, rgba(255,234,196,0.55) 18%, rgba(255,210,150,0.22) 38%, transparent 68%)",
    }}
  />
)}
```

## The soft sky-reveal window mask (optional companion; pointer-following)
```js
const skyMask = heroMousePos
  ? `radial-gradient(circle ${Math.round(heroMousePos.radius * 1.7)}px at ${heroMousePos.x}px ${heroMousePos.y}px, black 0%, black 42%, transparent 100%)`
  : "none";
```

## Cursor position source
`heroMousePos = { x, y, radius }` is set by the existing window `mousemove`
handler in Hero.js (panel-relative coords; radius shrinks near edges via
SPOTLIGHT_RAMP). `thermalOpacity` is 1 while the cursor is inside the panel.

## Sky video loop plumbing (desktop refs + crossfade-into-itself)
Two stacked `<video src="/alert-sky.mp4">` copies (`vidADeskRef`/`vidBDeskRef`)
with a 1s opacity crossfade at the loop seam — see the `if (isMobile) return`
loop effect in Hero.js. `object-position: 30% 45%` framed the sun.
