import { create } from 'zustand';
import { TreatmentPlan } from '../types';
import { persist } from 'zustand/middleware';

type TreatmentPlanStore = {
  plans: TreatmentPlan[];
  activePlanId: string | null;
  addPlan: (plan: TreatmentPlan) => void;
  updatePlan: (id: string, updates: Partial<TreatmentPlan>) => void;
  deletePlan: (id: string) => void;
  setActivePlan: (id: string | null) => void;
};

export const useTreatmentPlanStore = create<TreatmentPlanStore>()(
  persist(
    (set) => ({
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
    }),
    {
      name: 'treatment-plan-store',
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          const parsed = JSON.parse(str);
          parsed.state.plans = parsed.state.plans.map((plan: TreatmentPlan) => ({
            ...plan,
            startDate: new Date(plan.startDate),
            createdAt: new Date(plan.createdAt),
          }));
          return parsed;
        },
        setItem: (name, value) => localStorage.setItem(name, JSON.stringify(value)),
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);
