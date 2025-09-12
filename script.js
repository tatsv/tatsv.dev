// Three.js 3D Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 400, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('three-canvas'), alpha: true });
renderer.setSize(window.innerWidth, 400);

const geometry = new THREE.TorusGeometry(1, 0.4, 16, 100); // Torus for circuitry effect
const material = new THREE.MeshBasicMaterial({ color: 0x00A8E8, wireframe: true });
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();

// Resize handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / 400;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, 400);
});

// GSAP Animations
gsap.registerPlugin();

gsap.from(".hero-content h1", { duration: 1.5, opacity: 0, y: 50, ease: "power2.out", delay: 0.5 });
gsap.from(".hero-content p", { duration: 1.5, opacity: 0, y: 30, ease: "power2.out", delay: 1 });

gsap.utils.toArray("section").forEach(section => {
    gsap.from(section, {
        scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power2.out"
    });
});

gsap.from(".nav-link", {
    scrollTrigger: {
        trigger: "nav",
        start: "top top",
        toggleActions: "play none none reverse"
    },
    opacity: 0,
    y: -20,
    duration: 1,
    stagger: 0.1,
    ease: "power2.out"
});

// Smooth scroll (unchanged)
document.querySelectorAll('.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
        this.classList.add('active');
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Initialize AOS for additional scroll animations
AOS.init();
