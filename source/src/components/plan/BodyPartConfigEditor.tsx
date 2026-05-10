import type { BodyPartConfig, BodyPartId, SteroidRank } from '@/types/';
import { BODY_PARTS } from '@/constants/bodyParts';

const STEROID_RANK_LABELS: Record<SteroidRank, string> = {
  strongest: 'Strongest（最強）',
  very_strong: 'Very Strong（強）',
  strong: 'Strong（中強）',
  medium: 'Medium（中）',
  weak: 'Weak（弱）',
};

type Props = {
  value: BodyPartConfig[];
  onChange: (configs: BodyPartConfig[]) => void;
};

export const BodyPartConfigEditor = ({ value, onChange }: Props) => {
  const addConfig = () => {
    const partId: BodyPartId = 'face';
    console.log(BODY_PARTS)
    onChange([
      ...value,
      {
        bodyPartId: partId,
        medication: '',
        steroidRank: 'medium',
        ftuAmount: BODY_PARTS[partId].defaultFtu,
      }
    ]);
  };

  const updateConfig = (index: number, updates: Partial<BodyPartConfig>) => {
    onChange(value.map((c, i) => (i === index ? { ...c, ...updates } : c)));
  };

  const removeConfig = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div>
      <button type="button" onClick={addConfig}>
        部位を追加
      </button>
      <ul>
        {value.map((config, index) => (
          <li key={index}>
            <select
              value={config.bodyPartId}
              onChange={(e) => {
                const partId = e.target.value as BodyPartId;
                updateConfig(index, {
                  bodyPartId: partId,
                  ftuAmount: BODY_PARTS[partId].defaultFtu,
                });
              }}
            >
              {(Object.entries(BODY_PARTS) as [BodyPartId, { label: string; defaultFtu: number }][]).map(
                ([id, { label }]) => (
                  <option key={id} value={id}>{label}</option>
                )
              )}
            </select>
            <input
              type="text"
              placeholder="薬剤名（例：リンデロンV軟膏）"
              value={config.medication}
              onChange={(e) => updateConfig(index, { medication: e.target.value })}
            />
            <select
              value={config.steroidRank}
              onChange={(e) => updateConfig(index, { steroidRank: e.target.value as SteroidRank })}
            >
              {(Object.entries(STEROID_RANK_LABELS) as [SteroidRank, string][]).map(([rank, label]) => (
                <option key={rank} value={rank}>{label}</option>
              ))}
            </select>
            <input
              type="number"
              min={0.5}
              step={0.5}
              value={config.ftuAmount}
              onChange={(e) => updateConfig(index, { ftuAmount: Number(e.target.value) })}
            />
            <button type="button" onClick={() => removeConfig(index)}>
              削除
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
