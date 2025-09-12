// Three.js 3D Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 500, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('three-canvas'), alpha: true });
renderer.setSize(window.innerWidth, 500);

// Torus
const torusGeometry = new THREE.TorusGeometry(1, 0.4, 16, 100);
const torusMaterial = new THREE.MeshBasicMaterial({ color: 0xFF4500, wireframe: true });
const torus = new THREE.Mesh(torusGeometry, torusMaterial);
torus.position.x = -1.5;
scene.add(torus);

// Icosahedron
const icosaGeometry = new THREE.IcosahedronGeometry(0.8, 1);
const icosaMaterial = new THREE.MeshBasicMaterial({ color: 0xFF8C00, wireframe: true });
const icosa = new THREE.Mesh(icosaGeometry, icosaMaterial);
icosa.position.x = 1.5;
scene.add(icosa);

// Particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 1000;
const posArray = new Float32Array(particlesCount * 3);
for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 15;
}
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const particlesMaterial = new THREE.PointsMaterial({ color: 0xFF4500, size: 0.05 });
const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.01;
    icosa.rotation.x += 0.02;
    icosa.rotation.y += 0.02;
    particles.rotation.y += 0.001;
    renderer.render(scene, camera);
}
animate();

// Resize handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / 500;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, 500);
});

// GSAP Animations
gsap.registerPlugin();

gsap.from(".hero-content", { duration: 1.5, opacity: 0, y: 50, ease: "power2.out", delay: 0.5 });
gsap.from(".hero-content p", { duration: 1, opacity: 0, y: 30, ease: "power2.out", delay: 1 });
gsap.from(".btn", { duration: 1, opacity: 0, scale: 0.8, ease: "back.out(1.7)", delay: 1.5 });

gsap.utils.toArray(".service-item, .project-item, .testimonial-item").forEach(item => {
    gsap.from(item, {
        scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power2.out"
    });
});

gsap.from(".nav-link", {
    scrollTrigger: {
        trigger: ".navbar",
        start: "top top",
        toggleActions: "play none none reverse"
    },
    opacity: 0,
    y: -20,
    duration: 1,
    stagger: 0.1,
    ease: "power2.out"
});

// Smooth scroll
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

// Initialize AOS
AOS.init();
