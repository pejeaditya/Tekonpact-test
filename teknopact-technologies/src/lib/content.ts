import type { LucideIcon } from "lucide-react"
import {
  BarChart3,
  Building2,
  Car,
  Cloud,
  Factory,
  GraduationCap,
  Handshake,
  Hospital,
  Landmark,
  Layers3,
  Lightbulb,
  Link2,
  Lock,
  Network,
  Phone,
  Radio,
  Server,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Target,
  Users,
  Workflow,
  Zap,
} from "lucide-react"

export const company = {
  name: "Teknopact Technologies W.L.L",
  shortName: "Teknopact",
  tagline: "Simple Solutions, Elegant Solutions",
  email: "info@teknopact.com",
  phone: "+973 1650 1053",
  location: "Manama, Kingdom of Bahrain",
  parent: "Empact Consulting (Mantra Management Solutions W.L.L)",
  description:
    "Teknopact Technologies W.L.L is a wholly-owned subsidiary of Empact Consulting (Mantra Management Solutions W.L.L). Across the GCC and MENA, we deliver advisory, ERP, cloud, cybersecurity, and digital transformation—combining the parent group's expertise with local teams of consultants, architects, and engineers.",
  heroTitle: "Complex problems, simplified solutions.",
  heroSubtitle:
    "Our mission is to leverage cutting-edge technology and expertise to deliver tailored IT solutions that drive efficiency, foster growth, and transform businesses worldwide.",
}

export const navLinks = [
  { label: "Products", href: "/products" },
  { label: "Services", href: "/products?tab=services" },
  { label: "Case Studies", href: "/case-studies" },
]

export const stats = [
  { value: "150+", label: "years of combined industry experience" },
  { value: "200+", label: "businesses assisted across the region" },
  { value: "7", label: "countries across GCC and India" },
]

export const whyTeknopact = [
  {
    title: "Diverse market experience",
    description:
      "Experience across the entire spectrum of services and sectors, from public sector digital transformation to private enterprise platforms.",
    icon: Target,
  },
  {
    title: "Strategic engagements",
    description:
      "Executed several strategic engagements for key government and private entities focused on IT and digital transformation.",
    icon: Landmark,
  },
  {
    title: "Proven delivery",
    description:
      "Worked with 200+ businesses, assisting private and public clients to develop and deploy technological solutions.",
    icon: Handshake,
  },
  {
    title: "Regional presence",
    description:
      "Presence in 7 countries across GCC and India; offices in 5 GCC countries, Canada, and India.",
    icon: Network,
  },
  {
    title: "Satisfied clients",
    description:
      "Satisfied clients across the region, including pivotal government agencies and private enterprises.",
    icon: Sparkles,
  },
]

/** Why Teknopact — interactive accordion (same layout as sector focus) */
export const whyTeknopactAccordionItems = [
  {
    id: 1,
    title: whyTeknopact[0].title,
    description: whyTeknopact[0].description,
    imageUrl:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    title: whyTeknopact[1].title,
    description: whyTeknopact[1].description,
    imageUrl:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    title: whyTeknopact[2].title,
    description: whyTeknopact[2].description,
    imageUrl:
      "https://images.unsplash.com/photo-1521737716121-8aaf04847d81?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 4,
    title: whyTeknopact[3].title,
    description: whyTeknopact[3].description,
    imageUrl:
      "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 5,
    title: whyTeknopact[4].title,
    description: whyTeknopact[4].description,
    imageUrl:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4fae?auto=format&fit=crop&w=1200&q=80",
  },
]

export const expertisePillars = [
  {
    title: "End-to-End Support",
    description:
      "Unwavering support throughout the customer journey with comprehensive IT services for diverse technical needs.",
    icon: ShieldCheck,
  },
  {
    title: "Simplified Solutions",
    description:
      "IT services aimed to simplify processes, minimize complexity, and alleviate unnecessary burden for clients.",
    icon: Lightbulb,
  },
  {
    title: "On-time Delivery",
    description:
      "Consistently meeting deadlines with a proven track record of timely project completion.",
    icon: Zap,
  },
  {
    title: "Experienced teams",
    description:
      "Skilled programmers and domain experts staying updated with the latest technologies for continuous innovation.",
    icon: Users,
  },
]

