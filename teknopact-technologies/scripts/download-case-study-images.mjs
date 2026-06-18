import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, "..")
const outDir = path.join(root, "case-studies")

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

const thumbnailById = {
  "bpo-agentic-retention": "https://unsplash.com/photos/rmzF0er-JeY/download?w=1080",
  "urban-water-iot-bengaluru": "https://unsplash.com/photos/T-q7fVaJgHA/download?w=1080",
  "industrial-water-reduction": "https://unsplash.com/photos/AHJ6u0x3F04/download?w=1080",
  "smart-factory-automation": "https://unsplash.com/photos/EyqUxJuOb1Q/download?w=1080",
  "global-rides-network-integrity": "https://unsplash.com/photos/jXGqPnVATpQ/download?w=1080",
  "virtual-adc-availability": "https://unsplash.com/photos/vE5AKQRUs7c/download?w=1080",
  "peru-defense-cloud": "https://unsplash.com/photos/EUsVwEOsblE/download?w=1080",
  "oci-migration-telecom": "https://unsplash.com/photos/Iw4PCFP4UpQ/download?w=1080",
  "media-ai-restoration": "https://unsplash.com/photos/VUC00c_tk0Y/download?w=1080",
  "adas-edge-ai-collision": "https://unsplash.com/photos/mrx9jYUgbfo/download?w=1080",
  "real-estate-esg-data": "https://unsplash.com/photos/lotxjfRcx80/download?w=1080",
  "ghg-protocol-logistics": "https://unsplash.com/photos/kqxO2VtzTjE/download?w=1080",
  "hidden-network-savings": "https://unsplash.com/photos/0godtCEIrkQ/download?w=1080",
  "sdwan-telecom-llms": "https://unsplash.com/photos/8oR7XykOjk4/download?w=1080",
  "intent-driven-orchestration": "https://unsplash.com/photos/pl6My-v7gnE/download?w=1080",
  "commodity-trading-lowcode": "https://unsplash.com/photos/8Bm5eH5w7FE/download?w=1080",
  "insurance-acquisition-analytics": "https://unsplash.com/photos/JKUTrJ4vK00/download?w=1080",
  "retail-sap-inventory-500": "https://unsplash.com/photos/RjFagACrMFs/download?w=1080",
  "blockchain-workforce-onboarding": "https://unsplash.com/photos/G7Mg0jgC4Es/download?w=1080",
  "telecom-15m-revenue-leakage": "https://unsplash.com/photos/S9EwUEQEprE/download?w=1080",
  "retail-pos-nosql": "https://unsplash.com/photos/yB9Xz6tADFo/download?w=1080",
  "fnb-nlp-retention": "https://unsplash.com/photos/UvmB2v_CpEQ/download?w=1080",
  "fmcg-turnover-reduction": "https://unsplash.com/photos/YDde9egYzhw/download?w=1080",
  "insurance-predictive-attrition": "https://unsplash.com/photos/0HkO6NfXsqw/download?w=1080",
  "retail-cross-border-sentiment": "https://unsplash.com/photos/ylx85nvunvw/download?w=1080",
  "india-credit-risk-ews": "https://unsplash.com/photos/8Bm5eH5w7FE/download?w=1080",
  "ecommerce-doorstep-returns": "https://unsplash.com/photos/2tG1_No-ClE/download?w=1080",
  "telecom-diesel-theft-ai": "https://unsplash.com/photos/CGxKhEFXdjM/download?w=1080",
  "assembly-line-iot": "https://unsplash.com/photos/jHZ70nRk7Ns/download?w=1080",
  "icu-vitals-iot": "https://unsplash.com/photos/gzTKtM5biaA/download?w=1080",
  "revops-api-connectors": "https://unsplash.com/photos/vKNRKjSNbTo/download?w=1080",
  "travel-ai-packages": "https://unsplash.com/photos/hpjSkU2UYSU/download?w=1080",
  "marketing-agenticaxis-roas": "https://unsplash.com/photos/5fNmWej4tAA/download?w=1080",
  "chicago-community-health": "https://unsplash.com/photos/Pd4lRfKo16U/download?w=1080",
  "sydney-education-strategy": "https://unsplash.com/photos/yDBsF9eID8Q/download?w=1080",
  "goal-designer-accountability": "https://unsplash.com/photos/bEBLQQPhqi8/download?w=1080",
  "seniors-clinical-capacity": "https://unsplash.com/photos/hIgeoQjS_iE/download?w=1080",
  "software-license-compliance": "https://unsplash.com/photos/phS1wAgXOQI/download?w=1080",
  "construction-tender-digitization": "https://unsplash.com/photos/ZyP4Apa8tvI/download?w=1080",
  "broadband-support-profitability": "https://unsplash.com/photos/oZgzVU_B3sE/download?w=1080",
  "crm-omnichannel-sla": "https://unsplash.com/photos/BUHf7bGbjOI/download?w=1080",
  "datacenter-thermal-efficiency": "https://unsplash.com/photos/TWlmgguC8HI/download?w=1080",
  "talent-ai-recruitment": "https://unsplash.com/photos/QEdISIRlcBM/download?w=1080",
  "security-incident-response": "https://unsplash.com/photos/35CIXxbZqSU/download?w=1080",
}

