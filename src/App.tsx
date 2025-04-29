import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Video, 
  Globe, 
  ChevronDown,
  Users,
  Briefcase,
  BookOpen,
  ArrowRight,
  MessageSquare,
  ExternalLink,
  Code2,
  Sparkles,
  Zap,
  LineChart,
  Lightbulb,
  Target,
  Award,
  Phone,
  Mail,
  MapPin,
  Clock,
  Shield,
  Laptop,
  Camera,
  Palette,
  Rocket,
  Heart,
  Coffee,
  CheckCircle,
  Star,
  Headphones,
  Monitor,
  Smartphone,
  Settings,
  Database,
  BookOpen as BlogIcon,
  Menu,
  X
} from 'lucide-react';
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';

const CountUp = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTimestamp;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [end, duration, isVisible]);

  return <span ref={countRef}>{count}</span>;
};

const Navigation = ({ onNavigate }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const handleClick = (e, id) => {
    if (!isHomePage) {
      e.preventDefault();
      onNavigate('/' + (id ? '#' + id : ''));
    }
  };

  return (
    <ul className="flex">
      <li>
        <a 
          href="#services" 
          onClick={(e) => handleClick(e, 'services')}
          className="inline-flex whitespace-pre p-3 text-14 text-white transition-colors duration-200 hover:text-blue-400"
        >
          Services
        </a>
      </li>
      <li>
        <a 
          href="#portfolio" 
          onClick={(e) => handleClick(e, 'portfolio')}
          className="inline-flex whitespace-pre p-3 text-14 text-white transition-colors duration-200 hover:text-blue-400"
        >
          Portfolio
        </a>
      </li>
      <li>
        <a 
          href="#process" 
          onClick={(e) => handleClick(e, 'process')}
          className="inline-flex whitespace-pre p-3 text-14 text-white transition-colors duration-200 hover:text-blue-400"
        >
          Prozess
        </a>
      </li>
      <li>
        <Link 
          to="/blog" 
          className="inline-flex whitespace-pre p-3 text-14 text-white transition-colors duration-200 hover:text-blue-400"
        >
          Blog
        </Link>
      </li>
      <li>
        <a 
          href="#contact" 
          onClick={(e) => handleClick(e, 'contact')}
          className="inline-flex whitespace-pre p-3 text-14 text-white transition-colors duration-200 hover:text-blue-400"
        >
          Kontakt
        </a>
      </li>
    </ul>
  );
};