export const offices = [
  {
    country: "Bahrain",
    address: "Bahrain Financial Harbor, East Tower, Manama",
    tel: "+973 1756 7950",
    mob: "+973 33623387",
  },
  {
    country: "Qatar",
    address: "Blue Tower, Bank Street, Doha",
    tel: "+974 4006 8400",
    mob: "+974 5590 3269",
  },
  {
    country: "United Arab Emirates",
    address: "Boulevard Plaza, Tower 1, Dubai",
    tel: "+971 4 455 8664",
  },
  {
    country: "Saudi Arabia",
    address: "Moon Tower, King Fahed Branch Road, Riyadh",
    tel: "+966 56727 5757",
  },
  {
    country: "Oman",
    address: "Oman Arab Bank Building, Muscat",
    fax: "+968 4006 8401",
  },
  {
    country: "India",
    address: "Kandiwali West, Mumbai",
    tel: "+91 983303382",
    mob: "+91 8933017777",
  },
  {
    country: "Canada",
    address: "Bathurst Street, Toronto",
    tel: "+437 979-0691",
  },
]

/** HQ Bahrain → regional offices for presence map */
export const presenceMapDots = [
  {
    start: { lat: 26.2285, lng: 50.5876, label: "Bahrain" },
    end: { lat: 25.2854, lng: 51.531, label: "Qatar" },
  },
  {
    start: { lat: 26.2285, lng: 50.5876, label: "Bahrain" },
    end: { lat: 25.2048, lng: 55.2708, label: "UAE" },
  },
  {
    start: { lat: 26.2285, lng: 50.5876, label: "Bahrain" },
    end: { lat: 24.7136, lng: 46.6753, label: "Saudi Arabia" },
  },
  {
    start: { lat: 26.2285, lng: 50.5876, label: "Bahrain" },
    end: { lat: 23.588, lng: 58.3829, label: "Oman" },
  },
  {
    start: { lat: 26.2285, lng: 50.5876, label: "Bahrain" },
    end: { lat: 19.076, lng: 72.8777, label: "India" },
  },
  {
    start: { lat: 19.076, lng: 72.8777, label: "India" },
    end: { lat: 43.6532, lng: -79.3832, label: "Canada" },
  },
]

export const sectorFocus = [
  {
    title: "Public Sector",
    description:
      "Support government and semi-government entities in digital transformation and leveraging technology solutions.",
    icon: Landmark,
  },
  {
    title: "Education",
    description: "Support educational institutions by providing digital services and provisions.",
    icon: GraduationCap,
  },
  {
    title: "Utilities",
    description:
      "Empowering utilities with cutting-edge digital solutions for enhanced efficiency and seamless service delivery.",
    icon: Zap,
  },
  {
    title: "Healthcare & Hospitals",
    description:
      "Revolutionizing healthcare through innovative digital solutions, optimizing patient care and operational efficiency.",
    icon: Hospital,
  },
  {
    title: "Telecom",
    description:
      "Transforming the telecom landscape with pioneering technology solutions, enhancing connectivity and communication experiences for all.",
    icon: Phone,
  },
  {
    title: "Automotive",
    description:
      "Accelerating automotive innovation through advanced technology solutions, shaping the future of mobility and driving experiences.",
    icon: Car,
  },
  {
    title: "Manufacturing",
    description:
      "Empowering manufacturing industries with transformative technology solutions, optimizing processes and driving productivity to new heights.",
    icon: Factory,
  },
  {
    title: "Retail & Wholesale",
    description:
      "Revolutionizing retail and wholesale industries with tailored technology solutions, enhancing customer experiences and streamlining operations for sustainable growth.",
    icon: ShoppingBag,
  },
]

