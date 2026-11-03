/**
 * The single content layer. Every theme renders THIS data — no theme owns copy.
 *
 * Rules:
 *  - No invented numbers or ratings. Facts come from Tarang, the previous
 *    site, or the live product sites.
 *  - Lines marked TODO(tarang) need confirmation before launch.
 *  - Every page opens with an answer-first summary (40–60 words) for AEO/GEO.
 */

export const site = {
  url: "https://tarangsachaniya.com",
  name: "Tarang Sachaniya",
  handle: "tarang.dev",
  locale: "en_IN",
};

export const person = {
  name: "Tarang Sachaniya",
  first: "Tarang",
  jobTitle: "Full-stack developer",
  // TODO(tarang): "Co-founder" vs "Founder & CEO"
  title: "Co-founder, Priinteve Innovations",
  city: "Ahmedabad",
  region: "Gujarat",
  country: "India",
  timezone: "Asia/Kolkata",
  email: "tarangsachaniya8@gmail.com",
  // TODO(tarang): confirm which number is WhatsApp
  whatsapp: "919662070751",
  whatsappLabel: "+91 96620 70751",
  oneLiner:
    "Full-stack developer (backend lean) in Ahmedabad, India. Co-founder of Priinteve Innovations.",
  summary:
    "Tarang Sachaniya is a full-stack developer based in Ahmedabad, India, with a backend lean: Node.js, TypeScript, Bun, Hono, Next.js, PostgreSQL and Laravel. He co-founded Priinteve Innovations LLP, where he builds an on-demand printing network, NFC digital business cards, QR restaurant ordering and tools for print shops and salons.",
  knowsAbout: [
    "Node.js", "TypeScript", "Bun", "Hono", "Next.js", "React", "PostgreSQL",
    "Drizzle ORM", "Laravel", "PHP", "MongoDB", "Redis", "REST API design",
    "Payment integration (Razorpay)", "NFC", "Linux server administration",
  ],
  sameAs: [
    "https://github.com/tarangsachaniya",
    "https://www.linkedin.com/in/tarang-sachaniya/",
    "https://instagram.com/tarangsachaniya",
    "https://www.npmjs.com/package/otp-forge",
  ],
  socials: [
    { label: "GitHub", href: "https://github.com/tarangsachaniya", cmd: "gh" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/tarang-sachaniya/", cmd: "in" },
    { label: "Instagram", href: "https://instagram.com/tarangsachaniya", cmd: "ig" },
  ],
  status: "Building Priinteve · open to freelance builds",
};

export const org = {
  name: "Priinteve Innovations LLP",
  short: "Priinteve",
  url: "https://priinteve.com",
  description:
    "Ahmedabad-based company building on-demand printing, NFC digital cards and software for small businesses.",
};

/* ───────────────────────────── story ───────────────────────────── */

export interface Chapter {
  n: string;
  year: string;
  title: string;
  where: string;
  story: string;
  learned: string[];
  made: string[];
  /** terminal-style one-line commit message */
  commit: string;
}

export const chapters: Chapter[] = [
  {
    n: "01",
    year: "2021",
    title: "Hello, world.",
    where: "LJ University · B.E. Computer Science",
    commit: "init: first web pages, mostly broken",
    story:
      "Started computer engineering and wrote my first web pages, mostly by breaking them. Outside class I ran LFA Magazine, first as marketing head and then as president, and learned that shipping on a deadline isn't only a code problem.",
    learned: ["HTML, CSS, JavaScript", "Programming fundamentals", "Leading a team of volunteers"],
    made: ["Class projects", "Two years of magazine issues", "Carpe Diem sports meet (led twice)"],
  },
  {
    n: "02",
    year: "2023",
    title: "Data, sensors and a first job.",
    where: "Prime Apps Infotech · Intern",
    commit: "feat: first users ever",
    story:
      "Python pulled me in through data: a COVID-19 analysis that taught me cleaning data is most of the job. Then hardware, an attendance system that checked a fingerprint and a face. In July I joined Prime Apps Infotech as an intern, and my code started having users.",
    learned: ["Python, Pandas, scikit-learn", "OpenCV and sensor wiring", "Laravel, Git, code review"],
    made: ["COVID-19 data analysis", "Smart Attendance System"],
  },
  {
    n: "03",
    year: "2024",
    title: "Production is a different teacher.",
    where: "Prime Apps Infotech · Backend Developer",
    commit: "perf: mysql queries 40%+ faster",
    // TODO(tarang): confirm Hackovate year
    story:
      "Six months in, I moved to a full-time backend role. Real traffic, real third parties. I integrated Sportradar feeds, built REST APIs in Laravel and Node, and cut MySQL query times by more than 40%. At college I co-ran Hackovate, a 36-hour AI hackathon with 200+ participants.",
    learned: ["API design and versioning", "Query plans and indexes", "MERN end to end"],
    made: ["Production REST APIs", "Sportradar integrations", "Hackovate LJ (tech lead)"],
  },
  {
    n: "04",
    // TODO(tarang): confirm founding year (old site said 2024)
    year: "2025",
    title: "Starting something.",
    where: "Priinteve Innovations LLP · Co-founder",
    commit: "feat: priinteve innovations llp",
    story:
      "Graduated, and with a co-founder started Priinteve Innovations to fix how small businesses order printing, and then to build the software they kept asking for. Shipped Universal Brew for a client and published my first npm package.",
    learned: ["Pricing and unit economics", "Next.js App Router and ISR", "Razorpay, Resend, Cloudinary"],
    made: ["Universal Brew", "otp-forge on npm", "Priinteve Cards"],
  },
  {
    n: "05",
    year: "2026",
    title: "Systems, not pages.",
    where: "Priinteve · full-time",
    commit: "refactor: five apps, one api",
    // TODO(tarang): confirm framing of the Prime Apps exit
    story:
      "Wrapped up at Prime Apps in July and went full-time on Priinteve. The work is systems now: five apps on one Bun API, an allocation algorithm that balances profit, fairness and delivery time across printers, desktop and Android apps, and an NFC terminal on an ESP32.",
    learned: ["Bun, Hono, Drizzle", "Linux, Nginx, Docker on VPS", "Allocation algorithms", "ESP32 and NFC"],
    made: ["Priinteve print network", "Priinteve Menu", "Zerox Buddy", "Salonly", "Client websites"],
  },
];

/* ───────────────────────────── work ───────────────────────────── */

export type Kind = "Product" | "Client" | "Open source" | "Early work";
export type Status = "Live" | "Pre-launch" | "Shipped" | "Concept" | "Archived";
export type Platform = "Web" | "Android" | "iOS" | "Windows" | "npm" | "Hardware";

export interface Shot {
  src: string;
  alt: string;
  /** frame to draw around it */
  frame: "browser" | "phone" | "window" | "none";
  w: number;
  h: number;
}

export interface Work {
  slug: string;
  name: string;
  kind: Kind;
  status: Status;
  year: string;
  role: string;
  /** one line, for lists */
  what: string;
  /** answer-first, 40–60 words, for the case-study page top */
  summary: string;
  platforms: Platform[];
  stack: string[];
  href?: string;
  domain?: string;
  repo?: string;
  shots: Shot[];
  /** the four beats */
  problem: string;
  constraints: string[];
  build: string[];
  learned: string[];
  facts: { k: string; v: string }[];
  faq: { q: string; a: string }[];
  /** schema.org type for JSON-LD */
  schema: "SoftwareApplication" | "WebApplication" | "MobileApplication" | "CreativeWork" | "SoftwareSourceCode";
  appCategory?: string;
  featured?: boolean;
  /** one hue (deg) for the theme accents on this project */
  hue: number;
}

const s = (src: string, alt: string, frame: Shot["frame"] = "browser", w = 1568, h = 731): Shot => ({ src, alt, frame, w, h });

export const work: Work[] = [
  {
    slug: "priinteve-print-network",
    name: "Priinteve Print Network",
    kind: "Product",
    status: "Pre-launch",
    year: "2025",
    role: "Co-founder · architecture, backend, most of the frontend",
    what: "On-demand printing with an invisible vendor network",
    summary:
      "Priinteve is an on-demand printing platform from Ahmedabad. Businesses order business cards, marketing kits, packaging and banners online; each order is quietly routed to a quality-checked local printer. Tarang designed the system as five apps on one Bun and Hono API, plus the order-allocation algorithm.",
    platforms: ["Web", "Android", "iOS"],
    stack: ["Bun", "Hono", "Drizzle", "PostgreSQL", "Redis", "Next.js", "Cloudflare R2", "Razorpay", "FCM", "Resend", "Nginx"],
    href: "https://priinteve.com",
    domain: "priinteve.com",
    shots: [
      s("/shots/priinteve-home.jpg", "Priinteve homepage: Premium prints, made for your brand"),
      s("/shots/priinteve-web.avif", "Priinteve product catalogue", "browser", 1280, 800),
    ],
    problem:
      "Small businesses in Indian cities still order printing over phone calls and WhatsApp, with no clear prices and no tracking. Local print shops have the machines but not the online demand.",
    constraints: [
      "Customers see one brand; printers must never see customer names or addresses.",
      "Orders run 25 to 1,000 pieces, so quantity changes which printer makes sense.",
      "Launch in one city with 30–50 printers, then expand across Gujarat.",
      "A small team: the architecture has to be operable by two people.",
    ],
    build: [
      "Five surfaces (customer web, mobile app, admin panel, printer portal, driver app) on one Bun + Hono API with four isolated namespaces.",
      "PostgreSQL with Drizzle, Redis for web sessions, Cloudflare R2 for artwork files, Razorpay for payments, FCM and Resend for notifications.",
      "Admin and printer routes sit behind Nginx with IP allow-listing.",
      "An allocation score per order: profit 50%, fair job distribution 30%, delivery distance 20%, min-max normalised across eligible printers, with a no-loss delivery guard and a cold-start rule.",
    ],
    learned: [
      "Separate namespaces in one API beat five microservices at this size.",
      "Fairness has to be designed in; a pure profit score starves new printers.",
      "Writing the PRD and architecture doc first saved more time than any framework choice.",
    ],
    facts: [
      { k: "Surfaces", v: "Customer web, mobile app, admin, printer portal, driver app" },
      { k: "API", v: "One Bun + Hono server, four namespaces" },
      { k: "Allocation weights", v: "Profit 50 · Fairness 30 · Distance 20" },
      { k: "Order size", v: "25–1,000 pieces" },
      { k: "Status", v: "Pre-launch, Ahmedabad first" },
    ],
    faq: [
      { q: "What is Priinteve?", a: "An online custom-printing service: upload artwork, pick paper and finish, and get business cards, marketing material, packaging or banners delivered, produced by a network of local print partners." },
      { q: "Who built the Priinteve platform?", a: "Tarang Sachaniya, co-founder of Priinteve Innovations LLP, designed the architecture and built most of the backend and frontend." },
      { q: "What tech stack does Priinteve use?", a: "Bun and Hono for the API, PostgreSQL with Drizzle ORM, Redis, Cloudflare R2, Razorpay, FCM, Resend and Next.js, behind Nginx." },
    ],
    schema: "WebApplication",
    appCategory: "BusinessApplication",
    featured: true,
    hue: 140,
  },
  {
    slug: "priinteve-cards",
    name: "Priinteve Cards",
    kind: "Product",
    status: "Live",
    year: "2025",
    role: "Product, full-stack",
    what: "NFC and QR digital business cards",
    summary:
      "Priinteve Cards is an NFC and QR digital business card platform. Tap a physical card or scan its QR and the recipient gets a live profile with contact details, socials and a gallery, with no app to install. Tarang built the platform, from the setup wizard to the public card pages.",
    platforms: ["Web"],
    stack: ["Next.js", "MongoDB", "Cloudinary", "Razorpay", "Resend", "NFC"],
    href: "https://cards.priinteve.com",
    domain: "cards.priinteve.com",
    shots: [s("/shots/priinteve-cards.avif", "Priinteve Cards homepage", "browser", 1280, 800)],
    problem:
      "Paper business cards go out of date the day you change a number, and most digital-card apps make the recipient install something.",
    constraints: [
      "The recipient must need nothing: no app, no account.",
      "The physical NFC card is printed and encoded by Priinteve, so the URL on the chip can never change.",
      "Card owners edit their own profile without breaking shared links.",
    ],
    build: [
      "The chip stores a permanent URL to a public profile page; the page reads the latest data.",
      "Public pages use incremental static regeneration with a two-hour revalidate, so they stay fast and cheap.",
      "A field library with drag-to-reorder and per-field visibility, four gallery layouts and a device-aware Save Contact.",
      "Referral wallet, plan management and expiry reminders run from an admin panel.",
    ],
    learned: [
      "Permanent URLs are a product decision, not a technical one.",
      "ISR is the right default when edits are rare and reads are constant.",
      "Save Contact behaves differently on iOS and Android; test on real phones.",
    ],
    facts: [
      { k: "Access", v: "NFC tap, QR scan or link" },
      { k: "Card materials", v: "Plastic, wood, metal" },
      { k: "Recipient needs", v: "Nothing to install" },
      { k: "Status", v: "Live" },
    ],
    faq: [
      { q: "What is Priinteve Cards?", a: "A digital business card you share by tapping an NFC card or scanning a QR code; the recipient sees a live profile in their browser." },
      { q: "Does the person receiving the card need an app?", a: "No. Any phone with NFC or a camera opens the profile in the browser." },
    ],
    schema: "WebApplication",
    appCategory: "BusinessApplication",
    featured: true,
    hue: 190,
  },
  {
    slug: "priinteve-menu",
    name: "Priinteve Menu",
    kind: "Product",
    status: "Live",
    year: "2025",
    role: "Product, full-stack",
    what: "QR table ordering for restaurants",
    summary:
      "Priinteve Menu is a QR table-ordering system for restaurants. Diners scan the code on their table, order from their own phone and pay how they like, while the kitchen follows one live board from placed to preparing to ready. Tarang built the ordering flow and the real-time kitchen board.",
    platforms: ["Web"],
    stack: ["Next.js", "Node.js", "PostgreSQL", "Socket.IO"],
    href: "https://menu.priinteve.com",
    domain: "menu.priinteve.com",
    shots: [s("/shots/priinteve-menu.avif", "Priinteve Menu homepage: table-side ordering", "browser", 1280, 800)],
    problem:
      "At peak hours, waiters become the bottleneck: orders wait to be taken, then wait again to reach the kitchen.",
    constraints: [
      "Diners won't install an app to order one meal.",
      "The kitchen needs one screen it can trust under pressure.",
      "Invoices have to carry GST and FSSAI details.",
    ],
    build: [
      "A printable QR per table that opens the menu for that table.",
      "A live kitchen board over WebSockets: placed → preparing → ready.",
      "Menu, stock and prices update live on save; peak-hour demotions push slow dishes down.",
    ],
    learned: [
      "Real-time UIs need a clear source of truth before they need sockets.",
      "Restaurant staff judge software in the first rush hour, not the demo.",
    ],
    facts: [
      { k: "Per-order fees", v: "0%" },
      { k: "Kitchen states", v: "Placed → Preparing → Ready" },
      { k: "Status", v: "Live" },
    ],
    faq: [
      { q: "What is Priinteve Menu?", a: "QR code table ordering for restaurants, with a live kitchen board and GST-ready invoices." },
    ],
    schema: "WebApplication",
    appCategory: "BusinessApplication",
    featured: true,
    hue: 32,
  },
  {
    slug: "zerox-buddy",
    name: "Zerox Buddy",
    kind: "Product",
    status: "Live",
    year: "2026",
    role: "Product, full-stack, desktop",
    // TODO(tarang): confirm description, stack and Windows download link
    what: "Web + Windows desktop app for print and xerox shops",
    summary:
      "Zerox Buddy is a web dashboard paired with a Windows desktop app for neighbourhood print and xerox shops. The desktop client sits next to the shop's printer, connecting online orders to the machine on the counter. Tarang built both the web app and the desktop client as part of Priinteve's printer-side tooling.",
    platforms: ["Web", "Windows"],
    stack: [],
    href: "https://zerox.priinteve.com",
    domain: "zerox.priinteve.com",
    shots: [],
    problem: "Print shops run on a PC wired to a printer. A web dashboard alone can't reach the printer on the counter.",
    constraints: ["Must run on the shop's existing Windows PC.", "Shop owners aren't technical; setup has to be one installer."],
    build: ["A web dashboard for jobs and settings.", "A Windows desktop client that talks to the local printer."],
    learned: ["Desktop apps bring back problems the web solved: updates, drivers, installers."],
    facts: [
      { k: "Platforms", v: "Web, Windows desktop" },
      { k: "Status", v: "Live" },
    ],
    faq: [{ q: "What is Zerox Buddy?", a: "A web and Windows desktop tool for print and xerox shops, connecting online jobs to the shop's printer." }],
    schema: "SoftwareApplication",
    appCategory: "BusinessApplication",
    hue: 220,
  },
  {
    slug: "salonly",
    name: "Salonly",
    kind: "Product",
    status: "Live",
    year: "2026",
    role: "Product, full-stack, Android",
    // TODO(tarang): confirm description, stack and Play Store link
    what: "Bookings and management for salons, with an Android app",
    summary:
      "Salonly is a salon booking and management platform from Priinteve, available on the web and as an Android app. Salon owners manage appointments and services; customers book without calling. Tarang built the web platform and the Android companion app.",
    platforms: ["Web", "Android"],
    stack: [],
    href: "https://salon.priinteve.com",
    domain: "salon.priinteve.com",
    shots: [],
    problem: "Most small salons still take bookings by phone and keep them in a notebook.",
    constraints: ["Owners run the business from their phone.", "Customers should book in under a minute."],
    build: ["Web platform for bookings and services.", "Android app for owners on the go."],
    learned: ["Mobile-first means designing for one thumb, not a smaller screen."],
    facts: [
      { k: "Platforms", v: "Web, Android" },
      { k: "Status", v: "Live" },
    ],
    faq: [{ q: "What is Salonly?", a: "A salon booking and management platform with a web app and an Android app." }],
    schema: "MobileApplication",
    appCategory: "LifestyleApplication",
    hue: 320,
  },
  {
    slug: "universal-brew",
    name: "Universal Brew",
    kind: "Client",
    status: "Live",
    year: "2025",
    role: "Full-stack",
    what: "Coffee e-commerce, end to end",
    summary:
      "Universal Brew is a coffee e-commerce store built end to end by Tarang Sachaniya: product discovery, Razorpay checkout, order management and a mobile-first storefront on Next.js, TypeScript and PostgreSQL.",
    platforms: ["Web"],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "shadcn/ui", "PostgreSQL", "Razorpay"],
    href: "https://universalbrew.shop",
    domain: "universalbrew.shop",
    shots: [s("/shots/universal-brew.avif", "Universal Brew homepage", "browser", 1280, 800)],
    problem: "A coffee brand needed to sell online directly, with payments and orders it could manage itself.",
    constraints: ["Most buyers arrive on mid-range Android phones.", "The owner manages orders without a developer."],
    build: [
      "Next.js storefront with server-rendered product pages.",
      "Razorpay checkout and an order-management back office on PostgreSQL.",
    ],
    learned: ["E-commerce is mostly edge cases: failed payments, partial stock, address typos."],
    facts: [
      { k: "Payments", v: "Razorpay" },
      { k: "Status", v: "Live" },
    ],
    faq: [{ q: "Who built Universal Brew?", a: "Tarang Sachaniya built the store end to end as a client project." }],
    schema: "CreativeWork",
    featured: true,
    hue: 25,
  },
  {
    slug: "royal-timber",
    name: "Royal Timber",
    kind: "Client",
    status: "Shipped",
    year: "2026",
    role: "Design and build",
    // TODO(tarang): add live URL, stack, screenshot
    what: "Website for a plywood supplier",
    summary:
      "Royal Timber is a website Tarang Sachaniya designed and built for a plywood supplier and wholesaler, presenting its product range for dealers and contractors.",
    platforms: ["Web"],
    stack: [],
    shots: [],
    problem: "A plywood wholesaler needed a credible web presence that shows its range to dealers.",
    constraints: ["Catalogue-first; buyers want grades and specs fast."],
    build: ["A catalogue-led marketing site."],
    learned: ["B2B buyers skim specs; design for scanning."],
    facts: [{ k: "Type", v: "Client website" }],
    faq: [],
    schema: "CreativeWork",
    hue: 35,
  },
  {
    slug: "quantivo",
    name: "Quantivo",
    kind: "Client",
    status: "Shipped",
    year: "2026",
    role: "Development",
    // TODO(tarang): add live URL, stack, screenshot
    what: "Website for a digital marketing agency",
    summary: "Quantivo is a website Tarang Sachaniya developed for a digital marketing agency, working as its independent development partner.",
    platforms: ["Web"],
    stack: [],
    shots: [],
    problem: "An agency needed a site that sells its own services as well as it sells its clients'.",
    constraints: ["Agency-grade polish on a fast timeline."],
    build: ["A marketing site with case-study structure."],
    learned: ["Agencies are their own toughest client."],
    facts: [{ k: "Type", v: "Client website" }],
    faq: [],
    schema: "CreativeWork",
    hue: 260,
  },
  {
    slug: "earthora",
    name: "EarthOra",
    kind: "Client",
    status: "Concept",
    year: "2026",
    role: "Concept and front-end",
    what: "Cashew brand storefront, mobile concept",
    summary:
      "EarthOra is a mobile-first visual concept for a cashew brand's store, where the hero is a packet you tear open as you scroll. It was shipped as an isolated route so the live store stayed untouched.",
    platforms: ["Web"],
    stack: ["React"],
    shots: [],
    problem: "A premium cashew brand looked like every other dry-fruit store on mobile.",
    constraints: ["Must not disturb the live store.", "Mobile first."],
    build: ["A scroll-driven packaging tear-open hero on an isolated route."],
    learned: ["Motion concepts sell best as a working prototype, not a deck."],
    facts: [{ k: "Type", v: "Visual concept" }],
    faq: [],
    schema: "CreativeWork",
    hue: 45,
  },
  {
    slug: "otp-forge",
    name: "otp-forge",
    kind: "Open source",
    status: "Shipped",
    year: "2025",
    role: "Author",
    what: "Zero-dependency OTP library on npm",
    summary:
      "otp-forge is a zero-dependency TypeScript library on npm for generating and verifying alphanumeric one-time passwords. It works in Node.js, Next.js, React Native and the browser. It was Tarang Sachaniya's first published npm package.",
    platforms: ["npm"],
    stack: ["TypeScript", "npm"],
    href: "https://www.npmjs.com/package/otp-forge",
    domain: "npmjs.com/package/otp-forge",
    shots: [],
    problem: "Every project re-wrote the same OTP helper, slightly differently each time.",
    constraints: ["Zero dependencies.", "Runs everywhere JavaScript runs."],
    build: ["Typed generator and verifier with flexible parameter bundling."],
    learned: ["Publishing teaches API design faster than consuming APIs does."],
    facts: [
      { k: "Dependencies", v: "0" },
      { k: "Runtimes", v: "Node.js, Next.js, React Native, browser" },
    ],
    faq: [{ q: "What is otp-forge?", a: "A zero-dependency TypeScript npm package for generating and verifying alphanumeric OTPs." }],
    schema: "SoftwareSourceCode",
    hue: 0,
  },
  {
    slug: "smart-attendance-system",
    name: "Smart Attendance System",
    kind: "Early work",
    status: "Archived",
    year: "2024",
    role: "Hardware and software",
    what: "Fingerprint + face-verified attendance",
    summary:
      "An IoT attendance system pairing a fingerprint sensor with OpenCV facial verification, so nobody can mark a friend present.",
    platforms: ["Hardware"],
    stack: ["Python", "OpenCV", "IoT"],
    repo: "https://github.com/tarangsachaniya/smart-attendance-system",
    shots: [],
    problem: "Roll calls waste class time and proxies are easy.",
    constraints: ["Cheap hardware.", "Two factors without slowing the queue."],
    build: ["Fingerprint sensor plus camera-based face check in Python."],
    learned: ["Hardware projects fail at the wiring, not the algorithm."],
    facts: [{ k: "Factors", v: "Fingerprint + face" }],
    faq: [],
    schema: "SoftwareSourceCode",
    hue: 160,
  },
  {
    slug: "covid-19-data-analysis",
    name: "COVID-19 Data Analysis",
    kind: "Early work",
    status: "Archived",
    year: "2023",
    role: "Solo",
    what: "Cleaning, plotting and predicting",
    summary: "A first data-science project: cleaning, visualising and modelling COVID-19 datasets with Python, Pandas and scikit-learn.",
    platforms: ["Web"],
    stack: ["Python", "Pandas", "Matplotlib", "scikit-learn"],
    repo: "https://github.com/tarangsachaniya/covid_data_analysis",
    shots: [],
    problem: "Wanted to understand the numbers everyone was quoting.",
    constraints: ["Messy public data."],
    build: ["Cleaning pipeline, charts and simple predictive models."],
    learned: ["Most of data science is cleaning; the model is the easy part."],
    facts: [{ k: "Tools", v: "Python, Pandas, scikit-learn" }],
    faq: [],
    schema: "SoftwareSourceCode",
    hue: 280,
  },
];

