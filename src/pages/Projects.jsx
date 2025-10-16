import React, { useEffect, useRef } from 'react';

const Projects = () => {
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

  const projects = [
    {
      title: 'HRMS Mobile App',
      description: 'Flutter-based HRMS mobile application for iOS and Android with 50+ active users.',
      tags: ['Flutter', 'iOS', 'Android', 'REST API', 'PHP'],
      icon: '📱'
    },
    {
      title: 'Enterprise HRMS System',
      description: 'Comprehensive HRMS platform automating payroll, attendance, and leave management.',
      tags: ['Core PHP', 'JavaScript', 'MySQL', 'HTML5', 'CSS'],
      icon: '👥'
    },
    {
      title: 'Online Blog Software',
      description: 'Modern blogging platform with rich text editor, SEO optimization, and social media integration.',
      tags: ['PHP 8.3', 'Laravel 11', 'MySQL 8', 'Bootstrap 5', 'jQuery'],
      icon: '📝'
    },
    {
      title: 'Patient Management System',
      description: 'Complete healthcare solution with appointment booking and medical records.',
      tags: ['PHP', 'Laravel', 'MySQL', 'React'],
      icon: '🏥'
    },
    {
      title: 'School Management System',
      description: 'Integrated platform managing 3,000+ students and 150+ staff members.',
      tags: ['PHP', 'Laravel', 'MySQL', 'React'],
      icon: '🎓'
    },
    {
      title: 'Business Analytics Dashboard',
      description: 'Real-time analytics with interactive charts and custom reporting.',
      tags: ['PHP', 'Laravel', 'MySQL', 'React'],
      icon: '📊'
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
          Projects
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="relative group bg-slate-800/70 border border-cyan-400/30 rounded-xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/40"
            >
              {/* Icon with hover animation */}
              <div className="h-32 bg-gradient-to-br from-cyan-500/20 to-pink-500/20 flex items-center justify-center border-b border-cyan-400/30 text-5xl transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
                {project.icon}
              </div>

              {/* Card content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-cyan-400 mb-2">{project.title}</h3>
                <p className="text-gray-300 mb-4 text-sm leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full border border-cyan-400/30 opacity-0 translate-y-4 animate-fade-up"
                      style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'forwards' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-pink-500/10 opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>

      <style>
        {`
          @keyframes fade-up {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-up {
            animation: fade-up 0.5s ease forwards;
          }
        `}
      </style>
    </section>
  );
};

export default Projects;