import { useEffect, useRef } from 'react';

const FireworksBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#D4AF37', '#FFD700', '#FFF5D1', '#F3E5AB', '#FFA500']; // Luxury gold & orange colors

    class Particle {
      constructor(x, y, isFirework = false) {
        this.x = x;
        this.y = y;
        this.isFirework = isFirework;
        // BIGGER particles for fireworks
        this.radius = isFirework ? Math.random() * 3.5 + 1.5 : Math.random() * 2 + 0.5;

        const angle = Math.random() * Math.PI * 2;
        // FASTER spread for bigger fireworks
        const speed = isFirework ? Math.random() * 5 + 1 : Math.random() * 0.5 + 0.1;

        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;

        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.alpha = 1;
        // Slower decay so they stay on screen longer
        this.decay = isFirework ? Math.random() * 0.015 + 0.005 : Math.random() * 0.002 + 0.001;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = this.isFirework ? 15 : 8; // Bigger glow
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.restore();
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.isFirework) {
          this.vy += 0.02; // Gravity
        }
        this.alpha -= this.decay;
      }
    }

    const createFirework = () => {
      const x = Math.random() * canvas.width;
      const y = Math.random() * (canvas.height * 0.6); // Explode in the upper 60%

      // MORE particles per explosion for a grander look
      for (let i = 0; i < 150; i++) {
        particles.push(new Particle(x, y, true));
      }
    };

    // Initial ambient floating dust particles
    for (let i = 0; i < 60; i++) {
      particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height, false));
    }

    let frameCount = 0;

    const animate = () => {
      ctx.fillStyle = 'rgba(13, 13, 13, 0.2)'; // Faint trail effect
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      frameCount++;
      // MORE FREQUENT fireworks
      if (frameCount % 30 === 0) {
        createFirework();
        // Sometimes launch a double firework
        if (Math.random() > 0.5) {
          setTimeout(createFirework, 200);
        }
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();

        if (particles[i].alpha <= 0) {
          particles.splice(i, 1);
          if (!particles[i]?.isFirework && particles.length < 100) {
            particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height, false));
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-90"
    />
  );
};

export default FireworksBackground;