export const workBySlug = (slug: string) => work.find((w) => w.slug === slug);
export const kinds: Kind[] = ["Product", "Client", "Open source", "Early work"];

/* ───────────────────────────── services ───────────────────────────── */

export const services = {
  summary:
    "Tarang Sachaniya builds web apps, APIs and SaaS products for startups and small businesses, from Ahmedabad for clients anywhere. Typical work: Next.js and React front ends, Node.js, Bun or Laravel back ends, PostgreSQL databases, payments, and deployment on Linux servers or Vercel.",
  offers: [
    { title: "Web apps and SaaS", body: "Dashboards, booking systems, ordering flows and admin panels, built on Next.js with a real backend.", tags: ["Next.js", "React", "PostgreSQL"] },
    { title: "APIs and backends", body: "REST APIs, auth, queues, payments and third-party integrations that hold up under real traffic.", tags: ["Node.js", "Bun", "Hono", "Laravel"] },
    { title: "E-commerce", body: "Stores with Razorpay checkout, order management and fast mobile product pages.", tags: ["Next.js", "Razorpay"] },
    { title: "Rescue and performance", body: "Slow queries, broken deploys, a codebase nobody wants to touch. I find the bottleneck and fix it.", tags: ["MySQL", "PostgreSQL", "Linux"] },
  ],
  process: [
    { n: "01", t: "Call", b: "30 minutes on what you're building and what's in the way." },
    { n: "02", t: "Spec", b: "A short written plan: scope, stack, milestones. You approve before code." },
    { n: "03", t: "Build", b: "Weekly demos on a live preview link. No black box." },
    { n: "04", t: "Ship", b: "Deploy, hand over docs and access. Support after launch." },
  ],
  faq: [
    { q: "Is Tarang Sachaniya available for freelance work?", a: "Yes. He takes freelance web, API and SaaS projects alongside building Priinteve. WhatsApp is the fastest way to reach him." },
    { q: "Do you work with clients outside Ahmedabad?", a: "Yes. Most work is remote, with clients anywhere; in-person meetings are possible in Ahmedabad and Gujarat." },
    { q: "Which tech stack do you use?", a: "Usually Next.js and React on the front end, Node.js, Bun with Hono or Laravel on the back end, PostgreSQL, and Razorpay for payments in India." },
    { q: "How do projects start?", a: "With a short call, then a written spec with scope and milestones that you approve before any code is written." },
  ],
};

