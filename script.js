// =================================================================
// 💖 DIGITAL GREETING CARD - MOBILE STORY FLOW SCRIPT 💖
// Story Scroll Animations, Smooth Infinite Swipe Deck, Instagram Nav & GPay Scratch Card
// =================================================================

document.addEventListener("DOMContentLoaded", () => {
  const config = typeof CARD_CONFIG !== "undefined" ? CARD_CONFIG : {};

  // DOM Elements
  const bgAudio = document.getElementById("bg-audio");
  const musicBtn = document.getElementById("music-toggle");
  const audioWidget = document.querySelector(".audio-player-widget");
  const envelopeWrapper = document.getElementById("envelope-wrapper");
  const envelopeScreen = document.getElementById("envelope-screen");

  let audioPlaying = false;

  // Initialize Card Content & Layout
  initCardFromConfig(config);

  // Initialize Floating Canvas Hearts
  initHeartCanvas();

  // Initialize Scroll Observer for Animations & Instagram Bottom Nav Highlight
  initScrollStoryObserver();

  // Initialize Envelope Click Listener
  if (envelopeWrapper) {
    envelopeWrapper.addEventListener("click", () => {
      envelopeWrapper.classList.add("open");

      if (config.music && config.music.enabled && bgAudio) {
        bgAudio.play().then(() => {
          audioPlaying = true;
          audioWidget.classList.add("playing");
          if (musicBtn) musicBtn.innerHTML = "⏸️";
        }).catch(err => console.log("Audio autoplay prevented:", err));
      }

      setTimeout(() => {
        envelopeScreen.classList.add("opened");
        triggerInitialScrollReveal();
      }, 650);
    });
  }

  // Audio Toggle Button
  if (musicBtn && bgAudio) {
    musicBtn.addEventListener("click", () => {
      if (audioPlaying) {
        bgAudio.pause();
        audioPlaying = false;
        audioWidget.classList.remove("playing");
        musicBtn.innerHTML = "▶️";
      } else {
        bgAudio.play().then(() => {
          audioPlaying = true;
          audioWidget.classList.add("playing");
          musicBtn.innerHTML = "⏸️";
        });
      }
    });
  }

  // Instagram Bottom Nav Bar Click Handlers
  const navItems = document.querySelectorAll(".insta-nav-item");
  navItems.forEach(item => {
    item.addEventListener("click", () => {
      const targetId = item.getAttribute("data-target");
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});

// =================================================================
// 1. INJECT CONFIG DATA & BUILD WISH DECK
// =================================================================
function initCardFromConfig(cfg) {
  if (!cfg) return;

  // Audio track
  if (cfg.music && cfg.music.src) {
    const audioEl = document.getElementById("bg-audio");
    if (audioEl) audioEl.src = cfg.music.src;
    const songLabel = document.getElementById("song-title");
    if (songLabel) songLabel.innerText = cfg.music.songTitle || "Romantic Track";
  }

  // Envelope texts
  if (cfg.envelope) {
    const senderTag = document.getElementById("env-sender-tag");
    if (senderTag) senderTag.innerText = cfg.envelope.senderTag || "";
    const subtitle = document.getElementById("env-subtitle");
    if (subtitle) subtitle.innerText = cfg.envelope.subtitle || "";
    const envSticker = document.getElementById("env-sticker");
    if (envSticker && cfg.envelope.sticker) envSticker.src = cfg.envelope.sticker;
  }

  // Header
  const mainTitle = document.getElementById("main-title");
  if (mainTitle && cfg.titleText) mainTitle.innerText = cfg.titleText;

  // Render Ascending Infinite Swipe Cards Deck
  renderWishDeck(cfg.wishCards || []);

  // Render Polaroids Gallery
  if (cfg.polaroids && Array.isArray(cfg.polaroids)) {
    const grid = document.getElementById("polaroid-grid");
    if (grid) {
      grid.innerHTML = "";
      cfg.polaroids.forEach((item) => {
        const rot = (Math.random() * 10 - 5).toFixed(1);
        const cardHtml = `
          <div class="polaroid-card" style="--rotation: ${rot}deg;">
            <div class="polaroid-img-wrapper">
              <img src="${item.image}" alt="${item.caption || 'Memory'}" loading="lazy"/>
            </div>
            <div class="polaroid-caption">${item.caption || ''}</div>
            <div class="polaroid-date">${item.date || ''}</div>
          </div>
        `;
        grid.innerHTML += cardHtml;
      });
    }
  }

  // Render Reasons
  if (cfg.reasons && Array.isArray(cfg.reasons)) {
    const grid = document.getElementById("reasons-grid");
    if (grid) {
      grid.innerHTML = "";
      cfg.reasons.forEach(r => {
        const itemHtml = `
          <div class="reason-card">
            <div class="reason-icon">${r.icon || '💖'}</div>
            <div class="reason-content">
              <h4>${r.title}</h4>
              <p>${r.desc}</p>
            </div>
          </div>
        `;
        grid.innerHTML += itemHtml;
      });
    }
  }

  // Coupon Secret Text
  if (cfg.coupon) {
    const secretMsg = document.getElementById("coupon-secret-text");
    if (secretMsg && cfg.coupon.hiddenMessage) {
      secretMsg.innerText = cfg.coupon.hiddenMessage;
    }
  }

  // Footer
  const footerText = document.getElementById("footer-text");
  if (footerText) {
    footerText.innerText = `Made with ❤️ by ${cfg.senderName || 'Your Love'} for ${cfg.recipientName || 'Muskan'}`;
  }
}

// =================================================================
// 2. DATING APP ASCENDING INFINITE SWIPE CARDS STACK ENGINE
// =================================================================
let cardsDataStore = [];
let cardOrderArray = [];

function renderWishDeck(cardsData) {
  cardsDataStore = cardsData;
  const stackContainer = document.getElementById("swipe-card-stack");
  if (!stackContainer) return;

  stackContainer.innerHTML = "";
  if (!cardsData || cardsData.length === 0) return;

  cardOrderArray = [];

  cardsData.forEach((data, index) => {
    const card = document.createElement("div");
    card.className = "swipe-card";
    card.setAttribute("data-index", index);

    // OnError fallback ensures sticker ALWAYS displays nicely even if broken path
    card.innerHTML = `
      <img src="${data.sticker || './assets/hearthappy.gif'}" onerror="this.onerror=null; this.src='./assets/hearthappy.gif';" class="swipe-card-sticker" alt="Sticker"/>
      <div>
        <h3 class="swipe-card-heading">${data.heading || 'Happy Birthday'}</h3>
        <p class="swipe-card-text">${data.text || ''}</p>
      </div>
      <div class="swipe-card-hint">👈 Drag / Swipe Card or Use Buttons 👉</div>
    `;

    stackContainer.appendChild(card);
    cardOrderArray.push(card);
  });

  updateStackLayout();
  attachSwipeEvents();
}

function updateStackLayout() {
  const total = cardOrderArray.length;

  cardOrderArray.forEach((card, depth) => {
    card.classList.remove("active-top-card");

    card.style.zIndex = total - depth;

    if (depth === 0) {
      card.classList.add("active-top-card");
      card.style.transform = `scale(1) translateY(0px) rotate(0deg)`;
      card.style.opacity = "1";
      card.style.pointerEvents = "auto";
    } else if (depth === 1) {
      card.style.transform = `scale(0.95) translateY(12px) rotate(${depth % 2 === 0 ? 2 : -2}deg)`;
      card.style.opacity = "1";
      card.style.pointerEvents = "none";
    } else if (depth === 2) {
      card.style.transform = `scale(0.9) translateY(24px) rotate(${depth % 2 === 0 ? -3 : 3}deg)`;
      card.style.opacity = "1";
      card.style.pointerEvents = "none";
    } else {
      card.style.transform = `scale(0.85) translateY(36px)`;
      card.style.opacity = "0";
      card.style.pointerEvents = "none";
    }
  });
}

function attachSwipeEvents() {
  const stackContainer = document.getElementById("swipe-card-stack");
  if (!stackContainer) return;

  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let currentX = 0;
  let currentY = 0;

  const passBtn = document.getElementById("btn-pass");
  const likeBtn = document.getElementById("btn-like");

  function getTopCard() {
    return cardOrderArray.length > 0 ? cardOrderArray[0] : null;
  }

  function handleStart(e) {
    const topCard = getTopCard();
    if (!topCard) return;

    isDragging = true;
    startX = e.clientX || (e.touches && e.touches[0].clientX);
    startY = e.clientY || (e.touches && e.touches[0].clientY);
    topCard.style.transition = "none";
  }

  function handleMove(e) {
    if (!isDragging) return;

    currentX = e.clientX || (e.touches && e.touches[0].clientX);
    currentY = e.clientY || (e.touches && e.touches[0].clientY);

    const deltaX = currentX - startX;
    const deltaY = currentY - startY;
    const rotate = deltaX * 0.08;

    const topCard = getTopCard();
    if (topCard) {
      topCard.style.transform = `translate(${deltaX}px, ${deltaY}px) rotate(${rotate}deg)`;
    }
  }

  function handleEnd() {
    if (!isDragging) return;
    isDragging = false;

    const topCard = getTopCard();
    if (!topCard) return;

    const deltaX = currentX - startX;
    const threshold = 70;

    topCard.style.transition = "transform 0.25s ease-out, opacity 0.25s ease-out";

    if (deltaX > threshold) {
      cycleTopCardToBack(topCard, "fly-right");
    } else if (deltaX < -threshold) {
      cycleTopCardToBack(topCard, "fly-left");
    } else {
      topCard.style.transform = `scale(1) translateY(0px) rotate(0deg)`;
    }

    startX = startY = currentX = currentY = 0;
  }

  stackContainer.addEventListener("mousedown", handleStart);
  window.addEventListener("mousemove", handleMove);
  window.addEventListener("mouseup", handleEnd);

  stackContainer.addEventListener("touchstart", handleStart, { passive: true });
  window.addEventListener("touchmove", handleMove, { passive: true });
  window.addEventListener("touchend", handleEnd);

  if (passBtn) {
    passBtn.onclick = () => {
      const topCard = getTopCard();
      if (topCard) cycleTopCardToBack(topCard, "fly-left");
    };
  }

  if (likeBtn) {
    likeBtn.onclick = () => {
      const topCard = getTopCard();
      if (topCard) cycleTopCardToBack(topCard, "fly-right");
    };
  }
}

function cycleTopCardToBack(card, animationClass) {
  if (cardOrderArray.length > 1) {
    cardOrderArray[1].classList.add("active-top-card");
  }

  card.classList.add(animationClass);

  setTimeout(() => {
    card.classList.remove(animationClass);

    const top = cardOrderArray.shift();
    cardOrderArray.push(top);

    updateStackLayout();
  }, 240);
}

// =================================================================
// 3. SCROLL OBSERVER FOR STORY SECTIONS
// =================================================================
function initScrollStoryObserver() {
  const sections = document.querySelectorAll(".story-section");
  const navItems = document.querySelectorAll(".insta-nav-item");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute("id");

      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        navItems.forEach(item => {
          if (item.getAttribute("data-target") === id) {
            item.classList.add("active");
          } else {
            item.classList.remove("active");
          }
        });

        if (id === "sec-coupon") {
          initScratchCanvas();
        }
      } else {
        entry.target.classList.remove("visible");
      }
    });
  }, { threshold: 0.2 });

  sections.forEach(sec => observer.observe(sec));
}