function HomePage() {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      const scrollElements = document.querySelectorAll('[data-scroll]');
      scrollElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top <= window.innerHeight * 0.8;
        if (isVisible) {
          element.classList.add('is-visible');
        }
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const calculateParallax = (strength: number = 0.1) => {
    const moveX = (mousePosition.x - window.innerWidth / 2) * strength;
    const moveY = (mousePosition.y - window.innerHeight / 2) * strength;
    return `translate(${moveX}px, ${moveY}px)`;
  };

  return (
    <main className="overflow-x-hidden">
      <div className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80"
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ transform: calculateParallax(0.05) }}
          />
          <div className="absolute inset-0 hero-gradient">
            <div className="animated-grid"></div>
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
              <div className="absolute inset-0 mix-blend-overlay opacity-50">
                <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30"></div>
              </div>
              <div className="absolute inset-0 bg-black/50"></div>
            </div>
          </div>
        </div>

        <div className="container-ultra-narrow relative z-20">
          <div className="text-center">
            <h1 className="text-64 font-bold mb-6 animate-float lg:text-48 md:text-36 sm:text-32">
              Ihr Business ins
              <span className="text-blue-400 ml-4 animate-glow">Rampenlicht</span>
            </h1>
            <p className="text-24 text-gray-300 mb-12 max-w-2xl mx-auto lg:text-20 md:text-18">
              Wir machen Ihr Unternehmen online und visuell stark mit professionellen digitalen Lösungen.
            </p>
            <div className="flex justify-center gap-6">
              <a href="#services" className="glow-effect px-8 py-4 bg-blue-500 rounded-full text-white font-semibold hover:bg-blue-600 transition-colors duration-300 group">
                <span className="flex items-center gap-2">
                  Unsere Services
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
              <a href="#contact" className="px-8 py-4 bg-transparent border-2 border-white/20 rounded-full text-white font-semibold hover:border-white/50 transition-colors duration-300">
                Kontakt aufnehmen
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white/50" />
        </div>
      </div>

      {/* Services Section */}
      <section id="services" className="py-32 bg-[#090a0c] text-white">
        <div className="container">
          <div className="text-center mb-20" data-scroll>
            <h2 className="text-36 font-bold mb-6">Unsere Leistungen</h2>
            <p className="text-20 text-gray-400 max-w-2xl mx-auto">
              Professionelle Lösungen für Ihren digitalen Erfolg
            </p>
          </div>

          <div className="grid grid-cols-3 gap-8 md:grid-cols-1">
            {[
              {
                icon: <Camera className="w-12 h-12 text-purple-400" />,
                title: "Werbevideos",
                description: "Professionelle Videoproduktion für Ihre Marke",
                features: ["4K Qualität", "Storytelling", "Animation", "Drohnenaufnahmen", "Motion Design"],
                image: "https://images.unsplash.com/photo-1601506521793-dc748fc80b67?auto=format&fit=crop&q=80"
              },
              {
                icon: <Globe className="w-12 h-12 text-blue-400" />,
                title: "Webentwicklung",
                description: "Moderne Websites und Online-Shops",
                features: ["Responsive Design", "SEO Optimierung", "Performance", "CMS Integration", "E-Commerce"],
                image: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80"
              },
              {
                icon: <LineChart className="w-12 h-12 text-green-400" />,
                title: "Marketing",
                description: "Strategisches Marketing für mehr Reichweite",
                features: ["Social Media", "Content Strategie", "Analytics", "SEA", "Conversion Optimierung"],
                image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80"
              }
            ].map((service, index) => (
              <div 
                key={index} 
                className="card-hover group relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-sm p-8"
                data-scroll
              >
                <div className="relative z-10">
                  {service.icon}
                  <h3 className="text-24 font-bold mt-6 mb-4">{service.title}</h3>
                  <p className="text-gray-400 mb-6">{service.description}</p>
                  <ul className="space-y-3">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-16">
                        <CheckCircle className="w-5 h-5 mr-3 text-blue-400" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent group-hover:from-black/40 transition-all duration-300"></div>
              </div>
            ))}
          </div>

          {/* Additional Services */}
          <div className="mt-20 grid grid-cols-4 gap-6 md:grid-cols-2 sm:grid-cols-1" data-scroll>
            {[
              {
                icon: <Monitor className="w-8 h-8 text-pink-400" />,
                title: "UI/UX Design",
                description: "Benutzerfreundliche und ästhetische Interfaces"
              },
              {
                icon: <Smartphone className="w-8 h-8 text-yellow-400" />,
                title: "App Entwicklung",
                description: "Native und Cross-Platform Mobile Apps"
              },
              {
                icon: <Database className="w-8 h-8 text-purple-400" />,
                title: "Cloud Services",
                description: "Skalierbare Cloud-Infrastruktur"
              },
              {
                icon: <Settings className="w-8 h-8 text-green-400" />,
                title: "Wartung & Support",
                description: "Kontinuierliche Betreuung & Updates"
              }
            ].map((service, index) => (
              <div 
                key={index}
                className="card-hover p-6 rounded-xl bg-white/5 backdrop-blur-sm text-center"
                data-scroll
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-4">
                  {service.icon}
                </div>
                <h3 className="text-20 font-bold mb-2">{service.title}</h3>
                <p className="text-gray-400">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-32 bg-white text-black">
        <div className="container">
          <div className="text-center mb-20" data-scroll>
            <h2 className="text-36 font-bold mb-6">Unser Prozess</h2>
            <p className="text-20 text-gray-600 max-w-2xl mx-auto">
              Von der Idee zur erfolgreichen Umsetzung
            </p>
          </div>

          <div className="grid grid-cols-4 gap-8 md:grid-cols-2 sm:grid-cols-1">
            {[
              {
                icon: <Lightbulb className="w-12 h-12 text-yellow-400" />,
                title: "Konzeption",
                description: "Wir entwickeln gemeinsam Ihre individuelle Strategie",
                steps: ["Bedarfsanalyse", "Zieldefinition", "Strategieentwicklung"]
              },
              {
                icon: <Palette className="w-12 h-12 text-pink-400" />,
                title: "Design",
                description: "Kreation eines einzigartigen visuellen Auftritts",
                steps: ["Wireframing", "UI/UX Design", "Corporate Design"]
              },
              {
                icon: <Code2 className="w-12 h-12 text-blue-400" />,
                title: "Entwicklung",
                description: "Technische Umsetzung mit modernsten Technologien",
                steps: ["Frontend", "Backend", "Testing"]
              },
              {
                icon: <Zap className="w-12 h-12 text-green-400" />,
                title: "Launch",
                description: "Erfolgreicher Start und kontinuierliche Optimierung",
                steps: ["Deployment", "Monitoring", "Support"]
              }
            ].map((step, index) => (
              <div 
                key={index}
                className="card-hover p-8 rounded-2xl bg-gray-50 transition-all duration-300"
                data-scroll
              >
                <div className="mb-6">{step.icon}</div>
                <h3 className="text-20 font-bold mb-4">{step.title}</h3>
                <p className="text-gray-600 mb-6">{step.description}</p>
                <ul className="space-y-2">
                  {step.steps.map((s, i) => (
                    <li key={i} className="flex items-center text-gray-500">
                      <Star className="w-4 h-4 mr-2 text-blue-400" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-32 bg-[#090a0c] text-white">
        <div className="container">
          <h2 className="text-36 font-bold text-center mb-20" data-scroll>Unsere Projekte</h2>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-1">
            {[
              {
                title: "E-Commerce Platform",
                description: "Entwicklung eines modernen Online-Shops mit individuellen Features",
                image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&q=80",
                tags: ["Shopify", "UI/UX", "Mobile First", "Payment Integration"]
              },
              {
                title: "Corporate Website",
                description: "Responsive Unternehmenswebsite mit CMS-Integration",
                image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80",
                tags: ["WordPress", "SEO", "Performance", "Analytics"]
              },
              {
                title: "Mobile App",
                description: "Native iOS und Android App für Kundenservice",
                image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80",
                tags: ["React Native", "API Integration", "Push Notifications"]
              },
              {
                title: "Marketing Kampagne",
                description: "Crossmediale Marketingkampagne für Produktlaunch",
                image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80",
                tags: ["Social Media", "Content Creation", "Analytics"]
              }
            ].map((project, index) => (
              <div 
                key={index} 
                className="group relative overflow-hidden rounded-2xl aspect-video cursor-pointer"
                data-scroll
              >
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-8 flex flex-col justify-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-24 font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  <div className="flex gap-2 flex-wrap">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1 bg-white/10 rounded-full text-sm">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white text-black">
        <div className="container">
          <div className="grid grid-cols-4 gap-8 md:grid-cols-2 sm:grid-cols-1">
            {[
              { number: 100, label: "Zufriedene Kunden", icon: <Users className="w-6 h-6 text-blue-400" /> },
              { number: 250, label: "Abgeschlossene Projekte", icon: <Target className="w-6 h-6 text-purple-400" /> },
              { number: 5, label: "Jahre Erfahrung", icon: <Award className="w-6 h-6 text-green-400" /> },
              { number: "24/7", label: "Support", icon: <MessageSquare className="w-6 h-6 text-yellow-400" /> }
            ].map((stat, index) => (
              <div 
                key={index} 
                className="text-center transform hover:-translate-y-2 transition-transform duration-300"
                data-scroll
              >
                <div className="flex justify-center mb-4">{stat.icon}</div>
                <div className="text-36 font-bold mb-2">
                  {typeof stat.number === 'number' ? (
                    <><CountUp end={stat.number} />+</>
                  ) : (
                    stat.number
                  )}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <h2 className="text-32 font-bold text-center mb-16" data-scroll>Unsere Technologien</h2>
          <div className="grid grid-cols-6 gap-8 md:grid-cols-3 sm:grid-cols-2">
            {[
              { icon: <Code2 className="w-8 h-8" />, label: "React" },
              { icon: <Globe className="w-8 h-8" />, label: "Next.js" },
              { icon: <Smartphone className="w-8 h-8" />, label: "React Native" },
              { icon: <Database className="w-8 h-8" />, label: "Node.js" },
              { icon: <Settings className="w-8 h-8" />, label: "TypeScript" },
              { icon: <Laptop className="w-8 h-8" />, label: "TailwindCSS" }
            ].map((tech, index) => (
              <div 
                key={index}
                className="flex flex-col items-center p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
                data-scroll
              >
                <div className="mb-4 text-gray-600">{tech.icon}</div>
                <span className="text-gray-800 font-medium">{tech.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <footer id="contact" className="relative z-10 w-full py-32 bg-[#090a0c] text-white">
        <div className="container max-w-4xl">
          <div className="text-center mb-16" data-scroll>
            <h2 className="text-36 font-bold mb-4">Kontaktieren Sie uns</h2>
            <p className="text-gray-400">Lassen Sie uns Ihr nächstes Projekt besprechen</p>
          </div>
          <div className="grid grid-cols-3 gap-8 md:grid-cols-1">
            <div className="text-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm card-hover" data-scroll>
              <Phone className="w-8 h-8 text-blue-400 mx-auto mb-4" />
              <h3 className="text-20 font-bold mb-2">Telefon</h3>
              <p className="text-gray-400">+49 171 3573355</p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm card-hover" data-scroll>
              <Mail className="w-8 h-8 text-purple-400 mx-auto mb-4" />
              <h3 className="text-20 font-bold mb-2">E-Mail</h3>
              <a href="mailto:contact@tricon-digital.de" className="text-gray-400 hover:text-white transition-colors">
                contact@tricon-digital.de
              </a>
            </div>
            <div className="text-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm card-hover" data-scroll>
              <MapPin className="w-8 h-8 text-green-400 mx-auto mb-4" />
              <h3 className="text-20 font-bold mb-2">Adresse</h3>
              <p className="text-gray-400">Seeweg 10, 69502 Hemsbach</p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

function App() {
  const [scrollY, setScrollY] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className={`fixed left-0 right-0 top-0 z-40 h-16 transition-all duration-500 ${scrollY > 50 ? 'bg-black/80 backdrop-blur-md' : 'bg-transparent'}`}>
        <div className="container relative z-10 flex h-full items-center">
          <Link to="/" className="text-2xl font-bold text-white">
            Tricon-Digital
          </Link>
          
          <nav className="ml-[77px] md:hidden">
            <Navigation onNavigate={handleNavigate} />
          </nav>

          <div className="ml-auto flex gap-x-3.5">
            <a href="mailto:contact@tricon-digital.de" className="glow-effect relative overflow-hidden transition-all duration-200 uppercase font-bold flex items-center justify-center h-8 px-4 text-11 border border-white/20 rounded-full text-white tracking-snug hover:border-white/50 hover:bg-white hover:text-black">
              Kontakt aufnehmen
            </a>
          </div>
        </div>
      </header>

      <Routes>
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;