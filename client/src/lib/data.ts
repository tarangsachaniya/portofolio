/**
 * Single content source for the site. Edit copy here, not in components.
 *
 * Priinteve content is transcribed from the live properties
 * (priinteve.com, cards.priinteve.com, menu.priinteve.com) and the digital
 * card at cards.priinteve.com/tarang-sachaniya-priinteve-innovations.
 * Do not invent product claims — add them here once verified.
 */

/* ─────────────────────────── profile ─────────────────────────── */

export const profile = {
  name: "Tarang Sachaniya",
  firstName: "Tarang",
  roles: [
    "Full Stack Developer",
    "MERN Stack Engineer",
    "Laravel Expert",
    "Founder, Priinteve",
  ],
  headline: "Full Stack Developer",
  secondary: "Founder & CEO, Priinteve Innovations LLP",
  location: "Ahmedabad, India",
  email: "tarangsachaniya8@gmail.com",
  blurb:
    "I build production-grade web applications with the MERN stack, Laravel, and Python — then run the company that ships them. Focused on performance, clean architecture, and API integrations that hold up under real traffic.",
  socials: [
    { label: "GitHub", href: "https://github.com/tarangsachaniya", icon: "github" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/tarang-sachaniya/", icon: "linkedin" },
    { label: "Instagram", href: "https://instagram.com/tarangsachaniya", icon: "instagram" },
  ],
} as const;

export interface Stat {
  value: string;
  label: string;
}

export const statsData: Stat[] = [
  { value: "3+", label: "Years building" },
  { value: "4", label: "Products shipped" },
  { value: "10+", label: "Projects delivered" },
];

/* ─────────────────────────── tech stack ─────────────────────────── */

export type TechCategory = "Frontend" | "Backend" | "Database" | "DevOps & Tools";

export interface Tech {
  name: string;
  /** matches a file in client/src/assets/icons/<slug>.svg — omit for a lettermark fallback */
  slug?: string;
  category: TechCategory;
}

export const techStack: Tech[] = [
  // Frontend
  { name: "React", slug: "react", category: "Frontend" },
  { name: "Next.js", slug: "nextdotjs", category: "Frontend" },
  { name: "TypeScript", slug: "typescript", category: "Frontend" },
  { name: "JavaScript", slug: "javascript", category: "Frontend" },
  { name: "Redux", slug: "redux", category: "Frontend" },
  { name: "Zustand", category: "Frontend" },
  { name: "Tailwind CSS", slug: "tailwindcss", category: "Frontend" },
  { name: "Bootstrap", slug: "bootstrap", category: "Frontend" },
  { name: "HTML5", slug: "html5", category: "Frontend" },
  { name: "CSS3", slug: "css", category: "Frontend" },
  // Backend
  { name: "Node.js", slug: "nodedotjs", category: "Backend" },
  { name: "Express.js", slug: "express", category: "Backend" },
  { name: "Laravel", slug: "laravel", category: "Backend" },
  { name: "PHP", slug: "php", category: "Backend" },
  { name: "Python", slug: "python", category: "Backend" },
  { name: "REST APIs", category: "Backend" },
  { name: "Socket.IO", slug: "socketdotio", category: "Backend" },
  { name: "JWT", slug: "jsonwebtokens", category: "Backend" },
  // Database
  { name: "MongoDB", slug: "mongodb", category: "Database" },
  { name: "MySQL", slug: "mysql", category: "Database" },
  { name: "PostgreSQL", slug: "postgresql", category: "Database" },
  { name: "Redis", slug: "redis", category: "Database" },
  { name: "Prisma", slug: "prisma", category: "Database" },
  // DevOps & Tools
  { name: "Git", slug: "git", category: "DevOps & Tools" },
  { name: "GitHub", slug: "github", category: "DevOps & Tools" },
  { name: "Docker", slug: "docker", category: "DevOps & Tools" },
  { name: "AWS", category: "DevOps & Tools" },
  { name: "Vercel", slug: "vercel", category: "DevOps & Tools" },
  { name: "Linux", slug: "linux", category: "DevOps & Tools" },
  { name: "Postman", slug: "postman", category: "DevOps & Tools" },
  { name: "Vite", slug: "vite", category: "DevOps & Tools" },
  { name: "WordPress", slug: "wordpress", category: "DevOps & Tools" },
  { name: "Figma", slug: "figma", category: "DevOps & Tools" },
];

export const techCategories: TechCategory[] = [
  "Frontend",
  "Backend",
  "Database",
  "DevOps & Tools",
];

/** Marquee rows — split so the two counter-scrolling rows read differently. */
export const marqueeRowA = techStack.filter((tech) =>
  ["Frontend", "Database"].includes(tech.category),
);
export const marqueeRowB = techStack.filter((tech) =>
  ["Backend", "DevOps & Tools"].includes(tech.category),
);

/* ─────────────────────── Priinteve Innovations ─────────────────────── */

export const priinteve = {
  name: "Priinteve Innovations",
  legalName: "Priinteve Innovations LLP",
  role: "Founder & CEO",
  tagline: "Engineering Scalable Digital Products for Startups & Enterprises",
  description:
    "I founded Priinteve to build the software I kept being asked for — commerce, ordering, and identity products that small businesses can actually run themselves. Three products are live and serving customers; a fourth is in development.",
  location: "Ahmedabad, Gujarat, India",
  address:
    "417, Mukhi ne khadki, Near Ambe Maa Temple, Paldi Gaam, Ahmedabad",
  email: "contact@priinteve.com",
  phone: "+91 9909070751",
  whatsapp: "+91 9662070751",
  website: "https://priinteve.com",
  services: [
    "Custom Software Development",
    "Web Application Development",
    "Mobile App Development",
    "AI Solutions",
    "SaaS Platform Development",
    "Cloud Solutions",
    "Business Automation",
    "API Integrations",
    "UI/UX Design",
    "IoT & NFC Solutions",
  ],
  socials: [
    { label: "LinkedIn", href: "https://linkedin.com/company/priinteve-innovations" },
    { label: "Instagram", href: "https://instagram.com/priinteve.innovations" },
    { label: "X", href: "https://x.com/priinteve" },
    { label: "Facebook", href: "https://facebook.com/priinteveinnovations" },
    { label: "YouTube", href: "https://youtube.com/@priinteveinnovations" },
    { label: "GitHub", href: "https://github.com/priinteve" },
  ],
} as const;

export type ProductStatus = "live" | "in-development";

export interface PriinteveProduct {
  id: string;
  name: string;
  /** shown in the browser-frame chrome */
  domain: string;
  url?: string;
  status: ProductStatus;
  tagline: string;
  description: string;
  features: string[];
  metrics?: Stat[];
  tech: string[];
  /** hue for the card accent, in degrees */
  hue: number;
  /** client/public/products/<image> — falls back to a generated placeholder */
  image?: string;
}

export const priinteveProducts: PriinteveProduct[] = [
  {
    id: "web",
    name: "Priinteve Web",
    domain: "priinteve.com",
    url: "https://priinteve.com",
    status: "live",
    tagline: "Premium custom printing, ordered online",
    description:
      "The commerce platform: businesses upload artwork, get an instant price estimate, and order business cards, marketing material, packaging and bulk print runs with pan-India delivery.",
    features: [
      "Instant price estimate on file upload",
      "Free design proofing on every order",
      "Pan-India delivery with live tracking",
      "Turnaround from 24 hours",
      "GST invoices, ISO 9001 certified",
      "Marketing material, stationery, labels, packaging",
    ],
    metrics: [
      { value: "10,000+", label: "Business customers" },
      { value: "250,000+", label: "Orders fulfilled" },
      { value: "40+", label: "Print partners" },
    ],
    tech: ["Next.js", "TypeScript", "Node.js", "MySQL", "Tailwind CSS"],
    hue: 142,
    image: "priinteve-web.avif",
  },
  {
    id: "cards",
    name: "Priinteve Cards",
    domain: "cards.priinteve.com",
    url: "https://cards.priinteve.com",
    status: "live",
    tagline: "NFC digital business cards",
    description:
      "Share contact details, socials and portfolio with a single tap or scan — no app required. Physical NFC cards in plastic, wood or metal, each backed by a live profile the owner can update at any time.",
    features: [
      "NFC tap, QR scan, or plain link",
      "Live profile updates across every shared copy",
      "Lead capture and analytics",
      "Team management for company accounts",
      "Gallery, services and testimonials per profile",
      "No app install for the recipient",
    ],
    metrics: [
      { value: "₹500", label: "Plastic · 8 images" },
      { value: "₹800", label: "Wooden · 20 images" },
      { value: "₹1,400", label: "Metal · 50 images" },
    ],
    tech: ["Next.js", "React", "MongoDB", "NFC", "Tailwind CSS"],
    hue: 190,
    image: "priinteve-cards.avif",
  },
  {
    id: "menu",
    name: "Priinteve Menu",
    domain: "menu.priinteve.com",
    url: "https://menu.priinteve.com",
    status: "live",
    tagline: "QR table ordering for restaurants",
    description:
      "Diners scan the QR at their table, order from their own phone, and pay however they like. The kitchen watches one live board as orders move from placed to preparing to ready.",
    features: [
      "A printable QR code per table",
      "Live kitchen board: placed → preparing → ready",
      "GST-ready invoices with FSSAI details",
      "Menu, stock and pricing update live on save",
      "Peak-hour menu demotions",
      "Moderated guest reviews",
    ],
    metrics: [
      { value: "Free", label: "First month, Starter" },
      { value: "0%", label: "Per-order fees" },
      { value: "< 1 day", label: "Setup time" },
    ],
    tech: ["Next.js", "Node.js", "PostgreSQL", "Socket.IO", "Tailwind CSS"],
    hue: 32,
    image: "priinteve-menu.avif",
  },
  {
    id: "app",
    name: "Priinteve App",
    domain: "in development",
    status: "in-development",
    tagline: "One mobile app for the whole platform",
    description:
      "A native companion bringing ordering, card management and the live kitchen board into a single mobile experience. Currently in development — details will land here as it takes shape.",
    features: [
      "Unified account across Web, Cards and Menu",
      "Order tracking and reordering",
      "Push notifications for order status",
    ],
    tech: ["React Native", "TypeScript", "Node.js"],
    hue: 265,
  },
];

/* ─────────────────────────── projects ─────────────────────────── */

export interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  category: string;
  status?: "live" | "archived";
  year?: string;
  github?: string;
  live?: string;
  /** shown in the browser-frame chrome */
  domain?: string;
  /** client/public/projects/<image> — falls back to a generated placeholder */
  image?: string;
  hue: number;
}

