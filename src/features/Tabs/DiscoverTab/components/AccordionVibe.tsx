import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';
import { RotateCcw, Zap } from 'lucide-react';
import { SliderVibe } from './SliderVibe';
import { Button } from '@/components/ui/button';
import { AccordionVibeProps } from '../types';
import { cn } from '@/lib/utils';

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
  const vibes = [
    {
      value: energyVibe,
      setValue: setEnergyVibe,
      leftLabel: 'CALMO',
      rightLabel: 'AGITADO',
    },
    {
      value: emotionalVibe,
      setValue: setEmotionalVibe,
      leftLabel: 'TRISTE',
      rightLabel: 'FELIZ',
    },
    {
      value: instrumentalVibe,
      setValue: setInstrumentalVibe,
      leftLabel: 'VOCAL',
      rightLabel: 'INSTRUMENTAL',
    },
  ];

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="adjust-vibe" className="select-none">
        <AccordionTrigger>
          <div className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-primary" />
            <h2
              className={cn(
                'sm:text-lg font-semibold',
                isVibesChanged && 'text-primary'
              )}
            >
              Ajustar Energia
            </h2>
          </div>
        </AccordionTrigger>

        <AccordionContent>
          <div className="my-2 flex justify-end">
            <Button
              variant="outline"
              onClick={onReset}
              className="rounded-full"
              disabled={!isVibesChanged}
            >
              <RotateCcw />
              Resetar
            </Button>
          </div>

          <Card className="p-4 space-y-2">
            {vibes.map(({ leftLabel, rightLabel, value, setValue }, index) => (
              <SliderVibe
                key={`vibe-${index}`}
                value={value}
                setValue={setValue}
                leftLabel={leftLabel}
                rightLabel={rightLabel}
              />
            ))}
          </Card>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
