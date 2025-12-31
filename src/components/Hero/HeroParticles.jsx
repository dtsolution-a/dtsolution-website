import React, { useEffect, useRef } from 'react';

const HeroParticles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    // --- CONFIGURATION ---
    const PARTICLE_COUNT = window.innerWidth < 768 ? 150 : 300; // Mobile vs Desktop count
    const ROTATION_SPEED = 0.002; // Super Slow Rotation
    const MOUSE_REPULSION_RADIUS = 150;
    const BASE_RADIUS_FACTOR = window.innerWidth < 768 ? 0.3 : 0.25; // Circle size

    // Mouse State
    let mouse = { x: -1000, y: -1000 };

    // Set Canvas Size
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    // --- PARTICLE CLASS ---
    class Particle {
      constructor(index) {
        this.index = index;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5; // Random size between 0.5 and 2
        
        // Circular Logic
        this.angle = (index / PARTICLE_COUNT) * Math.PI * 2;
        this.radiusOffset = Math.random() * 50 - 25; // Scatter effect (-25 to +25)
        this.angleOffset = Math.random() * 0.2 - 0.1; // Random angle jitter
        
        this.opacity = 0;
        this.targetOpacity = Math.random() * 0.5 + 0.2; // Max opacity
      }

      update(centerX, centerY, baseRadius) {
        // 1. Calculate Target Position (The Circle)
        // Add rotation over time
        this.angle += ROTATION_SPEED;
        
        const variedRadius = baseRadius + this.radiusOffset;
        const variedAngle = this.angle + this.angleOffset;
        
        let targetX = centerX + Math.cos(variedAngle) * variedRadius;
        let targetY = centerY + Math.sin(variedAngle) * variedRadius;

        // 2. Mouse Repulsion (Physics)
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < MOUSE_REPULSION_RADIUS) {
          const force = (MOUSE_REPULSION_RADIUS - distance) / MOUSE_REPULSION_RADIUS;
          const repulsionX = (dx / distance) * force * 50; // Push strength
          const repulsionY = (dy / distance) * force * 50;
          
          targetX -= repulsionX;
          targetY -= repulsionY;
        }

        // 3. Move Particle towards Target (Easing)
        this.x += (targetX - this.x) * 0.05;
        this.y += (targetY - this.y) * 0.05;

        // 4. Fade In
        if (this.opacity < this.targetOpacity) {
          this.opacity += 0.01;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        
        // Clean White look (Premium)
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity * 0.6})`; // 0.6 multiplier for subtlety
        
        ctx.fill();
      }
    }

    // Initialize Particles
    const initParticles = () => {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle(i));
      }
    };
    initParticles();

    // Animation Loop
    const animate = () => {
      // Clear Canvas (Transparent)
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(canvas.width, canvas.height) * BASE_RADIUS_FACTOR;

      particles.forEach(particle => {
        particle.update(centerX, centerY, radius);
        particle.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    // Event Listeners
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default HeroParticles;