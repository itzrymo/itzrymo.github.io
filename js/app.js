(() => {
  "use strict";

  const IMAGE_EXTS = /\.(jpe?g|png|webp|gif|avif)$/i;
  const imageFolder = "/images/";
  const repo = {
    owner: "itzrymo",
    name: "itzrymo.github.io",
    branch: "main",
    path: "images"
  };

  // ---------- Mobile nav ----------
  const menu = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#site-nav");
  menu?.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menu.setAttribute("aria-expanded", String(open));
  });
  nav?.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    nav.classList.remove("open");
    menu?.setAttribute("aria-expanded", "false");
  }));

  // ---------- Seasonal system ----------
  function getTheme(date = new Date()) {
    const m = date.getMonth() + 1;
    const d = date.getDate();

    if (m === 12) return "halloween";
    if (m === 7) return "christmas";
    if (m === 10 && d <= 7) return "july";

    if ([12, 1, 2].includes(m)) return "winter";
    if ([3, 4, 5].includes(m)) return "spring";
    if ([6, 7, 8].includes(m)) return "summer";
    return "fall";
  }

  const theme = getTheme();
  document.body.classList.add(theme);

  const labels = {
    halloween: "HALLOWEEN • NIGHT RIDE",
    christmas: "CHRISTMAS • WINTER RIDE",
    july: "INDEPENDENCE DAY • REDLINE",
    winter: "WINTER • COLD STARTS",
    spring: "SPRING • NEW BUILDS",
    summer: "SUMMER • OPEN ROAD",
    fall: "FALL • NIGHT MEETS"
  };
  document.querySelector("#theme-label").textContent = labels[theme];

  const fx = document.querySelector("#fx-particles");
  const pops = document.querySelector("#fx-pops");

  function particle(className, content, left, duration, delay, x) {
    const el = document.createElement("span");
    el.className = `particle ${className}`;
    el.textContent = content;
    el.style.left = `${left}%`;
    el.style.animationDuration = `${duration}s`;
    el.style.animationDelay = `${delay}s`;
    el.style.setProperty("--x", `${x}px`);
    fx.appendChild(el);
  }

  function makeSeasonFX() {
    const count = window.innerWidth < 600 ? 16 : 28;

    if (theme === "halloween") {
      for (let i = 0; i < count; i++) {
        particle("pumpkin", Math.random() > .78 ? "🦇" : "🎃",
          Math.random()*100, 10 + Math.random()*14, -Math.random()*20,
          (Math.random()-.5)*180);
      }
      for (let i = 0; i < 7; i++) {
        particle("spark", "•", Math.random()*100, 5+Math.random()*5, -Math.random()*8, 0);
      }
    } else if (theme === "christmas" || theme === "winter") {
      for (let i = 0; i < count * 2; i++) {
        particle("snow", "", Math.random()*100, 8+Math.random()*12, -Math.random()*20,
          (Math.random()-.5)*220);
      }
      // subtle hanging lights
      const lights = document.createElement("div");
      lights.className = "holiday-lights";
      lights.innerHTML = Array.from({length: 22}, (_, i) =>
        `<i style="left:${(i/21)*100}%;animation-delay:${(i%7)*.13}s"></i>`).join("");
      document.querySelector(".fx").appendChild(lights);
    } else if (theme === "july") {
      for (let i = 0; i < 13; i++) {
        setTimeout(() => {
          const x = 10 + Math.random()*80, y = 12 + Math.random()*55;
          for (let j = 0; j < 24; j++) {
            const b = document.createElement("i");
            b.className = "burst";
            const a = (Math.PI*2*j)/24, r = 40 + Math.random()*90;
            b.style.left = `${x}%`; b.style.top = `${y}%`;
            b.style.setProperty("--dx", `${Math.cos(a)*r}px`);
            b.style.setProperty("--dy", `${Math.sin(a)*r}px`);
            pops.appendChild(b);
            setTimeout(() => b.remove(), 1300);
          }
        }, i*1100);
      }
      setInterval(() => {
        const p = document.createElement("i");
        p.className = "pop";
        p.style.left = `${Math.random()*100}%`; p.style.top = `${10+Math.random()*65}%`;
        p.style.setProperty("--dx", `${(Math.random()-.5)*130}px`);
        p.style.setProperty("--dy", `${(Math.random()-.5)*130}px`);
        pops.appendChild(p); setTimeout(() => p.remove(), 950);
      }, 450);
    } else if (theme === "fall") {
      for (let i = 0; i < count; i++)
        particle("leaf", ["🍂","🍁"][i%2], Math.random()*100, 8+Math.random()*12, -Math.random()*20,
          (Math.random()-.5)*240);
    } else if (theme === "spring") {
      for (let i = 0; i < count; i++)
        particle("leaf", ["🌸","🌿"][i%2], Math.random()*100, 9+Math.random()*11, -Math.random()*20,
          (Math.random()-.5)*220);
    } else if (theme === "summer") {
      for (let i = 0; i < 16; i++)
        particle("spark", "•", Math.random()*100, 4+Math.random()*5, -Math.random()*8, 0);
    }
  }
  makeSeasonFX();

  // Extra CSS for seasonal lights without another stylesheet.
  const lightStyle = document.createElement("style");
  lightStyle.textContent = `.holiday-lights{position:absolute;top:0;left:0;right:0;height:28px;border-top:1px solid rgba(255,255,255,.15)}.holiday-lights:before{content:"";position:absolute;left:0;right:0;top:0;height:18px;border-bottom:1px solid rgba(255,255,255,.06);border-radius:0 0 50% 50%}.holiday-lights i{position:absolute;top:8px;width:7px;height:11px;border-radius:50%;background:#fff;box-shadow:0 0 12px 3px rgba(255,255,255,.55);animation:pulse 1.1s ease-in-out infinite alternate}.holiday-lights i:nth-child(3n){background:#e00}.holiday-lights i:nth-child(3n+1){background:#0f0}.holiday-lights i:nth-child(4n){background:#ffcf00}`;
  document.head.appendChild(lightStyle);

  // ---------- Gallery ----------
  const grid = document.querySelector("#gallery-grid");
  const count = document.querySelector("#gallery-count");
  const more = document.querySelector("#load-more");
  let allImages = [];
  let visible = 8;

  const fallback = [
    "image1.jpg","image2.jpg","image3.jpg","image4.jpg","image5.jpg","image6.jpg","image7.jpg","image8.jpg"
  ];

  async function getImages() {
    // GitHub Pages does not expose directory listings. The GitHub Contents API lets
    // the gallery discover newly-added images without changing HTML.
    const api = `https://api.github.com/repos/${repo.owner}/${repo.name}/contents/${repo.path}?ref=${repo.branch}`;
    try {
      const r = await fetch(api, {headers: {Accept:"application/vnd.github+json"}});
      if (!r.ok) throw new Error("GitHub API unavailable");
      const files = await r.json();
      return files.filter(f => f.type === "file" && IMAGE_EXTS.test(f.name))
        .sort((a,b) => a.name.localeCompare(b.name, undefined, {numeric:true}))
        .map(f => ({src: f.download_url || `${imageFolder}${encodeURIComponent(f.name)}`, name:f.name}));
    } catch {
      return fallback.map(name => ({src:imageFolder+name, name}));
    }
  }

  function renderGallery() {
    grid.innerHTML = "";
    const slice = allImages.slice(0, visible);
    if (!slice.length) {
      grid.innerHTML = `<div class="gallery-empty">No gallery images found yet. Add photos to <code>/images</code>.</div>`;
    } else {
      slice.forEach((img, i) => {
        const item = document.createElement("a");
        item.className = "gallery-item";
        item.href = img.src;
        item.target = "_blank";
        item.rel = "noopener";
        item.innerHTML = `<img src="${img.src}" alt="Redline community photo ${i+1}" loading="${i < 3 ? "eager":"lazy"}"><span class="gallery-num">${String(i+1).padStart(2,"0")}</span>`;
        grid.appendChild(item);
      });
    }
    count.textContent = `${allImages.length} PHOTO${allImages.length === 1 ? "" : "S"} • AUTO LOADED`;
    more.classList.toggle("is-hidden", visible >= allImages.length);
  }

  more.addEventListener("click", () => { visible += 8; renderGallery(); });

  getImages().then(images => {
    allImages = images;
    renderGallery();
  });

  // ---------- Countdown ----------
  function nextMeet() {
    const now = new Date();
    let y = now.getFullYear();
    let t = new Date(y, 9, 31, 18, 0, 0); // Oct 31, 6 PM local
    if (t <= now) t = new Date(y + 1, 9, 31, 18, 0, 0);
    return t;
  }
  const target = nextMeet();
  function tick() {
    const diff = Math.max(0, target - new Date());
    const vals = [
      Math.floor(diff/86400000),
      Math.floor(diff/3600000)%24,
      Math.floor(diff/60000)%60,
      Math.floor(diff/1000)%60
    ];
    document.querySelector("#countdown").querySelectorAll("strong").forEach((e,i) => e.textContent = String(vals[i]).padStart(2,"0"));
  }
  tick(); setInterval(tick,1000);
  document.querySelector("#year").textContent = new Date().getFullYear();
})();
