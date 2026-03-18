import { useState, useEffect, useRef } from "react";
import profilePhoto from "@assets/WhatsApp_Image_2026-03-18_at_1.21.05_AM_1773776770657.jpeg";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  Menu, X, Download, Mail, Phone, MapPin, ExternalLink,
  ChevronDown, Wrench, Cog, Shield, Users, Lightbulb,
  Zap, Award, Briefcase, Code, Settings, CheckCircle2,
  Star, Building2, GraduationCap, Send, ClipboardCheck,
  AlertTriangle, Lock, Factory, Globe, BookOpen
} from "lucide-react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

const skills = [
  {
    icon: ClipboardCheck,
    title: "Permit to Work (PTW) System",
    desc: "Administer and supervise PTW systems ensuring compliance with safety policies, PSSP, and SOPs to mitigate operational risks.",
    level: 95,
  },
  {
    icon: AlertTriangle,
    title: "Job Safety Analysis (JSA)",
    desc: "Conduct site inspections, hazard identification, and JSA development to ensure all work is carried out safely and efficiently.",
    level: 93,
  },
  {
    icon: Lock,
    title: "LOTO & Isolation Procedures",
    desc: "Expert in Lockout/Tagout, isolation protocols, confined space entry, working at height, and hot work safety procedures.",
    level: 92,
  },
  {
    icon: Factory,
    title: "FMCG Production & Process Control",
    desc: "Biscuit & bakery manufacturing, batch mixing, oven operating, packaging machine knowledge, and GMP compliance.",
    level: 90,
  },
  {
    icon: Shield,
    title: "HSE Compliance",
    desc: "Strict adherence to ADNOC-approved procedures, HSE standards, and regulatory requirements across industrial operations.",
    level: 96,
  },
  {
    icon: Cog,
    title: "Equipment & Machinery",
    desc: "Equipment calibration, changeover procedures, packaging machine operation, and preventive maintenance scheduling.",
    level: 88,
  },
];

