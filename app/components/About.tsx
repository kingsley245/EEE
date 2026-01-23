import { Link } from 'react-router';

export default function AboutUs() {
  const stats = [
    { label: 'Years of Excellence', value: '25+' },
    { label: 'Graduated Engineers', value: '2,500+' },
    { label: 'Research Publications', value: '150+' },
    { label: 'Lab Facilities', value: '12' },
  ];

  return (
    <div className="bg-white">
      {/* 1. Page Header */}
      <section className="relative py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Powering the Future
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            The Department of Electrical Engineering is dedicated to academic
            excellence, innovative research, and the development of professional
            engineers ready to solve global energy challenges.
          </p>
        </div>
      </section>

      {/* 2. Mission & Vision Section */}
      <section className="py-20 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-red-600 font-bold uppercase tracking-widest text-sm">
            Our Purpose
          </span>
          <h2 className="text-3xl font-bold text-slate-900 mt-2 mb-6">
            Advancing Electrical Engineering Through Innovation
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Founded with a vision to lead in technical education, our department
            provides a rigorous curriculum that blends theoretical physics with
            hands-on engineering practice. From 100-level fundamentals to
            500-level complex system designs, we prepare students for the
            evolving landscape of power, telecommunications, and automation.
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="mt-1 bg-red-100 p-2 rounded-full text-red-600">
                ✓
              </div>
              <p className="text-gray-700 font-medium">
                COREN & NUC Accredited Programs
              </p>
            </div>
            <div className="flex items-start gap-4">
              <div className="mt-1 bg-red-100 p-2 rounded-full text-red-600">
                ✓
              </div>
              <p className="text-gray-700 font-medium">
                State-of-the-art Power & Machines Labs
              </p>
            </div>
          </div>
        </div>
        <div className="relative">
          {/* Replace with your local image: src={aboutImg} */}
          <img
            src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=800"
            alt="Engineering Lab"
            className="rounded-2xl shadow-2xl w-full h-[450px] object-cover"
          />
          <div className="absolute -bottom-6 -left-6 bg-red-600 text-white p-8 rounded-xl hidden md:block">
            <p className="text-4xl font-bold">#1</p>
            <p className="text-sm uppercase font-semibold">Engineering Dept</p>
          </div>
        </div>
      </section>

      {/* 3. Statistical Impact (Grid) */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
              <div key={i} className="p-6">
                <p className="text-4xl font-black text-slate-900 mb-2">
                  {stat.value}
                </p>
                <p className="text-gray-500 font-bold uppercase text-xs tracking-widest">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Core Values Section */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900">
            Our Core Pillars
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              title: 'Academic Rigor',
              desc: 'Maintaining high standards in 100L-500L engineering coursework.',
            },
            {
              title: 'Safety First',
              desc: 'Instilling industry-standard safety protocols in every workshop session.',
            },
            {
              title: 'Technological Growth',
              desc: 'Continuous investment in IoT, Robotics, and Renewable energy labs.',
            },
          ].map((val, i) => (
            <div
              key={i}
              className="bg-white p-8 border-b-4 border-red-600 shadow-sm hover:shadow-xl transition-all"
            >
              <h3 className="text-xl font-bold mb-4">{val.title}</h3>
              <p className="text-gray-600 leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Call to Action */}
      <section className="bg-red-600 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Ready to join our engineering community?
          </h2>
          <Link
            to="/contact"
            className="bg-white text-red-600 px-8 py-3 rounded font-bold hover:bg-slate-100 transition-colors"
          >
            Work With Us
          </Link>
        </div>
      </section>
    </div>
  );
}