/** Sector focus accordion — copy from corporate profile slide */
export const sectorAccordionItems = [
  {
    id: 1,
    title: "Public Sector",
    description: sectorFocus[0].description,
    imageUrl:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    title: "Education",
    description: sectorFocus[1].description,
    imageUrl:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    title: "Utilities",
    description: sectorFocus[2].description,
    imageUrl:
      "https://images.unsplash.com/photo-1498514895871-c660cf967eeb?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 4,
    title: "Healthcare & Hospitals",
    description: sectorFocus[3].description,
    imageUrl:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 5,
    title: "Telecom",
    description: sectorFocus[4].description,
    imageUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 6,
    title: "Automotive",
    description: sectorFocus[5].description,
    imageUrl:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 7,
    title: "Manufacturing",
    description: sectorFocus[6].description,
    imageUrl:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 8,
    title: "Retail & Wholesale",
    description: sectorFocus[7].description,
    imageUrl:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
  },
]

/** Hero parallax cards — sector focus industries (15 slots = 3 scrolling rows × 5) */
const HERO_PARALLAX_ROW_COUNT = 15

export const heroParallaxProducts = Array.from({ length: HERO_PARALLAX_ROW_COUNT }, (_, index) => {
  const sector = sectorAccordionItems[index % sectorAccordionItems.length]
  return {
    title: sector.title,
    description: sector.description,
    link: "#contact",
    thumbnail: sector.imageUrl,
  }
})

export type ServiceSubItem = {
  id: string
  title: string
  description: string
  icon: LucideIcon
}

export type ServiceCluster = {
  id: string
  title: string
  icon: LucideIcon
  summary: string
  services: ServiceSubItem[]
}

