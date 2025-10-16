import React, { useEffect, useRef } from 'react';
import { ChevronRight } from 'lucide-react';

const Experience = () => {
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

  const experience = [
    {
      role: 'Freelance Full Stack Developer',
      company: 'Remote',
      period: 'June 2023 - Present',
      points: [
        'Delivered full-stack web applications using Laravel, Vue.js/React, improving client efficiency by 20%',
        'Built responsive, mobile-first UIs with scalable backend services',
        'Implemented CI/CD pipelines reducing deployment errors by 30%',
        'Conducted security audits achieving 99.9% uptime'
      ]
    },
    {
      role: 'Senior PHP Developer',
      company: 'Sans IT Consultancy, Cochin, Kerala',
      period: 'January 2021 - Present',
      points: [
        'Engineered custom HRMS, Payroll, and CRM platforms saving 150+ man-hours monthly',
        'Optimized SQL queries achieving 30% performance improvement',
        'Integrated REST/SOAP APIs and Flutter mobile backend',
        'Mentored junior developers and conducted technical workshops'
      ]
    },
    {
      role: 'PHP Developer',
      company: 'MNF Infrastructure Pvt. Ltd., Ernakulam, Kerala',
      period: 'January 2020 - January 2021',
      points: [
        'Developed web applications using Core PHP, CodeIgniter, and MySQL',
        'Built HR modules reducing administrative workload by 20%',
        'Integrated payment gateways (Razorpay, PayPal)',
        'Performed unit testing and maintained project documentation'
      ]
    }
  ];

  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-slate-900 min-h-screen overflow-hidden">
      {/* Animated Particle Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: 'transparent' }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto">
        <h2 className="text-4xl font-extrabold mb-12 text-center bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
          Experience
        </h2>

        <div className="space-y-10">
          {experience.map((exp, idx) => (
            <div
              key={idx}
              className="relative group bg-slate-800/70 hover:bg-slate-700/90 transition-colors duration-300 border-l-4 border-cyan-400 pl-8 pr-6 py-6 rounded-lg shadow-lg hover:shadow-2xl"
            >
              <span className="absolute -left-3 top-6 w-3 h-3 bg-cyan-400 rounded-full shadow-md"></span>
              <h3 className="text-2xl font-bold text-cyan-400 mb-1">{exp.role}</h3>
              <p className="text-gray-400 italic mb-1">{exp.company}</p>
              <p className="text-pink-400 font-semibold mb-4">{exp.period}</p>

              <ul className="space-y-2">
                {exp.points.map((point, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-gray-300"
                  >
                    <ChevronRight size={20} className="text-cyan-400 flex-shrink-0 mt-1" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;