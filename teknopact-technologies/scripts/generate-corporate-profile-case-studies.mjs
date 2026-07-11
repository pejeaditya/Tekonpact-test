import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outPath = path.join(__dirname, "../src/lib/corporate-profile-case-studies.ts")

/** Case studies sourced from Teknopact Corporate Profile 2026 V1 (slides 42–53). */
const studies = [
  {
    id: "gcc-aviation-hospitality-pmo",
    category: "Hospitality & Aviation",
    title: "IT PMO Support for Hospitality Subsidiary of Major Regional Aviation Group",
    subtitle:
      "Establishing end-to-end CRM and IT infrastructure with governed delivery across Juniper BE, Salesforce, and Hotelbeds.",
    location: "GCC",
    tech: "IT PMO & System Integration",
    company: "Hospitality subsidiary of a major regional aviation group",
    relatedCategory: "enterprise-ops",
    thumbnail: "/case-studies/GccAviationHospitalityPmo.jpg",
    highlights: [
      "On-time delivery without major incidents",
      "Vendor alignment across Juniper BE, Salesforce & Hotelbeds",
      "Central document repository for audits",
    ],
    challenge:
      "The client is the newly formed hospitality subsidiary of one of the major aviation players in the GCC region, who sought support in establishing end-to-end CRM with relevant IT infrastructure. The client engaged Teknopact to set up and run an IT PMO to govern multiple strategic initiatives across core systems, channels, and travel-tech integrations. The mandate was to deliver projects on time and with predictable quality while aligning vendors and internal teams to a common delivery framework.",
    solution:
      "Teknopact built detailed project plans, milestone baselines, and RAID logs; coordinated end-to-end delivery with Juniper BE, Salesforce (ConX), and Hotelbeds; and governed complete SIT and UAT cycles with defect tracking and sign-offs. Standard PMO dashboards and C-level status reports gave leadership clear visibility into progress, risks, and decisions.",
    impact:
      "All in-scope projects were delivered within agreed timelines and without major production incidents. GFH business and IT teams were supported during onboarding with process and tool training, and a central document repository was established for BRDs, technical designs, test artefacts, and sign-offs—creating a single source of truth for audits and future enhancements.",
  },
  {
    id: "etqa-review-management-system",
    category: "Education",
    title: "Review Management System for Education & Training Qualifications Authority",
    subtitle:
      "Automating institution review workflows across DSR, DHR, and DVR categories on a unified cloud platform.",
    location: "Kingdom of Bahrain",
    tech: "Cloud Review Management Platform",
    company: "Education & Training Qualifications Authority",
    relatedCategory: "specialized-verticals",
    thumbnail:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&h=600&q=80",
    highlights: [
      "End-to-end review process on one platform",
      "Eliminated Excel and word-based forms",
      "Real-time cloud access for evaluators",
    ],
    challenge:
      "The Education & Training Qualifications Authority reviews all institutions in the Kingdom and provides feedback in three categories—DSR (Schools), DHR (Higher Education), and DVR (Vocational Training). Reviews were conducted through physical visits supported by MS Office and an Online Review Hub used mainly as a document repository—a lengthy, fragmented process.",
    solution:
      "Teknopact is automating the review management process by making it fully accessible in the cloud and in real time. All modules and chapters of the review management system are being inserted into a single platform, replacing physical meetings, Excel dependency, third-party survey tools, and word-based forms.",
    impact:
      "The new RMS delivers a single dashboard for evaluation analysis and a single platform to manage the review process end to end—making reviews faster, more efficient, and more accurate while eliminating redundant physical workflows.",
  },
  {
    id: "qatar-commercial-erp-crm",
    category: "Commercial Services",
    title: "Commercial Services ERP & CRM Modules",
    subtitle: "Customized ERP and CRM modules with integrated suite capabilities for a Qatar client.",
    location: "Qatar",
    tech: "ERP & CRM",
    company: "Commercial Services Client",
    relatedCategory: "enterprise-ops",
    thumbnail:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&h=600&q=80",
    highlights: ["Custom ERP & CRM modules", "Integrated suite capabilities", "End-to-end business management"],
    challenge:
      "A commercial services organization in Qatar required modern ERP and CRM capabilities aligned to its operating model, with integration across customer, vendor, and financial workflows.",
    solution:
      "Teknopact delivered customized ERP and CRM modules designed for the client's commercial services operations. The systems offer integration capabilities and can operate as integrated suites covering HR, financial management, inventory, procurement, and customer service.",
    impact:
      "The client gained a tailored business management foundation with industry best practices, latest technology, and modules that extend beyond standard ERP limitations including evaluation, training, document management, and cross-system integration.",
  },
  {
    id: "bahrain-management-erp-crm",
    category: "Management Services",
    title: "Management Services ERP & CRM Modules",
    subtitle: "Integrated ERP and CRM deployment for a Bahrain management services client.",
    location: "Bahrain",
    tech: "ERP & CRM",
    company: "Management Services Client",
    relatedCategory: "enterprise-ops",
    thumbnail:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&h=600&q=80",
    highlights: ["Integrated ERP & CRM suite", "Process standardization", "Scalable operations platform"],
    challenge:
      "A management services firm in Bahrain needed unified systems to manage operations, clients, and back-office processes without fragmented tools and manual handoffs.",
    solution:
      "Teknopact delivered customized ERP and CRM modules with integration capabilities, covering core business management functions from design through deployment.",
    impact:
      "The organization operates on a single platform aligned to Teknopact ERP design, development, and deployment standards—replacing siloed processes with an integrated operational backbone.",
  },
  {
    id: "bahrain-transportation-erp-crm",
    category: "Transportation",
    title: "Transportation ERP & CRM Modules",
    subtitle: "Business management system for a Bahrain transportation client.",
    location: "Bahrain",
    tech: "ERP & CRM",
    company: "Transportation Client",
    relatedCategory: "enterprise-ops",
    thumbnail:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1200&h=600&q=80",
    highlights: ["Transportation business management system", "ERP & CRM integration", "Operational visibility"],
    challenge:
      "A transportation company in Bahrain required a dedicated business management system to coordinate fleet, customer, and commercial operations.",
    solution:
      "Teknopact delivered customized ERP and CRM modules and created a comprehensive Business Management System tailored to transportation workflows.",
    impact:
      "The client gained end-to-end visibility and control over transportation operations through an integrated ERP and CRM foundation.",
  },
  {
    id: "bahrain-restaurant-erp-crm",
    category: "Food & Beverage",
    title: "Restaurant ERP & CRM Modules",
    subtitle: "Restaurant management solution with customized ERP and CRM for a Bahrain client.",
    location: "Bahrain",
    tech: "ERP & CRM",
    company: "Restaurant Client",
    relatedCategory: "specialized-verticals",
    thumbnail:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&h=600&q=80",
    highlights: ["Restaurant management solution", "Integrated ERP & CRM", "Streamlined F&B operations"],
    challenge:
      "A restaurant operator in Bahrain needed a purpose-built management solution covering inventory, customer engagement, and back-office processes.",
    solution:
      "Teknopact delivered customized ERP and CRM modules and created a Restaurant Management Solution aligned to F&B operations.",
    impact:
      "The client runs restaurant operations on an integrated platform designed for hospitality workflows rather than generic ERP templates.",
  },
  {
    id: "website-it-company",
    category: "Web Development",
    title: "Custom Website for IT Company",
    subtitle: "Translating complex technology offerings into a clear, client-focused web presence.",
    location: "GCC",
    tech: "Web Design & Development",
    company: "IT Company",
    relatedCategory: "enterprise-ops",
    thumbnail: "/case-studies/WebsiteCreationIllustrative.jpg",
    highlights: ["Customized client requirements", "Simplified technology messaging", "Professional web presence"],
    challenge:
      "An IT company needed a website that simplified complex technology for prospective clients while accurately reflecting customized service offerings.",
    solution:
      "Teknopact understood the client's requirements and created a website tailored to their needs—simplifying technical complexity for visitors while preserving depth for decision-makers.",
    impact:
      "The client gained a compelling digital presence that communicates capabilities clearly and supports business development.",
  },
  {
    id: "website-sanitizer-ecommerce",
    category: "E-commerce",
    title: "E-Commerce Website for Sanitizer Company",
    subtitle: "Product-focused website with integrated ecommerce portal and customer engagement.",
    location: "GCC",
    tech: "E-Commerce Web Platform",
    company: "Sanitizer Company",
    relatedCategory: "specialized-verticals",
    thumbnail: "/case-studies/WebsiteCreationIllustrative2.jpg",
    highlights: ["Integrated ecommerce portal", "Product benefit communication", "Seamless shopping experience"],
    challenge:
      "A sanitizer company required a website that effectively communicated product benefits, addressed customer concerns, and supported direct online purchasing.",
    solution:
      "Teknopact created a website involving the client throughout development, communicating product benefits clearly and embedding an ecommerce portal for seamless shopping.",
    impact:
      "The company launched a customer-ready digital storefront that combines education, trust-building, and transactional capability in one experience.",
  },
  {
    id: "website-marketing-company",
    category: "Marketing",
    title: "Interactive Website for Marketing Company",
    subtitle: "Compelling content and hosting aligned to a marketing agency's brand and services.",
    location: "GCC",
    tech: "Interactive Web Platform",
    company: "Marketing Company",
    relatedCategory: "enterprise-ops",
    thumbnail:
      "https://images.unsplash.com/photo-1432888622747-4eb9ef8b683c?auto=format&fit=crop&w=1200&h=600&q=80",
    highlights: ["Interactive design", "Select web hosting provider", "Compelling client-centric content"],
    challenge:
      "A marketing company needed an interactive website with compelling content and reliable hosting aligned to its service portfolio.",
    solution:
      "Teknopact created an interactive website with a selected web hosting provider and content tailored to the client's requirements and audience.",
    impact:
      "The marketing firm gained a polished digital platform that reflects its creative capabilities and supports client acquisition.",
  },
  {
    id: "website-consulting-company",
    category: "Consulting",
    title: "Precision Website for Management Consulting Company",
    subtitle: "Detail-led services presentation with case study showcase for a consulting firm.",
    location: "GCC",
    tech: "Web Design & Content Architecture",
    company: "Management Consulting Company",
    relatedCategory: "enterprise-ops",
    thumbnail:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&h=600&q=80",
    highlights: ["High-precision service detail", "Case study showcase", "Executive-grade presentation"],
    challenge:
      "A management consulting company required a website with precise detail on services and a credible showcase of completed engagements.",
    solution:
      "Teknopact created a website with high-level precision, explaining the client's detail-led services and presenting case studies of projects delivered.",
    impact:
      "The consulting firm strengthened its credibility with a website that mirrors the rigor of its advisory work.",
  },
  {
    id: "hocalwire-journalism-cms",
    category: "Media & Journalism",
    title: "Content Management System for Media Houses",
    subtitle:
      "End-to-end journalism platform covering gathering, curation, distribution, and monetization since 2016.",
    location: "India",
    tech: "Content Management & Mobile Apps",
    company: "Hocalwire",
    relatedCategory: "ai-ml",
    thumbnail:
      "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&h=600&q=80",
    highlights: ["Four pillars of journalism", "Remote reporter management", "Ongoing since 2016"],
    challenge:
      "Media houses needed a technology platform covering all four pillars of journalism—gathering, curating, spreading, and monetizing information—with remote reporter management.",
    solution:
      "Since 2016, Teknopact has supported a technology company providing a content management system for media houses, including app development for real-time reporter management at remote level.",
    impact:
      "Media organizations operate on a unified CMS that supports the full editorial and monetization lifecycle with remote workforce coordination.",
  },
  {
    id: "webrtc-conferencing-platform",
    category: "Telecommunications",
    title: "WebRTC Conferencing & Collaboration Platform",
    subtitle:
      "Peer-to-peer video, multiuser conferencing, and live whiteboard sharing across Android, iOS, and web.",
    location: "India",
    tech: "WebRTC & Real-Time Collaboration",
    company: "European Psychic Reading Platform",
    relatedCategory: "cyber-infra",
    thumbnail:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&h=600&q=80",
    highlights: ["WebRTC calling", "Slot booking & payments", "Cross-industry deployment"],
    challenge:
      "Organizations across EduTech, medical, entertainment, and social media needed a scalable conferencing platform with peer-to-peer video, multiuser conferencing, and collaborative whiteboarding.",
    solution:
      "Teknopact developed a conferencing and collaboration platform as an early adopter of WebRTC calling, available on Android, iOS, and web—with slot booking, pricing, online payment, and analytics for a leading European psychic reading service.",
    impact:
      "The platform enabled live phone and text reading services at scale, giving users access to hundreds of trusted psychics with enterprise-grade real-time infrastructure.",
  },
  {
    id: "medical-education-conferencing",
    category: "Education",
    title: "Global Medical Education Conferencing Platform",
    subtitle: "Live whiteboard sharing for medical colleges—later acquired by Blackboard.",
    location: "India",
    tech: "Video Conferencing & Whiteboard",
    company: "Medical Colleges & Blackboard",
    relatedCategory: "specialized-verticals",
    thumbnail:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&h=600&q=80",
    highlights: ["Global student connectivity", "Live whiteboard in video sessions", "Acquired by Blackboard"],
    challenge:
      "Medical colleges needed to connect with students globally using classroom-quality remote instruction with interactive whiteboard collaboration.",
    solution:
      "Teknopact built a platform used by multiple institutions including medical colleges, with live whiteboard sharing during video conferences so tutors could explain problems like an offline class.",
    impact:
      "The solution was acquired by Blackboard, then the market leader in online education, validating its instructional quality and scalability.",
  },
  {
    id: "retail-marketing-management-app",
    category: "Retail",
    title: "Omni-Channel Retail Marketing Management App",
    subtitle: "Tracking in-store branding spend and marketing ROI by product line.",
    location: "India",
    tech: "Mobile Marketing Analytics",
    company: "Retail Startup",
    relatedCategory: "specialized-verticals",
    thumbnail:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&h=600&q=80",
    highlights: ["Store-level branding tracking", "Marketing ROI by product line", "Ten-month delivery"],
    challenge:
      "A retail startup needed an app to manage branding and marketing at stores with visibility into marketing expenses versus output by product line.",
    solution:
      "Teknopact developed an omni-general marketing management solution to track marketing expenses and measure returns on spend across specific product lines.",
    impact:
      "Marketing teams gained data-driven visibility into store-level campaigns, improving allocation and accountability across the retail network.",
  },
  {
    id: "sip-voip-application-server",
    category: "Telecommunications",
    title: "SIP Application Server for VoIP Deployment",
    subtitle: "Powering VoIP deployments for carriers including AT&T with customized value-added services.",
    location: "India",
    tech: "SIP & VoIP Infrastructure",
    company: "AT&T & Telecom Operators",
    relatedCategory: "cyber-infra",
    thumbnail:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&h=600&q=80",
    highlights: ["Carrier-grade SIP server", "Custom value-added services", "Ten-month engagement"],
    challenge:
      "Telecom operators required a SIP application server to power VoIP deployments and enable customized value-added services at scale.",
    solution:
      "Teknopact developed a SIP Application Server powering VoIP deployment for customers like AT&T and enabling telecom players to build customized value-added services.",
    impact:
      "Operators accelerated VoIP service delivery with a proven application server foundation and extensible VAS development capability.",
  },
  {
    id: "saudi-staff-augmentation-platform",
    category: "Staff Augmentation",
    title: "Staff Augmentation & Credit Management Platform",
    subtitle: "Five-year staff management platform plus finance credit management system.",
    location: "Saudi Arabia",
    tech: "Staff Management & Finance Systems",
    company: "Saudi Enterprise Client",
    relatedCategory: "enterprise-ops",
    thumbnail:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&h=600&q=80",
    highlights: ["Five-year staff platform", "Credit management for finance", "Saudi Arabia delivery"],
    challenge:
      "A Saudi client needed long-term staff augmentation tooling alongside a credit management system for the finance department.",
    solution:
      "Teknopact created a staff augmentation platform for staff management and delivered a separate credit management system for the finance department.",
    impact:
      "HR and finance teams operate on dedicated platforms supporting multi-year workforce and credit operations.",
  },
  {
    id: "saudi-sap-service-industry",
    category: "Trading & Contracting",
    title: "Complete SAP Implementation for Service Industry Group",
    subtitle: "Fresh SAP rollout across companies, divisions, and departments in Saudi Arabia.",
    location: "Saudi Arabia",
    tech: "SAP ERP",
    company: "Trading & Contracting Group",
    relatedCategory: "enterprise-ops",
    thumbnail:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&h=600&q=80",
    highlights: ["Complete SAP implementation", "Multi-company rollout", "Eight-month engagement"],
    challenge:
      "A trading and contracting group in Saudi Arabia required a complete fresh SAP implementation spanning all companies, divisions, and departments.",
    solution:
      "Teknopact executed a full SAP implementation for the service industry group with complete coverage across organizational units.",
    impact:
      "The group unified operations on SAP with standardized processes across entities and departments.",
  },
  {
    id: "saudi-fire-safety-vat",
    category: "Fire & Safety",
    title: "Group VAT Implementation & Audit Policy",
    subtitle: "VAT rollout and group audit policy with process flows for a fire and safety group.",
    location: "Saudi Arabia",
    tech: "VAT Compliance & Process Design",
    company: "Fire & Safety Group",
    relatedCategory: "enterprise-ops",
    thumbnail:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&h=600&q=80",
    highlights: ["Group VAT policy", "Process flow design", "Four-month delivery"],
    challenge:
      "A fire and safety group needed VAT implementation for finance and a group audit policy with consistent process flows.",
    solution:
      "Teknopact delivered VAT implementation for the finance department and created group audit policy and process flows for the entire group.",
    impact:
      "Finance and audit teams gained aligned VAT and audit frameworks across the group within a compressed timeline.",
  },
  {
    id: "bahrain-tyres-vat-policy",
    category: "Manufacturing",
    title: "VAT Policy & Process Implementation for Tyres Group",
    subtitle: "Group-wide VAT policy creation with detailed process flow implementation in Bahrain.",
    location: "Bahrain",
    tech: "VAT Compliance",
    company: "Tyres & Rubber Group",
    relatedCategory: "enterprise-ops",
    thumbnail:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&h=600&q=80",
    highlights: ["Group VAT policy", "Detailed process implementation", "Twelve-month engagement"],
    challenge:
      "A tyres and rubber group in Bahrain required VAT implementation and policy creation with detailed process flows across the group.",
    solution:
      "Teknopact implemented VAT with process flow design and detailed policy rollout for the entire group.",
    impact:
      "The organization achieved compliant, documented VAT operations with consistent group-wide procedures.",
  },
  {
    id: "gcc-dental-order-patient-platform",
    category: "Healthcare",
    title: "Dental Order & Patient Management Platform",
    subtitle: "Order and patient management with integration from legacy processes across the GCC.",
    location: "GCC",
    tech: "Healthcare Platform Integration",
    company: "Dental Healthcare Provider",
    relatedCategory: "specialized-verticals",
    thumbnail:
      "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1200&h=600&q=80",
    highlights: ["Order management system", "Patient management system", "Legacy process integration"],
    challenge:
      "A dental provider across the GCC needed modern order and patient management while integrating with existing operational processes.",
    solution:
      "Teknopact created a platform for order management and patient management with integration from the client's prior processes.",
    impact:
      "Clinical and operational teams gained unified patient and order workflows without losing continuity from legacy systems.",
  },
  {
    id: "saudi-property-management-software",
    category: "Contracting & Trading",
    title: "Property Management Software for Group Operations",
    subtitle: "End-to-end property management solution for a Saudi contracting and trading group.",
    location: "Saudi Arabia",
    tech: "Property Management Software",
    company: "Contracting & Trading Group",
    relatedCategory: "specialized-verticals",
    thumbnail:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&h=600&q=80",
    highlights: ["Property management software", "Group-wide rollout", "End-to-end solutions"],
    challenge:
      "A contracting and trading group in Saudi Arabia needed property management software and complete end-to-end solutions across the group.",
    solution:
      "Teknopact created Property Management Software and provided complete end-to-end solutions for the whole group.",
    impact:
      "Property operations are managed on a unified platform supporting group-level visibility and control.",
  },
  {
    id: "saudi-civil-engineering-gap-assessment",
    category: "Civil Engineering",
    title: "Group-Wide System Gap Assessment & Audit",
    subtitle: "Six-month gap assessment and audit of systems for a Saudi civil engineering group.",
    location: "Saudi Arabia",
    tech: "IT Gap Assessment",
    company: "Civil Engineering Group",
    relatedCategory: "enterprise-ops",
    thumbnail:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&h=600&q=80",
    highlights: ["Group-wide gap assessment", "System audit", "Six-month engagement"],
    challenge:
      "A civil engineering group required an objective assessment of system gaps and audit coverage across the organization.",
    solution:
      "Teknopact conducted gap assessment and audit of systems for the whole group over six months.",
    impact:
      "Leadership received a clear baseline for remediation and investment prioritization across group IT systems.",
  },
  {
    id: "india-ncdex-trading-system",
    category: "Financial Markets",
    title: "Live Trading System Support & Market Infrastructure",
    subtitle:
      "28 months of live trading support plus SPOT market, margining, and batch optimization for NSE, NCDEX, and NSCCL.",
    location: "India",
    tech: "Capital Markets Systems",
    company: "NCDEX, NSE & NSCCL",
    relatedCategory: "specialized-verticals",
    thumbnail:
      "https://images.unsplash.com/photo-1611974789855-9c8a0a0e0e0e?auto=format&fit=crop&w=1200&h=600&q=80",
    highlights: ["28 months live trading support", "SPOT market delivery", "Batch process optimization"],
    challenge:
      "Capital markets institutions required reliable support for live trading systems, new market modules, and faster daily batch completion.",
    solution:
      "Teknopact delivered support and maintenance for a live trading system for 28 months, SPOT Market for NSE, order-based margining for NCDEX and NSCCL, and batch optimizations for faster daily completion.",
    impact:
      "Exchanges and clearing entities gained stable live operations, new market capabilities, and measurably faster batch cycles.",
  },
  {
    id: "china-ngcnyts-trading-system",
    category: "Financial Markets",
    title: "New Generation Chinese Yuan Trading System",
    subtitle: "Single sign-on across 14 fixed income markets for the People's Bank of China.",
    location: "Shanghai, China",
    tech: "Trading System & SSO",
    company: "People's Bank of China",
    relatedCategory: "specialized-verticals",
    thumbnail:
      "https://images.unsplash.com/photo-1639765484210-988bde00e430?auto=format&fit=crop&w=1200&h=600&q=80",
    highlights: ["SSO for 14 markets", "25–30 version releases", "Two-year engagement"],
    challenge:
      "The Central Bank of China needed a new generation yuan trading system with unified access across multiple fixed income markets and rigorous release management.",
    solution:
      "Teknopact delivered single sign-on for 14 different fixed income markets and served as DBA, programmer, deployment manager, and data migration expert—deploying 25–30 version releases over two years.",
    impact:
      "The NGCNYTS program gained reliable SSO, disciplined release cadence, and deep operational support across a mission-critical national trading platform.",
  },
  {
    id: "india-system-design-consulting",
    category: "Consulting",
    title: "Planning & Design for New System Architectures",
    subtitle: "Business analysis, requirements, and architectural plans for multiple consulting engagements.",
    location: "India",
    tech: "Solution Architecture & BA",
    company: "Consulting Clients",
    relatedCategory: "enterprise-ops",
    thumbnail:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&h=600&q=80",
    highlights: ["Requirements gathering", "Architectural planning", "Twelve-month program"],
    challenge:
      "Organizations launching new systems needed rigorous planning, requirements documentation, and architectural blueprints before build phases.",
    solution:
      "Teknopact delivered multiple engagements for planning and design including business analysis, requirement gathering documents, and architectural plans for new system designs.",
    impact:
      "Clients entered implementation with validated requirements and architecture, reducing rework and delivery risk.",
  },
  {
    id: "india-investment-bank-kyc",
    category: "Investment Banking",
    title: "First KYC System for Investment Bank",
    subtitle: "Agile design and implementation of the bank's inaugural KYC platform.",
    location: "India",
    tech: "KYC Platform",
    company: "Investment Bank",
    relatedCategory: "specialized-verticals",
    thumbnail:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&h=600&q=80",
    highlights: ["First KYC system", "Agile methodology", "Ten-month delivery"],
    challenge:
      "An investment bank needed its first formal KYC system to meet compliance requirements while supporting agile delivery.",
    solution:
      "Teknopact designed and implemented the first KYC system for the investment bank through an agile methodology.",
    impact:
      "The bank established a compliant KYC foundation on an accelerated timeline using iterative delivery practices.",
  },
  {
    id: "gcc-professional-services-it-advisory",
    category: "Commercial & Professional Services",
    title: "Regional IT Architecture & ICT Landscape Advisory",
    subtitle:
      "Bahrain IT architecture, national skill-gap study, Dubai ICT landscape, and feasibility studies across the GCC.",
    location: "GCC",
    tech: "IT Advisory & Feasibility Studies",
    company: "Regional Public & Private Entities",
    relatedCategory: "enterprise-ops",
    thumbnail:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&h=600&q=80",
    highlights: ["1200+ ICT roles mapped", "Dubai ICT landscape report", "Cybersecurity feasibility in Qatar"],
    challenge:
      "Public and private entities across the GCC required IT architecture management, workforce planning, and sector landscape assessments.",
    solution:
      "Teknopact managed IT architecture for a Bahrain office including hardware, network, backups, and FTP automation; conducted a national skill-gap study identifying 1200+ ICT roles; developed Dubai ICT landscape assessment for DCCA; and conducted feasibility studies including cybersecurity business in Qatar.",
    impact:
      "Clients gained evidence-based workforce and sector strategies plus operational IT foundations for regional offices.",
  },
  {
    id: "gcc-it-strategy-transformation",
    category: "IT Consulting",
    title: "Multi-Year IT Strategy & HR Transformation Programs",
    subtitle:
      "Cybersecurity academy business plan, five-year KSA IT strategy, HR frameworks, and IPO-readiness planning.",
    location: "GCC",
    tech: "Strategy & SMO",
    company: "Regional IT Firms",
    relatedCategory: "enterprise-ops",
    thumbnail:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&h=600&q=80",
    highlights: ["Five-year KSA IT strategy", "Performance management frameworks", "IPO-readiness roadmap"],
    challenge:
      "IT firms in the GCC needed long-horizon strategy, operating model support, and HR transformation aligned to board and investor expectations.",
    solution:
      "Since 2016, Teknopact has developed a cybersecurity academy business plan in Bahrain, a holistic five-year IT firm strategy in KSA with three implementation cycles as SMO, HR strategy with performance and compensation frameworks, and IPO-readiness strategy over three years.",
    impact:
      "Clients gained board-ready strategy artifacts, implemented operating rhythms, and HR systems aligned to growth and capital market objectives.",
  },
  {
    id: "gcc-digital-transformation-advisory",
    category: "IT Consulting",
    title: "Digital Transformation, Due Diligence & Public Sector Advisory",
    subtitle:
      "Startup due diligence, ICT impact assessments, digital maturity reviews, healthcare HIMS, and process re-engineering.",
    location: "GCC",
    tech: "Digital Transformation Advisory",
    company: "Banks, Public Sector & Healthcare Clients",
    relatedCategory: "enterprise-ops",
    thumbnail:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&h=600&q=80",
    highlights: ["45-case ICT impact assessment", "Healthcare HIMS evaluation", "Digital maturity for bank SMEs"],
    challenge:
      "Organizations across banking, public sector, and healthcare needed due diligence, maturity assessments, and transformation blueprints for complex regulated environments.",
    solution:
      "Teknopact conducted due diligence for technology startups; ICT impact assessment for 45 funded digital transformation cases in Bahrain; digital maturity assessment for a Qatari bank's SME customers; market entry strategy for NaaS from Australia; healthcare procurement gap assessment; HIMS evaluation for a 10-bed orthopedic hospital; GIS policy review in KSA; as-is process mapping for a development bank; and lounge management re-engineering for premium hospitality in Bahrain.",
    impact:
      "Clients advanced funding decisions, vendor selections, and transformation programs with independent, execution-ready advisory deliverables.",
  },
]

