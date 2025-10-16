import React, { useEffect, useRef } from 'react';
import { ChevronRight } from 'lucide-react';

const Skills = () => {
  const canvasRef = useRef(null);

  // Particle animation effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 211, 238, ${this.opacity})`;
        ctx.fill();
      }
    }

    // Create particles
    for (let i = 0; i < 100; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        particle.update();
        particle.draw();

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particle.x - particles[j].x;
          const dy = particle.y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(34, 211, 238, ${0.15 * (1 - distance / 120)})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const skills = [
    {
      icon: '💻',
      title: 'PHP & Backend',
      items: ['PHP (Core & Advanced)', 'Laravel Framework', 'CodeIgniter', 'WordPress', 'REST/SOAP APIs']
    },
    {
      icon: '⚛️',
      title: 'Frontend Development',
      items: ['Vue.js & React', 'JavaScript (ES6+)', 'HTML5 & CSS3', 'Bootstrap', 'jQuery & AJAX']
    },
    {
      icon: '📱',
      title: 'Mobile Development',
      items: ['Flutter Framework', 'iOS & Android', 'Mobile Backend APIs', 'Cross-platform Dev', 'App Store Publishing']
    },
    {
      icon: '🗄️',
      title: 'Database',
      items: ['MySQL', 'PostgreSQL', 'Query Optimization', 'Schema Design', 'Data Migration']
    },
    {
      icon: '🏢',
      title: 'Enterprise Solutions',
      items: ['HRMS Systems', 'Payroll Automation', 'CRM Development', 'Attendance Tracking', 'Leave Management']
    },
    {
      icon: '🔧',
      title: 'DevOps & Tools',
      items: ['Git & GitHub', 'CI/CD Pipelines', 'Docker', 'Linux', 'Agile Methodologies']
    }
  ];

  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen bg-slate-900 overflow-hidden">
      {/* Animated Particle Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: 'transparent' }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto">
        <h2 className="text-4xl font-extrabold mb-12 text-center bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
          Skills
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, idx) => (
            <div
              key={idx}
              className="bg-slate-800/70 border border-cyan-400/30 rounded-xl p-6 transform transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/40 relative group"
            >
              {/* Icon Bounce */}
              <div className="text-5xl mb-4 animate-bounce group-hover:animate-none">{skill.icon}</div>
              
              <h3 className="text-xl font-bold text-cyan-400 mb-4">{skill.title}</h3>
              
              <ul className="space-y-2">
                {skill.items.map((item, i) => (
                  <li
                    key={i}
                    className={`flex items-start gap-2 text-gray-300 opacity-0 translate-x-6 animate-fade-in`}
                    style={{ animationDelay: `${i * 150}ms`, animationFillMode: 'forwards' }}
                  >
                    <ChevronRight size={16} className="text-pink-500 mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Gradient pulse border */}
              <span className="absolute inset-0 rounded-xl border-2 border-transparent bg-gradient-to-r from-cyan-400 to-pink-500 opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"></span>
            </div>
          ))}
        </div>
      </div>

      {/* Custom animations */}
      <style>
        {`
          @keyframes fade-in {
            from { opacity: 0; transform: translateX(20px); }
            to { opacity: 1; transform: translateX(0); }
          }
          .animate-fade-in {
            animation: fade-in 0.5s ease forwards;
          }
        `}
      </style>
    </section>
  );
};

export default Skills;