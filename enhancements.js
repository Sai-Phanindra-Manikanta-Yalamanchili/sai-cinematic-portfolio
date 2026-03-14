// ==================== SAI PORTFOLIO ENHANCEMENTS V2 ====================
// Auto-initializes when loaded. Add <script src="enhancements.js"></script> to index.html

(function() {
  "use strict";

  // 1. SCROLL PROGRESS BAR
  var bar = document.createElement("div");
  bar.style.cssText = "position:fixed;top:0;left:0;height:2px;background:linear-gradient(90deg,#00f0ff,#7b5cff,#ff3c7b);z-index:9999;box-shadow:0 0 10px #00f0ff;width:0%;transition:width 0.1s";
  document.body.prepend(bar);
  window.addEventListener("scroll", function() {
    var p = (document.documentElement.scrollTop / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    bar.style.width = p + "%";
  });

  // 2. CURSOR GLOW
  var glow = document.createElement("div");
  glow.style.cssText = "position:fixed;width:200px;height:200px;border-radius:50%;background:radial-gradient(circle,rgba(0,240,255,0.06) 0%,transparent 70%);pointer-events:none;z-index:9997;transform:translate(-50%,-50%)";
  document.body.appendChild(glow);
  document.addEventListener("mousemove", function(e) {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
  });

  // 3. 3D CARD TILT ON HOVER
  document.querySelectorAll(".project-card").forEach(function(card) {
    card.style.transformStyle = "preserve-3d";
    card.addEventListener("mousemove", function(e) {
      var rect = card.getBoundingClientRect();
      var rx = (e.clientY - rect.top - rect.height / 2) / 15;
      var ry = (rect.width / 2 - (e.clientX - rect.left)) / 15;
      card.style.transform = "translateY(-6px) perspective(1000px) rotateX(" + rx + "deg) rotateY(" + ry + "deg)";
      card.style.transition = "transform 0.1s ease";
    });
    card.addEventListener("mouseleave", function() {
      card.style.transform = "translateY(0)";
      card.style.transition = "transform 0.5s ease";
    });
  });

  // 4. PROJECT BADGES
  var cards = document.querySelectorAll(".project-card");
  var badges = ["LIVE", "SHIPPED", "SEARCH", "ML"];
  var colors = ["#ff3c7b", "#7b5cff", "#00f0ff", "#f0a030"];
  cards.forEach(function(card, i) {
    var badge = document.createElement("div");
    badge.textContent = badges[i] || "";
    badge.style.cssText = "position:absolute;top:-1px;right:60px;background:" + colors[i] + ";color:#fff;font-family:monospace;font-size:9px;padding:4px 10px;letter-spacing:1px;text-transform:uppercase;z-index:2";
    card.appendChild(badge);
  });

  // 5. DYNAMIC FAVICON
  var c = document.createElement("canvas");
  c.width = 32; c.height = 32;
  var ctx = c.getContext("2d");
  var g = ctx.createLinearGradient(0, 0, 32, 32);
  g.addColorStop(0, "#00f0ff"); g.addColorStop(1, "#7b5cff");
  ctx.beginPath(); ctx.arc(16, 16, 14, 0, Math.PI * 2);
  ctx.fillStyle = g; ctx.fill();
  ctx.fillStyle = "#05060f"; ctx.font = "bold 18px monospace";
  ctx.textAlign = "center"; ctx.textBaseline = "middle";
  ctx.fillText("S", 16, 17);
  var link = document.querySelector("link[rel~='icon']") || document.createElement("link");
  link.rel = "icon"; link.href = c.toDataURL();
  document.head.appendChild(link);

  // 6. PARTICLE COLOR SHIFT PER SECTION
  var sectionColors = {
    hero: [0, 0.94, 1],
    about: [0, 0.94, 1],
    projects: [0.48, 0.36, 1],
    skills: [1, 0.24, 0.48],
    experience: [0.48, 0.36, 1],
    contact: [0, 0.94, 1]
  };
  if (typeof geometry !== "undefined") {
    var secObs = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting && sectionColors[entry.target.id]) {
          var col = sectionColors[entry.target.id];
          var arr = geometry.attributes.color.array;
          for (var i = 0; i < arr.length; i += 3) {
            arr[i] += (col[0] - arr[i]) * 0.02;
            arr[i+1] += (col[1] - arr[i+1]) * 0.02;
            arr[i+2] += (col[2] - arr[i+2]) * 0.02;
          }
          geometry.attributes.color.needsUpdate = true;
        }
      });
    }, { threshold: 0.3 });
    document.querySelectorAll(".section").forEach(function(s) { secObs.observe(s); });
  }

  // 7. HERO ACCENT
  var tag = document.querySelector(".hero-tag");
  if (tag && !tag.dataset.enhanced) {
    tag.dataset.enhanced = "1";
    tag.innerHTML = "\u2B21 " + tag.textContent + " \u2B21";
  }

  console.log("Portfolio enhancements V2 loaded");
})();