function triggerInitialScrollReveal() {
  const firstSec = document.getElementById("sec-wishes");
  if (firstSec) firstSec.classList.add("visible");
}

// =================================================================
// 4. REAL GPAY STYLE AUTO-REVEAL SCRATCH CARD PHYSICS
// =================================================================
let scratchInited = false;
let scratchCompleted = false;

function initScratchCanvas() {
  if (scratchInited) return;

  const canvas = document.getElementById("scratch-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const wrapper = canvas.parentElement;

  const width = (canvas.width = wrapper.offsetWidth);
  const height = (canvas.height = wrapper.offsetHeight);

  const grad = ctx.createLinearGradient(0, 0, width, height);
  grad.addColorStop(0, "#ff758c");
  grad.addColorStop(0.5, "#ff7eb3");
  grad.addColorStop(1, "#fa709a");

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "rgba(255, 255, 255, 0.18)";
  for (let i = 0; i < 45; i++) {
    const rx = Math.random() * width;
    const ry = Math.random() * height;
    ctx.beginPath();
    ctx.arc(rx, ry, Math.random() * 4 + 2, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.font = "bold 1.15rem 'Outfit', sans-serif";
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.shadowColor = "rgba(0,0,0,0.3)";
  ctx.shadowBlur = 4;
  ctx.fillText("✨ Scratch To Reveal Gift ✨", width / 2, height / 2 + 6);
  ctx.shadowBlur = 0;

  let isScratching = false;

  function getClearedPercentage() {
    try {
      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;
      let cleared = 0;
      for (let i = 3; i < data.length; i += 16) {
        if (data[i] === 0) cleared++;
      }
      return (cleared / (data.length / 16)) * 100;
    } catch (e) {
      return 0;
    }
  }

  function autoRevealGPayStyle() {
    if (scratchCompleted) return;
    scratchCompleted = true;

    canvas.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    canvas.style.opacity = "0";
    canvas.style.transform = "scale(1.05)";

    setTimeout(() => {
      canvas.style.display = "none";
      triggerHeartConfetti();
    }, 600);
  }

  function checkProgress() {
    const pct = getClearedPercentage();
    if (pct >= 35) {
      autoRevealGPayStyle();
    }
  }

  function scratch(e) {
    if (!isScratching || scratchCompleted) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
    const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 26, 0, Math.PI * 2);
    ctx.fill();

    checkProgress();
  }

  function stopScratching() {
    if (isScratching) {
      isScratching = false;
      const pct = getClearedPercentage();
      if (pct >= 22) {
        autoRevealGPayStyle();
      }
    }
  }

  canvas.addEventListener("mousedown", (e) => { isScratching = true; scratch(e); });
  canvas.addEventListener("mousemove", scratch);
  canvas.addEventListener("mouseup", stopScratching);

  canvas.addEventListener("touchstart", (e) => { isScratching = true; scratch(e); }, { passive: true });
  canvas.addEventListener("touchmove", scratch, { passive: true });
  canvas.addEventListener("touchend", stopScratching);

  scratchInited = true;
}

function triggerHeartConfetti() {
  for (let i = 0; i < 25; i++) {
    setTimeout(() => {
      const heart = document.createElement("div");
      heart.innerText = Math.random() > 0.5 ? "💖" : "✨";
      heart.style.position = "fixed";
      heart.style.left = (Math.random() * 80 + 10) + "vw";
      heart.style.top = "65vh";
      heart.style.fontSize = (Math.random() * 1.5 + 1.2) + "rem";
      heart.style.zIndex = "999";
      heart.style.pointerEvents = "none";
      heart.style.transition = "transform 1.2s ease-out, opacity 1.2s ease-out";
      document.body.appendChild(heart);

      requestAnimationFrame(() => {
        heart.style.transform = `translate(${(Math.random() * 120 - 60)}px, -${(Math.random() * 160 + 90)}px) scale(1.4)`;
        heart.style.opacity = "0";
      });

      setTimeout(() => heart.remove(), 1200);
    }, i * 35);
  }
}

// =================================================================
// 5. FLOATING CANVAS HEARTS
// =================================================================
function initHeartCanvas() {
  const canvas = document.getElementById("bg-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const hearts = [];
  const heartCount = 28;

  for (let i = 0; i < heartCount; i++) {
    hearts.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 12 + 6,
      speedY: Math.random() * 1.0 + 0.4,
      speedX: Math.random() * 0.6 - 0.3,
      opacity: Math.random() * 0.5 + 0.25,
      color: Math.random() > 0.4 ? "#ff4b72" : "#ff85a2"
    });
  }

  function drawHeart(x, y, size, color, opacity) {
    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.fillStyle = color;
    ctx.beginPath();
    const topCurveHeight = size * 0.3;
    ctx.moveTo(x, y + topCurveHeight);
    ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
    ctx.bezierCurveTo(x - size / 2, y + (size + topCurveHeight) / 2, x, y + size, x, y + size);
    ctx.bezierCurveTo(x, y + size, x + size / 2, y + (size + topCurveHeight) / 2, x + size / 2, y + topCurveHeight);
    ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    hearts.forEach(h => {
      h.y -= h.speedY;
      h.x += Math.sin(h.y * 0.02) * 0.4;
      if (h.y < -25) {
        h.y = height + 15;
        h.x = Math.random() * width;
      }
      drawHeart(h.x, h.y, h.size, h.color, h.opacity);
    });
    requestAnimationFrame(animate);
  }

  animate();
}
