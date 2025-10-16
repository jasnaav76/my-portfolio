import React, { useState, useEffect, useRef } from 'react';
import profilePic from '../assets/images/profile.jpg';
import resume from '../assets/CV/Resume.pdf';

const Home = ({ setCurrentPage }) => {
  const canvasRef = useRef(null);
  const jobTitles = [
    'Full Stack Developer',
    'Senior PHP Developer',
    'Full Stack Flutter Developer',
    'Frontend Developer',
    'Backend Developer',
    'Web Developer',
    'Python Developer',
    'Data Scientist'
  ];

  const [jobIndex, setJobIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

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

  // Typing animation effect
  useEffect(() => {
    const currentJob = jobTitles[jobIndex];
    let typingSpeed = 100;

    const type = () => {
      if (!isDeleting) {
        setDisplayedText(currentJob.slice(0, displayedText.length + 1));
        if (displayedText.length + 1 === currentJob.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayedText(currentJob.slice(0, displayedText.length - 1));
        typingSpeed = 50;
        if (displayedText.length === 0) {
          setIsDeleting(false);
          setJobIndex((prev) => (prev + 1) % jobTitles.length);
        }
      }
    };

    const timer = setTimeout(type, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, jobIndex, jobTitles]);

  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 text-center min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Animated Particle Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: 'transparent' }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Profile Image */}
        <div className="w-48 h-48 rounded-full overflow-hidden mb-8 border-4 border-cyan-400 animate-pulse mx-auto">
          <img
            src={profilePic}
            alt="Profile"
            className="w-full h-full object-cover rounded-full"
          />
        </div>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-pink-500 bg-clip-text text-transparent">
            Jasna AV
          </h1>

          <p className="text-2xl sm:text-4xl mb-8 text-gray-300">
            I'm a{' '}
            <span className="font-bold bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
              {displayedText}
              <span className="border-r-2 border-cyan-400 animate-pulse ml-1"></span>
            </span>
          </p>

          <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
            5+ years of experience building scalable web and mobile applications. Specializing in PHP, Laravel, Flutter, and modern web technologies.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setCurrentPage('projects')}
              className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-bold rounded-lg transition-all transform hover:scale-105"
            >
              View My Work
            </button>
            <button
              onClick={() => setCurrentPage('contact')}
              className="px-8 py-3 border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-slate-900 font-bold rounded-lg transition-all"
            >
              Get In Touch
            </button>
            
            <a
              href={resume}
              download="Jasna_AV_CV.pdf"
              className="px-8 py-3 border-2 border-pink-500 text-pink-400 hover:bg-pink-500 hover:text-slate-900 font-bold rounded-lg transition-all inline-flex items-center justify-center gap-2"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" 
                  clipRule="evenodd" 
                />
              </svg>
              Download CV
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;