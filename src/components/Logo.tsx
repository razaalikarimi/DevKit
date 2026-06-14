import Image from "next/image"

interface LogoProps {
  className?: string
  showText?: boolean
  textClassName?: string
}

export function Logo({ className = "w-7 h-7", showText = true, textClassName = "text-[15px] font-bold text-slate-900 tracking-tight" }: LogoProps) {
  return (
    <div className="flex items-center gap-2.5 group">
      <div className={`flex items-center justify-center flex-shrink-0 overflow-hidden ${className}`}>
        <Image 
          src="/logo.png" 
          alt="DevKit Logo" 
          width={32} 
          height={32} 
          className="w-full h-full object-contain drop-shadow-sm group-hover:scale-105 transition-transform"
        />
      </div>
      {showText && (
        <span className={textClassName}>
          DevKit
        </span>
      )}
    </div>
  )
}
