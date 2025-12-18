import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { TabsContent } from "@/components/ui/tabs"
import { Sparkles, Zap } from "lucide-react"
import { SliderVibe } from "../components/SliderVibe"

export const DiscoverContent = () => {
  return (
    <TabsContent className="sm:px-8 pt-4 flex flex-col gap-4" value="discover">
      <div className="flex items-center gap-2">
        <Input
          className="w-full rounded-full max-sm:text-sm"
          placeholder="Músicas do artista mais tocado da playlist..."
        />

        <Button>
          <Sparkles />
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Zap className="w-6 h-6 text-primary" />
        <h2 className="sm:text-lg font-semibold">Ajustar Vibe</h2>
      </div>

      <Card className="p-4 space-y-2">
        <SliderVibe leftLabel="CALMO" rightLabel="AGITADO"/>
        <SliderVibe leftLabel="TRISTE" rightLabel="FELIZ"/>
        <SliderVibe leftLabel="VOCAL" rightLabel="INSTRUMENTAL"/>
      </Card>
    </TabsContent>
  )
}
