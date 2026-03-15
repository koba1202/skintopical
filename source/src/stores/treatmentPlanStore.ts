import { create } from 'zustand';
import { TreatmentPlan } from '../types';

type TreatmentPlanStore = {
  plans: TreatmentPlan[];
  activePlanId: string | null;
  addPlan: (plan: TreatmentPlan) => void;
  updatePlan: (id: string, updates: Partial<TreatmentPlan>) => void;
  deletePlan: (id: string) => void;
  setActivePlan: (id: string | null) => void;
};

export const useTreatmentPlanStore = create<TreatmentPlanStore>()((set) => ({
  plans: [],
  activePlanId: null,
  addPlan: (plan) => set((state) => ({ plans: [...state.plans, plan] })),
  updatePlan: (id, updates) =>
    set((state) => ({
      plans: state.plans.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    })),
  deletePlan: (id) =>
    set((state) => ({
      plans: state.plans.filter((p) => p.id !== id),
    })),
  setActivePlan: (id) => set({ activePlanId: id }),
}));