const experiences = [
  {
    company: "Jupiter Electromechanical Contracting LLC",
    role: "Job Performer Mechanical (ADNOC Approved)",
    location: "Abu Dhabi, UAE",
    period: "August 2025 – Present",
    type: "Current",
    ctId: "CT ID: CT90034457",
    responsibilities: [
      "Perform Job Performer duties in compliance with ADNOC-approved procedures, safety standards, and PTW (Permit to Work) requirements.",
      "Use tools, equipment, and PPE correctly and report unsafe conditions or acts immediately.",
      "Conduct site inspections, hazard identification, and Job Safety Analysis (JSA) to ensure all work is carried out safely and efficiently.",
      "Ensure proper implementation of HSE rules, including Isolation & Lockout/Tagout (LOTO), confined space entry, working at height, hot work, and critical work activities.",
      "Maintain effective communication with multidisciplinary teams to ensure smooth workflow and safe execution of tasks.",
      "Monitor worksite conditions, identify risks, and ensure corrective actions are taken immediately.",
    ],
  },
  {
    company: "Descon Engineering (ADNOC Group)",
    role: "PTW Coordinator (Job Performer)",
    location: "Abu Dhabi, UAE",
    period: "March 2025 – August 2025",
    type: "Previous",
    ctId: "CT ID: CT90028285",
    responsibilities: [
      "Administer and supervise the Permit to Work system ensuring compliance with safety policies, PSSP, and SOPs to mitigate operational risks.",
      "Lead coordination of daily PTW planning meetings to align construction activities with safety standards.",
      "Conduct audits and inspections to ensure adherence to Lock Out/Tag Out protocols.",
      "Generate and analyze PTW performance metrics to identify process enhancements and improve permit issuance efficiency.",
      "Facilitate communication between construction teams and HSE departments, ensuring comprehensive record keeping and incident reporting.",
    ],
  },
  {
    company: "Sara Food Industries Pvt. Ltd. (Sasna Group)",
    role: "Sr. Production Officer",
    location: "Dhunebesi-07, Dhading, Nepal",
    period: "January 2023 – March 2025",
    type: "Previous",
    ctId: null,
    responsibilities: [
      "Directed quality control processes across raw material inspection to final packaging, ensuring product consistency and compliance with GMP and ISO standards.",
      "Spearheaded HACCP implementation, identifying critical control points and instituting preventive measures.",
      "Optimized machine uptime through effective maintenance scheduling, coordination with technical teams, and vendor management for timely procurement.",
      "Conducted comprehensive consumption analyses to minimize raw material wastage and enhance production cost-efficiency.",
      "Developed and delivered targeted training programs on safety protocols, hygiene standards, and operational best practices for production staff.",
    ],
  },
  {
    company: "Himandri Foods Pvt. Ltd. (Pran Group)",
    role: "Production Officer",
    location: "Jeetpur, Nepal",
    period: "March 2022 – December 2022",
    type: "Previous",
    ctId: null,
    responsibilities: [
      "Managed production scheduling and workflow optimization in a fast-paced chocolate manufacturing environment.",
      "Maintained rigorous documentation and performance tracking for raw materials and finished goods.",
      "Collaborated with maintenance to implement preventive maintenance plans, reducing downtime in packaging and processing lines.",
      "Provided leadership training to supervisors, enhancing team productivity and process adherence.",
    ],
  },
  {
    company: "Britannia Nepal Pvt. Ltd.",
    role: "Production Supervisor",
    location: "Birgunj, Nepal",
    period: "June 2020 – February 2022",
    type: "Previous",
    ctId: null,
    responsibilities: [
      "Oversaw production operations, ensuring adherence to manufacturing standards and timely delivery schedules.",
      "Analyzed raw material consumption trends and coordinated with procurement to align stock levels.",
      "Validated formulations, chemical use, and processing parameters to maintain product quality and safety.",
      "Led continuous improvement initiatives including root cause analysis and corrective action plans to resolve operational deviations.",
      "Facilitated cross-functional communication among production, quality, and engineering teams to troubleshoot machinery and optimize workflows.",
      "Ensured proper staging and batching of concentrate, responsible for correct sequence of mixing as per Britannia documents.",
    ],
  },
];

const certifications = [
  {
    title: "Work Management System",
    issuer: "Descon Engineering Ltd.",
    date: "April 2025",
  },
  {
    title: "Work at Height and Rescue",
    issuer: "Descon Engineering Ltd.",
    date: "April 2025",
  },
  {
    title: "Electrical Safety",
    issuer: "Britannia Nepal Pvt. Ltd.",
    date: "June 2021",
  },
  {
    title: "Working at Height",
    issuer: "Britannia Nepal Pvt. Ltd.",
    date: "June 2021",
  },
  {
    title: "Time Management",
    issuer: "Britannia Nepal Pvt. Ltd.",
    date: "July 2021",
  },
];

function AnimatedSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SkillBar({ level, label }: { level: number; label: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <div ref={ref} className="w-full">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-medium text-card-foreground">{label}</span>
        <span className="text-sm font-semibold text-primary">{level}%</span>
      </div>
      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
        />
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = ["about", "skills", "experience", "certifications", "contact"];
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(section);
          return;
        }
      }
      setActiveSection("home");
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({ title: "Please fill in all fields", variant: "destructive" });
      return;
    }
    setSending(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSending(false);
    setFormData({ name: "", email: "", message: "" });
    toast({
      title: "Message sent successfully!",
      description: "Thank you for reaching out. Saroj will get back to you soon.",
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── NAVBAR ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-card/95 backdrop-blur-md border-b border-border shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a
              href="#"
              className="text-lg font-bold tracking-tight flex items-center gap-2"
              data-testid="link-logo"
            >
              <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
                SJ
              </div>
              <span className={scrolled ? "text-foreground" : "text-white"}>
                Saroj Jaiswal
              </span>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  data-testid={`link-nav-${item.label.toLowerCase()}`}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeSection === item.href.slice(1)
                      ? "text-primary bg-primary/10"
                      : scrolled
                      ? "text-muted-foreground hover:text-foreground"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {item.label}
                </a>
              ))}
              <Button size="sm" className="ml-2" asChild data-testid="button-nav-cv">
                <a href="#" download>
                  <Download className="w-3.5 h-3.5 mr-1.5" />
                  Download CV
                </a>
              </Button>
            </nav>

            {/* Mobile toggle */}
            <button
              className={`md:hidden p-2 rounded-md transition-colors ${
                scrolled ? "text-foreground" : "text-white"
              }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-card border-b border-border overflow-hidden"
            >
              <div className="px-4 py-3 space-y-1">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    data-testid={`link-mobile-${item.label.toLowerCase()}`}
                    className="block px-3 py-2.5 rounded-md text-sm font-medium text-foreground hover:bg-muted transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
                <div className="pt-2 pb-1">
                  <Button size="sm" className="w-full" asChild data-testid="button-mobile-cv">
                    <a href="#" download>
                      <Download className="w-3.5 h-3.5 mr-1.5" />
                      Download CV
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── HERO ── */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(215,60%,10%)] via-[hsl(215,55%,15%)] to-[hsl(210,70%,22%)]" />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-primary/20 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-accent/15 blur-[80px]" />

        <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto pt-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <div className="w-28 h-28 rounded-full mx-auto shadow-xl border-4 border-white/20 overflow-hidden">
              <img
                src={profilePhoto}
                alt="Saroj Jaiswal"
                className="w-full h-full object-cover object-top"
                data-testid="img-profile-photo"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <Badge
              className="mb-4 text-xs px-3 py-1 bg-primary/20 text-primary-foreground border-primary/30 border"
              data-testid="badge-profession"
            >
              <Briefcase className="w-3 h-3 mr-1.5 inline" />
              Job Performer Mechanical (ADNOC Approved) · Abu Dhabi, UAE
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight tracking-tight"
            data-testid="text-hero-name"
          >
            Saroj Jaiswal
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-lg sm:text-xl text-white/70 mb-8 max-w-2xl mx-auto leading-relaxed"
            data-testid="text-hero-tagline"
          >
            Technically skilled professional with ADNOC experience, specializing in PTW coordination,
            JSA development, hazard identification, LOTO application, and HSE compliance
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap"
          >
            <Button size="lg" asChild data-testid="button-hero-contact">
              <a href="#contact">
                <Mail className="w-4 h-4 mr-2" />
                Contact Me
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white bg-white/10 backdrop-blur-sm"
              asChild
              data-testid="button-hero-cv"
            >
              <a href="#" download>
                <Download className="w-4 h-4 mr-2" />
                Download CV
              </a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-16 flex justify-center gap-8 flex-wrap"
          >
            {[
              { value: "5+", label: "Years Experience" },
              { value: "2+", label: "Countries Worked" },
              { value: "5", label: "Companies Worked" },
            ].map((stat) => (
              <div key={stat.label} className="text-center" data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}>
                <div className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-xs sm:text-sm text-white/55 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 flex flex-col items-center gap-1"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <Badge className="mb-3" data-testid="badge-about">About Me</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-2">Who I Am</h2>
              <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
                A dedicated professional with ADNOC-approved experience in safety, operations, and production
              </p>
            </div>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <AnimatedSection>
              <div className="space-y-5">
                <p className="text-foreground leading-relaxed text-base sm:text-lg" data-testid="text-about-intro">
                  I am <strong>Saroj Jaiswal</strong>, a technically skilled Job Performer Mechanical
                  with ADNOC experience, currently employed at{" "}
                  <strong>Jupiter Electromechanical Contracting LLC</strong> in Abu Dhabi, UAE.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  I specialize in PTW coordination, JSA development, hazard identification, LOTO
                  application, and HSE compliance. I hold a strong background in FMCG processing
                  operations with proven capability in system monitoring, process control, and
                  maintaining safe, efficient work environments.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  I hold a <strong className="text-foreground">Diploma in Mechanical Engineering</strong> from
                  Birgunj Institute of Technology (CTEVT, 2016–2019) and bring a practical,
                  safety-first approach to every project.
                </p>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  {[
                    { icon: MapPin, label: "Work Location", value: "Abu Dhabi, UAE" },
                    { icon: MapPin, label: "Perm. Address", value: "Nijgadh, Nepal" },
                    { icon: GraduationCap, label: "Education", value: "Diploma in Mech. Eng." },
                    { icon: Building2, label: "Current", value: "Jupiter Electromechanical" },
                    { icon: Award, label: "Nationality", value: "Nepalese" },
                    { icon: Users, label: "Languages", value: "English, Nepali, Hindi, Bhojpuri" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-start gap-3"
                      data-testid={`info-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <item.icon className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                          {item.label}
                        </div>
                        <div className="text-sm font-semibold text-foreground mt-0.5">{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <Button asChild data-testid="button-about-contact">
                    <a href="#contact">
                      <Send className="w-4 h-4 mr-2" />
                      Get in Touch
                    </a>
                  </Button>
                  <Button variant="outline" asChild data-testid="button-about-cv">
                    <a href="#">
                      <Download className="w-4 h-4 mr-2" />
                      Download CV
                    </a>
                  </Button>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="space-y-4">
                <h3 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-primary" />
                  Key Professional Highlights
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { icon: ClipboardCheck, label: "ADNOC Approved", desc: "Certified Job Performer with two active ADNOC CT IDs" },
                    { icon: Shield, label: "HSE & PTW Expert", desc: "PTW coordination, JSA, LOTO, confined space & hot work safety" },
                    { icon: Factory, label: "FMCG Production", desc: "GMP, HACCP, ISO compliance in biscuit, bakery & chocolate manufacturing" },
                    { icon: Globe, label: "Multinational Exp.", desc: "Worked across UAE and Nepal in multinational organizations" },
                  ].map((card) => (
                    <Card
                      key={card.label}
                      className="hover-elevate transition-all duration-300"
                      data-testid={`card-about-${card.label.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      <CardContent className="p-4 flex items-start gap-3">
                        <div className="w-9 h-9 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                          <card.icon className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-card-foreground">{card.label}</div>
                          <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{card.desc}</div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Education Card */}
                <Card data-testid="card-education">
                  <CardContent className="p-5">
                    <h4 className="font-bold text-sm text-card-foreground mb-3 flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-primary" />
                      Education
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <div className="font-semibold text-sm text-card-foreground">Diploma in Mechanical Engineering</div>
                        <div className="text-xs text-muted-foreground">Birgunj Institute of Technology, CTEVT</div>
                        <div className="text-xs text-muted-foreground">2016 – 2019</div>
                      </div>
                      <div className="border-t border-card-border pt-3">
                        <div className="font-semibold text-sm text-card-foreground">School Leaving Certificate (SLC)</div>
                        <div className="text-xs text-muted-foreground">Holy Angels' Secondary Boarding School</div>
                        <div className="text-xs text-muted-foreground">Government of Nepal</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="py-24 bg-card border-y border-card-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <Badge className="mb-3" data-testid="badge-skills">Core Competencies</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-card-foreground mt-2">
                Skills & Expertise
              </h2>
              <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
                A combination of safety, operational, and technical skills built through ADNOC-approved and multinational experience
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
            {skills.map((skill, i) => (
              <AnimatedSection key={skill.title}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Card
                    className="h-full hover-elevate transition-all duration-300"
                    data-testid={`card-skill-${i}`}
                  >
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                        <skill.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-bold text-card-foreground mb-2 text-sm leading-snug">{skill.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{skill.desc}</p>
                      <SkillBar level={skill.level} label="Proficiency" />
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection>
            <Card data-testid="card-technical-tools">
              <CardContent className="p-6">
                <h3 className="font-bold text-card-foreground mb-4 flex items-center gap-2">
                  <Code className="w-4 h-4 text-primary" />
                  Technical Skills & Tools
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Permit to Work (PTW)", "Job Safety Analysis (JSA)", "LOTO / Isolation",
                    "Confined Space Entry", "Working at Height", "Hot Work Safety",
                    "GMP & HACCP", "ISO Standards", "MS Office Suite",
                    "Production Management Software", "Data Analysis & Reporting",
                    "Equipment Calibration", "Changeover Procedures",
                    "Batch Mixing", "Packaging Machines", "Oven Operations",
                    "ADNOC Procedures", "HSE Compliance", "PPE Usage"
                  ].map((tool) => (
                    <Badge
                      key={tool}
                      variant="secondary"
                      className="text-xs"
                      data-testid={`badge-tool-${tool.toLowerCase().replace(/[\s/&()]+/g, '-')}`}
                    >
                      {tool}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience" className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <Badge className="mb-3" data-testid="badge-experience">Work History</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-2">
                Career Experience
              </h2>
              <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
                Over 5 years of progressive experience across safety-critical and manufacturing environments
              </p>
            </div>
          </AnimatedSection>

          <div className="relative">
            <div className="hidden md:block absolute left-6 top-0 bottom-0 w-px bg-border" />

            <div className="space-y-8">
              {experiences.map((exp, i) => (
                <AnimatedSection key={exp.company}>
                  <div className="md:pl-16 relative">
                    <div
                      className={`hidden md:flex absolute left-3 top-6 w-7 h-7 rounded-full border-2 items-center justify-center ${
                        exp.type === "Current"
                          ? "bg-primary border-primary"
                          : "bg-card border-border"
                      }`}
                    >
                      <div className={`w-2.5 h-2.5 rounded-full ${exp.type === "Current" ? "bg-white" : "bg-muted-foreground"}`} />
                    </div>

                    <Card
                      className="hover-elevate transition-all duration-300"
                      data-testid={`card-exp-${i}`}
                    >
                      <CardContent className="p-6 sm:p-8">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
                          <div>
                            <div className="flex items-center gap-2 flex-wrap mb-1.5">
                              {exp.type === "Current" && (
                                <Badge className="text-xs" data-testid="badge-current">Current Position</Badge>
                              )}
                              {exp.ctId && (
                                <Badge variant="outline" className="text-xs font-mono">
                                  {exp.ctId}
                                </Badge>
                              )}
                            </div>
                            <h3
                              className="text-lg font-bold text-card-foreground"
                              data-testid={`text-exp-role-${i}`}
                            >
                              {exp.role}
                            </h3>
                            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                              <span className="font-semibold text-primary text-sm" data-testid={`text-exp-company-${i}`}>
                                {exp.company}
                              </span>
                              <span className="text-muted-foreground text-xs">·</span>
                              <span className="text-muted-foreground text-sm flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {exp.location}
                              </span>
                            </div>
                          </div>
                          <div className="shrink-0">
                            <Badge variant="outline" className="text-xs whitespace-nowrap">
                              {exp.period}
                            </Badge>
                          </div>
                        </div>

                        <ul className="space-y-2.5">
                          {exp.responsibilities.map((item, j) => (
                            <li key={j} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                              <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CERTIFICATIONS ── */}
      <section id="certifications" className="py-24 bg-card border-y border-card-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <Badge className="mb-3" data-testid="badge-certifications">Credentials</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-card-foreground mt-2">
                Certifications & Trainings
              </h2>
              <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
                Professional certifications and training programs completed throughout my career
              </p>
            </div>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {certifications.map((cert, i) => (
              <AnimatedSection key={cert.title}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Card
                    className="hover-elevate transition-all duration-300 h-full"
                    data-testid={`card-cert-${i}`}
                  >
                    <CardContent className="p-5 flex items-start gap-4 h-full">
                      <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                        <Award className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-bold text-sm text-card-foreground leading-snug" data-testid={`text-cert-title-${i}`}>
                          {cert.title}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">{cert.issuer}</div>
                        <Badge variant="secondary" className="text-xs mt-2">
                          {cert.date}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <Badge className="mb-3" data-testid="badge-contact">Get In Touch</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-2">Contact Me</h2>
              <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
                Have a project or opportunity? I'd love to hear from you.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid lg:grid-cols-5 gap-10">
            <AnimatedSection className="lg:col-span-2">
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-foreground mb-5">Contact Information</h3>

                {[
                  {
                    icon: Mail,
                    label: "Email",
                    value: "jaiswalsarojj821@gmail.com",
                    href: "mailto:jaiswalsarojj821@gmail.com",
                    testid: "link-email",
                  },
                  {
                    icon: MapPin,
                    label: "Work Location",
                    value: "Abu Dhabi, UAE",
                    href: null,
                    testid: "text-location-uae",
                  },
                  {
                    icon: MapPin,
                    label: "Permanent Address",
                    value: "Nijgadh, Nepal",
                    href: null,
                    testid: "text-location-nepal",
                  },
                ].map((contact) => (
                  <Card
                    key={contact.label}
                    className="hover-elevate transition-all duration-300"
                    data-testid={`card-contact-${contact.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="w-9 h-9 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                        <contact.icon className="w-4 h-4 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                          {contact.label}
                        </div>
                        {contact.href ? (
                          <a
                            href={contact.href}
                            className="text-sm font-semibold text-foreground hover:text-primary transition-colors truncate block"
                            data-testid={contact.testid}
                          >
                            {contact.value}
                          </a>
                        ) : (
                          <span className="text-sm font-semibold text-foreground" data-testid={contact.testid}>
                            {contact.value}
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <Card data-testid="card-availability">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-sm font-semibold text-foreground">Open to Opportunities</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Actively seeking roles in mechanical engineering, HSE, PTW coordination, and industrial operations.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </AnimatedSection>

            <AnimatedSection className="lg:col-span-3">
              <Card data-testid="card-contact-form">
                <CardContent className="p-6 sm:p-8">
                  <h3 className="text-lg font-bold text-card-foreground mb-6">Send a Message</h3>
                  <form onSubmit={handleContactSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="contact-name">Your Name</Label>
                        <Input
                          id="contact-name"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          data-testid="input-contact-name"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="contact-email">Email Address</Label>
                        <Input
                          id="contact-email"
                          type="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          data-testid="input-contact-email"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="contact-message">Message</Label>
                      <Textarea
                        id="contact-message"
                        placeholder="Tell me about your project or opportunity..."
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        data-testid="input-contact-message"
                        className="resize-none"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={sending}
                      data-testid="button-contact-submit"
                    >
                      {sending ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                            className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full mr-2"
                          />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[hsl(215,55%,10%)] border-t border-white/5 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-md bg-primary flex items-center justify-center text-white font-bold text-sm">
                SJ
              </div>
              <div>
                <div className="font-bold text-white text-sm" data-testid="text-footer-name">
                  Saroj Jaiswal
                </div>
                <div className="text-white/50 text-xs">Job Performer Mechanical (ADNOC Approved) · Abu Dhabi, UAE</div>
              </div>
            </div>

            <nav className="flex flex-wrap items-center justify-center gap-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm text-white/50 hover:text-white transition-colors"
                  data-testid={`link-footer-${item.label.toLowerCase()}`}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <Button
              size="sm"
              variant="outline"
              className="border-white/20 text-white/70 bg-transparent"
              asChild
              data-testid="button-footer-cv"
            >
              <a href="#" download>
                <Download className="w-3.5 h-3.5 mr-1.5" />
                Download CV
              </a>
            </Button>
          </div>

          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-white/35 text-sm" data-testid="text-footer-copyright">
              &copy; {new Date().getFullYear()} Saroj Jaiswal. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
