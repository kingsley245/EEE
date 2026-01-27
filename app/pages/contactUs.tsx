import { useState } from 'react';
import Footer from '~/components/footer';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Academic Inquiry',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log('Form Submitted:', formData);
    alert('Thank you! Your message has been sent to the Department.');
  };

  return (
    <div className="bg-white min-h-screen">
      <section className="bg-slate-900 py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Contact Our Department
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Have questions about our curriculum, research opportunities, or
            industrial collaborations? Our team is here to assist you.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-6 border-l-4 border-red-600 pl-4">
                Get in Touch
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="text-red-600 text-xl mt-1">📍</div>
                  <div>
                    <h4 className="font-bold text-slate-900">Location</h4>
                    <p className="text-gray-600 text-sm">
                      Engineering Complex, Block B<br />
                      Main Campus, University Way
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="text-red-600 text-xl mt-1">📧</div>
                  <div>
                    <h4 className="font-bold text-slate-900">Email</h4>
                    <p className="text-gray-600 text-sm">
                      electrical.dept@university.edu
                      <br />
                      hod.electrical@university.edu
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="text-red-600 text-xl mt-1">📞</div>
                  <div>
                    <h4 className="font-bold text-slate-900">Phone</h4>
                    <p className="text-gray-600 text-sm">
                      +234 (0) 123 456 7890
                      <br />
                      Ext: 405 (Admin Office)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Office Hours */}
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
              <h4 className="font-bold text-slate-900 mb-4 uppercase text-xs tracking-widest">
                Office Hours
              </h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex justify-between">
                  <span>Mon - Fri:</span> <span>8:00 AM - 4:00 PM</span>
                </li>
                <li className="flex justify-between font-bold text-red-600">
                  <span>Sat - Sun:</span> <span>Closed</span>
                </li>
              </ul>
            </div>
          </div>

          {/* The Contact Form */}
          <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  className="p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-600 outline-none transition-all"
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="Your Email"
                  className="p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-600 outline-none transition-all"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-sm font-bold text-slate-700">
                  Subject
                </label>
                <select
                  className="p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-600 outline-none transition-all bg-white"
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                >
                  <option>Academic Inquiry</option>
                  <option>Industrial Partnership</option>
                  <option>Transcript/Certificate Issues</option>
                  <option>Lab Access Request</option>
                </select>
              </div>

              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-sm font-bold text-slate-700">
                  Message
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="How can we help you?"
                  className="p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-600 outline-none transition-all"
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                ></textarea>
              </div>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full bg-red-600 text-white font-bold py-4 rounded-lg hover:bg-red-700 transition-colors shadow-lg shadow-red-200"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
