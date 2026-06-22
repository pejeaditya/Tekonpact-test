import { corporateProfileCaseStudies } from "@/lib/corporate-profile-case-studies"

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

const allCaseStudies: CaseStudy[] = corporateProfileCaseStudies

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
