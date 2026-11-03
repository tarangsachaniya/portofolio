/**
 * Single content source for the site. Edit copy here, not in components.
 *
 * Rule: no invented numbers. Every metric below came from the previous site,
 * the live Priinteve properties, or Tarang directly. Lines marked TODO(tarang)
 * need a confirmation before they go live.
 */

/* ─────────────────────────── profile ─────────────────────────── */

export const profile = {
  name: "Tarang Sachaniya",
  first: "Tarang",
  last: "Sachaniya",
  handle: "tarang.dev",
  role: "Full-stack developer",
  company: "Priinteve Innovations",
  // TODO(tarang): previous site said "Founder & CEO"; LLP records list two
  // Designated Partners. Pick the title you want public.
  title: "Co-founder, Priinteve Innovations",
  location: "Ahmedabad, India",
  timezone: "Asia/Kolkata",
  email: "tarangsachaniya8@gmail.com",
  companyEmail: "contact@priinteve.com",
  // TODO(tarang): previous site had WhatsApp 9662070751 / call 9909070751;
  // other Priinteve material has them the other way round. Confirm.
  whatsapp: "919662070751",
  whatsappLabel: "+91 96620 70751",
  status: "Building Priinteve · open to freelance builds",
  socials: [
    { label: "GitHub", href: "https://github.com/tarangsachaniya" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/tarang-sachaniya/" },
    { label: "Instagram", href: "https://instagram.com/tarangsachaniya" },
  ],
} as const;

/* ─────────────────────────── README ─────────────────────────── */

export const readme = {
  intro:
    "I'm a full-stack developer from Ahmedabad with a backend lean. I didn't learn this from a syllabus. I learned it by shipping things that had to work on Monday morning.",
  body: [
    "Three years as a backend developer taught me APIs, queues and the quiet art of making MySQL fast. Starting Priinteve taught me everything else: pricing, printers, NFC chips, and what happens when real customers find the edge case you skipped.",
    "Today I design the architecture, write most of the code, and still read the logs myself.",
  ],
  principles: [
    {
      n: "01",
      title: "Make it, then make it right.",
      body: "A rough version in front of a user beats a perfect plan in Notion. I iterate in public.",
    },
    {
      n: "02",
      title: "Boring tech, sharp edges.",
      body: "Postgres, plain REST, one API with clear namespaces. Clever lives in the product, not the stack.",
    },
    {
      n: "03",
      title: "Write it down.",
      body: "Every product starts as a PRD and an architecture doc. Future-me is a teammate too.",
    },
  ],
};

/* ─────────────────────────── story ─────────────────────────── */

export interface Chapter {
  n: string;
  year: string;
  title: string;
  /** Narrative paragraph. Wrap a phrase in [[double brackets]] to highlight it. */
  story: string;
  learned: string[];
  made: string[];
  where?: string;
}

export const chapters: Chapter[] = [
  {
    n: "01",
    year: "2021",
    title: "Hello, world.",
    where: "LJ University · B.E. Computer Science",
    story:
      "Started computer engineering and wrote my first web pages, mostly by breaking them. Outside class I ran LFA Magazine, first as marketing head and then as president, and learned that [[shipping on a deadline]] isn't only a code problem.",
    learned: ["HTML, CSS, JavaScript", "Programming fundamentals", "Leading a team of volunteers"],
    made: ["Class projects", "Two years of magazine issues", "Carpe Diem sports meet (led twice)"],
  },
  {
    n: "02",
    year: "2023",
    title: "Data, sensors, and a first job.",
    where: "Prime Apps Infotech · Intern",
    story:
      "Python pulled me in through data: a COVID-19 analysis that taught me cleaning data is 80% of the job. Then hardware: an attendance system that checked a fingerprint and a face. In July I joined Prime Apps Infotech as an intern, and [[my code started having users]].",
    learned: ["Python, Pandas, scikit-learn", "OpenCV & sensor wiring", "Laravel, Git, code review"],
    made: ["COVID-19 data analysis", "Smart Attendance System (2024)"],
  },
  {
    n: "03",
    year: "2024",
    title: "Production is a different teacher.",
    where: "Prime Apps Infotech · Backend Developer",
    story:
      // TODO(tarang): confirm Hackovate year
      "Six months in, I moved to a full-time backend role. Real traffic, real third parties, real pagers. I integrated Sportradar feeds, built REST APIs in Laravel and Node, and [[cut MySQL query times by 40%+]]. At college I co-ran Hackovate, a 36-hour AI hackathon with 200+ participants.",
    learned: ["API design & versioning", "Query plans and indexes", "MERN end-to-end"],
    made: ["Production REST APIs", "Sportradar integrations", "Hackovate LJ (tech lead)"],
  },
  {
    n: "04",
    // TODO(tarang): previous site listed Priinteve as "2024 – Present". Confirm founding year.
    year: "2025",
    title: "Starting something.",
    where: "Priinteve Innovations LLP · Co-founder",
    story:
      "Graduated, and with a co-founder started Priinteve Innovations to fix how small businesses in Ahmedabad order printing, and then to build the software they kept asking for. Shipped Universal Brew for a client and published [[my first npm package]].",
    learned: ["Pricing & unit economics", "Next.js App Router, ISR", "Razorpay, Resend, Cloudinary"],
    made: ["Universal Brew", "otp-forge (npm)", "Priinteve Cards"],
  },
  {
    n: "05",
    year: "2026",
    title: "Systems, not pages.",
    where: "Priinteve · full-time",
    story:
      // TODO(tarang): confirm framing of the Prime Apps exit
      "Wrapped up at Prime Apps in July and went full-time on Priinteve. Now the work is systems: five apps on one Bun API, an order-allocation algorithm that balances profit, fairness and delivery time across printers, desktop apps, Android apps, and [[an NFC terminal on an ESP32]]. Still learning, just with bigger consequences.",
    learned: ["Bun, Hono, Drizzle", "Linux, Nginx, Docker on VPS", "Allocation algorithms", "ESP32 + NFC"],
    made: ["Priinteve print network", "Priinteve Menu", "Zerox Buddy", "Salonly", "Client sites"],
  },
];

/* ─────────────────────────── work ─────────────────────────── */

export type WorkKind = "Product" | "Client" | "Open source" | "Learning";
export type WorkStatus = "Live" | "Pre-launch" | "Shipped" | "Concept" | "Archived";

export interface Work {
  id: string;
  name: string;
  /** one line: what it is */
  what: string;
  /** 1–2 sentences: what was hard / what I did */
  detail: string;
  kind: WorkKind;
  status: WorkStatus;
  year: string;
  role: string;
  stack: string[];
  href?: string;
  domain?: string;
  /** /public/<path>: 16:10 */
  image?: string;
}

export const featured = {
  id: "print-network",
  eyebrow: "Featured · Priinteve",
  name: "Priinteve Print Network",
  pitch:
    "An on-demand printing platform with an invisible vendor network: customers see one brand, orders quietly route to the right local printer.",
  role: "Co-founder · architecture, backend, most of the frontend",
  status: "Pre-launch" as WorkStatus,
  year: "2025 to now",
  href: "https://priinteve.com",
  domain: "priinteve.com",
  image: "/products/priinteve-web.avif",
  surfaces: [
    { name: "Customer web", note: "Next.js" },
    { name: "Mobile app", note: "iOS · Android" },
    { name: "Admin panel", note: "IP-whitelisted" },
    { name: "Printer portal", note: "Vendor-side, anonymised" },
    { name: "Driver app", note: "Delivery" },
  ],
  core: { name: "One Bun + Hono API", note: "four isolated namespaces" },
  infra: ["PostgreSQL · Drizzle", "Redis sessions", "Cloudflare R2", "Razorpay", "FCM · Resend", "Nginx"],
  allocation: [
    { label: "Profit", weight: 50 },
    { label: "Fair job distribution", weight: 30 },
    { label: "Delivery distance", weight: 20 },
  ],
  notes: [
    "Printers see an order ID and an area, never the customer's name or address.",
    "Allocation is a greedy weighted score, min-max normalised across eligible printers, with a no-loss delivery guard and a cold-start rule.",
    "Orders run 25–1,000 pieces; quantity feeds the allocation matrix.",
  ],
};

export const work: Work[] = [
  {
    id: "cards",
    name: "Priinteve Cards",
    what: "NFC + QR digital business cards",
    detail:
      "Tap a card, get a live profile, no app for the recipient. Field library with drag-to-reorder, four gallery layouts, device-aware Save Contact, referral wallet, 2-hour ISR on public pages.",
    kind: "Product",
    status: "Live",
    year: "2025",
    role: "Product, full-stack",
    stack: ["Next.js", "MongoDB", "Cloudinary", "NFC"],
    href: "https://cards.priinteve.com",
    domain: "cards.priinteve.com",
    image: "/products/priinteve-cards.avif",
  },
  {
    id: "menu",
    name: "Priinteve Menu",
    what: "QR table ordering for restaurants",
    detail:
      "Diners order from their own phone; the kitchen watches one live board move from placed → preparing → ready. GST-ready invoices, live menu edits, zero per-order fees.",
    kind: "Product",
    status: "Live",
    year: "2025",
    role: "Product, full-stack",
    stack: ["Next.js", "Node.js", "PostgreSQL", "Socket.IO"],
    href: "https://menu.priinteve.com",
    domain: "menu.priinteve.com",
    image: "/products/priinteve-menu.avif",
  },
  {
    id: "zerox",
    name: "Zerox Buddy",
    // TODO(tarang): one-line description to confirm
    what: "Web + desktop app for print & xerox shops",
    detail:
      "A web dashboard paired with a Windows desktop client that sits next to the shop's printer, part of Priinteve's printer-side tooling.",
    kind: "Product",
    status: "Live",
    year: "2026",
    role: "Product, full-stack, desktop",
    stack: [], // TODO(tarang): add stack
    href: "https://zerox.priinteve.com",
    domain: "zerox.priinteve.com",
  },
  {
    id: "salonly",
    name: "Salonly",
    // TODO(tarang): one-line description to confirm
    what: "Bookings and management for salons",
    detail: "Web platform with an Android companion app for salon owners and their customers.",
    kind: "Product",
    status: "Live",
    year: "2026",
    role: "Product, full-stack, Android",
    stack: ["Android"], // TODO(tarang): add stack
    href: "https://salon.priinteve.com",
    domain: "salon.priinteve.com",
  },
  {
    id: "universal-brew",
    name: "Universal Brew",
    what: "Coffee e-commerce, end to end",
    detail:
      "Product discovery, Razorpay checkout, order management and a mobile-first storefront, built to stay fast on a cheap Android phone.",
    kind: "Client",
    status: "Live",
    year: "2025",
    role: "Full-stack",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Razorpay"],
    href: "https://universalbrew.shop",
    domain: "universalbrew.shop",
    image: "/projects/universal-brew.avif",
  },
  {
    id: "royal-timber",
    name: "Royal Timber",
    what: "Website for a plywood supplier",
    detail: "Website for a plywood supplier and wholesaler, presenting the product range for dealers and contractors.",
    kind: "Client",
    status: "Shipped",
    year: "2026",
    role: "Design & build",
    stack: [], // TODO(tarang): add stack + live URL
  },
  {
    id: "quantivo",
    name: "Quantivo",
    what: "Website for a digital marketing agency",
    detail: "Agency site with case-study structure, built as their independent development partner.",
    kind: "Client",
    status: "Shipped",
    year: "2026",
    role: "Development",
    stack: [], // TODO(tarang): add stack + live URL
  },
  {
    id: "earthora",
    name: "EarthOra",
    what: "Cashew brand storefront, mobile concept",
    detail: "A mobile-first visual concept where the hero is a packet you tear open on scroll, shipped as an isolated route so the live store stayed untouched.",
    kind: "Client",
    status: "Concept",
    year: "2026",
    role: "Concept & front-end",
    stack: ["React"],
  },
  {
    id: "otp-forge",
    name: "otp-forge",
    what: "Zero-dependency OTP library on npm",
    detail: "Generate and verify alphanumeric OTPs in Node, Next.js, React Native or the browser. Typed, tiny, no deps.",
    kind: "Open source",
    status: "Shipped",
    year: "2025",
    role: "Author",
    stack: ["TypeScript", "npm"],
    href: "https://www.npmjs.com/package/otp-forge",
    domain: "npmjs.com/package/otp-forge",
  },
  {
    id: "attendance",
    name: "Smart Attendance System",
    what: "Fingerprint + face-verified attendance",
    detail: "IoT build that pairs a fingerprint sensor with OpenCV facial verification so nobody marks a friend present.",
    kind: "Learning",
    status: "Archived",
    year: "2024",
    role: "Hardware & software",
    stack: ["Python", "OpenCV", "IoT"],
    href: "https://github.com/tarangsachaniya/smart-attendance-system",
    domain: "github.com",
  },
  {
    id: "covid",
    name: "COVID-19 Data Analysis",
    what: "Cleaning, plotting and predicting",
    detail: "My first real data project. Most of it was cleaning, the rest was learning why a model lies.",
    kind: "Learning",
    status: "Archived",
    year: "2023",
    role: "Solo",
    stack: ["Python", "Pandas", "scikit-learn"],
    href: "https://github.com/tarangsachaniya/covid_data_analysis",
    domain: "github.com",
  },
];

export const workKinds: ("All" | WorkKind)[] = ["All", "Product", "Client", "Open source", "Learning"];

/* ─────────────────────────── on the bench ─────────────────────────── */

export interface BenchItem {
  name: string;
  body: string;
  stage: "Prototype" | "Open source" | "Spec" | "Idea";
  learning: string;
  href?: string;
}

export const bench: BenchItem[] = [
  {
    name: "NFC verification terminal",
    body: "ESP32 + PN532 reader with an I²C LCD. Tap a tag, it calls the URL on the chip and shows PASSED or FAILED.",
    stage: "Spec",
    learning: "Embedded C, I²C, Wi-Fi on microcontrollers",
  },
  {
    name: "Claude skills for images & video",
    body: "Reusable skill packs that let an AI agent produce on-brand images and short videos for product launches.",
    stage: "Open source",
    learning: "Agent tooling, prompt design",
    href: "https://github.com/tarangsachaniya/claude-skill-for-images-and-video",
  },
  {
    name: "Soil-sensor farming agent",
    body: "An AI advisor for Gujarat farmers that reads an 8-parameter soil sensor and suggests crops and next steps.",
    stage: "Idea",
    learning: "Sensor data, agent design, Gujarati UX",
  },
  {
    name: "Desktop morning companion",
    body: "A small Windows mascot that gives the team a morning briefing, configured from the Priinteve admin panel.",
    stage: "Idea",
    learning: "Native desktop, scheduling",
  },
];

/* ─────────────────────────── toolbox ─────────────────────────── */

export const toolbox = [
  {
    label: "Daily drivers",
    note: "What I open every morning",
    items: ["TypeScript", "Node.js", "Bun", "Hono", "Next.js", "React", "PostgreSQL", "Drizzle", "Laravel", "Tailwind CSS"],
  },
  {
    label: "Reach for often",
    note: "Comfortable in production",
    items: ["MongoDB", "MySQL", "Redis", "Prisma", "Express", "Socket.IO", "Razorpay", "Cloudflare R2", "Cloudinary", "Nginx", "Linux VPS", "AWS EC2 · S3", "Docker", "Python"],
  },
  {
    label: "Currently learning",
    note: "Rough edges, on purpose",
    items: ["Kubernetes", "Terraform", "ESP32 & NFC", "AI agents", "React Native"],
  },
];
