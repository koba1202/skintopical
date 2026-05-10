export type FrequencyType = "twice_daily" | "once_daily" | "every_other_day" | "weekly_n" | "custom";

export type SteroidRank = "strongest" | "very_strong" | "strong" | "medium" | "weak";

export type BodyPartId =
  | 'face' | 'neck'
  | 'upper_arm_left' | 'upper_arm_right'
  | 'forearm_left' | 'forearm_right'
  | 'elbow_inner_left' | 'elbow_inner_right'
  | 'hand_left' | 'hand_right'
  | 'chest' | 'abdomen' | 'back'
  | 'thigh_left' | 'thigh_right'
  | 'knee_back_left' | 'knee_back_right'
  | 'lower_leg_left' | 'lower_leg_right'
  | 'foot_left' | 'foot_right';

export type BodyPartConfig = {
  bodyPartId: BodyPartId;
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
