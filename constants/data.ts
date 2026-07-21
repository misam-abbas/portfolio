import type {
  Certificate,
  ExperienceItem,
  NavLink,
  OrbitTech,
  Project,
  Service,
  Skill,
  SocialLink,
} from "@/types";

export const SITE = {
  name: "Misam Abbas",
  title: "Misam Abbas — Vibe Coder & Web Developer",
  description:
    "Vibe coder and web developer building clean, responsive interfaces and full stack projects with Next.js, Laravel, and modern web tooling.",
  role: "Vibe Coder & Web Developer",
  location: "Sukkur, Pakistan",
  email: "misamabb2@gmail.com",
  availability: "Available for freelance & collaborative projects",
};

export const ROLES = [
  "Vibe Coder",
  "Web Developer",
  "Webflow Designer",
  "Problem Solver",
];

export const NAV_LINKS: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Blog", href: "/standard/blog" },
  { label: "Contact", href: "#contact" },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/misam-abbas", icon: "github" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/misam-abbas-714199397",
    icon: "linkedin",
  },
  { label: "Email", href: "mailto:misamabb2@gmail.com", icon: "mail" },
];

// NOTE: proficiency level / years / project count below are placeholder
// estimates since real numbers weren't provided — adjust these to be
// accurate before publishing. The skill *names* and categories reflect
// your actual stack.
export const SKILLS: Skill[] = [
  { name: "HTML5", category: "frontend", level: 92, years: 2, projects: 6, icon: "html5" },
  { name: "CSS3", category: "frontend", level: 90, years: 2, projects: 6, icon: "css3" },
  { name: "JavaScript", category: "frontend", level: 85, years: 2, projects: 5, icon: "javascript" },
  { name: "TypeScript", category: "frontend", level: 75, years: 1, projects: 2, icon: "typescript" },
  { name: "Bootstrap", category: "frontend", level: 85, years: 2, projects: 4, icon: "bootstrap" },
  { name: "Next.js", category: "frontend", level: 78, years: 1, projects: 2, icon: "nextjs" },
  { name: "Tailwind CSS", category: "frontend", level: 80, years: 1, projects: 2, icon: "tailwind" },
  { name: "Webflow", category: "frontend", level: 82, years: 1, projects: 2, icon: "webflow" },
  { name: "Responsive UI", category: "frontend", level: 88, years: 2, projects: 6, icon: "responsive" },
  { name: "Laravel", category: "backend", level: 78, years: 1, projects: 2, icon: "laravel" },
  { name: "PHP", category: "backend", level: 78, years: 1, projects: 2, icon: "php" },
  { name: "REST APIs", category: "backend", level: 75, years: 1, projects: 3, icon: "api" },
  { name: "Authentication", category: "backend", level: 72, years: 1, projects: 2, icon: "auth" },
  { name: "CRUD Operations", category: "backend", level: 82, years: 1, projects: 3, icon: "crud" },
  { name: "MySQL", category: "database", level: 78, years: 1, projects: 3, icon: "mysql" },
  { name: "PostgreSQL", category: "database", level: 70, years: 1, projects: 1, icon: "postgresql" },
  { name: "Supabase", category: "database", level: 72, years: 1, projects: 1, icon: "supabase" },
  { name: "Git", category: "tools", level: 80, years: 2, projects: 6, icon: "git" },
];

