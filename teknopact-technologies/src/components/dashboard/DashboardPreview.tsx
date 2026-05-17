import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
} from "recharts"
import {
  Bell,
  CalendarDays,
  FolderKanban,
  LayoutDashboard,
  Moon,
  Search,
  Settings,
  Users,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

const revenueData = [
  { month: "Jan", value: 18 },
  { month: "Feb", value: 31 },
  { month: "Mar", value: 25 },
  { month: "Apr", value: 44 },
  { month: "May", value: 39 },
  { month: "Jun", value: 52 },
]

const referralData = [
  { day: "Mon", value: 22 },
  { day: "Tue", value: 34 },
  { day: "Wed", value: 28 },
  { day: "Thu", value: 46 },
  { day: "Fri", value: 41 },
  { day: "Sat", value: 55 },
]

const chartConfig = {
  value: {
    label: "Value",
    color: "var(--color-chart-1)",
  },
} satisfies ChartConfig

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Projects", icon: FolderKanban },
  { label: "Calendar", icon: CalendarDays },
  { label: "Team", icon: Users },
  { label: "Settings", icon: Settings },
]

const productScreens = {
  Intelligence: {
    title: "Signal intelligence",
    subtitle: "Live decisions, risks, and growth signals in one operating view.",
    menu: ["Insights", "Signals", "Reports", "Teams", "Settings"],
    metrics: [
      { label: "Active signals", value: "1,248", trend: "+18%" },
      { label: "Decision queues", value: "32", trend: "-12%", muted: true },
      { label: "Forecast accuracy", value: "94%", trend: "+7%" },
    ],
    primary: { label: "Opportunity score", value: "87%", progress: 87 },
    secondary: "Prediction confidence",
    overview: "Decision velocity",
  },
  "Design Systems": {
    title: "Design system hub",
    subtitle: "Reusable components, tokens, and brand rules for product teams.",
    menu: ["Components", "Tokens", "Patterns", "Reviews", "Settings"],
    metrics: [
      { label: "Components", value: "128", trend: "+24%" },
      { label: "Open reviews", value: "9", trend: "-31%", muted: true },
      { label: "Adoption", value: "76%", trend: "+16%" },
    ],
    primary: { label: "System coverage", value: "76%", progress: 76 },
    secondary: "Component adoption",
    overview: "Release activity",
  },
  Automation: {
    title: "Automation control",
    subtitle: "Workflow health, queues, approvals, and saved team hours.",
    menu: ["Workflows", "Approvals", "Triggers", "Logs", "Settings"],
    metrics: [
      { label: "Hours saved", value: "412", trend: "+42%" },
      { label: "Manual tasks", value: "18", trend: "-35%", muted: true },
      { label: "Runs completed", value: "3.8K", trend: "+28%" },
    ],
    primary: { label: "Automation coverage", value: "68%", progress: 68 },
    secondary: "Workflow reliability",
    overview: "Run volume",
  },
  Infrastructure: {
    title: "Infrastructure cockpit",
    subtitle: "Cloud reliability, costs, deployments, and service performance.",
    menu: ["Services", "Deploys", "Costs", "Security", "Settings"],
    metrics: [
      { label: "Uptime", value: "99.9%", trend: "+0.2%" },
      { label: "Incidents", value: "2", trend: "-50%", muted: true },
      { label: "Deploys", value: "46", trend: "+19%" },
    ],
    primary: { label: "Reliability score", value: "99%", progress: 99 },
    secondary: "Latency trend",
    overview: "Resource usage",
  },
  Optimization: {
    title: "Optimization lab",
    subtitle: "Performance, conversion, and engineering improvements tracked together.",
    menu: ["Experiments", "Funnels", "Speed", "Reports", "Settings"],
    metrics: [
      { label: "Conversion lift", value: "21%", trend: "+21%" },
      { label: "Page friction", value: "11", trend: "-29%", muted: true },
      { label: "Speed score", value: "96", trend: "+14%" },
    ],
    primary: { label: "Growth impact", value: "$31K", progress: 81 },
    secondary: "Experiment results",
    overview: "Performance overview",
  },
  Intangible: {
    title: "Intangible education OS",
    subtitle: "One platform for students, colleges, professors, and companies.",
    menu: ["Students", "Colleges", "Professors", "Companies", "AI Match"],
    metrics: [
      { label: "Student profiles", value: "12K", trend: "+38%" },
      { label: "Hiring gaps", value: "64", trend: "-22%", muted: true },
      { label: "AI matches", value: "2.4K", trend: "+51%" },
    ],
    primary: { label: "Education-to-hiring fit", value: "88%", progress: 88 },
    secondary: "Learning outcomes",
    overview: "Placement pipeline",
  },
  "Cognition Lab": {
    title: "Cognition Lab",
    subtitle: "Adaptive diagnostics and learning paths tuned to each student.",
    menu: ["Diagnostics", "Paths", "Assessments", "Insights", "Settings"],
    metrics: [
      { label: "Active learners", value: "4.2K", trend: "+27%" },
      { label: "At-risk alerts", value: "48", trend: "-19%", muted: true },
      { label: "Mastery lift", value: "19%", trend: "+11%" },
    ],
    primary: { label: "Path completion", value: "72%", progress: 72 },
    secondary: "Skill confidence",
    overview: "Engagement heatmap",
  },
  "Skill Atlas": {
    title: "Skill Atlas",
    subtitle: "Map curriculum, credentials, and market demand in one view.",
    menu: ["Skills", "Courses", "Credentials", "Demand", "Settings"],
    metrics: [
      { label: "Skills tracked", value: "380", trend: "+33%" },
      { label: "Coverage gaps", value: "12", trend: "-40%", muted: true },
      { label: "Hiring fit", value: "81%", trend: "+9%" },
    ],
    primary: { label: "Curriculum alignment", value: "81%", progress: 81 },
    secondary: "Employer signals",
    overview: "Program coverage",
  },
  Mentorflow: {
    title: "Mentorflow",
    subtitle: "Structure office hours, feedback, and mentor touchpoints.",
    menu: ["Sessions", "Queue", "Feedback", "Roster", "Settings"],
    metrics: [
      { label: "Sessions / week", value: "860", trend: "+24%" },
      { label: "Wait time", value: "18m", trend: "-31%", muted: true },
      { label: "Satisfaction", value: "4.7", trend: "+0.3" },
    ],
    primary: { label: "Mentor utilization", value: "74%", progress: 74 },
    secondary: "Response quality",
    overview: "Student touchpoints",
  },
  "Campus Bridge": {
    title: "Campus Bridge",
    subtitle: "Timetables, rooms, and student services in a calm ops hub.",
    menu: ["Schedule", "Venues", "Services", "Requests", "Settings"],
    metrics: [
      { label: "Requests resolved", value: "94%", trend: "+6%" },
      { label: "Open tickets", value: "27", trend: "-44%", muted: true },
      { label: "Room utilization", value: "78%", trend: "+12%" },
    ],
    primary: { label: "Ops throughput", value: "91%", progress: 91 },
    secondary: "SLA health",
    overview: "Resource load",
  },
  "Talent Synapse": {
    title: "Talent Synapse",
    subtitle: "Campus-to-company projects with clear milestones and outcomes.",
    menu: ["Projects", "Pipelines", "Milestones", "Offers", "Settings"],
    metrics: [
      { label: "Active projects", value: "56", trend: "+21%" },
      { label: "Time-to-offer", value: "31d", trend: "-17%", muted: true },
      { label: "Placement rate", value: "73%", trend: "+14%" },
    ],
    primary: { label: "Pipeline health", value: "79%", progress: 79 },
    secondary: "Partner engagement",
    overview: "Offer funnel",
  },
} as const

