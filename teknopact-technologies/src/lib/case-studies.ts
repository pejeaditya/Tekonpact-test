import { ultimateCaseStudies } from "@/lib/ultimate-case-studies"

export type CaseStudySection = {
  id: string
  title: string
  content: string
}

export type CaseStudy = {
  id: string
  category: string
  title: string
  subtitle: string
  location: string
  tech: string
  company?: string
  challenge: string
  solution: string
  impact: string
  highlights: string[]
  sections: CaseStudySection[]
  thumbnail: string
  relatedCategory?: string
}

const flagshipCaseStudies: CaseStudy[] = [
  {
    id: "hidden-network-savings",
    category: "Telecommunications",
    title: "Uncovering £135 Million in Hidden Network Savings",
    subtitle:
      "How cognitive AI and automated discovery algorithms eliminated massive supplier billing leaks.",
    location: "United Kingdom",
    tech: "Cognitive Core Platform",
    company: "Leading UK Telecom Operator",
    challenge:
      "A leading telecommunications operator in the United Kingdom was hemorrhaging millions of pounds annually due to massive supplier billing leaks. The organization relied heavily on external infrastructure suppliers, but their legacy ERP structures were inherently leaky. They were paying recurring fees for physical network elements that were completely unused, yet still actively billed by their suppliers. Manual auditing of these massive hardware ecosystems was impossible, leaving executives completely blind to the true extent of their margin leakage.",
    solution:
      "We engineered a unified database specifically built to ingest and normalize thousands of complex, disparate supplier invoices. To provide absolute cognitive oversight, we deployed intelligent, automated discovery algorithms designed to continuously scan this new database. The AI autonomously cross-referenced the external supplier invoices against the actual, actively utilized network elements within the operator's physical infrastructure, instantly flagging discrepancies.",
    impact:
      "The automated discovery algorithms successfully identified the unused but actively billed network elements. This resulted in an extraordinary £135 million in direct annual cost savings for the operator. We completely eradicated billing friction by reconciling previously fragmented systems into a single source of truth, ensuring future supplier invoices are instantly verified against active network reality before payment is ever authorized.",
    highlights: ["£135M annual cost savings", "Automated supplier verification", "Single source of truth"],
    sections: [],
    relatedCategory: "cyber-infra",
    thumbnail: "/case-studies/Uncovering135MillioninHiddenNetworkSavings.jpg",
  },
  {
    id: "global-rides-network-integrity",
    category: "Transportation",
    title: "Scaling Network Integrity for 14 Million Global Rides",
    subtitle:
      "Securing massive-scale hybrid-cloud infrastructure against critical IPv4 exhaustion.",
    location: "Global",
    tech: "Hybrid Cloud Security Protocols",
    company: "Global Transportation Network",
    challenge:
      "For global transportation and ride-sharing networks, absolute platform uptime is the lifeblood of the business. A leading global transportation network was facing a critical infrastructure crisis: massive IPv4 address exhaustion at an unprecedented scale. Without immediate architectural intervention, the platform risked severe network degradation, threatening the operational stability of a digital system relied upon by tens of millions of users worldwide.",
    solution:
      "We engineered and delivered a purpose-built, compliance-specific cybersecurity stack across their complex hybrid multi-cloud environment. To address the critical bottleneck of IPv4 exhaustion, we deployed sophisticated architectural solutions focusing on advanced application lifecycle management. This involved integrating highly specialized network security protocols and load-balancing architectures designed to manage massive, concurrent connection loads seamlessly.",
    impact:
      "The deployment of these purpose-built hybrid-cloud architectures successfully mitigated the threat of IPv4 address exhaustion. The most profound metric of success was the flawless preservation of network integrity. Our architectural solutions guaranteed maximum application availability, seamlessly supporting a platform that facilitated 14 million rides across an ecosystem of 91 million customers without a single technical friction point.",
    highlights: ["14 million rides supported", "91 million customers served", "IPv4 exhaustion mitigated"],
    sections: [],
    relatedCategory: "cyber-infra",
    thumbnail: "/case-studies/ScalingNetworkIntegrityfor14MillionGlobalRides.jpg",
  },
  {
    id: "ecommerce-doorstep-returns",
    category: "E-commerce",
    title: "Automating E-Commerce Doorstep Return Analysis",
    subtitle:
      "Building AI-native mobile applications via Vibe Coding to stop supply chain revenue leakage.",
    location: "India",
    tech: "Vibe Coding & Vector Databases",
    company: "Major E-commerce Platform",
    challenge:
      "One of the largest e-commerce platforms was suffering from systemic revenue leakage at the last mile of their logistics chain. During doorstep product exchanges, delivery personnel were routinely overlooking cosmetic defects on returned items. Consequently, faulty inventory was re-entering the supply chain, which inflated reprocessing costs, corrupted inventory data, and severely damaged consumer trust when defective items were resold.",
    solution:
      "Rather than relying on sluggish legacy IT engineering pipelines, we utilized a transformative no-code AI platform. Using natural language prompts and embedded vector databases, we rapidly prototyped and deployed a mobile-first image analysis application in mere weeks. Delivery agents were equipped to capture real-time images at the customer doorstep, which were instantly processed by our AI backend to autonomously detect anomalies and cosmetic defects.",
    impact:
      "This real-time edge AI analysis achieved a 7% improvement in doorstep return accuracy. By catching defective items before they re-entered the supply chain, the platform significantly drove down per-unit handling and reverse logistics costs. Furthermore, it enabled instantaneous, transparent communication with consumers regarding the status of their returns, elevating the overall brand experience.",
    highlights: ["7% return accuracy improvement", "Reduced reverse logistics costs", "Real-time defect detection"],
    sections: [],
    relatedCategory: "ai-ml",
    thumbnail: "/case-studies/AutomatingE-CommerceDoorstepReturnAnalysis.jpg",
  },
  {
    id: "industrial-water-reduction",
    category: "Heavy Manufacturing",
    title: "Slashing Industrial Water Consumption by 20%",
    subtitle:
      "Utilizing precision IoT fluid telemetry to combat severe resource stress in heavy manufacturing.",
    location: "Atagarh",
    tech: "IoT Flow Meters & AI Dashboards",
    company: "Ferrochromite Production Plant",
    challenge:
      "In heavy manufacturing, specifically within ferrochromite production, water is a critical and heavily utilized operational resource. A major industrial plant in Atagarh was struggling with highly inefficient fluid utilization. Their existing management approach required continuous manual guesswork, leaving the facility vulnerable to undetected leaks and unoptimized fluid dynamics. This reactive, estimation-based approach was no longer economically or ecologically viable.",
    solution:
      "We fundamentally transformed the plant's resource management by transitioning them from dangerous estimation to absolute precision. We deployed advanced physical infrastructure, including ultrasonic flow meters and level sensors, directly into the industrial environment. This hardware was paired with proprietary AI-driven analytical dashboards, establishing a real-time IoT monitoring system that allowed operators to shift to predictive usage and instantaneous leak prevention.",
    impact:
      "The integration of advanced IoT and AI abstraction layers demonstrated the immense scalability of fluid dynamics optimization. The implementation cut the plant's water usage from 1 cusec down to 0.5 cusecs. This 20% reduction conserved a volume of water sufficient to meet the daily requirements of over 28,000 households, proving that industrial ESG compliance and significant operational cost savings can be achieved simultaneously.",
    highlights: ["20% water consumption reduction", "28,000+ households equivalent saved", "Predictive leak prevention"],
    sections: [],
    relatedCategory: "iot-manufacturing",
    thumbnail: "/case-studies/SlashingIndustrialWaterConsumptionby20.jpg",
  },
  {
    id: "bpo-agentic-retention",
    category: "BPO Ecosystems",
    title: "Optimizing BPO Customer Retention via Agentic AI",
    subtitle:
      "How multi-modal generative AI eliminated batch-ETL delays to accurately predict consumer behavior.",
    location: "Global",
    tech: "Multi-Modal Agentic AI",
    company: "Global BPO Provider",
    challenge:
      "Legacy business process outsourcing (BPO) operations were suffering from a systemic failure to detect real-time behavioral signals. Because they relied heavily on batch-ETL processes, there were unavoidable data processing delays that blinded the organization to live customer sentiment. This lag in telemetry resulted in an inability to intervene during critical moments, leading to dangerously high and unavoidable customer churn across their ecosystem.",
    solution:
      "We completely overhauled their data ingestion pipeline to eliminate data latency. By deploying multi-modal, multi-lingual generative AI models, we bypassed legacy batch-ETL delays entirely. Our architecture unified unstructured telemetry from diverse channels—including voice calls, ITSM tickets, emails, and e-commerce touchpoints. This allowed us to construct a real-time customer identity graph that updates instantaneously during live customer interactions.",
    impact:
      "This cognitive deployment allowed the client to predict customer behavior with an exceptional 85–90% accuracy rate. By continuously analyzing two-way conversational data in real-time, the organization is now able to deploy automated, proactive retention offers. These interventions are triggered dynamically by sentiment analysis algorithms, fundamentally solving their historical churn crisis and preserving massive revenue streams.",
    highlights: ["85–90% prediction accuracy", "Real-time identity graph", "Proactive retention automation"],
    sections: [],
    relatedCategory: "ai-ml",
    thumbnail: "/case-studies/OptimizingBPOCustomerRetentionviaAgenticAI.jpg",
  },
  {
    id: "fmcg-turnover-reduction",
    category: "FMCG Retail",
    title: "Plummeting Early Turnover via Conversational AI Analytics",
    subtitle:
      "Replacing static HR reviews with real-time sentiment surveys to reduce attrition to 12%.",
    location: "Global",
    tech: "Conversational AI Pulse Surveys",
    company: "FMCG Retail Enterprise",
    challenge:
      "A fast-moving consumer goods (FMCG) giant was experiencing alarming 30% early attrition rates among its heavily distributed retail teams. The organization relied on static, annual HR reviews that completely failed to capture real-time employee sentiment. This lack of visibility into early burnout indicators meant the company was constantly bleeding institutional talent and facing an unsustainable recruitment capital drain.",
    solution:
      "We replaced their legacy HR review systems with continuous, automated conversational AI pulse surveys. These tools were deployed across regional teams to analyze real-time text sentiment and catch early, subtle indicators of staff burnout and disengagement. We provided localized management with regional analytics dashboards, granting them direct visibility into the specific morale metrics of their distributed workforce.",
    impact:
      "The integration of conversational AI analytics yielded profound cultural and financial metrics. Early turnover rates plummeted from a dangerous 30% down to a highly manageable 12%. By proactively identifying burnout, the organization preserved critical institutional talent, stabilized its distributed retail teams, and halted the severe capital drain associated with constant staff replacement.",
    highlights: ["30% → 12% early turnover", "Real-time sentiment surveys", "Regional morale dashboards"],
    sections: [],
    relatedCategory: "ai-ml",
    thumbnail: "/case-studies/PlummetingEarlyTurnoverviaConversationalAIAnalytics.jpg",
  },
  {
    id: "media-ai-restoration",
    category: "Animation Studio",
    title: "Transforming Legacy Media Economics via AI Restoration",
    subtitle:
      "Harnessing deep learning upscaling to expand aging 4:3 content to pristine 16K resolution.",
    location: "Global",
    tech: "Generative AI & Deep Learning",
    company: "Major Animation Studio",
    challenge:
      "A major animation studio was struggling to monetize its valuable catalog of classic content because the media was locked in aging standard definition 4:3 aspect ratios. When viewed on modern displays, the content suffered from severe pixelation and blurriness. Relying on traditional, human engineering pipelines for manual visual restorations commanded prohibitively high costs and massive amounts of manpower, making mass restoration economically unfeasible.",
    solution:
      "We completely circumvented the need for deep, manual engineering teams by deploying a sophisticated generative AI platform harnessing deep learning and advanced computer vision. We implemented a super-resolution upscaling tool that seamlessly expanded the aging 4:3 aspect ratio to 16:9 without introducing visual distortion. Simultaneously, neural networks automatically elevated the resolution to pristine 16K clarity.",
    impact:
      "The quantitative efficacy of this Generative AI deployment was profound. The system operated with a 98.76% accuracy rate in visual enhancement, completely outperforming manual methods. The automation of sketch-to-photo conversions drove a 93% spike in overall productivity, reduced historical production costs by an incredible 83.33%, and saved approximately 200 manual hours per project.",
    highlights: ["98.76% visual enhancement accuracy", "83.33% cost reduction", "200 manual hours saved per project"],
    sections: [],
    relatedCategory: "ai-ml",
    thumbnail: "/case-studies/TransformingLegacyMediaEconomicsviaAIRestoration.jpg",
  },
  {
    id: "blockchain-workforce-onboarding",
    category: "Workforce Platforms",
    title: "Eradicating Contractor Onboarding Friction via Blockchain",
    subtitle:
      "How AI Skill Twins and smart contracts eliminated 30-day invoice delays across gig ecosystems.",
    location: "Global",
    tech: "Blockchain Work Layers",
    company: "Enterprise Workforce Platform",
    challenge:
      "Modern enterprises face high friction in freelancer management, suffering from unverified skill claims, ungoverned task quality control, and massive 30-day invoicing delays. Traditional digital gig economy platforms act merely as middlemen using static resumes and delayed fiat payment protocols, which leads to high task error rates and severe administrative bloat for the hiring organization.",
    solution:
      "We deployed an innovative blockchain-backed 'Work Layer' that completely replaced static resumes with verifiable, cryptographic Cognitive Profiles. To multiply individual output, we introduced autonomous AI 'Skill Twins' that execute tasks within a governed digital canvas. Most importantly, we replaced traditional 30-day billing cycles with instant fiat payment rails settled instantaneously via seamlessly integrated blockchain protocols.",
    impact:
      "This decentralized architecture guaranteed task matching based strictly on 100% verified execution history. We completely eliminated traditional 30-day payment friction, allowing workers to be compensated the second a task is approved. Furthermore, the deployment radically reduced task error rates by enforcing blockchain-verified peer reviews prior to final task submission.",
    highlights: ["100% verified execution history", "Instant task settlement", "Blockchain-verified peer reviews"],
    sections: [],
    relatedCategory: "enterprise-ops",
    thumbnail: "/case-studies/EradicatingContractorOnboardingFrictionviaBlockchain.jpg",
  },
].map((study) => ({
  ...study,
  sections: buildFlagshipSections(study),
}))

