import { useState } from "react";
import { useTreatmentPlanStore } from '@/stores/treatmentPlanStore';
import type { TreatmentPlan, FrequencyType, Phase } from '@/types/';
import { BodyPartConfigEditor } from '@/components/plan/BodyPartConfigEditor';

const TreatmentPlanSetting = () => {
  const [planName, setPlanName] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [phases, setPhases] = useState<Phase[]>([]);

  const addPhase = () => {
    const newPhase: Phase = {
      id: crypto.randomUUID(),
      name: '',
      order: phases.length + 1,
      frequency: 'twice_daily',
      timings: [],
      durationDays: null,
      targetBodyParts: [],
      status: 'pending',
    };
    setPhases([...phases, newPhase]);
  };

  const updatePhase = (id: string, updates: Partial<Phase>) => {
    setPhases(phases.map((p) => (p.id === id ? {...p, ...updates} : p)));
  };

  const addPlan = useTreatmentPlanStore((state) => state.addPlan);

  const handleSave = () => {
    if (!planName.trim() || !startDate) return ;

    const newPlan: TreatmentPlan = {
      id: crypto.randomUUID(),
      name: planName.trim(),
      startDate: startDate,
      status: "active",
      createdAt: new Date(),
      phases: phases,
    }

    addPlan(newPlan)
    setPlanName('');
    setStartDate(null);
    setPhases([]);
  };

  return (
    <div>
      <input
        value={planName}
        onChange={(e) => setPlanName(e.target.value)}
      />
      <input
        type="date"
        value={startDate ? startDate.toISOString().split('T')[0] : ''}
        onChange={(e) => setStartDate(new Date(e.target.value))}
      />
      <button
        type="button"
        onClick={addPhase}
      >
        フェーズを追加
      </button>
      <ul>
        {phases.map((phase) => (
          <li key={phase.id}>
            <input
              value={phase.name}
              onChange={(e) => updatePhase(phase.id, { name: e.target.value })}
            />
            <select
              value={phase.frequency}
              onChange={(e) => updatePhase(phase.id, { frequency: e.target.value as FrequencyType })}
            >
              <option value="twice_daily">1日2回</option>
              <option value="once_daily">1日1回</option>
              <option value="every_other_day">隔日</option>
              <option value="weekly_n">週N日</option>
              <option value="custom">カスタム</option>
            </select>
            <input
              type="number"
              min={1}
              placeholder="期間（日数）"
              value={phase.durationDays ?? ''}
              onChange={(e) => updatePhase(phase.id, {
                durationDays: e.target.value === '' ? null : Number(e.target.value)
              })}
            />
            <BodyPartConfigEditor
              value={phase.targetBodyParts}
              onChange={(configs) => updatePhase(phase.id, { targetBodyParts: configs })}
            />
          </li>
        ))}
      </ul>
      <button
        type='button'
        onClick={handleSave}
        disabled={!planName.trim() || !startDate}
      >
        保存
      </button>
      <div>
        {useTreatmentPlanStore.plan}
      </div>
    </div>
  )
}

export default TreatmentPlanSetting
