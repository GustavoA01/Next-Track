import { Slider } from "@/components/ui/slider"

type SliderVibeProps = {
  leftLabel: string
  rightLabel: string
}

export const SliderVibe = ({ leftLabel, rightLabel }: SliderVibeProps) => {
  return (
    <div className="space-y-3 text-muted-foreground text-sm font-semibold">
      <div className="flex items-center justify-between">
        <p>{leftLabel}</p>
        <p>{rightLabel}</p>
      </div>
      <Slider defaultValue={[50]} className="cursor-pointer"/>
    </div>
  )
}
