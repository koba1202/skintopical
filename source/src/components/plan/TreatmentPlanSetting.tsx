import { useState } from "react";
import { Phase } from '@/types'

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
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TreatmentPlanSetting
