"use client"

import React from "react"
import { motion } from "motion/react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export type TestimonialItem = {
  text: string
  image: string
  name: string
  role: string
}

export function TestimonialsColumn({
  className,
  testimonials,
  duration = 10,
}: {
  className?: string
  testimonials: TestimonialItem[]
  duration?: number
}) {
  return (
    <div className={cn("overflow-hidden", className)}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 bg-background pb-6"
      >
        {Array.from({ length: 2 }).map((_, index) => (
          <React.Fragment key={index}>
            {testimonials.map(({ text, image, name, role }) => (
              <Card
                className="w-full max-w-xs border-white/10 bg-white/[0.03] shadow-lg shadow-primary/10"
                key={`${name}-${index}`}
              >
                <CardContent className="p-7">
                  <p className="text-sm leading-6 text-muted-foreground">{text}</p>
                  <div className="mt-5 flex items-center gap-3">
                    <Avatar className="size-10 border border-primary/20">
                      <AvatarImage src={image} alt={name} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {name
                          .split(" ")
                          .map((part) => part[0])
                          .join("")
                          .slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <div className="text-sm font-medium leading-5 tracking-tight text-white">{name}</div>
                      <div className="text-xs leading-5 tracking-tight text-muted-foreground">{role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  )
}
