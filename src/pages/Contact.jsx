import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react';

const Contact = () => {
  const canvasRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-slate-900 min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Particle Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: 'transparent' }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto w-full">
        <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent text-center">
          Get In Touch
        </h2>
        <p className="text-lg text-gray-300 mb-12 text-center">
          Have a project in mind? Let's collaborate and create something amazing together.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <a href="mailto:jasnaav76@gmail.com" className="bg-slate-700/50 border border-cyan-400/30 rounded-lg p-6 hover:border-cyan-400 transition-all transform hover:scale-105 text-center">
            <Mail size={32} className="text-cyan-400 mx-auto mb-3" />
            <h3 className="font-bold text-gray-200">Email</h3>
            <p className="text-gray-400 text-sm mt-2">jasnaav76@gmail.com</p>
          </a>
          <a href="tel:+971581182681" className="bg-slate-700/50 border border-cyan-400/30 rounded-lg p-6 hover:border-cyan-400 transition-all transform hover:scale-105 text-center">
            <Phone size={32} className="text-cyan-400 mx-auto mb-3" />
            <h3 className="font-bold text-gray-200">Phone</h3>
            <p className="text-gray-400 text-sm mt-2">+971 581182681</p>
          </a>
          <div className="bg-slate-700/50 border border-cyan-400/30 rounded-lg p-6 hover:border-cyan-400 transition-all transform hover:scale-105 text-center">
            <MapPin size={32} className="text-cyan-400 mx-auto mb-3" />
            <h3 className="font-bold text-gray-200">Location</h3>
            <p className="text-gray-400 text-sm mt-2">Dubai, UAE</p>
          </div>
        </div>

        <div className="bg-slate-700/50 border border-cyan-400/30 rounded-lg p-8 mb-8">
          <div>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-slate-800 border border-cyan-400/30 rounded px-4 py-3 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-cyan-400"
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-slate-800 border border-cyan-400/30 rounded px-4 py-3 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-cyan-400"
              />
            </div>
            <input
              type="text"
              placeholder="Subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full bg-slate-800 border border-cyan-400/30 rounded px-4 py-3 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-cyan-400 mb-6"
            />
            <textarea
              placeholder="Message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-slate-800 border border-cyan-400/30 rounded px-4 py-3 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-cyan-400 mb-6 h-32 resize-none"
            />
            <button
              onClick={handleSubmit}
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-bold py-3 rounded-lg transition-all"
            >
              Send Message
            </button>
          </div>
          {submitted && <p className="text-center text-cyan-400 mt-4">Message sent successfully!</p>}
        </div>

        <div className="flex justify-center gap-6">
          <a href="https://github.com/jasnaav76" target="_blank" rel="noopener noreferrer" className="bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-bold py-3 px-6 rounded-lg transition-all flex items-center gap-2">
            <Github size={20} /> GitHub
          </a>
          <a href="https://www.linkedin.com/in/jasnaav76" target="_blank" rel="noopener noreferrer" className="bg-pink-500 hover:bg-pink-600 text-slate-900 font-bold py-3 px-6 rounded-lg transition-all flex items-center gap-2">
            <Linkedin size={20} /> LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;