export const projectsData: Project[] = [
  {
    id: 1,
    title: "Universal Brew",
    description:
      "Full-featured coffee e-commerce platform with seamless product discovery, secure RazorPay payments, order management, and mobile-first UX. Built for performance and scalability.",
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Shadcn",
      "PostgreSQL",
      "RazorPay",
    ],
    category: "E-Commerce",
    status: "live",
    year: "2025",
    live: "https://universalbrew.shop",
    domain: "universalbrew.shop",
    image: "universal-brew.avif",
    hue: 25,
  },
  {
    id: 3,
    title: "Smart Attendance System",
    description:
      "IoT-based attendance system using fingerprint authentication and OpenCV facial verification to automate and secure attendance tracking in real time.",
    tech: ["IoT", "Python", "OpenCV", "Fingerprint Sensor"],
    category: "IoT",
    year: "2024",
    hue: 190,
  },
  {
    id: 4,
    title: "COVID-19 Data Analysis",
    description:
      "Machine learning project performing data cleaning, visualization, and predictive modeling on COVID-19 datasets using Python and Scikit-learn.",
    tech: ["Python", "Pandas", "Matplotlib", "Scikit-learn"],
    category: "Data Science",
    year: "2023",
    github: "https://github.com/tarangsachaniya/covid_data_analysis",
    hue: 265,
  },
];

