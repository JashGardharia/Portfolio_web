function sendMail(){
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const msg = document.getElementById("msg").value;

  const body = `Name: ${name}\nEmail: ${email}\nMessage: ${msg}`;

  window.location.href = `mailto:jashembedded@gmail.com?subject=Project&body=${encodeURIComponent(body)}`;
}

// mobile nav
const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("navLinks");

hamburger.onclick = () => {
  nav.classList.toggle("show");
};
