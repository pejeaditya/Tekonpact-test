import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const publicDir = path.join(__dirname, "../public/case-studies")

const thumbnailSources = {
  "etqa-review-management-system": "https://unsplash.com/photos/lUaaKCUANVI/download?w=1080",
  "qatar-commercial-erp-crm": "https://unsplash.com/photos/JKUTrJ4vK00/download?w=1080",
  "bahrain-management-erp-crm": "https://unsplash.com/photos/ylx85nvunvw/download?w=1080",
  "bahrain-transportation-erp-crm": "https://unsplash.com/photos/jXGqPnVATpQ/download?w=1080",
  "bahrain-restaurant-erp-crm": "https://unsplash.com/photos/c9PVCgZCZto/download?w=1080",
  "website-marketing-company": "https://unsplash.com/photos/CbGyIn1uwuc/download?w=1080",
  "website-consulting-company": "https://unsplash.com/photos/bEBLQQPhqi8/download?w=1080",
  "hocalwire-journalism-cms": "https://unsplash.com/photos/VUC00c_tk0Y/download?w=1080",
  "webrtc-conferencing-platform": "https://unsplash.com/photos/sl91Zszc8zA/download?w=1080",
  "medical-education-conferencing": "https://unsplash.com/photos/Pd4lRfKo16U/download?w=1080",
  "retail-marketing-management-app": "https://unsplash.com/photos/YDde9egYzhw/download?w=1080",
  "sip-voip-application-server": "https://unsplash.com/photos/vE5AKQRUs7c/download?w=1080",
  "saudi-staff-augmentation-platform": "https://unsplash.com/photos/rmzF0er-JeY/download?w=1080",
  "saudi-sap-service-industry": "https://unsplash.com/photos/phS1wAgXOQI/download?w=1080",
  "saudi-fire-safety-vat": "https://unsplash.com/photos/EL16ACtwLxg/download?w=1080",
  "bahrain-tyres-vat-policy": "https://unsplash.com/photos/vKNRKjSNbTo/download?w=1080",
  "gcc-dental-order-patient-platform": "https://unsplash.com/photos/L8tWZT4CcVQ/download?w=1080",
  "saudi-property-management-software": "https://unsplash.com/photos/lotxjfRcx80/download?w=1080",
  "saudi-civil-engineering-gap-assessment": "https://unsplash.com/photos/Mqc-m8kgxkg/download?w=1080",
  "india-ncdex-trading-system": "https://unsplash.com/photos/8Bm5eH5w7FE/download?w=1080",
  "china-ngcnyts-trading-system": "https://unsplash.com/photos/T1snPsRIvfk/download?w=1080",
  "india-system-design-consulting": "https://unsplash.com/photos/0godtCEIrkQ/download?w=1080",
  "india-investment-bank-kyc": "https://unsplash.com/photos/4mEyvORkbN0/download?w=1080",
  "gcc-professional-services-it-advisory": "https://unsplash.com/photos/XplX5vASmkM/download?w=1080",
  "gcc-it-strategy-transformation": "https://unsplash.com/photos/G7Mg0jgC4Es/download?w=1080",
  "gcc-digital-transformation-advisory": "https://unsplash.com/photos/s8_cIpx7uRE/download?w=1080",
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

fs.mkdirSync(publicDir, { recursive: true })

const entries = Object.entries(thumbnailSources)
const downloaded = {}
const failures = []

for (let i = 0; i < entries.length; i++) {
  const [id, url] = entries[i]
  try {
    const { buffer, contentType } = await fetchImage(url)
    const ext = extensionFor(contentType)
    const fileName = `${id}${ext}`
    fs.writeFileSync(path.join(publicDir, fileName), buffer)
    downloaded[id] = `/case-studies/${fileName}`
    console.log(`[${i + 1}/${entries.length}] ${fileName}`)
  } catch (error) {
    failures.push({ id, url, error: error.message })
    console.error(`[${i + 1}/${entries.length}] FAILED ${id}: ${error.message}`)
  }
}

const manifestPath = path.join(__dirname, "../src/lib/corporate-profile-thumbnails.json")
fs.writeFileSync(manifestPath, `${JSON.stringify(downloaded, null, 2)}\n`, "utf8")

console.log(`\nDownloaded ${Object.keys(downloaded).length}/${entries.length} images to:\n${publicDir}`)
console.log(`Manifest: ${manifestPath}`)

if (failures.length > 0) {
  process.exitCode = 1
}
