import { Spinner } from '@/components/ui/spinner';
import { ChartColumnDecreasing, Check, PlusIcon, Sparkles } from 'lucide-react';
import { TabType } from './types';

export const tabs: TabType[] = [
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
] as const;

export const badgesText = [
  'Faça recomendações',
  'Músicas fáceis de tocar no piano',
  'Músicas fáceis de tocar na guitarra',
  'Recomendações do artista mais presente',
  'Recomendações do gênero mais presente',
] as const;

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

export const chartConfig = {
  popularity: {
    label: 'Popularidade das músicas (0 - 100)',
    dataKey: 'popularity',
    color: ' #1db954',
  },
};
