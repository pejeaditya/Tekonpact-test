import type { LucideIcon } from "lucide-react"
import {
  BarChart3,
  Bot,
  Brain,
  BrainCircuit,
  Building2,
  Code2,
  Compass,
  DatabaseZap,
  Gem,
  GraduationCap,
  Layers3,
  Lightbulb,
  Map,
  MessagesSquare,
  Rocket,
  Share2,
  ShieldCheck,
  Workflow,
} from "lucide-react"

export const company = {
  name: "Teknopact Technologies W.L.L",
  shortName: "Teknopact",
  email: "hello@teknopact.com",
  location: "Manama, Bahrain",
  tagline: "Customized digital solutions for teams ready to move faster.",
  description:
    "At Teknopact Technologies, we are your experts for customized digital solutions. We combine innovation, strategy, and rapid software development so your tech is sorted from idea to scale.",
}

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Product", href: "#products" },
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
]

/** Placeholder screenshots for horizontal “deck” under each product mockup */
const stockScreens = {
  dashboard: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
  analytics: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",
  workspace: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
  team: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80",
  mobile: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=900&q=80",
  classroom: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80",
  lecture: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=900&q=80",
  library: "https://images.unsplash.com/photo-1524996297572-7b3b4a5a8c9d?auto=format&fit=crop&w=900&q=80",
  grad: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80",
  code: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=80",
} as const

export type ProductClusterSubItem = {
  id: string
  title: string
  description: string
  icon: LucideIcon
  /** Key in DashboardPreview `productScreens` */
  dashboardVariant: string
  sector?: string
  audiences?: string[]
  deckImages: string[]
}

export type ProductCluster = {
  id: string
  title: string
  icon: LucideIcon
  products: ProductClusterSubItem[]
}

export const productClusters: ProductCluster[] = [
  {
    id: "intelligence",
    title: "Intelligence",
    icon: BrainCircuit,
    products: [
      {
        id: "intelligence-core",
        title: "Intelligence",
        description:
          "Turn scattered business signals into clear product and operational decisions with a unified signal workspace.",
        icon: BrainCircuit,
        dashboardVariant: "Intelligence",
        deckImages: [stockScreens.dashboard, stockScreens.analytics, stockScreens.workspace, stockScreens.mobile],
      },
    ],
  },
  {
    id: "design-systems",
    title: "Design Systems",
    icon: Gem,
    products: [
      {
        id: "design-systems-core",
        title: "Design Systems",
        description:
          "Create consistent product experiences with reusable components, tokens, and brand rules your teams can trust.",
        icon: Gem,
        dashboardVariant: "Design Systems",
        deckImages: [stockScreens.workspace, stockScreens.team, stockScreens.mobile, stockScreens.dashboard],
      },
    ],
  },
  {
    id: "automation",
    title: "Automation",
    icon: Bot,
    products: [
      {
        id: "automation-core",
        title: "Automation",
        description:
          "Remove repetitive work with reliable workflows, integrations, and internal tools that keep quality high.",
        icon: Bot,
        dashboardVariant: "Automation",
        deckImages: [stockScreens.dashboard, stockScreens.analytics, stockScreens.workspace, stockScreens.code],
      },
    ],
  },
  {
    id: "infrastructure",
    title: "Infrastructure",
    icon: DatabaseZap,
    products: [
      {
        id: "infrastructure-core",
        title: "Infrastructure",
        description:
          "Build cloud-ready foundations that support growth, resilience, and observability from the first deploy.",
        icon: DatabaseZap,
        dashboardVariant: "Infrastructure",
        deckImages: [stockScreens.workspace, stockScreens.analytics, stockScreens.dashboard, stockScreens.team],
      },
    ],
  },
  {
    id: "optimization",
    title: "Optimization",
    icon: Rocket,
    products: [
      {
        id: "optimization-core",
        title: "Optimization",
        description:
          "Improve performance, delivery velocity, and conversion with focused engineering and measurable experiments.",
        icon: Rocket,
        dashboardVariant: "Optimization",
        deckImages: [stockScreens.analytics, stockScreens.dashboard, stockScreens.mobile, stockScreens.team],
      },
    ],
  },
  {
    id: "education",
    title: "Education sector",
    icon: GraduationCap,
    products: [
      {
        id: "intangible",
        title: "Intangible",
        description:
          "One AI-powered education platform connecting students, colleges, professors, and companies. Intangible goes beyond fixing hiring by rebuilding how education works.",
        icon: GraduationCap,
        dashboardVariant: "Intangible",
        sector: "AI and Education",
        audiences: ["Students", "Colleges", "Professors", "Companies"],
        deckImages: [stockScreens.classroom, stockScreens.lecture, stockScreens.library, stockScreens.mobile, stockScreens.team],
      },
      {
        id: "cognition-lab",
        title: "Cognition Lab",
        description:
          "Adaptive learning paths and skills diagnostics that react to how each learner performs in real time.",
        icon: Brain,
        dashboardVariant: "Cognition Lab",
        sector: "AI and Education",
        audiences: ["Students", "Professors"],
        deckImages: [stockScreens.lecture, stockScreens.classroom, stockScreens.analytics, stockScreens.mobile],
      },
      {
        id: "skill-atlas",
        title: "Skill Atlas",
        description:
          "A living map of competencies, courses, and credentials so institutions can align curriculum with industry demand.",
        icon: Map,
        dashboardVariant: "Skill Atlas",
        sector: "AI and Education",
        audiences: ["Colleges", "Companies"],
        deckImages: [stockScreens.library, stockScreens.dashboard, stockScreens.classroom, stockScreens.team],
      },
      {
        id: "mentorflow",
        title: "Mentorflow",
        description:
          "Office hours, feedback loops, and mentor matching that keeps guidance structured and measurable at scale.",
        icon: MessagesSquare,
        dashboardVariant: "Mentorflow",
        sector: "AI and Education",
        audiences: ["Professors", "Students"],
        deckImages: [stockScreens.team, stockScreens.classroom, stockScreens.mobile, stockScreens.workspace],
      },
      {
        id: "campus-bridge",
        title: "Campus Bridge",
        description:
          "Operations layer for timetables, venues, and student services with a calm dashboard for administrators.",
        icon: Building2,
        dashboardVariant: "Campus Bridge",
        sector: "AI and Education",
        audiences: ["Colleges", "Students"],
        deckImages: [stockScreens.workspace, stockScreens.dashboard, stockScreens.team, stockScreens.mobile],
      },
      {
        id: "talent-synapse",
        title: "Talent Synapse",
        description:
          "Placement pipelines and company projects with transparent milestones between campuses and hiring teams.",
        icon: Share2,
        dashboardVariant: "Talent Synapse",
        sector: "AI and Education",
        audiences: ["Companies", "Students", "Colleges"],
        deckImages: [stockScreens.team, stockScreens.analytics, stockScreens.grad, stockScreens.workspace],
      },
    ],
  },
]

