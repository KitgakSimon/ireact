import Image from "next/image";
import { Linkedin, Facebook, Instagram, Mail } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  socials?: {
    linkedin?: string;
    facebook?: string;
    instagram?: string;
    email?: string;
  };
}

const team: TeamMember[] = [
  {
    name: "Kitgak Simon",
    role: "Chief Executive Officer",
    bio: "A visionary youth leader and climate advocate dedicated to empowering rural communities through innovative technology and grassroots leadership.",
    image: "/images/gallery/IMG_2006.JPG",
    socials: {
      linkedin: "#",
      facebook: "#",
      instagram: "#",
      email: "simon@ireact.org"
    }
  },
  {
    name: "Adamu Elisha Inuwa",
    role: "Administrative Officer",
    bio: "Passionate about sustainable development and operational excellence, ensuring the efficient management of IREACT initiatives and community programs.",
    image: "/images/gallery/IMG_2007.JPG",
    socials: {
      linkedin: "#",
      email: "adamu@ireact.org"
    }
  }
];

export default function TeamSection() {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Background purely decorative accents */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 h-96 w-96 rounded-full bg-brand-cyan/5 blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 h-96 w-96 rounded-full bg-brand-forest/5 blur-3xl opacity-50"></div>
      
      <div className="mx-auto max-w-7xl relative z-10 px-6 sm:px-12">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-brand-cyan">Our Leadership</h2>
          <h3 className="text-4xl font-extrabold text-slate-900 md:text-6xl mb-6 tracking-tight">The Minds Behind <span className="header-highlight highlight-yellow text-slate-900">IREACT</span></h3>
          <p className="text-xl text-slate-600 font-medium leading-relaxed">Meet the dedicated team driving sustainable change and climate resilience across underserved communities.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 max-w-5xl mx-auto">
          {team.map((member, idx) => (
            <div 
              key={idx} 
              className="group relative flex flex-col sm:flex-row items-start gap-8 bg-slate-50/50 p-8 rounded-[3rem] border border-slate-200 transition-all duration-500 hover:shadow-2xl hover:bg-white hover:-translate-y-2"
            >
              <div className="relative shrink-0 h-44 w-44 rounded-3xl overflow-hidden shadow-xl group-hover:rotate-3 transition-transform duration-500">
                <Image 
                  src={member.image} 
                  alt={member.name} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              <div className="flex flex-col text-center sm:text-left">
                <h4 className="text-2xl font-black text-slate-900 mb-1">{member.name}</h4>
                <p className="text-sm font-bold uppercase tracking-widest text-brand-forest mb-4">{member.role}</p>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 font-medium">
                  {member.bio}
                </p>

                <div className="flex items-center justify-center sm:justify-start gap-4">
                  {member.socials?.linkedin && (
                    <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="h-10 w-10 flex items-center justify-center bg-white text-slate-400 hover:text-[#0a66c2] hover:shadow-md transition-all rounded-xl border border-slate-100">
                      <Linkedin size={18} />
                    </a>
                  )}
                  {member.socials?.instagram && (
                    <a href={member.socials.instagram} target="_blank" rel="noopener noreferrer" className="h-10 w-10 flex items-center justify-center bg-white text-slate-400 hover:text-[#e4405f] hover:shadow-md transition-all rounded-xl border border-slate-100">
                      <Instagram size={18} />
                    </a>
                  )}
                  {member.socials?.facebook && (
                    <a href={member.socials.facebook} target="_blank" rel="noopener noreferrer" className="h-10 w-10 flex items-center justify-center bg-white text-slate-400 hover:text-[#1877f2] hover:shadow-md transition-all rounded-xl border border-slate-100">
                      <Facebook size={18} />
                    </a>
                  )}
                  {member.socials?.email && (
                    <a href={`mailto:${member.socials.email}`} className="h-10 w-10 flex items-center justify-center bg-white text-slate-400 hover:text-brand-forest hover:shadow-md transition-all rounded-xl border border-slate-100">
                      <Mail size={18} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
