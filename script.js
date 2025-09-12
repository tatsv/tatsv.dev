// Three.js 3D Background Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 500, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('three-canvas'), alpha: true });
renderer.setSize(window.innerWidth, 500);

// Create circuitry lines
const lines = [];
const lineMaterial = new THREE.LineBasicMaterial({ color: 0xFF4500, transparent: true, opacity: 0.8 });
for (let i = 0; i < 20; i++) {
    const points = [];
    points.push(new THREE.Vector3(-10 + i * 1.2, -5 + Math.random() * 10, -10));
    points.push(new THREE.Vector3(-10 + i * 1.2, -5 + Math.random() * 10, 10));
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(geometry, lineMaterial);
    lines.push(line);
    scene.add(line);
}

// Create nodes (spheres)
const nodes = [];
const nodeGeometry = new THREE.SphereGeometry(0.1, 16, 16);
const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0xFF8C00, transparent: true, opacity: 0.9 });
for (let i = 0; i < 50; i++) {
    const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
    node.position.set(Math.random() * 20 - 10, Math.random() * 10 - 5, Math.random() * 20 - 10);
    nodes.push(node);
    scene.add(node);
}

// Particles for ambient glow
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 1000;
const posArray = new Float32Array(particlesCount * 3);
for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 20;
}
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const particlesMaterial = new THREE.PointsMaterial({ color: 0xFF4500, size: 0.05, transparent: true, opacity: 0.6 });
const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xFF8C00, 1, 100);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

camera.position.z = 8;

function animate() {
    requestAnimationFrame(animate);
    lines.forEach(line => {
        line.rotation.y += 0.002;
    });
    nodes.forEach(node => {
        node.position.y += Math.sin(Date.now() * 0.001 + node.position.x) * 0.01;
    });
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

// GSAP Animations (unchanged)
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

AOS.init();