const thumbnailManifestPath = path.join(__dirname, "../src/lib/corporate-profile-thumbnails.json")
const thumbnailOverrides = fs.existsSync(thumbnailManifestPath)
  ? JSON.parse(fs.readFileSync(thumbnailManifestPath, "utf8"))
  : {
      "etqa-review-management-system": "/case-studies/etqa-review-management-system.jpg",
      "qatar-commercial-erp-crm": "/case-studies/qatar-commercial-erp-crm.jpg",
      "bahrain-management-erp-crm": "/case-studies/bahrain-management-erp-crm.jpg",
      "bahrain-transportation-erp-crm": "/case-studies/bahrain-transportation-erp-crm.jpg",
      "bahrain-restaurant-erp-crm": "/case-studies/bahrain-restaurant-erp-crm.jpg",
      "website-marketing-company": "/case-studies/website-marketing-company.jpg",
      "website-consulting-company": "/case-studies/website-consulting-company.jpg",
      "hocalwire-journalism-cms": "/case-studies/hocalwire-journalism-cms.jpg",
      "webrtc-conferencing-platform": "/case-studies/webrtc-conferencing-platform.jpg",
      "medical-education-conferencing": "/case-studies/medical-education-conferencing.jpg",
      "retail-marketing-management-app": "/case-studies/retail-marketing-management-app.jpg",
      "sip-voip-application-server": "/case-studies/sip-voip-application-server.jpg",
      "saudi-staff-augmentation-platform": "/case-studies/saudi-staff-augmentation-platform.jpg",
      "saudi-sap-service-industry": "/case-studies/saudi-sap-service-industry.jpg",
      "saudi-fire-safety-vat": "/case-studies/saudi-fire-safety-vat.jpg",
      "bahrain-tyres-vat-policy": "/case-studies/bahrain-tyres-vat-policy.jpg",
      "gcc-dental-order-patient-platform": "/case-studies/gcc-dental-order-patient-platform.jpg",
      "saudi-property-management-software": "/case-studies/saudi-property-management-software.jpg",
      "saudi-civil-engineering-gap-assessment": "/case-studies/saudi-civil-engineering-gap-assessment.jpg",
      "india-ncdex-trading-system": "/case-studies/india-ncdex-trading-system.jpg",
      "china-ngcnyts-trading-system": "/case-studies/china-ngcnyts-trading-system.jpg",
      "india-system-design-consulting": "/case-studies/india-system-design-consulting.jpg",
      "india-investment-bank-kyc": "/case-studies/india-investment-bank-kyc.jpg",
      "gcc-professional-services-it-advisory": "/case-studies/gcc-professional-services-it-advisory.jpg",
      "gcc-it-strategy-transformation": "/case-studies/gcc-it-strategy-transformation.jpg",
      "gcc-digital-transformation-advisory": "/case-studies/gcc-digital-transformation-advisory.jpg",
    }

