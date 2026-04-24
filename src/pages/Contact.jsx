import { useState } from "react";
import { HiPhone, HiMail, HiLocationMarker } from "react-icons/hi";
import { FaGithub, FaDiscord, FaYoutube } from "react-icons/fa";
import { SiBehance } from "react-icons/si";
import { IoSend } from "react-icons/io5";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <section id="contact" className="bg-black text-white">

      {/* Hero Banner */}
      <div className="relative h-56 flex items-center px-6 md:px-16 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1400')" }}
        />
        <div className="absolute inset-0 bg-orange-500/30 backdrop-blur-[2px]" />
        <div className="relative z-10">
          <h2 className="text-4xl font-bold text-white mb-2">Reach Out to Us</h2>
          <p className="text-white/80 text-sm max-w-md">
            Need support, have a query, or looking for collaboration?<br />Let's talk!
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 md:px-16 py-16 grid md:grid-cols-2 gap-12 items-start bg-[#0d0d0d]">

        {/* Left — Contact Info */}
        <div>
          <h3 className="text-xl font-bold text-white mb-2">Contact Information</h3>
          <p className="text-gray-400 text-sm mb-8">
            Feel free to reach out through any of the channels below.
          </p>

          <div className="flex flex-col gap-4 mb-10">
            <div className="flex items-center gap-3 text-gray-300 text-sm">
              <HiPhone className="text-orange-500 text-lg shrink-0" />
              +212 782-448118
            </div>
            <div className="flex items-center gap-3 text-gray-300 text-sm">
              <HiMail className="text-orange-500 text-lg shrink-0" />
              enneiymyhamza06@gmail.com
            </div>
            <div className="flex items-center gap-3 text-gray-300 text-sm">
              <HiLocationMarker className="text-orange-500 text-lg shrink-0" />
              Casablanca, Morocco
            </div>
          </div>

          {/* Social Icons */}
       <div className="flex gap-3">
  {[
    { icon: <FaGithub />, href: "#", color: "hover:bg-gray-700" },
    { icon: <FaDiscord />, href: "#", color: "hover:bg-indigo-600" },
    { icon: <SiBehance />, href: "#", color: "hover:bg-blue-600" },
    { icon: <FaYoutube />, href: "#", color: "hover:bg-red-600" },
  ].map((s, i) => (
    <a
      key={i}
      href={s.href}
      className={`w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white text-lg transition-all duration-200 ${s.color} hover:scale-110`}
    >
      {s.icon}
    </a>
  ))}
</div>
        </div>

         <div className="bg-[#161616] border border-white/10 rounded-2xl p-8">
          <div className="flex flex-col gap-5">

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-gray-400 font-medium">Your Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Hamza Enneiymy"
                  className="bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-gray-400 font-medium">Your Email</label>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="hamza@email.com"
                  className="bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-gray-400 font-medium">Subject</label>
              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Project collaboration..."
                className="bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-gray-400 font-medium">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                placeholder="Type your message here..."
                className="bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-orange-500 transition-colors resize-none"
              />
            </div>

            <button
              onClick={handleSubmit}
              className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-semibold text-sm py-3 rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-500/40"
            >
              Send Message
              <IoSend />
            </button>

          </div>
        </div>
      </div>
    </section>
  );
}