export const serviceClusters: ServiceCluster[] = [
  {
    id: "erp",
    title: "ERP Development & Implementation",
    icon: Layers3,
    summary:
      "End-to-end ERP—from advisory and PMO through development, customization, integration, implementation, and testing.",
    services: [
      {
        id: "erp-advisory",
        title: "Advisory & PMO Services",
        description:
          "End-to-end project management from inception to close, identifying opportunities for process, data standardization, and automation.",
        icon: Lightbulb,
      },
      {
        id: "erp-development",
        title: "Development",
        description:
          "Custom development focused on scalable, responsive, feature-rich business applications built from the ground up or enhanced.",
        icon: Workflow,
      },
      {
        id: "erp-customization",
        title: "Customization",
        description:
          "Aligning software closely with organizational goals and processes to improve efficiency and user experience.",
        icon: Sparkles,
      },
      {
        id: "erp-integration",
        title: "Integration",
        description:
          "Linking disparate systems to enable data sharing, streamline processes, and improve efficiency.",
        icon: Link2,
      },
      {
        id: "erp-implementation",
        title: "Implementation",
        description:
          "Installing, configuring, and deploying software applications or systems within your organization.",
        icon: Server,
      },
      {
        id: "erp-testing",
        title: "Testing & Support",
        description:
          "Rigorously evaluating functionality, performance, and security of ERP systems before and after deployment.",
        icon: ShieldCheck,
      },
    ],
  },
  {
    id: "core-banking",
    title: "Core Banking Services",
    icon: Landmark,
    summary:
      "Payment solutions, risk and compliance, application management, process excellence, and strategic consulting for financial institutions.",
    services: [
      {
        id: "cb-payments",
        title: "Payment Solutions",
        description:
          "Innovative, secure, and seamless payment solutions empowering financial institutions to meet evolving customer needs.",
        icon: BarChart3,
      },
      {
        id: "cb-risk",
        title: "Risks, Compliance & Security",
        description:
          "Risk assessment, compliance frameworks, security measures, incident response, and ongoing monitoring and auditing.",
        icon: Lock,
      },
      {
        id: "cb-app-mgmt",
        title: "Application Management & Operations",
        description:
          "End-to-end solutions to enhance performance, reliability, and scalability of core banking systems.",
        icon: Server,
      },
      {
        id: "cb-automation",
        title: "Process Outsourcing & Automation",
        description:
          "Strategic outsourcing, automation solutions, implementation, and continuous improvement for core banking.",
        icon: Workflow,
      },
      {
        id: "cb-consulting",
        title: "Trends & Consulting",
        description:
          "Core banking trends and consulting through analysis, strategy development, implementation, and training.",
        icon: Target,
      },
    ],
  },
  {
    id: "managed",
    title: "Managed Services",
    icon: Cloud,
    summary:
      "Staff augmentation, infrastructure management, remote ops, offshore staffing, change management, and regulatory standards.",
    services: [
      {
        id: "ms-staff",
        title: "Staff Augmentation",
        description:
          "Proven methodology for augmenting your workforce wherever they are assigned across the region.",
        icon: Users,
      },
      {
        id: "ms-infra",
        title: "Infra Managed Services",
        description:
          "Hardware, software (CRM, ERP), and network management including security and internet connectivity.",
        icon: Server,
      },
      {
        id: "ms-remote",
        title: "Remote Infra Managed Services",
        description:
          "Centralized IT infrastructure management with greater coordination and ease of maintenance.",
        icon: Radio,
      },
      {
        id: "ms-offshore",
        title: "Offshore Office & Staffing",
        description:
          "Staffing solutions overseas for SMEs to corporations across diverse business types.",
        icon: Building2,
      },
      {
        id: "ms-change",
        title: "Change Management",
        description:
          "Control the lifecycle of all changes, enabling beneficial changes with minimum disruption.",
        icon: Workflow,
      },
      {
        id: "ms-regulatory",
        title: "Regulatory Standards",
        description:
          "Help set specific principles your organization must follow to ensure security of its processes.",
        icon: ShieldCheck,
      },
    ],
  },
  {
    id: "value-added",
    title: "Value Added Services",
    icon: Sparkles,
    summary:
      "Cloud computing, digital signage, maintenance, IoT, industrial revolution, and digital transformation guidance.",
    services: [
      {
        id: "vas-cloud",
        title: "Cloud Computing",
        description:
          "Comprehensive cloud services to optimize operations, enhance scalability, and accelerate digital transformation.",
        icon: Cloud,
      },
      {
        id: "vas-signage",
        title: "Digital Signage",
        description:
          "Innovative digital signage solutions designed to captivate audiences and drive engagement.",
        icon: Radio,
      },
      {
        id: "vas-support",
        title: "Maintenance & Support",
        description:
          "Proactive maintenance, reactive support, security enhancements, patch management, and user training.",
        icon: ShieldCheck,
      },
      {
        id: "vas-iot",
        title: "IoT Services",
        description:
          "IoT solutions that transform industries and enhance lives through connected innovation.",
        icon: Network,
      },
      {
        id: "vas-industry4",
        title: "Industrial Revolution",
        description:
          "Cutting-edge solutions to harness digital technologies and automation in the modern era.",
        icon: Factory,
      },
      {
        id: "vas-dx",
        title: "Digital Transformation",
        description:
          "Strategic guidance and innovative solutions to help organizations thrive in the digital age.",
        icon: Zap,
      },
    ],
  },
  {
    id: "blockchain",
    title: "Blockchain Services",
    icon: Link2,
    summary:
      "App building, smart contracts, professional services, resource allocation, and platform architecture management.",
    services: [
      {
        id: "bc-apps",
        title: "App Building & Monitoring",
        description:
          "Robust tools and expertise to develop, deploy, and monitor blockchain applications seamlessly.",
        icon: Layers3,
      },
      {
        id: "bc-contracts",
        title: "Smart Contract Support",
        description:
          "Comprehensive solutions to deploy, manage, and optimize smart contracts on blockchain networks.",
        icon: Lock,
      },
      {
        id: "bc-professional",
        title: "Professional Services",
        description:
          "Expert guidance and tailored solutions to navigate blockchain complexity and drive transformation.",
        icon: Handshake,
      },
      {
        id: "bc-resources",
        title: "Resource Allocation",
        description:
          "Streamline processes, enhance transparency, and maximize efficiency in allocating resources.",
        icon: Target,
      },
      {
        id: "bc-platform",
        title: "Platform Architecture",
        description:
          "Design, build, and manage blockchain platforms tailored to each client's unique objectives.",
        icon: Server,
      },
      {
        id: "bc-security",
        title: "Data Security",
        description:
          "Robust blockchain data security solutions to protect sensitive information and mitigate cyber threats.",
        icon: ShieldCheck,
      },
    ],
  },
  {
    id: "bpm",
    title: "BPM Services",
    icon: Workflow,
    summary:
      "Implementation, integration, testing, and consulting to optimize business processes and operational excellence.",
    services: [
      {
        id: "bpm-impl",
        title: "Implementation & Integration",
        description:
          "Seamlessly integrate BPM solutions to enhance operational efficiency, agility, and innovation.",
        icon: Layers3,
      },
      {
        id: "bpm-support",
        title: "Support & Upgrade",
        description:
          "Proactive support and seamless upgrade solutions for continued BPM success and efficiency.",
        icon: ShieldCheck,
      },
      {
        id: "bpm-testing",
        title: "Testing",
        description:
          "Rigorous testing methodologies ensuring reliability, efficiency, and effectiveness of BPM solutions.",
        icon: BarChart3,
      },
      {
        id: "bpm-consulting",
        title: "BPM Consulting",
        description:
          "Optimize business processes to enhance efficiency, reduce costs, and maximize competitive advantage.",
        icon: Lightbulb,
      },
    ],
  },
]

