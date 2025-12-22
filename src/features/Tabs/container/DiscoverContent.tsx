import { SliderVibe } from "../components/SliderVibe";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { geminiRquest } from "@/actions/geminiRequest";
import { PlaylistStatistics } from "@/data/types/recommendations";
import { useEffect } from "react";

type DiscoverPromptType = {
  prompt: string;
};

export const DiscoverContent = ({
  genresStatistics,
  artistsStatistics,
}: PlaylistStatistics) => {
  const { handleSubmit, register } = useForm<DiscoverPromptType>();

  const handleChatRequest = async (data: DiscoverPromptType) => {
    await geminiRquest({
      artistsStatistics: artistsStatistics.slice(0, 5),
      genresStatistics: genresStatistics.slice(0, 5),
      prompt: data.prompt,
    });
  };

  return (
    <TabsContent className="sm:px-8 pt-4 flex flex-col gap-6" value="discover">
      <form
        onSubmit={handleSubmit(handleChatRequest)}
        className="flex items-center gap-2"
      >
        <Input
          {...register("prompt")}
          className="w-full rounded-full max-sm:text-sm"
          placeholder="Músicas do artista mais tocado da playlist..."
        />

        <Button type="submit">
          <Sparkles />
        </Button>
      </form>

      <div className="flex items-center gap-2">
        <Zap className="w-6 h-6 text-primary" />
        <h2 className="sm:text-lg font-semibold">Ajustar Vibe</h2>
      </div>

      <Card className="p-4 space-y-2">
        <SliderVibe leftLabel="CALMO" rightLabel="AGITADO" />
        <SliderVibe leftLabel="TRISTE" rightLabel="FELIZ" />
        <SliderVibe leftLabel="VOCAL" rightLabel="INSTRUMENTAL" />
      </Card>
    </TabsContent>
  );
};
