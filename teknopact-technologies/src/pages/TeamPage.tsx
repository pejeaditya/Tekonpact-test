import { SiteFooter } from "@/components/layout/SiteFooter"
import { SiteHeader } from "@/components/layout/SiteHeader"
import { Badge } from "@/components/ui/badge"
import { teamMembers } from "@/lib/content"
import { motion } from "motion/react"

export function TeamPage() {
  return (
    <div className="relative min-h-screen w-full bg-transparent text-foreground overflow-hidden">

      {/* Perspective grid overlay at the top (styled for the dark neon theme) */}
      <div 
        className="pointer-events-none absolute inset-x-0 top-0 h-[600px] opacity-[0.07]" 
        style={{
          backgroundImage: `
            linear-gradient(to bottom, transparent, var(--background)),
            linear-gradient(rgba(98, 176, 255, 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(98, 176, 255, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
          transform: "perspective(500px) rotateX(60deg) translateY(-200px)",
          transformOrigin: "top center",
        }}
      />

      <div className="relative z-10 flex flex-col min-h-screen">
        <SiteHeader />

        <main className="w-full flex-1">
          {/* Header section with animations matching reference */}
          <section className="relative overflow-hidden pt-12 pb-8 sm:pt-16">
            <div className="relative mx-auto w-full max-w-7xl px-6 text-center sm:px-10">
              <Badge variant="secondary" className="rounded-full border border-primary/20 bg-primary/10 text-primary px-4 py-1 text-xs" data-animate="fade-in">
                Team
              </Badge>
              <h1 className="mx-auto mt-4 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl" data-animate="letter-expand" data-delay="1">
                Our Amazing Team
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground/90 font-medium" data-animate="fade-up" data-delay="2">
                Welcome to the team! We are a group of passionate individuals working together to achieve our goals.
                Get to know the faces behind our success.
              </p>
            </div>
          </section>

          {/* Centered cards 4-column grid (MakeMyTrip / Centered Team style) */}
          <section className="mx-auto w-full max-w-7xl px-6 pb-24 sm:px-10 lg:px-12">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 mt-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full"
                >
                  <div className="group relative flex h-full flex-col items-center justify-between p-4 text-center">
                    
                    <div className="w-full flex flex-col items-center">
                      {/* Avatar Image container (rounded square, no scale animation) */}
                      <div className="relative aspect-square w-full max-w-[200px] overflow-hidden rounded-2xl border border-primary/20 bg-primary/5 shadow-md shadow-primary/5">
                        {member.imageUrl ? (
                          <img
                            src={member.imageUrl}
                            alt={member.name}
                            className="h-full w-full object-cover object-top filter contrast-110"
                            onError={(e) => { e.currentTarget.style.display = "none" }}
                            loading="lazy"
                          />
                        ) : null}
                        <div className="absolute inset-0 flex items-center justify-center text-4xl font-extrabold text-primary/10">
                          {member.initials}
                        </div>
                      </div>

                      {/* Details (Name, Role, Description - permanent readable colors) */}
                      <div className="mt-6">
                        <h3 className="text-xl font-bold tracking-tight text-foreground">
                          {member.name}
                        </h3>
                        <p className="mt-1 text-sm font-semibold text-primary/80">
                          {member.role.split("|")[0].trim()}
                        </p>
                        <p className="mt-4 text-xs sm:text-sm leading-relaxed text-muted-foreground font-medium line-clamp-4">
                          {member.bio}
                        </p>
                      </div>
                    </div>

                    {/* Social Media Link custom SVG brand icons row */}
                    <div className="mt-6 flex justify-center gap-4 text-muted-foreground/60">
                      <a href="#" className="hover:text-primary transition-colors duration-300" aria-label="Website">
                        <svg className="size-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.53c-.26-.81-1-1.4-1.9-1.4h-1v-3c0-.55-.45-1-1-1h-6v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.4z"/>
                        </svg>
                      </a>
                      <a href="#" className="hover:text-primary transition-colors duration-300" aria-label="Twitter">
                        <svg className="size-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                      </a>
                      <a href="#" className="hover:text-primary transition-colors duration-300" aria-label="LinkedIn">
                        <svg className="size-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </a>
                    </div>

                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </main>

        <SiteFooter />
      </div>
    </div>
  )
}
