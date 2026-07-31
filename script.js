const yearNode = document.getElementById("year");
if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

const revealNodes = document.querySelectorAll("[data-reveal]");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          
          // Trigger typewriter effect for project descriptions
          const typeDesc = entry.target.querySelector('.project-desc');
          if (typeDesc && !typeDesc.classList.contains('typing')) {
            const originalText = typeDesc.textContent.trim();
            if (originalText.length > 0) {
              typeDesc.classList.add('typing');
              typeDesc.textContent = ''; // clear it to start typing
              let charIndex = 0;
              const type = () => {
                if (charIndex < originalText.length) {
                  typeDesc.textContent += originalText.charAt(charIndex);
                  charIndex++;
                  setTimeout(type, 20); // slightly faster typing
                } else {
                  setTimeout(() => {
                    typeDesc.classList.remove('typing');
                  }, 2000); // leave cursor blinking for 2s after done
                }
              };
              // Delay typing slightly so the slide-in animation starts first
              setTimeout(type, 900);
            }
          }

          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealNodes.forEach((node) => observer.observe(node));
} else {
  revealNodes.forEach((node) => node.classList.add("is-visible"));
}

const form = document.querySelector("[data-contact-form]");
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const email = String(data.get("email") || "").trim();
    const mobile = String(data.get("mobile") || "").trim();
    const message = String(data.get("message") || "").trim();

    const subject = encodeURIComponent("Portfolio inquiry for BHARATH K");
    const body = encodeURIComponent(
      [
        `Email: ${email || "Not provided"}`,
        `Mobile: ${mobile || "Not provided"}`,
        "",
        message,
      ].join("\n")
    );

    window.location.href = `mailto:k.bharath6474@gmail.com?subject=${subject}&body=${body}`;
  });
}

// Typing effect for hero intro
const introElement = document.querySelector('.hero-intro');
if (introElement) {
  const introText = introElement.textContent.trim().replace(/\s+/g, ' ');
  introElement.textContent = '';
  introElement.style.borderRight = '2px solid #55aa04';
  introElement.style.paddingRight = '4px';
  
  let i = 0;
  const typeWriter = () => {
    if (i < introText.length) {
      introElement.textContent += introText.charAt(i);
      i++;
      setTimeout(typeWriter, 35);
    } else {
      introElement.style.borderRight = 'none';
    }
  };
  setTimeout(typeWriter, 800);
}

// Release skill card entry animation so hover transforms keep working
const workedItems = document.querySelectorAll('.worked-grid div');
workedItems.forEach(el => {
  el.addEventListener('animationend', () => {
    el.style.animation = 'none';
  });
});

// 3D Tilt Effect for project cards (throttled with rAF)
const tiltElements = document.querySelectorAll('.case-media, .recent-media, .approach-card');
tiltElements.forEach(el => {
  let ticking = false;
  let lastX = 0, lastY = 0;

  el.addEventListener('mousemove', e => {
    lastX = e.clientX;
    lastY = e.clientY;
    if (!ticking) {
      requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const x = lastX - rect.left;
        const y = lastY - rect.top;

        const xPct = x / rect.width - 0.5;
        const yPct = y / rect.height - 0.5;

        el.style.transform = `perspective(1000px) rotateX(${yPct * -12}deg) rotateY(${xPct * 12}deg) scale3d(1.02, 1.02, 1.02)`;
        el.style.transition = 'none';
        el.style.zIndex = '10';

        ticking = false;
      });
      ticking = true;
    }
  });

  el.addEventListener('mouseleave', () => {
    ticking = false;
    el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    el.style.transition = 'transform 0.5s ease';
    el.style.zIndex = '1';
  });
});

// Live clocks for Coimbatore & Germany
(function initClocks() {
  const footerYear = document.getElementById("year");
  if (!footerYear) return;

  function updateClocks() {
    const now = new Date();
    const opts = { weekday: "short", year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false };
    const coimbatore = now.toLocaleString("en-IN", { ...opts, timeZone: "Asia/Kolkata" });
    const germany = now.toLocaleString("en-DE", { ...opts, timeZone: "Europe/Berlin" });
    footerYear.innerHTML = `Coimbatore ${coimbatore} &nbsp;·&nbsp; Germany ${germany}`;
  }

  updateClocks();
  setInterval(updateClocks, 1000);
})();