/** Hero imagery per service cluster — used in the services section */
export const serviceClusterImages: Record<string, string> = {
  erp: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
  "core-banking":
    "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
  managed:
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
  "value-added":
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
  blockchain:
    "https://images.unsplash.com/photo-1639765484210-988bde00e430?auto=format&fit=crop&w=1200&q=80",
  bpm: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
}

export const teamMembers = [
  {
    name: "Haresh Shukla",
    role: "Director | Teknopact Operations & CEO",
    bio: "Partner and Sr. Director managing operational activities and project deliveries across the region. 18+ years in IT Consulting, Capital Markets, Strategic & Management Advisory, and HR Advisory.",
    initials: "HS",
    imageUrl: "/team/haresh-shukla.png",
  },
  {
    name: "Ramesh Kumar",
    role: "Founder & Deputy CEO",
    bio: "20+ years spanning Sales, Business Development, Research & Consulting, Growth Strategies, and Operations Management.",
    initials: "RK",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=1368&q=80",
  },
  {
    name: "Suresh K Jangir",
    role: "CTO",
    bio: "Technology enthusiast specialized in mobile & web programming with 10+ years building scalable, carrier-grade distributed applications and Android/iOS development.",
    initials: "SJ",
    imageUrl: "/team/suresh-k-jangir.jpg",
  },
  {
    name: "Irfan Ahmed Jagral",
    role: "CSO",
    bio: "25+ years of leadership across Manufacturing, Trading & Retail, BFSI, Construction, and startup operations in the Middle East (KSA, UAE, Bahrain, Kuwait, Oman, India).",
    initials: "IJ",
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1368&q=80",
  },
]

/** Circular testimonials carousel — same bios as teamMembers */
export const teamCircularTestimonials = teamMembers.map((member) => ({
  quote: member.bio,
  name: member.name,
  designation: member.role,
  src: member.imageUrl,
}))

export type CaseStudy = {
  id: string
  category: string
  title: string
  description: string
  highlights: string[]
  thumbnail: string
}

export const productsPageIntro = {
  headline:
    "Enterprise technology, ready to deploy. A curated catalog spanning artificial intelligence, IoT, cybersecurity, and specialized vertical solutions from leading vendors.",
  body:
    "Every organization faces a different stack of constraints—compliance, scale, integration, and time to value. Teknopact helps you navigate the enterprise product landscape across the GCC and MENA, pairing the right technology with the right implementation path.",
}

export const servicesPageIntro = {
  headline:
    "End-to-end capability. Advisory, ERP, core banking, managed services, blockchain, and business process solutions—delivered by Teknopact across the GCC and MENA.",
  body:
    "From strategy and architecture through delivery and managed operations, we bring consultants, architects, and engineers who simplify complexity and accelerate outcomes. The goal is always pragmatic transformation—measurable impact with the passion and expertise your sector demands.",
}

