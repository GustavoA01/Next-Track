import { Spinner } from '@/components/ui/spinner';
import {
  ChartColumnDecreasing,
  Check,
  PlusIcon,
  Sparkles,
} from 'lucide-react';

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

export const recommendationStatusMap = {
  idle: {
    icon: PlusIcon,
    label: 'Adicionar todas',
    variant: 'outline',
  },
  adding: {
    icon: Spinner,
    label: 'Adicionando...',
    variant: 'outline',
  },
  added: {
    icon: Check,
    label: 'Adicionadas',
    variant: 'default',
  },
} as const;
