"use client"

import { 
  BarChart3, 
  Lock, 
  Settings2, 
  Terminal, 
  Zap, 
  Globe,
  Database,
  Cpu
} from "lucide-react"

const FEATURES = [
  {
    title: "Enterprise Intelligence",
    description: "Our proprietary AI models are optimized for business reasoning and decision making.",
    icon: Cpu,
  },
  {
    title: "Global Scalability",
    description: "Deploy AI solutions across your entire organization with multi-region support and high availability.",
    icon: Globe,
  },
  {
    title: "Security & Compliance",
    description: "Enterprise-grade encryption and compliance standards (SOC2, GDPR) built into the core.",
    icon: Lock,
  },
  {
    title: "Custom Integrations",
    description: "Connect your existing data sources and workflows seamlessly with our enterprise API.",
    icon: Database,
  }
]

export const Features = () => {
  return (
    <section className="bg-white" id="solutions">
      <div className="section-padding max-w-7xl mx-auto">
        <div className="mb-20 space-y-4">
          <h2 className="text-sm font-bold text-primary uppercase tracking-[0.3em]">Our Platform</h2>
          <h3 className="text-4xl md:text-5xl font-bold max-w-2xl">
            Reliable AI solutions built for <br /> 
            <span className="text-muted-foreground">mission-critical operations.</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
          {FEATURES.map((feature, i) => (
            <div 
              key={i} 
              className="enterprise-card h-full flex flex-col justify-between group cursor-pointer"
            >
              <div className="space-y-6">
                <feature.icon className="text-primary" size={32} />
                <h4 className="text-xl font-bold group-hover:text-primary transition-colors">{feature.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
              <div className="pt-8 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                Learn more
                <div className="w-8 h-[1px] bg-primary" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
