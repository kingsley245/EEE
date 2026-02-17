// import { motion } from 'framer-motion';
// import { GraduationCap, Users, ShieldCheck, ArrowRight } from 'lucide-react';
// import { Link } from 'react-router';

// const roles = [
//   {
//     title: 'For Students',
//     desc: 'Access real-time lecture notes, download past questions, and track your departmental progress in one secure dashboard.',
//     icon: <GraduationCap size={32} className="text-blue-600" />,
//     color: 'bg-blue-50',
//     link: '/register',
//   },
//   {
//     title: 'For Lecturers',
//     desc: 'Efficiently upload course materials, manage student attendance, and share important research updates directly with your classes.',
//     icon: <Users size={32} className="text-red-600" />,
//     color: 'bg-red-50',
//     link: '/contact',
//   },
//   {
//     title: 'For Leaders',
//     desc: 'Official tools for Class Reps and Executives to coordinate events, broadcast announcements, and manage departmental affairs.',
//     icon: <ShieldCheck size={32} className="text-yellow-600" />,
//     color: 'bg-yellow-50',
//     link: '/about',
//   },
// ];

// export default function Features() {
//   return (
//     <section className="py-24 bg-white relative">
//       <div className="max-w-7xl mx-auto px-6">
//         {/* Section Header */}
//         <div className="text-center mb-16">
//           <h2 className="text-xs font-black uppercase tracking-[0.3em] text-blue-600 mb-4">
//             Unified Ecosystem
//           </h2>
//           <h3 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
//             Tailored Experience for <br /> Every Member.
//           </h3>
//         </div>

//         {/* Cards Grid */}
//         <div className="grid md:grid-cols-3 gap-8">
//           {roles.map((role, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: index * 0.2 }}
//               className="group p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500"
//             >
//               {/* Icon Box */}
//               <div
//                 className={`w-16 h-16 ${role.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}
//               >
//                 {role.icon}
//               </div>

//               <h4 className="text-2xl font-black text-slate-900 mb-4">
//                 {role.title}
//               </h4>
//               <p className="text-slate-500 leading-relaxed mb-8 text-sm">
//                 {role.desc}
//               </p>

//               <Link
//                 to="/register"
//                 className="flex items-center gap-2 font-bold text-xs uppercase tracking-widest text-slate-900 group-hover:text-blue-600 transition-colors"
//               >
//                 Learn More{' '}
//                 <ArrowRight
//                   size={16}
//                   className="group-hover:translate-x-1 transition-transform"
//                 />
//               </Link>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
