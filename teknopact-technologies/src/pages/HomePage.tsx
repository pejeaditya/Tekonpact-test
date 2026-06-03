import { SiteFooter } from "@/components/layout/SiteFooter"
import {
  BlogPreviewSection,
  FaqSection,
  FeaturesSection,
  HeroSection,
  ProductTabsSection,
  TeamSection,
  TestimonialSection,
  TestimonialsColumnsSection,
  TrustedBySection,
  VideoSection,
} from "@/components/sections/HomeSections"

export function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main>
        <HeroSection />
        <ProductTabsSection />
        <TrustedBySection />
        <FeaturesSection />
        <VideoSection />
        <TeamSection />
        <TestimonialSection />
        <TestimonialsColumnsSection />
        <BlogPreviewSection />
        <FaqSection />
      </main>
      <SiteFooter />
    </div>
  )
}