export const productItems = [
  {
    title: "Intelligence",
    description: "Turn scattered business signals into clear product and operational decisions.",
    icon: BrainCircuit,
  },
  {
    title: "Design Systems",
    description: "Create consistent product experiences with reusable, scalable interface foundations.",
    icon: Gem,
  },
  {
    title: "Automation",
    description: "Remove repetitive work with reliable workflows, integrations, and internal tools.",
    icon: Bot,
  },
  {
    title: "Infrastructure",
    description: "Build cloud-ready foundations that support growth, resilience, and observability.",
    icon: DatabaseZap,
  },
  {
    title: "Optimization",
    description: "Improve performance, delivery velocity, and conversion with focused engineering.",
    icon: Rocket,
  },
  {
    title: "Intangible",
    sector: "AI and Education",
    description:
      "One AI-powered education platform connecting students, colleges, professors, and companies. Intangible goes beyond fixing hiring by rebuilding how education works.",
    audiences: ["Students", "Colleges", "Professors", "Companies"],
    icon: GraduationCap,
  },
]

export const stats = [
  { value: "40+", label: "digital products delivered" },
  { value: "3x", label: "faster discovery to launch" },
  { value: "99.9%", label: "uptime-first architecture target" },
]

export const features = [
  {
    title: "Strategy before software",
    description: "We shape the roadmap, risks, and success metrics before building.",
    icon: Compass,
  },
  {
    title: "Rapid product delivery",
    description: "Lean teams ship polished web apps, dashboards, and workflow tools quickly.",
    icon: Code2,
  },
  {
    title: "Automation that compounds",
    description: "Your internal operations become faster, measurable, and easier to scale.",
    icon: Workflow,
  },
  {
    title: "Reliable technology foundations",
    description: "Security, maintainability, and infrastructure decisions are built in from day one.",
    icon: ShieldCheck,
  },
]

export const steps = [
  {
    title: "Discover",
    description: "We map goals, users, workflows, and technical constraints with your team.",
    icon: Lightbulb,
  },
  {
    title: "Design and build",
    description: "We turn the plan into a polished product with fast feedback cycles.",
    icon: Layers3,
  },
  {
    title: "Launch and optimize",
    description: "We deploy, measure, improve, and support the solution as your needs evolve.",
    icon: BarChart3,
  },
]

export const pricing = [
  {
    name: "Starter",
    price: "BHD 450",
    description: "For validating a website, landing page, or internal workflow.",
    features: ["Discovery workshop", "Responsive shadcn UI", "Launch-ready handoff"],
  },
  {
    name: "Growth",
    price: "BHD 1,200",
    description: "For teams building a complete digital product or automation system.",
    features: ["Product strategy", "Custom React app", "Integrations and dashboards"],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For organizations that need dedicated engineering and architecture support.",
    features: ["Architecture planning", "Cloud infrastructure", "Ongoing optimization"],
  },
]

export const faqs = [
  {
    question: "What does Teknopact build?",
    answer:
      "We build customized digital solutions including marketing websites, dashboards, workflow automations, and software products.",
  },
  {
    question: "Is Codalien MENA part of the story?",
    answer:
      "The team messaging is inspired by Codalien MENA's innovation and rapid development focus, while this site is branded for Teknopact Technologies W.L.L.",
  },
  {
    question: "Can this become a multi-page website later?",
    answer:
      "Yes. The home page is structured so contact, blog, case studies, and service pages can be added without reworking the design system.",
  },
  {
    question: "Do you use only shadcn components?",
    answer:
      "The UI primitives come from shadcn/ui. Tailwind is used for layout, spacing, color, and responsive styling.",
  },
]

export const blogPreview = [
  {
    category: "Strategy",
    title: "How digital solutions remove operational drag",
    description: "A practical look at where custom software creates leverage.",
  },
  {
    category: "Automation",
    title: "From manual tasks to measurable workflows",
    description: "How teams can reduce repetitive work without overcomplicating tools.",
  },
  {
    category: "Engineering",
    title: "Building reliable products for fast-moving teams",
    description: "The foundations that keep modern software maintainable.",
  },
]

export const productMenuItems = productItems

export const partnerNames = ["Codalien MENA", "FluxOps", "Nexa Cloud", "Orbit Labs", "MENA Growth"]

export const testimonial = {
  quote:
    "Teknopact helped us turn a vague process problem into a focused product roadmap and a working platform our team could use immediately.",
  name: "Aisha Rahman",
  role: "Operations Director",
}

