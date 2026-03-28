// --- 1. LOADER (DOT FLIES INTO NAV LOGO) ---
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  const loaderDot = document.getElementById("loaderDot");
  const navDot = document.getElementById("navDot");

  // Wait for progress bar to finish
  setTimeout(() => {
    // Get positions of loaderDot and navDot
    const start = loaderDot.getBoundingClientRect();
    const end = navDot.getBoundingClientRect();

    // Clone loader dot to animate freely
    const flyingDot = loaderDot.cloneNode(true);
    flyingDot.style.position = "fixed";
    flyingDot.style.left = start.left + "px";
    flyingDot.style.top = start.top + "px";
    flyingDot.style.margin = "0";
    flyingDot.style.zIndex = "10000";
    flyingDot.style.transition = "all 0.9s cubic-bezier(0.2, 1, 0.3, 1)";
    flyingDot.style.animation = "none";
    flyingDot.style.transform = "scale(1.8)";

    document.body.appendChild(flyingDot);

    // Hide original dot inside loader
    loaderDot.style.opacity = "0";

    // Animate dot flying to navbar dot
    setTimeout(() => {
      flyingDot.style.left = end.left + "px";
      flyingDot.style.top = end.top + "px";
      flyingDot.style.transform = "scale(1)";
    }, 50);

    // After flight, remove loader and glow navbar dot
    setTimeout(() => {
      flyingDot.remove();
      loader.style.opacity = "0";

      navDot.classList.add("glow");

      setTimeout(() => {
        navDot.classList.remove("glow");
      }, 1000);

    }, 1000);

    // Fully remove loader
    setTimeout(() => {
      loader.style.display = "none";
    }, 1600);

  }, 1600);
});

// --- 2. HAMBURGER MENU ---
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("show");
  });
});

// --- 3. BACK TO TOP BUTTON ---
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    backToTop.style.display = "block";
  } else {
    backToTop.style.display = "none";
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// --- 4. SCROLL REVEAL ---
window.addEventListener("scroll", revealElements);

function revealElements() {
  const reveals = document.querySelectorAll(".reveal");

  reveals.forEach((el) => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    const revealPoint = 100;

    if (elementTop < windowHeight - revealPoint) {
      el.classList.add("active");
    }
  });
}

revealElements();

// --- 5. EMAIL MESSAGE GENERATOR ---
const myEmail = "jashembedded@gmail.com";

function openEmail() {
  const name = document.getElementById("userName").value.trim();
  const email = document.getElementById("userEmail").value.trim();
  const message = document.getElementById("userMessage").value.trim();
  const status = document.getElementById("copyStatus");

  if (!name || !email || !message) {
    status.innerText = " Please fill all the fields 😭";
    return;
  }

  status.innerText = " Mailing... 📩";

  const subject = encodeURIComponent("Project Inquiry: " + name);

  const body = encodeURIComponent(
`Name: ${name}

Email: ${email}

Message:
${message}

Thank you!`
  );

  window.location.href = `mailto:${myEmail}?subject=${subject}&body=${body}`;
}

function copyMessage() {
  const name = document.getElementById("userName").value.trim();
  const email = document.getElementById("userEmail").value.trim();
  const message = document.getElementById("userMessage").value.trim();
  const status = document.getElementById("copyStatus");

  if (!name || !email || !message) {
    status.innerText = " No data to copy 🙃";
    return;
  }

  const finalText =
`Name: ${name}

Email: ${email}

Message:
${message}

Thank you!`;

  navigator.clipboard.writeText(finalText);
  status.innerText = " Copied to clipboard 📋🔥";
}

// --- 6. 3D TILT EFFECT (FIXED: NO DRUNK BOXES) ---
const tiltCards = document.querySelectorAll("[data-tilt]");

tiltCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const w = rect.width;
    const h = rect.height;

    const rotateX = ((y - h / 2) / h) * -10;
    const rotateY = ((x - w / 2) / w) * 10;

    card.style.transition = "transform 0.05s ease-out";
    card.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale3d(1.03, 1.03, 1.03)
    `;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transition = "transform 0.4s ease";
    card.style.transform = `
      perspective(1000px)
      rotateX(0deg)
      rotateY(0deg)
      scale3d(1, 1, 1)
    `;
  });
});

// --- 7. 3D BACKGROUND PARTICLE ANIMATION ---
const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2;
    this.speedX = Math.random() * 0.8 - 0.4;
    this.speedY = Math.random() * 0.8 - 0.4;
    this.color = Math.random() > 0.5 ? "#6366f1" : "#94a3b8";
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
    if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initParticles() {
  particlesArray = [];
  for (let i = 0; i < 110; i++) {
    particlesArray.push(new Particle());
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();

    for (let j = i; j < particlesArray.length; j++) {
      const dx = particlesArray[i].x - particlesArray[j].x;
      const dy = particlesArray[i].y - particlesArray[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 120) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(99,102,241, ${1 - distance / 120})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
        ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

// Resize canvas when screen changes
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});

// CERTIFICATE SLIDER SYSTEM
const certModal = document.getElementById("certModal");
const certImage = document.getElementById("certImage");
const certCount = document.getElementById("certCount");

const certificates = ["images/cert1.jpg", "images/cert2.jpg", "images/cert3.jpg", "images/cert4.jpg", "images/cert5.jpg"];
let certIndex = 0;

function openCertificates() {
  certModal.style.display = "flex";
  certIndex = 0;
  updateCert();
}

function closeCertificates() {
  certModal.style.display = "none";
}

function nextCert() {
  certIndex = (certIndex + 1) % certificates.length;
  updateCert();
}

function prevCert() {
  certIndex = (certIndex - 1 + certificates.length) % certificates.length;
  updateCert();
}

function updateCert() {
  certImage.src = certificates[certIndex];
  certCount.innerText = `${certIndex + 1} / ${certificates.length}`;
}

// CLOSE MODAL WHEN CLICK OUTSIDE
certModal.addEventListener("click", (e) => {
  if (e.target === certModal) {
    closeCertificates();
  }
});