function buildFlagshipSections(study: Omit<CaseStudy, "sections">): CaseStudySection[] {
  return [
    { id: "challenge", title: "The Challenge", content: study.challenge },
    { id: "solution", title: "Our Solution", content: study.solution },
    {
      id: "approach",
      title: "Delivery approach",
      content: `Teknopact partnered with ${study.company ?? "the client"} to move from diagnostic assessment through governed production rollout. Cross-functional workshops aligned business, technology, and operations stakeholders on success criteria, data boundaries, and phased milestones—ensuring ${study.tech} delivered value without disrupting mission-critical workloads.`,
    },
    { id: "impact", title: "The Impact", content: study.impact },
  ]
}

const allCaseStudies: CaseStudy[] = [...flagshipCaseStudies, ...ultimateCaseStudies]

export function getAllCaseStudies(): CaseStudy[] {
  return allCaseStudies
}

export function getCaseStudyById(id: string): CaseStudy | undefined {
  return getAllCaseStudies().find((study) => study.id === id)
}

export function getCaseStudiesByCategory(categoryId?: string): CaseStudy[] {
  const all = getAllCaseStudies()
  if (!categoryId || categoryId === "all") return all
  return all.filter((study) => study.relatedCategory === categoryId)
}

export function getCaseStudyCategoryMap(): Record<string, string> {
  return Object.fromEntries(
    getAllCaseStudies()
      .filter((study) => study.relatedCategory)
      .map((study) => [study.id, study.relatedCategory!])
  )
}

const HERO_PARALLAX_ROW_COUNT = 15

type HeroParallaxProduct = {
  title: string
  description: string
  link: string
  thumbnail: string
  categoryId: string
}

let cachedHeroParallaxProducts: HeroParallaxProduct[] | null = null

export function getHeroParallaxProducts(): HeroParallaxProduct[] {
  if (cachedHeroParallaxProducts) return cachedHeroParallaxProducts

  const studies = getAllCaseStudies()

  cachedHeroParallaxProducts = Array.from({ length: HERO_PARALLAX_ROW_COUNT }, (_, index) => {
    const cs = studies[index % studies.length]
    return {
      title: cs.title,
      description: cs.subtitle,
      link: `/case-studies/${cs.id}`,
      thumbnail: cs.thumbnail,
      categoryId: cs.id,
    }
  })

  return cachedHeroParallaxProducts
}