const ultimateOrder = Object.keys(thumbnailById).filter((id) => !flagshipOrder.includes(id))
const orderedIds = [...flagshipOrder, ...ultimateOrder]

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
  for (const id of orderedIds) {
    const re = new RegExp(`id:\\s*"${id}"[\\s\\S]*?title:\\s*"([^"]+)"`)
    const match = content.match(re)
    if (!match) throw new Error(`Missing title for ${id}`)
    titles[id] = match[1]
  }
  return titles
}

async function fetchImage(url) {
  const response = await fetch(url, {
    redirect: "follow",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
      Accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
    },
  })

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`)
  }

  const contentType = response.headers.get("content-type") ?? "image/jpeg"
  const buffer = Buffer.from(await response.arrayBuffer())
  return { buffer, contentType }
}

function extensionFor(contentType) {
  if (contentType.includes("png")) return ".png"
  if (contentType.includes("webp")) return ".webp"
  return ".jpg"
}

const titles = loadTitles()
fs.mkdirSync(outDir, { recursive: true })

const usedNames = new Map()
const results = []
const failures = []

for (let i = 0; i < orderedIds.length; i++) {
  const id = orderedIds[i]
  const title = titles[id]
  const thumbnail = thumbnailById[id]

  let baseName = titleToFilename(title)
  if (usedNames.has(baseName)) {
    usedNames.set(baseName, usedNames.get(baseName) + 1)
    baseName = `${baseName}${usedNames.get(baseName)}`
  } else {
    usedNames.set(baseName, 1)
  }

  const fileName = `${baseName}.jpg`
  const filePath = path.join(outDir, fileName)

  try {
    const { buffer, contentType } = await fetchImage(thumbnail)
    const ext = extensionFor(contentType)
    const finalPath = ext === ".jpg" ? filePath : path.join(outDir, `${baseName}${ext}`)
    fs.writeFileSync(finalPath, buffer)
    results.push({ index: i + 1, title, file: path.basename(finalPath) })
    console.log(`[${i + 1}/44] ${path.basename(finalPath)}`)
  } catch (error) {
    failures.push({ id, title, thumbnail, error: error.message })
    console.error(`[${i + 1}/44] FAILED ${title}: ${error.message}`)
  }
}

console.log(`\nDownloaded ${results.length}/${orderedIds.length} images to:\n${outDir}`)

if (failures.length > 0) {
  console.log("\nFailures:")
  for (const failure of failures) {
    console.log(`- ${failure.title} (${failure.id}): ${failure.error}`)
  }
  process.exitCode = 1
}
