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
    title: "Smart Attendance System (IoT-Based)",
    description:
      "An IoT-based smart attendance system using fingerprint authentication and OpenCV-based facial verification to automate and secure attendance tracking.",
    tech: ["IoT", "Python", "OpenCV", "Fingerprint Sensor"],
    category: "IoT"
  },
  {
    id: 2,
    title: "Hackovate LJ – AI Hackathon Management Platform",
    description:
      "A full-stack hackathon management website built for a 36-hour AI hackathon, handling registrations, team management, submissions, and event coordination.",
    tech: ["Next.js", "MongoDB", "Node.js", "Express", "Tailwind CSS"],
    category: "Full Stack",
    github: "https://github.com/Magazine-LFA/hachakthon",
    live: "https://hackovate.live/",
  },
  {
    id: 3,
    title: "COVID-19 Data Analysis & Prediction",
    description:
      "Machine learning-based data analysis project performing data cleaning, visualization, and predictive modeling on COVID-19 datasets.",
    tech: ["Python", "Pandas", "Matplotlib", "Scikit-learn"],
    category: "Data Science",
    github: "https://github.com/tarangsachaniya/covid_data_analysis"
  },
  {
    id: 4,
    title: "Universal Brew",
    description:
      "Developed a full-featured coffee e-commerce platform enabling seamless product discovery, secure payments, order management, and customer engagement. Built with a focus on performance, scalability, and mobile-first user experience.",
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Shadcn",
      "PGSql",
      "RazorPay"
    ],
    category: "E-Commerce",
    live: "https://universalbrew.vercel.app",
  },
];

export const experienceData = [
  {
    id: 1,
    role: "Backend Developer",
    company: "Prime Apps Infotech",
    period: "2023 - Present",
    description:
      "Worked on scalable web applications using Laravel, PHP, and MERN stack. Developed REST APIs, integrated third-party services like Sportradar, optimized database queries, and improved system performance."
  }
];

export const educationData = [
  {
    id: 1,
    degree: "Bachelor of Engineering in Computer Science",
    school: "LJK University",
    period: "2021 - 2025",
    description:
      "Focused on software engineering, full-stack development, database systems, and machine learning. Actively involved in technical and creative initiatives."
  }
];

export const extracurricularData = [
  {
    title: "Head Student Coordinator & Tech Lead for Hackovate LJ",
    description: "Managed and coordinated the AI Hackathon."
  },
  {
    title: "Marketing Head of LFA",
    description: "Bi-annual magazine leadership role."
  },
  {
    title: "President of LFA",
    description: "Oversaw all operations and initiatives for the magazine."
  },
  {
    title: "Head of Carpediem",
    description: "Led the annual sports competition twice."
  },
];