export const caseStudiesPageIntro = {
  headline:
    "Challenges? Accepted. A curated selection of Teknopact engagements—from education and ERP to telecom, fintech, and cybersecurity.",
  body:
    "The more demanding the brief, the more we are in our element. On every project we question assumptions and rethink what is possible—sometimes reinventing our own approach. The goal is always to deliver outcomes that surprise: with passion, deep expertise, and measurable impact—whatever the sector, wherever the location.",
}

export const caseStudies: CaseStudy[] = [
  {
    id: "review-management-system",
    category: "Education & Training",
    title: "Review Management System (RMS)",
    description:
      "For the Education and Training Qualifications Authority—automating institution reviews (DSR, DHR, DVR) from physical visits to a cloud-based, real-time platform. Single dashboard for evaluation analysis and end-to-end review.",
    highlights: ["Eliminates physical meetings", "Single platform", "Cloud automation"],
    thumbnail:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&h=600&q=80",
  },
  {
    id: "custom-erp-crm",
    category: "ERP & CRM",
    title: "Custom ERP & CRM Modules",
    description:
      "Delivered customized ERP and CRM modules for clients in Qatar and Bahrain—commercial services, management services, transportation, and restaurant management solutions.",
    highlights: ["Qatar & Bahrain delivery", "Integrated suites", "Industry-specific modules"],
    thumbnail:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&h=600&q=80",
  },
  {
    id: "website-creation-portfolio",
    category: "Digital",
    title: "Website Creation Portfolio",
    description:
      "Built tailored websites for IT, sanitizer/e-commerce, marketing, and management consulting companies—simplifying technology and driving customer engagement.",
    highlights: ["E-commerce portals", "Case study showcases", "Custom brand experiences"],
    thumbnail:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1200&h=600&q=80",
  },
  {
    id: "webrtc-conferencing",
    category: "Telecom",
    title: "WebRTC Conferencing Platform",
    description:
      "Eight-month delivery of a conferencing platform with peer-to-peer video, multiuser conferencing, and live whiteboard—used across EduTech, medical, and entertainment sectors.",
    highlights: ["Android, iOS & Web", "Slot booking & payments", "Europe psychic-reading platform"],
    thumbnail:
      "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=1200&h=600&q=80",
  },
  {
    id: "manufacturing-ai-efficiency",
    category: "Manufacturing & IoT",
    title: "AI-Driven Operational Efficiency in Manufacturing",
    description:
      "A global manufacturer replaced subjective visual quality control and reactive maintenance with Ingenious Tech's Vision AI, Fogwind Smart Factory telemetry, and PlantOps MES—achieving total supply chain transparency and improved equipment effectiveness.",
    highlights: ["Automated defect detection", "Predictive maintenance", "Reduced cycle times"],
    thumbnail:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&h=600&q=80",
  },
  {
    id: "telecom-intelligence",
    category: "Telecom",
    title: "Scaling Telecom Intelligence and Network Orchestration",
    description:
      "A large telecom provider deployed NetoAI's ViNG and NAPI platforms with Teleindia infrastructure support—enabling zero-touch service activations, automated ticket triaging, and domain-specific LLM remediations with drastically reduced downtime.",
    highlights: ["Zero-touch activation", "TSLAM remediation", "High-availability infra"],
    thumbnail:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&h=600&q=80",
  },
  {
    id: "fintech-autonomous-ops",
    category: "Fintech",
    title: "Autonomous Business Operations in Fintech",
    description:
      "A fast-growing fintech aggregator automated its full loan lifecycle—from lead sourcing to payout—using Xpertnest's BharatEarns CRM and AiQmen's AgenticAxis, maintaining strict data protection compliance while boosting conversion rates.",
    highlights: ["End-to-end loan automation", "Policy-compliant agents", "Scaled compliance"],
    thumbnail:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&h=600&q=80",
  },
  {
    id: "esg-strategic-execution",
    category: "ESG & Strategy",
    title: "Strategic Execution and ESG Compliance",
    description:
      "A global organization bridged the gap between boardroom strategy and ground-level execution using Cascade's OKR platform, while 4Seer Tech's 4Scope automated Scope 1–3 greenhouse gas reporting—transforming sustainability into a proactive imperative.",
    highlights: ["Real-time OKR alignment", "Automated ESG reporting", "Data-backed leadership"],
    thumbnail:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&h=600&q=80",
  },
  {
    id: "secure-digital-transformation",
    category: "Cybersecurity",
    title: "Secure Digital Transformation in High-Security Environments",
    description:
      "A multinational corporation modernized legacy IT with Finesse's AI Transformation Roadmap, AI Guardrails & LLM Gateway, and Zero Trust architecture—supported by iValue Group's 24/7 SOC—enabling safe adoption of generative AI without compromising data integrity.",
    highlights: ["Zero Trust architecture", "GenAI guardrails", "24/7 SOC coverage"],
    thumbnail:
      "https://images.unsplash.com/photo-1550751827-4bd374c1f58b?auto=format&fit=crop&w=1200&h=600&q=80",
  },
]

