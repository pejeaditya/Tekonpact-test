import type { LucideIcon } from "lucide-react"

import { serviceClusters } from "@/lib/content"
import {
  Brain,
  Building2,
  Cloud,
  Factory,
  Layers3,
  Network,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react"

export type CatalogItem = {
  id: string
  name: string
  company: string
  subcategory: string
  description: string
  image: string
}

export type CatalogCategory = {
  id: string
  name: string
  title: string
  description: string
  icon: LucideIcon
  image: string
  items: CatalogItem[]
}

const categoryImages = {
  ai: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
  enterprise: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
  iot: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
  security: "https://images.unsplash.com/photo-1550751827-4bd374c1f58b?auto=format&fit=crop&w=1200&q=80",
  verticals: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80",
} as const

const productImages = [
  "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1607705703571-c5a8695f18f6?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1542393545-10f5cde2c810?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1639765484210-988bde00e430?auto=format&fit=crop&w=1200&q=80",
]

function img(index: number) {
  return productImages[index % productImages.length]
}

export const productCategories: CatalogCategory[] = [
  {
    id: "ai-ml",
    name: "AI & Automation",
    title: "Artificial Intelligence, Machine Learning, and Agentic Automation",
    description:
      "Specialized models, multi-agent orchestration, and autonomous workflows that move enterprises from descriptive analytics to agentic execution.",
    icon: Brain,
    image: categoryImages.ai,
    items: [
      {
        id: "tensorgo-go-x",
        name: "Go-X",
        company: "TensorGo",
        subcategory: "Conversational SaaS",
        description:
          "Go-X is a conversational SaaS platform engineered to maximize virtual meeting and sales productivity through physiological analytics and natural language processing. The system tracks real-time biometric indicators while ensuring interaction authenticity via advanced facial and voice biometrics.",
        image: img(0),
      },
      {
        id: "tensorgo-zai",
        name: "Zai",
        company: "TensorGo",
        subcategory: "Multi-Agent Intelligence",
        description:
          "Zai operates as an advanced multi-agent intelligence platform designed for the agentic era, moving beyond basic assistance to autonomous planning and execution with lifelike AI avatars and voice models.",
        image: img(1),
      },
      {
        id: "tensorgo-hyperspace",
        name: "hyperspace (PaaS)",
        company: "TensorGo",
        subcategory: "Deep Learning Infrastructure",
        description:
          "A low-code, deep learning environment designed to abstract the complexities of managing specialized AI infrastructure, enabling rapid design, training, and scaling of customized neural networks.",
        image: img(2),
      },
      {
        id: "tensorgo-apiaas",
        name: "API as a Service (APIaaS)",
        company: "TensorGo",
        subcategory: "AI Model Integration",
        description:
          "A state-of-the-art model fabric featuring an expansive catalog of pre-built, domain-specific AI modules for enterprise integration spanning facial biometrics, retail footfall analysis, and workplace safety compliance.",
        image: img(3),
      },
      {
        id: "tensorgo-adams",
        name: "adams (ADAS)",
        company: "TensorGo",
        subcategory: "Edge AI & Computer Vision",
        description:
          "Developed in collaboration with Intel, adams serves as a proactive, edge-based driver monitoring platform aimed at mitigating road accidents caused by distraction and fatigue using low-latency computer vision.",
        image: img(4),
      },
      {
        id: "netoai-ving",
        name: "ViNG",
        company: "NetoAI",
        subcategory: "Multi-Agent Platform",
        description:
          "ViNG functions as a low-code, multi-agent AI environment powered by telecom-specific large action models, supporting continuous learning and agent-to-agent communication for telecom operators.",
        image: img(5),
      },
      {
        id: "netoai-digi-twin",
        name: "Digi Twin",
        company: "NetoAI",
        subcategory: "Network AI Simulation",
        description:
          "An advanced AI simulation platform that constructs a real-time digital replica of telecom networks using complex knowledge graphs for predictive scenario planning without disrupting physical operations.",
        image: img(6),
      },
      {
        id: "netoai-napi",
        name: "NAPI",
        company: "NetoAI",
        subcategory: "Network Orchestration",
        description:
          "An AI-powered network orchestrator designed to abstract multi-vendor legacy and modern architectures into a unified API with zero-touch service activations.",
        image: img(7),
      },
      {
        id: "netoai-tslam",
        name: "TSLAM",
        company: "NetoAI",
        subcategory: "Domain-Specific LLM",
        description:
          "The telecommunications industry's foundational domain-specific large language model, delivering highly accurate reasoning and automated action capabilities tailored for network operations.",
        image: img(0),
      },
      {
        id: "aiqmen-agenticaxis",
        name: "AgenticAxis",
        company: "AiQmen",
        subcategory: "Autonomous Workflow Platform",
        description:
          "A sophisticated platform that allows organizations to deploy autonomous business workflows driven by collaborative, intelligent AI agents with built-in corporate governance protocols.",
        image: img(1),
      },
      {
        id: "aiqmen-insightlens",
        name: "InsightLens",
        company: "AiQmen",
        subcategory: "Natural Language Querying",
        description:
          "A horizontal AI augmenter designed to convert complex, structured enterprise datasets into contextual insights via natural language querying and dynamically generated charts.",
        image: img(2),
      },
      {
        id: "aiqmen-planogram-contract",
        name: "PlanogramLens & ContractLens",
        company: "AiQmen",
        subcategory: "Vertical AI Augmenters",
        description:
          "PlanogramLens automates retail shelf audits via computer vision, while ContractLens structures, searches, and extracts critical clauses from fragmented vendor agreements.",
        image: img(3),
      },
      {
        id: "aiqmen-forecastlens",
        name: "ForecastLens",
        company: "AiQmen",
        subcategory: "Time-Series Forecasting",
        description:
          "An advanced time-series forecasting platform that autonomously evaluates historical data to select the optimal statistical model for accurate business projections.",
        image: img(4),
      },
      {
        id: "tablesprint-agents",
        name: "Premium AI Agents",
        company: "TableSprint",
        subcategory: "Workflow Automation",
        description:
          "An ecosystem of pre-built, premium AI agents designed to execute complex enterprise workflows including autonomous sales agents and customer support agents.",
        image: img(5),
      },
      {
        id: "tablesprint-builder",
        name: "Application Builder",
        company: "TableSprint",
        subcategory: "Enterprise App Platform",
        description:
          "Empowers operational teams to transition workflows into functional enterprise applications leveraging integrated smart databases, live analytical dashboards, and rapid deployment tools.",
        image: img(6),
      },
      {
        id: "erlin-insights",
        name: "Insights Platform",
        company: "Erlin AI",
        subcategory: "AI Search Optimization",
        description:
          "A comprehensive search operating system engineered to help enterprises track, analyze, and optimize their brand visibility across dominant generative AI models.",
        image: img(7),
      },
      {
        id: "erlin-action",
        name: "Opportunities & Action Center",
        company: "Erlin AI",
        subcategory: "Content Generation Pipeline",
        description:
          "Evaluates AI search data to surface competitive gaps and orchestrates human-in-the-loop automated workflows for content research, brief creation, and drafting.",
        image: img(0),
      },
      {
        id: "scribe-capture",
        name: "Capture & Optimize",
        company: "Scribe",
        subcategory: "Process Documentation",
        description:
          "A workflow documentation platform that automatically generates illustrated, step-by-step guides by passively monitoring keystrokes and system clicks during routine operations.",
        image: img(1),
      },
      {
        id: "scribe-ai",
        name: "Scribe AI",
        company: "Scribe",
        subcategory: "AI-Powered Playbooks",
        description:
          "Leverages NLP models to refine captured processes by automatically generating titles, contextual descriptions, and actionable summaries with enterprise security redaction.",
        image: img(2),
      },
      {
        id: "xpertnest-bharatearns",
        name: "BharatEarns",
        company: "Xpertnest",
        subcategory: "DSA CRM Solution",
        description:
          "An AI-powered Direct Selling Agent CRM platform built for loan businesses, NBFCs, and fintech aggregators with automated lead sourcing, underwriting, and payout management.",
        image: img(3),
      },
    ],
  },
  {
    id: "enterprise-ops",
    name: "Enterprise Strategy",
    title: "Enterprise Strategy, Operations, and Business Transformation",
    description:
      "Intelligence-led execution platforms that link boardroom strategy with ground-level operational metrics and automated corporate reporting.",
    icon: Building2,
    image: categoryImages.enterprise,
    items: [
      {
        id: "cascade-planner",
        name: "Planner & Strategy Silos",
        company: "Cascade",
        subcategory: "Strategic Execution Platform",
        description:
          "A dynamic organizational tool designed to liberate corporate strategy from static slide decks, harmonizing OKRs and Project Portfolio Management within a unified digital ecosystem.",
        image: img(4),
      },
      {
        id: "cascade-metrics",
        name: "Deep Metrics & Dashboards",
        company: "Cascade",
        subcategory: "Real-Time Performance Analytics",
        description:
          "Centralizes corporate data to calculate real-time alignment and health scores, transforming executive decision-making into a continuous, data-driven optimization process.",
        image: img(5),
      },
      {
        id: "cascade-tapestry-ai",
        name: "Tapestry AI & AI Insights",
        company: "Cascade",
        subcategory: "Intelligence Engine",
        description:
          "Weaves quantitative performance metrics with qualitative human context from emails, meeting transcripts, and documents to reveal strategic drift.",
        image: img(6),
      },
      {
        id: "cascade-tapestry-connect",
        name: "Tapestry Connect & Briefings",
        company: "Cascade",
        subcategory: "Automated Reporting",
        description:
          "Automatically captures real-time context from communication channels and generates curated AI Executive Briefings with critical signals and risk alerts.",
        image: img(7),
      },
      {
        id: "xstaredge-eam",
        name: "Enterprise Assets Management",
        company: "Xstaredge",
        subcategory: "Asset Lifecycle Tracking",
        description:
          "Comprehensive EAM platforms utilizing next-generation intelligence and lifecycle tracking to govern physical and digital assets through predictive automation.",
        image: img(0),
      },
      {
        id: "xstaredge-finance",
        name: "Finance Automation Systems",
        company: "Xstaredge",
        subcategory: "Operational Streamlining",
        description:
          "Highly customized finance automation systems that streamline intricate monetary workflows and integrate advanced ERP solutions for rapid financial consolidation.",
        image: img(1),
      },
      {
        id: "xstaredge-callcentre",
        name: "Agentic Call Centre Platform",
        company: "Xstaredge",
        subcategory: "Customer Interaction AI",
        description:
          "Sophisticated agentic call centre platforms powered by conversational AI, designed to execute human-less customer interactions with multilingual fluency.",
        image: img(2),
      },
      {
        id: "4seer-4scope",
        name: "4Scope ESG Platform",
        company: "4Seer Tech.",
        subcategory: "Sustainability Reporting",
        description:
          "A centralized, automated enterprise software platform designed to extract, control, and report comprehensive ESG metrics including Scope 1 through Scope 3 greenhouse gas inventories.",
        image: img(3),
      },
      {
        id: "4seer-4vue",
        name: "4Vue Data Management",
        company: "4Seer Tech.",
        subcategory: "Automated Data Pipelines",
        description:
          "An AI-driven data engineering hub allowing enterprises to construct robust, low-code ELT pipelines that unify fragmented data lakes and warehouses.",
        image: img(4),
      },
      {
        id: "4seer-fabric",
        name: "Microsoft Fabric & OpenAI",
        company: "4Seer Tech.",
        subcategory: "Enterprise Consulting",
        description:
          "Elite enterprise consulting implementing Microsoft Fabric's unified analytics architecture and integrating cutting-edge OpenAI models for workflow orchestration.",
        image: img(5),
      },
      {
        id: "pirl-nforge",
        name: "nForge & sTudio",
        company: "Pirl Labs",
        subcategory: "No-Code Development",
        description:
          "An enterprise-grade no-code application development kit with nForge logic builder and sTudio visual app creation for IoT sensor data integration.",
        image: img(6),
      },
      {
        id: "pirl-trellis",
        name: "Trellis & Guardian",
        company: "Pirl Labs",
        subcategory: "Application Deployment",
        description:
          "Trellis runtime engine supports complex hierarchical data processing while Guardian manages the complete application lifecycle with stringent access controls.",
        image: img(7),
      },
      {
        id: "tth-mobility",
        name: "Mobility & Assurance Services",
        company: "TTH Consulting",
        subcategory: "Enterprise IT Advisory",
        description:
          "Deeply experienced advisory firm leveraging proprietary frameworks to rapidly transition enterprise operations to mobile platforms and deliver rigorous assurance services.",
        image: img(0),
      },
    ],
  },
  {
    id: "iot-manufacturing",
    name: "IoT & Manufacturing",
    title: "Industry 4.0, IoT, Smart Manufacturing, and ESG Integration",
    description:
      "Advanced sensing hardware unified with cloud analytics for predictive ecosystems, autonomous physical intervention, and environmental compliance.",
    icon: Factory,
    image: categoryImages.iot,
    items: [
      {
        id: "ingenious-traceability",
        name: "Traceability & Vision AI",
        company: "Ingenious Tech",
        subcategory: "IIoT Quality Control",
        description:
          "Advanced track-and-trace system managing product genealogy from manufacturing origin to final delivery, complemented by AI-powered vision inspection for real-time defect identification.",
        image: img(1),
      },
      {
        id: "ingenious-predictive",
        name: "Predictive Maintenance",
        company: "Ingenious Tech",
        subcategory: "Equipment Monitoring",
        description:
          "Utilizes high-fidelity ultrasonic and vibration sensors attached to machine spindles to forecast mechanical degradation and prevent catastrophic equipment downtime.",
        image: img(2),
      },
      {
        id: "plantops-mes",
        name: "MES Implementation",
        company: "PlantOps",
        subcategory: "Digital Manufacturing",
        description:
          "Specializes in implementation, integration, and long-term support of advanced controlled manufacturing software including POMS, Syncade, and PharmaSuite.",
        image: img(3),
      },
      {
        id: "plantops-compliance",
        name: "Regulatory Compliance",
        company: "PlantOps",
        subcategory: "Batch & Recipe Mgmt",
        description:
          "Deploys strict compliance architectures adhering to FDA guidelines and 21 CFR Part 11 standards with secure electronic batch records and digital work instructions.",
        image: img(4),
      },
      {
        id: "6thenergy-edge",
        name: "Edge-Enabled IoT Hardware",
        company: "6th Energy",
        subcategory: "AI Embedded Nodes",
        description:
          "An AI-powered embedded edge node designed to interface with legacy meters, industrial cameras, and multi-protocol modbus systems for secure, low-latency insights.",
        image: img(5),
      },
      {
        id: "6thenergy-bms",
        name: "Predictive Automation",
        company: "6th Energy",
        subcategory: "Building Management",
        description:
          "Proprietary software ecosystem executing comprehensive predictive maintenance, automating environmental cooling controls, and providing mobile-accessible dashboards.",
        image: img(6),
      },
      {
        id: "fluxgen-aquagen",
        name: "AquaGen Platform",
        company: "Fluxgen",
        subcategory: "Water Management",
        description:
          "An end-to-end IoT tracking architecture designed to monitor and analyze volumetric water consumption, detect subterranean leakages, and optimize distribution networks.",
        image: img(7),
      },
      {
        id: "fluxgen-aquagpt",
        name: "AquaGPT",
        company: "Fluxgen",
        subcategory: "Predictive Alerting",
        description:
          "A generative AI assistant providing facility managers with prescriptive recommendations and smart, real-time notifications regarding anomalous water usage patterns.",
        image: img(0),
      },
      {
        id: "sensorise-qosim",
        name: "Multi Profile QoSIM",
        company: "Sensorise",
        subcategory: "M2M Connectivity",
        description:
          "Industrial-grade, multi-profile M2M SIM cards with advanced remote provisioning, integrating with over 700 networks globally for complex IoT ecosystems.",
        image: img(1),
      },
      {
        id: "sensorise-ais140",
        name: "AIS-140 State Backend",
        company: "Sensorise",
        subcategory: "Fleet & Asset Tracking",
        description:
          "Fleet and asset management platforms utilizing AI for real-time vehicle tracking, fuel consumption analytics, and AIS-140 regulatory compliance monitoring.",
        image: img(2),
      },
      {
        id: "grenerobotics-greneos",
        name: "greneOS & greneApps",
        company: "GreeneRobotics",
        subcategory: "AI Resource Engine",
        description:
          "A patented AI-driven resource planning engine serving as the foundational layer for composing autonomous enterprise applications with zero-touch stakeholder journeys.",
        image: img(3),
      },
      {
        id: "grenerobotics-indrajaal",
        name: "Indrajaal",
        company: "GreeneRobotics",
        subcategory: "Autonomous Defense",
        description:
          "A wide-area networked autonomous defense solution engineered to neutralize modern unmanned aerial threats over expanses reaching 4,000 square kilometers.",
        image: img(4),
      },
      {
        id: "xpertnest-geospatial",
        name: "Geospatial Intelligence",
        company: "Xpertnest",
        subcategory: "Smart City Analytics",
        description:
          "AI-enabled geospatial analytic systems translating GIS data and satellite imagery into actionable knowledge for intelligent traffic management and environmental monitoring.",
        image: img(5),
      },
      {
        id: "xpertnest-dpp",
        name: "Data Processing Platform",
        company: "Xpertnest",
        subcategory: "Computer Vision AI",
        description:
          "Automates extraction and categorization of structured information from unstructured text and handwritten documents via advanced optical character recognition.",
        image: img(6),
      },
      {
        id: "xpertnest-agrix",
        name: "AgriX",
        company: "Xpertnest",
        subcategory: "Precision Farming",
        description:
          "An agricultural data solution utilizing AI and machine learning to optimize rural production, identify crop diseases, and execute automated fertilizer applications.",
        image: img(7),
      },
    ],
  },
  {
    id: "cyber-infra",
    name: "Cyber & Infrastructure",
    title: "Cybersecurity, IT Infrastructure, and Telecommunications",
    description:
      "Modernizing legacy systems, migrating to cloud, and enforcing zero-trust compliance protocols against emerging AI-driven cyber threats.",
    icon: ShieldCheck,
    image: categoryImages.security,
    items: [
      {
        id: "finesse-roadmap",
        name: "AI Transformation Roadmap",
        company: "Finesse",
        subcategory: "CXO Advisory",
        description:
          "Elite CXO advisory services initiating digital overhauls through a meticulous 360-degree AI readiness assessment with sequenced implementation milestones.",
        image: img(0),
      },
      {
        id: "finesse-guardrails",
        name: "AI Guardrails & LLM Gateway",
        company: "Finesse",
        subcategory: "GenAI Governance",
        description:
          "Comprehensive AI guardrails securing ecosystems against algorithmic bias, IP leakage, and regulatory non-compliance via LLM firewalls and tokenization.",
        image: img(1),
      },
      {
        id: "finesse-soc",
        name: "Cyberhub 24/7 SOC & VAPT",
        company: "Finesse",
        subcategory: "Threat Intelligence",
        description:
          "Global 24/7 Cognitive Security Operations Center with predictive threat intelligence, VAPT, and Red Teaming services simulating real-world cyberattacks.",
        image: img(2),
      },
      {
        id: "finesse-zerotrust",
        name: "Zero Trust & Cloud Assurance",
        company: "Finesse",
        subcategory: "Infrastructure Security",
        description:
          "Comprehensive Zero Trust architecture built upon continuous verification, with Cloud Security Posture Management and dynamic runtime protection.",
        image: img(3),
      },
      {
        id: "finesse-qlik",
        name: "Qlik BI & RPA Services",
        company: "Finesse",
        subcategory: "Intelligent Automation",
        description:
          "Elite integrator deploying Qlik-based business intelligence systems and intelligent Robotic Process Automation with OCR for unstructured data workflows.",
        image: img(4),
      },
      {
        id: "finesse-treasury",
        name: "Corporate Treasury Mgmt",
        company: "Finesse",
        subcategory: "Finance Automation",
        description:
          "Comprehensive deployment of Kyriba Treasury Management Systems automating cash flow forecasting, liquidity optimization, and foreign exchange risk neutralization.",
        image: img(5),
      },
      {
        id: "ivalue-mss",
        name: "Managed Security Services",
        company: "iValue Group",
        subcategory: "IT Infrastructure",
        description:
          "Premier technology aggregator delivering elite Managed Security Services with continuous real-time threat detection and active Security Operations Center coverage.",
        image: img(6),
      },
      {
        id: "ivalue-compliance",
        name: "Compliance Stacks",
        company: "iValue Group",
        subcategory: "Multi-OEM Solutions",
        description:
          "Highly specialized, technology-led multi-OEM solution stacks engineered for banking, government, and telecom with GDPR, HIPAA, and ISO 27701 alignment.",
        image: img(7),
      },
      {
        id: "teleindia-submarine",
        name: "Submarine Network Solutions",
        company: "Teleindia",
        subcategory: "Network Integration",
        description:
          "Holistic network deployment specializing in submarine network solutions, overseeing implementation, migration, and optimization of subsea fiber-optic infrastructure.",
        image: img(0),
      },
      {
        id: "teleindia-datasamudra",
        name: "Datasamudra & TOS",
        company: "Teleindia",
        subcategory: "Data Center Services",
        description:
          "A concurrently maintainable data center facility delivering premium colocation, hosting, and secure cloud environments with Global Network Operations Center monitoring.",
        image: img(1),
      },
    ],
  },
  {
    id: "specialized-verticals",
    name: "Specialized Verticals",
    title: "Specialized Vertical Applications and Emerging Technologies",
    description:
      "Industry-specific solutions targeting explicit bottlenecks through deep fusion of software capability and domain knowledge.",
    icon: Sparkles,
    image: categoryImages.verticals,
    items: [
      {
        id: "pathfndr-packages",
        name: "Intelligent Dynamic Packages",
        company: "Pathfndr",
        subcategory: "Travel Commerce",
        description:
          "A sophisticated commerce platform transforming raw customer travel intent into instantly bookable, fully branded multi-city itineraries in under sixty seconds.",
        image: img(2),
      },
      {
        id: "pathfndr-ranking",
        name: "Automated Ranking Engines",
        company: "Pathfndr",
        subcategory: "AI Intelligence Layer",
        description:
          "A deep learning Intelligence Layer processing immense datasets to rank global destinations and generate accurate price predictions for contextual discovery.",
        image: img(3),
      },
      {
        id: "cxsphere-aiops",
        name: "AIOps & CCaaS",
        company: "Cxsphere",
        subcategory: "IT Service Management",
        description:
          "Advanced AIOps and Contact Center as a Service frameworks leveraging machine intelligence to automate routine support workflows and enhance customer experience.",
        image: img(4),
      },
      {
        id: "fogwind-smart-factory",
        name: "Smart Factory Solutions",
        company: "Fogwind",
        subcategory: "Industry X.0",
        description:
          "Advancing comprehensive smart factory initiatives driving the convergence of digital technology and physical manufacturing operations within the Industry X.0 paradigm.",
        image: img(5),
      },
      {
        id: "infeedo-hr",
        name: "AI - HR Solutions",
        company: "Infeedo AI",
        subcategory: "Human Resources Tech",
        description:
          "Specialized AI solutions engineered to optimize HR workflows with employee engagement, predictive sentiment analysis, and sophisticated talent retention strategies.",
        image: img(6),
      },
      {
        id: "1works-edtech",
        name: "AI - Edtech",
        company: "1works",
        subcategory: "Educational Technology",
        description:
          "Innovative AI-driven digital tools geared toward the educational technology sector, integrating institutional trust and machine learning for scalable, personalized learning.",
        image: img(7),
      },
    ],
  },
]

export const serviceCategoryImages: Record<string, string> = {
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

export const serviceCategoryIcons: Record<string, LucideIcon> = {
  erp: Layers3,
  "core-banking": Building2,
  managed: Cloud,
  "value-added": Sparkles,
  blockchain: Network,
  bpm: Workflow,
}

export const serviceCategoryNames: Record<string, string> = {
  erp: "ERP",
  "core-banking": "Core Banking",
  managed: "Managed Services",
  "value-added": "Value Added",
  blockchain: "Blockchain",
  bpm: "BPM",
}

export function buildServiceCategories(): CatalogCategory[] {
  return serviceClusters.map((cluster) => ({
    id: cluster.id,
    name: serviceCategoryNames[cluster.id] ?? cluster.title,
    title: cluster.title,
    description: cluster.summary,
    icon: serviceCategoryIcons[cluster.id] ?? cluster.icon,
    image: serviceCategoryImages[cluster.id] ?? productCategories[0].image,
    items: cluster.services.map((service, index) => ({
      id: service.id,
      name: service.title,
      company: "",
      subcategory: cluster.title,
      description: service.description,
      image:
        serviceCategoryImages[cluster.id] ??
        productCategories[index % productCategories.length].image,
    })),
  }))
}
