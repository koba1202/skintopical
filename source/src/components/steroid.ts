import type { SteroidRank } from '@/types/';

export const STEROID_RANK_LABELS: { value: SteroidRank, label: string }[] = [
  { value: 'strongest', label: 'ストロンゲスト' },
  { value: 'very_strong',label: 'ベリーストロング' },
  { value: 'strong', label: 'ストロング' },
  { value: 'medium', label: 'ミディアム' },
  { value: 'weak', label: 'ウィーク' },
]
