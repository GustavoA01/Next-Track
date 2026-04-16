import { ChartColumnDecreasing, Sparkles } from 'lucide-react';

export const tabs = [
  {
    label: 'Descobrir',
    value: 'discover',
    icon: Sparkles,
  },
  {
    label: 'Estatísticas',
    value: 'statistics',
    icon: ChartColumnDecreasing,
  },
];

export const chartConfig = {
  popularity: {
    label: 'Popularidade das músicas (0 - 100)',
    dataKey: 'popularity',
    color: ' #1db954',
  },
};

export const badgesText = [
  'Faça recomendações',
  'Recomendações do artista mais presente',
  'Recomendações do gênero mais presente',
  'Músicas fáceis de tocar no violão',
];
