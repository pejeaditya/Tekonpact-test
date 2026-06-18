import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, "..")
const sourceDir = path.join(root, "case-studies")
const publicDir = path.join(root, "public", "case-studies")

const flagshipOrder = [
  "hidden-network-savings",
  "global-rides-network-integrity",
  "ecommerce-doorstep-returns",
  "industrial-water-reduction",
  "bpo-agentic-retention",
  "fmcg-turnover-reduction",
  "media-ai-restoration",
  "blockchain-workforce-onboarding",
]

const studyIds = [
  ...flagshipOrder,
  "urban-water-iot-bengaluru",
  "smart-factory-automation",
  "virtual-adc-availability",
  "peru-defense-cloud",
  "oci-migration-telecom",
  "adas-edge-ai-collision",
  "real-estate-esg-data",
  "ghg-protocol-logistics",
  "sdwan-telecom-llms",
  "intent-driven-orchestration",
  "commodity-trading-lowcode",
  "insurance-acquisition-analytics",
  "retail-sap-inventory-500",
  "telecom-15m-revenue-leakage",
  "retail-pos-nosql",
  "fnb-nlp-retention",
  "insurance-predictive-attrition",
  "retail-cross-border-sentiment",
  "india-credit-risk-ews",
  "telecom-diesel-theft-ai",
  "assembly-line-iot",
  "icu-vitals-iot",
  "revops-api-connectors",
  "travel-ai-packages",
  "marketing-agenticaxis-roas",
  "chicago-community-health",
  "sydney-education-strategy",
  "goal-designer-accountability",
  "seniors-clinical-capacity",
  "software-license-compliance",
  "construction-tender-digitization",
  "broadband-support-profitability",
  "crm-omnichannel-sla",
  "datacenter-thermal-efficiency",
  "talent-ai-recruitment",
  "security-incident-response",
]

function titleToFilename(title) {
  return title
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[£$€%→+]/g, "")
    .replace(/\s+/g, "")
    .replace(/[^a-zA-Z0-9.-]/g, "")
}

function loadTitles() {
  const content = [
    fs.readFileSync(path.join(root, "src/lib/case-studies.ts"), "utf8"),
    fs.readFileSync(path.join(root, "src/lib/ultimate-case-studies.ts"), "utf8"),
  ].join("\n")

  const titles = {}
  for (const id of studyIds) {
    const re = new RegExp(`id:\\s*"${id}"[\\s\\S]*?title:\\s*"([^"]+)"`)
    const match = content.match(re)
    if (!match) throw new Error(`Missing title for ${id}`)
    titles[id] = match[1]
  }
  return titles
}

function localPath(filename) {
  return `/case-studies/${filename}`
}

function patchThumbnails(filePath, idsInFile, thumbnailById) {
  let content = fs.readFileSync(filePath, "utf8")
  for (const id of idsInFile) {
    const thumb = thumbnailById[id]
    if (!thumb) continue
    const re = new RegExp(`(id: "${id}"[\\s\\S]*?thumbnail: )"[^"]+"`, "m")
    if (!re.test(content)) {
      console.warn(`No thumbnail found for ${id} in ${filePath}`)
      continue
    }
    content = content.replace(re, `$1"${thumb}"`)
  }
  fs.writeFileSync(filePath, content)
}

const titles = loadTitles()
fs.mkdirSync(publicDir, { recursive: true })

const usedNames = new Map()
const thumbnailById = {}

for (const id of studyIds) {
  let baseName = titleToFilename(titles[id])
  if (usedNames.has(baseName)) {
    usedNames.set(baseName, usedNames.get(baseName) + 1)
    baseName = `${baseName}${usedNames.get(baseName)}`
  } else {
    usedNames.set(baseName, 1)
  }

  const fileName = `${baseName}.jpg`
  const sourcePath = path.join(sourceDir, fileName)
  const destPath = path.join(publicDir, fileName)

  if (!fs.existsSync(sourcePath)) {
    throw new Error(`Missing local image: ${sourcePath}`)
  }

  fs.copyFileSync(sourcePath, destPath)
  thumbnailById[id] = localPath(fileName)
}

const ultimateIds = studyIds.filter((id) => !flagshipOrder.includes(id))

patchThumbnails(path.join(root, "src/lib/case-studies.ts"), flagshipOrder, thumbnailById)
patchThumbnails(path.join(root, "src/lib/ultimate-case-studies.ts"), ultimateIds, thumbnailById)

const used = Object.values(thumbnailById)
const unique = new Set(used)
console.log(`Applied ${studyIds.length} local thumbnails (${unique.size} unique paths)`)
console.log(`Images served from public/case-studies/`)