export const customerTestimonials = [
  {
    text: "Teknopact's strategic engagement helped our organization navigate digital transformation with clarity and measurable outcomes.",
    name: "Government Sector Partner",
    role: "Digital Transformation Lead",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=120&q=80",
  },
  {
    text: "Their ERP implementation team delivered on time with deep domain expertise—we saw process efficiency gains from day one.",
    name: "Enterprise Client",
    role: "Operations Director",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80",
  },
  {
    text: "Staff augmentation from Teknopact integrated seamlessly with our workforce across multiple GCC locations.",
    name: "Regional IT Head",
    role: "Technology Manager",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
  },
  {
    text: "From advisory through deployment, the team simplified complex banking requirements into elegant, secure solutions.",
    name: "Financial Services Client",
    role: "Program Manager",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
  },
  {
    text: "Cloud and managed services gave us the scalability and reliability our growing operations demanded.",
    name: "Utilities Sector Partner",
    role: "Infrastructure Lead",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
  },
  {
    text: "The review management automation project transformed a lengthy manual process into a fast, accurate cloud workflow.",
    name: "Education Authority",
    role: "Quality Assurance Director",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
  },
  {
    text: "Teknopact's blockchain and BPM consulting helped us modernize processes with minimal disruption.",
    name: "Trading & Contracting",
    role: "Chief Technology Officer",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&q=80",
  },
  {
    text: "150+ years of combined experience shows in every engagement—their architects understand both technology and business.",
    name: "Manufacturing Client",
    role: "VP Engineering",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80",
  },
  {
    text: "Presence across seven countries meant we had local support with global delivery standards.",
    name: "Multi-region Enterprise",
    role: "Regional Director",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=120&q=80",
  },
]

export const testimonial = {
  quote:
    "At Teknopact, we are staunch advocates of the transformative potential of technology—constantly pushing boundaries to turn your visions into reality.",
  name: "Teknopact Leadership",
  role: "Corporate Profile 2024",
}

export const faqs = [
  {
    question: "What services does Teknopact provide?",
    answer:
      "We offer Advisory, PMO, ERP implementation, Consulting, Staff Augmentation, Software Development, Cybersecurity, Cloud Solutions, Core Banking, Managed Services, Blockchain, and BPM—covering the full IT lifecycle.",
  },
  {
    question: "Where are Teknopact offices located?",
    answer:
      "We have offices in Bahrain, Qatar, UAE, Saudi Arabia, Oman, India, and Canada—with presence across 7 countries in the GCC and beyond.",
  },
  {
    question: "Which sectors do you specialize in?",
    answer:
      "Public Sector, Education, Utilities, Healthcare, Telecom, Automotive, Manufacturing, and Retail & Wholesale—among others.",
  },
  {
    question: "How does Teknopact approach ERP projects?",
    answer:
      "From advisory and PMO through development, customization, integration, implementation, and testing—with rigorous evaluation before and after deployment.",
  },
]

/** @deprecated Use serviceClusters — kept for header menu compatibility */
export const productMenuItems = serviceClusters.map((cluster) => ({
  title: cluster.title,
  description: cluster.summary,
  icon: cluster.icon,
}))