/* ───────────────────────────── uses ───────────────────────────── */

// TODO(tarang): fill in your real hardware — these sections render empty items as "ask me".
export const uses = {
  summary: "The tools Tarang Sachaniya uses every day to build software: editor, terminal, AI assistants, languages and infrastructure.",
  groups: [
    { label: "Editor and terminal", items: ["VS Code", "JetBrains Mono", "Git + GitHub", "Postman"] },
    { label: "AI", items: ["Claude and Claude Code for design docs, reviews and pair programming"] },
    { label: "Daily stack", items: ["TypeScript", "Node.js", "Bun", "Hono", "Next.js", "React", "PostgreSQL", "Drizzle", "Laravel", "Tailwind CSS"] },
    { label: "Infrastructure", items: ["Linux VPS with Nginx", "Docker", "Vercel", "Cloudflare R2", "AWS EC2 and S3"] },
    { label: "Documentation", items: ["Notion for PRDs and architecture docs"] },
  ],
};

/* ───────────────────────────── now ───────────────────────────── */

export const now = {
  updated: "November 2026",
  items: [
    "Getting the Priinteve print network ready to launch in Ahmedabad.",
    "Designing auto-assignment for print orders across 30–50 partner printers.",
    "Building an NFC verification terminal on an ESP32.",
    "Taking on a few freelance builds.",
    "Rebuilding this site as a theme multiverse.",
  ],
  learning: ["Kubernetes", "Terraform", "ESP32 and NFC", "AI agents", "React Native"],
};

