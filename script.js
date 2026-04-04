// --- 1. Three.js Background Setup (The Rotating Arduino) ---
const canvas = document.querySelector('#bg-canvas');
const scene = new THREE.Scene();

// Camera setup
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 25;

// Renderer setup
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0x00d2ff, 1);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

// --- Build a Stylized "Arduino" using Primitives ---
const arduinoGroup = new THREE.Group();

// Main Board (Blue PCB)
const boardGeo = new THREE.BoxGeometry(10, 0.5, 14);
const boardMat = new THREE.MeshStandardMaterial({ color: 0x005A9C, roughness: 0.7 });
const board = new THREE.Mesh(boardGeo, boardMat);
arduinoGroup.add(board);

// Main Microcontroller (Black Chip)
const chipGeo = new THREE.BoxGeometry(2, 0.6, 6);
const chipMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.4 });
const chip = new THREE.Mesh(chipGeo, chipMat);
chip.position.set(1, 0.3, 0);
arduinoGroup.add(chip);

// USB Port (Silver)
const usbGeo = new THREE.BoxGeometry(2, 1.5, 2.5);
const usbMat = new THREE.MeshStandardMaterial({ color: 0xcccccc, metalness: 0.8 });
const usb = new THREE.Mesh(usbGeo, usbMat);
usb.position.set(-3, 0.75, -5.5);
arduinoGroup.add(usb);

// Power Jack (Black)
const powerGeo = new THREE.BoxGeometry(1.5, 1.2, 2);
const power = new THREE.Mesh(powerGeo, chipMat);
power.position.set(-3, 0.6, 5);
arduinoGroup.add(power);

// IO Header Pins (Black strips)
const headerGeo = new THREE.BoxGeometry(0.8, 0.8, 10);
const headerGeo2 = new THREE.BoxGeometry(0.8, 0.8, 8);
const header1 = new THREE.Mesh(headerGeo, chipMat);
header1.position.set(4, 0.4, 0);
const header2 = new THREE.Mesh(headerGeo2, chipMat);
header2.position.set(-4, 0.4, -1);
arduinoGroup.add(header1);
arduinoGroup.add(header2);

// Add board to scene and tilt it initially
scene.add(arduinoGroup);
arduinoGroup.rotation.x = Math.PI / 4;
arduinoGroup.rotation.y = Math.PI / 4;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    // Base slow rotation for idle visual effect
    arduinoGroup.rotation.y += 0.002;
    arduinoGroup.rotation.x += 0.001;

    renderer.render(scene, camera);
}
animate();

// Handle Window Resize
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});


// --- 2. HTML Elements 3D Scroll Logic ---
const cards3D = document.querySelectorAll('.card-3d');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    let currentScrollY = window.scrollY;
    let scrollDelta = currentScrollY - lastScrollY;
    
    // Rotate the 3D background Arduino based on scroll
    arduinoGroup.rotation.z += scrollDelta * 0.002;
    arduinoGroup.rotation.x += scrollDelta * 0.001;
    
    // Make HTML Elements shift in 3D direction when scrolled
    cards3D.forEach(card => {
        // Calculate a tilt angle based on how fast you scroll
        // Clamped between -15 and 15 degrees to remain readable
        let tiltX = Math.max(-15, Math.min(15, scrollDelta * 0.5));
        
        // Also subtly change the Y tilt based on scroll position on page
        let tiltY = Math.sin(currentScrollY * 0.002) * 10;
        
        card.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    });

    // Reset card orientation smoothly when scrolling stops
    clearTimeout(window.scrollTimeout);
    window.scrollTimeout = setTimeout(() => {
        cards3D.forEach(card => {
            card.style.transform = `rotateX(0deg) rotateY(0deg)`;
        });
    }, 150);

    lastScrollY = currentScrollY;
});


// --- 3. Navbar & Smooth Scrolling ---
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section');

// Smooth scroll to sections
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        window.scrollTo({
            top: targetSection.offsetTop,
            behavior: 'smooth'
        });
    });
});

// Highlight Active Nav Link on Scroll
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    navMenu.style.flexDirection = 'column';
    navMenu.style.position = 'absolute';
    navMenu.style.top = '60px';
    navMenu.style.right = '20px';
    navMenu.style.background = 'rgba(10, 15, 22, 0.9)';
    navMenu.style.padding = '20px';
    navMenu.style.borderRadius = '10px';
});