export const ORBIT_TECH: OrbitTech[] = [
  { name: "Next.js", icon: "nextjs", color: "#FFFFFF", description: "The React framework for production", href: "https://nextjs.org" },
  { name: "TypeScript", icon: "typescript", color: "#3B82F6", description: "Typed superset of JavaScript", href: "https://www.typescriptlang.org" },
  { name: "JavaScript", icon: "javascript", color: "#F7DF1E", description: "The language of the web", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
  { name: "Laravel", icon: "laravel", color: "#FF2D20", description: "PHP framework for web artisans", href: "https://laravel.com" },
  { name: "PHP", icon: "php", color: "#7C3AED", description: "Server-side scripting language", href: "https://www.php.net" },
  { name: "MySQL", icon: "mysql", color: "#06B6D4", description: "Relational database management system", href: "https://www.mysql.com" },
  { name: "PostgreSQL", icon: "postgresql", color: "#3B82F6", description: "Advanced open-source database", href: "https://www.postgresql.org" },
  { name: "Supabase", icon: "supabase", color: "#3ECF8E", description: "Postgres-backed backend platform", href: "https://supabase.com" },
  { name: "Webflow", icon: "webflow", color: "#7C3AED", description: "Visual web design & CMS platform", href: "https://webflow.com" },
  { name: "Tailwind", icon: "tailwind", color: "#06B6D4", description: "Utility-first CSS framework", href: "https://tailwindcss.com" },
  { name: "Bootstrap", icon: "bootstrap", color: "#7C3AED", description: "Component-based CSS framework", href: "https://getbootstrap.com" },
  { name: "Git", icon: "git", color: "#F05032", description: "Distributed version control", href: "https://git-scm.com" },
];

export const PROJECTS: Project[] = [
  {
    slug: "wonderflow-clone",
    title: "WonderFlow Clone",
    description:
      "A pixel-perfect clone of the WonderFlow landing page built in Webflow to practice advanced UI, responsive layouts, and animation.",
    longDescription:
      "A pixel-perfect clone of the WonderFlow landing page built in Webflow to practice advanced UI design, responsive layouts, animations, and modern visual design principles. The project demonstrates attention to detail, clean component structure, and the ability to recreate premium SaaS interfaces.",
    image: "/images/projects/wonderflow-clone.svg",
    gallery: ["/images/projects/wonderflow-clone.svg"],
    tech: ["Webflow", "Responsive Design", "CSS", "Interactions"],
    features: [
      "Pixel-accurate recreation of a premium SaaS landing page",
      "Responsive layout across desktop, tablet, and mobile",
      "Webflow interactions and scroll-based animations",
      "Clean, reusable component structure",
    ],
    challenges: ["Matching exact spacing, typography, and motion timing from the original design"],
    solutions: ["Broke the design into a component-driven Webflow class system for precise, reusable styling"],
    timeline: "2025",
    liveUrl: "https://wonderflow-clone.webflow.io/",
    featured: true,
  },
  {
    slug: "webflow-conference-landing",
    title: "Webflow Conference Landing Page",
    description:
      "A modern event landing page inspired by Webflow Conference, with bold typography and interactive sections.",
    longDescription:
      "A modern event landing page inspired by Webflow Conference, featuring bold typography, engaging layouts, interactive sections, and responsive design. Built to showcase landing page development skills and modern web design techniques using Webflow.",
    image: "/images/projects/webflow-conf.svg",
    gallery: ["/images/projects/webflow-conf.svg"],
    tech: ["Webflow", "Landing Page Design", "Responsive Development"],
    features: [
      "Bold typography and strong visual hierarchy",
      "Interactive, animated page sections",
      "Fully responsive across all breakpoints",
      "Event-style layout with clear conversion paths",
    ],
    challenges: ["Designing a layout that balances bold visuals with fast load and easy scanning"],
    solutions: ["Prioritized a clear visual hierarchy and lightweight interactions over heavy animation"],
    timeline: "2025",
    liveUrl: "https://webflow-conf-e7e6b1.webflow.io/",
    featured: true,
  },
  {
    slug: "personal-portfolio",
    title: "Personal Portfolio",
    description:
      "A responsive personal portfolio showcasing projects, technical skills, and development journey.",
    longDescription:
      "A responsive personal portfolio showcasing my projects, technical skills, and development journey. Built with modern web technologies, featuring smooth animations, clean layouts, and an optimized user experience across desktop and mobile devices.",
    image: "/images/projects/personal-portfolio.svg",
    gallery: ["/images/projects/personal-portfolio.svg"],
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    features: [
      "Smooth animations and transitions",
      "Clean, modern layout",
      "Fully responsive across devices",
      "Optimized performance and load times",
    ],
    challenges: ["Keeping animations smooth without hurting performance on lower-end devices"],
    solutions: ["Used lightweight, GPU-friendly transitions and lazy-loaded non-critical sections"],
    timeline: "2025",
    liveUrl: "https://portfolio-gamma-green-24.vercel.app/",
    featured: true,
  },
  {
    slug: "student-result-management-system",
    title: "Student Result Management System",
    description:
      "A full-stack academic management system for admins to manage records and results, and students to view performance.",
    longDescription:
      "A full-stack academic management system that allows administrators to manage student records and examination results through a secure dashboard while enabling students to view their academic performance. Designed with a focus on usability, organization, and efficient data management.",
    image: "/images/projects/student-result-management.svg",
    gallery: ["/images/projects/student-result-management.svg"],
    tech: ["Laravel", "PHP", "MySQL", "Authentication"],
    features: [
      "Secure admin dashboard for managing students and results",
      "Student-facing view for academic performance",
      "Full CRUD operations on records and results",
      "Role-based authentication for admins and students",
    ],
    challenges: ["Structuring the database so results, subjects, and students stayed easy to query and maintain"],
    solutions: ["Normalized the schema around clear student/subject/result relationships with Eloquent models"],
    timeline: "2025",
    liveUrl: "https://student-result-management-system-umber.vercel.app/",
    featured: true,
  },
];

// NOTE: no work history was provided — this section is left minimal on
// purpose rather than inventing employers. Replace with real roles, or
// remove the Experience section from the homepage, whenever you're ready.
export const EXPERIENCE: ExperienceItem[] = [];

export const SERVICES: Service[] = [
  {
    title: "Web Development",
    description: "Fast, clean, responsive websites built to spec.",
    icon: "code",
    features: ["Responsive design", "SEO-friendly markup", "Cross-browser support"],
  },
  {
    title: "Webflow Design & Build",
    description: "Pixel-accurate Webflow builds with interactions and CMS.",
    icon: "layers",
    features: ["Component-driven builds", "Scroll & hover interactions", "CMS collections"],
  },
  {
    title: "Full Stack Development",
    description: "End-to-end features — database to deployed UI.",
    icon: "server",
    features: ["Laravel & PHP backends", "MySQL / PostgreSQL schema design", "Authentication & CRUD"],
  },
  {
    title: "Landing Pages",
    description: "Conversion-focused landing pages that load fast.",
    icon: "gauge",
    features: ["Modern UI", "Mobile-first layouts", "Performance-minded builds"],
  },
];

export const CERTIFICATES: Certificate[] = [];

export const AI_ASSISTANT_SYSTEM_PROMPT = `You are the AI assistant embedded in Misam Abbas's developer portfolio.
Answer questions about Misam's projects, skills, and how to get in touch.
Be concise, friendly, and specific. If asked something unrelated to Misam or his work, gently steer
the conversation back. If you don't know an answer, say so honestly instead of guessing.

Facts about Misam:
- Role: ${SITE.role}, based in ${SITE.location}.
- Core stack: HTML5, CSS3, JavaScript, TypeScript, Next.js, Tailwind CSS, Bootstrap, Webflow, Laravel, PHP, MySQL, PostgreSQL, Supabase.
- Notable projects: WonderFlow Clone (Webflow landing page recreation), Webflow Conference Landing Page, Personal Portfolio (Next.js/TypeScript/Tailwind), Student Result Management System (Laravel/PHP/MySQL).
- Open to freelance and collaborative projects.
- Contact: ${SITE.email}.

Special instruction for section intros: if the user's message asks you to introduce the
"projects", "skills", "about", or "contact" section (these come from slash commands like
/projects, /skills, /about, /contact), reply with exactly ONE short, warm sentence framing
that section — do NOT list the actual projects, skills, or contact details yourself, since
the app renders the accurate structured details separately right below your message.`;