/* ─────────────────────────── experience ─────────────────────────── */

export interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  type: "Founder" | "Full-time" | "Internship";
  current?: boolean;
  description: string;
  highlights: string[];
}

export const experienceData: Experience[] = [
  {
    id: 1,
    role: "Founder & CEO",
    company: "Priinteve Innovations LLP",
    // TODO(tarang): confirm the founding month/year
    period: "2024 – Present",
    type: "Founder",
    current: true,
    description:
      "Founded and lead Priinteve Innovations, building and operating a portfolio of commerce, ordering and digital-identity products for Indian businesses. Responsible for architecture, engineering and delivery across every product.",
    highlights: [
      "Shipped three products to production: Web, Cards and Menu",
      "Built the print commerce platform serving 10,000+ businesses",
      "Designed NFC + QR digital card infrastructure with live profiles",
      "Built real-time QR table ordering with a live kitchen board",
    ],
  },
  {
    id: 2,
    role: "Backend Developer",
    company: "Prime Apps Infotech",
    period: "Jul 2023 – Jul 2026",
    type: "Full-time",
    description:
      "Joined as a six-month intern and moved into a full-time Backend Developer role. Built scalable web applications with Laravel, PHP and the MERN stack — architecting REST APIs, integrating third-party services, and shipping production features.",
    highlights: [
      "Built scalable REST APIs using Laravel & Node.js",
      "Integrated Sportradar and other third-party services",
      "Optimized MySQL queries for 40%+ performance gain",
      "Led MERN stack projects end-to-end",
    ],
  },
];

export interface Education {
  id: number;
  degree: string;
  school: string;
  period: string;
  description: string;
}

export const educationData: Education[] = [
  {
    id: 1,
    degree: "Bachelor of Engineering in Computer Science",
    school: "LJK University",
    period: "2021 – 2025",
    description:
      "Focused on software engineering, full-stack development, database systems, and machine learning. Actively involved in technical and creative initiatives.",
  },
];

export interface Extracurricular {
  title: string;
  org: string;
  description: string;
}

export const extracurricularData: Extracurricular[] = [
  {
    title: "Head Student Coordinator & Tech Lead",
    org: "Hackovate LJ",
    description:
      "Managed and coordinated a 36-hour AI hackathon with 200+ participants.",
  },
  {
    title: "President",
    org: "LFA Magazine",
    description:
      "Oversaw all operations and strategic initiatives for the bi-annual magazine.",
  },
  {
    title: "Marketing Head",
    org: "LFA Magazine",
    description:
      "Led marketing and outreach campaigns for the magazine publication.",
  },
  {
    title: "Head of Carpediem",
    org: "Annual Sports Meet",
    description: "Led the annual sports competition for two consecutive years.",
  },
];
