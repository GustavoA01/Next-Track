import { Slider } from "@/components/ui/slider"

type SliderVibeProps = {
  leftLabel: string
  rightLabel: string
  value: number
  setValue: (value: number) => void
}

export const SliderVibe = ({
  leftLabel,
  rightLabel,
  value,
  setValue,
}: SliderVibeProps) => (
  <div className="space-y-3 text-muted-foreground text-sm font-semibold">
    <div className="flex items-center justify-between">
      <p>{leftLabel}</p>
      <p>{rightLabel}</p>
    </div>

    <Slider
      value={[value]}
      className="cursor-pointer"
      onValueChange={(val) => setValue(val[0])}
    />
  </div>
)