for (const study of studies) {
  if (thumbnailOverrides[study.id]) {
    study.thumbnail = thumbnailOverrides[study.id]
  }
}

const header = `import type { CaseStudy, CaseStudySection } from "@/lib/case-studies"

function buildSections(study: Omit<CaseStudy, "sections">): CaseStudySection[] {
  return [
    { id: "challenge", title: "The Challenge", content: study.challenge },
    { id: "solution", title: "Our Solution", content: study.solution },
    {
      id: "approach",
      title: "Delivery approach",
      content: \`Teknopact partnered with \${study.company ?? "the client"} to align stakeholders, define success criteria, and deliver \${study.tech} with phased milestones and governed handover.\`,
    },
    { id: "impact", title: "The Impact", content: study.impact },
  ]
}

function study(input: Omit<CaseStudy, "sections">): CaseStudy {
  return { ...input, sections: buildSections(input) }
}

/** Case studies from Teknopact Corporate Profile 2026 V1 (slides 42–53). */
export const corporateProfileCaseStudies: CaseStudy[] = [
`

const body = studies
  .map(
    (s) => `  study({
    id: ${JSON.stringify(s.id)},
    category: ${JSON.stringify(s.category)},
    title: ${JSON.stringify(s.title)},
    subtitle: ${JSON.stringify(s.subtitle)},
    location: ${JSON.stringify(s.location)},
    tech: ${JSON.stringify(s.tech)},
    company: ${JSON.stringify(s.company)},
    challenge: ${JSON.stringify(s.challenge)},
    solution: ${JSON.stringify(s.solution)},
    impact: ${JSON.stringify(s.impact)},
    highlights: ${JSON.stringify(s.highlights)},
    relatedCategory: ${JSON.stringify(s.relatedCategory)},
    thumbnail: ${JSON.stringify(s.thumbnail)},
  })`
  )
  .join(",\n")

fs.writeFileSync(outPath, `${header}${body}\n]\n`, "utf8")
console.log("Wrote", studies.length, "case studies to", outPath)
