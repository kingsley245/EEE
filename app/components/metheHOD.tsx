import { motion } from 'framer-motion';
import HOD from '../Assets/HOD.png';

export default function MeetTheHOD() {
  return (
    <section className="relative bg-slate-50 overflow-hidden py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 1. IMAGE SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative group"
          >
            {/* Decorative Background Element */}
            <div className="absolute -inset-4 bg-blue-600/10 rounded-2xl -rotate-3 group-hover:rotate-0 transition-transform duration-500" />

            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 md:border-8 border-white">
              <img
                src={HOD}
                alt="Head of Department"
                className="w-full h-72 sm:h-96 md:h-125 object-cover object-top scale-105 group-hover:scale-100 transition-transform duration-700"
              />
              {/* Overlay Label */}
              <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-blue-900/90 to-transparent p-4 md:p-8">
                <p className="text-white/80 text-[10px] md:text-sm font-bold tracking-widest uppercase">
                  Departmental Leadership
                </p>
                <h3 className="text-white text-lg md:text-2xl font-black">
                  Prof. Dr. Chen Kwesi
                </h3>
              </div>
            </div>
          </motion.div>

          {/* 2. TEXT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
              Welcome Address
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
              Pioneering the Future of{' '}
              <span className="text-blue-600">Electrical Excellence.</span>
            </h2>

            <blockquote className="border-l-4 border-blue-600 pl-6 italic text-xl text-slate-700 font-medium">
              "Our vision is to engineer a sustainable tomorrow through
              innovation, academic rigor, and the relentless pursuit of
              technical mastery."
            </blockquote>

            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                Welcome to the Department of Electrical and Electronic
                Engineering. As we navigate the complexities of the 21st
                century, our focus remains on equipping our students with the
                skills required to solve global energy and automation
                challenges.
              </p>
              <p>
                Under my leadership, we have integrated advanced research into
                our curriculum, ensuring that every NDU EEE graduate is not just
                a student, but a future-ready engineer.
              </p>
            </div>

            <div className="pt-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                CK
              </div>
              <div>
                <p className="font-bold text-slate-900">Prof. Dr. Chen Kwesi</p>
                <p className="text-sm text-slate-500">
                  HOD, Electrical & Electronic Engineering
                </p>
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-4">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  alert('stilll in development');
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:shadow-blue-500/30 transition-all flex items-center gap-2 group"
              >
                View HOD's Publications
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
