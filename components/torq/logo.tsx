import { cn } from '@/lib/utils'

export function TorqLogo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'font-display inline-flex items-baseline text-2xl leading-none font-bold tracking-[0.12em] text-foreground select-none',
        className,
      )}
    >
      TOR<span className="text-primary">&apos;</span>Q
    </span>
  )
}
