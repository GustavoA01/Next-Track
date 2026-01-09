import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Zap } from "lucide-react";
import { SliderVibe } from "./SliderVibe";
import { Button } from "@/components/ui/button";

type AccordionVibeProps = {
  emotionalVibe: number;
  energyVibe: number;
  instrumentalVibe: number;
  setEmotionalVibe: React.Dispatch<React.SetStateAction<number>>;
  setEnergyVibe: React.Dispatch<React.SetStateAction<number>>;
  setInstrumentalVibe: React.Dispatch<React.SetStateAction<number>>;
  onReset: () => void;
  isVibesChanged: boolean;
};

export const AccordionVibe = ({
  emotionalVibe,
  energyVibe,
  instrumentalVibe,
  setEmotionalVibe,
  setEnergyVibe,
  setInstrumentalVibe,
  onReset,
  isVibesChanged,
}: AccordionVibeProps) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="adjust-vibe">
        <AccordionTrigger>
          <div className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-primary" />
            <h2
              className={`${isVibesChanged ? "text-primary" : ""} sm:text-lg font-semibold`}
            >
              Ajustar Vibe
            </h2>
          </div>
        </AccordionTrigger>

        <AccordionContent>
          <div className="my-2 flex justify-end">
            <Button onClick={onReset} variant="outline">
              Resetar
            </Button>
          </div>

          <Card className="p-4 space-y-2">
            <SliderVibe
              value={energyVibe}
              setValue={setEnergyVibe}
              leftLabel="CALMO"
              rightLabel="AGITADO"
            />
            <SliderVibe
              value={emotionalVibe}
              setValue={setEmotionalVibe}
              leftLabel="TRISTE"
              rightLabel="FELIZ"
            />
            <SliderVibe
              value={instrumentalVibe}
              setValue={setInstrumentalVibe}
              leftLabel="VOCAL"
              rightLabel="INSTRUMENTAL"
            />
          </Card>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
