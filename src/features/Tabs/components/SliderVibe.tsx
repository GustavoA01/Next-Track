import { Slider } from "@/components/ui/slider"

type SliderVibeProps = {
  leftLabel: string
  rightLabel: string
}

export const SliderVibe = ({ leftLabel, rightLabel }: SliderVibeProps) => {
  return (
    <div className="space-y-2 text-muted-foreground text-sm">
      <div className="flex items-center justify-between">
        <p>{leftLabel}</p>
        <p>{rightLabel}</p>
      </div>
      <Slider defaultValue={[50]} className="cursor-pointer"/>
    </div>
  )
}
