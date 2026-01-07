import { SliderVibe } from "../components/SliderVibe";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { geminiRquest } from "@/actions/geminiRequest";
import { PlaylistStatisticsType } from "@/data/types/recommendations";
import { ReactNode } from "react";
import { Spinner } from "@/components/ui/spinner";

type DiscoverContentProps = {
  chatContent: ReactNode;
};

type DiscoverPromptType = {
  prompt: string;
};

export const DiscoverContent = ({
  genresStatistics,
  artistsStatistics,
  chatContent,
}: PlaylistStatisticsType & DiscoverContentProps) => {
  const {
    handleSubmit,
    register,
    formState: { isLoading },
  } = useForm<DiscoverPromptType>();

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

        <Button className="group" type="submit" disabled={isLoading}>
          {isLoading ? (
            <Spinner />
          ) : (
            <Sparkles className="text-black group-hover:text-white transition-all duration-200" />
          )}
        </Button>
      </form>

      <h2 className="text-sm text-muted-foreground">
        Observação: Só é possível reproduzir músicas com uma conta Spotify
        premium
      </h2>

      <div className="flex items-center gap-2">
        <Zap className="w-6 h-6 text-primary" />
        <h2 className="sm:text-lg font-semibold">Ajustar Vibe</h2>
      </div>

      <Card className="p-4 space-y-2">
        <SliderVibe leftLabel="CALMO" rightLabel="AGITADO" />
        <SliderVibe leftLabel="TRISTE" rightLabel="FELIZ" />
        <SliderVibe leftLabel="VOCAL" rightLabel="INSTRUMENTAL" />
      </Card>

      {chatContent}
    </TabsContent>
  );
};
