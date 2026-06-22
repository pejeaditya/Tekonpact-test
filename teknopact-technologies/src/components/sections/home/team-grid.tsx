"use client"

import { motion } from "motion/react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import type { TeamMember } from "@/lib/content"
import { cn } from "@/lib/utils"

export function TeamSectionHeader() {
  return (
    <motion.div
      className="mx-auto max-w-2xl text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <Badge variant="secondary" className="rounded-full border border-primary/20 bg-primary/10 text-primary">
        Our team
      </Badge>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
        Leadership &amp; experts
      </h2>
      <p className="mt-4 text-base leading-7 text-muted-foreground">
        A multidisciplinary team of directors, consultants, architects, and engineers with decades of combined
        experience across the GCC, MENA, and beyond.
      </p>
    </motion.div>
  )
}

export function TeamGrid({ members }: { members: TeamMember[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {members.map((member, index) => (
        <motion.div
          key={member.name}
          className="h-full"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <Card
            className={cn(
              "group h-full border-border teknopact-card-gradient transition-all duration-300",
              "hover:border-primary/25 hover:shadow-lg hover:shadow-primary/10",
              member.featured && "border-primary/30"
            )}
          >
            <CardContent className="flex h-full flex-col gap-4 p-6">
              <div className="flex items-center gap-4">
                <Avatar size="lg" className="size-16 border border-primary/20">
                  <AvatarImage src={member.imageUrl} alt={member.name} className="object-cover object-top" />
                  <AvatarFallback className="bg-primary/10 text-base font-medium text-primary">
                    {member.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="truncate text-lg font-semibold text-foreground">{member.name}</h3>
                    {member.badge && (
                      <Badge
                        variant="secondary"
                        className="rounded-full border border-primary/20 bg-primary/10 px-2 py-0 text-[10px] font-semibold tracking-wide text-primary"
                      >
                        {member.badge}
                      </Badge>
                    )}
                  </div>
                  <p className="mt-0.5 text-sm font-medium text-primary">{member.role}</p>
                </div>
              </div>
              <p className="text-sm leading-6 text-muted-foreground">{member.bio}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
