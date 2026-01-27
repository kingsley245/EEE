import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, MapPin, Zap, Cpu, Shield, Globe } from 'lucide-react';
import PRES from '../Assets/president.jpeg';

const fader = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const PresidentPortfolio = () => {
  return (
    <div className="min-h-screen bg-[#0a0f1d] text-white font-sans selection:bg-blue-500/30 overflow-x-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.1)_0%,transparent_50%)]" />
      </div>

      <motion.main
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="relative z-10 max-w-7xl mx-auto px-6 py-12 lg:py-24"
      >
        <div className="flex flex-col lg:flex-row gap-16">
          {/* LEFT: Profile Section */}
          <motion.div variants={fader} className="lg:w-1/3">
            <div className="sticky top-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-4xl p-8 shadow-2xl">
              <div className="relative w-40 h-40 mx-auto mb-8">
                <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-20 animate-pulse" />
                <img
                  src={PRES}
                  alt="President"
                  className="relative w-full h-full object-cover rounded-full border-2 border-blue-500/50"
                />
              </div>

              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold">Engr. Alex Carter</h2>
                <p className="text-blue-400 text-sm font-mono tracking-tighter">
                  AEEES PRESIDENT '26
                </p>
              </div>

              <div className="space-y-4 border-t border-white/10 pt-8">
                <div className="flex items-center gap-3 text-gray-400 text-sm">
                  <Mail size={16} className="text-blue-400" />{' '}
                  <span>admin@eee-dept.edu</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400 text-sm">
                  <Linkedin size={16} className="text-blue-400" />{' '}
                  <span>linkedin.com/in/president</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400 text-sm">
                  <MapPin size={16} className="text-blue-400" />{' '}
                  <span>Engineering Block, H3</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Main Content */}
          <div className="lg:w-2/3 space-y-20">
            <motion.section variants={fader}>
              <h1 className="text-6xl lg:text-8xl font-black tracking-tighter mb-8 leading-none">
                THE <span className="text-blue-500">POWER</span> <br />
                OF VISION.
              </h1>
              <p className="text-gray-400 text-xl max-w-xl leading-relaxed">
                Driving technical innovation and student advocacy in the heart
                of the Electrical Engineering Department.
              </p>
            </motion.section>

            {/* Grid Items */}
            <motion.div
              variants={stagger}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {[
                {
                  icon: <Zap />,
                  title: 'Smart Grids',
                  desc: 'Focusing on the next generation of power distribution.',
                },
                {
                  icon: <Cpu />,
                  title: 'Embedded',
                  desc: 'Workshops on micro-controller architecture and IoT.',
                },
                {
                  icon: <Shield />,
                  title: 'Advocacy',
                  desc: 'A voice for every student within the faculty board.',
                },
                {
                  icon: <Globe />,
                  title: 'Network',
                  desc: 'Connecting students to global internship opportunities.',
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={fader}
                  whileHover={{
                    scale: 1.02,
                    backgroundColor: 'rgba(255,255,255,0.08)',
                  }}
                  className="p-8 bg-white/5 border border-white/10 rounded-3xl transition-all"
                >
                  <div className="text-blue-500 mb-4">{item.icon}</div>
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* Footer Tag */}
            <motion.div
              variants={fader}
              className="pt-12 border-t border-white/10"
            >
              <p className="text-xs font-mono text-gray-600 uppercase tracking-widest">
                © 2026 EEE Department | Developed for Excellence
              </p>
            </motion.div>
          </div>
        </div>
      </motion.main>
    </div>
  );
};

export default PresidentPortfolio;
