export type FrequencyType = "twice_daily" | "once_daily" | "every_other_day" | "weekly_n" | "custom";

export type SteroidRank = "strongest" | "very_strong" | "strong" | "medium" | "weak";

export type BodyPartConfig = {
  bodyPartId: string;
  medication: string;
  steroidRank: SteroidRank;
  ftuAmount: number;
};

export type Phase = {
  id: string;
  name: string;
  order: number;
  frequency: FrequencyType;
  timings: string[];
  durationDays: number | null;
  targetBodyParts: BodyPartConfig[];
  status: "pending" | "active" | "completed"
};

export type TreatmentPlan = {
  id: string;
  name: string;
  startDate: Date;
  status: "active" | "completed" | "paused";
  createdAt: Date;
  phases: Phase[];
};

export type ApplicationLog = {
  id: string;
  phaseId : string;
  date: Date;
  timing: string;
  appliedBodyParts: string[];
  skipped: boolean;
  skipReason?: string;
  createdAt: Date;
};
