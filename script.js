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

// 3D Tilt Effect for project cards
const tiltElements = document.querySelectorAll('.case-media, .recent-media, .approach-card');

tiltElements.forEach(el => {
  el.addEventListener('mousemove', e => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element
    const y = e.clientY - rect.top;  // y position within the element
    
    const xPct = x / rect.width - 0.5;
    const yPct = y / rect.height - 0.5;
    
    const xRotation = yPct * -12; // max rotation degrees
    const yRotation = xPct * 12;
    
    el.style.transform = `perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg) scale3d(1.02, 1.02, 1.02)`;
    el.style.transition = 'none';
    el.style.zIndex = '10';
  });
  
  el.addEventListener('mouseleave', () => {
    el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    el.style.transition = 'transform 0.5s ease';
    el.style.zIndex = '1';
  });
});
