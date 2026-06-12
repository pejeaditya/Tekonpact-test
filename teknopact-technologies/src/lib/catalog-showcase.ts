import type { LucideIcon } from "lucide-react"

import type { CatalogCategory } from "@/lib/products"
import { buildServiceCategories, productCategories } from "@/lib/products"

export type ShowcaseCategory = {
  id: string
  name: string
  description: string
  icon: LucideIcon
}

export type ShowcaseItem = {
  id: string
  name: string
  description: string
  icon: LucideIcon
  category: string
  categoryName: string
  image: string
  features: string[]
  tags: string[]
}

function descriptionToFeatures(description: string, subcategory: string): string[] {
  const sentences = description
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence.length > 12)
    .slice(0, 3)
    .map((sentence) => sentence.replace(/\.$/, ""))

  if (sentences.length > 0) return sentences
  return [subcategory]
}

function categoriesFromCatalog(catalog: CatalogCategory[]): ShowcaseCategory[] {
  return catalog.map((category) => ({
    id: category.id,
    name: category.name,
    description: category.description,
    icon: category.icon,
  }))
}

function itemsFromCatalog(catalog: CatalogCategory[], serviceTag?: string): ShowcaseItem[] {
  return catalog.flatMap((category) =>
    category.items.map((item) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      icon: category.icon,
      category: category.id,
      categoryName: category.name,
      image: item.image,
      features: descriptionToFeatures(item.description, item.subcategory),
      tags: serviceTag ? [serviceTag, category.name] : [category.name, item.subcategory],
    }))
  )
}

export function getProductShowcaseCategories(): ShowcaseCategory[] {
  return categoriesFromCatalog(productCategories)
}

export function getServiceShowcaseCategories(): ShowcaseCategory[] {
  return categoriesFromCatalog(buildServiceCategories())
}

export function buildProductShowcaseItems(): ShowcaseItem[] {
  return itemsFromCatalog(productCategories)
}

export function buildServiceShowcaseItems(): ShowcaseItem[] {
  return itemsFromCatalog(buildServiceCategories(), "Service")
}