/* ───────────────────────────── notes ───────────────────────────── */

export interface Note {
  slug: string;
  title: string;
  date: string;
  summary: string;
  body: { h?: string; p: string }[];
}

export const notes: Note[] = [
  {
    slug: "five-apps-one-api",
    title: "Five apps, one API: how Priinteve is wired",
    date: "2026-11-03",
    summary:
      "Why the Priinteve print network runs a customer web app, a mobile app, an admin panel, a printer portal and a driver app on a single Bun and Hono API with isolated namespaces, instead of microservices.",
    body: [
      { p: "Priinteve has five front ends and two people. That fact decided most of the architecture." },
      { h: "One server, four namespaces", p: "The API is a single Bun process running Hono, split into web, app, admin and printer namespaces. Each namespace has its own auth rules and its own route prefix, so a printer token can never call an admin route. One deploy, one log stream, one database connection pool." },
      { h: "Why not microservices", p: "Microservices solve team-scaling problems. We don't have a team-scaling problem yet; we have a shipping problem. Namespaces give us the isolation we actually need without the network hops, the service discovery and the distributed debugging." },
      { h: "Privacy by design", p: "Printers see an order ID and an area, never the customer's name or address. That rule lives in the printer namespace's serializers, not in the UI, so no front-end bug can leak it." },
      { h: "What I'd change", p: "The planning docs disagreed for a while about hosting (a managed container platform versus one VPS behind Nginx). Pick the operational model first; the code adapts either way." },
    ],
  },
  {
    slug: "building-a-theme-multiverse",
    title: "Building a theme multiverse for my portfolio",
    date: "2026-11-03",
    summary:
      "How this site serves one set of content through five themes (Paper, VS Code, Terminal, Keyboard and Chat) without hurting SEO: static HTML first, skins on top, theme as a preference rather than a URL.",
    body: [
      { p: "Most themed portfolios pick one metaphor and commit. I wanted all of the places I actually work: the editor, the terminal, the keyboard and the AI chat window." },
      { h: "Content first, skins second", p: "Every page is written once as plain data and rendered to static HTML. Themes only change presentation. A crawler, a screen reader and a recruiter on a slow phone all get the same facts." },
      { h: "Theme is a preference, not a URL", p: "Switching themes never changes the address, so there are no duplicate pages to canonicalise. The choice is stored locally and applied before first paint." },
      { h: "Every command has a button", p: "The terminal accepts typed commands, but every command is also a clickable chip. Novelty should never be a gate." },
    ],
  },
];

/* ───────────────────────────── nav ───────────────────────────── */

export const nav = [
  { href: "/", label: "Home", file: "README.md", key: "Esc", cmd: "cd ~", prompt: "Who is Tarang?" },
  { href: "/about/", label: "Story", file: "story.md", key: "F1", cmd: "cat story.md", prompt: "Tell me his story" },
  { href: "/work/", label: "Work", file: "work/", key: "F2", cmd: "ls ./work", prompt: "What has he built?" },
  { href: "/services/", label: "Services", file: "services.md", key: "F3", cmd: "man services", prompt: "Can I hire him?" },
  { href: "/uses/", label: "Uses", file: "uses.json", key: "F4", cmd: "cat uses.json", prompt: "What does he use?" },
  { href: "/now/", label: "Now", file: "now.log", key: "F5", cmd: "tail now.log", prompt: "What is he doing now?" },
  { href: "/notes/", label: "Notes", file: "notes/", key: "F6", cmd: "ls ./notes", prompt: "Has he written anything?" },
  { href: "/contact/", label: "Contact", file: "contact.sh", key: "↵", cmd: "./contact.sh", prompt: "How do I reach him?" },
] as const;
