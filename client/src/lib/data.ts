export const skillsData = {
  frontend: [
    "React",
    "Next.js",
    "TypeScript",
    "Redux",
    "Zustand",
    "Tailwind CSS",
    "Bootstrap",
    "HTML5",
    "CSS3"
  ],
  backend: [
    "Node.js",
    "Express.js",
    "Laravel",
    "PHP",
    "Python",
    "REST APIs"
  ],
  database: [
    "MongoDB",
    "MySQL"
  ],
  tools: [
    "Git",
    "Docker",
    "Postman",
    "AWS",
    "Linux",
    "WordPress",
    "Vercel",
    "Figma"
  ]
};

export interface Project {
  id?: number;
  title: string;
  description: string;
  tech: string[];
  category: string;
  github?: string;
  live?: string;
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
      "RazorPay"
    ],
    category: "E-Commerce",
    live: "https://universalbrew.vercel.app",
  },
  {
    id: 2,
    title: "Hackovate LJ — AI Hackathon Platform",
    description:
      "Full-stack hackathon management platform for a 36-hour AI hackathon — handling registrations, team formation, submissions, and real-time event coordination.",
    tech: ["Next.js", "MongoDB", "Node.js", "Express", "Tailwind CSS"],
    category: "Full Stack",
    github: "https://github.com/Magazine-LFA/hachakthon",
    live: "https://hackovate.live/",
  },
  {
    id: 3,
    title: "Smart Attendance System",
    description:
      "IoT-based attendance system using fingerprint authentication and OpenCV facial verification to automate and secure attendance tracking in real time.",
    tech: ["IoT", "Python", "OpenCV", "Fingerprint Sensor"],
    category: "IoT"
  },
  {
    id: 4,
    title: "COVID-19 Data Analysis",
    description:
      "Machine learning project performing data cleaning, visualization, and predictive modeling on COVID-19 datasets using Python and Scikit-learn.",
    tech: ["Python", "Pandas", "Matplotlib", "Scikit-learn"],
    category: "Data Science",
    github: "https://github.com/tarangsachaniya/covid_data_analysis"
  },
];

export interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  type: "Full-time" | "Internship";
  duration: string;
  description: string;
  highlights: string[];
}

export const experienceData: Experience[] = [
  {
    id: 1,
    role: "Backend Developer",
    company: "Prime Apps Infotech",
    period: "Jul 2023 – Present",
    type: "Full-time",
    duration: "2+ Years",
    description:
      "Started as a 6-month intern and transitioned to a full-time Backend Developer role. Leading development of scalable web applications using Laravel, PHP, and the MERN stack. Architecting REST APIs, integrating third-party services, and delivering production-grade features.",
    highlights: [
      "Built scalable REST APIs using Laravel & Node.js",
      "Integrated Sportradar and other third-party services",
      "Optimized MySQL queries for 40%+ performance gain",
      "Led MERN stack projects end-to-end",
    ],
  },
];

export const educationData = [
  {
    id: 1,
    degree: "Bachelor of Engineering in Computer Science",
    school: "LJK University",
    period: "2021 – 2025",
    description:
      "Focused on software engineering, full-stack development, database systems, and machine learning. Actively involved in technical and creative initiatives."
  }
];

export const extracurricularData = [
  {
    title: "Head Student Coordinator & Tech Lead",
    org: "Hackovate LJ",
    description: "Managed and coordinated a 36-hour AI hackathon with 200+ participants."
  },
  {
    title: "President",
    org: "LFA Magazine",
    description: "Oversaw all operations and strategic initiatives for the bi-annual magazine."
  },
  {
    title: "Marketing Head",
    org: "LFA Magazine",
    description: "Led marketing and outreach campaigns for the magazine publication."
  },
  {
    title: "Head of Carpediem",
    org: "Annual Sports Meet",
    description: "Led the annual sports competition for two consecutive years."
  },
];