type DashboardPreviewProps = {
  variant?: string
  compact?: boolean
  className?: string
}

export function DashboardPreview({ variant = "Intelligence", compact = false, className }: DashboardPreviewProps) {
  const screen = productScreens[variant as keyof typeof productScreens] ?? productScreens.Intelligence

  return (
    <div
      className={cn(
        "overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#090909] shadow-2xl shadow-black/60",
        compact && "rounded-2xl shadow-lg shadow-black/40 [&_.recharts-surface]:outline-none",
        className
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between border-b border-white/10",
          compact ? "px-3 py-2 sm:px-4" : "px-4 py-3 sm:px-5"
        )}
      >
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <div
            className={cn(
              "grid shrink-0 place-items-center rounded-xl bg-white text-black",
              compact ? "size-8" : "size-9"
            )}
          >
            <LayoutDashboard className={cn(compact ? "size-3.5" : "size-4")} />
          </div>
          <div className="min-w-0">
            <p className={cn("truncate font-medium text-white", compact ? "text-xs" : "text-sm")}>Teknopact</p>
            <p className={cn("truncate text-muted-foreground", compact ? "text-[10px] leading-tight" : "text-xs")}>
              {screen.title}
            </p>
          </div>
        </div>
        <div
          className={cn(
            "flex shrink-0 items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1",
            compact && "p-0.5"
          )}
        >
          <Moon className={cn("text-muted-foreground", compact ? "size-3.5" : "size-4")} />
          <Bell className={cn("text-muted-foreground", compact ? "size-3.5" : "size-4")} />
        </div>
      </div>

      <div className={cn("grid md:grid-cols-[13rem_1fr]", compact && "md:grid-cols-1")}>
        <aside className={cn("hidden border-r border-white/10 p-4 md:block", compact && "md:hidden")}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="h-9 rounded-xl border-white/10 bg-white/5 pl-9 text-xs" placeholder="Search" />
          </div>
          <nav className="mt-6 grid gap-1">
            {screen.menu.map((label, index) => {
              const Icon = menuItems[index]?.icon ?? LayoutDashboard
              return (
              <div
                key={label}
                className={cn(
                  "flex items-center gap-2 rounded-xl px-3 py-2 text-xs text-muted-foreground",
                  index === 0 && "bg-white/[0.08] text-white"
                )}
              >
                <Icon className="size-4" />
                {label}
              </div>
              )
            })}
          </nav>
        </aside>

        <section className={cn("min-w-0", compact ? "p-3" : "p-4 sm:p-5")}>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <h3 className={cn("font-semibold tracking-tight text-white", compact ? "text-base" : "text-lg")}>
                {screen.title}
              </h3>
              <p className={cn("text-muted-foreground", compact ? "text-[11px] leading-snug" : "text-xs")}>
                {screen.subtitle}
              </p>
            </div>
            <div className="flex flex-shrink-0 flex-wrap gap-1.5 sm:gap-2">
              {["12 months", "30 days", "7 days"].map((label) => (
                <Badge key={label} variant="secondary" className="rounded-full bg-white/5 text-[10px] text-muted-foreground">
                  {label}
                </Badge>
              ))}
            </div>
          </div>

          <div className={cn("mt-4 grid gap-2 sm:gap-3", compact ? "grid-cols-1 sm:grid-cols-3" : "lg:grid-cols-3")}>
            {screen.metrics.map((metric) => (
              <MetricCard key={metric.label} compact={compact} {...metric} />
            ))}
          </div>

          <div
            className={cn(
              "mt-3 grid gap-3",
              compact ? "grid-cols-1" : "lg:grid-cols-[1fr_1.15fr]"
            )}
          >
            <Card className="border-white/10 bg-white/[0.03]">
              <CardHeader className={cn("pb-2", compact && "px-3 pt-3")}>
                <CardTitle className={cn("text-white", compact ? "text-xs" : "text-sm")}>{screen.primary.label}</CardTitle>
              </CardHeader>
              <CardContent className={cn(compact && "px-3 pb-3")}>
                <p className={cn("font-semibold tracking-tight text-white", compact ? "text-2xl" : "text-3xl")}>
                  {screen.primary.value}
                </p>
                <p className={cn("text-muted-foreground", compact ? "mt-0.5 text-[10px]" : "mt-1 text-xs")}>
                  {variant} progress
                </p>
                <Progress
                  value={screen.primary.progress}
                  className={cn("bg-white/10", compact ? "mt-4 h-1.5" : "mt-6 h-2")}
                />
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/[0.03]">
              <CardHeader className={cn("pb-2", compact && "px-3 pt-3")}>
                <CardTitle className={cn("text-white", compact ? "text-xs" : "text-sm")}>{screen.secondary}</CardTitle>
              </CardHeader>
              <CardContent className={cn(compact && "px-3 pb-3")}>
                <ChartContainer
                  config={chartConfig}
                  className={cn(
                    "w-full !aspect-auto min-h-0 overflow-hidden",
                    compact ? "h-[88px] max-h-[88px]" : "h-[150px] max-h-[150px]"
                  )}
                >
                  <LineChart data={referralData} margin={{ left: 0, right: 12, top: 10, bottom: 0 }}>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    <XAxis dataKey="day" hide />
                    <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                    <Line dataKey="value" type="monotone" stroke="var(--color-value)" strokeWidth={2} dot={false} />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-3 border-white/10 bg-white/[0.03]">
            <CardHeader className={cn("pb-2", compact && "px-3 pt-3")}>
              <CardTitle className={cn("text-white", compact ? "text-xs" : "text-sm")}>{screen.overview}</CardTitle>
            </CardHeader>
            <CardContent className={cn(compact ? "h-[72px] px-3 pb-3" : "h-[130px]")}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <Bar dataKey="value" radius={[8, 8, 0, 0]} fill="rgba(213,165,86,0.55)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}

function MetricCard({
  label,
  value,
  trend,
  muted = false,
  compact = false,
}: {
  label: string
  value: string
  trend: string
  muted?: boolean
  compact?: boolean
}) {
  return (
    <Card className="border-white/10 bg-white/[0.03]">
      <CardContent className={cn("p-4", compact && "p-3")}>
        <div className="flex items-center justify-between gap-2">
          <p className={cn("text-muted-foreground", compact ? "text-[10px] leading-tight" : "text-xs")}>{label}</p>
          <Badge className={cn("shrink-0 rounded-full text-[10px]", muted ? "bg-red-500/10 text-red-200" : "bg-emerald-500/10 text-emerald-200")}>
            {trend}
          </Badge>
        </div>
        <p className={cn("mt-2 font-semibold text-white sm:mt-3", compact ? "text-lg sm:text-xl" : "text-2xl")}>{value}</p>
      </CardContent>
    </Card>
  )
}
