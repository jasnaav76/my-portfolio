import React, { useState, useEffect, useRef } from 'react';
import { Phone, Mail, MapPin, Code, Rocket, Users, Coffee } from 'lucide-react';
import profilePic from '../assets/images/profile.jpg';

const About = () => {
  const canvasRef = useRef(null);
  const [activeSkill, setActiveSkill] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

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

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveSkill((prev) => (prev + 1) % 6);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const skills = [
    { name: 'PHP & Laravel', level: 95 },
    { name: 'React & Vue.js', level: 90 },
    { name: 'MySQL & PostgreSQL', level: 88 },
    { name: 'REST APIs', level: 92 },
    { name: 'Docker & DevOps', level: 85 },
    { name: 'Mobile Development', level: 87 },
  ];

  const achievements = [
    { icon: Code, value: '5+', label: 'Years Experience' },
    { icon: Rocket, value: '30+', label: 'Projects Delivered' },
    { icon: Users, value: '20+', label: 'Developers Mentored' },
    { icon: Coffee, value: '∞', label: 'Coffee Consumed' },
  ];

  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-slate-900 text-gray-300 min-h-screen overflow-hidden">
      {/* Animated Particle Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: 'transparent' }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-12">
        {/* Profile Image */}
        <div className="w-48 h-48 rounded-full overflow-hidden border-2 border-cyan-400 flex-shrink-0">
          <div className="w-full h-full bg-gradient-to-br from-cyan-400 to-pink-500 flex items-center justify-center text-6xl font-bold text-white">
            <img
            src={profilePic}
            alt="Profile"
            className="w-full h-full object-cover rounded-full"
          />
          </div>
        </div>

        {/* Info Section */}
        <div className="flex-1 space-y-6">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500">
            Jasna AV
          </h2>
          <h3 className="text-xl font-semibold text-gray-200">
            Senior PHP Developer & Full Stack Engineer
          </h3>
          <p className="leading-relaxed text-gray-300">
            Passionate developer specializing in PHP, Laravel, and modern web technologies. 
            Experienced in building enterprise solutions including HRMS, Payroll, CRM systems, and mobile applications. 
            Skilled in optimizing application performance and delivering scalable solutions that drive business growth.
          </p>

          {/* Contact Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <Phone size={18} className="text-cyan-400" />
              <span>+971 581182681</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={18} className="text-pink-400" />
              <span>Dubai, UAE</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={18} className="text-purple-400" />
              <span>jasnaav76@gmail.com</span>
            </div>
          </div>

          {/* Achievement Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            {achievements.map((ach, index) => (
              <div key={index} className="flex flex-col items-center p-4 bg-slate-800 rounded-lg shadow-sm hover:shadow-md transition">
                <ach.icon size={28} className="text-cyan-400 mb-2" />
                <span className="text-xl font-bold">{ach.value}</span>
                <span className="text-sm text-gray-400">{ach.label}</span>
              </div>
            ))}
          </div>

          {/* Skills Section */}
          <div className="mt-8">
            <h4 className="text-lg font-semibold text-cyan-400 mb-4">Technical Skills</h4>
            <div className="space-y-3">
              {skills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span>{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="h-3 bg-slate-700 rounded-full">
                    <div
                      className={`h-full bg-cyan-500 rounded-full transition-all duration-1000`}
                      style={{ width: isVisible ? `${skill.level}%` : '0%' }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;